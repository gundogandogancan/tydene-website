// ==========================================
// TYDENE — Scroll Math Utilities
// Pure functions, no side effects.
// ==========================================

/** Linear interpolation */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * clamp01(t);
}

/** Clamp value between 0 and 1 */
export function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/** Map a value from one range to another */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/** Get local progress (0→1) within a stage range */
export function getStageProgress(
  globalProgress: number,
  stageStart: number,
  stageEnd: number
): number {
  return clamp01((globalProgress - stageStart) / (stageEnd - stageStart));
}

/** Parse hex color to RGB */
export function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

/** Interpolate between two hex colors */
export function lerpColor(colorA: string, colorB: string, t: number): string {
  const [r1, g1, b1] = hexToRgb(colorA);
  const [r2, g2, b2] = hexToRgb(colorB);
  const r = Math.round(lerp(r1, r2, t));
  const g = Math.round(lerp(g1, g2, t));
  const b = Math.round(lerp(b1, b2, t));
  return `rgb(${r},${g},${b})`;
}

/** Get interpolated background color from stage array */
export function getBackgroundColor(
  progress: number,
  stages: { range: [number, number]; bgColor: string }[]
): string {
  for (let i = 0; i < stages.length - 1; i++) {
    if (progress >= stages[i].range[0] && progress <= stages[i + 1].range[0]) {
      const t = mapRange(
        progress,
        stages[i].range[0],
        stages[i + 1].range[0],
        0,
        1
      );
      return lerpColor(stages[i].bgColor, stages[i + 1].bgColor, clamp01(t));
    }
  }
  return stages[stages.length - 1].bgColor;
}

/**
 * Gravity easing for the drop — cubic-bezier(0.55, 0, 1, 0.45) spirit.
 * Accelerates naturally like a real falling object, then micro-settles.
 */
export function gravityEase(t: number): number {
  if (t < 0.85) {
    // Acceleration phase — quadratic ease-in
    const norm = t / 0.85;
    return norm * norm * 0.92;
  }
  // Settle phase — slight overshoot then ease back
  const settle = (t - 0.85) / 0.15;
  const base = 0.92;
  const overshoot = Math.sin(settle * Math.PI) * 0.04;
  return base + settle * (1 - base) + overshoot;
}

/** Get tomato HSL color based on hue shift (0 = red, 40 = green-ish) */
export function getTomatoColor(hueShift: number): string {
  const h = 12 + hueShift;
  const s = 70 + (1 - hueShift / 40) * 15;
  const l = 35 + (hueShift / 40) * 15;
  return `hsl(${h},${s}%,${l}%)`;
}
