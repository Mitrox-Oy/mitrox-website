import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "Mitä verkkosivusto maksaa?",
    answer: "Aloitusmaksu on 599€ verkkosivustolle, joka sisältää jopa 5 sivua. Ylimääräiset sivut maksavat 100€ per sivu. Kuukausimaksu on 39€/kk (tai 35€/kk vuosittaisella maksulla, jolloin säästät 10%). Hinnat ovat verottomia, ALV 25,5% lisätään hintaan."
  },
  {
    question: "Mitä kuukausimaksuun sisältyy?",
    answer: "Kuukausimaksu sisältää hosting ja teknisen ylläpidon, kuukausittaiset analytiikkaraportit, premium asiakastuen sekä jopa 4 sisältö- tai designpäivitystä joka kuukausi. Kaikki tekniset asiat hoidetaan meidän puolestamme."
  },
  {
    question: "Kuinka kauan verkkosivuston toteutus kestää?",
    answer: "Toteutusajan pituus riippuu projektin koosta ja vaatimuksista. Yksinkertaiset verkkosivut saadaan usein valmiiksi muutamassa viikossa, kun taas monimutkaisemmat projektit voivat viedä muutaman kuukauden. Työskentelemme yhdessä asiakkaan kanssa varmistaaksemme laadukkaan lopputuloksen."
  },
  {
    question: "Sisältyykö verkkosivustoon hakukoneoptimointi (SEO)?",
    answer: "Kyllä, verkkosivustomme sisältävät perusasiat hakukoneoptimointiin. Varmistamme, että sivusi ovat hakukoneiden löydettävissä ja sisältävät tarvittavat metatiedot. Lisäpalveluina tarjoamme myös lisäkielen (Suomi ↔ Englanti) käännöksen, joka sisältää SEO-optimoidut metatiedot."
  },
  {
    question: "Voinko laajentaa verkkosivustoa myöhemmin?",
    answer: "Todellakin! Voit tilata lisäsivuja hintaan 100€ per sivu. Lisäksi kuukausimaksuun sisältyy jopa 4 sisältö- tai designpäivitystä kuukaudessa. Jos tarvitset enemmän päivityksiä, ylimääräiset päivitykset maksavat 20€ per päivitys."
  },
  {
    question: "Voinko saada verkkosivuston kaksikieliseksi?",
    answer: "Kyllä! Tarjoamme lisäkieli-palvelun (Suomi ↔ Englanti) hintaan 200€ alkaen (enintään 5 sivulle). Suuremmille sivustoille lisäsivut maksavat 50€ per sivu. Palvelu sisältää ammattitason käännökset, visuaaliset säädöt ja hakukoneoptimoidut metatiedot."
  },
  {
    question: "Millaista tukea saan?",
    answer: "Tarjoamme premium asiakastukea, joka sisältyy kuukausimaksuun. Olemme saatavilla auttamaan kaikissa teknisissä kysymyksissä ja päivityksissä. Lisäksi saat kuukausittaiset analytiikkaraportit, jotta voit seurata verkkosivustosi suorituskykyä."
  },
  {
    question: "Mitä tapahtuu jos en ole tyytyväinen?",
    answer: "Tarjoamme 14 päivän rahat takaisin -takuun projektin alusta. Jos et ole tyytyväinen palveluun, palautamme rahasi. Haluamme varmistaa, että olet täysin tyytyväinen lopputulokseen."
  },
  {
    question: "Voinko liittää verkkosivustoon tekoälybottin?",
    answer: "Kyllä! Voit lisätä Mitrox Tekoälybottin verkkosivupakettiin hintaan 55€/kk alkaen (erikoishinta verkkosivupaketin yhteydessä). Tekoälybotti palvelee asiakkaitasi 24/7, vastaa kysymyksiin ja kerää liidejä automaattisesti."
  },
  {
    question: "Tarvitsenko vuosittaisen maksun vai voinko maksaa kuukausittain?",
    answer: "Voit valita joko kuukausittaisen (39€/kk) tai vuosittaisen maksun (35€/kk). Vuosittaisella maksulla saat 10% alennuksen, joten säästät 47€ vuodessa. Molemmat vaihtoehdot sisältävät samat palvelut ja ominaisuudet."
  },
  {
    question: "Mitä tarvitsen antaa verkkosivuston toteuttamiseksi?",
    answer: "Tarvitsemme tietoa yrityksestänne, brändistäsi ja tavoitteistasi. Kerromme myös halutun sisällön, kuvat ja muut materiaalit. Työskentelemme yhdessä kanssasi projektin läpi varmistaaksemme, että lopputulos vastaa visioitasi."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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

        {/* FAQ Items */}
        <div className="space-y-1">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index);
            
            return (
              <div
                key={index}
                className="border-b border-white/5 last:border-b-0"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-4 text-left flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm font-normal text-white/90 group-hover:text-white pr-4 transition-colors">
                    {item.question}
                  </h3>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600 group-hover:text-gray-400 shrink-0 transition-colors" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-gray-400 shrink-0 transition-colors" />
                  )}
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.answer}
                    </p>
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