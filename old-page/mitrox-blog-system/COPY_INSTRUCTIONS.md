# Kopiointiohjeet

## Nopea kopiointi

1. **Kopioi hakemisto**
   ```bash
   cp -r mitrox-blog-system/src/* your-project/src/blog-system/
   ```
   Tai Windows PowerShell:
   ```powershell
   Copy-Item -Path "mitrox-blog-system\src\*" -Destination "your-project\src\blog-system\" -Recurse
   ```

2. **Asenna riippuvuudet**
   ```bash
   npm install @supabase/supabase-js react-markdown remark-gfm lucide-react
   ```

3. **Konfiguroi Supabase** (katso SETUP.md)

4. **Lisää reitit** projektisi reititystiedostoon

## Tiedostojen rakenne

```
mitrox-blog-system/
├── src/
│   ├── components/
│   │   ├── BlogPage.tsx          # Blogilistaussivu
│   │   ├── BlogArticlePage.tsx   # Yksittäisen artikkelin sivu
│   │   ├── AdminDashboardPage.tsx # Admin-dashboard
│   │   └── TrafficAnalytics.tsx  # Analytics-komponentti
│   ├── lib/
│   │   └── supabaseClient.ts     # Supabase client
│   └── types/
│       └── index.ts               # TypeScript-tyypit
├── README.md                      # Dokumentaatio
├── SETUP.md                       # Asennusohjeet
└── package.json                   # Riippuvuudet
```

## Integraatio olemassa olevaan projektiin

### Vaihtoehto 1: Kopioi suoraan

Kopioi `src` hakemiston sisältö projektisi `src` hakemistoon ja muokkaa importteja.

### Vaihtoehto 2: Submodule (Git)

```bash
git submodule add https://github.com/your-org/mitrox-blog-system.git src/blog-system
```

### Vaihtoehto 3: npm package (jos julkaiset)

```bash
npm install mitrox-blog-system
```

## Muokkaa importteja

Kun kopioit tiedostot, muokkaa importteja vastaamaan projektisi rakennetta:

```tsx
// Ennen
import { supabase } from './lib/supabaseClient';

// Jälkeen (jos kopioit blog-system hakemistoon)
import { supabase } from '../lib/supabaseClient';
// tai
import { supabase } from './blog-system/lib/supabaseClient';
```

## Yhteensopivuus

Komponentit ovat yhteensopivia:
- ✅ React 18+
- ✅ React Router v6+
- ✅ TypeScript
- ✅ Tailwind CSS (käyttää Tailwind-luokkia)

Jos projektissasi ei ole Tailwind CSS:ää, joudut:
1. Asentamaan Tailwind CSS:n
2. Tai muuttamaan Tailwind-luokat tavalliseksi CSS:ksi


