import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenis;
}

export function initSmoothScroll(): () => void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    ScrollTrigger.refresh();
    return () => {};
  }

  lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  tickerFn = (time: number) => {
    lenis?.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    if (tickerFn) gsap.ticker.remove(tickerFn);
    lenis?.destroy();
    lenis = null;
    tickerFn = null;
  };
}

export { gsap, ScrollTrigger };
