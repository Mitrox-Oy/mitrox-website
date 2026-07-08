"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

export default function GlassPanel({
  children,
  className = "",
  hover = false,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Adds a soft drop shadow and a slow-drifting accent gradient for premium standalone panels. */
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glass-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--glass-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={hover ? handlePointerMove : undefined}
      className={`glass-surface ${hover ? "glass-specular" : ""} ${glow ? "glass-glow" : ""} ${className}`}
    >
      {glow && <div className="glass-accent" aria-hidden="true" />}
      {children}
    </div>
  );
}
