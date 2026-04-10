"use client";

/**
 * HandLayer — Harvesting hand reaching for the tomato.
 * More detailed with finger articulation and skin tone depth.
 */
export function HandLayer({ x, opacity, rotation }: { x: string; opacity: number; rotation: number }) {
  if (opacity <= 0) return null;

  return (
    <div
      className="absolute top-[28%] z-[25] will-change-transform"
      style={{
        right: x,
        opacity,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center bottom",
        transition: "opacity 0.4s ease",
      }}
    >
      <svg width="110" height="150" viewBox="0 0 130 170">
        {/* Forearm */}
        <path
          d="M65 160C55 155 50 145 48 130L42 105C38 90 36 75 38 60C40 45 48 30 60 18C72 30 82 45 84 60C86 75 84 90 80 105L74 130C72 145 68 155 65 160Z"
          fill="#C4A080"
        />
        {/* Skin depth shadow */}
        <path
          d="M55 60C50 75 48 95 50 115"
          stroke="#A88060"
          strokeWidth="1.2"
          fill="none"
          opacity="0.25"
        />
        <path
          d="M65 45C63 65 60 90 62 120"
          stroke="#A88060"
          strokeWidth="0.8"
          fill="none"
          opacity="0.2"
        />
        {/* Finger tips — subtle articulation */}
        <ellipse cx="52" cy="22" rx="8" ry="12" fill="#CBA888" opacity="0.7" />
        <ellipse cx="65" cy="15" rx="7" ry="14" fill="#CBA888" opacity="0.8" />
        <ellipse cx="78" cy="22" rx="8" ry="12" fill="#CBA888" opacity="0.7" />
        {/* Knuckle highlights */}
        <ellipse cx="55" cy="55" rx="4" ry="3" fill="white" opacity="0.04" />
        <ellipse cx="75" cy="55" rx="4" ry="3" fill="white" opacity="0.04" />
      </svg>
    </div>
  );
}
