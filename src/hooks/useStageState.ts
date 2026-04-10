"use client";

import { useMemo } from "react";
import { STAGES, type TomatoState } from "@/lib/stageConfig";
import { lerp, clamp01, getStageProgress, gravityEase, getTomatoColor } from "@/lib/scrollMath";

function lerpState(a: TomatoState, b: TomatoState, t: number): TomatoState {
  return {
    x: t < 0.5 ? a.x : b.x,
    y: a.y,
    scale: lerp(a.scale, b.scale, t),
    rotation: lerp(a.rotation, b.rotation, t),
    opacity: lerp(a.opacity, b.opacity, t),
    hueShift: lerp(a.hueShift, b.hueShift, t),
    blur: lerp(a.blur, b.blur, t),
    glowOpacity: lerp(a.glowOpacity, b.glowOpacity, t),
  };
}

export interface StageVisuals {
  tomato: {
    x: string; y: string; scale: number; rotation: number;
    opacity: number; color: string; blur: number; glowOpacity: number;
  };
  field: { opacity: number; scale: number };
  leaves: { opacity: number; translateX: number };
  vine: { opacity: number };
  hand: { x: string; opacity: number; rotation: number };
  crate: { opacity: number; y: string; scale: number };
  truck: { opacity: number; x: string };
  road: { opacity: number; x: string };
  brand: { opacity: number; scale: number };
  impact: { opacity: number };
  scrollIndicator: { opacity: number };
  activeTexts: boolean[];
}

/**
 * Derives ALL visual state from a single progress number.
 * Expanded for 13-stage cinematic system.
 */
export function useStageVisuals(progress: number): StageVisuals {
  return useMemo(() => {
    const p = progress;

    // ---- TOMATO STATE ----
    let tomatoState: TomatoState = STAGES[0].tomato.start;
    for (const stage of STAGES) {
      const [s, e] = stage.range;
      if (p >= s && p <= e) {
        const t = getStageProgress(p, s, e);

        if (stage.id === "drop") {
          const dropT = gravityEase(t);
          const startY = parseFloat(stage.tomato.start.y);
          const endY = parseFloat(stage.tomato.end.y);
          tomatoState = lerpState(stage.tomato.start, stage.tomato.end, t);
          tomatoState.y = `${lerp(startY, endY, dropT)}%`;
          tomatoState.blur = t > 0.15 && t < 0.85 ? lerp(0, 2, Math.sin(t * Math.PI)) : 0;
        } else {
          tomatoState = lerpState(stage.tomato.start, stage.tomato.end, t);
          const startY = parseFloat(stage.tomato.start.y);
          const endY = parseFloat(stage.tomato.end.y);
          tomatoState.y = `${lerp(startY, endY, t)}%`;
          const startX = parseFloat(stage.tomato.start.x);
          const endX = parseFloat(stage.tomato.end.x);
          tomatoState.x = `${lerp(startX, endX, t)}%`;
        }
        break;
      }
    }

    // ---- FIELD ----
    const fieldOpacity = p < 0.03 ? lerp(0.5, 1, p / 0.03)
      : p < 0.15 ? lerp(1, 0.7, (p - 0.03) / 0.12)
      : p < 0.22 ? lerp(0.7, 0, (p - 0.15) / 0.07)
      : 0;
    const fieldScale = lerp(1, 1.15, Math.min(1, p / 0.22));

    // ---- LEAVES ----
    const leavesOpacity = p < 0.12 ? 1 : p < 0.20 ? lerp(1, 0, (p - 0.12) / 0.08) : 0;
    const leavesTranslateX = lerp(0, 150, clamp01((p - 0.10) / 0.10));

    // ---- VINE ----
    const vineOpacity = p < 0.25 ? 1 : p < 0.30 ? lerp(1, 0, (p - 0.25) / 0.05) : 0;

    // ---- HAND ----
    let handX = "110%", handOpacity = 0, handRotation = 0;
    if (p >= 0.20 && p < 0.36) {
      const t = clamp01((p - 0.20) / 0.06);
      handX = `${lerp(110, 52, t)}%`;
      handOpacity = Math.min(1, t * 2.5);
      handRotation = p > 0.30 ? lerp(0, 15, clamp01((p - 0.30) / 0.04)) : 0;
    }

    // ---- CRATE ----
    let crateOpacity = 0, crateY = "85%", crateScale = 0.8;
    if (p >= 0.44 && p < 0.56) {
      crateOpacity = clamp01((p - 0.44) / 0.03);
      crateY = `${lerp(85, 68, clamp01((p - 0.44) / 0.05))}%`;
      crateScale = lerp(0.8, 1, clamp01((p - 0.44) / 0.05));
    }

    // ---- TRUCK + ROAD ----
    let truckOpacity = 0, truckX = "-20%", roadOpacity = 0, roadX = "0%";
    if (p >= 0.58 && p < 0.74) {
      truckOpacity = p < 0.62 ? clamp01((p - 0.58) / 0.04) : p > 0.71 ? lerp(1, 0, (p - 0.71) / 0.03) : 1;
      truckX = `${lerp(-20, 60, clamp01((p - 0.60) / 0.12))}%`;
      roadOpacity = truckOpacity;
      roadX = `${lerp(0, -200, clamp01((p - 0.60) / 0.12))}%`;
    }

    // ---- BRAND REVEAL ----
    const brandOpacity = p >= 0.93 ? clamp01((p - 0.93) / 0.04) : 0;
    const brandScale = p >= 0.93 ? lerp(0.7, 1, clamp01((p - 0.93) / 0.06)) : 0.7;

    // ---- IMPACT ----
    const impactOpacity = (p >= 0.39 && p < 0.42) ? lerp(0, 1, (p - 0.39) / 0.01) * (p < 0.41 ? 1 : lerp(1, 0, (p - 0.41) / 0.01)) : 0;

    // ---- SCROLL INDICATOR ----
    const scrollIndicatorOpacity = p < 0.03 ? 1 : p < 0.05 ? lerp(1, 0, (p - 0.03) / 0.02) : 0;

    // ---- TEXT VISIBILITY ----
    // Map stages with text to visibility ranges
    const textsWithRanges = STAGES.filter(s => s.text !== null);
    const activeTexts = textsWithRanges.map(stage => {
      const [a, b] = stage.range;
      return p >= a && p < b + 0.03;
    });

    return {
      tomato: {
        x: tomatoState.x,
        y: tomatoState.y,
        scale: tomatoState.scale,
        rotation: tomatoState.rotation,
        opacity: tomatoState.opacity,
        color: getTomatoColor(tomatoState.hueShift),
        blur: tomatoState.blur,
        glowOpacity: tomatoState.glowOpacity,
      },
      field: { opacity: fieldOpacity, scale: fieldScale },
      leaves: { opacity: leavesOpacity, translateX: leavesTranslateX },
      vine: { opacity: vineOpacity },
      hand: { x: handX, opacity: handOpacity, rotation: handRotation },
      crate: { opacity: crateOpacity, y: crateY, scale: crateScale },
      truck: { opacity: truckOpacity, x: truckX },
      road: { opacity: roadOpacity, x: roadX },
      brand: { opacity: brandOpacity, scale: brandScale },
      impact: { opacity: impactOpacity },
      scrollIndicator: { opacity: scrollIndicatorOpacity },
      activeTexts,
    };
  }, [progress]);
}
