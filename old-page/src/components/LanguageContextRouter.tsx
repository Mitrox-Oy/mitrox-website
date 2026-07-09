/**
 * LanguageContextRouter - Wrapper that syncs LanguageContext with Router location
 * This component must be used inside a Router to sync pathname changes
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const LanguageContextRouter: React.FC = () => {
  const location = useLocation();

  // Notify LanguageContext about pathname changes
  useEffect(() => {
    const event = new CustomEvent("languagecontext:pathname", {
      detail: location.pathname,
    });
    window.dispatchEvent(event);
  }, [location.pathname]);

  return null;
};

