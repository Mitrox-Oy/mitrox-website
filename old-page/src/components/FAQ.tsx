import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SEOEnhanced from './SEOEnhanced';
import { faqSchema, FAQItem } from '../../lib/seo';
import { useLocalizedSectionId } from '../hooks/useLocalizedSectionId';
import { useLanguage } from '../context/LanguageContext';

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

type FAQType = "website" | "advisor";

const websiteFAQData: FAQCategory[] = [
  {
    title: "1. Hinnat ja sopimus",
    items: [
      {
        question: "Mitä verkkosivusto maksaa?",
        answer: "Aloitusmaksu on 599 €, joka sisältää jopa 5 sivua ja sivuston suunnittelun yrityksesi tarpeisiin. Lisäsivut maksavat 99 € / sivu. Kuukausimaksu on 39 € / kk tai 35 € / kk vuosilaskutuksella. Tuemme myös 3 vuoden maksua 20% alennuksella. Hinnat ovat verottomia (ALV 25,5 % lisätään)."
      },
      {
        question: "Sisältyykö hintaan ALV?",
        answer: "Kaikki hinnat ilmoitetaan verottomina, ja ALV 25,5 % lisätään laskutuksessa."
      },
      {
        question: "Voinko maksaa kuukausittain tai vuosittain?",
        answer: "Kyllä. Voit valita kuukausi- tai vuosilaskutuksen. Vuosilaskutus on edullisempi vaihtoehto ja sisältää samat palvelut."
      },
      {
        question: "Voinko maksaa useamman vuoden kerrallaan?",
        answer: "Kyllä. Tuemme 3 vuoden maksua 20% alennuksella. Tämä on tarkoitettu yrityksille ketkä kaipaavat vakautta pitkäksi aikaa."
      },
      {
        question: "Mikä on perustamismaksu ja miksi sitä peritään?",
        answer: "Aloitusmaksu kattaa sivuston suunnittelun, rakenteen, asennuksen ja käyttöönoton. Se on kertaluonteinen maksu, joka mahdollistaa laadukkaan aloituksen ilman piilokuluja."
      },
      {
        question: "Mitä tapahtuu, jos lopetan palvelun?",
        answer: "Voit päättää palvelun milloin tahansa. Kun palvelu päättyy, käyttöoikeus Mitrox-verkkosivualustaan ja sen ominaisuuksiin lakkaa. Sivuston sisältö (tekstit ja kuvat) on kuitenkin sinun omaisuuttasi, ja ne voidaan halutessasi siirtää toiseen ympäristöön lisämaksusta. Viimeinen laskutus tapahtuu kuluvan laskutuskauden mukaisesti."
      },
      {
        question: "Omistanko verkkosivuston itse?",
        answer: "Verkkosivusto toimii Mitroxin lisenssimallilla. Sivuston alusta ja tekninen toteutus pysyvät Mitroxin hallinnassa, mutta kaikki sisältö – kuten tekstit, kuvat ja brändimateriaali – ovat täysin sinun omaisuuttasi. Voit pyytää sisällöt käyttöösi milloin tahansa, myös palvelun päätyttyä lisämaksusta."
      },
      {
        question: "Tarjoatteko osto-option sivuston omistamiseen?",
        answer: "Kyllä. Jos haluat siirtyä täysin omalle palvelimellesi ja omistaa myös sivuston teknisen rakenteen, tarjoamme siihen osto-option erillistä kertamaksua vastaan. Tällöin käyttöoikeus muuttuu pysyväksi ja vastaat itse ylläpidosta jatkossa."
      }
    ]
  },
  {
    title: "2. Toteutus ja aikataulu",
    items: [
      {
        question: "Kuinka kauan verkkosivuston toteutus kestää?",
        answer: "Perussivustot valmistuvat yleensä 2 viikossa. Aikataulu tarkentuu kyselylomakkeen ja sisältöjen toimittamisen jälkeen."
      },
      {
        question: "Miten prosessi etenee alusta loppuun?",
        answer: "Prosessi etenee neljässä vaiheessa: Kyselylomake ja aloitus, Suunnittelu ja rakentaminen, Katselmus ja viimeistely, sekä Julkaisu ja ylläpito. Pidämme sinut ajan tasalla koko projektin ajan."
      },
      {
        question: "Voinko osallistua suunnitteluun?",
        answer: "Ehdottomasti. Käymme läpi sivuston rakenteen ja designin yhdessä ennen toteutusta, jotta lopputulos vastaa brändiäsi ja tavoitteitasi."
      },
      {
        question: "Milloin saan nähdä ensimmäisen version?",
        answer: "Ensimmäinen luonnos valmistuu yleensä viikon sisällä aloituksesta. Sen jälkeen teemme tarvittavat muokkaukset ennen julkaisua."
      },
      {
        question: "Miten annan palautetta ja teen muutoksia?",
        answer: "Kaikki muutospyynnöt hoidetaan helposti sähköpostitse. Saat selkeän katselmuksen jokaisesta vaiheesta."
      }
    ]
  },
  {
    title: "3. Ylläpito, tuki ja tietoturva",
    items: [
      {
        question: "Mitä kuukausimaksuun sisältyy?",
        answer: "Kuukausimaksu sisältää hostingin, teknisen ylläpidon, tietoturvapäivitykset, varmuuskopiot, SEO-perusasetukset, analytiikkaraportit sekä jopa 4 sisältö- tai designpäivitystä kuukaudessa."
      },
      {
        question: "Sisältyykö hakukoneoptimointi (SEO)?",
        answer: "Kyllä. Jokainen sivusto sisältää perusoptimoinnin: metatiedot, otsikoinnit ja rakenteen hakukoneystävälliseen muotoon. Tarjoamme myös erillisiä SEO- ja kieliversiopalveluita laajempaan tarpeeseen."
      },
      {
        question: "Miten tietoturva ja varmuuskopiointi on hoidettu?",
        answer: "Tietoturvapäivitykset tehdään automaattisesti ja varmuuskopiot otetaan säännöllisesti. Sivustosi pysyy suojattuna ja palautettavissa kaikissa tilanteissa."
      },
      {
        question: "Mitä tapahtuu, jos sivusto kaatuu tai tarvitsen apua?",
        answer: "Premium-asiakastukemme auttaa nopeasti kaikissa tilanteissa. Valvomme palvelimia jatkuvasti ja korjaamme mahdolliset ongelmat ilman lisäkustannuksia."
      },
      {
        question: "Kuinka monta päivitystä voin pyytää kuukaudessa?",
        answer: "Kuukausimaksuun sisältyy 4 sisältö- tai designpäivitystä kuukaudessa. Ylimenevät muutokset maksavat 19 € / päivitys."
      }
    ]
  },
  {
    title: "4. Lisäpalvelut ja laajennukset",
    items: [
      {
        question: "Voinko laajentaa sivustoa myöhemmin?",
        answer: "Kyllä. Voit tilata uusia sivuja hintaan 99 € / sivu. Sivustoa voidaan myös päivittää uusilla ominaisuuksilla tai integraatioilla."
      },
      {
        question: "Voinko lisätä Mitrox AI Advisorin?",
        answer: "Kyllä. Mitrox AI Advisor on lisäpalvelu hintaan 55 € / kk alkaen (verkkosivupaketin yhteydessä). Se palvelee asiakkaitasi 24/7 ja kerää liidejä automaattisesti."
      },
      {
        question: "Tarjoatteko kaksikielisiä sivustoja?",
        answer: "Kyllä. Lisäkielipalvelu (Suomi ↔ Englanti) maksaa 199 € alkaen (5 sivua) ja sisältää käännökset, visuaaliset säädöt ja SEO-optimoidut metatiedot. Lisäsivut maksavat 49 € / sivu."
      },
      {
        question: "Mitä on laajempi hakukoneoptimointi?",
        answer: "Laajennettu hakukoneoptimointi parantaa sivustosi näkyvyyttä Googlessa jatkuvasti. Se sisältää sisällön ja rakenteen kehittämisen, nopeuden optimoinnin sekä säännöllisen seurannan ja raportoinnin — jotta sivustosi löytyy paremmin ja toimii nopeammin. Hinta on 79 € / kk alkaen."
      },
      {
        question: "Mitä muita lisäpalveluita voin tilata myöhemmin?",
        answer: "Mitrox kehittyy jatkuvasti, ja voit laajentaa sivustoasi uusilla ominaisuuksilla milloin tahansa olemalla meihin yhteydessä. Käymme yhdessä läpi toiveesi ja sovimme toteutuksesta – näin varmistamme, että ratkaisu sopii täydellisesti juuri sinun tarpeisiisi."
      }
    ]
  },
  {
    title: "5. Luottamus ja tyytyväisyystakuu",
    items: [
      {
        question: "Mitä tapahtuu, jos en ole tyytyväinen lopputulokseen?",
        answer: "Tarjoamme 14 päivän rahat takaisin -takuun projektin alusta. Jos et ole tyytyväinen, palautamme maksun ilman kysymyksiä. Haluamme varmistaa, että yhteistyö alkaa aina luottamuksella."
      },
      {
        question: "Miten varmistatte, että sivusto vastaa brändiäni?",
        answer: "Käymme suunnittelun kanssasi läpi jo ennen toteutusta. Huomioimme yrityksesi brändin, värit, tyylin ja viestinnän sävyn – ja viimeistelemme sivuston yksilöllisesti, jotta se näyttää ja tuntuu juuri teiltä."
      },
      {
        question: "Miten voin luottaa siihen, että projektini etenee suunnitellusti?",
        answer: "Pidämme sinut ajan tasalla jokaisessa vaiheessa ja varmistamme, että saat selkeän kuvan etenemisestä. Jokainen vaihe käydään läpi yhdessä ennen siirtymistä seuraavaan."
      }
    ]
  }
];

