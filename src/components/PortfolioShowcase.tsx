import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import PortfolioModal from "./PortfolioModal";
import type { PortfolioItem } from "./PortfolioModal";

export interface PortfolioShowcaseProps {
  items?: PortfolioItem[];
}

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ items = [] }) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Default placeholder portfolio items - replace with actual data
  const defaultItems: PortfolioItem[] = items.length > 0
    ? items
    : [
        {
          id: "1",
          image: "/placeholder-portfolio-1.jpg",
          company: "Esimerkki Yritys 1",
          testimonial: {
            quote:
              "Mitrox loi meille modernin verkkosivun, joka ylitti kaikki odotuksemme. Projektin aikataulu noudatettiin täsmällisesti ja lopputulos on ammattitaitoinen.",
            personName: "Matti Meikäläinen",
            role: "Toimitusjohtaja",
          },
        },
        {
          id: "2",
          image: "/placeholder-portfolio-2.jpg",
          company: "Esimerkki Yritys 2",
          testimonial: {
            quote:
              "Erinomainen yhteistyö ja lopputulos. Verkkosivumme on nyt moderni, käyttäjäystävällinen ja auttaa meitä saavuttamaan liiketoimintatavoitteemme.",
            personName: "Liisa Virtanen",
            role: "Markkinointipäällikkö",
          },
        },
        {
          id: "3",
          image: "/placeholder-portfolio-3.jpg",
          company: "Esimerkki Yritys 3",
          testimonial: {
            quote:
              "Projekti sujui sujuvasti alusta loppuun. Tiimi kuunteli tarpeitamme ja toi ne eloon upeassa visuaalisessa muodossa.",
            personName: "Jussi Jokinen",
            role: "Perustaja",
          },
        },
        {
          id: "4",
          image: "/placeholder-portfolio-4.jpg",
          company: "Esimerkki Yritys 4",
          testimonial: {
            quote:
              "Suosittelemme Mitroxia lämpimästi. He ymmärtävät liiketoiminnan tarpeet ja luovat ratkaisuja, jotka todella toimivat.",
            personName: "Anna Korhonen",
            role: "Myyntipäällikkö",
          },
        },
        {
          id: "5",
          image: "/placeholder-portfolio-5.jpg",
          company: "Esimerkki Yritys 5",
          testimonial: {
            quote:
              "Verkkosivumme on saanut paljon kehuja. Mitroxin tiimi teki työn loistavasti ja olemme erittäin tyytyväisiä lopputulokseen.",
            personName: "Petri Nieminen",
            role: "Toimitusjohtaja",
          },
        },
        {
          id: "6",
          image: "/placeholder-portfolio-6.jpg",
          company: "Esimerkki Yritys 6",
          testimonial: {
            quote:
              "Ammattitaitoinen palvelu ja lopputulos on juuri sitä, mitä tarvitsimme. Kiitos loistavasta työstä!",
            personName: "Sari Lehtonen",
            role: "Perustaja",
          },
        },
      ];

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <section
        id="portfolio"
        className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
              Inspiraatiota tulevaan sivustoosi
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Tutustu esimerkkisivustoihin, jotka kuvaavat Mitroxin suunnittelun laatua ja tyyliä.
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                  <img
                    src={item.image}
                    alt={item.company}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                    loading="lazy"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white font-medium text-lg mb-1">
                    {item.company}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 text-sm group-hover:text-white transition-colors">
                    <span>Katso lisää</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
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
        <PortfolioModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PortfolioShowcase;

