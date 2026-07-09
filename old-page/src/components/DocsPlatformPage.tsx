// src/components/DocsPlatformPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SpaceBackground from "./SpaceBackground";
import Header from "./Header";
import BottomNavbar from "./BottomNavbar";
import SEOHead from "./SEOHead";
import SEOEnhanced from "./SEOEnhanced";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Breadcrumbs from "./Breadcrumbs";
import { buildMeta, organizationSchema, breadcrumbSchema, getSEOConfig } from "../../lib/seo";
import ErrorBoundary from "./ErrorBoundary";
import { Copy, Check, ArrowLeft, Settings, AlertCircle, PlayCircle, HelpCircle } from "lucide-react";

interface DocsPlatformPageProps {
  platformName: string;
  platformNameFi: string;
  platformNameEn: string;
  content: {
    fi: {
      overview?: string;
      whatYouNeed: string[];
      installationSteps: Array<{
        title: string;
        steps: string[];
        code?: string;
        note?: string;
      }>;
      howToTest?: Array<{
        title?: string;
        steps: string[];
      }>;
      troubleshooting?: Array<{
        title: string;
        items: string[];
        code?: string;
      }>;
      needHelp?: string;
    };
    en: {
      overview?: string;
      whatYouNeed: string[];
      installationSteps: Array<{
        title: string;
        steps: string[];
        code?: string;
        note?: string;
      }>;
      howToTest?: Array<{
        title?: string;
        steps: string[];
      }>;
      troubleshooting?: Array<{
        title: string;
        items: string[];
        code?: string;
      }>;
      needHelp?: string;
    };
  };
}

