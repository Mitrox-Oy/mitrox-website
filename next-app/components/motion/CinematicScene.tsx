"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProgressListener = (progress: number) => void;
type SceneMotionApi = { subscribe: (fn: ProgressListener) => () => void };

const SceneMotionContext = createContext<SceneMotionApi | null>(null);

export function useSceneMotion() {
  return useContext(SceneMotionContext);
}

/**
 * A sticky-pinned "stage": a tall wrapper gives the scroll distance for the
 * scene to breathe, while a `position: sticky` inner stage holds the viewport
 * visually still so the user feels like they're scrolling *through* a scene
 * rather than *past* it. Content layers (via <SceneLayer>) subscribe to the
 * scene's 0..1 scroll progress and animate independently — that's what
 * creates the layered depth/parallax illusion without any real 3D.
 *
 * Uses native `position: sticky` rather than GSAP's `pin: true` — sticky's
 * scroll distance is just the wrapper's real height, which avoids a GSAP
 * pin-spacer sizing quirk observed under this stack (Next 16 + Lenis).
 */
export default function CinematicScene({
  children,
  heightVh = 240,
  className = "",
  stageClassName = "",
}: {
  children: ReactNode;
  /** Scroll distance for the scene, as a multiple of the viewport height. */
  heightVh?: number;
  className?: string;
  stageClassName?: string;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listeners = useRef(new Set<ProgressListener>());
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // Below `sm` (640px), skip the sticky/pinned scrub entirely: fixed-height
    // frames and absolute-positioned cross-fade layers (see Story/Ambition/
    // Process/Services) can't budget for narrower, taller-wrapping text and
    // single-column-stacked card grids — content stacks in normal flow
    // instead. Matches the `narrowViewport` threshold in lib/deviceCapability.ts.
    const mq = window.matchMedia("(max-width: 639.98px)");
    setIsMobile(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const staticLayout = reducedMotion || isMobile;

  useEffect(() => {
    if (staticLayout) return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          listeners.current.forEach((fn) => fn(self.progress));
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, [staticLayout]);

  const api: SceneMotionApi = {
    subscribe: (fn) => {
      listeners.current.add(fn);
      return () => {
        listeners.current.delete(fn);
      };
    },
  };

  if (staticLayout) {
    // No pin, no scroll-driven motion — every layer just renders at its
    // resting (fully visible) state, stacked in normal document flow.
    //
    // Crucially, `stageClassName` still applies here: it carries each
    // section's horizontal padding (px-4 …) and centering, which the pinned
    // path only put on the sticky stage. Without it, mobile content ran edge
    // to edge. `py-16` adds the vertical rhythm between sections that the
    // tall scroll wrapper used to provide.
    return <div className={`py-16 ${stageClassName} ${className}`}>{children}</div>;
  }

  return (
    <SceneMotionContext.Provider value={api}>
      <div ref={wrapperRef} className={`relative ${className}`} style={{ height: `${heightVh}vh` }}>
        <div className={`sticky top-0 h-[100svh] overflow-hidden ${stageClassName}`}>{children}</div>
      </div>
    </SceneMotionContext.Provider>
  );
}
