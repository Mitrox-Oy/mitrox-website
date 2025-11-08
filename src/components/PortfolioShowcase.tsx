import React, { useState } from "react";
import claroYoga from "../assets/claro-yoga.png";
import homewell from "../assets/homewell.png";
import nordhavnBistro from "../assets/nordhavn-bistro.png";
import nordicPulse from "../assets/nordic-pulse.png";
import pureclean from "../assets/pureclean.png";
import studioKa from "../assets/studio-ka.png";
import PortfolioModal from "./PortfolioModal";
import type { PortfolioItem } from "./PortfolioModal";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";
import { useLanguage } from "../context/LanguageContext";

export interface PortfolioShowcaseProps {
  items?: Array<{
    id: string;
    image: string;
    company: string;
  }>;
}

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const referencesId = useLocalizedSectionId("references");
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  // Default portfolio items with actual images
  const defaultItems: PortfolioItem[] = items || [
    {
      id: "1",
      image: claroYoga,
      company: "Claro Yoga",
    },
    {
      id: "2",
      image: homewell,
      company: "HomeWell",
    },
    {
      id: "3",
      image: nordhavnBistro,
      company: "Nordhavn Bistro",
    },
    {
      id: "4",
      image: nordicPulse,
      company: "Nordic Pulse",
    },
    {
      id: "5",
      image: pureclean,
      company: "PureClean",
    },
    {
      id: "6",
      image: studioKa,
      company: "Studio—KA",
    },
  ];

  return (
    <>
      <section
        id={referencesId}
        className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
              {isFinnish ? "Inspiraatiota tulevaan sivustoosi" : "Inspiration for your next website"}
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {isFinnish
                ? "Tutustu esimerkkisivustoihin, jotka kuvaavat Mitroxin suunnittelun laatua ja tyyliä."
                : "Explore real examples that reflect Mitrox's design quality, clarity, and attention to detail."}
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {defaultItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.company}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-medium text-lg">
                    {item.company}
                  </h3>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-xl transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
};

export default PortfolioShowcase;
