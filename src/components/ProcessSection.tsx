import React, { useMemo, useState } from "react";
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
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

type Step = {
  id: string;
  title: string;
  desc: string;
  details: string;
  icon: LucideIcon;
};

type ProcessType = "website" | "advisor";

const createWebsiteSteps = (isFinnish: boolean): Step[] => [
  {
    id: "01",
    title: isFinnish ? "Kyselylomake" : "Project brief",
    desc: isFinnish
      ? "Täytät napakan briefin – kerrot tavoitteet, kohdeyleisön ja brändin fiiliksen. Mitä selkeämmin vastaat, sitä nopeammin ja paremmin rakennamme sinulle lopputuloksen."
      : "You'll complete a short, focused brief outlining your goals, audience, and brand personality.\n\nThe clearer the input, the faster and more accurately we can design your solution.",
    details: isFinnish
      ? "Muodostamme briefistä projektin rungon: sovimme aikataulun, vastuunjaon ja mittarit, jotta eteneminen on läpinäkyvää alusta loppuun."
      : "From there, we create a full project blueprint, defining scope, timeline, responsibilities, and success metrics. So you always know what happens next.\n\nRegular updates keep communication transparent throughout the process.",
    icon: MessageSquare,
  },
  {
    id: "02",
    title: isFinnish ? "Rakentaminen" : "Build",
    desc: isFinnish
      ? "Rakennamme kokonaisuuden modulaarisesti – design, copy ja tekninen toteutus etenevät rinnakkain."
      : "We move from concept to creation in modular phases, combining design, content, and development work in sync.",
    details: isFinnish
      ? "Suunnittelemme käyttöliittymän, toteutamme responsiivisen rakenteen ja optimoimme suorituskyvyn samalla, kun sisältö viimeistellään tyylikirjan mukaisesti."
      : "Our approach ensures every element, layout, performance, and copy supports your brand's message.\n\nResponsiveness, accessibility, and technical precision are refined as we go, so the site is visually seamless and functionally flawless across all devices.",
    icon: Brain,
  },
  {
    id: "03",
    title: isFinnish ? "Katselmus" : "Review",
    desc: isFinnish
      ? "Esittelemme interaktiivisen demoversion, jossa sivusto toimii oikeassa ympäristössä."
      : "You'll receive an interactive demo where you can explore the site exactly as your visitors will.",
    details: isFinnish
      ? "Käymme läpi sisällöt, animoinnit ja lomakkeet yhdessä, keräämme palautteen ja hiomme yksityiskohdat kuntoon ennen tuotantoon siirtymistä."
      : "Together we review design, motion, and content details, collecting clear feedback to fine-tune the experience.\n\nEvery animation, image, and interaction is polished until it feels perfectly aligned with your brand ready for launch day.",
    icon: Cog,
  },
  {
    id: "04",
    title: isFinnish ? "Julkaisu" : "Launch",
    desc: isFinnish
      ? "Julkaisemme hallitusti ja varmistamme, että integraatiot toimivat ilman katkoksia."
      : "Once everything is approved, we handle deployment and integration. Ensuring the site launches smoothly and performs reliably from day one.",
    details: isFinnish
      ? "Aktivoimme analytiikan, hakukoneperustukset ja varmuuskopiot. Saat selkeän aloitussuunnitelman sekä tuen ensimmäiselle seurantajaksolle."
      : "Analytics, SEO groundwork, and backups are activated automatically. You'll also receive a concise start-up guide and monitoring support to keep your site performing at its best.",
    icon: Rocket,
  },
];

