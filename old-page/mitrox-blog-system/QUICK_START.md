# Nopea aloitus

## 5 minuutissa käyttöön

### 1. Kopioi tiedostot

```bash
# Linux/Mac
cp -r mitrox-blog-system/src/* your-project/src/

# Windows PowerShell
Copy-Item -Path "mitrox-blog-system\src\*" -Destination "your-project\src\" -Recurse
```

### 2. Asenna riippuvuudet

```bash
npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
```

### 3. Konfiguroi Supabase

Luo `.env` tiedosto:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Tietokantarakenne

Aja SQL-kyselyt Supabase SQL Editorissa (katso README.md).

### 5. Lisää reitit

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

### 6. Valmis! 🎉

Nyt voit:
- Käyttää `/blog` reittiä blogilistaukseen
- Käyttää `/blog/:slug` reittiä artikkeleihin  
- Käyttää `/admin` reittiä admin-dashboardiin

## Seuraavat askeleet

1. **Luo admin-käyttäjä** Supabase Dashboardissa
2. **Luo Storage bucketit** (`profiles`, `blog-images`)
3. **Mukauta tyylejä** (jos tarvitaan)
4. **Lisää SEO-komponentit** (jos tarvitaan)

Katso tarkemmat ohjeet README.md ja SETUP.md tiedostoista.


