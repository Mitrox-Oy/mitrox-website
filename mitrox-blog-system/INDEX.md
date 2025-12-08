# Mitrox Blog System - Sisällysluettelo

## 📚 Dokumentaatio

### 🎯 Asiakasdokumentaatio (aloita tästä!)

1. **[MITROX_SITES_DOCS.md](./MITROX_SITES_DOCS.md)** - 📖 **Päädokumentaatio asiakasprojekteille**
   - Yleiskuvaus, vaatimukset, asennus, konfiguraatio, käyttö, ongelmat
2. **[INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)** - 🔧 Vaihe vaiheelta asennusopas
   - Yksityiskohtaiset ohjeet jokaiselle vaiheelle

### 👨‍💻 Kehittäjädokumentaatio

3. **[README.md](./README.md)** - Yleinen dokumentaatio ja ominaisuudet
4. **[QUICK_START.md](./QUICK_START.md)** - Nopea aloitus (5 min)
5. **[SETUP.md](./SETUP.md)** - Yksityiskohtaiset asennusohjeet
6. **[COMPONENTS.md](./COMPONENTS.md)** - Komponenttien käyttöohjeet
7. **[COPY_INSTRUCTIONS.md](./COPY_INSTRUCTIONS.md)** - Kopiointiohjeet
8. **[COPY_FROM_PROJECT.md](./COPY_FROM_PROJECT.md)** - Kopioi komponentit projektista

## 🚀 Nopea aloitus

1. Kopioi `src` hakemiston sisältö projektisi `src` hakemistoon
2. Asenna riippuvuudet: `npm install @supabase/supabase-js react-markdown remark-gfm lucide-react`
3. Konfiguroi Supabase (katso SETUP.md)
4. Lisää reitit projektisi reititystiedostoon
5. Valmis!

## 📦 Tiedostorakenne

```
mitrox-blog-system/
├── src/
│   ├── components/          # React-komponentit
│   ├── lib/                 # Supabase client
│   └── types/               # TypeScript-tyypit
├── README.md                # Päädokumentaatio
├── SETUP.md                 # Asennusohjeet
├── COMPONENTS.md            # Komponenttien käyttö
├── COPY_INSTRUCTIONS.md     # Kopiointiohjeet
├── QUICK_START.md           # Nopea aloitus
└── package.json             # Riippuvuudet
```

## 🔗 Linkit

- [Supabase](https://supabase.com) - Tietokanta ja autentikointi
- [React Router](https://reactrouter.com) - Reititys
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown-renderöinti

## 💡 Vinkit

- Kopioi tiedostot suoraan projektisi `src` hakemistoon
- Muokkaa importit vastaamaan projektisi rakennetta
- Käytä props-parametreja kustomoimaan komponentteja
- Admin-dashboard vaatii Supabase auth-konfiguraation


