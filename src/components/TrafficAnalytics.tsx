import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabaseClient';

type AnalyticsEvent = {
  path: string;
  language: string;
  country?: string;
  city?: string;
  referrer?: string;
  user_agent?: string;
  timestamp: string;
};

const getLocationData = async (): Promise<{ country?: string; city?: string }> => {
  try {
    // Use a free IP geolocation service
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name || data.country_code,
        city: data.city,
      };
    }
  } catch (error) {
    console.error('[TrafficAnalytics] Failed to get location:', error);
  }
  return {};
};

const trackPageView = async (path: string, language: string) => {
  if (!supabase) return;

  try {
    const location = await getLocationData();
    const event: AnalyticsEvent = {
      path,
      language,
      country: location.country,
      city: location.city,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    // Insert into Supabase (this will be public, so RLS should allow anonymous inserts)
    const { error } = await supabase.from('traffic_analytics').insert(event);

    if (error) {
      console.error('[TrafficAnalytics] Failed to track page view:', error);
    }
  } catch (error) {
    console.error('[TrafficAnalytics] Error tracking page view:', error);
  }
};

export const TrafficAnalytics: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    // Only track on client side
    if (typeof window === 'undefined') return;

    // Track page view
    trackPageView(location.pathname, language);
  }, [location.pathname, language]);

  return null;
};

