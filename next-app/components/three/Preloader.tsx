"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const MIN_DURATION_MS = 900;

export default function Preloader() {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinElapsed(true), MIN_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!active && minElapsed) {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [active, minElapsed]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500"
      style={{ opacity: !active && minElapsed ? 0 : 1 }}
      aria-hidden="true"
    >
      <span className="text-white font-semibold tracking-tight text-lg mb-6">Mitrox</span>
      <div className="w-40 h-px bg-white/15 overflow-hidden">
        <div
          className="h-full bg-white transition-[width] duration-200 ease-out"
          style={{ width: `${Math.max(progress, minElapsed ? 100 : progress)}%` }}
        />
      </div>
    </div>
  );
}
