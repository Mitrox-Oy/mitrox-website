import React, { useState } from "react";
import { Check, ArrowRight } from "lucide-react";

const formatEUR = (value: number) =>
  new Intl.NumberFormat("fi-FI", {
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

const plans: Plan[] = [
  {
    name: "Starter Advisor",
    price: 79,
    description: "1000 viestiä/kk",
    popular: false,
    features: [
      "Sisältää 50 räätälöityä vastausta yrityksellesi",
      "Valittava sävy/puhetyyli",
      "Mahdollisuus liittää 30 verkkosivua",
      "Starter-asiakastuki: Vastauspyyntöihin 72h sisällä, vain sähköpostituki",
      "Mitrox-ulkoasu",
      "Suomenkielinen",
      "Edistynyt analytiikka",
    ],
    limitations: [],
  },
  {
    name: "Pro Advisor",
    price: 129,
    description: "5000 viestiä/kk",
    popular: true,
    features: [
      "Kaikki Starter-paketin ominaisuudet",
      "Keskusteleva Chatbot-agentti",
      "Mahdollisuus liittää 80 verkkosivua",
      "Ajanvarauskalenteri",
      "WhatsApp-integraatiot",
      "Pro-asiakastuki: Vastauspyyntöihin 24h sisällä, vain sähköpostituki",
      "Kaksikielinen (FI/EN)",
      "Chatbotin ulkoasu muokattavissa",
    ],
    limitations: [],
  },
];

const Pricing: React.FC = () => {
  const [billing, setBilling] = useState<BillingCycle>("yearly");

  const getDisplayPrice = (plan: Plan) => {
    if (plan.price === "Tarjous") return { main: "Tarjous", sub: "", period: "" };
    const monthly = plan.price as number;
    if (monthly === 0) return { main: "0€", sub: "", period: "kk" };

    if (billing === "yearly") {
      const effectiveMonthly = Math.round(monthly * (1 - YEARLY_DISCOUNT));
      const yearlySavings = Math.round(monthly * 12 * YEARLY_DISCOUNT);
      return {
        main: `${formatEUR(effectiveMonthly)}`,
        sub: `Säästät ${formatEUR(yearlySavings)} / vuosi`,
        period: "kk",
      };
    }
    return { main: `${formatEUR(monthly)}`, sub: "", period: "kk" };
  };

  const getCTA = () => {
    return "Aloita maksutta";
  };

  const getFootnote = (plan: Plan) => {
    if (plan.name === "Starter Bot" || plan.name === "Pro Bot") return "Ilmainen 14 päivän kokeilujakso";
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
            Hinnoittelu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Valitse yrityksellesi sopiva paketti
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
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-medium">
                      Suositeltu
                    </div>
                  </div>
                )}

                {/* Card */}
                <div className="relative w-full flex flex-col rounded-2xl p-8 bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300">
                  
                  {/* Limited Launch Price Badge */}
                  <div className="absolute -top-3 right-4 z-10">
                    <div className="bg-black/90 text-green-400 px-1.5 py-0.5 rounded-full text-xs font-semibold border border-green-400/50 whitespace-nowrap">
                      Rajoitettu lanseeraushinta
                    </div>
                  </div>
                  
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
                      Hinnat verottomina. ALV 25,5 % lisätään hintaan
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