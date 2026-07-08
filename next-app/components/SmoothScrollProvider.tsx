"use client";

import { useEffect } from "react";
import { destroySmoothScroll, getSmoothScroll, initSmoothScroll } from "@/lib/smoothScroll";

export default function SmoothScrollProvider() {
  useEffect(() => {
    initSmoothScroll();

    // Lenis tracks its own internal scroll target separate from the DOM. On a
    // fresh page (no wheel/touch event has nudged Lenis yet), a native
    // browser hash-jump changes window.scrollY for one frame, then Lenis's
    // own rAF loop snaps it straight back to 0 — every in-page "#anchor" link
    // (nav, hero buttons, waitlist CTA) would silently do nothing. Intercept
    // same-page hash clicks and drive the scroll through Lenis instead, so
    // its internal state and the DOM never disagree.
    const handleClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      const lenis = getSmoothScroll();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: 0 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.pushState(null, "", url.hash);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      destroySmoothScroll();
    };
  }, []);

  return null;
}
