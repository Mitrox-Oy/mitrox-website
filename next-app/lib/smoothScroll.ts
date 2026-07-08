import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (lenis || typeof window === "undefined") return lenis;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

  gsap.registerPlugin(ScrollTrigger);

  lenis = new Lenis({ autoRaf: false });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

export function getSmoothScroll() {
  return lenis;
}
