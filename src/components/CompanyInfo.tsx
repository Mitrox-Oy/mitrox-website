import React, { useMemo } from "react";
import { Shield, Zap, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Value = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const CompanyInfo: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  const values: Value[] = useMemo(
    () => [
      {
        icon: Shield,
        title: isFinnish ? "Luotettavuus" : "Reliability",
        description: isFinnish
          ? "Toimimme täsmällisesti ja pidämme sanamme. Asiakkaamme voivat luottaa siihen, että jokainen projekti etenee suunnitellusti ja laadukkaasti – alusta loppuun."
          : "We deliver precisely and keep our promises. Every project progresses as planned and with consistent quality from start to finish.",
      },
      {
        icon: Zap,
        title: isFinnish ? "Helppous" : "Simplicity",
        description: isFinnish
          ? "Teemme monimutkaisesta yksinkertaista. Ratkaisumme ovat selkeitä, käyttäjäystävällisiä ja rakennettu helpottamaan arkeasi – ei kuormittamaan sitä."
          : "We make the complex simple. Our solutions are clear, user-friendly, and designed to streamline your daily work – not add clutter.",
      },
      {
        icon: Target,
        title: isFinnish ? "Täsmällisyys" : "Precision",
        description: isFinnish
          ? "Huolehdimme yksityiskohdista tinkimättä. Aikataulut pitävät, lopputulos on viimeistelty ja jokainen yksityiskohta tukee kokonaisuuden laatua."
          : "We care about the details. Timelines hold, the outcome is polished, and every element supports the quality of the whole.",
      },
    ],
    [isFinnish]
  );

  return (
    <section className="relative bg-black py-24 sm:py-32 overflow-hidden">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-5">
          <span className="text-[0.7rem] uppercase tracking-[0.5em] text-body-caption">
            {isFinnish ? "[ Keitä olemme ]" : "[ Who we are ]"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
            {isFinnish ? "Keitä olemme" : "Who we are"}
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-body-subtle">
            {isFinnish
              ? "Mitrox on suomalainen teknologiayritys, joka yhdistää tekoälyn, suunnittelun ja liiketoimintaymmärryksen yhdeksi kokonaisuudeksi. Tiimimme koostuu intohimoisista nuorista osaajista, jotka uskovat teknologian mahdollisuuksiin – ja tekevät siitä totta joka päivä."
              : "Mitrox is a Finnish technology company that combines AI, design, and business understanding into one unified experience. Our team is made of passionate young experts who believe in what technology can do – and make it real every day."}
          </p>
        </div>

        <div className="mb-20 max-w-3xl">
          <p className="text-base leading-relaxed text-body-subtle">
            {isFinnish
              ? "Työskentelemme periaatteella, jossa laatu ja tehokkuus kulkevat käsi kädessä. Teemme asiat kerralla oikein ja pidämme huolen, ettet jää yksin – tarjoamme jatkuvaa tukea ja asiantuntemusta, kun yrityksesi kasvaa."
              : "Quality and efficiency go hand in hand for us. We do things right the first time and make sure you’re never left alone – offering ongoing support and expertise as your company grows."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-black/85 p-8 transition-colors hover:border-white/[0.14]"
            >
              <div className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-medium text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-body-subtle">
                  {value.description}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-14 -right-10 opacity-0 transition duration-500 group-hover:opacity-45">
                <value.icon className="h-44 w-44 text-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;

