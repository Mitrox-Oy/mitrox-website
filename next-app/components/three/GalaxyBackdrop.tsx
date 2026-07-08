"use client";

import { useEffect, useState } from "react";
import Galaxy from "./vendor/Galaxy";
import { useDeviceTier } from "./DeviceTierProvider";

/**
 * Site-tuned wrapper around the vendor Galaxy shader — not just the stock
 * example. Defaults are pulled toward the site's existing cool blue/violet
 * accent (matches the Sparkles/fog atmosphere and the logo's sheen tint)
 * rather than the component's stock teal-green, density and glow are kept
 * low so it reads as a quiet premium backdrop rather than a busy starfield,
 * and it's masked to fade out toward the viewport edges so it blends into
 * the page's solid black rather than presenting as a hard rectangle.
 *
 * Mouse interaction is fully off: the vendor component never attaches mouse
 * listeners when `mouseInteraction`/`mouseRepulsion` are false, so there is
 * no interactive behavior at all, static or otherwise.
 */
export default function GalaxyBackdrop() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const tier = useDeviceTier();

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // "static" tier means the device was flagged as lacking reliable WebGL —
  // don't hand it a second always-on shader canvas on top of that signal.
  if (tier === null || tier === "static") return null;

  return (
    <div
      className="fixed inset-0 -z-20 pointer-events-none"
      style={{
        maskImage: "radial-gradient(120% 90% at 50% 30%, black 45%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(120% 90% at 50% 30%, black 45%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <Galaxy
        mouseInteraction={false}
        mouseRepulsion={false}
        autoCenterRepulsion={0}
        density={0.65}
        glowIntensity={0.22}
        saturation={0.32}
        hueShift={228}
        twinkleIntensity={0.35}
        rotationSpeed={0.035}
        starSpeed={0.25}
        speed={0.6}
        transparent
        disableAnimation={reducedMotion}
      />
    </div>
  );
}
