// src/AboutPage.tsx
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import { Mail, Calendar as CalendarIcon, Linkedin } from "lucide-react";

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

  return (
    <div
      className="min-h-screen text-white"
      style={{
        fontFamily: '"Onest", sans-serif',
        backgroundColor: "#000000",
      }}
    >
      <SEOHead
        title="Tietoa meistä - Mitrox.io | Suomalainen tekoälybot-tiimi"
        description="Tutustut Mitrox.io-tiimiin. Nuoret suomalaiset asiantuntijat, jotka rakentavat tekoälybotteja yrityksille. Luotettavuus, helppous ja täsmällisyys ohjaavat toimintaamme."
        url="https://mitrox.io/about"
        keywords="mitrox tiimi, suomalainen tekoäly, chatbot asiantuntijat, tekoälybot kehittäjät, AI-ratkaisut Suomi"
      />
      <Header />

      {/* HERO */}
      <section className="pt-28 pb-12 text-center px-6">
        <h1 className="mt-5 text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
          Selkeää teknologiaa, joka toimii.
        </h1>

        <p className="mt-4 text-white/60 max-w-2xl mx-auto">
          Yhteiset tavoitteet, vahva tiimihenki: olemme yksilöitä, mutta
          tiiminä täydennämme toisiamme.
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
              [ TIIMI ]
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

      {/* KEITÄ OLEMME */}
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
              [ KEITÄ OLEMME ]
            </h2>

            <h3 className="mt-6 text-lg md:text-xl font-semibold text-white/90">
              Meidän tarinamme
            </h3>
            <p className="mt-3 text-white/65 leading-relaxed md:leading-8">
              Mitrox on suomalainen teknologiayritys, jonka perustajina toimivat
              intohimoiset nuoret. Uskomme vahvasti teknologian tulevaisuuteen
              ja sen potentiaaliin. Arvomme ohjaavat kaikkea toimintaamme ja
              näkyvät jokaisessa toimituksessa.
            </p>

            <h3 className="mt-8 text-lg md:text-xl font-semibold text-white/90">
              Periaatteemme
            </h3>
            <p className="mt-3 text-white/65 leading-relaxed md:leading-8">
              Työskentelemme tehokkaalla periaatteella: teemme asiat kerralla
              mutta perusteellisesti. Et jää koskaan yksin – tarjoamme tukea ja
              asiantuntemusta aina, kun sitä tarvitset.
            </p>
          </div>
        </div>

        {/* ARVOT */}
        <div className="mt-14 mx-auto max-w-6xl border-t border-white/10 grid md:grid-cols-3 divide-x divide-white/10">
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Luotettavuus
            </h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Toimitamme sovitusti ja pidämme lupauksemme. Asiakkaamme voivat
              luottaa meihin.
            </p>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Helppous
            </h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Ratkaisumme ovat selkeitä ja käyttäjäystävällisiä — ilman turhaa
              monimutkaisuutta.
            </p>
          </div>
          <div className="p-6 md:p-8">
            <h3 className="text-base md:text-lg font-semibold text-white">
              Täsmällisyys
            </h3>
            <p className="mt-3 text-sm text-white/60 leading-relaxed">
              Huolehdimme yksityiskohdista ja varmistamme, että kaikki toimii
              kuten on sovittu.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20" id="contact">
        <div className="mx-auto max-w-6xl">
          <div className="h-px w-full bg-white/10" />
          <div className="py-6 flex flex-col items-center justify-center text-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight">Aloitetaan</h3>
            <p className="text-white/60 text-sm">
              Täytä nopea yhteydenottolomake — palaamme sinulle mahdollisimman
              pian.
            </p>
            <button
              onClick={() => {
                window.history.back();
                setTimeout(() => {
                  window.location.hash = "#contact";
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 150);
              }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-black border border-white/20 hover:border-white/40 transition focus:outline-none focus:ring-1 focus:ring-white/25"
            >
              Ota yhteyttä <CalendarIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="h-px w-full bg-white/10" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
