export type LayerKeyframe = {
  /** Normalized position along the scene's scroll progress, 0..1. */
  at: number;
  opacity?: number;
  scale?: number;
  x?: number;
  y?: number;
  /** Blur radius in px. */
  blur?: number;
};

type ResolvedStyle = { opacity: number; scale: number; x: number; y: number; blur: number };

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Piecewise-linear interpolation across a sorted list of keyframes. */
export function interpolateKeyframes(frames: LayerKeyframe[], progress: number): ResolvedStyle {
  const p = Math.max(0, Math.min(1, progress));
  let prev = frames[0];
  let next = frames[frames.length - 1];

  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].at && p <= frames[i + 1].at) {
      prev = frames[i];
      next = frames[i + 1];
      break;
    }
  }

  const span = next.at - prev.at;
  const t = span > 0 ? (p - prev.at) / span : 0;

  return {
    opacity: lerp(prev.opacity ?? 1, next.opacity ?? 1, t),
    scale: lerp(prev.scale ?? 1, next.scale ?? 1, t),
    x: lerp(prev.x ?? 0, next.x ?? 0, t),
    y: lerp(prev.y ?? 0, next.y ?? 0, t),
    blur: lerp(prev.blur ?? 0, next.blur ?? 0, t),
  };
}

/**
 * Standard enter -> hold -> exit lifecycle for a scene layer: starts hidden
 * and offset, arrives at its resting state, holds there, then continues
 * moving through and past its resting state as it exits — so every layer has
 * a clear start/active/exit state instead of just popping in and out.
 */
export function enterHoldExit({
  enterStart,
  enterEnd,
  exitStart,
  exitEnd,
  distance = 32,
  blur = 10,
  fromScale = 0.96,
  toScale = 1.03,
  axis = "y",
}: {
  enterStart: number;
  enterEnd: number;
  exitStart: number;
  exitEnd: number;
  distance?: number;
  blur?: number;
  fromScale?: number;
  toScale?: number;
  axis?: "x" | "y";
}): LayerKeyframe[] {
  const inOffset = axis === "y" ? { y: distance } : { x: distance };
  const outOffset = axis === "y" ? { y: -distance } : { x: -distance };
  const zero = axis === "y" ? { y: 0 } : { x: 0 };

  const frames: LayerKeyframe[] = [];

  if (enterStart > 0) {
    frames.push({ at: 0, opacity: 0, scale: fromScale, blur, ...inOffset });
    frames.push({ at: enterStart, opacity: 0, scale: fromScale, blur, ...inOffset });
  } else {
    // No scroll room before the entrance: the layer must already read as
    // fully visible/settled at progress 0 — this matters most for the very
    // first scene on the page (Hero), which has zero prior scroll to reveal
    // it through, and for the first-in layer of every other scene (nothing
    // should still be hidden the instant a scene locks into place).
    frames.push({ at: 0, opacity: 1, scale: 1, blur: 0, ...zero });
  }

  frames.push({ at: enterEnd, opacity: 1, scale: 1, blur: 0, ...zero });
  frames.push({ at: exitStart, opacity: 1, scale: 1, blur: 0, ...zero });
  frames.push({ at: exitEnd, opacity: 0, scale: toScale, blur, ...outOffset });
  frames.push({ at: 1, opacity: 0, scale: toScale, blur, ...outOffset });

  return frames;
}
