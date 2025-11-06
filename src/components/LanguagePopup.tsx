import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { getStoredConsent } from "./CookieConsent";

const STORAGE_KEY = "languagePopupSeen";

const LanguagePopup: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [visible, setVisible] = React.useState(false);
  const [selection, setSelection] = React.useState<"fi" | "en">(language === "en" ? "en" : "fi");

  React.useEffect(() => {
    try {
      const seen = window.localStorage.getItem(STORAGE_KEY);
      if (seen) return; // Already handled

      const maybeShow = () => {
        // Avoid overlapping the cookie popup: show only after consent exists
        const hasConsent = !!getStoredConsent();
        if (hasConsent) {
          setVisible(true);
        } else {
          // Wait for consent accepted event
          const handler = () => {
            setTimeout(() => setVisible(true), 150);
            window.removeEventListener("cookieconsent:accepted", handler as any);
          };
          window.addEventListener("cookieconsent:accepted", handler as any);
        }
      };

      // Small delay for smoother UX
      const t = window.setTimeout(maybeShow, 400);
      return () => window.clearTimeout(t);
    } catch {
      // no-op
    }
  }, []);

  if (!visible) return null;

  const confirm = () => {
    setLanguage(selection);
    try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[109] flex items-end justify-center p-0 sm:p-6">
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-xl mx-0 sm:mx-auto overflow-hidden rounded-none border border-white/15 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        <div className="px-5 py-5 sm:px-7 sm:py-7">
          <h2 className="text-[18px] sm:text-[20px] font-semibold text-white">
            {selection === "fi" ? "Valitse sivuston kieli" : "Choose site language"}
          </h2>
          <p className="mt-2 text-[12px] text-white/60">
            {selection === "fi"
              ? "Voit vaihtaa kielen myöhemmin sivuston alatunnisteesta."
              : "You can change the language later in the site footer."}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setSelection("fi")}
              className={`rounded-none border px-4 py-2.5 text-sm font-medium transition-colors ${
                selection === "fi"
                  ? "border-white/40 bg-white/[0.05] text-white"
                  : "border-white/15 bg-black text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              Suomi
            </button>
            <button
              type="button"
              onClick={() => setSelection("en")}
              className={`rounded-none border px-4 py-2.5 text-sm font-medium transition-colors ${
                selection === "en"
                  ? "border-white/40 bg-white/[0.05] text-white"
                  : "border-white/15 bg-black text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              English
            </button>
          </div>

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setVisible(false)}
              className="rounded-none border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/05"
            >
              {selection === "fi" ? "Ohita" : "Skip"}
            </button>
            <button
              type="button"
              onClick={confirm}
              className="rounded-none bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              {selection === "fi" ? "Jatka" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagePopup;


