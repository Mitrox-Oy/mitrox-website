import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-XNTJ0XJJ0B';
const GA_SCRIPT_ID = 'mitrox-ga-script';
const GA_SCRIPT_SRC = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

const Analytics: React.FC = () => {
  const location = useLocation();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.dataLayer = Array.isArray(window.dataLayer) ? window.dataLayer : [];
    window.gtag = window.gtag || function gtagFallback(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

    const safeGtag = (...args: unknown[]) => {
      try {
        window.gtag?.(...args);
      } catch {
        // Swallow analytics failures (often adblock/privacy related)
      }
    };

    const ensureAnalyticsScript = () => {
      const existingScript = document.getElementById(GA_SCRIPT_ID) as HTMLScriptElement | null;
      if (existingScript) return;

      const script = document.createElement('script');
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = GA_SCRIPT_SRC;
      script.onerror = () => {
        // Keep fallback gtag active and never break app rendering
        // eslint-disable-next-line no-console
        console.warn('[Analytics] GA script blocked or unavailable');
      };
      document.head.appendChild(script);
    };

    ensureAnalyticsScript();

    if (!hasInitialized.current) {
      safeGtag('js', new Date());
      hasInitialized.current = true;
    }

    safeGtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export default Analytics;