"use client";

/**
 * ImpactParticles — Subtle dust puff on tomato landing.
 * NOT flashy. Barely-there gold dust that settles.
 * 8 particles in a soft arc, varying size and opacity.
 */
export function ImpactParticles({ opacity }: { opacity: number }) {
  if (opacity <= 0) return null;

  const particles = [
    { angle: 0, dist: 35, size: 3, o: 0.4 },
    { angle: 0.8, dist: 45, size: 2, o: 0.3 },
    { angle: 1.6, dist: 30, size: 3.5, o: 0.5 },
    { angle: 2.4, dist: 50, size: 2, o: 0.25 },
    { angle: 3.2, dist: 38, size: 2.5, o: 0.35 },
    { angle: 4.0, dist: 42, size: 3, o: 0.3 },
    { angle: 4.8, dist: 32, size: 2, o: 0.4 },
    { angle: 5.6, dist: 48, size: 1.5, o: 0.2 },
  ];

  return (
    <div
      className="absolute inset-0 z-[22] pointer-events-none"
      style={{
        opacity,
        transition: "opacity 0.15s ease",
      }}
    >
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: i % 3 === 0 ? "#AE8C57" : "#F5EFE3",
            opacity: p.o,
            left: `calc(50% + ${Math.cos(p.angle) * p.dist}px)`,
            top: `calc(72% + ${Math.sin(p.angle) * (p.dist * 0.5)}px)`,
            filter: "blur(0.5px)",
          }}
        />
      ))}

      {/* Soft dust cloud — barely visible */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: "70%",
          width: 80,
          height: 20,
          background: "radial-gradient(ellipse, rgba(174,140,87,0.08) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
