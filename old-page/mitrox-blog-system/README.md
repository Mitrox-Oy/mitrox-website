# Mitrox Blog System

Modulaarinen blogi- ja admin-dashboard-järjestelmä, joka on helppo kopioida ja implementoida asiakkaiden sivuille.

## 📦 Mitä tämä paketti sisältää?

- **BlogPage** - Blogilistaussivu
- **BlogArticlePage** - Yksittäisen artikkelin sivu
- **AdminDashboardPage** - Admin-dashboard blogin hallintaan
- **TrafficAnalytics** - Verkkosivun kävijäanalytiikka
- **Supabase integraatio** - Valmis tietokanta- ja autentikointijärjestelmä

## 🚀 Nopea aloitus

### Vaihe 1: Kopioi komponentit

Kopioi olemassa olevat komponentit projektista:

```bash
# Windows PowerShell
Copy-Item -Path "src\BlogPage.tsx" -Destination "mitrox-blog-system\src\components\BlogPage.tsx"
Copy-Item -Path "src\BlogArticlePage.tsx" -Destination "mitrox-blog-system\src\components\BlogArticlePage.tsx"
Copy-Item -Path "src\AdminDashboardPage.tsx" -Destination "mitrox-blog-system\src\components\AdminDashboardPage.tsx"
```

Tai kopioi koko `src` hakemisto:

```bash
# Windows PowerShell
Copy-Item -Path "src\*" -Destination "mitrox-blog-system\src\" -Recurse
```

### Vaihe 2: Muokkaa komponentit

Muokkaa komponentit riippumattomiksi (katso [COPY_FROM_PROJECT.md](./COPY_FROM_PROJECT.md)):
- Poista `useLanguage()` → käytä propsia
- Tee Header/Footer optional
- Tee SEO-komponentit optional

### Vaihe 3: Asenna riippuvuudet

```bash
npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
```

### Vaihe 4: Konfiguroi Supabase

Luo `.env` tiedosto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vaihe 5: Tietokantarakenne

Aja SQL-kyselyt Supabase SQL Editorissa:

```sql
-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text,
  cover_image_url text,
  language text NOT NULL CHECK (language IN ('fi', 'en')),
  status text NOT NULL CHECK (status IN ('draft', 'published')),
  author_name text,
  created_by uuid REFERENCES auth.users(id),
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Traffic analytics table
CREATE TABLE IF NOT EXISTS public.traffic_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  language text,
  country text,
  city text,
  referrer text,
  user_agent text,
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

### Vaihe 6: Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_analytics ENABLE ROW LEVEL SECURITY;

-- Blog posts: public read for published, admin write
CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage posts"
  ON public.blog_posts FOR ALL
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    (auth.jwt() -> 'app_metadata' -> 'roles')::jsonb ? 'admin'
  );

-- Traffic analytics: public insert, admin read
CREATE POLICY "Public can insert analytics"
  ON public.traffic_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read analytics"
  ON public.traffic_analytics FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    (auth.jwt() -> 'app_metadata' -> 'roles')::jsonb ? 'admin'
  );
```

### Vaihe 7: Supabase Storage

Luo Supabase Dashboardissa:

1. **profiles** - Käyttäjien profiilikuvat
   - Public: ✅
   - File size limit: 5MB
   - Allowed MIME types: `image/jpeg, image/png, image/webp`

2. **blog-images** - Blog-artikkelien kuvat
   - Public: ✅
   - File size limit: 10MB
   - Allowed MIME types: `image/jpeg, image/png, image/webp`

### Vaihe 8: Lisää reitit

```tsx
import { Routes, Route } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import BlogArticlePage from './components/BlogArticlePage';
import AdminDashboardPage from './components/AdminDashboardPage';

<Routes>
  <Route path="/blog" element={<BlogPage language="fi" />} />
  <Route path="/blog/:slug" element={<BlogArticlePage language="fi" />} />
  <Route path="/admin" element={<AdminDashboardPage />} />
</Routes>
```

## 📝 Käyttö

### BlogPage

```tsx
import BlogPage from './components/BlogPage';

<BlogPage 
  language="fi"
  basePath="/blog"
  showHeader={true}
  showFooter={true}
/>
```

### BlogArticlePage

```tsx
import BlogArticlePage from './components/BlogArticlePage';

<BlogArticlePage 
  language="fi"
  basePath="/blog"
/>
```

### AdminDashboardPage

```tsx
import AdminDashboardPage from './components/AdminDashboardPage';

<AdminDashboardPage />
```

### TrafficAnalytics

```tsx
import { TrafficAnalytics } from './components/TrafficAnalytics';

<TrafficAnalytics language="fi" />
```

## 📚 Dokumentaatio

### Asiakasdokumentaatio (Mitrox Sites)

- **[MITROX_SITES_DOCS.md](./MITROX_SITES_DOCS.md)** - 📖 **Päädokumentaatio asiakasprojekteille** (aloita tästä!)
- **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - 🔧 Vaihe vaiheelta asennusopas

### Kehittäjädokumentaatio

- **[QUICK_START.md](./QUICK_START.md)** - Nopea aloitus (5 min)
- **[SETUP.md](./SETUP.md)** - Yksityiskohtaiset asennusohjeet
- **[COMPONENTS.md](./COMPONENTS.md)** - Komponenttien käyttöohjeet
- **[COPY_FROM_PROJECT.md](./COPY_FROM_PROJECT.md)** - Kopioi komponentit projektista
- **[COPY_INSTRUCTIONS.md](./COPY_INSTRUCTIONS.md)** - Kopiointiohjeet asiakkaiden projekteihin

## 🔧 Konfiguraatio

Komponentit tukevat seuraavia props-parametreja:

- `language` - Kieli ('fi' | 'en')
- `basePath` - Blogin peruspolku (esim. '/blog' tai '/uutiset')
- `showHeader` - Näytä header (default: true)
- `showFooter` - Näytä footer (default: true)
- `HeaderComponent` - Mukautettu header-komponentti
- `FooterComponent` - Mukautettu footer-komponentti

## 📦 Riippuvuudet

```json
{
  "@supabase/supabase-js": "^2.81.1",
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "lucide-react": "^0.344.0",
  "react-router-dom": "^6.0.0"
}
```

## 🎯 Käyttötapaukset

### Kopioi asiakkaan projektiin

1. Kopioi `mitrox-blog-system/src` hakemiston sisältö asiakkaan projektin `src` hakemistoon
2. Asenna riippuvuudet
3. Konfiguroi Supabase
4. Lisää reitit
5. Valmis!

### Git submodule

```bash
git submodule add https://github.com/your-org/mitrox-blog-system.git src/blog-system
```

### npm package (jos julkaiset)

```bash
npm install mitrox-blog-system
```

## ✅ Valmis!

Nyt sinulla on modulaarinen blogi-järjestelmä joka on helppo kopioida ja implementoida asiakkaiden sivuille!
