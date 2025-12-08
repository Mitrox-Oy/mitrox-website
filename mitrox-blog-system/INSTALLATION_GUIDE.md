# Asennusopas - Vaihe vaiheelta

Tämä opas opastaa sinua Mitrox Blog Systemin asennuksessa vaihe vaiheelta.

## 📋 Ennen aloittamista

Varmista että sinulla on:

- ✅ Node.js 18+ asennettuna
- ✅ npm tai yarn asennettuna
- ✅ React-projekti valmiina
- ✅ Supabase-tili luotuna (ilmainen: https://supabase.com)

---

## Vaihe 1: Kopioi tiedostot (2 min)

### 1.1 Etsi tiedostot

Etsi `mitrox-blog-system/src` hakemisto.

### 1.2 Kopioi projektisi

**Windows PowerShell:**
```powershell
Copy-Item -Path "mitrox-blog-system\src\*" -Destination "your-project\src\" -Recurse
```

**Linux/Mac:**
```bash
cp -r mitrox-blog-system/src/* your-project/src/
```

### 1.3 Tarkista tiedostot

Varmista että seuraavat tiedostot ovat projektissasi:

```
your-project/src/
├── components/
│   ├── BlogPage.tsx
│   ├── BlogArticlePage.tsx
│   ├── AdminDashboardPage.tsx
│   └── TrafficAnalytics.tsx
├── lib/
│   └── supabaseClient.ts
└── types/
    └── index.ts
```

---

## Vaihe 2: Asenna riippuvuudet (1 min)

Avaa terminaali projektin juuressa ja aja:

```bash
npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
```

**Odota asennuksen valmistumista...**

---

## Vaihe 3: Supabase-konfiguraatio (5 min)

### 3.1 Luo Supabase-projekti

1. Mene https://supabase.com
2. Klikkaa **Start your project**
3. Kirjaudu sisään (tai luo tili)
4. Klikkaa **New project**
5. Täytä:
   - **Name**: Esim. "My Blog"
   - **Database Password**: (tallenna turvalliseen paikkaan!)
   - **Region**: Valitse lähin alue
6. Klikkaa **Create new project**
7. Odota projektin valmistumista (2-3 minuuttia)

### 3.2 Hae API-avaimet

1. Kun projekti on valmis, mene **Settings** (vasemmalla)
2. Klikkaa **API**
3. Kopioi:
   - **Project URL** (esim. `https://xxxxx.supabase.co`)
   - **anon public** key (pitkä merkkijono)

### 3.3 Lisää ympäristömuuttujat

1. Luo `.env` tiedosto projektin juureen
2. Lisää:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Korvaa `xxxxx` omilla arvoillasi
4. Tallenna tiedosto

**⚠️ Tärkeää:**
- Älä jaa `.env` tiedostoa Gitissä
- Lisää `.env` tiedosto `.gitignore` tiedostoon

---

## Vaihe 4: Tietokantarakenne (3 min)

### 4.1 Avaa SQL Editor

1. Mene Supabase Dashboard → **SQL Editor**
2. Klikkaa **New query**

### 4.2 Kopioi ja aja SQL

Kopioi seuraava SQL-koodi ja liitä se SQL Editoriin:

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

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog_posts
CREATE TRIGGER handle_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
```

3. Klikkaa **Run** (tai paina Ctrl+Enter / Cmd+Enter)
4. Odota vahvistusta (pitäisi näkyä "Success. No rows returned")

### 4.3 Tarkista taulut

1. Mene **Table Editor** (vasemmalla)
2. Pitäisi näkyä:
   - `blog_posts`
   - `traffic_analytics`

---

## Vaihe 5: Turvallisuus (RLS) (2 min)

### 5.1 Aja RLS-politiikat

1. Mene takaisin **SQL Editor**
2. Klikkaa **New query**
3. Kopioi ja aja:

```sql
-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_analytics ENABLE ROW LEVEL SECURITY;

-- Blog posts: public can read published posts
CREATE POLICY "Public can read published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

-- Blog posts: admins can manage all posts
CREATE POLICY "Admins can manage posts"
  ON public.blog_posts FOR ALL
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    (auth.jwt() -> 'app_metadata' -> 'roles')::jsonb ? 'admin'
  );

-- Traffic analytics: public can insert
CREATE POLICY "Public can insert analytics"
  ON public.traffic_analytics FOR INSERT
  WITH CHECK (true);

