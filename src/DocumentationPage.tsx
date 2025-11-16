// src/DocumentationPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";
import SpaceBackground from "./components/SpaceBackground";
import Header from "./components/Header";
import BottomNavbar from "./components/BottomNavbar";
import SEOHead from "./components/SEOHead";
import SEOEnhanced from "./components/SEOEnhanced";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Breadcrumbs from "./components/Breadcrumbs";
import { buildMeta, organizationSchema, breadcrumbSchema, getSEOConfig } from "../lib/seo";
import ErrorBoundary from "./components/ErrorBoundary";
import { BookOpen, ArrowRight } from "lucide-react";

const DocumentationPage: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const seoConfig = getSEOConfig(language);
  const docsPath = isFinnish ? "/fi/dokumentaatio" : "/en/docs";
  const aiAdvisorDocsPath = isFinnish ? "/fi/dokumentaatio/ai-advisor" : "/en/docs/ai-advisor";
  
  const meta = isSEO_V2
    ? buildMeta({
        title: isFinnish ? "Dokumentaatio | Mitrox" : "Documentation | Mitrox",
        description: isFinnish
          ? "Mitroxin dokumentaatio. Löydä ohjeet ja oppaat Mitroxin tuotteisiin ja palveluihin."
          : "Mitrox documentation. Find guides and tutorials for Mitrox products and services.",
        path: docsPath,
        keywords: isFinnish
          ? "dokumentaatio, ohjeet, oppaat, Mitrox"
          : "documentation, guides, tutorials, Mitrox",
        language: language,
      })
    : undefined;

  const schemas = isSEO_V2
    ? [
        organizationSchema(language),
        breadcrumbSchema(
          [
            { name: isFinnish ? "Etusivu" : "Home", href: `/${language}` },
            { name: isFinnish ? "Dokumentaatio" : "Documentation", href: docsPath },
          ],
          language
        ),
      ]
    : [];

  return (
    <div id="top" className="min-h-screen bg-black relative">
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title={meta?.title || (isFinnish ? "Dokumentaatio | Mitrox" : "Documentation | Mitrox")}
        description={meta?.description || (isFinnish
          ? "Mitroxin dokumentaatio"
          : "Mitrox documentation")}
        url={meta?.url || `https://mitrox.io${docsPath}`}
        keywords={meta?.keywords}
        language={language}
        locale={meta?.locale}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang={isFinnish ? "fi" : "en"} />}
      <Header />
      <ErrorBoundary>
        <div className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            {isSEO_V2 && (
              <Breadcrumbs
                segments={[
                  { name: isFinnish ? "Etusivu" : "Home", href: `/${language}` },
                  { name: isFinnish ? "Dokumentaatio" : "Documentation", href: docsPath },
                ]}
                visible={true}
                className="mb-8"
              />
            )}

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4">
                {isFinnish ? "Mitrox – Dokumentaatio" : "Mitrox – Documentation"}
              </h1>
              <p className="text-body-subtle text-lg max-w-2xl mx-auto mb-6">
                {isFinnish
                  ? "Tervetuloa Mitroxin dokumentaatioon. Löydä ohjeet ja oppaat tuotteisiimme ja palveluihimme."
                  : "Welcome to Mitrox documentation. Find guides and tutorials for our products and services."}
              </p>
            </div>

            {/* Documentation Cards */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-black/60 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      {isFinnish ? "Mitrox AI Advisor – Dokumentaatio" : "Mitrox AI Advisor – Documentation"}
                    </h2>
                    <p className="text-body-subtle mb-6">
                      {isFinnish
                        ? "Asennus- ja upotusohjeet Mitrox AI Advisorille. Opas integraatioon verkkosivuillesi eri alustoilla."
                        : "Installation and embedding guide for Mitrox AI Advisor. Learn how to integrate it into your website on different platforms."}
                    </p>
                    <Link
                      to={aiAdvisorDocsPath}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-colors"
                    >
                      {isFinnish ? "Avaa dokumentaatio" : "Open Documentation"}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>
      <Footer />
      <BottomNavbar />
      <ScrollToTop />
    </div>
  );
};

export default DocumentationPage;

