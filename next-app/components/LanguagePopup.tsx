"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { switchLocalePath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";
import { CONSENT_ACCEPTED_EVENT } from "@/components/PrivacyConsent";
import { getSmoothScroll } from "@/lib/smoothScroll";

const CONSENT_STORAGE_KEY = "mitrox_consent";
const SEEN_STORAGE_KEY = "mitrox_language_popup_seen";

export default function LanguagePopup({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (window.localStorage.getItem(SEEN_STORAGE_KEY)) return;

      const show = () => window.setTimeout(() => setVisible(true), 350);

      if (window.localStorage.getItem(CONSENT_STORAGE_KEY)) {
        const timer = show();
        return () => window.clearTimeout(timer);
      }

      let innerTimer: number | undefined;
      const handleAccepted = () => {
        innerTimer = show();
      };
      window.addEventListener(CONSENT_ACCEPTED_EVENT, handleAccepted);
      return () => {
        window.removeEventListener(CONSENT_ACCEPTED_EVENT, handleAccepted);
        if (innerTimer) window.clearTimeout(innerTimer);
      };
    } catch {
      // localStorage unavailable — skip the gate rather than error
    }
  }, []);

  // Blocks the rest of the site while this gate is up, same as PrivacyConsent
  // (and for the same reason: Lenis must be stopped, not just CSS overflow).
  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getSmoothScroll()?.stop();
    return () => {
      document.body.style.overflow = previousOverflow;
      getSmoothScroll()?.start();
    };
  }, [visible]);

  const choose = (target: Locale) => {
    try {
      window.localStorage.setItem(SEEN_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    setVisible(false);
    if (target !== locale) {
      router.push(switchLocalePath(pathname, locale, target));
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[115] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={dict.languagePopup.title}
    >
      {/* Blacked-out backdrop — not dismissible by clicking it; the user
          must pick Suomi or English below. */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />

      <GlassPanel className="relative w-full max-w-sm rounded-2xl px-6 py-6 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-6">
        <h2 className="text-base font-semibold text-white">{dict.languagePopup.title}</h2>
        <p className="mt-2 text-xs text-white/55">{dict.languagePopup.note}</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => choose("fi")}
            className="rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            Suomi
          </button>
          <button
            type="button"
            onClick={() => choose("en")}
            className="rounded-xl border border-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            English
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
