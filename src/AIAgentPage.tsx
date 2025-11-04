// src/AIAgentPage.tsx
import React, { useState, useEffect } from "react";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import TrustSection from "./components/TrustSection";
import ProcessSection from "./components/ProcessSection";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ColorBends from "./components/ColorBends";
import { ChevronDown } from "lucide-react";
import { buildMeta, organizationSchema, breadcrumbSchema, serviceSchema } from "../lib/seo";
import { SEO_CONFIG } from "../config/seo.fi";

const AIAgentHero: React.FC = () => {
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setShowContent(true);
      return;
    }

    setTimeout(() => setShowContent(true), 300);
  }, []);

  const handleScrollToDemo = () => {
    const demoSection = document.getElementById("bots");
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Color Bends Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <ColorBends
          colors={["#04030a", "#0c1521", "#1b2434", "#2a3144"]}
          rotation={30}
          speed={0.3}
          scale={1.22}
          frequency={1.4}
          warpStrength={1.15}
          mouseInfluence={0.78}
          parallax={0.4}
          noise={0.08}
          transparent
          className="w-full h-full"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black pointer-events-none" />

      {/* Bottom fade to match next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 sm:h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, #000000 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h1
              className={`text-4xl sm:text-5xl lg:text-7xl leading-tight mb-3 sm:mb-4 flex flex-col items-center justify-center text-white px-2 transition-all duration-700 ease-out ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 600 }}
            >
              Mitrox AI Advisor
            </h1>

            <p
              className={`text-[0.75rem] sm:text-sm uppercase tracking-[0.5em] text-white/50 mb-6 sm:mb-7 transition-all duration-700 ease-out ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: showContent ? "120ms" : "0ms" }}
            >
              Älykäs kasvukumppanisi
            </p>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-[44rem] mx-auto leading-relaxed font-light transition-all duration-700 ease-out px-2 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: showContent ? "200ms" : "0ms",
                fontFamily:
                  'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontWeight: 400,
              }}
            >
              Suunnittelemme B2B-myynnille rakennetun tekoälyneuvojan, joka palvelee 24/7, ohjaa asiakkaasi oikeaan ratkaisuun ja vapauttaa tiimisi keskittymään kannattavaan kasvuun.
            </p>

            {/* Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 transition-all duration-700 ease-out w-full sm:w-auto px-2 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: showContent ? "300ms" : "0ms" }}
            >
              <button
                onClick={handleScrollToDemo}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white font-medium hover:bg-black/60 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  fontFamily:
                    'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  fontWeight: 400,
                }}
              >
                Kokeile Advisoria
                <ChevronDown className="w-4 h-4" />
              </button>
              <a
                href="#contact"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 font-medium transition-all duration-300 flex items-center justify-center"
                style={{
                  fontFamily:
                    'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  fontWeight: 400,
                }}
              >
                Ota yhteyttä
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function AIAgentPage() {
  // SEO_V2 enhancements (only when flag is enabled)
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const meta = isSEO_V2
    ? buildMeta({
        title: SEO_CONFIG.pages.advisor.title,
        description: SEO_CONFIG.pages.advisor.description,
        path: "/advisor",
        keywords: SEO_CONFIG.pages.advisor.keywords,
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(),
        breadcrumbSchema(SEO_CONFIG.pages.advisor.breadcrumbs),
        serviceSchema({
          type: "advisor",
          name: SEO_CONFIG.pages.advisor.serviceName,
          areaServed: "FI",
        }),
      ]
    : [];

  return (
    <div id="top" className="min-h-screen bg-black relative">
      {/* Space background for everything except hero */}
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title={meta?.title || "Mitrox AI Advisor - Mitrox.io"}
        description={meta?.description || "Älykäs Mitrox AI Advisor palvelee asiakkaasi 24/7, kasvattaa myyntiä ja vapauttaa tiimisi keskittymään kasvuun. Premium-tason tekoälyneuvoja B2B-yrityksille."}
        url={meta?.url || "https://mitrox.io/advisor"}
        keywords={meta?.keywords}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang="fi" />}
      <Header />
      <BottomNavbar />
      <AIAgentHero />
      <TrustSection />
      <ProcessSection type="advisor" />
      <section className="relative bg-black">
        <Features />
        <Pricing />
        <FAQ type="advisor" emitSchema={isSEO_V2} />
      </section>
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

