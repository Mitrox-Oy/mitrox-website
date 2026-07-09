# Kopioi komponentit projektista

Tämä ohje kertoo miten kopioida olemassa olevat blogi/dashboard-komponentit tästä projektista erilliseen pakettiin.

## Tiedostot joita tarvitaan

### 1. BlogPage.tsx
**Lähde:** `src/BlogPage.tsx`
**Kohde:** `mitrox-blog-system/src/components/BlogPage.tsx`

**Muutokset:**
- Poista `useLanguage()` hook → käytä propsia `language`
- Tee `Header` ja `Footer` optional props-komponenteiksi
- Tee `SEOHead` ja `SEOEnhanced` optional
- Poista `getFullLocalizedPath` → käytä `basePath` propsia

### 2. BlogArticlePage.tsx
**Lähde:** `src/BlogArticlePage.tsx`
**Kohde:** `mitrox-blog-system/src/components/BlogArticlePage.tsx`

**Muutokset:**
- Sama kuin BlogPage.tsx

### 3. AdminDashboardPage.tsx
**Lähde:** `src/AdminDashboardPage.tsx`
**Kohde:** `mitrox-blog-system/src/components/AdminDashboardPage.tsx`

**Muutokset:**
- Poista `SEOHead` ja `SEOEnhanced` (tai tee optional)
- Varmista että `supabase` importti on oikein

### 4. TrafficAnalytics.tsx
**Lähde:** `src/components/TrafficAnalytics.tsx`
**Kohde:** `mitrox-blog-system/src/components/TrafficAnalytics.tsx`

**Muutokset:**
- Poista `useLanguage()` → käytä propsia `language`
- Varmista että `supabase` importti on oikein

### 5. supabaseClient.ts
**Lähde:** `src/lib/supabaseClient.ts`
**Kohde:** `mitrox-blog-system/src/lib/supabaseClient.ts`

**Muutokset:**
- Ei muutoksia tarvita (jo kopioitu)

## Kopiointiskripti

### Windows PowerShell

```powershell
# Kopioi tiedostot
Copy-Item -Path "src\BlogPage.tsx" -Destination "mitrox-blog-system\src\components\BlogPage.tsx"
Copy-Item -Path "src\BlogArticlePage.tsx" -Destination "mitrox-blog-system\src\components\BlogArticlePage.tsx"
Copy-Item -Path "src\AdminDashboardPage.tsx" -Destination "mitrox-blog-system\src\components\AdminDashboardPage.tsx"
Copy-Item -Path "src\components\TrafficAnalytics.tsx" -Destination "mitrox-blog-system\src\components\TrafficAnalytics.tsx"
```

### Linux/Mac

```bash
# Kopioi tiedostot
cp src/BlogPage.tsx mitrox-blog-system/src/components/BlogPage.tsx
cp src/BlogArticlePage.tsx mitrox-blog-system/src/components/BlogArticlePage.tsx
cp src/AdminDashboardPage.tsx mitrox-blog-system/src/components/AdminDashboardPage.tsx
cp src/components/TrafficAnalytics.tsx mitrox-blog-system/src/components/TrafficAnalytics.tsx
```

## Muutokset joita pitää tehdä

### BlogPage.tsx

**Ennen:**
```tsx
import { useLanguage } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { getFullLocalizedPath } from "./utils/routeMapping";

export default function BlogPage() {
  const { language } = useLanguage();
  const pagePath = useMemo(() => getFullLocalizedPath("blog", language), [language]);
  // ...
  return (
    <div>
      <Header />
      {/* ... */}
      <Footer />
    </div>
  );
}
```

**Jälkeen:**
```tsx
type BlogPageProps = {
  language: "fi" | "en";
  basePath?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  HeaderComponent?: React.ComponentType;
  FooterComponent?: React.ComponentType;
};

export default function BlogPage({ 
  language, 
  basePath = "/blog",
  showHeader = true,
  showFooter = true,
  HeaderComponent,
  FooterComponent
}: BlogPageProps) {
  const pagePath = basePath;
  // ...
  return (
    <div>
      {showHeader && (HeaderComponent ? <HeaderComponent /> : <Header />)}
      {/* ... */}
      {showFooter && (FooterComponent ? <FooterComponent /> : <Footer />)}
    </div>
  );
}
```

### BlogArticlePage.tsx

Sama muutos kuin BlogPage.tsx.

### TrafficAnalytics.tsx

**Ennen:**
```tsx
import { useLanguage } from '../context/LanguageContext';

export const TrafficAnalytics: React.FC = () => {
  const { language } = useLanguage();
  // ...
}
```

**Jälkeen:**
```tsx
type TrafficAnalyticsProps = {
  language: string;
};

export const TrafficAnalytics: React.FC<TrafficAnalyticsProps> = ({ language }) => {
  // ...
}
```

## Valmis!

Kun olet kopioinut ja muokannut tiedostot, ne ovat valmiita käyttöön. Katso [COMPONENTS.md](./COMPONENTS.md) käyttöohjeisiin.


