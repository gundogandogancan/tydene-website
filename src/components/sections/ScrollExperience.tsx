"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useStageVisuals } from "@/hooks/useStageState";
import { STAGES, SCROLL_HEIGHT } from "@/lib/stageConfig";

import { FilmGrain } from "@/components/cinematic/FilmGrain";
import { ProgressBar } from "@/components/cinematic/ProgressBar";
import { FieldBackground } from "@/components/cinematic/FieldBackground";
import { LeavesLayer } from "@/components/cinematic/LeavesLayer";
import { VineSystem } from "@/components/cinematic/VineSystem";
import { HeroTomato } from "@/components/cinematic/HeroTomato";
import { HandLayer } from "@/components/cinematic/HandLayer";
import { CrateLayer } from "@/components/cinematic/CrateLayer";
import { TruckLayer } from "@/components/cinematic/TruckLayer";
import { ImpactParticles } from "@/components/cinematic/ImpactParticles";
import { SceneText } from "@/components/cinematic/SceneText";
import { BrandReveal } from "@/components/cinematic/BrandReveal";
import { ScrollIndicator } from "@/components/cinematic/ScrollIndicator";
import { AmbientGlow } from "@/components/cinematic/AmbientGlow";
import { FlowParticles } from "@/components/cinematic/FlowParticles";
import { LightRay } from "@/components/cinematic/LightRay";

const STAGE_TEXTS = STAGES.filter((s) => s.text !== null).map((s) => s.text!);

/**
 * ScrollExperience — The cinematic film engine.
 * 13-stage tomato journey with layered atmospheric effects.
 */
export function ScrollExperience() {
  const { containerRef, progress, bgColor } = useScrollProgress();
  const v = useStageVisuals(progress);

  return (
    <>
      <FilmGrain />
      <ProgressBar progress={progress} />

      <div ref={containerRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
        <div
          className="sticky top-0 h-screen w-full overflow-hidden"
          style={{
            backgroundColor: bgColor,
            transition: "background-color 0.3s ease",
          }}
        >
          {/* ===== ATMOSPHERIC LAYERS (back to front) ===== */}

          {/* Layer 0: Ambient glow — living light that reacts to scroll */}
          <AmbientGlow progress={progress} />

          {/* Layer 1: Light ray — golden hour beam */}
          <LightRay progress={progress} />

          {/* Layer 2: Field environment */}
          <FieldBackground opacity={v.field.opacity} scale={v.field.scale} />
          <VineSystem opacity={v.vine.opacity} />
          <LeavesLayer opacity={v.leaves.opacity} translateX={v.leaves.translateX} />

          {/* Layer 3: Flow particles — organic floating dust */}
          <FlowParticles progress={progress} />

          {/* Layer 4: Atmospheric overlays — cinematic depth */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: [
                "linear-gradient(90deg, rgba(10,8,6,0.6) 0%, rgba(10,8,6,0.2) 35%, transparent 65%)",
                "linear-gradient(180deg, rgba(10,8,6,0.15) 0%, transparent 25%, transparent 75%, rgba(10,8,6,0.35) 100%)",
              ].join(","),
            }}
          />

          {/* Layer 5: Interactive elements */}
          <HandLayer x={v.hand.x} opacity={v.hand.opacity} rotation={v.hand.rotation} />
          <CrateLayer opacity={v.crate.opacity} y={v.crate.y} scale={v.crate.scale} />
          <ImpactParticles opacity={v.impact.opacity} />
          <TruckLayer
            opacity={v.truck.opacity}
            x={v.truck.x}
            roadOpacity={v.road.opacity}
            roadX={v.road.x}
          />

          {/* Layer 6: THE TOMATO — persistent protagonist */}
          <HeroTomato
            x={v.tomato.x}
            y={v.tomato.y}
            scale={v.tomato.scale}
            rotation={v.tomato.rotation}
            opacity={v.tomato.opacity}
            color={v.tomato.color}
            blur={v.tomato.blur}
            glowOpacity={v.tomato.glowOpacity}
          />

          {/* Layer 7: Text overlays */}
          {STAGE_TEXTS.map((text, i) => (
            <SceneText
              key={i}
              eyebrow={text.eyebrow}
              headline={text.headline}
              subtext={text.subtext}
              active={v.activeTexts[i] || false}
            />
          ))}

          {/* Layer 8: Brand reveal */}
          <BrandReveal opacity={v.brand.opacity} scale={v.brand.scale} />

          {/* Layer 9: UI */}
          <ScrollIndicator opacity={v.scrollIndicator.opacity} />

          {/* Stage indicator — shows current stage name */}
          {progress > 0.02 && progress < 0.93 && (
            <div
              className="absolute bottom-8 right-[5.5%] z-40 flex items-center gap-3"
              style={{
                opacity: 0.25,
                transition: "opacity 0.6s ease",
              }}
            >
              <div className="w-8 h-px bg-[#AE8C57]/40" />
              <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-[#F5EFE3]/30">
                {STAGES.find(s => progress >= s.range[0] && progress <= s.range[1])?.label || ""}
              </span>
            </div>
          )}

          {/* Vignette — cinematic edge darkening */}
          <div
            className="absolute inset-0 pointer-events-none z-[45]"
            style={{
              boxShadow: "inset 0 0 200px 60px rgba(0,0,0,0.45), inset 0 -80px 100px -30px rgba(0,0,0,0.25)",
            }}
          />
        </div>
      </div>
    </>
  );
}
