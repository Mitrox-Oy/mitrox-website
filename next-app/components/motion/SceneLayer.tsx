"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { useSceneMotion } from "./CinematicScene";
import { interpolateKeyframes, type LayerKeyframe } from "./keyframes";

/**
 * One depth layer inside a <CinematicScene> — background/midground/
 * foreground/overlay are just SceneLayer instances with different keyframe
 * timelines and different `depth` (parallax) values. Style updates are
 * applied imperatively via gsap.set on every scroll tick rather than through
 * React state, so scroll scrubbing stays GPU-cheap and doesn't re-render.
 */
export default function SceneLayer({
  keyframes,
  children,
  className = "",
  style,
}: {
  keyframes: LayerKeyframe[];
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const motion = useSceneMotion();
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (!motion) return;
    return motion.subscribe((p) => {
      const el = ref.current;
      if (!el) return;
      const s = interpolateKeyframes(keyframes, p);
      gsap.set(el, {
        opacity: s.opacity,
        scale: s.scale,
        x: s.x,
        y: s.y,
        filter: s.blur > 0.05 ? `blur(${s.blur}px)` : "none",
      });
      // Keep transformed content out of the accessibility tree while it's
      // effectively invisible, without causing layout shift.
      el.style.pointerEvents = s.opacity < 0.15 ? "none" : "auto";
    });
  }, [motion, keyframes]);

  // Outside a scene (reduced motion / mobile static layout): no pin/scrub
  // context exists, so give layers a light one-time fade-and-rise as they
  // enter the viewport instead of just popping in fully formed. Skipped
  // entirely under prefers-reduced-motion, and never hides anything already
  // in the initial viewport on load — `revealed` starts `true` and only
  // flips to a pre-reveal state once the observer confirms it's off-screen.
  useEffect(() => {
    if (motion) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(max-width: 639.98px)").matches) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    setRevealed(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [motion]);

  // Outside a scene (reduced motion / no context): render at rest, fully
  // visible, no transform — content should never be stuck hidden.
  const initialStyle: CSSProperties = motion
    ? {
        opacity: keyframes[0].opacity ?? 1,
        transform: `translate(${keyframes[0].x ?? 0}px, ${keyframes[0].y ?? 0}px) scale(${keyframes[0].scale ?? 1})`,
        filter: keyframes[0].blur ? `blur(${keyframes[0].blur}px)` : undefined,
        willChange: "transform, opacity, filter",
        ...style,
      }
    : {
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
        ...style,
      };

  return (
    <div ref={ref} className={className} style={initialStyle}>
      {children}
    </div>
  );
}
