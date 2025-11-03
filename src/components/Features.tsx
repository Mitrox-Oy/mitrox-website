// Features.tsx

import React from "react";
import { Zap, HeartHandshake, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import PixelBlast from "./PixelBlast";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Workflow,
      title: "Modernit Ratkaisut",
      description:
        "Suunnittelemme ja toteutamme ratkaisuja, jotka yhdistävät teknisen osaamisen ja viimeistellyn muotoilun. Tuloksena on verkkopalvelu, joka toimii saumattomasti ja näyttää yhtä hyvältä kuin se toimii.",
    },
    {
      icon: Zap,
      title: "Nopea Käyttöönotto",
      description:
        "Rakennamme tehokkaasti ja toimitamme ajallaan. Käyttöönotto sujuu ilman turhaa odottelua – yrityksesi on valmiina hyödyntämään uutta ratkaisua lähes heti.",
    },
    {
      icon: HeartHandshake,
      title: "Aina Apunasi",
      description:
        "Tarjoamme jatkuvaa tukea ja kehitystä. Olemme kumppani, johon voit nojata – aina, kun tarvitset neuvoa, päivityksiä tai uusia ideoita yrityksesi kasvuun.",
    },
  ];

  return (
    <section
      id="process"
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
          <span className="text-[0.7rem] uppercase tracking-[0.5em] text-white/50">
            [ Miksi valita Mitrox ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white">
            Miksi valita Mitrox?
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/70">
            Suomalainen teknologiayritys, joka yhdistää älyn, designin ja tehokkuuden. Ymmärrämme liiketoimintasi tarpeet ja rakennamme ratkaisuja, jotka vievät yritystäsi eteenpäin – luotettavasti ja tyylillä.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative flex min-h-[240px] flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-black/85 p-8 transition-colors hover:border-white/[0.14]"
            >
              <div className="flex h-full flex-col gap-4">
                <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">
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
