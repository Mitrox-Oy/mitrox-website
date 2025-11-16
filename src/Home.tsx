// src/Home.tsx
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import CompanyInfo from "./components/CompanyInfo";
import Features from "./components/Features";
import CompanyStory from "./components/CompanyStory";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useLanguage } from "./context/LanguageContext";
import { buildMeta, organizationSchema, websiteSchema, localBusinessSchema, breadcrumbSchema, getSEOConfig } from "../lib/seo";

export default function Home() {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  // SEO_V2 enhancements (only when flag is enabled)
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const seoConfig = getSEOConfig(language);
  const homePath = isFinnish ? "/fi" : "/en";
  const meta = isSEO_V2
    ? buildMeta({
        title: seoConfig.pages.home.title,
        description: seoConfig.pages.home.description,
        path: homePath,
        keywords: [...seoConfig.pages.home.keywords],
        language: language,
      })
    : undefined;
  const schemas = isSEO_V2
    ? [
        organizationSchema(language),
        websiteSchema(language),
        localBusinessSchema(language),
        breadcrumbSchema([...seoConfig.pages.home.breadcrumbs], language),
      ]
    : [];

  return (
    <div id="top" className="min-h-screen bg-black relative flex flex-col">
      {/* Space background for everything except hero */}
      <SpaceBackground className="top-[100vh]" />
      <SEOHead 
        title={meta?.title || (isFinnish ? "Mitrox – Teknologia, joka tuntuu luonnolliselta" : "Mitrox – Technology That Feels Effortless")}
        description={meta?.description || (isFinnish
          ? "Mitrox – Suomalainen teknologiayritys, joka tarjoaa verkkosivut yritykselle, nettisivut yritykselle, tekoälyneuvojan ja tekoälybotin. Premium-design ja AI-ratkaisut 14 päivässä."
          : "Mitrox – Finnish technology company offering business websites, AI advisor, and chatbot solutions. Premium design and AI solutions in 14 days.")}
        keywords={meta?.keywords}
        language={language}
        url={meta?.url || `https://mitrox.io${homePath}`}
        locale={meta?.locale}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang={isFinnish ? "fi" : "en"} />}
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
