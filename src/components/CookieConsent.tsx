import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

const STORAGE_KEY = "cookieConsent";

export function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed === "object" && parsed) return parsed as ConsentState;
    return null;
  } catch {
    return null;
  }
}

function setStoredConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
}
type CookieConsentProps = {
  onConsentChange?: (consent: ConsentState) => void;
};

const CookieConsent: React.FC<CookieConsentProps> = ({ onConsentChange }) => {
  const [visible, setVisible] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);
  const { language, setLanguage } = useLanguage();
  // Local-only language for this popup UI (does not change site language)
  const [uiLang, setUiLang] = React.useState<"fi" | "en">("fi");
  const [languageMenuOpen, setLanguageMenuOpen] = React.useState(false);
  const languageMenuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setVisible(true);
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    // Initialize popup UI language from current site language once at open-time
    setUiLang(language === "en" ? "en" : "fi");
  }, [language]);

  // Do not lock body scroll; iOS Safari requires the document to remain scrollable
  // to allow the bottom toolbar to become translucent.

  React.useEffect(() => {
    if (!languageMenuOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (!languageMenuRef.current) return;
      if (!languageMenuRef.current.contains(event.target as Node)) {
        setLanguageMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [languageMenuOpen]);

  if (!visible) return null;

  const acceptAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    setStoredConsent(consent);
    onConsentChange?.(consent);
    setVisible(false);
    try { window.dispatchEvent(new CustomEvent("cookieconsent:accepted", { detail: consent })); } catch {}
  };

  const saveSelection = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    setStoredConsent(consent);
    onConsentChange?.(consent);
    setVisible(false);
    try { window.dispatchEvent(new CustomEvent("cookieconsent:accepted", { detail: consent })); } catch {}
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[110] flex items-end justify-center p-0 sm:p-6"
      id="cookie-consent-overlay"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1px)' }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-3xl mx-0 overflow-hidden rounded-none border border-white/15 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="px-5 py-4 sm:px-6 sm:py-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex-1">
            <h2 className="mt-0 text-xl sm:text-2xl font-semibold text-white">
              {uiLang === "fi" ? "Evästeet ja tietosuoja" : "Cookies & privacy"}
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">
              {uiLang === "fi"
                ? "Käytämme evästeitä sivuston toiminnan varmistamiseen ja kokemuksen parantamiseen. Voit hyväksyä kaiken tai muokata asetuksia. Lisätietoja: "
                : "We use cookies to keep the site smooth and improve your experience. Accept all or adjust preferences. Learn more: "}
              <Link className="text-blue-300 hover:underline" to="/privacy-policy">
                {uiLang === "fi" ? "tietosuojaseloste" : "privacy policy"}
              </Link>
              .
            </p>
            <div className="mt-4 relative inline-flex" ref={languageMenuRef}>
              <button
                type="button"
                onClick={() => setLanguageMenuOpen((prev) => !prev)}
                className="text-xs text-white/75 hover:text-white transition-colors"
              >
                {`Language: ${uiLang === "fi" ? "Suomi" : "English"}`}
              </button>
              {languageMenuOpen && (
                <div className="absolute left-0 top-[120%] min-w-[160px] rounded-lg border border-white/10 bg-black/95 px-3 py-2 text-left text-xs text-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setUiLang("fi");
                      try { setLanguage("fi"); } catch {}
                      setLanguageMenuOpen(false);
                    }}
                    className={`block w-full rounded px-2 py-1 transition-colors ${
                      uiLang === "fi" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    Suomi
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUiLang("en");
                      try { setLanguage("en"); } catch {}
                      setLanguageMenuOpen(false);
                    }}
                    className={`mt-1 block w-full rounded px-2 py-1 transition-colors ${
                      uiLang === "en" ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {/* Necessary */}
              <label
                className="group cursor-default select-none flex items-center justify-start gap-3 px-4 py-3 rounded-none border border-white/20 bg-black text-white/90"
              >
                <input type="checkbox" checked disabled className="sr-only" />
                <span className="flex items-center gap-3">
                  <span className="h-[18px] w-[18px] rounded-[3px] border border-white/30 bg-white/10 flex items-center justify-center">
                    <Check className="h-[14px] w-[14px] text-white/90" />
                  </span>
                  <span>{uiLang === "fi" ? "Välttämättömät evästeet (aina käytössä)" : "Necessary cookies (always on)"}</span>
                </span>
              </label>

              {/* Analytics */}
              <label
                className={`group flex cursor-pointer items-center justify-start gap-3 px-4 py-3 rounded-none border bg-black transition-colors ${
                  analytics ? "border-white/30 bg-white/[0.04] text-white" : "border-white/12 text-white/80 hover:bg-white/[0.03]"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <span className="flex items-center gap-3">
                  <span className={`h-[18px] w-[18px] rounded-[3px] border flex items-center justify-center ${
                    analytics ? "border-white/40 bg-white/10" : "border-white/25 bg-transparent"
                  }`}>
                    {analytics && <Check className="h-[14px] w-[14px] text-white/90" />}
                  </span>
                  <span>{uiLang === "fi" ? "Analytiikka" : "Analytics"}</span>
                </span>
              </label>

              {/* Marketing */}
              <label
                className={`group flex cursor-pointer items-center justify-start gap-3 px-4 py-3 rounded-none border bg-black transition-colors ${
                  marketing ? "border-white/30 bg-white/[0.04] text-white" : "border-white/12 text-white/80 hover:bg-white/[0.03]"
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <span className="flex items-center gap-3">
                  <span className={`h-[18px] w-[18px] rounded-[3px] border flex items-center justify-center ${
                    marketing ? "border-white/40 bg-white/10" : "border-white/25 bg-transparent"
                  }`}>
                    {marketing && <Check className="h-[14px] w-[14px] text-white/90" />}
                  </span>
                  <span>{uiLang === "fi" ? "Markkinointi" : "Marketing"}</span>
                </span>
              </label>
            </div>
          </div>

          <div className="flex-shrink-0 flex gap-2 sm:flex-col sm:items-stretch">
            <button
              type="button"
              onClick={saveSelection}
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/10"
            >
              {uiLang === "fi" ? "Tallenna valinnat" : "Save preferences"}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {uiLang === "fi" ? "Hyväksy kaikki" : "Accept all"}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


