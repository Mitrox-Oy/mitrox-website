export type DeviceTier = "full" | "lite" | "static";

function supportsWebGL2() {
  try {
    const canvas = document.createElement("canvas");
    return !!canvas.getContext("webgl2");
  } catch {
    return false;
  }
}

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "static";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return "static";

  if (!supportsWebGL2()) return "static";

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const narrowViewport = window.innerWidth < 640;

  if (cores <= 2 || memory <= 2) return "static";
  if (narrowViewport || cores <= 4 || memory <= 4) return "lite";

  return "full";
}
