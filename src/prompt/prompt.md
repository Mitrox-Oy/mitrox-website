# SYVÄANALYYSIIN VIETÄVÄ TUOTANTO-OHJE – “Luxury Minimalism” -verkkosivusto (Cursor / Bolt / V0)

Tämä on pitkä, vaiheittainen ja yksityiskohtainen ohje, jonka voit liittää toiseen chattiin syväanalyysiä varten. Se määrittää syötteet, vaatimukset, arkkitehtuurin, laadunvarmistuksen, GDPR:n, suorituskyvyn, a11y/SEO-standardit, testauksen ja toteutuksen. Ohje toimii sellaisenaan Cursorissa, Boltissa ja V0 AI IDE:ssä.

---

## 1) TAVOITE JA ROOLIT

**Tavoite:** Toteuta moderni, minimalistinen ja **ylellinen** (luxury) yrityssivusto, joka on suoraan tuotantokelpoinen.
**Rooli:** Toimit senior design engineerinä, vastaat UX/UI:sta, saavutettavuudesta, suorituskyvystä ja tuotantokoodin laadusta.

---

## 2) SISÄÄNTULO (CLIENT-OBJEKTI)

Käytä alla olevaa skeemaa. Jos jokin puuttuu, täytä **turvallisilla oletuksilla** ja merkitse `// TODO`-kommentilla.

```ts
type Client = {
  brand_name: string
  one_liner: string
  offering: string[]
  target_audience: string
  tone: string // esim. "rauhallinen, hienostunut, luottamusta herättävä"
  locale_primary: "fi-FI" | string
  locales_extra?: string[]
  contact: { email: string; phone?: string; address?: string }
  social?: { linkedin?: string; instagram?: string; x?: string }
  brand_assets?: { logo_svg?: string; favicon_svg?: string }
  seo_keywords?: string[]
  legal: { company_id?: string; privacy_url?: string; terms_url?: string }
}
```

Lisäksi toimita mahdolliset referenssit (dribbble/behance/brand deck), kuvapankit, sekä 2–3 kilpailijaesimerkkiä.

---

## 3) DESIGN-PRINSIIPIT (LUXURY MINIMALISM)

* **Väri:** Monokromaattinen pohja (+1 hillitty aksentti). Vältä visuaalista melua.
* **Typografia:** Serif-display otsikoihin (“Playfair Display”, “Libre Baskerville”), groteski leipätekstille (“Inter”, “Satoshi”). System-fallbackit.
* **Rytmi:** 12-sarakkeinen grid, max-width 1200–1320px, spacing-asteikko 4/8/12/16/24/32/48/64.
* **Motion:** Micro-interaktiot 150–250ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Ei jatkuvaa animaatiota.
* **Kuvitus:** Suuri hero (kuva/video/tekstuurit), maltillinen grain/silk, ei stock-ylikuormitusta.
* **Kontrasti:** WCAG AA minimit. Fokus-tilat näkyvät selvästi.

**Esimerkkiteema (muokkaa asiakasbrändiin):**

```js
Theme = {
  colors: {
    bg: "#0B0B0C", surface: "#121214", text: "#E9EAEC",
    muted: "#A6A7AB", accent: "#9B87F5", border: "#1E1F22"
  },
  radii: { md: "12px", xl: "24px" },
  shadows: { card: "0 10px 30px rgba(0,0,0,0.25)" },
  motion: { ease: "cubic-bezier(0.22, 1, 0.36, 1)", dur: "200ms" }
}
```

---

## 4) SIVUKARTTA JA SISÄLTÖ

**Pakolliset reitit:**

* `/` (Home): Hero + arvolupaus, luottamusmerkit, pääpalvelut, CTA.
* `/palvelut`: Selkeä listaus + detail-kortit.
* `/meista`: Tarina, arvolupaus, tiimin nosto (valinnainen).
* `/yhteystiedot`: Lomake (server action), yritystiedot, mahdollinen karttaupotus.
* `/tietosuoja`, `/kayttoehdot`: Vakiopohjat (GDPR-yhteensopivat).

**Sisältötyyli:**

