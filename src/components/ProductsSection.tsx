import React from "react";
import { Link } from "react-router-dom";
import { Globe, Bot, Sparkles, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Product = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  link: string | null;
  action: (() => void) | null;
  comingSoon: boolean;
};

const ProductsSection: React.FC = () => {
  const products: Product[] = [
    {
      id: "websites",
      icon: Globe,
      title: "Ensiluokkaiset sivustot",
      subtitle: "Suunniteltu yrityksesi menestykseen",
      description:
        "Modernit ja käyttäjäystävälliset verkkosivut, jotka kertovat yrityksesi tarinan ja kasvattavat liiketoimintaasi. Yksilöllinen design joka vastaa brändisi visiota.",
      buttonText: "Tutustu portfolioon",
      link: "/websites",
      action: null,
      comingSoon: false,
    },
    {
      id: "advisor",
      icon: Bot,
      title: "Mitrox AI Advisor",
      subtitle: "Älykäs kasvukumppanisi",
      description:
        "Premium-tason tekoälyneuvoja, joka ohjaa, myy ja tukee asiakkaitasi 24/7. Rakenna luottamusta, karsi manuaalista työtä ja skaalaa myyntiäsi ilman lisäresursseja.",
      buttonText: "Tutustu ratkaisuun",
      link: "/advisor",
      action: null,
      comingSoon: false,
    },
    {
      id: "coming-soon",
      icon: Sparkles,
      title: "Seuraava innovaatio",
      description:
        "Työskentelemme parhaillaan uuden innovatiivisen ratkaisun parissa. Pysy kuulolla ja saat tiedon ensimmäisten joukossa!",
      buttonText: "Tulossa pian",
      link: null,
      action: null,
      comingSoon: true,
    },
  ];

  return (
    <section
      id="products"
      className="relative bg-black py-24 sm:py-32"
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 flex flex-col gap-6">
          <span className="text-[0.65rem] uppercase tracking-[0.5em] text-white/35">
            [ Meidän tuotteemme ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[2.9rem] font-medium text-white">
            Älykkäästi rakennettu menestys
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-white/45">
            Uskomme, että menestys syntyy älykkäästä suunnittelusta – siksi jokainen sivusto ja ratkaisu rakennetaan strategisesti yrityksesi tavoitteiden ympärille.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40 px-9 py-12 transition duration-500 hover:border-white/[0.18] ${
                product.comingSoon ? "opacity-70" : ""
              }`}
            >
              <div className="absolute inset-0 rounded-2xl bg-white/[0.02] opacity-0 transition duration-500 group-hover:opacity-100" />
              {product.comingSoon && (
                <span className="absolute right-6 top-6 z-10 rounded-full border border-white/10 px-3 py-1 text-[0.6rem] uppercase tracking-[0.35em] text-white/55">
                    Tulossa pian
                </span>
              )}
              <div className="relative z-10 flex h-full flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h3 className="text-[1.6rem] font-medium text-white">{product.title}</h3>
                  {product.subtitle && (
                    <span className="text-[0.7rem] uppercase tracking-[0.4em] text-white/35">
                      {product.subtitle}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-white/45">
                {product.description}
              </p>

                <div className="mt-auto pt-6">
                {product.comingSoon ? (
                  <button
                    disabled
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/35"
                  >
                    {product.buttonText}
                  </button>
                ) : product.link ? (
                  <Link
                    to={product.link}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/85 transition hover:border-white/30 hover:text-white"
                  >
                    {product.buttonText}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <button
                    onClick={product.action || undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/85 transition hover:border-white/30 hover:text-white"
                  >
                    {product.buttonText}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                )}
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-16 -right-6 opacity-0 transition duration-500 group-hover:opacity-60">
                <product.icon className="h-48 w-48 text-white/[0.05]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

