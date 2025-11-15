// src/DocsPage.tsx
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
import { 
  BookOpen, 
  Globe, 
  Code, 
  ShoppingCart, 
  Layout, 
  Box, 
  FileCode,
  ExternalLink
} from "lucide-react";

const DocsPage: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const seoConfig = getSEOConfig(language);
  const docsPath = isFinnish ? "/fi/dokumentaatio" : "/en/docs";
  
  const meta = isSEO_V2
    ? buildMeta({
        title: isFinnish ? "Dokumentaatio | Mitrox AI Advisor" : "Documentation | Mitrox AI Advisor",
        description: isFinnish
          ? "Asennus- ja upotusohjeet Mitrox AI Advisorille. Opas integraatioon verkkosivuillesi."
          : "Installation and embedding guide for Mitrox AI Advisor. Learn how to integrate it into your website.",
        path: docsPath,
        keywords: isFinnish
          ? "dokumentaatio, asennus, upotus, integraatio, AI advisor, chatbotti"
          : "documentation, installation, embedding, integration, AI advisor, chatbot",
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

  const platforms = [
    {
      id: "wordpress",
      name: "WordPress",
      icon: Layout,
      description: isFinnish 
        ? "Sisältää ohjeet Insert Headers and Footers / WPCode -laajennuksilla ja CSS-korjaukset teemakonflikteihin."
        : "Includes steps using Insert Headers and Footers / WPCode, and CSS fixes for theme conflicts.",
      href: isFinnish ? "/fi/dokumentaatio/wordpress" : "/en/docs/wordpress",
    },
    {
      id: "wix",
      name: "Wix",
      icon: Globe,
      description: isFinnish
        ? "Sisältää Custom Code -injektio-ohjeet ja preview-tilan huomautukset."
        : "Includes Custom Code injection instructions and preview-mode notes.",
      href: isFinnish ? "/fi/dokumentaatio/wix" : "/en/docs/wix",
    },
    {
      id: "webflow",
      name: "Webflow",
      icon: Box,
      description: isFinnish
        ? "Selittää, miten koodi lisätään Footer Code -kenttään ja julkaistaan oikein."
        : "Explains how to add code via Footer Code and publish correctly.",
      href: isFinnish ? "/fi/dokumentaatio/webflow" : "/en/docs/webflow",
    },
    {
      id: "shopify",
      name: "Shopify",
      icon: ShoppingCart,
      description: isFinnish
        ? "Kattaa theme.liquid -tiedoston muokkaamisen ja päällekkäisten elementtien korjauksen."
        : "Covers editing theme.liquid and fixing overlapping elements.",
      href: isFinnish ? "/fi/dokumentaatio/shopify" : "/en/docs/shopify",
    },
    {
      id: "squarespace",
      name: "Squarespace",
      icon: Layout,
      description: isFinnish
        ? "Näyttää Code Injection -menetelmän ja suunnitelman vaatimukset."
        : "Shows the Code Injection method and plan requirements.",
      href: isFinnish ? "/fi/dokumentaatio/squarespace" : "/en/docs/squarespace",
    },
    {
      id: "netlify",
      name: "Netlify",
      icon: Globe,
      description: isFinnish
        ? "Selittää suoran HTML-injektion tai framework-kohtaisten menetelmien käytön."
        : "Explains direct HTML injection or using framework-specific methods.",
      href: isFinnish ? "/fi/dokumentaatio/netlify" : "/en/docs/netlify",
    },
    {
      id: "react",
      name: "React / Next.js",
      icon: Code,
      description: isFinnish
        ? "Tarjoaa esimerkit public/index.html, layout.js ja _document.js -tiedostoille."
        : "Provides public/index.html, layout.js, and _document.js examples.",
      href: isFinnish ? "/fi/dokumentaatio/react" : "/en/docs/react",
    },
    {
      id: "html",
      name: "HTML (Custom Websites)",
      icon: FileCode,
      description: isFinnish
        ? "Sopii räätälöityihin verkkosivuihin, landing-sivuihin ja staattiseen hostaukseen."
        : "Good for custom-built sites, landing pages, and static hosting.",
      href: isFinnish ? "/fi/dokumentaatio/html" : "/en/docs/html",
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-black relative">
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title={meta?.title || (isFinnish ? "Dokumentaatio | Mitrox" : "Documentation | Mitrox")}
        description={meta?.description || (isFinnish
          ? "Asennus- ja upotusohjeet Mitrox AI Advisorille"
          : "Installation and embedding guide for Mitrox AI Advisor")}
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
                {isFinnish ? "Dokumentaatio" : "Documentation"}
              </h1>
              <p className="text-body-subtle text-lg max-w-2xl mx-auto mb-6">
                {isFinnish
                  ? "Asennus- ja upotusohjeet Mitrox AI Advisorille verkkosivuillesi"
                  : "Installation and embedding guide for Mitrox AI Advisor on your website"}
              </p>
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-3xl mx-auto">
                <p className="text-body-subtle mb-4">
                  {isFinnish
                    ? "Valitse verkkosivustosi alusta alta. Jokainen opas sisältää yksinkertaiset asennusohjeet AI Advisor -skriptin lisäämiseen ja yleisten ongelmien ratkaisemiseen. Teknistä kokemusta ei vaadita."
                    : "Choose your website platform below. Each guide contains simple steps for adding the AI Advisor script and fixing common issues. No technical experience required."}
                </p>
                <p className="text-body-subtle text-sm">
                  {isFinnish
                    ? "Kaikki alustat käyttävät samaa skriptiä. Aseta se sivun loppuun tai footer-osiin, ei koskaan header-osiin."
                    : "All platforms use the same script. Place it at the end of the body or in the site footer, never in the header."}
                </p>
              </div>
            </div>

            {/* Platform Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Link
                    key={platform.id}
                    to={platform.href}
                    className="group bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-black/60 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                          {platform.name}
                        </h3>
                        <p className="text-body-subtle text-sm leading-relaxed">
                          {platform.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-body-muted group-hover:text-white transition-colors flex-shrink-0 mt-1" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Additional Notes */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-4">
                <BookOpen className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {isFinnish ? "Lisätietoja" : "Additional Notes"}
                  </h2>
                  <ul className="space-y-3 text-body-subtle">
                    <li className="flex items-start gap-2">
                      <span className="text-white/50 mt-1">•</span>
                      <span>
                        {isFinnish
                          ? "Kaikki oppaat jakavat yhtenäisen rakenteen helpon lukemisen vuoksi."
                          : "All guides share a unified structure for easy reading."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/50 mt-1">•</span>
                      <span>
                        {isFinnish
                          ? "Mitrox-tiimi voi asentaa Advisorin asiakkaiden pyynnöstä."
                          : "The Mitrox team can install the Advisor for customers upon request."}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-white/50 mt-1">•</span>
                      <span>
                        {isFinnish
                          ? "Monimutkaisissa asennuksissa (esim. SPA-frameworkit, middleware, CSP-rajoitukset) ota yhteyttä Mitrox-tukeen."
                          : "For complex setups (e.g., SPA frameworks, middleware, CSP restrictions), contact Mitrox Support."}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {isFinnish ? "Tarvitsetko apua?" : "Need Help?"}
                </h3>
                <p className="text-body-subtle">
                  {isFinnish
                    ? "Jos tarvitset apua, asennusvahvistusta tai vianetsintäapua, ota yhteyttä Mitrox-tukeen ja hoidamme kaiken puolestasi."
                    : "If you need help, installation confirmation, or debugging assistance, contact Mitrox support and we'll take care of everything."}
                </p>
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

export default DocsPage;

