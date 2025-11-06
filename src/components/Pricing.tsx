import React, { useMemo, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const formatEUR = (value: number, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const YEARLY_DISCOUNT = 0.2 as const;

type BillingCycle = "monthly" | "yearly";
type Plan = {
  name: string;
  price: number | "Tarjous";
  description: string;
  popular: boolean;
  features: string[];
  limitations: string[];
  hidePrice?: boolean;
  promo?: string;
};

const createPlans = (isFinnish: boolean): Plan[] => [
  {
    name: "Starter Advisor",
    price: 79,
    description: isFinnish ? "1000 viestiä / kk" : "1,000 conversations / month",
    popular: false,
    features: [
      isFinnish
        ? "50 räätälöityä vastausta yrityksellesi — personoitu tyyli ja sävy"
        : "50 tailored responses for your business — consistent tone and style",
      isFinnish
        ? "Valittava äänensävy ja puhetapa – mukautuu brändisi kieleen"
        : "Selectable tone of voice that adapts to your brand",
      isFinnish
        ? "Mahdollisuus liittää jopa 30 tietolähdettä"
        : "Connect up to 30 knowledge sources",
      isFinnish
        ? "Starter-tuki – vastaus 72 tunnin sisällä (sähköposti)"
        : "Starter support – replies within 72 hours (email)",
      isFinnish
        ? "Mitroxin vakio-ulkoasu – valmis käyttöön heti"
        : "Mitrox standard interface – ready to launch instantly",
      isFinnish
        ? "Suomenkielinen käyttöliittymä ja ohjeistus"
        : "Finnish user interface and onboarding",
      isFinnish
        ? "Perusanalytiikka kävijöistä ja keskusteluista"
        : "Core analytics for visitors and conversations",
    ],
    limitations: [],
  },
  {
    name: "Pro Advisor",
    price: 129,
    description: isFinnish ? "5000 viestiä / kk" : "5,000 conversations / month",
    popular: true,
    features: [
      isFinnish ? "Kaikki Starter-paketin ominaisuudet" : "Everything in the Starter package",
      isFinnish
        ? "Keskusteleva chatbot-agentti – oppii vastaamaan kuin oikea tiiminjäsen"
        : "Conversational AI agent that learns to respond like your team",
      isFinnish
        ? "Liitettävissä jopa 80 tietolähdettä"
        : "Connect up to 80 knowledge sources",
      isFinnish
        ? "Sisäänrakennettu ajanvarauskalenteri"
        : "Built-in booking calendar",
      isFinnish
        ? "WhatsApp-integraatio asiakaspalveluun ja myyntiin"
        : "WhatsApp integration for support and sales",
      isFinnish
        ? "Pro-tuki – vastaukset 24 tunnin sisällä"
        : "Priority support – replies within 24 hours",
      isFinnish
        ? "Kaksikielinen (FI/EN) agentti"
        : "Bilingual agent (FI/EN)",
      isFinnish
        ? "Muokattava ulkoasu ja brändivärit"
        : "Customisable interface and brand colours",
      isFinnish
        ? "Laajennettu raportointi ja käyttäjäkohtaiset tilastot"
        : "Extended reporting with per-user insights",
    ],
    limitations: [],
  },
];

const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const locale = isFinnish ? "fi-FI" : "en-GB";
  const plans = useMemo(() => createPlans(isFinnish), [isFinnish]);

  const getDisplayPrice = (plan: Plan) => {
    if (plan.price === "Tarjous") return { main: "Tarjous", sub: "", period: "" };
    const monthly = plan.price as number;
    if (monthly === 0) return { main: "0€", sub: "", period: isFinnish ? "kk" : "mo" };

    if (billing === "yearly") {
      const effectiveMonthly = Math.round(monthly * (1 - YEARLY_DISCOUNT));
      const yearlySavings = Math.round(monthly * 12 * YEARLY_DISCOUNT);
      return {
        main: `${formatEUR(effectiveMonthly, locale)}`,
        sub: isFinnish
          ? `Säästät ${formatEUR(yearlySavings, locale)} / vuosi`
          : `Save ${formatEUR(yearlySavings, locale)} per year`,
        period: isFinnish ? "kk" : "mo",
      };
    }
    return { main: `${formatEUR(monthly, locale)}`, sub: "", period: isFinnish ? "kk" : "mo" };
  };

  const getCTA = () => {
    return isFinnish ? "Aloita maksutta" : "Get started for free";
  };

  const getFootnote = (plan: Plan) => {
    if (plan.name === "Starter Bot" || plan.name === "Pro Bot") {
      return isFinnish ? "Ilmainen 14 päivän kokeilujakso" : "Free 14-day trial";
    }
    return "";
  };

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
            {isFinnish ? "Hinnoittelu" : "Pricing"}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {isFinnish ? "Valitse yrityksellesi sopiva paketti" : "Choose the plan that fits your company"}
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
                {isFinnish ? "Kuukausittain" : "Monthly"}
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  billing === "yearly" ? "text-white" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isFinnish ? "Vuosittain" : "Yearly"}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-green-400 font-semibold bg-black/90 rounded-full px-1.5 py-0.5 border border-green-400/50 whitespace-nowrap">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const price = getDisplayPrice(plan);
            const isPopular = plan.popular;

            return (
              <div
                key={plan.name}
                className="relative group flex"
              >
                {/* Popular badge */}
                {/* Card */}
                <div className="relative w-full flex flex-col rounded-2xl p-8 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                  
                  {/* Limited Launch Price Badge */}
                  <div className="absolute top-3 right-4 z-10 md:-top-3">
                    <div className="bg-black/90 text-green-400 px-1.5 py-0.5 rounded-full text-xs font-semibold border border-green-400/50 whitespace-nowrap">
                      {isFinnish ? "Rajoitettu lanseeraushinta" : "Limited launch price"}
                    </div>
                  </div>

                  {isPopular && (
                    <div className="absolute top-11 right-4 z-10 md:left-1/2 md:right-auto md:-translate-x-1/2 md:top-3">
                      <div className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium">
                        {isFinnish ? "Suositeltu" : "Recommended"}
                      </div>
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className="mb-8">
                    <h3 className="text-xl font-medium text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 flex flex-col justify-center">
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-light text-white">
                        {price.main}
                      </span>
                      {price.period && (
                        <span className="ml-2 text-gray-400 text-lg">
                          /{price.period}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {isFinnish ? "Hinnat verottomina. ALV 25,5 % lisätään hintaan" : "Prices exclude VAT. 25.5% VAT applies."}
                    </div>
                    {billing === "yearly" && price.sub && (
                      <div className="text-xs text-gray-300 bg-white/5 px-3 py-1 rounded-full inline-block border border-white/10 mt-2">
                        {price.sub}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-8 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            <Check className="h-4 w-4 text-green-400" />
                          </div>
                          <span className="text-sm text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <button
                      onClick={handleScrollToContact}
                      className="w-full py-3 px-6 rounded-xl font-medium text-sm bg-white text-black hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {getCTA()}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    
                    {getFootnote(plan) && (
                      <p className="text-center text-xs text-gray-500 mt-3">
                        {getFootnote(plan)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;