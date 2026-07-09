import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";

const MIN_VISIBLE_MS = 500;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef(Date.now());
  const fontsReadyRef = useRef(false);
  const bgReadyRef = useRef(false);

  useEffect(() => {
    let raf: number;
    let finished = false;

    const maybeFinish = () => {
      if (finished) return;
      if (fontsReadyRef.current && bgReadyRef.current) {
        finished = true;
        const elapsed = Date.now() - startRef.current;
        const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);
        setProgress(100);
        window.setTimeout(() => setDone(true), remaining);
      }
    };

    const onBgReady = () => {
      bgReadyRef.current = true;
      maybeFinish();
    };
    window.addEventListener("mitrox:background-ready", onBgReady);

    document.fonts.ready
      .then(() => {
        fontsReadyRef.current = true;
        maybeFinish();
      })
      .catch(() => {
        fontsReadyRef.current = true;
        maybeFinish();
      });

    // Fallback: never block first paint for more than 4s
    const fallback = window.setTimeout(() => {
      fontsReadyRef.current = true;
      bgReadyRef.current = true;
      maybeFinish();
    }, 4000);

    const tick = () => {
      setProgress((p) => {
        if (finished) return 100;
        const target = fontsReadyRef.current && bgReadyRef.current ? 100 : 90;
        return p < target ? p + (target - p) * 0.06 : p;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
      window.removeEventListener("mitrox:background-ready", onBgReady);
    };
  }, []);

  if (done) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-700"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
      role="status"
      aria-live="polite"
      aria-label="Loading Mitrox"
    >
      <img
        src={logo}
        alt="Mitrox"
        className="h-10 w-auto mb-8 transition-transform duration-700"
        style={{ transform: progress >= 100 ? "scale(1.08)" : "scale(1)" }}
      />
      <div className="w-48 h-px bg-white/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-white/80 transition-all duration-150 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}
