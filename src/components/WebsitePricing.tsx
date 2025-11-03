import React, { useState } from "react";
import { Check, ArrowRight, Calculator } from "lucide-react";
import WebsiteInquiryForm from "./WebsiteInquiryForm";

const formatEUR = (value: number) =>
  new Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

type BillingCycle = "monthly" | "yearly";

const WebsitePricing: React.FC = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [showCalculator, setShowCalculator] = useState(false);
  const [pageCount, setPageCount] = useState(5);
  const [includeLanguage, setIncludeLanguage] = useState(false);
  const [includeAIBot, setIncludeAIBot] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const MONTHLY_PRICE = 39;
  const YEARLY_DISCOUNT = 0.1;
  const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * (1 - YEARLY_DISCOUNT));
  const EFFECTIVE_MONTHLY = Math.round(YEARLY_PRICE / 12);

  // Pricing calculations
  const SETUP_FEE_BASE = 599;
  const SETUP_FEE_PER_PAGE = 100;
  const LANGUAGE_FEE_BASE = 200;
  const LANGUAGE_FEE_PER_PAGE = 50;
  // Mitrox AI Advisorin hinta: 55€/kk vuosittaisella, 65€/kk kuukausittaisella
  const AI_BOT_MONTHLY = billing === "yearly" ? 55 : 65;

  const calculateSetupFee = () => {
    const extraPages = Math.max(0, pageCount - 5);
    return SETUP_FEE_BASE + (extraPages * SETUP_FEE_PER_PAGE);
  };

  const calculateLanguageFee = () => {
    if (!includeLanguage) return 0;
    const extraPages = Math.max(0, pageCount - 5);
    return LANGUAGE_FEE_BASE + (extraPages * LANGUAGE_FEE_PER_PAGE);
  };

  const totalSetupFee = calculateSetupFee() + calculateLanguageFee();
  const baseMonthlyFee = billing === "yearly" ? EFFECTIVE_MONTHLY : MONTHLY_PRICE;
  const monthlyFee = baseMonthlyFee + (includeAIBot ? AI_BOT_MONTHLY : 0);

  return (
    <section id="pricing" className="relative py-40 md:py-48 px-4 sm:px-6 lg:px-8 bg-black font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
            Hinnoittelu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Yksinkertainen ja läpinäkyvä hinnoittelu ilman piilotettuja kustannuksia
          </p>

          <div className="flex flex-col items-center gap-4">
            {/* Calculator Toggle */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 text-white/70 hover:text-white transition-all duration-300 text-sm font-light"
            >
              <Calculator className="w-3.5 h-3.5" />
              {showCalculator ? "Piilota hinnoittelulaskuri" : "Laske hinta projektillesi"}
            </button>

            {/* Toggle */}
            <div className="inline-block">
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
        </div>

        {/* Price Calculator */}
        {showCalculator && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-2xl p-8 lg:p-12 bg-white/[0.02] backdrop-blur-xl border border-white/10">
              <h3 className="text-2xl font-medium text-white mb-6 text-center">
                Hinnoittelulaskuri
              </h3>

              <div className="space-y-8">
                {/* Page Count Slider */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-300">
                      Sivumäärä
                    </label>
                    <span className="text-xl font-medium text-white">
                      {pageCount} {pageCount === 1 ? "sivu" : "sivua"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    style={{
                      background: `linear-gradient(to right, white 0%, white ${((pageCount - 1) / 19) * 100}%, rgba(255,255,255,0.1) ${((pageCount - 1) / 19) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1</span>
                    <span>5 (sisältyy aloitusmaksuun)</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Language Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <label className="text-sm font-medium text-white block mb-1">
                      Lisäkieli (Suomi ↔ Englanti)
                    </label>
                    <p className="text-xs text-gray-400">
                      Käännös ja viimeistely verkkosivustolle
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeLanguage(!includeLanguage)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 ${
                      includeLanguage ? "bg-white" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                        includeLanguage ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* AI Bot Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <label className="text-sm font-medium text-white block mb-1">
                      Mitrox AI Advisor
                    </label>
                    <p className="text-xs text-gray-400">
                      24/7 keskusteleva asiakasavustaja (+{formatEUR(AI_BOT_MONTHLY)}/kk)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIncludeAIBot(!includeAIBot)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 ${
                      includeAIBot ? "bg-white" : "bg-white/20"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                        includeAIBot ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Aloitusmaksu</span>
                    <div className="text-right">
                      <span className="text-lg font-medium text-white">
                        {formatEUR(calculateSetupFee())}
                      </span>
                      {pageCount > 5 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatEUR(SETUP_FEE_BASE)} (5 sivua) + {pageCount - 5} × {formatEUR(SETUP_FEE_PER_PAGE)}
                        </p>
                      )}
                    </div>
                  </div>

                  {includeLanguage && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Lisäkieli</span>
                      <div className="text-right">
                        <span className="text-lg font-medium text-white">
                          {formatEUR(calculateLanguageFee())}
                        </span>
                        {pageCount > 5 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatEUR(LANGUAGE_FEE_BASE)} (5 sivua) + {pageCount - 5} × {formatEUR(LANGUAGE_FEE_PER_PAGE)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-base font-medium text-white">Yhteensä (aloitusmaksu)</span>
                    <span className="text-2xl font-medium text-white">
                      {formatEUR(totalSetupFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Kuukausimaksu</span>
                    <div className="text-right">
                      <span className="text-lg font-medium text-white">
                        {formatEUR(monthlyFee)} /kk
                      </span>
                      {includeAIBot && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatEUR(baseMonthlyFee)} (verkkosivusto) + {formatEUR(AI_BOT_MONTHLY)} (Mitrox AI Advisor)
                        </p>
                      )}
                      {billing === "yearly" && !includeAIBot && (
                        <p className="text-xs text-gray-500 mt-1">
                          Säästät {formatEUR(MONTHLY_PRICE * 12 - YEARLY_PRICE)} / vuosi
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-300">
                        Ensimmäinen vuosi (arvio)
                      </span>
                      <span className="text-3xl font-light text-white">
                        {formatEUR(totalSetupFee + (monthlyFee * 12))}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                      Sisältää aloitusmaksun + 12kk kuukausimaksu<br />
                      Hinnat verottomina. ALV 25,5 % lisätään hintaan
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Pricing Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative rounded-2xl p-8 lg:p-12 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
            {/* Limited Launch Price Badge */}
            <div className="absolute -top-3 right-4 z-10">
              <div className="bg-black/90 text-green-400 px-1.5 py-0.5 rounded-full text-xs font-semibold border border-green-400/50 whitespace-nowrap">
                Rajoitettu lanseeraushinta
              </div>
            </div>

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
                    Sivuston ylläpito ja turvallinen hosting
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Kuukausittaiset analytiikka- ja kehitysraportit
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Premium-asiakastuki ja jatkuva huolenpito
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Jopa 4 sisältö- tai designpäivitystä kuukaudessa
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Hakukoneoptimointi ja suorituskyvyn seuranta
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    Tietoturvapäivitykset ja valvonta
                  </span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
                Kaikki on huolehdittu puolestasi – sinä keskityt kasvuun.
              </p>
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
                onClick={() => setIsFormOpen(true)}
                className="w-full max-w-md mx-auto py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Aloita tänään
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Aloitetaan prosessi yhdessä.
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
                Mitrox AI Advisor
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

      {/* Inquiry Form Modal */}
      <WebsiteInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default WebsitePricing;

