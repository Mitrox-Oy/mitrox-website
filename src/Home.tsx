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

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-black relative">
      {/* Space background for everything except hero */}
      <SpaceBackground className="top-[100vh]" />
      <SEOHead />
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
