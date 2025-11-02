// src/AIAgentPage.tsx
import React, { useState, useEffect } from "react";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import SEOHead from "./components/SEOHead";
import TrustSection from "./components/TrustSection";
import ProcessSection from "./components/ProcessSection";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LiquidEther from "./components/LiquidEther";
import { ChevronDown } from "lucide-react";

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
      {/* LiquidEther Background */}
      <div className="absolute inset-0 w-full h-full bg-black">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

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
              className={`text-4xl sm:text-5xl lg:text-7xl leading-tight mb-4 sm:mb-6 flex flex-col items-center justify-center text-white px-2 transition-all duration-700 ease-out ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ fontFamily: "Epilogue, sans-serif", fontWeight: 600 }}
            >
              Tekoälybotti joka<br />
              kasvattaa liiketoimintaasi
            </h1>

            {/* Subtitle */}
            <p
              className={`text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 max-w-[42rem] mx-auto leading-relaxed font-light transition-all duration-700 ease-out px-2 ${
                showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: showContent ? "150ms" : "0ms",
                fontFamily:
                  'GeistSans, "GeistSans Fallback", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                fontWeight: 400,
              }}
            >
              Suunnittelemme juuri teille sopivan ratkaisun, joka palvelee
              asiakkaitasi 24/7 ja kasvattaa liiketoimintaasi
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
                Kokeile bottia
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
  return (
    <div id="top" className="min-h-screen bg-black relative">
      {/* Space background for everything except hero */}
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title="AI Agent / Chatbot - Mitrox.io"
        description="Tekoälypohjainen chatbotti joka palvelee asiakkaitasi 24/7. Automaattisesti vastaa kysymyksiin, kerää liidejä ja kasvattaa myyntiäsi."
        url="https://mitrox.io/ai-agent"
      />
      <Header />
      <AIAgentHero />
      <TrustSection />
      <ProcessSection />
      <section className="relative bg-black">
        <Features />
        <Pricing />
        <FAQ />
      </section>
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

