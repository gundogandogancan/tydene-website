"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { STAGES, SCROLL_HEIGHT } from "@/lib/stageConfig";
import { clamp01, getStageProgress, getBackgroundColor } from "@/lib/scrollMath";

export interface ScrollState {
  /** Global scroll progress 0→1 */
  progress: number;
  /** Current active stage ID */
  activeStageId: string;
  /** Local progress within the active stage 0→1 */
  stageProgress: number;
  /** Interpolated background color */
  bgColor: string;
}

/**
 * Core scroll engine.
 * Tracks scroll progress across the entire page and maps it to stage state.
 * Uses requestAnimationFrame for performance.
 */
export function useScrollProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    activeStageId: "field",
    stageProgress: 0,
    bgColor: STAGES[0].bgColor,
  });

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollH = container.scrollHeight - window.innerHeight;
    const scrolled = -rect.top;
    const progress = clamp01(scrolled / scrollH);

    // Find active stage
    let activeStage = STAGES[0];
    for (const stage of STAGES) {
      if (progress >= stage.range[0] && progress <= stage.range[1]) {
        activeStage = stage;
        break;
      }
    }
    // If past last stage start, use last stage
    if (progress > STAGES[STAGES.length - 1].range[0]) {
      activeStage = STAGES[STAGES.length - 1];
    }

    const stageProgress = getStageProgress(
      progress,
      activeStage.range[0],
      activeStage.range[1]
    );

    const bgColor = getBackgroundColor(progress, STAGES);

    setState({ progress, activeStageId: activeStage.id, stageProgress, bgColor });
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // Initial call
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return { containerRef, ...state };
}
