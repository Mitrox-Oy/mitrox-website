import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { buildMeta, breadcrumbSchema, organizationSchema } from "../lib/seo";

export default function PrivacyPolicyPage() {
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const meta = isSEO_V2
    ? buildMeta({
        title: "Tietosuojaseloste – Mitrox Oy",
        description:
          "Lue Mitrox Oy:n tietosuojaseloste: rekisterinpitäjä, käsittelyn tarkoitus, oikeudet, evästeet ja tietoturva.",
        path: "/privacy-policy",
        keywords: [
          "tietosuojaseloste",
          "GDPR",
          "evästeet",
          "Mitrox Oy",
          "yksityisyydensuoja",
        ],
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(),
        breadcrumbSchema([
          { name: "Etusivu", href: "/" },
          { name: "Tietosuojaseloste", href: "/privacy-policy" },
        ]),
      ]
    : [];

  const sectionHeading =
    "mt-10 text-xl md:text-2xl font-semibold tracking-tight text-white";
  const bodyText = "mt-3 text-white/70 leading-relaxed md:leading-8";
  const listClass = "list-disc pl-6 mt-2 space-y-2 text-white/70";
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
        title={meta?.title || "Tietosuojaseloste – Mitrox Oy"}
        description={
          meta?.description ||
          "Mitrox Oy:n tietosuojaseloste. Rekisterinpitäjä, käyttötarkoitus, tietosisältö, oikeudet, evästeet ja tietoturva."
        }
        url={meta?.url || "https://mitrox.io/privacy-policy"}
        keywords={
          meta?.keywords?.join(", ") || "tietosuojaseloste, GDPR, evästeet, Mitrox Oy"
        }
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang="fi" />}

      <Header />

      <main className="pt-28 pb-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
            Tietosuojaseloste – Mitrox Oy
          </h1>
          <p className="mt-4 text-white/70">Voimassa alkaen: 4.11.2025</p>

          {/* Sisällysluettelo */}
          <nav className="mt-8 border border-white/10 bg-black/40 p-4" aria-label="Sisällysluettelo">
            <ol className="list-decimal pl-6 space-y-2 text-white/80">
              <li><a className="hover:underline" href="#" onClick={onTocClick("rekisterin-nimi")}>Rekisterin nimi</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("kayttotarkoitus")}>Rekisterin käyttötarkoitus</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietosisalto")}>Rekisterin tietosisältö</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietolahteet")}>Tietolähteet</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("luovutus-siirto")}>Tietojen luovuttaminen ja siirto</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("sailytysaika")}>Tietojen säilytysaika</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("oikeudet")}>Rekisteröidyn oikeudet</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("evasteet-analytiikka")}>Evästeet ja analytiikka</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("tietoturva")}>Tietoturva</a></li>
              <li><a className="hover:underline" href="#" onClick={onTocClick("muutokset")}>Muutokset tietosuojaselosteeseen</a></li>
            </ol>
          </nav>

          <section className={sectionClass} id="rekisterinpitaea">
            <h2 className="text-lg md:text-xl font-semibold text-white/90 mt-10">Rekisterinpitäjä</h2>
            <p className={bodyText}>
              Mitrox Oy<br />
              Y-tunnus: 3562179-8<br />
              Sähköposti: <a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">info@mitrox.io</a>
            </p>
          </section>

          <section className={sectionClass} id="rekisterin-nimi">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">1. Rekisterin nimi</h2>
            <p className={bodyText}>Mitrox Oy:n asiakas-, yhteydenotto- ja markkinointirekisteri.</p>
          </section>

          <section className={sectionClass} id="kayttotarkoitus">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">2. Rekisterin käyttötarkoitus</h2>
            <ul className={listClass}>
              <li>asiakas- ja sopimussuhteiden hoitoon</li>
              <li>verkkosivujen ja palveluiden toteuttamiseen ja kehittämiseen</li>
              <li>tilausten ja palvelupyyntöjen käsittelyyn</li>
              <li>asiakaspalveluun ja viestintään</li>
              <li>markkinointiin, uutiskirjeisiin ja kampanjoihin (vain suostumuksella)</li>
              <li>lakisääteisten velvoitteiden täyttämiseen.</li>
            </ul>
          </section>

          <section className={sectionClass} id="tietosisalto">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">3. Rekisterin tietosisältö</h2>
            <ul className={listClass}>
              <li>nimi, yrityksen nimi ja yhteystiedot (sähköposti, puhelin, osoite)</li>
              <li>verkkosivujen yhteydenottolomakkeilla annetut tiedot</li>
              <li>asiakkuuteen ja sopimukseen liittyvät tiedot</li>
              <li>laskutus- ja maksutiedot</li>
              <li>käyttäjän suostumukset ja yhteydenottohistoria</li>
              <li>tekniset tiedot verkkosivukäytöstä (IP-osoite, selaintiedot, evästeet).</li>
            </ul>
          </section>

          <section className={sectionClass} id="tietolahteet">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">4. Tietolähteet</h2>
            <ul className={listClass}>
              <li>asiakkaalta itseltään (esim. yhteydenottolomakkeet, sähköposti, puhelin, sopimukset)</li>
              <li>evästeiden ja analytiikan kautta (esim. Google Analytics, Meta Pixel)</li>
              <li>julkisista lähteistä (kuten YTJ).</li>
            </ul>
          </section>

          <section className={sectionClass} id="luovutus-siirto">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">5. Tietojen luovuttaminen ja siirto</h2>
            <p className={bodyText}>
              Tietoja ei luovuteta kolmansille osapuolille ilman asiakkaan suostumusta, paitsi:
            </p>
            <ul className={listClass}>
              <li>kun laki tai viranomaismääräys niin vaatii</li>
              <li>
                kun palvelun tekninen toteutus edellyttää tietojen käsittelyä ulkoisella palveluntarjoajalla (esim. hosting, analytiikka,
                maksupalvelut).
              </li>
            </ul>
            <p className={bodyText}>
              Tietoja voidaan siirtää EU- tai ETA-alueen ulkopuolelle vain, jos tietosuojan taso on riittävä ja GDPR:n mukainen.
            </p>
          </section>

          <section className={sectionClass} id="sailytysaika">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">6. Tietojen säilytysaika</h2>
            <ul className={listClass}>
              <li>asiakassuhteen hoitamiseksi</li>
              <li>lakisääteisten velvoitteiden täyttämiseksi</li>
              <li>tai kunnes käyttäjä peruuttaa suostumuksensa markkinointiin.</li>
            </ul>
          </section>

          <section className={sectionClass} id="oikeudet">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">7. Rekisteröidyn oikeudet</h2>
            <ul className={listClass}>
              <li>tarkastaa omat tietonsa</li>
              <li>vaatia virheellisten tietojen oikaisua</li>
              <li>pyytää tietojen poistamista ("oikeus tulla unohdetuksi")</li>
              <li>rajoittaa tai vastustaa tietojensa käsittelyä</li>
              <li>peruuttaa suostumuksensa milloin tahansa</li>
              <li>tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto).</li>
            </ul>
            <p className={bodyText}>Pyynnöt voi lähettää osoitteeseen <a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">info@mitrox.io</a></p>
          </section>

          <section className={sectionClass} id="evasteet-analytiikka">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">8. Evästeet ja analytiikka</h2>
            <p className={bodyText}>
              Verkkosivustomme käyttää evästeitä parantaakseen käyttäjäkokemusta ja analysoidakseen liikennettä.
            </p>
            <p className={bodyText}>Käytämme mm.:</p>
            <ul className={listClass}>
              <li>Google Analytics (sivuston käyttötilastot)</li>
              <li>Meta Pixel (mainonnan kohdentaminen).</li>
            </ul>
            <p className={bodyText}>Käyttäjä voi hallita tai estää evästeiden käytön selaimen asetuksista.</p>
          </section>

          <section className={sectionClass} id="tietoturva">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">9. Tietoturva</h2>
            <p className={bodyText}>Tietoja käsitellään luottamuksellisesti ja suojataan teknisin sekä organisatorisin keinoin:</p>
            <ul className={listClass}>
              <li>SSL-salaus verkkosivustolla</li>
              <li>rajoitettu pääsy rekisteriin vain tarvittaville henkilöille</li>
              <li>säännöllinen varmuuskopiointi ja tietoturvapäivitykset.</li>
            </ul>
          </section>

          <section className={sectionClass} id="muutokset">
            <h2 className="text-lg md:text-xl font-semibold text-white/90">10. Muutokset tietosuojaselosteeseen</h2>
            <p className={bodyText}>
              Pidätämme oikeuden päivittää tätä selostetta, mikäli tietosuoja- tai palvelukäytännöt muuttuvat. Uusin versio on aina saatavilla
              osoitteessa <a className="text-blue-300 hover:underline" href="https://mitrox.io" target="_blank" rel="noreferrer">https://mitrox.io</a>
            </p>
          </section>

          {/* Tulostustyyli huomioidaan globaalisti, mutta jätetään navigaatio pois printissä */}
        </div>
      </main>

      <Footer />
    </div>
  );
}


