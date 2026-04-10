"use client";

/**
 * FieldBackground — Multi-layered atmospheric field.
 * Creates cinematic depth with light rays, haze, and dust particles.
 */
export function FieldBackground({ opacity, scale }: { opacity: number; scale: number }) {
  if (opacity <= 0) return null;

  return (
    <div className="absolute inset-0 will-change-transform" style={{ opacity, transform: `scale(${scale})` }}>
      {/* Base field gradient — deep agricultural earth */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 70% at 55% 35%, #1A3A10 0%, transparent 65%)",
            "radial-gradient(ellipse 50% 40% at 25% 75%, #0F200D 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 30% at 80% 60%, #142A10 0%, transparent 50%)",
            "linear-gradient(175deg, #0A1408 0%, #142A10 35%, #1A3A10 55%, #1A1408 100%)",
          ].join(","),
        }}
      />

      {/* Golden hour light ray — upper left */}
      <div
        className="absolute -top-[10%] -left-[5%] w-[70%] h-[90%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 45% at 30% 20%, rgba(174,140,87,0.07) 0%, rgba(174,140,87,0.02) 40%, transparent 70%)",
          transform: "rotate(-8deg)",
        }}
      />

      {/* Secondary warm light — distant horizon */}
      <div
        className="absolute bottom-[15%] right-[10%] w-[50%] h-[40%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 70% 80%, rgba(196,53,32,0.03) 0%, transparent 60%)",
        }}
      />

      {/* Atmospheric haze layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(15,32,13,0.3) 60%, rgba(26,20,8,0.5) 100%)",
        }}
      />

      {/* Dust particles — floating in golden light */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 2 === 0 ? 3 : 2,
            height: i % 2 === 0 ? 3 : 2,
            background: i < 4 ? "rgba(174,140,87,0.35)" : "rgba(245,239,227,0.12)",
            left: `${15 + i * 9}%`,
            top: `${25 + (i % 4) * 15}%`,
            animation: `dustUp ${5.5 + i * 1.2}s ease-in-out ${i * 0.6}s infinite`,
          }}
        />
      ))}

      {/* Foreground depth shadow — bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
        style={{
          background: "linear-gradient(0deg, rgba(10,8,6,0.4) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}
