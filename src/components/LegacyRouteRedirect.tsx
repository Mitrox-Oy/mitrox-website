/**
 * LegacyRouteRedirect - Redirects old routes to new localized SEO-friendly routes
 */
import { Navigate, useParams } from 'react-router-dom';
import { ROUTE_MAPPINGS } from '../utils/routeMapping';
import { SUPPORTED_LANGUAGES } from '../utils/routing';

interface LegacyRouteRedirectProps {
  routeKey: keyof typeof ROUTE_MAPPINGS;
}

export const LegacyRouteRedirect: React.FC<LegacyRouteRedirectProps> = ({ routeKey }) => {
  const { lang } = useParams<{ lang: string }>();
  
  if (!lang || !SUPPORTED_LANGUAGES.includes(lang as 'fi' | 'en')) {
    return <Navigate to="/fi" replace />;
  }
  
  const targetPath = ROUTE_MAPPINGS[routeKey][lang as 'fi' | 'en'];
  return <Navigate to={`/${lang}/${targetPath}`} replace />;
};






