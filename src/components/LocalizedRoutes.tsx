/**
 * LocalizedRoutes component
 * Wraps routes with language prefix support and SEO-friendly localized paths
 */
import { Routes, Route, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Home from '../Home';
import AboutPage from '../AboutPage';
import LiveDemoPage from '../LiveDemoPage';
import WebsiteBusinessPage from '../WebsiteBusinessPage';
import AIAgentPage from '../AIAgentPage';
import AffiliatePage from '../AffiliatePage';
import PrivacyPolicyPage from '../PrivacyPolicyPage';
import BlogPage from '../BlogPage';
import BlogArticlePage from '../BlogArticlePage';
import AdminDashboardPage from '../AdminDashboardPage';
import DocsPage from '../DocsPage';
import DocsWordPressPage from '../DocsWordPressPage';
import DocsWixPage from '../DocsWixPage';
import DocsWebflowPage from '../DocsWebflowPage';
import DocsShopifyPage from '../DocsShopifyPage';
import DocsSquarespacePage from '../DocsSquarespacePage';
import DocsNetlifyPage from '../DocsNetlifyPage';
import DocsReactPage from '../DocsReactPage';
import DocsHTMLPage from '../DocsHTMLPage';
import { SUPPORTED_LANGUAGES } from '../utils/routing';
import { LegacyRouteRedirect } from './LegacyRouteRedirect';

const LocalizedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang } = useParams<{ lang: string }>();
  
  // Validate language
  if (lang && !SUPPORTED_LANGUAGES.includes(lang as 'fi' | 'en')) {
    return <Navigate to="/fi" replace />;
  }
  
  return <>{children}</>;
};

export const LocalizedRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Root redirect to default language */}
      <Route path="/" element={<Navigate to="/fi" replace />} />
      
      {/* Admin Dashboard - must be before /:lang to avoid matching /admin as a language */}
      <Route path="/admin" element={<AdminDashboardPage />} />
      <Route path="/admin/*" element={<AdminDashboardPage />} />
      
      {/* Home routes */}
      <Route path="/:lang" element={<LocalizedRoute><Home /></LocalizedRoute>} />
      
      {/* About routes - /fi/tiimi and /en/about */}
      <Route path="/fi/tiimi" element={<LocalizedRoute><AboutPage /></LocalizedRoute>} />
      <Route path="/en/about" element={<LocalizedRoute><AboutPage /></LocalizedRoute>} />
      
      {/* Websites routes - /fi/verkkosivut and /en/websites */}
      <Route path="/fi/verkkosivut" element={<LocalizedRoute><WebsiteBusinessPage /></LocalizedRoute>} />
      <Route path="/en/websites" element={<LocalizedRoute><WebsiteBusinessPage /></LocalizedRoute>} />
      
      {/* AI Advisor routes - /fi/ai-neuvonantaja and /en/ai-advisor */}
      <Route path="/fi/ai-neuvonantaja" element={<LocalizedRoute><AIAgentPage /></LocalizedRoute>} />
      <Route path="/en/ai-advisor" element={<LocalizedRoute><AIAgentPage /></LocalizedRoute>} />
      
      {/* Affiliate routes - /fi/kumppaniohjelma and /en/affiliate */}
      <Route path="/fi/kumppaniohjelma" element={<LocalizedRoute><AffiliatePage /></LocalizedRoute>} />
      <Route path="/en/affiliate" element={<LocalizedRoute><AffiliatePage /></LocalizedRoute>} />
      
      {/* News routes */}
      <Route path="/fi/uutiset" element={<LocalizedRoute><BlogPage /></LocalizedRoute>} />
      <Route path="/en/news" element={<LocalizedRoute><BlogPage /></LocalizedRoute>} />
      <Route path="/fi/uutiset/:slug" element={<LocalizedRoute><BlogArticlePage /></LocalizedRoute>} />
      <Route path="/en/news/:slug" element={<LocalizedRoute><BlogArticlePage /></LocalizedRoute>} />
      
      {/* Privacy Policy routes */}
      <Route path="/fi/tietosuojaseloste" element={<LocalizedRoute><PrivacyPolicyPage /></LocalizedRoute>} />
      <Route path="/en/privacy-policy" element={<LocalizedRoute><PrivacyPolicyPage /></LocalizedRoute>} />
      
      {/* Documentation routes */}
      <Route path="/fi/dokumentaatio" element={<LocalizedRoute><DocsPage /></LocalizedRoute>} />
      <Route path="/en/docs" element={<LocalizedRoute><DocsPage /></LocalizedRoute>} />
      
      {/* Documentation platform routes */}
      <Route path="/fi/dokumentaatio/wordpress" element={<LocalizedRoute><DocsWordPressPage /></LocalizedRoute>} />
      <Route path="/en/docs/wordpress" element={<LocalizedRoute><DocsWordPressPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/wix" element={<LocalizedRoute><DocsWixPage /></LocalizedRoute>} />
      <Route path="/en/docs/wix" element={<LocalizedRoute><DocsWixPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/webflow" element={<LocalizedRoute><DocsWebflowPage /></LocalizedRoute>} />
      <Route path="/en/docs/webflow" element={<LocalizedRoute><DocsWebflowPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/shopify" element={<LocalizedRoute><DocsShopifyPage /></LocalizedRoute>} />
      <Route path="/en/docs/shopify" element={<LocalizedRoute><DocsShopifyPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/squarespace" element={<LocalizedRoute><DocsSquarespacePage /></LocalizedRoute>} />
      <Route path="/en/docs/squarespace" element={<LocalizedRoute><DocsSquarespacePage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/netlify" element={<LocalizedRoute><DocsNetlifyPage /></LocalizedRoute>} />
      <Route path="/en/docs/netlify" element={<LocalizedRoute><DocsNetlifyPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/react" element={<LocalizedRoute><DocsReactPage /></LocalizedRoute>} />
      <Route path="/en/docs/react" element={<LocalizedRoute><DocsReactPage /></LocalizedRoute>} />
      <Route path="/fi/dokumentaatio/html" element={<LocalizedRoute><DocsHTMLPage /></LocalizedRoute>} />
      <Route path="/en/docs/html" element={<LocalizedRoute><DocsHTMLPage /></LocalizedRoute>} />
      
      {/* Live Demo routes */}
      <Route path="/:lang/live-demo" element={<LocalizedRoute><LiveDemoPage /></LocalizedRoute>} />
      
      {/* Legacy route redirects for backwards compatibility */}
      <Route path="/:lang/about" element={<LegacyRouteRedirect routeKey="about" />} />
      <Route path="/:lang/websites" element={<LegacyRouteRedirect routeKey="websites" />} />
      <Route path="/:lang/advisor" element={<LegacyRouteRedirect routeKey="advisor" />} />
      
      {/* Fallback - redirect to default language */}
      <Route path="*" element={<Navigate to="/fi" replace />} />
    </Routes>
  );
};

