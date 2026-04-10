"use client";

interface Props {
  x: string;
  y: string;
  scale: number;
  rotation: number;
  opacity: number;
  color: string;
  blur: number;
  glowOpacity: number;
}

/**
 * HeroTomato — The persistent cinematic protagonist.
 * Multi-layered SVG with specular highlights, realistic stem,
 * ground shadow, and subtle depth cues.
 */
export function HeroTomato({ x, y, scale, rotation, opacity, color, blur, glowOpacity }: Props) {
  if (opacity <= 0) return null;

  return (
    <div
      className="absolute z-30 will-change-transform"
      style={{
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
        transition: "filter 0.3s ease",
      }}
    >
      {/* Ambient glow */}
      {glowOpacity > 0 && (
        <div
          className="absolute -inset-10 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(174,140,87,0.12) 0%, rgba(196,53,32,0.06) 40%, transparent 70%)",
            opacity: glowOpacity,
          }}
        />
      )}

      <svg viewBox="0 0 140 140" width="140" height="140">
        <defs>
          {/* Body gradient — richer color depth */}
          <radialGradient id="tBody" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor={color} stopOpacity="1" />
            <stop offset="60%" stopColor={color} stopOpacity="0.95" />
            <stop offset="100%" style={{ stopColor: "#6B1A10", stopOpacity: 0.9 }} />
          </radialGradient>

          {/* Specular highlight */}
          <radialGradient id="tSpec" cx="38%" cy="35%" r="30%">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Secondary catch light */}
          <radialGradient id="tCatch" cx="65%" cy="65%" r="25%">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Shadow */}
          <radialGradient id="tShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="black" stopOpacity="0.2" />
            <stop offset="100%" stopColor="black" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow — soft ellipse */}
        <ellipse cx="70" cy="128" rx="38" ry="7" fill="url(#tShadow)" />

        {/* Body — main form with gradient */}
        <ellipse cx="70" cy="72" rx="48" ry="46" fill="url(#tBody)" />

        {/* Subtle segment lines — realism */}
        <path d="M70 26C68 50 67 72 70 118" stroke="rgba(0,0,0,0.06)" strokeWidth="0.8" fill="none" />
        <path d="M38 45C50 55 60 72 55 110" stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" fill="none" />
        <path d="M102 45C90 55 80 72 85 110" stroke="rgba(0,0,0,0.04)" strokeWidth="0.6" fill="none" />

        {/* Specular — primary highlight */}
        <ellipse cx="52" cy="52" rx="22" ry="18" fill="url(#tSpec)" />

        {/* Catch light — secondary */}
        <ellipse cx="85" cy="82" rx="14" ry="12" fill="url(#tCatch)" />

        {/* Pinpoint specular — wet look */}
        <ellipse cx="48" cy="44" rx="6" ry="4" fill="white" opacity="0.12" />

        {/* Water droplet */}
        <ellipse cx="84" cy="64" rx="3.5" ry="5" fill="white" opacity="0.15" />
        <ellipse cx="83.5" cy="62" rx="1.5" ry="1" fill="white" opacity="0.25" />

        {/* Stem — detailed */}
        <path d="M66 28L70 25L74 28L72 36L68 36Z" fill="#3A5A20" />
        <path d="M69 25L70 19L71 25" stroke="#2D4A18" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Calyx — natural leaf shapes */}
        <path d="M62 30C54 22 46 25 49 32C52 30 58 29 62 30Z" fill="#4A7A2A" />
        <path d="M78 30C86 22 94 25 91 32C88 30 82 29 78 30Z" fill="#4A7A2A" />
        <path d="M66 27C63 16 56 12 59 22C61 19 64 24 66 27Z" fill="#3D6B22" />
        <path d="M74 27C77 16 84 12 81 22C79 19 76 24 74 27Z" fill="#3D6B22" />

        {/* Bottom shadow crescent */}
        <ellipse cx="70" cy="112" rx="36" ry="8" fill="black" opacity="0.08" />
      </svg>
    </div>
  );
}
