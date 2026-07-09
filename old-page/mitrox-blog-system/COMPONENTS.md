# Komponenttien käyttö

## BlogPage

Blogilistaussivu joka näyttää kaikki julkaistut blogikirjoitukset.

### Käyttö

```tsx
import BlogPage from './components/BlogPage';

<BlogPage 
  language="fi"
  basePath="/blog"
  showHeader={true}
  showFooter={true}
/>
```

### Props

- `language: "fi" | "en"` - Kieli (pakollinen)
- `basePath?: string` - Blogin peruspolku (default: "/blog")
- `showHeader?: boolean` - Näytä header (default: true)
- `showFooter?: boolean` - Näytä footer (default: true)
- `HeaderComponent?: React.ComponentType` - Mukautettu header
- `FooterComponent?: React.ComponentType` - Mukautettu footer

## BlogArticlePage

Yksittäisen blog-artikkelin sivu.

### Käyttö

```tsx
import BlogArticlePage from './components/BlogArticlePage';

<BlogArticlePage 
  language="fi"
  basePath="/blog"
  showHeader={true}
  showFooter={true}
/>
```

### Props

Sama kuin BlogPage.

## AdminDashboardPage

Admin-dashboard blogin hallintaan.

### Käyttö

```tsx
import AdminDashboardPage from './components/AdminDashboardPage';

<AdminDashboardPage />
```

Ei tarvitse propsia - käyttää Supabase authia suoraan.

### Ominaisuudet

- Blogin hallinta (luo, muokkaa, poista)
- Profiilin hallinta (profiilikuva, salasana)
- Traffic analytics
- Dashboard-tilastot

## TrafficAnalytics

Automaattinen kävijäseuranta.

### Käyttö

```tsx
import { TrafficAnalytics } from './components/TrafficAnalytics';

// Lisää App.tsx:ään
<TrafficAnalytics language="fi" />
```

### Props

- `language: string` - Kieli (pakollinen)

## Kopiointiohjeet

### 1. Kopioi tiedostot

Kopioi seuraavat tiedostot projektisi `src` hakemistoon:

```
src/
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

### 2. Muokkaa importteja

Muokkaa komponenttien importit vastaamaan projektisi rakennetta:

**BlogPage.tsx:**
```tsx
// Muuta:
import { supabase } from "./lib/supabaseClient";
// Jos kopioit blog-system hakemistoon:
import { supabase } from "../lib/supabaseClient";
```

**BlogArticlePage.tsx:**
```tsx
// Sama muutos
```

**AdminDashboardPage.tsx:**
```tsx
// Sama muutos
```

**TrafficAnalytics.tsx:**
```tsx
// Sama muutos
```

### 3. Poista riippuvuudet (jos tarvitaan)

Jos projektissasi ei ole:
- `LanguageContext` → Muuta `useLanguage()` propseihin
- `SEOHead` / `SEOEnhanced` → Poista tai tee optional
- `Header` / `Footer` → Käytä props-komponentteja

### 4. Lisää reitit

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

## Riippuvuudet

Komponentit vaativat:

```json
{
  "@supabase/supabase-js": "^2.81.1",
  "react-markdown": "^10.1.0",
  "remark-gfm": "^4.0.1",
  "lucide-react": "^0.344.0",
  "react-router-dom": "^6.0.0"
}
```

## Tailwind CSS

Komponentit käyttävät Tailwind CSS:ää. Jos projektissasi ei ole Tailwind CSS:ää:

1. Asenna Tailwind CSS
2. Tai muuta Tailwind-luokat tavalliseksi CSS:ksi


