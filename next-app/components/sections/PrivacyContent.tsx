import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";

// Full legal text ported from the previous site (src/PrivacyPolicyPage.tsx) —
// content preserved as-is, only the visual styling was updated to match the
// current dark/glass design system.
export default function PrivacyContent({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const isFinnish = locale === "fi";

  const h2 = "text-base sm:text-lg md:text-xl font-semibold text-white/90 mt-10";
  const body = "mt-3 text-white/70 leading-relaxed";
  const list = "list-disc pl-5 sm:pl-6 mt-2 space-y-2 text-white/70";

  return (
    <section className="relative py-20 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 flex-1">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white">{dict.privacy.title}</h1>
        <p className="mt-2 text-sm text-white/50">{dict.privacy.updated}</p>

        <section id="rekisterinpitaja">
          <h2 className={h2}>{isFinnish ? "Rekisterinpitäjä" : "Data Controller"}</h2>
          <p className={body}>
            Mitrox Oy
            <br />
            {isFinnish ? "Y-tunnus: 3562179-8" : "Business ID: 3562179-8"}
            <br />
            {isFinnish ? "Sähköposti: " : "Email: "}
            <a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">
              info@mitrox.io
            </a>
          </p>
        </section>

        <section id="rekisterin-nimi">
          <h2 className={h2}>1. {isFinnish ? "Rekisterin nimi" : "Name of the Register"}</h2>
          <p className={body}>
            {isFinnish
              ? "Mitrox Oy:n asiakas-, yhteydenotto- ja markkinointirekisteri."
              : "Customer, contact, and marketing register of Mitrox Oy."}
          </p>
        </section>

        <section id="kayttotarkoitus">
          <h2 className={h2}>2. {isFinnish ? "Rekisterin käyttötarkoitus" : "Purpose of Processing Personal Data"}</h2>
          <p className={body}>
            {isFinnish ? "Henkilötietoja käsitellään seuraaviin tarkoituksiin:" : "Personal data is processed for the following purposes:"}
          </p>
          <ul className={list}>
            <li>{isFinnish ? "asiakas- ja sopimussuhteiden hoitoon" : "Managing and developing customer and contractual relationships"}</li>
            <li>{isFinnish ? "verkkosivujen ja palveluiden toteuttamiseen ja kehittämiseen" : "Implementing and improving websites and services"}</li>
            <li>{isFinnish ? "tilausten ja palvelupyyntöjen käsittelyyn" : "Processing orders and service requests"}</li>
            <li>{isFinnish ? "asiakaspalveluun ja viestintään" : "Providing customer support and communication"}</li>
            <li>{isFinnish ? "markkinointiin, uutiskirjeisiin ja kampanjoihin (vain suostumuksella)" : "Marketing, newsletters, and campaigns (based on consent)"}</li>
            <li>{isFinnish ? "lakisääteisten velvoitteiden täyttämiseen." : "Fulfilling legal obligations"}</li>
          </ul>
        </section>

        <section id="tietosisalto">
          <h2 className={h2}>3. {isFinnish ? "Rekisterin tietosisältö" : "Data Categories"}</h2>
          <p className={body}>{isFinnish ? "Rekisteri voi sisältää seuraavia tietoja:" : "The register may contain the following information:"}</p>
          <ul className={list}>
            <li>{isFinnish ? "nimi, yrityksen nimi ja yhteystiedot (sähköposti, puhelin, osoite)" : "Name, company name, and contact details (email, phone, address)"}</li>
            <li>{isFinnish ? "verkkosivujen yhteydenottolomakkeilla annetut tiedot" : "Information provided through website contact forms"}</li>
            <li>{isFinnish ? "asiakkuuteen ja sopimukseen liittyvät tiedot" : "Information related to customer relationships and contracts"}</li>
            <li>{isFinnish ? "laskutus- ja maksutiedot" : "Billing and payment details"}</li>
            <li>{isFinnish ? "käyttäjän suostumukset ja yhteydenottohistoria" : "User consents and communication history"}</li>
            <li>{isFinnish ? "tekniset tiedot verkkosivukäytöstä (IP-osoite, selaintiedot, evästeet)." : "Technical data about website use (e.g. IP address, browser information, cookies)"}</li>
          </ul>
        </section>

        <section id="tietolahteet">
          <h2 className={h2}>4. {isFinnish ? "Tietolähteet" : "Data Sources"}</h2>
          <p className={body}>{isFinnish ? "Henkilötietoja kerätään ensisijaisesti:" : "Personal data is primarily collected:"}</p>
          <ul className={list}>
            <li>{isFinnish ? "asiakkaalta itseltään (esim. yhteydenottolomakkeet, sähköposti, puhelin, sopimukset)" : "From the data subject (e.g. contact forms, email, phone, contracts)"}</li>
            <li>{isFinnish ? "evästeiden ja analytiikan kautta (esim. Google Analytics, Meta Pixel)" : "Through cookies and analytics tools (e.g. Google Analytics, Meta Pixel)"}</li>
            <li>{isFinnish ? "julkisista lähteistä (kuten YTJ)." : "From public registers (e.g. Business Information System / YTJ)"}</li>
          </ul>
        </section>

        <section id="luovutus-siirto">
          <h2 className={h2}>5. {isFinnish ? "Tietojen luovuttaminen ja siirto" : "Data Disclosure and Transfers"}</h2>
          <p className={body}>
            {isFinnish
              ? "Tietoja ei luovuteta kolmansille osapuolille ilman asiakkaan suostumusta, paitsi:"
              : "Personal data is not disclosed to third parties without consent, except:"}
          </p>
          <ul className={list}>
            <li>{isFinnish ? "kun laki tai viranomaismääräys niin vaatii" : "When required by law or an authority order"}</li>
            <li>
              {isFinnish
                ? "kun palvelun tekninen toteutus edellyttää tietojen käsittelyä ulkoisella palveluntarjoajalla (esim. hosting, analytiikka, maksupalvelut)."
                : "When required for the technical implementation of services (e.g. hosting, analytics, payment providers)"}
            </li>
          </ul>
          <p className={body}>
            {isFinnish
              ? "Tietoja voidaan siirtää EU- tai ETA-alueen ulkopuolelle vain, jos tietosuojan taso on riittävä ja GDPR:n mukainen."
              : "If data is transferred outside the EU or EEA, Mitrox ensures that the receiving country offers an adequate level of data protection in accordance with the GDPR (e.g. through the EU-U.S. Data Privacy Framework or standard contractual clauses)."}
          </p>
        </section>

        <section id="sailytysaika">
          <h2 className={h2}>6. {isFinnish ? "Tietojen säilytysaika" : "Data Retention"}</h2>
          <p className={body}>{isFinnish ? "Henkilötietoja säilytetään vain niin kauan kuin:" : "Personal data is retained only as long as:"}</p>
          <ul className={list}>
            <li>{isFinnish ? "asiakassuhteen hoitamiseksi" : "Necessary for managing the customer relationship,"}</li>
            <li>{isFinnish ? "lakisääteisten velvoitteiden täyttämiseksi" : "Required to meet legal obligations, or"}</li>
            <li>{isFinnish ? "tai kunnes käyttäjä peruuttaa suostumuksensa markkinointiin." : "Until the data subject withdraws consent for marketing."}</li>
          </ul>
          <p className={body}>
            {isFinnish ? "Tämän jälkeen tiedot poistetaan turvallisesti tai anonymisoidaan." : "After this, the data is securely deleted or anonymized."}
          </p>
        </section>

        <section id="oikeudet">
          <h2 className={h2}>7. {isFinnish ? "Rekisteröidyn oikeudet" : "Rights of the Data Subject"}</h2>
          <p className={body}>{isFinnish ? "Rekisteröidyllä on oikeus:" : "The data subject has the right to:"}</p>
          <ul className={list}>
            <li>{isFinnish ? "tarkastaa omat tietonsa" : "Access their personal data"}</li>
            <li>{isFinnish ? "vaatia virheellisten tietojen oikaisua" : "Request rectification or erasure of data"}</li>
            <li>{isFinnish ? "rajoittaa tai vastustaa tietojensa käsittelyä" : "Restrict or object to processing"}</li>
            <li>{isFinnish ? "peruuttaa suostumuksensa milloin tahansa" : "Withdraw consent at any time"}</li>
            <li>{isFinnish ? "tehdä valitus valvontaviranomaiselle (Tietosuojavaltuutetun toimisto)." : "File a complaint with the Office of the Data Protection Ombudsman (www.tietosuoja.fi)"}</li>
          </ul>
          <p className={body}>
            {isFinnish ? "Pyynnöt voi lähettää osoitteeseen " : "Requests can be sent to "}
            <a className="text-blue-300 hover:underline" href="mailto:info@mitrox.io">
              info@mitrox.io
            </a>
          </p>
        </section>

        <section id="evasteet-analytiikka">
          <h2 className={h2}>8. {isFinnish ? "Evästeet ja analytiikka" : "Cookies and Analytics"}</h2>
          <p className={body}>
            {isFinnish
              ? "Verkkosivustomme käyttää evästeitä parantaakseen käyttäjäkokemusta ja analysoidakseen liikennettä."
              : "Our website uses cookies to improve user experience and analyze traffic."}
          </p>
          <p className={body}>{isFinnish ? "Käytämme mm.:" : "We use, among others:"}</p>
          <ul className={list}>
            <li>{isFinnish ? "Google Analytics (sivuston käyttötilastot)" : "Google Analytics (website usage statistics)"}</li>
            <li>{isFinnish ? "Meta Pixel (mainonnan kohdentaminen)." : "Meta Pixel (advertising targeting)."}</li>
          </ul>
          <p className={body}>
            {isFinnish
              ? "Käyttäjä voi hallita tai estää evästeiden käytön selaimen asetuksista."
              : "Users can control or block the use of cookies in their browser settings."}
          </p>
        </section>

        <section id="tietoturva">
          <h2 className={h2}>9. {isFinnish ? "Tietoturva" : "Data Security"}</h2>
          <p className={body}>
            {isFinnish
              ? "Tietoja käsitellään luottamuksellisesti ja suojataan teknisin sekä organisatorisin keinoin:"
              : "Data is processed confidentially and protected by technical and organizational means:"}
          </p>
          <ul className={list}>
            <li>{isFinnish ? "SSL-salaus verkkosivustolla" : "SSL encryption on the website"}</li>
            <li>{isFinnish ? "rajoitettu pääsy rekisteriin vain tarvittaville henkilöille" : "restricted access to the register only for necessary personnel"}</li>
            <li>{isFinnish ? "säännöllinen varmuuskopiointi ja tietoturvapäivitykset." : "regular backups and security updates."}</li>
          </ul>
        </section>

        <section id="muutokset">
          <h2 className={h2}>10. {isFinnish ? "Muutokset tietosuojaselosteeseen" : "Changes to the Privacy Policy"}</h2>
          <p className={body}>
            {isFinnish
              ? "Pidätämme oikeuden päivittää tätä selostetta, mikäli tietosuoja- tai palvelukäytännöt muuttuvat. Uusin versio on aina saatavilla osoitteessa "
              : "We reserve the right to update this policy if data protection or service practices change. The latest version is always available at "}
            <a className="text-blue-300 hover:underline" href="https://mitrox.io" target="_blank" rel="noreferrer">
              https://mitrox.io
            </a>
          </p>
        </section>
      </div>
    </section>
  );
}