-- Traffic analytics: admins can read
CREATE POLICY "Admins can read analytics"
  ON public.traffic_analytics FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' OR
    (auth.jwt() -> 'app_metadata' -> 'roles')::jsonb ? 'admin'
  );
```

4. Klikkaa **Run**

---

## Vaihe 6: Storage-bucketit (3 min)

### 6.1 Profiles-bucket

1. Mene **Storage** (vasemmalla)
2. Klikkaa **New bucket**
3. Täytä:
   - **Name**: `profiles`
   - ✅ **Public bucket** (päällä)
4. Klikkaa **Create bucket**
5. Klikkaa luotua bucketia
6. Mene **Settings**
7. Aseta:
   - **File size limit**: `5242880` (5 MB)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

### 6.2 Blog-images-bucket

1. Klikkaa **New bucket** uudelleen
2. Täytä:
   - **Name**: `blog-images`
   - ✅ **Public bucket** (päällä)
3. Klikkaa **Create bucket**
4. Klikkaa luotua bucketia
5. Mene **Settings**
6. Aseta:
   - **File size limit**: `10485760` (10 MB)
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

---

## Vaihe 7: Admin-käyttäjä (2 min)

### 7.1 Luo käyttäjä

1. Mene **Authentication** → **Users**
2. Klikkaa **Add user** → **Create new user**
3. Täytä:
   - **Email**: Esim. `admin@example.com`
   - **Password**: (turvallinen salasana, tallenna!)
4. Klikkaa **Create user**

### 7.2 Aseta admin-rooli

1. Klikkaa juuri luomaasi käyttäjää
2. Vieritä alas **User Metadata** -osioon
3. Klikkaa **app_metadata** -kenttää
4. Lisää:

```json
{
  "role": "admin"
}
```

5. Klikkaa **Save**

**Vaihtoehtoinen tapa (jos haluat useita rooleja):**
```json
{
  "roles": ["admin"]
}
```

---

## Vaihe 8: Lisää reitit (2 min)

### 8.1 Avaa reititystiedosto

Avaa projektisi reititystiedosto (esim. `App.tsx`, `routes.tsx`, tai `src/routes.tsx`).

### 8.2 Lisää importit

```tsx
import { Routes, Route } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import BlogArticlePage from './components/BlogArticlePage';
import AdminDashboardPage from './components/AdminDashboardPage';
```

### 8.3 Lisää reitit

```tsx
<Routes>
  {/* Julkinen blogi */}
  <Route path="/blog" element={<BlogPage language="fi" />} />
  <Route path="/blog/:slug" element={<BlogArticlePage language="fi" />} />
  
  {/* Admin-dashboard */}
  <Route path="/admin" element={<AdminDashboardPage />} />
  <Route path="/admin/*" element={<AdminDashboardPage />} />
</Routes>
```

---

## Vaihe 9: Testaa (2 min)

### 9.1 Käynnistä kehityspalvelin

```bash
npm run dev
```

### 9.2 Testaa reitit

1. Avaa selain: `http://localhost:3000/blog`
   - Pitäisi näkyä tyhjä blogisivu (ei vielä artikkeleita)

2. Avaa: `http://localhost:3000/admin`
   - Pitäisi näkyä kirjautumissivu

3. Kirjaudu sisään admin-käyttäjällä
   - Pitäisi näkyä admin-dashboard

### 9.3 Testaa ensimmäinen kirjoitus

1. Admin-dashboardissa, klikkaa **Blog Management**
2. Klikkaa **New Post**
3. Täytä:
   - **Title**: "Testiartikkeli"
   - **Content**: "Tämä on testiartikkeli"
   - **Status**: "Published"
4. Klikkaa **Save**
5. Mene takaisin `/blog` reittiin
   - Pitäisi näkyä juuri luomasi artikkeli!

---

## ✅ Valmis!

Onnittelut! Olet nyt asentanut Mitrox Blog Systemin onnistuneesti.

### Seuraavat askeleet

1. **Luo lisää kirjoituksia** admin-dashboardissa
2. **Mukauta tyylejä** (jos haluat)
3. **Lisää Traffic Analytics** (valinnainen, katso MITROX_SITES_DOCS.md)

### Tarvitsetko apua?

- Katso **MITROX_SITES_DOCS.md** - Yleinen dokumentaatio
- Katso **COMPONENTS.md** - Komponenttien API
- Ota yhteyttä Mitrox-tukeen

**Onnea blogin käyttöön! 🎉**


