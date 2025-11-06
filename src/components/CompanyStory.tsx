import React from "react";
import InteractiveMitroxLogo from "./InteractiveMitroxLogo";
import { useLanguage } from "../context/LanguageContext";

const CompanyStory: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  return (
    <section className="relative py-24 md:py-40 lg:py-48 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1d3360_0%,_#0a1329_48%,_#010208_100%)] opacity-95" />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 20px 40px, rgba(255,255,255,0.7), transparent), radial-gradient(1.5px 1.5px at 60px 80px, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 100px 20px, rgba(255,255,255,0.4), transparent)",
            backgroundSize: "120px 120px",
          }}
        />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(220px 220px at 12% 18%, rgba(43,104,255,0.35), transparent 70%), radial-gradient(180px 180px at 85% 8%, rgba(174,118,255,0.3), transparent 75%), radial-gradient(260px 260px at 28% 82%, rgba(64,178,255,0.2), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-35 animate-[pulse_12s_ease-in-out_infinite]"
          style={{
            backgroundImage:
              "radial-gradient(180px 180px at 65% 65%, rgba(255,132,255,0.25), transparent 70%), radial-gradient(260px 260px at 35% 35%, rgba(88,190,255,0.18), transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-55 animate-[spin_160s_linear_infinite]"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 10px 10px, rgba(255,255,255,0.55), transparent 60%), radial-gradient(1px 1px at 120px 80px, rgba(255,255,255,0.5), transparent 60%), radial-gradient(1px 1px at 200px 140px, rgba(255,255,255,0.45), transparent 60%)",
            backgroundSize: "220px 220px",
          }}
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Story Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium text-white mb-6">
              {isFinnish ? "Meidän tarinamme" : "Our story"}
            </h2>
            <div className="space-y-4 text-body-subtle leading-relaxed">
              <p>
                {isFinnish
                  ? "Mitrox syntyi uskosta siihen, että teknologia voi tehdä yritysten arjesta helpompaa, tehokkaampaa ja vaikuttavampaa. Perustajamme – joukko intohimoisia suomalaisia osaajia – yhdistivät voimansa luodakseen ratkaisuja, jotka oikeasti toimivat ja auttavat yrityksiä kasvamaan digitaalisessa ajassa."
                  : "Mitrox was born from the belief that technology can make business life easier, more efficient, and more impactful. Our founders – a group of passionate Finnish experts – joined forces to build solutions that truly work and help companies grow in the digital era."}
              </p>
              <p>
                {isFinnish
                  ? "Aloitimme pienestä, mutta selkeällä visiolla: rakentaa palveluita, joissa yhdistyvät laatu, nopeus ja älykkyys. Jokainen projekti on meille mahdollisuus kehittää osaamistamme ja ylittää odotukset. Asiakkaidemme menestys on myös meidän menestyksemme – siksi panostamme jokaiseen yksityiskohtaan, kuin se olisi oma projektimme."
                  : "We started small with a clear vision: build services where quality, speed, and intelligence meet. Every project is an opportunity to refine our craft and exceed expectations. Our clients’ success is our success – that’s why we care about every detail as if it were our own project."}
              </p>
              <p>
                {isFinnish
                  ? "Tänään Mitrox on kasvanut tiimiksi, joka yhdistää teknisen osaamisen, luovuuden ja ymmärryksen liiketoiminnan todellisista tarpeista. Haluamme olla se kumppani, johon suomalaiset yritykset turvaavat, kun tarvitaan ratkaisuja, jotka eivät ainoastaan näytä hyvältä – vaan tuottavat tuloksia."
                  : "Today Mitrox has grown into a team that blends technical skill, creativity, and a deep understanding of real business needs. We strive to be the partner Finnish companies turn to when they need solutions that not only look good – but deliver results."}
              </p>
            </div>
          </div>

          {/* Interactive Particle Mitrox Logo */}
          <div className="relative w-full max-w-md sm:max-w-lg aspect-square mx-auto">
            <InteractiveMitroxLogo />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-24 pt-20 border-t border-white/10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
            <div className="md:max-w-xl">
              <span className="text-xs uppercase tracking-[0.35em] text-body-caption mb-4 block">
                {isFinnish ? "[ Meidän visiomme ]" : "[ Our vision ]"}
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white leading-tight">
                {isFinnish ? "Meidän visiomme" : "Our vision"}
              </h3>
            </div>
            <p className="md:max-w-md text-sm sm:text-base text-body-subtle leading-relaxed md:mt-[0.35rem]">
              {isFinnish
                ? "Uskomme, että tulevaisuuden menestyvät yritykset rakentuvat älykkään teknologian ja inhimillisen suunnittelun varaan. Siksi tavoitteemme on tehdä digitaalisesta kehityksestä helpompaa, nopeampaa ja laadukkaampaa – tavalla, joka aidosti tukee yritysten kasvua. Emme rakenna vain sivustoja tai työkaluja, vaan pitkän aikavälin ratkaisuja, jotka kestävät muutosta ja kasvavat yhdessä asiakkaidemme kanssa."
                : "We believe the most successful companies of the future are built on intelligent technology and human-centred design. Our goal is to make digital development easier, faster, and higher quality – in a way that genuinely supports business growth. We don’t just build websites or tools; we create long-term solutions that adapt to change and grow with our clients."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;

