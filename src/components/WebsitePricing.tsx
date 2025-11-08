import React, { useMemo, useState } from "react";
import { Check, ArrowRight, Calculator } from "lucide-react";
import WebsiteInquiryForm from "./WebsiteInquiryForm";
import { useLanguage } from "../context/LanguageContext";
import { useLocalizedSectionId } from "../hooks/useLocalizedSectionId";

const formatEUR = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

type BillingCycle = "monthly" | "yearly" | "3year";

const WebsitePricing: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const pricingId = useLocalizedSectionId("pricing");
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const [showCalculator, setShowCalculator] = useState(false);
  const [pageCount, setPageCount] = useState(5);
  const [includeLanguage, setIncludeLanguage] = useState(false);
  const [includeAIBot, setIncludeAIBot] = useState(false);
  const [includeSEO, setIncludeSEO] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const MONTHLY_PRICE = 39;
  const YEARLY_DISCOUNT = 0.1;
  const THREE_YEAR_DISCOUNT = 0.2;
  
  const YEARLY_PRICE = Math.round(MONTHLY_PRICE * 12 * (1 - YEARLY_DISCOUNT));
  const THREE_YEAR_PRICE = Math.round(MONTHLY_PRICE * 36 * (1 - THREE_YEAR_DISCOUNT));
  
  const EFFECTIVE_MONTHLY = billing === "yearly" 
    ? Math.round(YEARLY_PRICE / 12)
    : billing === "3year"
    ? Math.round(THREE_YEAR_PRICE / 36)
    : MONTHLY_PRICE;

  // Pricing calculations
  const SETUP_FEE_BASE = 599;
  const SETUP_FEE_PER_PAGE = 99;
  const LANGUAGE_FEE_BASE = 199;
  const LANGUAGE_FEE_PER_PAGE = 49;
  // Mitrox AI Advisorin hinta verkkosivun lisäpalveluna:
  // Kuukausitilaus: 69€/kk, Vuosittain: 59€/kk, 3 vuotta: 55€/kk
  const AI_BOT_MONTHLY = billing === "monthly" 
    ? 69 
    : billing === "yearly"
    ? 59
    : 55;
  // Laajennettu hakukoneoptimointi: Kuukausitilaus 89€/kk, Vuosittain 84€/kk, 3 vuotta 79€/kk alkaen
  const SEO_MONTHLY = billing === "monthly" 
    ? 89 
    : billing === "yearly"
    ? 84
    : 79;

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
  const baseMonthlyFee = EFFECTIVE_MONTHLY;
  const monthlyFee = baseMonthlyFee + (includeAIBot ? AI_BOT_MONTHLY : 0) + (includeSEO ? SEO_MONTHLY : 0);

  // Säästöt lisäpalveluista
  const AI_BOT_MONTHLY_PRICE = 69; // Kuukausitilauksen hinta verkkosivun lisäpalveluna
  const AI_BOT_STANDARD_PRICE = 79; // Normi Starter AI Advisorin hinta
  const AI_BOT_MONTHLY_SAVINGS = billing === "monthly" && includeAIBot ? (AI_BOT_STANDARD_PRICE - AI_BOT_MONTHLY_PRICE) : 0; // Säästö verrattuna normi hintaan
  const AI_BOT_YEARLY_SAVINGS = billing === "yearly" ? (AI_BOT_MONTHLY_PRICE - AI_BOT_MONTHLY) * 12 : 0;
  const AI_BOT_3YEAR_SAVINGS = billing === "3year" ? (AI_BOT_MONTHLY_PRICE - AI_BOT_MONTHLY) * 36 : 0;
  
  const SEO_MONTHLY_PRICE = 89; // Kuukausitilauksen hinta
  const SEO_YEARLY_SAVINGS = billing === "yearly" ? (SEO_MONTHLY_PRICE - SEO_MONTHLY) * 12 : 0;
  const SEO_3YEAR_SAVINGS = billing === "3year" ? (SEO_MONTHLY_PRICE - SEO_MONTHLY) * 36 : 0;

  return (
    <section id={pricingId} className="relative py-40 md:py-48 px-4 sm:px-6 lg:px-8 bg-black font-inter">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-light text-white mb-4">
            {isFinnish ? "Hinnoittelu" : "Pricing"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            {isFinnish ? "Yksinkertainen ja läpinäkyvä hinnoittelu ilman piilotettuja kustannuksia" : "Simple and transparent pricing without hidden costs"}
          </p>

          <div className="flex flex-col items-center gap-4">
            {/* Calculator Toggle */}
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-transparent hover:bg-white/5 border border-white/10 hover:border-white/20 text-body-subtle hover:text-white transition-all duration-300 text-sm font-light"
            >
              <Calculator className="w-3.5 h-3.5" />
              {showCalculator ? (isFinnish ? "Piilota hinnoittelulaskuri" : "Hide pricing calculator") : (isFinnish ? "Laske hinta projektillesi" : "Calculate price for your project")}
            </button>

            {/* Billing Cycle Selector */}
            <div className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                {([
                  { key: "monthly", label: isFinnish ? "Kuukausittain" : "Monthly", discount: null },
                  { key: "yearly", label: isFinnish ? "Vuosittain" : "Yearly", discount: "-10%" },
                  { key: "3year", label: isFinnish ? "3 vuotta" : "3 years", discount: "-20%" },
                ] as const).map((option) => {
                  const isActive = billing === option.key;
                  return (
                    <button
                      key={option.key}
                      onClick={() => setBilling(option.key)}
                      className={`flex min-w-[140px] flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors sm:flex-none sm:min-w-[130px] ${
                        isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-gray-200 bg-white/5"
                      }`}
                    >
                      <span className="whitespace-nowrap">{option.label}</span>
                      {option.discount && (
                        <span className="text-[0.7rem] font-semibold text-green-400">
                          {option.discount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Price Calculator */}
        {showCalculator && (
          <div className="max-w-4xl mx-auto mb-16">
            <div className="rounded-2xl p-8 lg:p-12 bg-white/[0.02] backdrop-blur-xl border border-white/10">
              <h3 className="text-2xl font-medium text-white mb-6 text-center">
                {isFinnish ? "Hinnoittelulaskuri" : "Pricing Calculator"}
              </h3>

              <div className="space-y-8">
                {/* Page Count Slider */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-medium text-gray-300">
                      {isFinnish ? "Sivumäärä" : "Number of pages"}
                    </label>
                    <span className="text-xl font-medium text-white">
                      {pageCount} {pageCount === 1 ? (isFinnish ? "sivu" : "page") : (isFinnish ? "sivua" : "pages")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                    style={{
                      background: `linear-gradient(to right, white 0%, white ${((pageCount - 5) / 15) * 100}%, rgba(255,255,255,0.1) ${((pageCount - 5) / 15) * 100}%, rgba(255,255,255,0.1) 100%)`
                    }}
                  />
                  <div className="relative mt-2 h-5">
                    <span className="absolute left-0 text-xs text-gray-500 whitespace-nowrap">
                      <span className="sm:hidden">5</span>
                      <span className="hidden sm:inline">5 {isFinnish ? "(sisältyy aloitusmaksuun)" : "(included in setup fee)"}</span>
                    </span>
                    <span className="absolute left-[33%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">10</span>
                    <span className="absolute left-[67%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">15</span>
                    <span className="absolute right-0 text-xs text-gray-500 whitespace-nowrap">20</span>
                  </div>
                </div>

                {/* Language Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <label className="text-sm font-medium text-white block mb-1">
                      {isFinnish ? "Lisäkieli (Suomi ↔ Englanti)" : "Additional Language (Finnish ↔ English)"}
                    </label>
                    <p className="text-xs text-gray-400">
                      {isFinnish ? "Käännös ja viimeistely verkkosivustolle" : "Translation and finishing for the website"}
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
                      {isFinnish ? "24/7 keskusteleva asiakasavustaja" : "24/7 conversational customer assistant"} (+{formatEUR(AI_BOT_MONTHLY)}/{isFinnish ? "kk" : "mo"})
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

        {/* SEO Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div>
            <label className="text-sm font-medium text-white block mb-1">
              {isFinnish ? "Laajennettu hakukoneoptimointi" : "Extended Search Engine Optimization"}
            </label>
            <p className="text-xs text-gray-400">
              {isFinnish ? "Hakukoneoptimointi sisällölle ja rakenteelle" : "Search engine optimization for content and structure"} (+{formatEUR(SEO_MONTHLY)}/{isFinnish ? "kk" : "mo"})
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIncludeSEO(!includeSEO)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 ${
              includeSEO ? "bg-white" : "bg-white/20"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-black shadow ring-0 transition duration-200 ease-in-out ${
                includeSEO ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

                {/* Price Breakdown */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{isFinnish ? "Aloitusmaksu" : "Setup fee"}</span>
                    <div className="text-right">
                      <span className="text-lg font-medium text-white">
                        {formatEUR(calculateSetupFee())}
                      </span>
                      {pageCount > 5 && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatEUR(SETUP_FEE_BASE)} ({isFinnish ? "5 sivua" : "5 pages"}) + {pageCount - 5} × {formatEUR(SETUP_FEE_PER_PAGE)}
                        </p>
                      )}
                    </div>
                  </div>

                  {includeLanguage && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{isFinnish ? "Lisäkieli" : "Additional language"}</span>
                      <div className="text-right">
                        <span className="text-lg font-medium text-white">
                          {formatEUR(calculateLanguageFee())}
                        </span>
                        {pageCount > 5 && (
                          <p className="text-xs text-gray-500 mt-1">
                            {formatEUR(LANGUAGE_FEE_BASE)} ({isFinnish ? "5 sivua" : "5 pages"}) + {pageCount - 5} × {formatEUR(LANGUAGE_FEE_PER_PAGE)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-base font-medium text-white">{isFinnish ? "Yhteensä (aloitusmaksu)" : "Total (setup fee)"}</span>
                    <span className="text-2xl font-medium text-white">
                      {formatEUR(totalSetupFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{isFinnish ? "Kuukausimaksu" : "Monthly fee"}</span>
                    <div className="text-right">
                      <span className="text-lg font-medium text-white">
                        {formatEUR(monthlyFee)} /{isFinnish ? "kk" : "mo"}
                      </span>
                      {(includeAIBot || includeSEO) && (
                        <p className="text-xs text-gray-500 mt-1">
                          {formatEUR(baseMonthlyFee)} ({isFinnish ? "verkkosivusto" : "website"})
                          {includeAIBot && ` + ${formatEUR(AI_BOT_MONTHLY)} (Mitrox AI Advisor)`}
                          {includeSEO && ` + ${formatEUR(SEO_MONTHLY)} (${isFinnish ? "Laajennettu hakukoneoptimointi" : "Extended SEO"})`}
                        </p>
                      )}
                      {billing === "monthly" && includeAIBot && AI_BOT_MONTHLY_SAVINGS > 0 && (
                        <p className="text-xs text-green-400 mt-1">
                          {isFinnish ? "Säästät" : "Save"} {formatEUR(AI_BOT_MONTHLY_SAVINGS)} / {isFinnish ? "kk" : "mo"} ({isFinnish ? "Starter Mitrox AI Advisor verrattuna normi hintaan" : "Starter Mitrox AI Advisor compared to standard price"})
                        </p>
                      )}
                      {billing !== "monthly" && (
                        <>
                          {!includeAIBot && (
                            <p className="text-xs text-gray-500 mt-1">
                              {billing === "yearly" && `${isFinnish ? "Säästät" : "Save"} ${formatEUR(MONTHLY_PRICE * 12 - YEARLY_PRICE)} / ${isFinnish ? "vuosi" : "year"}`}
                              {billing === "3year" && `${isFinnish ? "Säästät" : "Save"} ${formatEUR(MONTHLY_PRICE * 36 - THREE_YEAR_PRICE)} / ${isFinnish ? "3 vuotta" : "3 years"}`}
                            </p>
                          )}
                          {includeAIBot && billing === "yearly" && AI_BOT_YEARLY_SAVINGS > 0 && (
                            <p className="text-xs text-green-400 mt-1">
                              {isFinnish ? "Säästät" : "Save"} {formatEUR(AI_BOT_YEARLY_SAVINGS)} / {isFinnish ? "vuosi" : "year"} (Starter Mitrox AI Advisor)
                            </p>
                          )}
                          {includeAIBot && billing === "3year" && AI_BOT_3YEAR_SAVINGS > 0 && (
                            <p className="text-xs text-green-400 mt-1">
                              {isFinnish ? "Säästät" : "Save"} {formatEUR(AI_BOT_3YEAR_SAVINGS)} / {isFinnish ? "3 vuotta" : "3 years"} (Starter Mitrox AI Advisor)
                            </p>
                          )}
                          {includeSEO && billing === "yearly" && SEO_YEARLY_SAVINGS > 0 && (
                            <p className="text-xs text-green-400 mt-1">
                              {isFinnish ? "Säästät" : "Save"} {formatEUR(SEO_YEARLY_SAVINGS)} / {isFinnish ? "vuosi" : "year"} ({isFinnish ? "Laajennettu hakukoneoptimointi" : "Extended SEO"})
                            </p>
                          )}
                          {includeSEO && billing === "3year" && SEO_3YEAR_SAVINGS > 0 && (
                            <p className="text-xs text-green-400 mt-1">
                              {isFinnish ? "Säästät" : "Save"} {formatEUR(SEO_3YEAR_SAVINGS)} / {isFinnish ? "3 vuotta" : "3 years"} ({isFinnish ? "Laajennettu hakukoneoptimointi" : "Extended SEO"})
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-medium text-gray-300">
                        {billing === "monthly" && (isFinnish ? "Ensimmäinen vuosi (arvio)" : "First year (estimate)")}
                        {billing === "yearly" && (isFinnish ? "Ensimmäinen vuosi (arvio)" : "First year (estimate)")}
                        {billing === "3year" && (isFinnish ? "3 vuoden kokonaishinta (arvio)" : "3 year total price (estimate)")}
                      </span>
                      <span className="text-3xl font-light text-white">
                        {formatEUR(totalSetupFee + (monthlyFee * (billing === "monthly" || billing === "yearly" ? 12 : 36)))}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-right">
                      {billing === "monthly" && (isFinnish ? "Sisältää aloitusmaksun + 12kk kuukausimaksu" : "Includes setup fee + 12 months monthly fee")}
                      {billing === "yearly" && (isFinnish ? "Sisältää aloitusmaksun + 12kk kuukausimaksu" : "Includes setup fee + 12 months monthly fee")}
                      {billing === "3year" && (isFinnish ? "Sisältää aloitusmaksun + 36kk kuukausimaksu" : "Includes setup fee + 36 months monthly fee")}
                      <br />
                      {isFinnish ? "Hinnat verottomina. ALV 25,5 % lisätään hintaan" : "Prices exclude VAT. 25.5% VAT applies"}
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
                {isFinnish ? "Rajoitettu lanseeraushinta" : "Limited launch price"}
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-medium text-white mb-2">
                {isFinnish ? "Verkkosivupaketti" : "Website Package"}
              </h3>
              <p className="text-gray-400">
                {isFinnish ? "Yksinkertainen ja läpinäkyvä hinnoittelu" : "Simple and transparent pricing"}
              </p>
            </div>

            {/* Setup Fee */}
            <div className="mb-8 pb-8 border-b border-white/10">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">{isFinnish ? "Aloitusmaksu" : "Setup fee"}</div>
                <div className="text-3xl font-light text-white mb-2">
                  {formatEUR(599)}
                </div>
                <div className="text-xs text-gray-400 mb-1">
                  {isFinnish ? "Verkkosivusto sisältää jopa 5 sivua." : "Website includes up to 5 pages."}<br />
                  {isFinnish ? "Lisäsivut" : "Additional pages"} {formatEUR(99)} / {isFinnish ? "sivu" : "page"}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  {isFinnish ? "Hinnat verottomina. ALV 25,5 % lisätään hintaan" : "Prices exclude VAT. 25.5% VAT applies"}
                </div>
              </div>
            </div>

            {/* Subscription */}
            <div className="text-center mb-8">
              <div className="text-sm text-gray-400 mb-2">{isFinnish ? "Kuukausimaksu" : "Monthly fee"}</div>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-light text-white">
                  {formatEUR(EFFECTIVE_MONTHLY)}
                </span>
                <span className="ml-2 text-gray-400 text-lg">
                  /{isFinnish ? "kk" : "mo"}
                </span>
              </div>
              {billing === "yearly" && (
                <div className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full inline-block border border-white/10 mb-2">
                  {isFinnish ? "Säästät" : "Save"} {formatEUR(MONTHLY_PRICE * 12 - YEARLY_PRICE)} / {isFinnish ? "vuosi" : "year"}
                </div>
              )}
              {billing === "3year" && (
                <div className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full inline-block border border-white/10 mb-2">
                  {isFinnish ? "Säästät" : "Save"} {formatEUR(MONTHLY_PRICE * 36 - THREE_YEAR_PRICE)} / {isFinnish ? "3 vuotta" : "3 years"}
                </div>
              )}
              <div className="text-xs text-gray-400 mt-2">
                {isFinnish ? "Hinnat verottomina. ALV 25,5 % lisätään hintaan" : "Prices exclude VAT. 25.5% VAT applies"}
              </div>
            </div>

            {/* Included Features */}
            <div className="mb-8">
              <h4 className="text-lg font-medium text-white mb-4 text-center">
                {isFinnish ? "Sisältyy kuukausimaksuun:" : "Included in monthly fee:"}
              </h4>
              <ul className="space-y-3 max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Sivuston ylläpito ja turvallinen hosting" : "Website maintenance and secure hosting"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Kuukausittaiset analytiikka- ja kehitysraportit" : "Monthly analytics and development reports"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Premium-asiakastuki ja jatkuva huolenpito" : "Premium customer support and ongoing care"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Jopa 4 sisältö- tai designpäivitystä kuukaudessa" : "Up to 4 content or design updates per month"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Hakukoneoptimointi ja suorituskyvyn seuranta" : "Search engine optimization and performance monitoring"}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300 leading-relaxed">
                    {isFinnish ? "Tietoturvapäivitykset ja valvonta" : "Security updates and monitoring"}
                  </span>
                </li>
              </ul>
              <p className="text-xs text-gray-400 text-center mt-6 max-w-2xl mx-auto leading-relaxed">
                {isFinnish ? "Kaikki on huolehdittu puolestasi – sinä keskityt kasvuun." : "Everything is taken care of for you – you focus on growth."}
              </p>
            </div>

            {/* Guarantee */}
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs text-gray-300">
                  {isFinnish ? "14 päivän rahat takaisin -takuu projektin alusta" : "14-day money-back guarantee from project start"}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full max-w-md mx-auto py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isFinnish ? "Aloita tänään. Täytä kysely tästä" : "Start your project — Open the project brief"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                {isFinnish ? "Aloitetaan prosessi yhdessä." : "Let's start the process together."}
              </p>
            </div>
          </div>
        </div>

        {/* Optional Add-Ons */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
              {isFinnish ? "Vapaaehtoiset lisäpalvelut" : "Optional Add-Ons"}
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isFinnish ? "Laajenna verkkosivuasi lisäpalveluilla tarpeesi mukaan" : "Expand your website with add-on services as needed"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Agent Add-On */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-3">
                Mitrox AI Advisor
              </h4>
              <div className="text-2xl font-light text-white mb-2">
                {formatEUR(55)}
                <span className="text-gray-400 text-base ml-1">/ {isFinnish ? "kk" : "mo"} {isFinnish ? "alkaen" : "starting from"}</span>
              </div>
              <p className="text-xs text-gray-400 mb-4">
                ({isFinnish ? "erikoishinta verkkosivupaketin yhteydessä" : "special price with website package"})
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {isFinnish ? "24/7 keskusteleva asiakasavustaja, joka vastaa asiakkaiden kysymyksiin ja kerää liidejä." : "24/7 conversational customer assistant that answers customer questions and collects leads."}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {isFinnish ? "Auttaa sinua palvelemaan ympäri vuorokauden." : "Helps you serve customers around the clock."}
              </p>
            </div>

            {/* Additional Languages */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-3">
                {isFinnish ? "Lisäkieli (Suomi ↔ Englanti)" : "Additional Language (Finnish ↔ English)"}
              </h4>
              <div className="text-2xl font-light text-white mb-4">
                {formatEUR(199)}
                <span className="text-gray-400 text-base ml-1"> {isFinnish ? "alkaen" : "starting from"}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-2">
                {isFinnish ? "Käännös ja viimeistely enintään 5 sivulle." : "Translation and finishing for up to 5 pages."}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {isFinnish ? "Lisäsivut" : "Additional pages"} {formatEUR(49)} / {isFinnish ? "sivu" : "page"}.
              </p>
              <p className="text-xs text-gray-400">
                {isFinnish ? "Sisältää ammattitason käännökset, visuaaliset säädöt ja hakukone­optimoidut metatiedot." : "Includes professional translations, visual adjustments, and SEO-optimized metadata."}
              </p>
            </div>

            {/* Extended SEO Optimization */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-3">
                {isFinnish ? "Laajennettu hakukoneoptimointi" : "Extended Search Engine Optimization"}
              </h4>
              <div className="text-2xl font-light text-white mb-4">
                {formatEUR(79)}
                <span className="text-gray-400 text-base ml-1">/ {isFinnish ? "kk" : "mo"} {isFinnish ? "alkaen" : "starting from"}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {isFinnish ? "Parannamme sivustosi löydettävyyttä ja suorituskykyä jatkuvasti." : "We continuously improve your site's discoverability and performance."}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                {isFinnish ? "Kehitämme sisältöä, rakennetta ja nopeutta tavoitteidesi mukaan, jotta sivustosi nousee hakutuloksissa ja houkuttelee oikeat kävijät." : "We develop content, structure, and speed according to your goals, so your site ranks higher in search results and attracts the right visitors."}
              </p>
            </div>

            {/* Extra Updates */}
            <div className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] transition-all duration-300">
              <h4 className="text-lg font-medium text-white mb-4">
                {isFinnish ? "Ylimääräiset päivitykset" : "Extra Updates"}
              </h4>
              <div className="text-2xl font-light text-white mb-2">
                {formatEUR(19)}
                <span className="text-gray-400 text-base ml-1">/ {isFinnish ? "päivitys" : "update"}</span>
              </div>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                {isFinnish ? "Soveltuu, kun kuukausittainen päivitysmäärä ylittyy." : "Suitable when the monthly update limit is exceeded."}
              </p>
              
              <h5 className="text-base font-medium text-white mb-2">
                {isFinnish ? "Uudet sivut" : "New Pages"}
              </h5>
              <div className="text-xl font-light text-white mb-2">
                {formatEUR(99)}
                <span className="text-gray-400 text-sm ml-1">/ {isFinnish ? "sivu" : "page"}</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {isFinnish ? "Täysin uusi sivu suunniteltuna ja julkaistuna sivustollesi." : "A completely new page designed and published on your website."}
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