const DocsPlatformPage: React.FC<DocsPlatformPageProps> = ({
  platformName,
  platformNameFi,
  platformNameEn,
  content,
}) => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const isSEO_V2 = import.meta.env.VITE_SEO_V2 === "true";
  const seoConfig = getSEOConfig(language);
  const docsPath = isFinnish ? "/fi/dokumentaatio" : "/en/docs";
  const aiAdvisorDocsPath = isFinnish ? "/fi/dokumentaatio/ai-advisor" : "/en/docs/ai-advisor";
  const platformPath = `${aiAdvisorDocsPath}/${platformName}`;
  const platformDisplayName = isFinnish ? platformNameFi : platformNameEn;
  
  const currentContent = isFinnish ? content.fi : content.en;

  const meta = isSEO_V2
    ? buildMeta({
        title: isFinnish 
          ? `${platformNameFi} – Dokumentaatio | Mitrox AI Advisor`
          : `${platformNameEn} – Documentation | Mitrox AI Advisor`,
        description: isFinnish
          ? `Asennusohjeet Mitrox AI Advisorille ${platformNameFi} -alustalle.`
          : `Installation guide for Mitrox AI Advisor on ${platformNameEn}.`,
        path: platformPath,
        keywords: isFinnish
          ? `${platformNameFi.toLowerCase()}, dokumentaatio, asennus, AI advisor`
          : `${platformNameEn.toLowerCase()}, documentation, installation, AI advisor`,
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
            { name: platformDisplayName, href: platformPath },
          ],
          language
        ),
      ]
    : [];

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock: React.FC<{ code: string; id: string }> = ({
    code,
    id,
  }) => (
    <div className="relative group">
      <button
        onClick={() => copyToClipboard(code, id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-black/50 hover:bg-black/70 text-white/70 hover:text-white transition-colors"
        aria-label={isFinnish ? "Kopioi koodi" : "Copy code"}
      >
        {copiedCode === id ? (
          <Check className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
      </button>
      <pre className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 overflow-x-auto">
        <code className="text-sm text-white/90 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );

  return (
    <div id="top" className="min-h-screen bg-black relative flex flex-col">
      <SpaceBackground className="top-[100vh]" />
      <SEOHead
        title={meta?.title || `${platformDisplayName} – ${isFinnish ? "Dokumentaatio" : "Documentation"} | Mitrox`}
        description={meta?.description || (isFinnish
          ? `Asennusohjeet Mitrox AI Advisorille ${platformNameFi} -alustalle`
          : `Installation guide for Mitrox AI Advisor on ${platformNameEn}`)}
        url={meta?.url || `https://mitrox.io${platformPath}`}
        keywords={meta?.keywords}
        language={language}
        locale={meta?.locale}
      />
      {isSEO_V2 && <SEOEnhanced meta={meta} schemas={schemas} lang={isFinnish ? "fi" : "en"} />}
      <Header />
      <ErrorBoundary>
        <div className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            {isSEO_V2 && (
              <Breadcrumbs
                segments={[
                  { name: isFinnish ? "Etusivu" : "Home", href: `/${language}` },
                  { name: isFinnish ? "Dokumentaatio" : "Documentation", href: docsPath },
                  { name: isFinnish ? "Mitrox AI Advisor" : "Mitrox AI Advisor", href: aiAdvisorDocsPath },
                  { name: platformDisplayName, href: platformPath },
                ]}
                visible={true}
                className="mb-8"
              />
            )}

            {/* Back Button */}
            <Link
              to={aiAdvisorDocsPath}
              className="inline-flex items-center gap-2 text-body-muted hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isFinnish ? "Takaisin AI Advisor -dokumentaatioon" : "Back to AI Advisor Documentation"}</span>
            </Link>

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white mb-4">
                {isFinnish ? "Mitrox AI Advisor –" : "Mitrox AI Advisor –"} {platformDisplayName}
              </h1>
              <p className="text-body-subtle text-lg">
                {isFinnish ? "Asennusopas" : "Installation Guide"}
              </p>
            </div>

            {/* Overview */}
            {currentContent.overview && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  {isFinnish ? "Yleiskatsaus" : "Overview"}
                </h2>
                <p className="text-body-subtle whitespace-pre-line">
                  {currentContent.overview}
                </p>
              </div>
            )}

            {/* What You Need */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                <Settings className="w-6 h-6" />
                {isFinnish ? "Mitä tarvitset" : "What You Need"}
              </h2>
              <ul className="space-y-2 text-body-subtle">
                {currentContent.whatYouNeed.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-white/50 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Installation Steps */}
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                {isFinnish ? "Asennusohjeet" : "Installation Steps"}
              </h2>
              <div className="space-y-8">
                {currentContent.installationSteps.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {section.title}
                    </h3>
                    {section.steps.map((step, stepIndex) => (
                      <p key={stepIndex} className="text-body-subtle mb-3">
                        {stepIndex + 1}. {step}
                      </p>
                    ))}
                    {section.code && (
                      <div className="mt-4">
                        <CodeBlock code={section.code} id={`code-${sectionIndex}`} />
                      </div>
                    )}
                    {section.note && (
                      <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                        <p className="text-body-subtle text-sm">{section.note}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* How to Test */}
            {currentContent.howToTest && currentContent.howToTest.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <PlayCircle className="w-6 h-6" />
                  {isFinnish ? "Testaus" : "How to Test"}
                </h2>
                <div className="space-y-6">
                  {currentContent.howToTest.map((testSection, index) => (
                    <div key={index}>
                      {testSection.title && (
                        <h3 className="text-xl font-semibold text-white mb-4">
                          {testSection.title}
                        </h3>
                      )}
                      <ol className="space-y-2 text-body-subtle">
                        {testSection.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start gap-2">
                            <span className="text-white/50 mt-1">{stepIndex + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Troubleshooting */}
            {currentContent.troubleshooting && currentContent.troubleshooting.length > 0 && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6" />
                  {isFinnish ? "Vianmääritys" : "Troubleshooting"}
                </h2>
                <div className="space-y-6">
                  {currentContent.troubleshooting.map((item, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {item.title}
                      </h3>
                      {item.items && item.items.length > 0 && (
                        <ul className="space-y-2 text-body-subtle mb-4">
                          {item.items.map((listItem, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className="text-white/50 mt-1">•</span>
                              <span>{listItem}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.code && (
                        <CodeBlock code={item.code} id={`troubleshoot-${index}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Need Help */}
            {currentContent.needHelp && (
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                  <HelpCircle className="w-6 h-6" />
                  {isFinnish ? "Tarvitsetko apua?" : "Need Help?"}
                </h2>
                <p className="text-body-subtle whitespace-pre-line">
                  {currentContent.needHelp}
                </p>
              </div>
            )}
          </div>
        </div>
      </ErrorBoundary>
      <Footer />
      <BottomNavbar />
      <ScrollToTop />
    </div>
  );
};

export default DocsPlatformPage;

