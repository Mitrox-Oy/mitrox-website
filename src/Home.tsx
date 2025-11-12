// src/Home.tsx
import React from "react";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import SEOHead from "./components/SEOHead";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import CompanyInfo from "./components/CompanyInfo";
import Features from "./components/Features";
import CompanyStory from "./components/CompanyStory";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const isFinnish = language === "fi";

  return (
    <div id="top" className="min-h-screen bg-black relative">
      {/* Space background for everything except hero */}
      <SpaceBackground className="top-[100vh]" />
      <SEOHead 
        title={isFinnish ? "Mitrox – Teknologia, joka tuntuu luonnolliselta" : "Mitrox – Technology That Feels Effortless"}
        language={language}
        url={`https://mitrox.io/${language === 'fi' ? 'fi' : 'en'}`}
      />
      <Header />
      <Hero />
      <ProductsSection />
      <CompanyInfo />
      <section className="relative bg-black">
        <Features />
      </section>
      <CompanyStory />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