const aiAgentFAQData: FAQCategory[] = [
  {
    title: "1. Hinnat ja sopimus",
    items: [
      {
        question: "Mitä Mitrox AI Advisor maksaa?",
        answer: "Starter Advisor maksaa alkaen 63 €/kk ja Pro Advisor alkaen 103 €/kk. Tarjoamme myös 14 päivän maksuttoman kokeilujakson ja vuosilaskutuksen 20% alennuksella."
      },
      {
        question: "Sisältyykö hintaan ALV?",
        answer: "Kaikki hinnat ilmoitetaan verottomina, ja ALV 25,5 % lisätään laskutuksessa."
      },
      {
        question: "Voinko maksaa kuukausittain tai vuosittain?",
        answer: "Kyllä. Voit valita kuukausi- tai vuosilaskutuksen. Vuosilaskutus on 20% edullisempi vaihtoehto ja sisältää samat palvelut."
      },
      {
        question: "Onko kokeilujakso todella ilmainen?",
        answer: "Kyllä. Saat 14 päivää aikaa testata Mitrox AI Advisoria täysin ilmaiseksi ilman sitoumuksia. Voit peruuttaa milloin tahansa kokeilujakson aikana."
      },
      {
        question: "Mitä tapahtuu, jos lopetan palvelun?",
        answer: "Voit päättää palvelun milloin tahansa. Neuvoja poistetaan käytöstä ja käyttöoikeus lakkaa. Viimeinen laskutus tapahtuu kuluvan laskutuskauden mukaisesti."
      },
      {
        question: "Voinko vaihtaa pakettia myöhemmin?",
        answer: "Kyllä. Voit päivittää pakettia milloin tahansa. Jos vaihdat Pro-pakettiin, saat välittömästi käyttöösi kaikki Pro-ominaisuudet."
      }
    ]
  },
  {
    title: "2. Toteutus ja aikataulu",
    items: [
      {
        question: "Kuinka nopeasti Mitrox AI Advisor saadaan käyttöön?",
        answer: "Neuvoja voidaan ottaa käyttöön nopeasti. Prosessi sisältää 30 minuutin ideakartoituksen, toteutuksen, integraatiot ja käyttöönoton. Useimmat neuvojat ovat käytössä muutamassa päivässä."
      },
      {
        question: "Miten prosessi etenee alusta loppuun?",
        answer: "Prosessi etenee neljässä vaiheessa: Ideakartoitus, jossa määrittelemme tarpeet, Toteutus, jossa konfiguroimme neuvojan, Testaus, jossa testaamme yhdessä, sekä Käyttöönotto, jolloin neuvoja alkaa palvella asiakkaitasi."
      },
      {
        question: "Voinko osallistua neuvojan suunnitteluun?",
        answer: "Ehdottomasti. Ideakartoituksessa määrittelemme yhdessä, mitä neuvojan pitää osata ja miten sen pitää vastata. Voit myös antaa palautetta testausvaiheessa."
      },
      {
        question: "Milloin saan nähdä ensimmäisen version?",
        answer: "Ensimmäinen versio valmistuu yleensä muutamassa päivässä ideakartoituksen jälkeen. Sen jälkeen testaamme yhdessä ja teemme tarvittavat muutokset ennen käyttöönottoa."
      },
      {
        question: "Kuinka monta räätälöityä vastausta neuvojaan voidaan lisätä?",
        answer: "Starter-paketissa on 50 räätälöityä vastausta, Pro-paketissa rajoituksia ei ole. Voit laajentaa vastausten määrää milloin tahansa."
      }
    ]
  },
  {
    title: "3. Tekninen ja integraatiot",
    items: [
      {
        question: "Mikä on tietolähde?",
        answer: "Tietolähde on lähde, josta neuvoja hakee tietoa vastatessaan asiakkaiden kysymyksiin. Tietolähteitä voivat olla URL-osoitteet (esim. verkkosivut), dokumentit (PDF, Word, jne.) tai suoraan syötetyt tekstit. Neuvoja käyttää näitä tietolähteitä automaattisesti, jolloin se osaa vastata kysymyksiin tarkasti ja ajantasaisesti."
      },
      {
        question: "Mihin palvelimiin Mitrox AI Advisor voidaan integroida?",
        answer: "Neuvoja voidaan integroida verkkosivustolle, WhatsAppiin ja muihin kanaviin. Starter-paketissa voi liittää 30 tietolähdettä, Pro-paketissa 80 tietolähdettä."
      },
      {
        question: "Tarvitseeko neuvoja teknistä tukea minun puoleltani?",
        answer: "Ei. Me hoidamme kaiken teknisen puolen, mukaan lukien integraatiot ja ylläpidon. Sinun ei tarvitse olla tekninen asiantuntija."
      },
      {
        question: "Kuinka neuvoja oppii vastaamaan kysymyksiin?",
        answer: "Neuvoja käyttää räätälöityjä vastauksia, jotka luomme yhdessä. Se voi myös hakea tietoa liittämistäsi verkkosivuista, jolloin se osaa vastata kysymyksiin automaattisesti."
      },
      {
        question: "Onko Mitrox AI Advisor suomenkielinen?",
        answer: "Kyllä, kaikki paketit tukevat suomea. Pro-paketti tukee myös englantia (FI/EN)."
      },
      {
        question: "Miten neuvoja kerää liidejä?",
        answer: "Neuvoja kerää automaattisesti asiakkaiden yhteystiedot, kun he jättävät kyselyn tai pyytävät yhteydenottoa. Saat liidit suoraan analytiikkapaneeliin."
      }
    ]
  },
  {
    title: "4. Ominaisuudet ja käyttö",
    items: [
      {
        question: "Mitä eroa on Starter ja Pro -paketeilla?",
        answer: "Pro-paketti sisältää kaikki Starter-ominaisuudet plus: laajennetun dialogin ja muistitoiminnot, 80 tietolähdettä (vs. 30), ajanvarauskalenterin, WhatsApp-integraatiot, kaksikielisyyden (FI/EN), muokattavan käyttöliittymän ja nopeamman asiakastuen (24h vs. 72h)."
      },
      {
        question: "Kuinka monta viestiä neuvoja käsittelee kuukaudessa?",
        answer: "Starter-paketti sisältää 1000 viestiä/kk ja Pro-paketti 5000 viestiä/kk. Ylimenevät viestit voidaan lisätä erillisellä maksulla."
      },
      {
        question: "Voinko muokata neuvojan ulkoasua?",
        answer: "Kaikissa paketeissa on Mitrox AI Advisor -teema. Pro-paketissa voit myös muokata käyttöliittymää brändisi mukaiseksi."
      },
      {
        question: "Tukeeko neuvoja ajanvarauskalenteria?",
        answer: "Kyllä, ajanvarauskalenteri on saatavilla Pro-paketissa. Neuvoja voi suoraan varata aikoja kalenteriin."
      },
      {
        question: "Voinko nähdä, miten neuvoja suoriutuu?",
        answer: "Kyllä. Kaikissa paketeissa on edistynyt analytiikka, josta näet viestimäärät, liidit, suosituimmat kysymykset ja paljon muuta."
      }
    ]
  },
  {
    title: "5. Tuki ja luottamus",
    items: [
      {
        question: "Mitä tapahtuu, jos en ole tyytyväinen lopputulokseen?",
        answer: "Tarjoamme 14 päivän rahat takaisin -takuun projektin alusta. Jos et ole tyytyväinen, palautamme maksun ilman kysymyksiä."
      },
      {
        question: "Miten asiakastuki toimii?",
        answer: "Starter-paketissa vastaamme pyyntöihin 72 tunnin sisällä sähköpostitse. Pro-paketissa vastaamme 24 tunnin sisällä sähköpostitse."
      },
      {
        question: "Päivitetäänkö neuvojaa säännöllisesti?",
        answer: "Kyllä. Päivitämme neuvojan teknologiaa ja ominaisuuksia säännöllisesti. Kaikki päivitykset sisältyvät kuukausimaksuun."
      },
      {
        question: "Miten varmistatte, että neuvoja vastaa oikein?",
        answer: "Testaamme neuvojan yhdessä ennen käyttöönottoa ja varmistamme, että vastaukset ovat tarkkoja ja brändisi mukaisia. Voit myös antaa palautetta jatkuvasti."
      }
    ]
  }
];