const createAdvisorSteps = (isFinnish: boolean): Step[] => [
  {
    id: "01",
    title: isFinnish ? "Idekartoitus" : "Discovery",
    desc: isFinnish
      ? "Pidämme tiiviin 30 minuutin sparrauksen, jossa määritämme, mitä neuvonantaja tekee ja mitä sillä halutaan saavuttaa."
      : "In a focused 30-minute workshop, we define what your AI Advisor will do and what outcomes you want to achieve.",
    details: isFinnish
      ? "Käymme läpi käyttötapaukset, äänensävyn ja tietolähteet. Lopputuloksena saat selkeän suunnitelman ja tavoitteet, joiden mukaan etenemme."
      : "We map use cases, tone of voice, and data sources — resulting in a clear roadmap and measurable goals for the build.",
    icon: MessageSquare,
  },
  {
    id: "02",
    title: isFinnish ? "Toteutus" : "Implementation",
    desc: isFinnish
      ? "Suunnittelemme ja rakennamme neuvojan sisällöt, integraatiot ja toiminnot yrityksesi tarpeiden mukaan."
      : "We design and build your advisor's logic, content, and integrations around your business workflows.",
    details: isFinnish
      ? "Varmistamme, että tieto liikkuu järjestelmien välillä automaattisesti ja manuaalinen työ vähenee."
      : "Automation ensures smooth information flow between systems, reducing manual work and keeping everything in sync.",
    icon: Sparkles,
  },
  {
    id: "03",
    title: isFinnish ? "Testaus" : "Testing",
    desc: isFinnish
      ? "Testaamme ratkaisun huolellisesti eri tilanteissa ja kanavissa."
      : "We rigorously test across multiple scenarios and channels to ensure reliability and a natural user experience.",
    details: isFinnish
      ? "Hienosäädämme sanaston, vastaukset ja käytettävyyden, jotta neuvonantaja toimii luonnollisesti ja virheettömästi."
      : "Responses, tone, and UX are refined until the advisor feels seamless, human, and perfectly on-brand.",
    icon: Zap,
  },
  {
    id: "04",
    title: isFinnish ? "Käyttöönotto" : "Go live",
    desc: isFinnish
      ? "Julkaisemme yhdessä neuvonantajan sinun valitsemaan palveluun ja varmistamme, että kaikki toimii saumattomasti heti alusta alkaen."
      : "Your AI Advisor is launched on the chosen platform — fully functional from day one.",
    details: isFinnish
      ? "Optimoimme ratkaisua jatkuvasti, jotta neuvonantaja tukee liiketoimintaasi entistä paremmin kuukausi kuukaudelta."
      : "We monitor performance and continue optimizing to keep the advisor aligned with your evolving business goals.",
    icon: Rocket,
  },
];

type ProcessSectionProps = {
  type?: ProcessType;
};

const ProcessSection: React.FC<ProcessSectionProps> = ({ type = "website" }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  const websiteSteps = useMemo(() => createWebsiteSteps(isFinnish), [isFinnish]);
  const advisorSteps = useMemo(() => createAdvisorSteps(isFinnish), [isFinnish]);
  const STEPS = type === "advisor" ? advisorSteps : websiteSteps;

  const getTitle = () => {
    if (type === "advisor") {
      return isFinnish ? "Helppo ja huoleton prosessi" : "A Smooth, Guided Process";
    }
    return isFinnish ? "Helppo ja huoleton prosessi" : "A smooth, guided process";
  };

  const getSubtitle = () => {
    return type === "advisor"
      ? isFinnish
        ? "Neljä selkeää vaihetta valmiiseen Mitrox AI Advisoriin – me hoidamme kaiken puolestasi."
        : "Four clear steps to create your Mitrox AI Advisor — we take care of every detail."
      : isFinnish
      ? "Neljä selkeää vaihetta valmiiseen verkkosivustoon – me hoidamme kaiken puolestasi."
      : "Four clear steps to launch your website – we take care of the details.";
  };

  const processId = useLocalizedSectionId("process");
  
  return (
    <section
      id={processId}
      className="relative py-40 md:py-48 pb-56 md:pb-64 px-4 sm:px-6 lg:px-8 bg-black"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Otsikko */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            {getTitle()}
          </h2>
          <p className="text-lg text-body-subtle max-w-2xl mx-auto">
            {getSubtitle()}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">


          {/* Desktop horizontal rail */}
          <div className="hidden md:block absolute top-[34px] left-[10%] right-[10%] h-px bg-gradient-to-r from-white/0 via-white/18 to-white/0" />

          <div className="flex flex-col divide-y divide-white/[0.08] md:flex-row md:divide-y-0 md:items-stretch">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className="relative px-0 py-8 md:flex-1 md:px-6 md:flex md:flex-col"
                >
                  {/* Mobile node */}
                  <div className="absolute left-5 top-12 h-3 w-3 rounded-full bg-white md:hidden" />

                  <div className="flex flex-col gap-5 md:h-full">
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
                    <div className="space-y-3 md:max-w-xs md:flex-1 md:flex md:flex-col">
                      <div className="md:min-h-[6rem] md:flex md:flex-col">
                        <p className="text-sm leading-relaxed text-body-subtle">
                          {step.desc}
                        </p>
                        <div className="md:flex-1" />
                      </div>
                      <p className="text-sm leading-relaxed text-body-muted border-l border-white/[0.08] pl-4 md:border-none md:pl-0 md:border-t md:pt-3">
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
        {type === "website" && (
          <div className="mt-16 text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all"
            >
              {isFinnish ? "Aloita tänään. Täytä kysely tästä" : "Start your project — Open the project brief"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Inquiry Form Modal */}
      {type === "website" && (
        <WebsiteInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      )}
    </section>
  );
};

export default ProcessSection;