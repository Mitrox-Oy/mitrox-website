# Asennusohjeet

## Vaihe 1: Kopioi tiedostot

Kopioi `mitrox-blog-system/src` hakemiston sisältö projektisi `src` hakemistoon.

## Vaihe 2: Asenna riippuvuudet

```bash
npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
```

## Vaihe 3: Supabase konfiguraatio

1. Luo Supabase-projekti: https://supabase.com
2. Kopioi Project URL ja anon key
3. Lisää `.env` tiedostoon:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Vaihe 4: Tietokantarakenne

Aja SQL-kyselyt Supabase SQL Editorissa (katso README.md).

## Vaihe 5: Storage bucketit

Luo Supabase Dashboardissa:
- `profiles` (public)
- `blog-images` (public)

## Vaihe 6: Admin-käyttäjä

1. Mene Supabase Dashboard → Authentication → Users
2. Luo uusi käyttäjä
3. Mene User Metadata → app_metadata
4. Lisää: `{"role": "admin"}` tai `{"roles": ["admin"]}`

## Vaihe 7: Reitit

Lisää reitit `App.tsx` tai reititystiedostoosi:

```tsx
import BlogPage from './components/BlogPage';
import BlogArticlePage from './components/BlogArticlePage';
import AdminDashboardPage from './components/AdminDashboardPage';

<Routes>
  <Route path="/blog" element={<BlogPage language="fi" />} />
  <Route path="/blog/:slug" element={<BlogArticlePage language="fi" />} />
  <Route path="/admin" element={<AdminDashboardPage />} />
</Routes>
```

## Vaihe 8: Traffic Analytics (valinnainen)

Lisää `App.tsx`:ään:

```tsx
import { TrafficAnalytics } from './components/TrafficAnalytics';

function App() {
  return (
    <>
      <TrafficAnalytics language="fi" />
      {/* ... muut komponentit */}
    </>
  );
}
```

## Valmis! 🎉

Nyt voit:
- Käyttää `/blog` reittiä blogilistaukseen
- Käyttää `/blog/:slug` reittiä artikkeleihin
- Käyttää `/admin` reittiä admin-dashboardiin


