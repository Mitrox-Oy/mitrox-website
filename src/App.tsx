// src/App.tsx
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef, lazy, Suspense } from "react";
import Analytics from "./components/Analytics";
import CookieConsent, { getStoredConsent } from "./components/CookieConsent";
import StructuredData from "./components/StructuredData";

import Home from "./Home";         // Tämä on sun nykyinen landing page sisältö
import AboutPage from "./AboutPage";
import LiveDemoPage from "./LiveDemoPage";
import WebsiteBusinessPage from "./WebsiteBusinessPage";
import AIAgentPage from "./AIAgentPage";
import AffiliatePage from "./AffiliatePage";

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
  const consent = getStoredConsent();
  const allowAnalytics = consent?.analytics === true;

  return (
    <>
      {allowAnalytics && <Analytics />}
      <StructuredData />
      <Router>
        <ScrollToTopOnRouteChange />
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />       {/* Etusivu */}
          <Route path="/about" element={<AboutPage />} /> {/* Tietoa meistä */}
          <Route path="/live-demo" element={<LiveDemoPage />} /> {/* Live Demo */}
          <Route path="/websites" element={<WebsiteBusinessPage />} /> {/* Ensiluokkaiset sivustot */}
          <Route path="/advisor" element={<AIAgentPage />} /> {/* Mitrox AI Advisor */}
          <Route path="/affiliate" element={<AffiliatePage />} /> {/* Affiliate-ohjelma */}
          <Route path="/privacy-policy" element={<PrivacyPolicyLazy />} /> {/* Tietosuojaseloste */}
        </Routes>
        </Suspense>
        <CookieConsent />
      </Router>
    </>
  );
}

const PrivacyPolicyLazy = lazy(() => import("./PrivacyPolicyPage"));
