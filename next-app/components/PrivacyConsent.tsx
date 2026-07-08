"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/routing";
import GlassPanel from "@/components/ui/GlassPanel";
import { getSmoothScroll } from "@/lib/smoothScroll";

const STORAGE_KEY = "mitrox_consent";
export const CONSENT_ACCEPTED_EVENT = "mitrox:consent-accepted";

export default function PrivacyConsent({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const timer = window.setTimeout(() => setVisible(true), 400);
        return () => window.clearTimeout(timer);
      }
    } catch {
      // localStorage unavailable — skip the gate rather than error
    }
  }, []);

  // Blocks the rest of the site from being scrolled/interacted with while
  // this gate is up — the user must choose one of the two options below.
  // `overflow: hidden` alone isn't enough: Lenis drives scroll from wheel
  // events via its own JS loop, bypassing that CSS entirely, so Lenis itself
  // must also be stopped.
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

  const choose = (analytics: boolean) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, decidedAt: Date.now() }));
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event(CONSENT_ACCEPTED_EVENT));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={dict.consent.title}
    >
      {/* Blacked-out backdrop — intentionally not dismissible by clicking it;
          the user must pick Accept all or Necessary only below. */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />

      <GlassPanel className="relative w-full max-w-md rounded-2xl px-6 py-6 sm:px-7 sm:py-7 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pb-7">
        <h2 className="text-base font-semibold text-white">{dict.consent.title}</h2>
        <p className="mt-2 text-sm text-white/70 leading-relaxed">
          {dict.consent.text}{" "}
          <Link href={localizedPath("privacy-policy", locale)} className="text-white underline hover:text-white/80">
            {dict.consent.linkLabel}
          </Link>
          .
        </p>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={() => choose(false)}
            className="flex-1 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 transition-colors"
          >
            {dict.consent.necessaryOnly}
          </button>
          <button
            type="button"
            onClick={() => choose(true)}
            className="flex-1 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors"
          >
            {dict.consent.acceptAll}
          </button>
        </div>
      </GlassPanel>
    </div>
  );
}
