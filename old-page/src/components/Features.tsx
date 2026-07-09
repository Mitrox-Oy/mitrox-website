// Features.tsx

import React, { useMemo } from "react";
import { Zap, HeartHandshake, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PixelBlast from "./PixelBlast";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const Features: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const featuresId = useLocalizedSectionId("features");

  const features: Feature[] = useMemo(
    () => [
      {
        icon: Workflow,
        title: isFinnish ? "Modernit Ratkaisut" : "Modern solutions",
        description: isFinnish
          ? "Suunnittelemme ja toteutamme ratkaisuja, jotka yhdistävät teknisen osaamisen ja viimeistellyn muotoilun. Tuloksena on verkkopalvelu, joka toimii saumattomasti ja näyttää yhtä hyvältä kuin se toimii."
          : "We combine technical precision with refined design to build digital experiences that work beautifully and perform flawlessly.",
      },
      {
        icon: Zap,
        title: isFinnish ? "Nopea Käyttöönotto" : "Fast implementation",
        description: isFinnish
          ? "Rakennamme tehokkaasti ja toimitamme ajallaan. Käyttöönotto sujuu ilman turhaa odottelua – yrityksesi on valmiina hyödyntämään uutta ratkaisua lähes heti."
          : "Our process is efficient and transparent. We deliver on schedule, ensuring your new solution is live and driving results sooner than expected.",
      },
      {
        icon: HeartHandshake,
        title: isFinnish ? "Aina Apunasi" : "Always by your side",
        description: isFinnish
          ? "Tarjoamme jatkuvaa tukea ja kehitystä. Olemme kumppani, johon voit nojata – aina, kun tarvitset neuvoa, päivityksiä tai uusia ideoita yrityksesi kasvuun."
          : "Your success doesn't stop at launch. We provide continuous support, optimization, and fresh ideas to keep your business growing.",
      },
    ],
    [isFinnish]
  );

  return (
    <section
      id={featuresId}
      className="relative bg-black py-24 sm:py-32 overflow-hidden"
    >
      {/* Pixel Blast Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <PixelBlast
          variant="square"
          pixelSize={6}
          color="#005bab"
          patternScale={4}
          patternDensity={0.7}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          speed={0.6}
          edgeFade={0.15}
          transparent
          className="w-full h-full"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/75 to-black/90" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-5">
          <span className="text-[0.7rem] uppercase tracking-[0.5em] text-body-caption">
            {isFinnish ? "[ Miksi valita Mitrox ]" : "[ Why choose Mitrox ]"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
            {isFinnish ? "Miksi valita Mitrox?" : "Why choose Mitrox?"}
          </h2>
          <div className="max-w-3xl text-base leading-relaxed text-body-subtle space-y-4">
            <p>
              {isFinnish
                ? "Suomalainen teknologiayritys, joka yhdistää älyn, designin ja tehokkuuden. Ymmärrämme liiketoimintasi tarpeet ja rakennamme ratkaisuja, jotka vievät yritystäsi eteenpäin – luotettavasti ja tyylillä."
                : "Mitrox is a Finnish technology company where intelligence meets design."}
            </p>
            {!isFinnish && (
              <p>
                We understand your business goals and create solutions that move your brand forward seamlessly, reliably, and with purpose.
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-black/85 p-8 transition-colors hover:border-white/[0.14]"
            >
              <div className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-body-muted">
                  {feature.description}
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-14 -right-10 opacity-0 transition duration-500 group-hover:opacity-45">
                <feature.icon className="h-44 w-44 text-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
