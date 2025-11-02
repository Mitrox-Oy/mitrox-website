// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Analytics from "./components/Analytics";
import StructuredData from "./components/StructuredData";

import Home from "./Home";         // Tämä on sun nykyinen landing page sisältö
import AboutPage from "./AboutPage";
import LiveDemoPage from "./LiveDemoPage";
import WebsiteBusinessPage from "./WebsiteBusinessPage";
import AIAgentPage from "./AIAgentPage";
import AffiliatePage from "./AffiliatePage";

export default function App() {
  return (
    <>
      <Analytics />
      <StructuredData />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />       {/* Etusivu */}
          <Route path="/about" element={<AboutPage />} /> {/* Tietoa meistä */}
          <Route path="/live-demo" element={<LiveDemoPage />} /> {/* Live Demo */}
          <Route path="/websites" element={<WebsiteBusinessPage />} /> {/* Räätälöidyt Verkkosivut */}
          <Route path="/ai-agent" element={<AIAgentPage />} /> {/* AI Agent / Chatbot */}
          <Route path="/affiliate" element={<AffiliatePage />} /> {/* Affiliate-ohjelma */}
        </Routes>
      </Router>
    </>
  );
}
