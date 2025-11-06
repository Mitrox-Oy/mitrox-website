// src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Analytics from "./components/Analytics";
import CookieConsent, { getStoredConsent, type ConsentState } from "./components/CookieConsent";
import StructuredData from "./components/StructuredData";
import { LanguageProvider } from "./context/LanguageContext";
import LanguagePopup from "./components/LanguagePopup";

import Home from "./Home";         // Tämä on sun nykyinen landing page sisältö
import AboutPage from "./AboutPage";
import LiveDemoPage from "./LiveDemoPage";
import WebsiteBusinessPage from "./WebsiteBusinessPage";
import AIAgentPage from "./AIAgentPage";
import AffiliatePage from "./AffiliatePage";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

const ScrollToTopOnRouteChange = () => {
  const { pathname, hash } = useLocation();
  const previousLocation = useRef<{ pathname: string; hash: string }>({ pathname, hash });

  useEffect(() => {
    const prev = previousLocation.current;
    previousLocation.current = { pathname, hash };

    if (hash && hash !== prev.hash) {
      const targetId = hash.replace("#", "");
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timeout = window.setTimeout(scrollToTarget, 120);
        return () => window.clearTimeout(timeout);
      }
      return;
    }

    if (pathname !== prev.pathname && !hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
};

export default function App() {
  const [consent, setConsent] = useState<ConsentState | null>(() => getStoredConsent());
  const allowAnalytics = consent?.analytics === true;

  return (
    <>
      <StructuredData />
      <LanguageProvider>
        <Router>
          {allowAnalytics && <Analytics />}
          <ScrollToTopOnRouteChange />
          <Routes>
            <Route path="/" element={<Home />} />       {/* Etusivu */}
            <Route path="/about" element={<AboutPage />} /> {/* Tietoa meistä */}
            <Route path="/live-demo" element={<LiveDemoPage />} /> {/* Live Demo */}
            <Route path="/websites" element={<WebsiteBusinessPage />} /> {/* Ensiluokkaiset sivustot */}
            <Route path="/advisor" element={<AIAgentPage />} /> {/* Mitrox AI Advisor */}
            <Route path="/affiliate" element={<AffiliatePage />} /> {/* Affiliate-ohjelma */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} /> {/* Tietosuojaseloste */}
          </Routes>
          <CookieConsent onConsentChange={setConsent} />
          <LanguagePopup />
        </Router>
      </LanguageProvider>
    </>
  );
}
