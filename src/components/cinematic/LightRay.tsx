"use client";

/**
 * LightRay — Diagonal golden light beam.
 * Shifts angle and intensity with scroll progress.
 * Creates cinematic "golden hour" atmosphere in field stages,
 * and subtle ambient light in later stages.
 */
export function LightRay({ progress }: { progress: number }) {
  const p = progress;

  // Ray visibility — strongest in field/ripening, subtle elsewhere
  const opacity = p < 0.03 ? p / 0.03 * 0.3
    : p < 0.20 ? 0.3
    : p < 0.30 ? 0.3 * (1 - (p - 0.20) / 0.10)
    : p > 0.78 && p < 0.93 ? 0.1 * ((p - 0.78) / 0.15) // Subtle in London/kitchen
    : 0;

  if (opacity <= 0.01) return null;

  // Ray angle shifts with scroll
  const angle = -25 + p * 15;

  return (
    <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
      {/* Primary light ray */}
      <div
        className="absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "60%",
          height: "140%",
          background: `linear-gradient(${angle}deg, rgba(174,140,87,${opacity * 0.4}) 0%, rgba(174,140,87,${opacity * 0.15}) 30%, transparent 60%)`,
          transform: `rotate(${angle * 0.3}deg)`,
          transformOrigin: "top left",
          transition: "all 1.5s cubic-bezier(0.22,1,0.36,1)",
        }}
      />

      {/* Secondary softer ray */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "10%",
          width: "40%",
          height: "120%",
          background: `linear-gradient(${angle + 40}deg, transparent 40%, rgba(245,239,227,${opacity * 0.05}) 70%, transparent 90%)`,
          transform: `rotate(${-angle * 0.2}deg)`,
          transformOrigin: "top right",
          transition: "all 2s ease",
        }}
      />
    </div>
  );
}
