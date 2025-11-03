import React, { useState } from "react";
import {
  MessageSquare,
  Brain,
  Cog,
  Rocket,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import WebsiteInquiryForm from "./WebsiteInquiryForm";
import type { LucideIcon } from "lucide-react";

type Step = {
  id: string;
  title: string;
  desc: string;
  details: string;
  icon: LucideIcon;
};

type ProcessType = "website" | "advisor";

const WEBSITE_STEPS: Step[] = [
  {
    id: "01",
    title: "Kyselylomake",
    desc: "Täytät napakan briefin – kerrot tavoitteet, kohdeyleisön ja brändin fiiliksen. Mitä selkeämmin vastaat, sitä nopeammin ja paremmin rakennamme sinulle lopputuloksen.",
    details:
      "Muodostamme briefistä projektin rungon: sovimme aikataulun, vastuunjaon ja mittarit, jotta eteneminen on läpinäkyvää alusta loppuun.",
    icon: MessageSquare,
  },
  {
    id: "02",
    title: "Rakentaminen",
    desc: "Rakennamme kokonaisuuden modulaarisesti – design, copy ja tekninen toteutus etenevät rinnakkain.",
    details:
      "Suunnittelemme käyttöliittymän, toteutamme responsiivisen rakenteen ja optimoimme suorituskyvyn samalla, kun sisältö viimeistellään tyylikirjan mukaisesti.",
    icon: Brain,
  },
  {
    id: "03",
    title: "Katselmus",
    desc: "Esittelemme interaktiivisen demoversion, jossa sivusto toimii oikeassa ympäristössä.",
    details:
      "Käymme läpi sisällöt, animoinnit ja lomakkeet yhdessä, keräämme palautteen ja hiomme yksityiskohdat kuntoon ennen tuotantoon siirtymistä.",
    icon: Cog,
  },
  {
    id: "04",
    title: "Julkaisu",
    desc: "Julkaisemme hallitusti ja varmistamme, että integraatiot toimivat ilman katkoksia.",
    details:
      "Aktivoimme analytiikan, hakukoneperustukset ja varmuuskopiot. Saat selkeän aloitussuunnitelman sekä tuen ensimmäiselle seurantajaksolle.",
    icon: Rocket,
  },
];

const AI_AGENT_STEPS: Step[] = [
  {
    id: "01",
    title: "Idekartoitus",
    desc: "Pidämme fokusoituneen 30 minuutin sparrauksen, jossa määritämme neuvojan roolin ja KPI:t.",
    details:
      "Linjoille tulevat käyttötapaukset, äänensävy, integraatiot ja datalähteet. Lopputuloksena saat selkeän roadmapin ja mittarit.",
    icon: MessageSquare,
  },
  {
    id: "02",
    title: "Toteutus",
    desc: "Räätälöimme neuvojan sisällöt, integraatiot ja käyttöliittymän yrityksesi prosesseihin sopiviksi.",
    details:
      "Konfiguroimme vastaukset, automaatiot ja hallintapaneelin. Varmistamme, että data virtaa oikeisiin järjestelmiin ilman manuaalista työtä.",
    icon: Sparkles,
  },
  {
    id: "03",
    title: "Testaus",
    desc: "Ajamme validointisprintin, jossa testataan kriittiset keskustelupolut ja integraatiot.",
    details:
      "Hiomme sanaston, reaktiot ja fallbackit. Varmistamme, että neuvoja toimii moitteetta niin desktopissa, mobiilissa kuin chat-kanavissa.",
    icon: Zap,
  },
  {
    id: "04",
    title: "Käyttöönotto",
    desc: "Julkaisemme neuvojan kanaviisi ja varmistamme, että tiimisi on valmis hyödyntämään sitä.",
    details:
      "Seuraamme KPI:tä yhdessä, optimoimme asetuksia ja tuemme jatkuvaa kehitystä – neuvoja kehittyy liiketoimintasi mukana kuukausi kuukaudelta.",
    icon: Rocket,
  },
];

type ProcessSectionProps = {
  type?: ProcessType;
};

const ProcessSection: React.FC<ProcessSectionProps> = ({ type = "website" }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const STEPS = type === "advisor" ? AI_AGENT_STEPS : WEBSITE_STEPS;

  const getTitle = () => {
    return type === "advisor" 
      ? "Helppo ja huoleton prosessi"
      : "Helppo ja huoleton prosessi";
  };

  const getSubtitle = () => {
    return type === "advisor"
      ? "Neljä selkeää vaihetta valmiiseen Mitrox AI Advisoriin – me hoidamme kaiken puolestasi."
      : "Neljä selkeää vaihetta valmiiseen verkkosivustoon – me hoidamme kaiken puolestasi.";
  };

  return (
    <section
      id="process"
      className="relative py-40 md:py-48 pb-56 md:pb-64 px-4 sm:px-6 lg:px-8 bg-black"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Otsikko */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            {getTitle()}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {getSubtitle()}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Mobile vertical rail */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/0 via-white/20 to-white/0" />

          {/* Desktop horizontal rail */}
          <div className="hidden md:block absolute top-[34px] left-[10%] right-[10%] h-px bg-gradient-to-r from-white/0 via-white/18 to-white/0" />

          <div className="flex flex-col divide-y divide-white/[0.08] md:flex-row md:divide-y-0">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative px-0 py-8 md:flex-1 md:px-6"
                >
                  {/* Mobile node */}
                  <div className="absolute left-5 top-12 h-3 w-3 rounded-full bg-white md:hidden" />

                  <div className="flex flex-col gap-5">
                    {/* Number */}
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm font-medium tracking-[0.2em] text-white/80">
                      {step.id.replace(/^0/, "")}
                    </span>

                    {/* Title + icon */}
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-medium text-white tracking-tight">
                        {step.title}
                      </h3>
                      <Icon className="h-5 w-5 text-white/55" />
                    </div>

                    {/* Copy */}
                    <div className="space-y-3 md:max-w-xs">
                      <p className="text-sm leading-relaxed text-white/70">
                        {step.desc}
                      </p>
                      <p className="text-sm leading-relaxed text-white/55 border-l border-white/[0.08] pl-4 md:border-none md:pl-0 md:border-t md:pt-3 md:text-white/60">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all"
          >
            Aloita tänään. Täytä kysely tästä <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {type === "website" && (
        <WebsiteInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </section>
  );
};

export default ProcessSection;