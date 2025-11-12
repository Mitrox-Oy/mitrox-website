// src/LiveDemoPage.tsx
import Header from "./components/Header";
import Footer from "./components/Footer";
import SEOHead from "./components/SEOHead";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

export default function LiveDemoPage() {
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title={isFinnish ? "Live Demo – Tulossa Pian | Mitrox" : "Live Demo – Coming Soon | Mitrox"}
        description={isFinnish 
          ? "Mitrox.io live-demo on tulossa pian. Pysykää kuulolla ja saatte ensimmäisenä tiedon kun demo on valmis!"
          : "Mitrox.io live demo is coming soon. Stay tuned and be the first to know when the demo is ready!"}
        url={`https://mitrox.io/${language}/live-demo`}
        noIndex={true}
        language={language}
      />
      <Header />

      <section className="pt-32 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Takaisin etusivulle
            </Link>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold mb-6 text-white">
            Live Demo Tulossa Pian!
          </h1>

          <p className="text-lg text-gray-400 mb-12 leading-relaxed">
            Työskentelemme parhaillaan interaktiivisen live-demon parissa.
          </p>

          <div className="space-y-6">
            <p className="text-gray-500 text-sm">
              Sillä välin voit ottaa yhteyttä:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-black hover:bg-gray-100 rounded-full text-sm font-medium transition-colors"
              >
                Ota yhteyttä
              </Link>
              <Link
                to="/#pricing"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-full text-sm font-medium transition-colors"
              >
                Hinnoittelu
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}