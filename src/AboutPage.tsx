// src/AboutPage.tsx
import React from "react";
import { useLanguage } from "./context/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import { Mail, Linkedin } from "lucide-react";
import ContactForm from "./components/ContactForm";
import { buildMeta, organizationSchema, breadcrumbSchema } from "../lib/seo";
import { SEO_CONFIG } from "../config/seo.fi";

import onniImg from "./profile/felix.png";
import tobiasImg from "./profile/tobias.png";
import johannesImg from "./profile/johannes.png";
import logo1 from "./assets/logo1.png";

type Member = {
  handle: string;
  fullName: string;
  role: string;
  email?: string;
  img?: string;
  linkedin?: string;
};

const emailFromName = (name: string) => {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s.-]/g, "")
    .trim()
    .replace(/\s+/g, ".");
  return `${base}@mitrox.io`;
};

function TeamMemberCard({
  member,
  isOpen,
  onToggle,
}: {
  member: Member;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const email = member.email ?? emailFromName(member.fullName);

  return (
    <div className="relative overflow-hidden border border-white/10 bg-black">
      <div className="aspect-[4/5] flex items-center justify-center bg-black overflow-hidden">
        {member.img && (
          <img
            src={member.img}
            alt={member.fullName}
            className="h-full w-full object-cover filter grayscale"
            loading="lazy"
          />
        )}
      </div>

      <div className="flex items-center justify-between px-3 py-2 border-t border-white/10 bg-black">
        <code className="text-xs md:text-sm font-mono text-white/80">
          {member.fullName}
        </code>

        <div className="flex items-center gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 border border-white/10 hover:border-white/40 transition"
              title="Avaa LinkedIn"
              aria-label={`${member.fullName} LinkedIn`}
            >
              <Linkedin className="w-4 h-4 text-white/75" />
            </a>
          )}

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className="p-1.5 border border-white/10 hover:border-white/40 transition"
            title="Näytä sähköposti"
            aria-label={`Näytä ${member.fullName} sähköposti`}
          >
            <Mail className="w-4 h-4 text-white/75" />
          </button>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 bottom-[42px] z-10 border border-white/10 bg-black px-3 py-2 transition duration-200 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <a
          href={`mailto:${email}`}
          className="font-mono text-xs md:text-sm text-blue-300 hover:underline break-all"
        >
          {email}
        </a>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [openHandle, setOpenHandle] = React.useState<string | null>(null);
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  const team: Member[] = [
    {
      handle: "tobias.r",
      fullName: "Tobias Rockas",
      role: "Sales",
      img: tobiasImg,
      linkedin: "https://www.linkedin.com/in/tobias-rockas-226126317/",
    },
    {
      handle: "johannes.h",
      fullName: "Johannes Hurmerinta",
      role: "Tech",
      img: johannesImg,
      linkedin: "https://www.linkedin.com/in/johanneshurmerinta/",
    },
    {
      handle: "felix.m",
      fullName: "Felix Miettinen",
      role: "Tech",
      img: onniImg,
      linkedin: "https://www.linkedin.com/in/felix-miettinen/",
    },
  ];

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenHandle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const monoFont = { fontFamily: "Geist Mono", fontWeight: 400 as const };
  const monoHeading =
    "uppercase text-[rgb(125,129,135)] tracking-[0.08em] text-[14px] leading-[20px]";

  // SEO_V2 enhancements (only when flag is enabled)
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const meta = isSEO_V2
    ? buildMeta({
        title: SEO_CONFIG.pages.about.title,
        description: SEO_CONFIG.pages.about.description,
        path: "/about",
        keywords: SEO_CONFIG.pages.about.keywords,
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(),
        breadcrumbSchema(SEO_CONFIG.pages.about.breadcrumbs),
      ]
    : [];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        fontFamily: '"Onest", sans-serif',
        backgroundColor: "#000000",
      }}
    >
      <SEOHead
        title={meta?.title || (isFinnish ? "Tietoa meistä - Mitrox.io | Mitrox Tiimi" : "About us - Mitrox.io | Mitrox Team")}
        description={meta?.description || (isFinnish ? "Tutustut Mitrox.io-tiimiin. Nuoret suomalaiset asiantuntijat, jotka rakentavat Mitrox AI Advisoria yrityksille. Luotettavuus, helppous ja täsmällisyys ohjaavat toimintaamme." : "Meet the Mitrox.io team. Young Finnish specialists building Mitrox AI Advisor for businesses. Reliability, simplicity and precision guide our work.")}
        url={meta?.url || "https://mitrox.io/about"}
        keywords={meta?.keywords || (isFinnish ? "mitrox tiimi, suomalainen tekoäly, Mitrox AI Advisor asiantuntijat, AI-ratkaisut Suomi" : "mitrox team, finnish ai, Mitrox AI Advisor experts, ai solutions")}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang={isFinnish ? "fi" : "en"} />}
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-12 text-center px-6">
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
          {isFinnish ? "Selkeää teknologiaa. Aitoa osaamista." : "Clear technology. True craftsmanship."}
        </h1>

        <p className="mt-4 text-body-muted max-w-2xl mx-auto">
          {isFinnish ? "Tiimimme yhdistää luovuuden, teknisen osaamisen ja huolellisuuden – tuloksena ratkaisuja, jotka kestävät aikaa ja käyttöä." : "Our team blends creativity, precision, and care — building digital solutions that perform beautifully and endure over time."}
        </p>
      </section>

      {/* TIIMI */}
      <section className="pb-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid justify-center gap-12
              [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]
            "
          >
            <h2 className={`col-span-full ${monoHeading} text-left`} style={monoFont}>
              {isFinnish ? "[ TIIMI ]" : "[ TEAM ]"}
            </h2>

            {team.map((m) => (
              <TeamMemberCard
                key={m.handle}
                member={m}
                isOpen={openHandle === m.handle}
                onToggle={() =>
                  setOpenHandle((cur) => (cur === m.handle ? null : m.handle))
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* MITEN TYÖSKENTELEMME */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl grid md:grid-cols-[1.05fr_1fr] gap-10 items-center">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center">
            <img
              src={logo1}
              alt="Mitrox.io logo"
              className="w-full max-w-md h-auto object-contain"
              loading="lazy"
            />
            <span
              className={`${monoHeading} relative -top-8 whitespace-nowrap`}
              style={monoFont}
            >
              [ YOUR NEXT-GEN TECH PARTNERS ]
            </span>
          </div>

          {/* Tekstit */}
          <div>
            <h2 className={monoHeading} style={monoFont}>
              {isFinnish ? "[ Meistä ]" : "[ About ]"}
            </h2>

            <h3 className="mt-6 text-lg md:text-xl font-semibold text-white/90">
              {isFinnish ? "Miten työskentelemme" : "How we work"}
            </h3>
            <p className="mt-3 text-body-subtle leading-relaxed md:leading-8">
              {isFinnish ? "Selkeä prosessi, nopea toimitus ja jatkuva yhteistyö." : "Clear process. Fast delivery. Continuous collaboration."}
            </p>
            <p className="mt-3 text-body-subtle leading-relaxed md:leading-8">
              {isFinnish ? "Rakennamme ratkaisuja, jotka toimivat, näyttävät hyvältä ja kestävät aikaa – tinkimättä laadusta tai kokemuksesta." : "We create digital solutions that not only look great but perform flawlessly — built to last without ever compromising quality or experience."}
            </p>
            <p className="mt-6 text-body-subtle leading-relaxed md:leading-8">
              {isFinnish ? "Jokainen projekti alkaa ymmärryksestä: mitä yrityksesi tarvitsee juuri nyt ja mikä vie sitä eteenpäin." : "Every project begins with understanding: what your business needs now, and what will drive it forward."}
            </p>
            <p className="mt-3 text-body-subtle leading-relaxed md:leading-8">
              {isFinnish ? "Emme käytä valmiita malleja, vaan suunnittelemme kokonaisuuden, joka tukee tavoitteitasi ja tekee arjesta helpompaa." : "We don't rely on ready-made templates. Every solution is custom-built to fit your goals and make daily work easier."}
            </p>
            <p className="mt-3 text-body-subtle leading-relaxed md:leading-8">
              {isFinnish ? "Kun sivusto tai ratkaisu on valmis, jatkamme kehitystä yhdessä kanssasi – pitkäjänteisesti, vastuullisesti ja luotettavasti." : "And once your site or system is live, we stay by your side — refining, supporting, and evolving it responsibly for the long term."}
            </p>
          </div>
        </div>

        {/* ARVOT */}
        <div className="mt-14 mx-auto max-w-6xl border-t border-white/10 grid md:grid-cols-3 divide-x divide-white/10">
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              {isFinnish ? "Luotettavuus" : "Reliability"}
            </h3>
            <p className="mt-3 text-sm text-body-muted leading-relaxed">
              {isFinnish ? "Pidämme lupauksemme ja toimitamme ajallaan. Asiakkaamme voivat luottaa jokaiseen vaiheeseen." : "We keep our word and deliver on time. Every phase is transparent, every promise kept."}
            </p>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              {isFinnish ? "Helppous" : "Simplicity"}
            </h3>
            <p className="mt-3 text-sm text-body-muted leading-relaxed">
              {isFinnish ? "Teemme monimutkaisesta yksinkertaista. Ratkaisumme säästävät aikaa ja energiaa – ilman turhaa säätöä." : "We make the complex simple. Our solutions save you time and energy — without unnecessary friction."}
            </p>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              {isFinnish ? "Täsmällisyys" : "Precision"}
            </h3>
            <p className="mt-3 text-sm text-body-muted leading-relaxed">
              {isFinnish ? "Viimeistelty työ ja pitäviä aikatauluja. Laatu näkyy sekä lopputuloksessa että yhteistyössä." : "We value detail and discipline. From scheduling to delivery, quality shows in both the process and the result."}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <ContactForm />

      <Footer />
    </div>
  );
}
