import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    title: "1. Hinnat ja sopimus",
    items: [
      {
        question: "Mitä verkkosivusto maksaa?",
        answer: "Aloitusmaksu on 599 €, joka sisältää jopa 5 sivua ja sivuston suunnittelun yrityksesi tarpeisiin. Lisäsivut maksavat 100 € / sivu. Kuukausimaksu on 39 € / kk tai 35 € / kk vuosilaskutuksella. Hinnat ovat verottomia (ALV 25,5 % lisätään)."
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
        answer: "Kuukausimaksuun sisältyy 4 sisältö- tai designpäivitystä kuukaudessa. Ylimenevät muutokset maksavat 20 € / päivitys."
      }
    ]
  },
  {
    title: "4. Lisäpalvelut ja laajennukset",
    items: [
      {
        question: "Voinko laajentaa sivustoa myöhemmin?",
        answer: "Kyllä. Voit tilata lisäsivuja hintaan 100 € / sivu. Sivustoa voidaan myös päivittää uusilla ominaisuuksilla tai integraatioilla."
      },
      {
        question: "Voinko lisätä tekoälybotin?",
        answer: "Kyllä. Mitrox Tekoälybotti on lisäpalvelu hintaan 55 € / kk alkaen (verkkosivupaketin yhteydessä). Se palvelee asiakkaitasi 24/7 ja kerää liidejä automaattisesti."
      },
      {
        question: "Tarjoatteko kaksikielisiä sivustoja?",
        answer: "Kyllä. Lisäkielipalvelu (Suomi ↔ Englanti) maksaa 200 € alkaen ja sisältää käännökset, visuaaliset säädöt ja SEO-optimoidut metatiedot."
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

const FAQ: React.FC = () => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);
  const [openQuestions, setOpenQuestions] = useState<{ [key: string]: boolean }>({});

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
    <section id="faq" className="relative py-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium text-white mb-3">
            Usein kysytyt kysymykset
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Vastaukset yleisimpiin kysymyksiin
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-3">
          {faqData.map((category, categoryIndex) => {
            const isCategoryOpen = openCategories.includes(categoryIndex);
            
            return (
              <div
                key={categoryIndex}
                className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                  aria-expanded={isCategoryOpen}
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
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isCategoryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-3 space-y-1">
                    {category.items.map((item, questionIndex) => {
                      const questionKey = `${categoryIndex}-${questionIndex}`;
                      const isQuestionOpen = openQuestions[questionKey];
                      
                      return (
                        <div
                          key={questionIndex}
                          className="border-b border-white/5 last:border-b-0"
                        >
                          <button
                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            className="w-full py-3 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                            aria-expanded={isQuestionOpen}
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
            Eikö kysymyksesi löytynyt listalta?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1 text-white/70 hover:text-white text-xs underline underline-offset-2 transition-colors"
          >
            Ota yhteyttä
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;