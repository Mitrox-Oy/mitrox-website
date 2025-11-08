import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { buildMeta, breadcrumbSchema, organizationSchema } from "../lib/seo";
import { useLanguage } from "./context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const meta = isSEO_V2
    ? buildMeta({
        title: isFinnish ? "Tietosuojaseloste – Mitrox Oy" : "Privacy Policy – Mitrox Oy",
        description: isFinnish
          ? "Lue Mitrox Oy:n tietosuojaseloste: rekisterinpitäjä, käsittelyn tarkoitus, oikeudet, evästeet ja tietoturva."
          : "Read Mitrox Oy's privacy policy: data controller, processing purposes, rights, cookies, and data security.",
        path: "/privacy-policy",
        keywords: isFinnish
          ? ["tietosuojaseloste", "GDPR", "evästeet", "Mitrox Oy", "yksityisyydensuoja"]
          : ["privacy policy", "GDPR", "cookies", "Mitrox Oy", "data protection"],
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(),
        breadcrumbSchema([
          { name: isFinnish ? "Etusivu" : "Home", href: "/" },
          { name: isFinnish ? "Tietosuojaseloste" : "Privacy Policy", href: "/privacy-policy" },
        ]),
      ]
    : [];

  const sectionHeading =
    "mt-10 text-xl md:text-2xl font-semibold tracking-tight text-white";
  const bodyText = "mt-3 text-body-subtle leading-relaxed md:leading-8";
  const listClass = "list-disc pl-6 mt-2 space-y-2 text-body-subtle";
  const sectionClass = `${sectionHeading} scroll-mt-24`;

  const onTocClick = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ fontFamily: '"Onest", sans-serif', backgroundColor: "#000000" }}
    >
      <SEOHead
        title={meta?.title || (isFinnish ? "Tietosuojaseloste – Mitrox Oy" : "Privacy Policy – Mitrox Oy")}
        description={
          meta?.description ||
          (isFinnish
            ? "Mitrox Oy:n tietosuojaseloste. Rekisterinpitäjä, käyttötarkoitus, tietosisältö, oikeudet, evästeet ja tietoturva."
            : "Mitrox Oy's privacy policy. Data controller, purpose of use, data content, rights, cookies, and data security.")
        }
        url={meta?.url || "https://mitrox.io/privacy-policy"}
        keywords={
          meta?.keywords?.join(", ") || (isFinnish ? "tietosuojaseloste, GDPR, evästeet, Mitrox Oy" : "privacy policy, GDPR, cookies, Mitrox Oy")
        }
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang={language} />}

      <Header />

      <main className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
            {isFinnish ? "Tietosuojaseloste – Mitrox Oy" : "Privacy Policy – Mitrox Oy"}
          </h1>
          <p className="mt-4 text-body-muted">{isFinnish ? "Voimassa alkaen: 4.11.2025" : "Effective from: November 4, 2025"}</p>

          {/* Sisällysluettelo */}
          <nav className="mt-8 border border-white/10 bg-black/40 p-4" aria-label={isFinnish ? "Sisällysluettelo" : "Table of Contents"}>
            <ol className="list-decimal pl-6 space-y-2 text-white/80">
              <li><a className="hover:underline" href="#" onClick={onTocClick("rekisterin-nimi")}>{isFinnish ? "Rekisterin nimi" : "Name of the Register"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("kayttotarkoitus")}>{isFinnish ? "Rekisterin käyttötarkoitus" : "Purpose of Use of the Register"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietosisalto")}>{isFinnish ? "Rekisterin tietosisältö" : "Data Content of the Register"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietolahteet")}>{isFinnish ? "Tietolähteet" : "Data Sources"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("luovutus-siirto")}>{isFinnish ? "Tietojen luovuttaminen ja siirto" : "Disclosure and Transfer of Data"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("sailytysaika")}>{isFinnish ? "Tietojen säilytysaika" : "Data Retention Period"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("oikeudet")}>{isFinnish ? "Rekisteröidyn oikeudet" : "Rights of the Data Subject"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("evasteet-analytiikka")}>{isFinnish ? "Evästeet ja analytiikka" : "Cookies and Analytics"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietoturva")}>{isFinnish ? "Tietoturva" : "Data Security"}</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("muutokset")}>{isFinnish ? "Muutokset tietosuojaselosteeseen" : "Changes to the Privacy Policy"}</a></li>
            </ol>
          </nav>

          <section className={sectionClass} id="rekisterinpitaea">
            <h2 className="text-lg md:text-xl font-semibold text-white/90 mt-10">{isFinnish ? "Rekisterinpitäjä" : "Data Controller"}</h2>
            <p className={bodyText}>
              Mitrox Oy<br />
              {isFinnish ? "Y-tunnus: 3562179-8" : "Business ID: 3562179-8"}<br />
              {isFinnish ? "Sähköposti: " : "Email: "}<a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">info@mitrox.io</a>
            </p>
          </section>

          <section className={sectionClass} id="rekisterin-nimi">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">1. {isFinnish ? "Rekisterin nimi" : "Name of the Register"}</h2>
            <p className={bodyText}>{isFinnish ? "Mitrox Oy:n asiakas-, yhteydenotto- ja markkinointirekisteri." : "Customer, contact, and marketing register of Mitrox Oy."}</p>
          </section>

          <section className={sectionClass} id="kayttotarkoitus">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">2. {isFinnish ? "Rekisterin käyttötarkoitus" : "Purpose of Processing Personal Data"}</h2>
            <p className={bodyText}>
              {isFinnish ? "Henkilötietoja käsitellään seuraaviin tarkoituksiin:" : "Personal data is processed for the following purposes:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "asiakas- ja sopimussuhteiden hoitoon" : "Managing and developing customer and contractual relationships"}</li>
              <li>{isFinnish ? "verkkosivujen ja palveluiden toteuttamiseen ja kehittämiseen" : "Implementing and improving websites and services"}</li>
              <li>{isFinnish ? "tilausten ja palvelupyyntöjen käsittelyyn" : "Processing orders and service requests"}</li>
              <li>{isFinnish ? "asiakaspalveluun ja viestintään" : "Providing customer support and communication"}</li>
              <li>{isFinnish ? "markkinointiin, uutiskirjeisiin ja kampanjoihin (vain suostumuksella)" : "Marketing, newsletters, and campaigns (based on consent)"}</li>
              <li>{isFinnish ? "lakisääteisten velvoitteiden täyttämiseen." : "Fulfilling legal obligations"}</li>
            </ul>
          </section>

          <section className={sectionClass} id="tietosisalto">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">3. {isFinnish ? "Rekisterin tietosisältö" : "Data Categories"}</h2>
            <p className={bodyText}>
              {isFinnish ? "Rekisteri voi sisältää seuraavia tietoja:" : "The register may contain the following information:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "nimi, yrityksen nimi ja yhteystiedot (sähköposti, puhelin, osoite)" : "Name, company name, and contact details (email, phone, address)"}</li>
              <li>{isFinnish ? "verkkosivujen yhteydenottolomakkeilla annetut tiedot" : "Information provided through website contact forms"}</li>
              <li>{isFinnish ? "asiakkuuteen ja sopimukseen liittyvät tiedot" : "Information related to customer relationships and contracts"}</li>
              <li>{isFinnish ? "laskutus- ja maksutiedot" : "Billing and payment details"}</li>
              <li>{isFinnish ? "käyttäjän suostumukset ja yhteydenottohistoria" : "User consents and communication history"}</li>
              <li>{isFinnish ? "tekniset tiedot verkkosivukäytöstä (IP-osoite, selaintiedot, evästeet)." : "Technical data about website use (e.g. IP address, browser information, cookies)"}</li>
            </ul>
          </section>

          <section className={sectionClass} id="tietolahteet">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">4. {isFinnish ? "Tietolähteet" : "Data Sources"}</h2>
            <p className={bodyText}>
              {isFinnish ? "Henkilötietoja kerätään ensisijaisesti:" : "Personal data is primarily collected:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "asiakkaalta itseltään (esim. yhteydenottolomakkeet, sähköposti, puhelin, sopimukset)" : "From the data subject (e.g. contact forms, email, phone, contracts)"}</li>
              <li>{isFinnish ? "evästeiden ja analytiikan kautta (esim. Google Analytics, Meta Pixel)" : "Through cookies and analytics tools (e.g. Google Analytics, Meta Pixel)"}</li>
              <li>{isFinnish ? "julkisista lähteistä (kuten YTJ)." : "From public registers (e.g. Business Information System / YTJ)"}</li>
            </ul>
          </section>

          <section className={sectionClass} id="luovutus-siirto">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">5. {isFinnish ? "Tietojen luovuttaminen ja siirto" : "Data Disclosure and Transfers"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Tietoja ei luovuteta kolmansille osapuolille ilman asiakkaan suostumusta, paitsi:"
                : "Personal data is not disclosed to third parties without consent, except:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "kun laki tai viranomaismääräys niin vaatii" : "When required by law or an authority order"}</li>
              <li>
                {isFinnish
                  ? "kun palvelun tekninen toteutus edellyttää tietojen käsittelyä ulkoisella palveluntarjoajalla (esim. hosting, analytiikka, maksupalvelut)."
                  : "When required for the technical implementation of services (e.g. hosting, analytics, payment providers)"}
              </li>
            </ul>
            <p className={bodyText}>
              {isFinnish
                ? "Tietoja voidaan siirtää EU- tai ETA-alueen ulkopuolelle vain, jos tietosuojan taso on riittävä ja GDPR:n mukainen."
                : "If data is transferred outside the EU or EEA, Mitrox ensures that the receiving country offers an adequate level of data protection in accordance with the GDPR (e.g. through the EU-U.S. Data Privacy Framework or standard contractual clauses)."}
            </p>
          </section>

          <section className={sectionClass} id="sailytysaika">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">6. {isFinnish ? "Tietojen säilytysaika" : "Data Retention"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Henkilötietoja säilytetään vain niin kauan kuin:"
                : "Personal data is retained only as long as:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "asiakassuhteen hoitamiseksi" : "Necessary for managing the customer relationship,"}</li>
              <li>{isFinnish ? "lakisääteisten velvoitteiden täyttämiseksi" : "Required to meet legal obligations, or"}</li>
              <li>{isFinnish ? "tai kunnes käyttäjä peruuttaa suostumuksensa markkinointiin." : "Until the data subject withdraws consent for marketing."}</li>
            </ul>
            <p className={bodyText}>
              {isFinnish
                ? "Tämän jälkeen tiedot poistetaan turvallisesti tai anonymisoidaan."
                : "After this, the data is securely deleted or anonymized."}
            </p>
          </section>

          <section className={sectionClass} id="oikeudet">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">7. {isFinnish ? "Rekisteröidyn oikeudet" : "Rights of the Data Subject"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Rekisteröidyllä on oikeus:"
                : "The data subject has the right to:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "tarkastaa omat tietonsa" : "Access their personal data"}</li>
              <li>{isFinnish ? "vaatia virheellisten tietojen oikaisua" : "Request rectification or erasure of data"}</li>
              <li>{isFinnish ? "rajoittaa tai vastustaa tietojensa käsittelyä" : "Restrict or object to processing"}</li>
              <li>{isFinnish ? "peruuttaa suostumuksensa milloin tahansa" : "Withdraw consent at any time"}</li>
              <li>{isFinnish ? "tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto)." : "File a complaint with the Office of the Data Protection Ombudsman (www.tietosuoja.fi)"}</li>
            </ul>
            <p className={bodyText}>
              {isFinnish ? "Pyynnöt voi lähettää osoitteeseen " : "Requests can be sent to "}
              <a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">info@mitrox.io</a>
            </p>
          </section>

          <section className={sectionClass} id="evasteet-analytiikka">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">8. {isFinnish ? "Evästeet ja analytiikka" : "Cookies and Analytics"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Verkkosivustomme käyttää evästeitä parantaakseen käyttäjäkokemusta ja analysoidakseen liikennettä."
                : "Our website uses cookies to improve user experience and analyze traffic."}
            </p>
            <p className={bodyText}>{isFinnish ? "Käytämme mm.:" : "We use, among others:"}</p>
            <ul className={listClass}>
              <li>{isFinnish ? "Google Analytics (sivuston käyttötilastot)" : "Google Analytics (website usage statistics)"}</li>
              <li>{isFinnish ? "Meta Pixel (mainonnan kohdentaminen)." : "Meta Pixel (advertising targeting)."}</li>
            </ul>
            <p className={bodyText}>
              {isFinnish
                ? "Käyttäjä voi hallita tai estää evästeiden käytön selaimen asetuksista."
                : "Users can control or block the use of cookies in their browser settings."}
            </p>
          </section>

          <section className={sectionClass} id="tietoturva">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">9. {isFinnish ? "Tietoturva" : "Data Security"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Tietoja käsitellään luottamuksellisesti ja suojataan teknisin sekä organisatorisin keinoin:"
                : "Data is processed confidentially and protected by technical and organizational means:"}
            </p>
            <ul className={listClass}>
              <li>{isFinnish ? "SSL-salaus verkkosivustolla" : "SSL encryption on the website"}</li>
              <li>{isFinnish ? "rajoitettu pääsy rekisteriin vain tarvittaville henkilöille" : "restricted access to the register only for necessary personnel"}</li>
              <li>{isFinnish ? "säännöllinen varmuuskopiointi ja tietoturvapäivitykset." : "regular backups and security updates."}</li>
            </ul>
          </section>

          <section className={sectionClass} id="muutokset">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">10. {isFinnish ? "Muutokset tietosuojaselosteeseen" : "Changes to the Privacy Policy"}</h2>
            <p className={bodyText}>
              {isFinnish
                ? "Pidätämme oikeuden päivittää tätä selostetta, mikäli tietosuoja- tai palvelukäytännöt muuttuvat. Uusin versio on aina saatavilla osoitteessa "
                : "We reserve the right to update this policy if data protection or service practices change. The latest version is always available at "}
              <a className="text-blue-300 hover:underline" href="https://mitrox.io" target="_blank" rel="noreferrer">https://mitrox.io</a>
            </p>
          </section>

          {/* Tulostustyyli huomioidaan globaalisti, mutta jätetään navigaatio pois printissä */}
        </div>
      </main>

      <Footer />
    </div>
  );
}