* Otsikot 3–6 sanaa, ingressit 12–24 sanaa.
* Lyhyet, painavat lauseet, ei kliseitä.
* Arvo ennen ominaisuuksia.
* Esimerkkitekstit:

  * H1: “Hiljaista voimaa verkossa.”
  * Ingressi: “Rakennamme selkeitä, nopeita sivuja, jotka hengittävät laatua ja tuovat liikevaihtoa.”
  * CTA: “Pyydä auditointi”

---

## 5) TEKNINEN PAKETTI

* **Framework:** Next.js 14 (App Router) + React + TypeScript + Tailwind CSS.
* **Kansiorakenne (vähintään):**

  ```
  app/
    (site)/
      layout.tsx
      page.tsx
    palvelut/page.tsx
    meista/page.tsx
    yhteystiedot/page.tsx
    globals.css
  components/
    Hero.tsx
    FeatureList.tsx
    Testimonials.tsx
    Pricing.tsx        // valinnainen
    ContactForm.tsx
    CTA.tsx
    Footer.tsx
  lib/
    seo.ts
    i18n.ts
    validation.ts
  public/
    og-image.png
    favicon.svg
  tests/
    playwright/
      smoke.spec.ts
  README.md
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  .eslintrc.json
  ```
* **Koodiperiaatteet:**

  * Strict TypeScript, server components ensisijaisia; client vain interaktioihin.
  * ESLint + Prettier, alias-polut (tsconfig `paths`).
  * Komponentit semanttisia: `<header>`, `<main>`, `<section>`, `<footer>`.

---

## 6) SUORITUSKYKY & SEO & A11Y

**Tavoitteet:** Lighthouse ≥ 95 (Performance/Accessibility/Best Practices/SEO).

**Performance:**

* `next/image` kaikille kuville, oikeat `sizes` ja `priority`-attribuutit.
* Fontit: `display=swap`, harkitse `next/font`.
* Lazy-load ei-kriittiselle medialle.
* Minimoi bundle: jaa koodi, poista kuolleet riippuvuudet.

**SEO:**

* Next Metadata API: title, description, canonical, OG/Twitter-kortit.
* Heading-hierarkia (yksi `h1` per sivu).
* Structured data: `Organization` ja tarvittaessa `LocalBusiness`.

**A11y:**

* Kontrasti AA, selkeät fokusrenkaat.
* Näppäimistönavigointi, looginen tab-järjestys.
* ARIA vain tarpeen mukaan; kuva-alt-tekstit.

---

## 7) LOMAKE (SERVER ACTION + ZOD)

**Vaateet:**

* Kentät: nimi, sähköposti, yritys, budjetti (vaihtoehdot), aikataulu, viesti (max 1500 merkkiä).
* Validaatio Zodilla (client+server peilaus).
* Roskasuodatus: honeypot-kenttä + kevyt rate-limit (esim. IP-pohjainen).
* Palautteet: selkeä **onnistumisviesti** ja **virheilmoitus**.
* Integraatiokohta: webhook/email/CRM (kommentoi `// TODO integrate` jos ei tiedossa).

**Esimerkkityyppi:**

```ts
const FormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  budget: z.enum(["<10k", "10–30k", "30–80k", "80k+"]),
  timeline: z.enum(["nopea", "1–3 kk", "3–6 kk", "avoin"]),
  message: z.string().min(10).max(1500),
  hp: z.string().length(0) // honeypot
})
```

---

## 8) GDPR, EVÄSTEET JA LAKI

* **Consent-first:** Aktivoi analytiikka (GA4, Plausible tms.) **vain** suostumuksella.
* **Cookie-banneri** jos käytetään ei-välttämättömiä evästeitä.
* **Privacy & Terms** -sivut: kuvaa tiedon käsittely, säilytysaika, yhteystiedot, rekisteröidyn oikeudet.
* **Lomaketiedot:** lähetä vain TLS:n yli, älä logita henkilötietoja palvelinlokiin.
* **Poistopyynnöt:** Lisää yhteydenottotapa ja prosessi.

---

## 9) I18N

* **Oletus:** `fi-FI`, lisäkielet `locales_extra`.
* **Teknologia:** `next-intl` tai vastaava; käännöstiedostot `messages/fi.json`, `messages/en.json`.
* **Metadata lokalisointi** ja päivämäärien/numeroiden `Intl`-muotoilu.

