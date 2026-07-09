# Mitrox Blog System - Dokumentaatio asiakasprojekteille

Tämä dokumentaatio opastaa sinua Mitrox Blog Systemin asennuksessa ja käytössä asiakkaiden verkkosivuilla.

## 📋 Sisällysluettelo

1. [Yleiskuvaus](#yleiskuvaus)
2. [Vaatimukset](#vaatimukset)
3. [Asennus](#asennus)
4. [Konfiguraatio](#konfiguraatio)
5. [Käyttö](#käyttö)
6. [Yleiset ongelmat](#yleiset-ongelmat)
7. [Tuki](#tuki)

---

## 🎯 Yleiskuvaus

Mitrox Blog System on valmis blogi- ja hallintajärjestelmä, joka sisältää:

- **Julkinen blogi** - Blogilistaus ja artikkelit
- **Admin-dashboard** - Hallintapaneeli blogin hallintaan
- **Käyttäjäautentikointi** - Turvallinen kirjautuminen Supabase-palvelun kautta
- **Kuvien hallinta** - Turvallinen kuvien lataus ja tallennus
- **Analytiikka** - Automaattinen kävijäseuranta

### Ominaisuudet

✅ **Helppo asennus** - Kopioi tiedostot ja asenna riippuvuudet  
✅ **Modulaarinen** - Integroituu helposti olemassa oleviin projekteihin  
✅ **Turvallinen** - Supabase RLS (Row Level Security) -suojaus  
✅ **Monikielinen** - Tuki suomen ja englannin kielille  
✅ **SEO-optimoitu** - Valmis SEO-tuki  
✅ **Responsiivinen** - Toimii kaikilla laitteilla  

---

## 📦 Vaatimukset

### Tekniset vaatimukset

- **Node.js** 18+ ja npm/yarn
- **React** 18+
- **React Router** v6+
- **TypeScript** (suositeltavaa)
- **Tailwind CSS** (komponentit käyttävät Tailwind-luokkia)

### Palvelut

- **Supabase** - Tietokanta, autentikointi ja tiedostojen tallennus
  - Luo ilmainen tili: https://supabase.com

---

## 🚀 Asennus

### Vaihe 1: Kopioi tiedostot

Kopioi `mitrox-blog-system/src` hakemiston sisältö projektisi `src` hakemistoon:

```bash
# Windows PowerShell
Copy-Item -Path "mitrox-blog-system\src\*" -Destination "your-project\src\" -Recurse

# Linux/Mac
cp -r mitrox-blog-system/src/* your-project/src/
```

**Tiedostorakenne projektissa:**
```
your-project/
├── src/
│   ├── components/
│   │   ├── BlogPage.tsx
│   │   ├── BlogArticlePage.tsx
│   │   ├── AdminDashboardPage.tsx
│   │   └── TrafficAnalytics.tsx
│   ├── lib/
│   │   └── supabaseClient.ts
│   └── types/
│       └── index.ts
```

### Vaihe 2: Asenna riippuvuudet

Asenna tarvittavat npm-paketit:

```bash
npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
```

**Tai jos käytät yarn:**
```bash
yarn add @supabase/supabase-js react-markdown remark-gfm lucide-react
```

### Vaihe 3: Konfiguroi Supabase

#### 3.1 Luo Supabase-projekti

1. Mene https://supabase.com
2. Luo uusi projekti
3. Odota projektin valmistumista (2-3 minuuttia)

#### 3.2 Hae API-avaimet

1. Mene projektin **Settings** → **API**
2. Kopioi **Project URL** ja **anon public key**

#### 3.3 Lisää ympäristömuuttujat

Luo `.env` tiedosto projektin juureen:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Tärkeää:**
- Älä koskaan jaa `.env` tiedostoa versionhallinnassa (Git)
- Lisää `.env` tiedosto `.gitignore` tiedostoon

---

## ⚙️ Konfiguraatio

### Vaihe 1: Tietokantarakenne

Aja seuraavat SQL-kyselyt Supabase SQL Editorissa:

1. Mene Supabase Dashboard → **SQL Editor**
2. Klikkaa **New query**
3. Kopioi ja liitä seuraava SQL:

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

4. Klikkaa **Run** (tai paina Ctrl+Enter)

### Vaihe 2: Row Level Security (RLS)

Aja seuraavat SQL-kyselyt turvallisuuden varmistamiseksi:

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

### Vaihe 3: Supabase Storage

Luo kaksi Storage-buckettia kuvien tallennukseen:

#### 3.1 Profiles-bucket (profiilikuvat)

1. Mene **Storage** → **New bucket**
2. Nimi: `profiles`
3. Asetukset:
   - ✅ **Public bucket** (päällä)
   - **File size limit**: 5 MB
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

#### 3.2 Blog-images-bucket (blog-kuvat)

1. Mene **Storage** → **New bucket**
2. Nimi: `blog-images`
3. Asetukset:
   - ✅ **Public bucket** (päällä)
   - **File size limit**: 10 MB
   - **Allowed MIME types**: `image/jpeg, image/png, image/webp`

### Vaihe 4: Admin-käyttäjä

Luo admin-käyttäjä hallintapaneeliin:

1. Mene **Authentication** → **Users**
2. Klikkaa **Add user** → **Create new user**
3. Täytä:
   - **Email**: admin@example.com
   - **Password**: (turvallinen salasana)
4. Klikkaa **Create user**
5. Klikkaa luotua käyttäjää
6. Mene **User Metadata** → **app_metadata**
7. Lisää:
   ```json
   {
     "role": "admin"
   }
   ```
   TAI
   ```json
   {
     "roles": ["admin"]
   }
   ```
8. Tallenna

---

## 💻 Käyttö

### Reitit

Lisää reitit projektisi reititystiedostoon (esim. `App.tsx` tai `routes.tsx`):

```tsx
import { Routes, Route } from 'react-router-dom';
import BlogPage from './components/BlogPage';
import BlogArticlePage from './components/BlogArticlePage';
import AdminDashboardPage from './components/AdminDashboardPage';

function App() {
  return (
    <Routes>
      {/* Julkinen blogi */}
      <Route path="/blog" element={<BlogPage language="fi" />} />
      <Route path="/blog/:slug" element={<BlogArticlePage language="fi" />} />
      
      {/* Admin-dashboard */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/*" element={<AdminDashboardPage />} />
    </Routes>
  );
}
```

### Traffic Analytics (valinnainen)

Lisää automaattinen kävijäseuranta `App.tsx`:ään:

```tsx
import { TrafficAnalytics } from './components/TrafficAnalytics';

function App() {
  return (
    <>
      <TrafficAnalytics language="fi" />
      {/* Muut komponentit */}
    </>
  );
}
```

### Monikielisyys

Jos haluat tukea useita kieliä:

```tsx
<Routes>
  {/* Suomi */}
  <Route path="/fi/blog" element={<BlogPage language="fi" />} />
  <Route path="/fi/blog/:slug" element={<BlogArticlePage language="fi" />} />
  
  {/* Englanti */}
  <Route path="/en/blog" element={<BlogPage language="en" />} />
  <Route path="/en/blog/:slug" element={<BlogArticlePage language="en" />} />
</Routes>
```

---

## 🎨 Mukauttaminen

### Otsikot ja navigaatio

Komponentit käyttävät oletuksena projektisi Header- ja Footer-komponentteja. Jos haluat käyttää omia:

```tsx
import CustomHeader from './components/CustomHeader';
import CustomFooter from './components/CustomFooter';

<BlogPage 
  language="fi"
  HeaderComponent={CustomHeader}
  FooterComponent={CustomFooter}
/>
```

### Tyylit

Komponentit käyttävät Tailwind CSS:ää. Voit mukauttaa tyylejä:

1. Muokkaa komponenttien Tailwind-luokkia
2. Tai lisää omia CSS-sääntöjä

---

## 🔧 Yleiset ongelmat

### Ongelma: "Supabase is not configured"

**Ratkaisu:**
- Tarkista että `.env` tiedosto on projektin juuressa
- Varmista että muuttujat alkavat `VITE_` etuliitteellä
- Käynnistä kehityspalvelin uudelleen (`npm run dev`)

### Ongelma: "Storage bucket not found"

**Ratkaisu:**
- Varmista että olet luonut `profiles` ja `blog-images` bucketit
- Tarkista että bucketit ovat **public**
- Tarkista bucketin nimet (täsmälleen `profiles` ja `blog-images`)

### Ongelma: "Your account does not have admin privileges"

**Ratkaisu:**
- Tarkista että käyttäjällä on `app_metadata.role = "admin"` tai `app_metadata.roles` sisältää "admin"
- Kirjaudu ulos ja takaisin sisään
- Tarkista Supabase Dashboard → Authentication → Users

### Ongelma: Blogikirjoitukset eivät näy

**Ratkaisu:**
- Tarkista että kirjoituksen `status` on `"published"` (ei `"draft"`)
- Tarkista että `language` vastaa komponentin `language` propsia
- Tarkista selaimen konsoli virheilmoituksia varten

### Ongelma: Kuvat eivät lataudu

**Ratkaisu:**
- Tarkista että Storage-bucketit ovat **public**
- Tarkista että kuvan URL on oikein
- Tarkista että RLS-politiikat sallivat lukemisen

---

## 📞 Tuki

### Dokumentaatio

- **README.md** - Yleinen dokumentaatio
- **SETUP.md** - Yksityiskohtaiset asennusohjeet
- **COMPONENTS.md** - Komponenttien API-dokumentaatio

### Yhteydenotto

Jos kohtaat ongelmia:

1. Tarkista yllä olevat yleiset ongelmat
2. Tarkista Supabase Dashboard → Logs
3. Tarkista selaimen konsoli (F12)
4. Ota yhteyttä Mitrox-tukeen

---

## ✅ Tarkistuslista

Kun olet asentanut järjestelmän, tarkista:

- [ ] Tiedostot kopioitu projektin `src` hakemistoon
- [ ] Riippuvuudet asennettu (`npm install`)
- [ ] `.env` tiedosto luotu ja täytetty
- [ ] Supabase-tietokantarakenne luotu (SQL-kyselyt ajettu)
- [ ] RLS-politiikat asetettu
- [ ] Storage-bucketit luotu (`profiles`, `blog-images`)
- [ ] Admin-käyttäjä luotu ja konfiguroitu
- [ ] Reitit lisätty projektin reititystiedostoon
- [ ] Testattu että `/blog` reitti toimii
- [ ] Testattu että `/admin` reitti toimii
- [ ] Testattu että admin-käyttäjällä voi kirjautua sisään

---

## 🎉 Valmis!

Nyt sinulla on täysin toimiva blogi-järjestelmä! Voit:

- ✅ Luoda ja hallita blogikirjoituksia admin-dashboardissa
- ✅ Näyttää blogikirjoituksia julkisella blogisivulla
- ✅ Seurata kävijöitä analytics-dashboardissa
- ✅ Hallita käyttäjien profiileja

**Onnea blogin käyttöön! 🚀**


