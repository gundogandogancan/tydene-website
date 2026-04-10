"use client";

/**
 * AmbientGlow — Scroll-reactive radial light system.
 * Creates living, breathing atmospheric light that shifts
 * position, color, size, and intensity based on scroll progress.
 * This is the "soul" of the cinematic feel.
 */
export function AmbientGlow({ progress }: { progress: number }) {
  const p = progress;

  // Primary glow — warm gold, shifts position with scroll
  const primaryX = 55 + Math.sin(p * Math.PI * 3) * 15;
  const primaryY = 35 + Math.cos(p * Math.PI * 2) * 20;
  const primarySize = 35 + p * 15;
  const primaryOpacity = p < 0.05 ? p * 4 : p < 0.4 ? 0.2 : p < 0.6 ? 0.12 : p < 0.9 ? 0.15 : 0.08;

  // Determine glow color based on stage
  let primaryColor = "rgba(174,140,87,"; // gold
  if (p > 0.62 && p < 0.78) primaryColor = "rgba(100,120,180,"; // cool blue for transport/global
  if (p > 0.86) primaryColor = "rgba(24,60,46,"; // green for kitchen/tydene

  // Secondary glow — tomato red accent, opposite side
  const secX = 30 + Math.cos(p * Math.PI * 2.5) * 20;
  const secY = 60 + Math.sin(p * Math.PI * 1.8) * 15;
  const secOpacity = p > 0.15 && p < 0.55 ? 0.08 : 0;

  // Warm horizon glow — bottom edge
  const horizonOpacity = p < 0.3 ? 0.15 : p < 0.5 ? 0.08 : 0.04;

  return (
    <div className="absolute inset-0 pointer-events-none z-[8] overflow-hidden">
      {/* Primary atmospheric glow */}
      <div
        className="absolute rounded-full will-change-transform"
        style={{
          left: `${primaryX}%`,
          top: `${primaryY}%`,
          width: `${primarySize}vw`,
          height: `${primarySize}vw`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(ellipse, ${primaryColor}${primaryOpacity}) 0%, ${primaryColor}0) 70%)`,
          filter: "blur(60px)",
          transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Secondary tomato accent glow */}
      {secOpacity > 0 && (
        <div
          className="absolute rounded-full"
          style={{
            left: `${secX}%`,
            top: `${secY}%`,
            width: "25vw",
            height: "25vw",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(ellipse, rgba(196,53,32,${secOpacity}) 0%, rgba(196,53,32,0) 65%)`,
            filter: "blur(50px)",
            transition: "all 1s ease",
          }}
        />
      )}

      {/* Warm horizon — bottom edge atmospheric light */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          background: `linear-gradient(0deg, rgba(174,140,87,${horizonOpacity}) 0%, transparent 100%)`,
          transition: "opacity 1.2s ease",
        }}
      />

      {/* Cool top wash — night sky for transport stages */}
      {p > 0.56 && p < 0.82 && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "40%",
            background: `linear-gradient(180deg, rgba(20,20,50,${0.15 * Math.min(1, (p - 0.56) / 0.06)}) 0%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
}