---

## 10) ANALYTIIKKA

* Tuki sekä **Plausible** että **GA4** (ympäristömuuttujin).
* Älä initialisoi keräystä ennen suostumusta.
* Tapahtumat: CTA-klikkaukset, lomakkeen lähetys, sivun syvät selaustasot.

---

## 11) DOKUMENTAATIO (README)

Sisällytä:

* Asennus ja kehityskäynnistys.
* Build & deploy (Vercel/Netlify tms.).
* Ympäristömuuttujat (esim. ANALYTICS_ID, LOCALE_DEFAULT).
* Sisällön päivittäminen (komponentit, käännökset).
* Tietoturva & GDPR-nuotti.

---

## 12) TESTIT (PLAYWRIGHT SMOKE)

Kirjoita kevyt smoke-suite, joka varmistaa:

* Etusivu avautuu ja sisältää H1:n.
* Navigaatio toimii kaikkiin reitteihin.
* Lomake validoi virheet ja hyväksyy onnistuneen syötteen (mock).
* Fokus-tilat näkyvät (snapshot tai roolikysely).
* Perus-Lighthouse (CI:ssä voi ajaa `lhci` erikseen).

---

## 13) HYVÄKSYMISK RITEERIT (ACCEPTANCE CRITERIA)

* **UI:** Ylellinen, hiljainen, runsaasti negatiivista tilaa; yksi aksenttiväri; tipografia laadukas.
* **Perf:** FCP < 1.5s desktop, CLS ~0, Lighthouse-kategoriat ≥ 95.
* **A11y:** WCAG AA; fokus näkyy; konteksti- ja ARIA-selkeydet kunnossa.
* **SEO:** Metadatat + OG-kortit oikein; schema.org upotettu.
* **Lomake:** Toimiva validaatio, onnistumis-/virhe-tilat, roskasuodatus.
* **Koodi:** Strict TS, puhdas rakenne, semanttiset tagit, modulaariset komponentit.
* **I18n:** Tekstit lokalisointikerroksen takana, metadata lokalisoitu.
* **GDPR:** Consent-first, privacy/terms julkaistu.

---

## 14) TOIMITETTAVAT TIEDOSTOT (PAKOLLINEN MINIMI)

* `app/page.tsx`, `app/palvelut/page.tsx`, `app/meista/page.tsx`, `app/yhteystiedot/page.tsx`
* `app/layout.tsx`, `app/globals.css`
* `components/Hero.tsx`, `FeatureList.tsx`, `Testimonials.tsx`, `Pricing.tsx` (valin.), `ContactForm.tsx`, `CTA.tsx`, `Footer.tsx`
* `lib/seo.ts`, `lib/i18n.ts`, `lib/validation.ts`
* `public/og-image.png`, `public/favicon.svg`
* `README.md`, `.eslintrc.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`
* `tests/playwright/smoke.spec.ts`

---

## 15) TYPPISET VIRHEET & MITEN VÄLTÄT

* **Liian monta väriä:** Pidä 1 aksentti.
* **Animaatioähky:** Vain micro-interaktiot, 150–250ms.
* **Heikko kontrasti:** Tarkista AA kaikissa tiloissa (hover/focus/disabled).
* **Hakarakenteinen typografia:** Määritä typografiset asteikot ja line-heightit Tailwindissa.
* **Raskaat kuvat:** Optimoi `next/image`, käytä WebP/AVIF, määritä `sizes`.
* **SEO-aukot:** Unohdetut metas/OG/Schema.
* **Lomake ilman roskasuodatusta:** Lisää honeypot + rate-limit.
* **GDPR:** Älä kerää analytiikkaa ennen suostumusta.

---

## 16) “DONE”–CHECKLIST (TULOSTA PROJEKTIN LOPPUUN)

