"use client";
import { useMemo } from "react";

/**
 * FlowParticles — Floating dust motes and light particles.
 * Creates organic movement that gives the scene life.
 * Particles drift slowly, fading in and out.
 */
export function FlowParticles({ progress }: { progress: number }) {
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        id: i,
        baseX: (i * 37 + 13) % 100,
        baseY: (i * 53 + 7) % 100,
        size: 1.5 + (i % 4) * 0.8,
        speed: 8 + (i % 5) * 4,
        delay: i * 0.4,
        isGold: i % 3 === 0,
      });
    }
    return arr;
  }, []);

  // Visibility based on scroll stage
  const opacity = progress < 0.03 ? progress / 0.03
    : progress < 0.35 ? 1
    : progress < 0.45 ? 0.5
    : progress < 0.65 ? 0.3
    : progress < 0.85 ? 0.4
    : progress < 0.93 ? 0.5
    : 0.2;

  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[7] overflow-hidden"
      style={{ opacity, transition: "opacity 1s ease" }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.baseX}%`,
            top: `${p.baseY}%`,
            width: p.size,
            height: p.size,
            background: p.isGold
              ? "rgba(174,140,87,0.5)"
              : "rgba(245,239,227,0.2)",
            animation: `flowDrift ${p.speed}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
