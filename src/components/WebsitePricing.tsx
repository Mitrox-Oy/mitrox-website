import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const formatEUR = (value: number) =>
  new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

type BillingCycle = "monthly" | "yearly";

const WebsitePricing: React.FC = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");

  const MONTHLY_PRICE = 39;
  const YEARLY_DISCOUNT = 0.1;
  const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * (1 - YEARLY_DISCOUNT));
  const EFFECTIVE_MONTHLY = Math.round(YEARLY_PRICE / 12);

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="relative py-40 md:py-48 px-4 sm:px-6 lg:px-8 bg-black font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
            Hinnoittelu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Yksinkertainen ja läpinäkyvä hinnoittelu ilman piilotettuja kustannuksia
          </p>

          {/* Toggle */}
          <div className="mt-12 inline-block">
            <div className="relative inline-flex rounded-full bg-white/5 backdrop-blur-xl border border-white/10 p-1">
              <div
                className="absolute top-1 bottom-1 w-1/2 rounded-full bg-white/10 backdrop-blur-sm transition-transform duration-300 ease-out"
                style={{ 
                  left: '4px',
                  transform: billing === "monthly" ? "translateX(0%)" : "translateX(calc(100% - 8px))" 
                }}
              />
              <button
                onClick={() => setBilling("monthly")}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  billing === "monthly" ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Kuukausittain
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  billing === "yearly" ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Vuosittain
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-green-400 font-semibold bg-black/90 rounded-full px-1.5 py-0.5 border border-green-400/50 whitespace-nowrap">
                  -10%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-2xl p-8 lg:p-12 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium text-white mb-2">
                Verkkosivupaketti
              </h3>
              <p className="text-gray-400">
                Yksinkertainen ja läpinäkyvä hinnoittelu
              </p>
            </div>

            {/* Setup Fee */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">Aloitusmaksu</div>
                <div className="text-3xl font-light text-white mb-2">
                  {formatEUR(599)}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  Verkkosivusto sisältää jopa 5 sivua.<br />
                  Lisäsivut {formatEUR(100)} / sivu
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Hinnat verottomina. ALV 25,5 % lisätään hintaan
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="text-center mb-8">
              <div className="text-sm text-gray-400 mb-2">Kuukausimaksu</div>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-light text-white">
                  {billing === "yearly" ? formatEUR(EFFECTIVE_MONTHLY) : formatEUR(MONTHLY_PRICE)}
                </span>
                <span className="ml-2 text-gray-400 text-lg">
                  /kk
                </span>
              </div>
              {billing === "yearly" && (
                <div className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full inline-block border border-white/10 mb-2">
                  Säästät {formatEUR(MONTHLY_PRICE * 12 - YEARLY_PRICE)} / vuosi
                </div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                Hinnat verottomina. ALV 25,5 % lisätään hintaan
              </div>
            </div>

            {/* Included Features */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-white mb-4 text-center">
                Sisältyy kuukausimaksuun:
              </h4>
              <ul className="space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Hosting ja tekninen ylläpito
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Kuukausittaiset analytiikkaraportit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Premium asiakastuki
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Jopa 4 sisältö- tai designpäivitystä joka kuukausi
                  </span>
                </li>
              </ul>
            </div>

            {/* Guarantee */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs text-gray-300">
                  14 päivän rahat takaisin -takuu projektin alusta
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={handleScrollToContact}
                className="w-full max-w-md mx-auto py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ota yhteyttä
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Aloitetaan projekti yhdessä.
              </p>
            </div>
          </div>
        </div>

        {/* Optional Add-Ons */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              Vapaaehtoiset lisäpalvelut
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Laajenna verkkosivuasi lisäpalveluilla tarpeesi mukaan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* AI Agent Add-On */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-3">
                Mitrox Tekoälybotti
              </h4>
              <div className="text-2xl font-light text-white mb-2">
                {formatEUR(55)}
                <span className="text-gray-400 text-base ml-1">/ kk alkaen</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                (erikoishinta verkkosivupaketin yhteydessä)
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                24/7 keskusteleva asiakasavustaja, joka vastaa asiakkaiden kysymyksiin ja kerää liidejä.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                Auttaa sinua palvelemaan ympäri vuorokauden.
              </p>
            </div>

            {/* Additional Languages */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-3">
                Lisäkieli (Suomi ↔ Englanti)
              </h4>
              <div className="text-2xl font-light text-white mb-4">
                {formatEUR(200)}
                <span className="text-gray-400 text-base ml-1"> alkaen</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                Käännös ja viimeistely enintään 5 sivulle.
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Lisäsivut {formatEUR(50)} / sivu.
              </p>
              <p className="text-xs text-gray-400">
                Sisältää ammattitason käännökset, visuaaliset säädöt ja hakukone­optimoidut metatiedot.
              </p>
            </div>

            {/* Extra Updates */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-4">
                Ylimääräiset päivitykset
              </h4>
              <div className="text-2xl font-light text-white mb-2">
                {formatEUR(20)}
                <span className="text-gray-400 text-base ml-1">/ päivitys</span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                Soveltuu, kun kuukausittainen päivitysmäärä ylittyy.
              </p>
              
              <h5 className="text-base font-medium text-white mb-2">
                Uudet sivut
              </h5>
              <div className="text-xl font-light text-white mb-2">
                {formatEUR(100)}
                <span className="text-gray-400 text-sm ml-1">/ sivu</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Täysin uusi sivu suunniteltuna ja julkaistuna sivustollesi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsitePricing;

