// src/DocsPage.tsx
import React, { useState } from "react";
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
import { Copy, Check, Code, Settings, BookOpen } from "lucide-react";

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

  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const CodeBlock: React.FC<{ code: string; language?: string; id: string }> = ({
    code,
    language = "html",
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
        <code className={`text-sm text-white/90 font-mono`}>{code}</code>
      </pre>
    </div>
  );

  const sections = [
    {
      id: "installation",
      title: isFinnish ? "Asennus" : "Installation",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "1. Lisää Voiceflow Script" : "1. Add Voiceflow Script"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Lisää seuraava script-tag HTML-sivusi <head>-osiin tai ennen </body>-tagia:"
                : "Add the following script tag to your HTML page's <head> section or before the </body> tag:"}
            </p>
            <CodeBlock
              id="script-install"
              code={`<script type="text/javascript">
  (function(d, t) {
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: 'YOUR_PROJECT_ID' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    v.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
    v.type = 'text/javascript';
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
</script>`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "2. React-komponentti" : "2. React Component"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Jos käytät Reactia, voit luoda oman komponentin:"
                : "If you're using React, you can create your own component:"}
            </p>
            <CodeBlock
              id="react-component"
              code={`import { useEffect, useRef } from 'react';

const VoiceflowChat: React.FC = () => {
  const embedRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const VF_SCRIPT = 'https://cdn.voiceflow.com/widget/bundle.mjs';

    const mountChat = () => {
      if (window.voiceflow?.chat && embedRef.current) {
        window.voiceflow.chat.load({
          verify: { projectID: 'YOUR_PROJECT_ID' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
    };

    const existingScript = document.querySelector(
      \`script[src="\${VF_SCRIPT}"]\`
    );

    if (existingScript) {
      if (window.voiceflow?.chat) {
        mountChat();
      } else {
        existingScript.addEventListener('load', mountChat);
      }
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = VF_SCRIPT;
      script.async = true;
      script.addEventListener('load', mountChat);
      document.body.appendChild(script);
    }
  }, []);

  return <div ref={embedRef} id="voiceflow-chatbot" />;
};

export default VoiceflowChat;`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "embedding",
      title: isFinnish ? "Upotus" : "Embedding",
      icon: Code,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Perus upotus" : "Basic Embedding"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Lisää div-elementti, johon chatbotti renderöidään:"
                : "Add a div element where the chatbot will be rendered:"}
            </p>
            <CodeBlock
              id="basic-embed"
              code={`<div id="voiceflow-chatbot"></div>`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Mukautettu tyylitys" : "Custom Styling"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Voit tyylittää chatbottia CSS:llä:"
                : "You can style the chatbot with CSS:"}
            </p>
            <CodeBlock
              id="custom-styling"
              code={`#voiceflow-chatbot {
  width: 100%;
  height: 600px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Mukauta korkeus responsiivisesti */
@media (max-width: 768px) {
  #voiceflow-chatbot {
    height: 500px;
  }
}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "React-esimerkki täydellä toteutuksella" : "Full React Implementation Example"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Täydellinen React-komponentti, joka sisältää latausindikaattorin:"
                : "Complete React component with loading indicator:"}
            </p>
            <CodeBlock
              id="full-react"
              code={`import { useEffect, useRef, useState } from 'react';

interface VoiceflowChatProps {
  projectID: string;
  className?: string;
}

const VoiceflowChat: React.FC<VoiceflowChatProps> = ({ 
  projectID, 
  className = '' 
}) => {
  const embedRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const VF_SCRIPT = 'https://cdn.voiceflow.com/widget/bundle.mjs';

    const mountChat = () => {
      if (window.voiceflow?.chat && embedRef.current) {
        window.voiceflow.chat.load({
          verify: { projectID },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
        setIsLoading(false);
      }
    };

    const existingScript = document.querySelector(
      \`script[src="\${VF_SCRIPT}"]\`
    );

    if (existingScript) {
      if (window.voiceflow?.chat) {
        mountChat();
      } else {
        existingScript.addEventListener('load', mountChat);
      }
    } else {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = VF_SCRIPT;
      script.async = true;
      script.addEventListener('load', mountChat);
      document.body.appendChild(script);
    }
  }, [projectID]);

  return (
    <div className={\`relative \${className}\`}>
      <div ref={embedRef} id="voiceflow-chatbot" className="absolute inset-0" />
      {isLoading && (
        <div className="absolute inset-0 grid place-items-center bg-white">
          <div className="h-10 w-10 rounded-full border-2 border-black/20 border-t-black animate-spin" />
        </div>
      )}
    </div>
  );
};

export default VoiceflowChat;`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "configuration",
      title: isFinnish ? "Konfiguraatio" : "Configuration",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Project ID" : "Project ID"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Korvaa 'YOUR_PROJECT_ID' omalla Voiceflow Project ID:lläsi. Löydät sen Voiceflow Dashboardista."
                : "Replace 'YOUR_PROJECT_ID' with your own Voiceflow Project ID. You can find it in your Voiceflow Dashboard."}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Version ID" : "Version ID"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Käytä 'production' tuotantoversiolle tai tiettyä version ID:tä testausta varten."
                : "Use 'production' for the production version or a specific version ID for testing."}
            </p>
            <CodeBlock
              id="version-config"
              code={`// Tuotantoversio
versionID: 'production'

// Tietty versio (testaus)
versionID: 'YOUR_VERSION_ID'`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Mukautetut asetukset" : "Custom Options"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Voit mukauttaa chatbottia lisäämällä lisäasetuksia:"
                : "You can customize the chatbot by adding additional options:"}
            </p>
            <CodeBlock
              id="custom-options"
              code={`window.voiceflow.chat.load({
  verify: { projectID: 'YOUR_PROJECT_ID' },
  url: 'https://general-runtime.voiceflow.com',
  versionID: 'production',
  // Lisäasetukset
  launch: { event: 'start' }, // Automaattinen käynnistys
  // ... muut asetukset
});`}
            />
          </div>
        </div>
      ),
    },
    {
      id: "troubleshooting",
      title: isFinnish ? "Vianetsintä" : "Troubleshooting",
      icon: BookOpen,
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Chatbotti ei näy" : "Chatbot not showing"}
            </h3>
            <ul className="list-disc list-inside space-y-2 text-body-subtle ml-4">
              <li>
                {isFinnish
                  ? "Varmista, että script on ladattu ennen kuin yrität mountata chatbottia"
                  : "Make sure the script is loaded before trying to mount the chatbot"}
              </li>
              <li>
                {isFinnish
                  ? "Tarkista, että Project ID on oikein"
                  : "Verify that the Project ID is correct"}
              </li>
              <li>
                {isFinnish
                  ? "Tarkista selaimen konsoli virheilmoituksia varten"
                  : "Check the browser console for error messages"}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "Script ladataan useita kertoja" : "Script loading multiple times"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Käytä initializedRef:tä tai tarkista, onko script jo olemassa ennen uuden lisäämistä:"
                : "Use initializedRef or check if the script already exists before adding a new one:"}
            </p>
            <CodeBlock
              id="prevent-duplicate"
              code={`const existingScript = document.querySelector(
  \`script[src="\${VF_SCRIPT}"]\`
);

if (!existingScript) {
  // Lisää script vain jos sitä ei ole jo
  const script = document.createElement('script');
  // ...
}`}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-3">
              {isFinnish ? "TypeScript-tyypit" : "TypeScript Types"}
            </h3>
            <p className="text-body-subtle mb-4">
              {isFinnish
                ? "Jos käytät TypeScriptia, lisää globaali tyyppi:"
                : "If you're using TypeScript, add a global type:"}
            </p>
            <CodeBlock
              id="typescript-types"
              code={`declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
        }) => void;
      };
    };
  }
}`}
            />
          </div>
        </div>
      ),
    },
  ];

  const [activeSection, setActiveSection] = useState(sections[0].id);

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
              <p className="text-body-subtle text-lg max-w-2xl mx-auto">
                {isFinnish
                  ? "Asennus- ja upotusohjeet Mitrox AI Advisorille verkkosivuillesi"
                  : "Installation and embedding guide for Mitrox AI Advisor on your website"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <aside className="lg:col-span-1">
                <nav className="sticky top-24 space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          setActiveSection(section.id);
                          document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                          activeSection === section.id
                            ? "bg-white/10 text-white"
                            : "text-body-muted hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="lg:col-span-3">
                <div className="space-y-12">
                  {sections.map((section) => (
                    <section
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-24"
                    >
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6 flex items-center gap-3">
                          <section.icon className="w-6 h-6" />
                          {section.title}
                        </h2>
                        {section.content}
                      </div>
                    </section>
                  ))}
                </div>
              </main>
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

