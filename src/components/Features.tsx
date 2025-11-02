// Features.tsx

import React, { useEffect, useRef, useState } from "react";
import { Zap, HeartHandshake, Workflow } from "lucide-react";

const Features: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number(e.target.getAttribute("data-index") || 0);
            setVisibleCards((prev) => (prev.includes(i) ? prev : [...prev, i]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    cardRefs.current.forEach((ref) => ref && obs.observe(ref));
    return () => obs.disconnect();
  }, []);

  const features = [
    {
      icon: <Workflow className="w-7 h-7" />,
      title: "Modernit Ratkaisut",
      description:
        "Tarjoamme luotettavia, nopeita ja yksilöllisiä ratkaisuja, jotka auttavat yritystäsi kasvamaan.",
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: "Nopea Käyttöönotto",
      description:
        "Varmistamme palvelun sujuvan käyttöönoton, sinä keskityt vain liiketoiminnan tuloksiin.",
    },
    {
      icon: <HeartHandshake className="w-7 h-7" />,
      title: "Aina Apunasi",
      description:
        "Turvallinen ja asiantunteva kumppani, joka takaa luotettavan tuen ja kehityksen koko yhteistyön ajan.",
    },
  ];

  return (
    <section
      id="process"
      className="relative pt-20 md:pt-24 pb-40 md:pb-48 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-3 text-white">
            Miksi valita Mitrox?
          </h2>
          <p className="text-sm max-w-xl mx-auto text-gray-500">
            Suomalainen teknologiayritys, joka ymmärtää liiketoimintasi tarpeet ja luo juuri sinulle sopivat ratkaisut.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              key={index}
              className={[
                "group relative p-6 h-full border-b border-white/5 text-center",
                "hover:bg-white/[0.02] transition-all duration-300",
                visibleCards.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              ].join(" ")}
              style={{ transitionDelay: visibleCards.includes(index) ? `${index * 50}ms` : "0ms" }}
            >
              <div className="mb-6 flex items-center justify-center text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.icon}
              </div>

              <h3 className="text-lg font-medium mb-4 text-white/90 group-hover:text-white transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-400 transition-colors max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
