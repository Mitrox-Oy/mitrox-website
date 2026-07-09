import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const DataBasedHeadline: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleScrollToCalculator = () => {
    const calculatorSection = document.getElementById("savings-calculator");
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center space-y-6">
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight">
              {isFinnish
                ? "Tyypillinen säästö 3 000–7 000 € vuodessa"
                : "Typical savings 3,000–7,000 € per year"}
            </h2>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {isFinnish
                ? "Vähentää asiakaspalvelun manuaalista työtä keskimäärin 60–80 %."
                : "Reduces manual customer service work by an average of 60–80%."}
            </p>

            {/* Stat Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                {isFinnish ? "Välitön vastaus asiakkaalle" : "Instant response to customer"}
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                {isFinnish ? "24/7 palvelu" : "24/7 service"}
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                {isFinnish
                  ? "Ratkaisee toistuvat kysymykset automaattisesti"
                  : "Automatically resolves repetitive questions"}
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                {isFinnish
                  ? "Ei sijaisia, lomia tai ruuhkia"
                  : "No substitutes, holidays, or bottlenecks"}
              </div>
            </div>

            {/* Example Boxes */}
            <div className="grid md:grid-cols-3 gap-6 pt-12 max-w-6xl mx-auto">
              {/* Column 1 - Small Business */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {isFinnish ? "Pieni yritys" : "Small Business"}
                    </h3>
                    <p className="text-xs text-gray-400 min-h-[2.5rem]">
                      {isFinnish
                        ? "(esimerkiksi kauneus- tai hyvinvointiala)"
                        : "(for example beauty or wellness sector)"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-3 space-y-1">
                    <p>
                      {isFinnish
                        ? "Oletus: 40 viikkokyselyä, 8 min per vastaus"
                        : "Assumption: 40 weekly inquiries, 8 min per response"}
                    </p>
                    <p>
                      {isFinnish
                        ? "AI Advisor automatisoi 70 %"
                        : "AI Advisor automates 70%"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-4 space-y-1">
                    <p className="font-medium text-gray-300 mb-1">
                      {isFinnish ? "Perustuu:" : "Based on:"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Säästetty aika ~3,7 h / viikko"
                        : "Time saved ~3.7 h / week"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Tuntikustannus 25 € / h"
                        : "Hourly cost 25 € / h"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="text-2xl font-light text-white">
                      {isFinnish ? "n. 4 400 € / vuosi" : "approx. 4,400 € / year"}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish
                      ? 'Vähentää toistuvia "milloin vapaita aikoja?" ja "miten palvelu toimii?" -viestejä. Omistajalle vapautuu useita tunteja kuukaudessa.'
                      : 'Reduces repetitive messages like "do you have available times?" and "how does the service work?". Frees up several hours each month.'}
                  </p>
                </div>
              </div>

              {/* Column 2 - Medium Business */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {isFinnish ? "Keskisuuri yritys" : "Mid-Sized Business"}
                    </h3>
                    <p className="text-xs text-gray-400 min-h-[2.5rem]">
                      {isFinnish
                        ? "(esimerkiksi kasvava palveluyritys tai B2B-tiimi)"
                        : "(for example growing service company or B2B team)"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-3 space-y-1">
                    <p>
                      {isFinnish
                        ? "Oletus: 120 viikkokyselyä, 6 min per vastaus"
                        : "Assumption: 120 weekly inquiries, 6 min per response"}
                    </p>
                    <p>
                      {isFinnish
                        ? "AI Advisor automatisoi 75 %"
                        : "AI Advisor automates 75%"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-4 space-y-1">
                    <p className="font-medium text-gray-300 mb-1">
                      {isFinnish ? "Perustuu:" : "Based on:"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Säästetty aika ~9 h / viikko"
                        : "Time saved ~9 h / week"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Tuntikustannus 34 € / h"
                        : "Hourly cost 34 € / h"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="text-2xl font-light text-white">
                      {isFinnish ? "n. 14 600 € / vuosi" : "approx. 14,600 € / year"}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish
                      ? "Merkittävä määrä toistuvia peruskysymyksiä poistuu. Tiimi voi keskittyä myyntiin ja asiakastyytyväisyyteen."
                      : "Eliminates a significant amount of routine questions. The team can focus on sales and customer satisfaction."}
                  </p>
                </div>
              </div>

              {/* Column 3 - E-commerce */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-white mb-2">
                      {isFinnish
                        ? "Verkkokauppa / palvelualusta"
                        : "E-commerce / Service Platform"}
                    </h3>
                    <p className="text-xs text-gray-400 min-h-[2.5rem]">
                      {isFinnish
                        ? "(esimerkiksi fashion-, lifestyle- tai elektroniikkaverkkokauppa)"
                        : "(for example fashion, lifestyle, or electronics e-commerce)"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-3 space-y-1">
                    <p>
                      {isFinnish
                        ? "Oletus: 80 viikkokyselyä, 5 min per vastaus"
                        : "Assumption: 80 weekly inquiries, 5 min per response"}
                    </p>
                    <p>
                      {isFinnish
                        ? "AI Advisor automatisoi 65 %"
                        : "AI Advisor automates 65%"}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 mb-4 space-y-1">
                    <p className="font-medium text-gray-300 mb-1">
                      {isFinnish ? "Perustuu:" : "Based on:"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Säästetty aika ~4,3 h / viikko"
                        : "Time saved ~4.3 h / week"}
                    </p>
                    <p>
                      {isFinnish
                        ? "Tuntikustannus 30 € / h"
                        : "Hourly cost 30 € / h"}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 mt-auto">
                    <div className="text-2xl font-light text-white">
                      {isFinnish ? "n. 6 900 € / vuosi" : "approx. 6,900 € / year"}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-6 bg-white/[0.02] backdrop-blur-xl border border-white/10">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish
                      ? "Vähentää palautuksiin, toimituksiin ja saatavuuteen liittyvää viestipainetta. Nopeuttaa vastausaikoja ja keventää tukitiimin kuormaa."
                      : "Reduces messaging load related to returns, deliveries and availability. Improves response speed and eases pressure on support staff."}
                  </p>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center pt-8">
              {isFinnish
                ? "Säästölaskelmat perustuvat toimialakeskiarvoihin. Hinnat sisältävät Mitrox AI Advisor Pro -vuosittaisen tilauksen."
                : "Savings calculations are based on industry averages. Prices include Mitrox AI Advisor Pro annual subscription."}
            </p>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                onClick={handleScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium transition-all duration-300"
              >
                {isFinnish ? "Katso paljonko säästäisit" : "See how much you'd save"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataBasedHeadline;

