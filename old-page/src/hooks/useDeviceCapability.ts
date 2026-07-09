import { useEffect, useState } from "react";

export type DeviceTier = "full" | "lite" | "static";

function detectTier(): DeviceTier {
  if (typeof window === "undefined") return "static";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return "static";

  let hasWebGL2 = false;
  try {
    const canvas = document.createElement("canvas");
    hasWebGL2 = !!canvas.getContext("webgl2");
  } catch {
    hasWebGL2 = false;
  }
  if (!hasWebGL2) return "static";

  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const isNarrowViewport = window.innerWidth < 768;

  if (cores < 4 || memory < 4) return "lite";
  if (isNarrowViewport) return "lite";

  return "full";
}

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>(() => detectTier());

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setTier(detectTier());
    motionQuery.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return tier;
}