type FAQProps = {
  type?: FAQType;
  emitSchema?: boolean;
};

const FAQ: React.FC<FAQProps> = ({ type = "website", emitSchema = false }) => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const faqId = useLocalizedSectionId("faq");
  const contactId = useLocalizedSectionId("contact");
  
  // English translations for website FAQ
  const websiteFAQDataEN: FAQCategory[] = useMemo(() => [
    {
      title: "1. Pricing and Agreement",
      items: [
        {
          question: "How much does a website cost?",
          answer: "Setup fee is €599, which includes up to 5 pages and website design tailored to your company's needs. Additional pages cost €99 per page. Monthly fee is €39/month or €35/month with annual billing. We also support 3-year payments with a 20% discount. Prices are exclusive of VAT (25.5% VAT applies)."
        },
        {
          question: "Is VAT included in the price?",
          answer: "All prices are stated exclusive of VAT, and 25.5% VAT is added to the invoice."
        },
        {
          question: "Can I pay monthly or annually?",
          answer: "Yes. You can choose monthly or annual billing. Annual billing is the more affordable option and includes the same services."
        },
        {
          question: "Can I pay for multiple years at once?",
          answer: "Yes. We support 3-year payments with a 20% discount. This is intended for companies who want stability for a long time."
        },
        {
          question: "What is the setup fee and why is it charged?",
          answer: "The setup fee covers website design, structure, installation, and deployment. It is a one-time payment that enables a quality start without hidden costs."
        },
        {
          question: "What happens if I cancel the service?",
          answer: "You can cancel the service at any time. When the service ends, access to the Mitrox website platform and its features ceases. However, the website content (texts and images) is your property, and they can be transferred to another environment for an additional fee if desired. The final billing occurs according to the current billing period."
        },
        {
          question: "Do I own the website myself?",
          answer: "The website operates on Mitrox's license model. The site's platform and technical implementation remain under Mitrox's control, but all content – such as texts, images, and brand materials – are entirely your property. You can request the content for your use at any time, also after the service ends for an additional fee."
        },
        {
          question: "Do you offer a purchase option for website ownership?",
          answer: "Yes. If you want to move completely to your own server and also own the website's technical structure, we offer a purchase option for a separate one-time payment. In this case, the license becomes permanent and you are responsible for maintenance going forward."
        }
      ]
    },
    {
      title: "2. Implementation and Timeline",
      items: [
        {
          question: "How long does website implementation take?",
          answer: "Basic websites are usually completed in 2 weeks. The timeline is refined after submitting the inquiry form and content."
        },
        {
          question: "How does the process proceed from start to finish?",
          answer: "The process proceeds in four phases: Inquiry form and start, Design and building, Review and finishing, and Publication and maintenance. We keep you updated throughout the project."
        },
        {
          question: "Can I participate in the design?",
          answer: "Absolutely. We go through the site structure and design together before implementation, so the result matches your brand and goals."
        },
        {
          question: "When will I see the first version?",
          answer: "The first draft is usually completed within a week of starting. After that, we make the necessary edits before publication."
        },
        {
          question: "How do I give feedback and make changes?",
          answer: "All change requests are handled easily by email. You get a clear review of each phase."
        }
      ]
    },
    {
      title: "3. Maintenance, Support and Security",
      items: [
        {
          question: "What is included in the monthly fee?",
          answer: "The monthly fee includes hosting, technical maintenance, security updates, backups, basic SEO settings, analytics reports, and up to 4 content or design updates per month."
        },
        {
          question: "Is search engine optimization (SEO) included?",
          answer: "Yes. Every website includes basic optimization: metadata, headings, and structure in a search engine-friendly format. We also offer separate SEO and language version services for broader needs."
        },
        {
          question: "How is security and backup handled?",
          answer: "Security updates are done automatically and backups are taken regularly. Your site stays protected and recoverable in all situations."
        },
        {
          question: "What happens if the site crashes or I need help?",
          answer: "Our premium customer support helps quickly in all situations. We monitor servers continuously and fix any problems without additional costs."
        },
        {
          question: "How many updates can I request per month?",
          answer: "The monthly fee includes 4 content or design updates per month. Additional changes cost €19 per update."
        }
      ]
    },
    {
      title: "4. Additional Services and Extensions",
      items: [
        {
          question: "Can I expand the site later?",
          answer: "Yes. You can order new pages at €99 per page. The site can also be updated with new features or integrations."
        },
        {
          question: "Can I add Mitrox AI Advisor?",
          answer: "Yes. Mitrox AI Advisor is an add-on service starting at €55/month (with website package). It serves your customers 24/7 and collects leads automatically."
        },
        {
          question: "Do you offer bilingual websites?",
          answer: "Yes. Additional language service (Finnish ↔ English) costs €199 starting (5 pages) and includes translations, visual adjustments, and SEO-optimized metadata. Additional pages cost €49 per page."
        },
        {
          question: "What is extended search engine optimization?",
          answer: "Extended search engine optimization continuously improves your site's visibility on Google. It includes content and structure development, speed optimization, and regular monitoring and reporting — so your site is found better and works faster. Price is €79/month starting from."
        },
        {
          question: "What other additional services can I order later?",
          answer: "Mitrox is constantly evolving, and you can expand your website with new features at any time by contacting us. We go through your wishes together and agree on implementation – this ensures the solution fits your needs perfectly."
        }
      ]
    },
    {
      title: "5. Trust and Satisfaction Guarantee",
      items: [
        {
          question: "What happens if I'm not satisfied with the result?",
          answer: "We offer a 14-day money-back guarantee from the start of the project. If you're not satisfied, we refund the payment without questions. We want to ensure that cooperation always starts with trust."
        },
        {
          question: "How do you ensure the website matches my brand?",
          answer: "We go through the design with you before implementation. We consider your company's brand, colors, style, and communication tone – and finish the website individually, so it looks and feels like you."
        },
        {
          question: "How can I trust that my project will proceed as planned?",
          answer: "We keep you updated at every stage and ensure you get a clear picture of progress. Each phase is reviewed together before moving to the next."
        }
      ]
    }
  ], []);

  // English translations for AI Agent FAQ
  const aiAgentFAQDataEN: FAQCategory[] = useMemo(() => [
    {
      title: "1. Pricing and Agreement",
      items: [
        {
          question: "How much does Mitrox AI Advisor cost?",
          answer: "Starter Advisor costs starting from €63/month and Pro Advisor starting from €103/month. We also offer a 14-day free trial and annual billing with a 20% discount."
        },
        {
          question: "Is VAT included in the price?",
          answer: "All prices are stated exclusive of VAT, and 25.5% VAT is added to the invoice."
        },
        {
          question: "Can I pay monthly or annually?",
          answer: "Yes. You can choose monthly or annual billing. Annual billing is 20% more affordable and includes the same services."
        },
        {
          question: "Is the trial period really free?",
          answer: "Yes. You get 14 days to test Mitrox AI Advisor completely free without commitments. You can cancel at any time during the trial period."
        },
        {
          question: "What happens if I cancel the service?",
          answer: "You can cancel the service at any time. The advisor is deactivated and access ceases. The final billing occurs according to the current billing period."
        },
        {
          question: "Can I switch packages later?",
          answer: "Yes. You can upgrade the package at any time. If you switch to the Pro package, you immediately get access to all Pro features."
        }
      ]
    },
    {
      title: "2. Implementation and Timeline",
      items: [
        {
          question: "How quickly can Mitrox AI Advisor be deployed?",
          answer: "The advisor can be deployed quickly. The process includes a 30-minute ideation session, implementation, integrations, and deployment. Most advisors are in use within a few days."
        },
        {
          question: "How does the process proceed from start to finish?",
          answer: "The process proceeds in four phases: Ideation, where we define needs, Implementation, where we configure the advisor, Testing, where we test together, and Deployment, when the advisor starts serving your customers."
        },
        {
          question: "Can I participate in advisor design?",
          answer: "Absolutely. In the ideation session, we define together what the advisor needs to know and how it should respond. You can also give feedback in the testing phase."
        },
        {
          question: "When will I see the first version?",
          answer: "The first version is usually completed within a few days after ideation. After that, we test together and make the necessary changes before deployment."
        },
        {
          question: "How many tailored responses can be added to the advisor?",
          answer: "The Starter package has 50 tailored responses, the Pro package has no limits. You can expand the number of responses at any time."
        }
      ]
    },
    {
      title: "3. Technical and Integrations",
      items: [
        {
          question: "What is a knowledge source?",
          answer: "A knowledge source is a source from which the advisor retrieves information when answering customer questions. Knowledge sources can be URLs (e.g., websites), documents (PDF, Word, etc.) or directly entered texts. The advisor uses these knowledge sources automatically, so it can answer questions accurately and up-to-date."
        },
        {
          question: "To which platforms can Mitrox AI Advisor be integrated?",
          answer: "The advisor can be integrated to websites, WhatsApp, and other channels. The Starter package can link 30 knowledge sources, the Pro package 80 knowledge sources."
        },
        {
          question: "Does the advisor need technical support from my side?",
          answer: "No. We handle all the technical side, including integrations and maintenance. You don't need to be a technical expert."
        },
        {
          question: "How does the advisor learn to answer questions?",
          answer: "The advisor uses tailored responses that we create together. It can also retrieve information from your linked websites, so it can answer questions automatically."
        },
        {
          question: "Is Mitrox AI Advisor in Finnish?",
          answer: "Yes, all packages support Finnish. The Pro package also supports English (FI/EN)."
        },
        {
          question: "How does the advisor collect leads?",
          answer: "The advisor automatically collects customer contact information when they submit an inquiry or request contact. You get leads directly in the analytics panel."
        }
      ]
    },
    {
      title: "4. Features and Usage",
      items: [
        {
          question: "What's the difference between Starter and Pro packages?",
          answer: "The Pro package includes all Starter features plus: extended dialogue and memory functions, 80 knowledge sources (vs. 30), booking calendar, WhatsApp integrations, bilingual support (FI/EN), customizable interface, and faster customer support (24h vs. 72h)."
        },
        {
          question: "How many messages does the advisor handle per month?",
          answer: "The Starter package includes 1,000 messages/month and the Pro package 5,000 messages/month. Additional messages can be added for a separate fee."
        },
        {
          question: "Can I customize the advisor's appearance?",
          answer: "All packages have the Mitrox AI Advisor theme. In the Pro package, you can also customize the interface to match your brand."
        },
        {
          question: "Does the advisor support a booking calendar?",
          answer: "Yes, the booking calendar is available in the Pro package. The advisor can directly book times in the calendar."
        },
        {
          question: "Can I see how the advisor performs?",
          answer: "Yes. All packages have advanced analytics where you can see message counts, leads, most popular questions, and much more."
        }
      ]
    },
    {
      title: "5. Support and Trust",
      items: [
        {
          question: "What happens if I'm not satisfied with the result?",
          answer: "We offer a 14-day money-back guarantee from the start of the project. If you're not satisfied, we refund the payment without questions."
        },
        {
          question: "How does customer support work?",
          answer: "In the Starter package, we respond to requests within 72 hours by email. In the Pro package, we respond within 24 hours by email."
        },
        {
          question: "Is the advisor updated regularly?",
          answer: "Yes. We regularly update the advisor's technology and features. All updates are included in the monthly fee."
        },
        {
          question: "How do you ensure the advisor answers correctly?",
          answer: "We test the advisor together before deployment and ensure that responses are accurate and match your brand. You can also give feedback continuously."
        }
      ]
    }
  ], []);

  const faqData = useMemo(() => {
    if (type === "advisor") {
      return isFinnish ? aiAgentFAQData : aiAgentFAQDataEN;
    }
    return isFinnish ? websiteFAQData : websiteFAQDataEN;
  }, [type, isFinnish]);
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});
  const scrollToContact = () => {
    const contactSection = document.getElementById(contactId);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  // Collect all FAQ items for schema emission
  const allFAQItems: FAQItem[] = faqData.flatMap(category => category.items);
  const shouldEmitSchema = emitSchema && import.meta.env.VITE_SEO_V2 === 'true';
  const faqSchemaData = shouldEmitSchema ? faqSchema(allFAQItems) : null;

  const toggleCategory = (categoryIndex: number) => {
    setOpenCategories(prev => 
      prev.includes(categoryIndex) 
        ? prev.filter(i => i !== categoryIndex)
        : [...prev, categoryIndex]
    );
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      {faqSchemaData && <SEOEnhanced schemas={[faqSchemaData]} />}
      <section id={faqId} className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-3">
            {isFinnish ? "Usein kysytyt kysymykset" : "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {isFinnish ? "Vastaukset yleisimpiin kysymyksiin" : "Answers to the most common questions"}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-3">
          {faqData.map((category, categoryIndex) => {
            const isCategoryOpen = openCategories.includes(categoryIndex);
            const categoryPanelId = `faq-category-${categoryIndex}`;

            return (
              <div
                key={categoryIndex}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                  aria-expanded={isCategoryOpen}
                  aria-controls={categoryPanelId}
                >
                  <h3 className="text-base font-medium text-white group-hover:text-white pr-4 transition-colors">
                    {category.title}
                  </h3>
                  {isCategoryOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-400 group-hover:text-gray-300 shrink-0 transition-colors" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-gray-300 shrink-0 transition-colors" />
                  )}
                </button>
                
                {/* Category Questions */}
                <div
                  id={categoryPanelId}
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isCategoryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-3 space-y-1">
                    {category.items.map((item, questionIndex) => {
                      const questionKey = `${categoryIndex}-${questionIndex}`;
                      const questionPanelId = `faq-item-${questionKey}`;
                      const isQuestionOpen = openQuestions[questionKey];

                      return (
                        <div
                          key={questionIndex}
                          className="border-b border-white/5 last:border-b-0"
                        >
                          <button
                            type="button"
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full py-3 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                            aria-expanded={isQuestionOpen}
                            aria-controls={questionPanelId}
                          >
                            <h4 className="text-sm font-normal text-white/90 group-hover:text-white pr-4 transition-colors">
                              {item.question}
                            </h4>
                            {isQuestionOpen ? (
                              <ChevronUp className="h-4 w-4 text-gray-500 group-hover:text-gray-400 shrink-0 transition-colors" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-400 shrink-0 transition-colors" />
                            )}
                          </button>
                          
                          <div
                            id={questionPanelId}
                            className={`overflow-hidden transition-all duration-200 ease-out ${
                              isQuestionOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="pb-3">
                              <p className="text-xs text-gray-400 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-xs mb-4">
            {isFinnish ? "Eikö kysymyksesi löytynyt listalta?" : "Didn't find your question on the list?"}
          </p>
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center gap-1 text-body-subtle hover:text-white text-xs underline underline-offset-2 transition-colors"
          >
            {isFinnish ? "Ota yhteyttä" : "Contact us"}
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default FAQ;