import React from "react";
import { Link } from "react-router-dom";
import { Globe, Bot, Sparkles, ArrowRight } from "lucide-react";

const ProductsSection: React.FC = () => {
  const products = [
    {
      id: "websites",
      icon: <Globe className="w-8 h-8" />,
      title: "Räätälöidyt Verkkosivut",
      description:
        "Modernit, käyttäjäystävälliset verkkosivut, jotka kertovat yrityksesi tarinan ja tukevat kasvua.\n\nYksilöllinen design, joka heijastaa brändisi identiteettiä.",
      buttonText: "Tutustu portfolioon",
      link: "/websites",
      action: null,
      comingSoon: false,
    },
    {
      id: "chatbot",
      icon: <Bot className="w-8 h-8" />,
      title: "Tekoälybotti",
      description:
        "Älykäs virtuaaliavustaja, joka palvelee asiakkaitasi ympäri vuorokauden.\n\nVastaa kysymyksiin, kerää liidejä ja vahvistaa myyntiä automaattisesti.",
      buttonText: "Katso yksityiskohdat",
      link: "/ai-agent",
      action: null,
      comingSoon: false,
    },
    {
      id: "coming-soon",
      icon: <Sparkles className="w-8 h-8" />,
      title: "Seuraava innovaatio",
      description:
        "Työstämme parhaillaan uutta ratkaisua, joka vie palvelumme seuraavalle tasolle.\n\nPysy kuulolla ja kuulet siitä ensimmäisten joukossa.",
      buttonText: "Tulossa pian",
      link: null,
      action: null,
      comingSoon: true,
    },
  ];

  return (
    <section
      id="products"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Meidän tuotteemme
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Valitse juuri sinulle sopiva ratkaisu tai yhdistä ne
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group relative p-8 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col ${
                product.comingSoon ? "opacity-75" : ""
              }`}
            >
              {/* Coming Soon Badge */}
              {product.comingSoon && (
                <div className="absolute -top-3 right-4 z-10">
                  <div className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium">
                    Tulossa pian
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="mb-6 text-gray-400 group-hover:text-gray-300 transition-colors">
                {product.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-white mb-3 group-hover:text-white transition-colors">
                {product.title}
              </h3>

                      {/* Description */}
                      <div className="text-sm text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors flex-grow">
                        {product.description.split('\n\n').map((paragraph, idx) => (
                          <p key={idx} className={idx > 0 ? "mt-3" : ""}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

              {/* Button - Always at bottom */}
              <div className="mt-auto">
                {product.comingSoon ? (
                  <button
                    disabled
                    className="w-full py-3 px-6 rounded-xl font-medium text-sm bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {product.buttonText}
                  </button>
                ) : product.link ? (
                  <Link
                    to={product.link}
                    className="w-full py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {product.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    onClick={product.action || undefined}
                    className="w-full py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {product.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

