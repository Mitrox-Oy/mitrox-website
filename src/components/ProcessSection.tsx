import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  Brain,
  Cog,
  Rocket,
  ArrowRight,
} from "lucide-react";
import WebsiteInquiryForm from "./WebsiteInquiryForm";

type Step = {
  id: string;
  title: string;
  backTitle: string;
  desc: string;
  details: string;
  icon: React.ReactNode;
};

const STEPS: Step[] = [
  {
    id: "01",
    title: "Kyselylomake",
    backTitle: "Kyselylomake",
    desc: "Täytä lyhyt lomake, jossa kerrot yrityksesi tavoitteista ja tyylistä.",
    details:
      "Kyselyn avulla saamme selkeän kuvan brändistäsi ja toiveistasi. Tämän jälkeen jaamme sinulle aikataulun ja tarvittavat tiedot — me hoidamme loput.",
    icon: <MessageSquare className="w-5 h-5 text-white" />,
  },
  {
    id: "02",
    title: "Rakentaminen",
    backTitle: "Rakentaminen",
    desc: "Rakennamme sivuston yrityksesi tarpeisiin.",
    details:
      "Varmistamme sisällöt ja rakenteen ennen toteutusta. Suunnittelemme ulkoasun, teknisen rakenteen ja varmistamme, että sivusto toimii kaikilla laitteilla.",
    icon: <Brain className="w-5 h-5 text-white" />,
  },
  {
    id: "03",
    title: "Katselmus",
    backTitle: "Katselmus",
    desc: "Käymme läpi sivuston ja muokkaukset.",
    details:
      "Saat luonnoksen valmiista sivustosta viikon sisällä. Käymme sen yhdessä läpi, teemme tarvittavat muutokset ja viimeistelemme designin.",
    icon: <Cog className="w-5 h-5 text-white" />,
  },
  {
    id: "04",
    title: "Julkaisu",
    backTitle: "Julkaisu",
    desc: "Julkaisemme sivuston.",
    details:
      "Tarkistamme kaiken vielä kerran ennen julkaisua. Kun sivusto on julkaistu, varmistamme suorituskyvyn, tietoturvan ja SEO-perusasetukset.",
    icon: <Rocket className="w-5 h-5 text-white" />,
  },
];

const ProcessSection: React.FC = () => {
  const [flippedIdx, setFlippedIdx] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const toggleFlip = (i: number) => {
    setFlippedIdx((prev) => (prev === i ? null : i));
  };

  const hasFlip = flippedIdx !== null;

  // ESC sulkee flipin
  useEffect(() => {
    if (!hasFlip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFlippedIdx(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasFlip]);

  return (
    <section
      id="process"
      className="relative py-40 md:py-48 pb-56 md:pb-64 px-4 sm:px-6 lg:px-8 bg-black"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Otsikko */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4">
            Helppo ja huoleton prosessi
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Neljä selkeää vaihetta valmiiseen verkkosivustoon – me hoidamme kaiken puolestasi.
          </p>
        </div>

        {/* Kortit + overlay */}
        <div className="relative">
          {/* Klikattava overlay taustalle */}
          {hasFlip && (
            <div
              className="fixed inset-0 z-10 bg-black/20"
              onClick={() => setFlippedIdx(null)}
              aria-hidden
            />
          )}

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => {
              const isFlipped = flippedIdx === i;
              const shouldBlur = hasFlip && !isFlipped;

              return (
                <div
                  key={s.id}
                  className={[
                    "relative w-full h-[280px] mx-auto transition-all duration-300",
                    shouldBlur
                      ? "opacity-40 blur-sm pointer-events-none"
                      : "opacity-100 blur-0",
                    isFlipped ? "z-20" : "z-0",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => toggleFlip(i)}
                    className={`card group relative w-full h-full cursor-pointer outline-none text-left ${
                      isFlipped ? "is-flipped" : ""
                    }`}
                    aria-pressed={isFlipped}
                    aria-expanded={isFlipped}
                  >
                    <div className="card__clip w-full h-full">
                      <div className="card__inner w-full h-full">
                        <div className="card__face absolute inset-0 rounded-lg p-6 bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all">
                        <div className="h-full flex flex-col">
                          <div className="flex items-center gap-3 mb-4">
                            {s.icon}
                            <span className="text-xs text-gray-400 font-medium">
                              {s.id}
                            </span>
                          </div>
                          <h3 className="text-lg font-medium text-white mb-2">
                            {s.title}
                          </h3>
                          <p className="text-sm text-gray-400 leading-relaxed flex-1">
                            {s.desc}
                          </p>
                          <div className="flex justify-end mt-4">
                          </div>
                        </div>
                        </div>

                        {/* BACK */}
                        <div className="card__face card__face--back absolute inset-0 rounded-lg p-6 bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all">
                          <div className="h-full flex flex-col">
                            <div className="flex items-center gap-3 mb-4">
                              {s.icon}
                              <span className="text-xs text-gray-400 font-medium">
                                {s.id}
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">
                              {s.backTitle}
                            </h3>
                            <p className="text-sm text-gray-400 leading-relaxed">
                              {s.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-gray-100 rounded-lg font-medium transition-all"
          >
            Aloita tänään <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      <WebsiteInquiryForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default ProcessSection;