import React from "react";

type ConsentState = {
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

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);
  const [marketing, setMarketing] = React.useState(false);

  React.useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) setVisible(true);
  }, []);

  if (!visible) return null;

  const acceptAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    setStoredConsent(consent);
    setVisible(false);
    window.location.reload();
  };

  const saveSelection = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    setStoredConsent(consent);
    setVisible(false);
    window.location.reload();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl border border-white/10 bg-black/90 backdrop-blur px-4 py-4 sm:px-6 sm:py-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <h2 className="text-white text-base font-semibold">Evästeet ja tietosuoja</h2>
            <p className="mt-1 text-sm text-white/70">
              Käytämme evästeitä sivuston toiminnan varmistamiseen, analytiikkaan ja markkinointiin. Voit hyväksyä kaikki evästeet tai muokata
              valintoja. Lisätietoja löydät <a className="text-blue-300 hover:underline" href="#/privacy-policy">tietosuojaselosteestamme</a>.
            </p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-white/80">
                <input type="checkbox" checked disabled className="accent-blue-400" />
                Välttämättömät evästeet (aina käytössä)
              </label>
              <label className="inline-flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  className="accent-blue-400"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                Analytiikka (GA)
              </label>
              <label className="inline-flex items-center gap-2 text-white/80">
                <input
                  type="checkbox"
                  className="accent-blue-400"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                Markkinointi (Meta Pixel)
              </label>
            </div>
          </div>

          <div className="flex-shrink-0 flex gap-2 sm:flex-col sm:items-stretch">
            <button
              type="button"
              onClick={saveSelection}
              className="px-4 py-2 border border-white/20 hover:border-white/40 text-white transition"
            >
              Tallenna valinnat
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="px-4 py-2 bg-white text-black font-medium hover:bg-white/90 transition"
            >
              Hyväksy kaikki
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