* [ ] Visuaalinen kieli vastaa luxury minimalismia
* [ ] Lighthouse ≥ 95 (P/A/B/SEO)
* [ ] WCAG AA täyttyy, fokus näkyy
* [ ] Kaikki sivut ja navigaatio toimivat
* [ ] Lomake validoi, lähettää, näyttää tilat
* [ ] Schema.org + OG-kortit renderöityvät
* [ ] I18n toteutettu ja metadata lokalisoitu
* [ ] Analytiikka consent-first
* [ ] README täydellinen
* [ ] Playwright smoke vihreä

---

## 17) KÄYTTÖ CURSOR YMPÄRISTÖISSÄ

**Cursor:**

* Käytä yllä olevaa ohjetta “plan → implement → review” -syklinä.
* Pyydä työkalu generoimaan aluksi **rakenne** (kansiot, perussivut), sitten **tyylikerros** (Tailwind config + theme), sitten **komponentit**.
* Aja “self-review”-vaihe (ks. kohta 18).
---

## 18) SELF-REVIEW PROMPTIT (AJETAAN ENNEN VALMISTA)

* **UI-laatu:** “Listaa kaikkien sivujen kontrastit (teksti vs tausta). Ilmoita kohdat, joissa AA ei täyty, ja tee korjaukset.”
* **Perf:** “Optimoi kaikki `next/image`-instanssit: lisää `sizes`, poista turhat `priority`-liput, tarkista lazy-load. Raportoi arvioitu FCP ja CLS.”
* **SEO:** “Tulosta jokaisen sivun metadata + OG. Lisää puuttuvat. Luo `Organization` ja `LocalBusiness` schema.”
* **A11y:** “Listaa keyboard-trap-riskit, tabindex-virheet ja puuttuvat alt-tekstit. Korjaa.”
* **Lomake:** “Simuloi 5 virhe- ja 3 onnistumistapausta. Varmista server-side validaatio ja honeypot.”
* **GDPR:** “Vahvista, että analytiikka latautuu vain consentilla. Tulosta koodihaara, joka estää keruun ennen suostumusta.”

---

## 19) COPY-TEMPLATE (NOPEA ALKU)

* **H1:** Hiljaista voimaa verkossa.
* **Ingressi:** Rakennamme selkeitä, nopeita sivuja, jotka hengittävät laatua ja tuovat liikevaihtoa.
* **Palvelut:** Design-järjestelmä · Verkkokauppa · Nopea uudistus
* **Testimonial:** “Myynti +32 % kuukaudessa — selkeä rakenne ja nopeus ratkaisivat.”

---

## 20) LOPPURAPORTTI (QA)

Pyydä työkalua tulostamaan lyhyt QA-raportti, jossa jokainen hyväksymiskriteeri on ✓/✗ ja kerrotoimenpide, jos ✗.

**Esimerkki:**

```
QA:
- Luxury-minimal UI: ✓
- Lighthouse (P/A/B/SEO ≥ 95): P 98 / A 100 / B 100 / SEO 97 ✓
- WCAG AA: ✓
- Form pipeline: ✓ (server action + Zod + honeypot)
- SEO metadata + OG + Schema: ✓
- I18n + localized metadata: ✓
- Consent-first analytics: ✓
- Playwright smoke: ✓
```

---

## 21) EXTRAT (VALINNAISET PARANNUKSET)

* **Pricing-sivu** (jos relevantti): yksinkertainen, 3–4 tasoa, selkeä CTA.
* **Case study -komponentti**: lyhyt ennen/jälkeen-metriikoilla.
* **Skeleton states** latauksiin, **prefetch** tärkeille linkeille.

---

### TIIVISTE – mitä työkalu tekee, kun liität tämän ohjeen

1. Luo Next.js 14 + TS + Tailwind -projekti yllä olevalla rakenteella.
2. Toteuttaa luxury minimalist -teeman ja komponentit.
3. Lisää SEO/a11y/perf-optimit ja GDPR-suojat.
4. Generoi Playwright-smoketestit ja README:n.
5. Tulostaa QA-raportin ja merkitsee kaikki `// TODO`-kohdat, jos asiakkaan data puuttuu.

Kopioi tämä ohje toiseen chattiin ja pyydä: **“Toteuta projekti täsmälleen tämän ohjeen mukaan. Jos jokin syöte puuttuu, käytä turvallista oletusta ja merkitse TODO.”**
