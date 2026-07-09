// src/DocsAIPage.tsx
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

const DocsAIPage: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const seoConfig = getSEOConfig(language);
  const docsPath = isFinnish ? "/fi/dokumentaatio" : "/en/docs";
  const aiAdvisorDocsPath = isFinnish ? "/fi/dokumentaatio/ai-advisor" : "/en/docs/ai-advisor";
  
  const meta = isSEO_V2
    ? buildMeta({
        title: isFinnish ? "Mitrox AI Advisor – Dokumentaatio | Mitrox" : "Mitrox AI Advisor – Documentation | Mitrox",
        description: isFinnish
          ? "Asennus- ja upotusohjeet Mitrox AI Advisorille. Opas integraatioon verkkosivuillesi."
          : "Installation and embedding guide for Mitrox AI Advisor. Learn how to integrate it into your website.",
        path: aiAdvisorDocsPath,
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
            { name: isFinnish ? "Mitrox AI Advisor" : "Mitrox AI Advisor", href: aiAdvisorDocsPath },
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
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/wordpress" : "/en/docs/ai-advisor/wordpress",
    },
    {
      id: "wix",
      name: "Wix",
      icon: Globe,
      description: isFinnish
        ? "Sisältää Custom Code -injektio-ohjeet ja preview-tilan huomautukset."
        : "Includes Custom Code injection instructions and preview-mode notes.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/wix" : "/en/docs/ai-advisor/wix",
    },
    {
      id: "webflow",
      name: "Webflow",
      icon: Box,
      description: isFinnish
        ? "Selittää, miten koodi lisätään Footer Code -kenttään ja julkaistaan oikein."
        : "Explains how to add code via Footer Code and publish correctly.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/webflow" : "/en/docs/ai-advisor/webflow",
    },
    {
      id: "shopify",
      name: "Shopify",
      icon: ShoppingCart,
      description: isFinnish
        ? "Kattaa theme.liquid -tiedoston muokkaamisen ja päällekkäisten elementtien korjauksen."
        : "Covers editing theme.liquid and fixing overlapping elements.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/shopify" : "/en/docs/ai-advisor/shopify",
    },
    {
      id: "squarespace",
      name: "Squarespace",
      icon: Layout,
      description: isFinnish
        ? "Näyttää Code Injection -menetelmän ja suunnitelman vaatimukset."
        : "Shows the Code Injection method and plan requirements.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/squarespace" : "/en/docs/ai-advisor/squarespace",
    },
    {
      id: "netlify",
      name: "Netlify",
      icon: Globe,
      description: isFinnish
        ? "Selittää suoran HTML-injektion tai framework-kohtaisten menetelmien käytön."
        : "Explains direct HTML injection or using framework-specific methods.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/netlify" : "/en/docs/ai-advisor/netlify",
    },
    {
      id: "react",
      name: "React / Next.js",
      icon: Code,
      description: isFinnish
        ? "Tarjoaa esimerkit public/index.html, layout.js ja _document.js -tiedostoille."
        : "Provides public/index.html, layout.js, and _document.js examples.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/react" : "/en/docs/ai-advisor/react",
    },
    {
      id: "html",
      name: "HTML (Custom Websites)",
      icon: FileCode,
      description: isFinnish
        ? "Sopii räätälöityihin verkkosivuihin, landing-sivuihin ja staattiseen hostaukseen."
        : "Good for custom-built sites, landing pages, and static hosting.",
      href: isFinnish ? "/fi/dokumentaatio/ai-advisor/html" : "/en/docs/ai-advisor/html",
    },
  ];

  return (
    <div id="top" className="min-h-screen bg-black relative flex flex-col">
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title={meta?.title || (isFinnish ? "Mitrox AI Advisor – Dokumentaatio | Mitrox" : "Mitrox AI Advisor – Documentation | Mitrox")}
        description={meta?.description || (isFinnish
          ? "Asennus- ja upotusohjeet Mitrox AI Advisorille"
          : "Installation and embedding guide for Mitrox AI Advisor")}
        url={meta?.url || `https://mitrox.io${aiAdvisorDocsPath}`}
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
                  { name: isFinnish ? "Mitrox AI Advisor" : "Mitrox AI Advisor", href: aiAdvisorDocsPath },
                ]}
                visible={true}
                className="mb-8"
              />
            )}

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4">
                {isFinnish ? "Mitrox AI Advisor – Dokumentaatio" : "Mitrox AI Advisor – Documentation"}
              </h1>
              <p className="text-body-subtle text-lg max-w-2xl mx-auto mb-6">
                {isFinnish
                  ? "Pääopas Mitrox AI Advisorin asentamiseen. Löydä oikeat asennusohjeet alustallesi."
                  : "Your main guide page for installing the Mitrox AI Advisor. Find the correct installation guide for your platform."}
              </p>
            </div>

            {/* What This Documentation Helps You Do */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {isFinnish ? "Mikä tämän sivun tarkoitus on?" : "What This Documentation Helps You Do"}
              </h2>
              <p className="text-body-subtle mb-4">
                {isFinnish
                  ? "Tämä sivu auttaa sinua:"
                  : "This page helps you:"}
              </p>
              <ul className="space-y-2 text-body-subtle">
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Ymmärtämään miten Mitrox AI Advisor lisätään sivustollesi"
                      : "Understand what the Mitrox AI Advisor is and how it's added to your website."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Löytämään oikean ohjeen omalle alustallesi"
                      : "Quickly find the correct installation guide for your platform."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Saamaan apua nopeasti, jos jokin ei toimi"
                      : "Know where to get help if something doesn't work."}
                  </span>
                </li>
              </ul>
              <p className="text-body-subtle mt-4 text-sm">
                {isFinnish
                  ? "Jokaiselle alustalle on oma selkeä ohje."
                  : "Every platform has its own step-by-step guide written clearly for non-technical users."}
              </p>
            </div>

            {/* Before You Start */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {isFinnish ? "Ennen kuin aloitat" : "Before You Start"}
              </h2>
              <p className="text-body-subtle mb-4">
                {isFinnish
                  ? "Tarvitset vain:"
                  : "You only need:"}
              </p>
              <ul className="space-y-2 text-body-subtle mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Mitroxin antaman skriptin"
                      : "Your Mitrox AI Advisor script (provided by the Mitrox team)"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Pääsyn sivustosi asetus- tai muokkauspaneeliin"
                      : "Access to your website builder or hosting panel"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Mahdollisuuden liittää pieni koodinpätkä sivustollesi"
                      : "The ability to paste the script into your site settings"}
                  </span>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-body-subtle mb-2">
                  {isFinnish
                    ? "Skripti näyttää tältä:"
                    : "The script always looks like this:"}
                </p>
                <pre className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 overflow-x-auto text-sm text-white/90 font-mono">
                  <code>{`<script type="text/javascript">
  window.voiceflow = window.voiceflow || {};
  window.voiceflow.chat = { ... };
</script>
<script src="https://cdn.voiceflow.com/widget/bundle.mjs"></script>`}</code>
                </pre>
                <p className="text-body-subtle mt-2 text-sm">
                  {isFinnish
                    ? "Skriptiä ei tarvitse muokata."
                    : "You never need to edit the script."}
                </p>
              </div>
            </div>

            {/* Where the Script Must Go */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {isFinnish ? "Mihin skripti tulee laittaa?" : "Where the Script Must Go"}
              </h2>
              <p className="text-body-subtle mb-4">
                {isFinnish
                  ? "Aina joko:"
                  : "On every platform, the script must be placed:"}
              </p>
              <ul className="space-y-2 text-body-subtle mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Sivun alaosaan ennen `</body>`-tagia"
                      : "At the bottom of the page, right before `</body>`"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "TAI sivuston Footer-koodikenttään"
                      : "OR in the site footer section of your platform settings"}
                  </span>
                </li>
              </ul>
              <p className="text-body-subtle text-sm">
                {isFinnish
                  ? "Ei koskaan `<head>`-osioon. Näin chat-widget toimii oikein."
                  : "Never place it inside the `<head>` area. This ensures the widget loads correctly."}
              </p>
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

            {/* What to Expect After Installation */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {isFinnish ? "Mitä tapahtuu asennuksen jälkeen?" : "What to Expect After Installation"}
              </h2>
              <p className="text-body-subtle mb-4">
                {isFinnish
                  ? "Kun skripti on oikeassa kohdassa ja sivusto julkaistu:"
                  : "Once the script is in the right place and your site is published:"}
              </p>
              <ul className="space-y-2 text-body-subtle">
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Chat-kupla ilmestyy automaattisesti sivuston kulmaan"
                      : "The chat bubble appears automatically in the corner of your website."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Se latautuu 1–2 sekunnissa"
                      : "It loads within 1–2 seconds on most devices."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Chat avautuu klikkaamalla ja voit heti lähettää testiviestin"
                      : "You can click it and send a test message immediately."}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-white/50 mt-1">•</span>
                  <span>
                    {isFinnish
                      ? "Avustaja vastaa reaaliaikaisesti"
                      : "The assistant responds in real-time."}
                  </span>
                </li>
              </ul>
              <p className="text-body-subtle mt-4 text-sm">
                {isFinnish
                  ? "Jos jokin ei näy oikein, kyseessä on yleensä pieni asetusasia."
                  : "If something doesn't look right, there is always a simple fix."}
              </p>
            </div>

            {/* Support Section */}
            <div className="mt-12 text-center">
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {isFinnish ? "Tarvitsetko apua?" : "Need Help?"}
                </h3>
                <p className="text-body-subtle mb-4">
                  {isFinnish
                    ? "Jos tarvitset tukea tai haluat, että asennamme Advisorin puolestasi:"
                    : "If anything feels unclear, or the widget doesn't appear:"}
                </p>
                <ul className="space-y-2 text-body-subtle text-left max-w-md mx-auto mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-white/50 mt-1">•</span>
                    <span>
                      {isFinnish
                        ? "Ole yhteydessä Mitroxin tukeen"
                        : "Contact Mitrox support anytime"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/50 mt-1">•</span>
                    <span>
                      {isFinnish
                        ? "Voimme tehdä asennuksen puolestasi muutamassa minuutissa"
                        : "Send a screenshot of what you see"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white/50 mt-1">•</span>
                    <span>
                      {isFinnish
                        ? "Autamme mielellämme"
                        : "We can install the AI Advisor for you if you prefer"}
                    </span>
                  </li>
                </ul>
                <p className="text-body-subtle text-sm">
                  {isFinnish
                    ? "Autamme mielellämme."
                    : "We are always happy to help."}
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

export default DocsAIPage;

