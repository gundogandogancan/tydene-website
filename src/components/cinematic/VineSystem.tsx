"use client";

/**
 * VineSystem — Organic vine structure in the field.
 * More detailed with tendrils and subtle leaf attachments.
 */
export function VineSystem({ opacity }: { opacity: number }) {
  if (opacity <= 0) return null;

  return (
    <svg
      className="absolute top-0 left-[38%] w-[32%] h-[65%] pointer-events-none"
      style={{ opacity, transition: "opacity 0.5s ease" }}
      viewBox="0 0 200 400"
      preserveAspectRatio="none"
    >
      {/* Main vine */}
      <path
        d="M100 0C95 80,112 160,100 240C88 300,105 360,100 400"
        stroke="#2D4A1E"
        strokeWidth="2.5"
        fill="none"
        opacity="0.45"
      />

      {/* Branch left */}
      <path
        d="M100 100C80 120,55 135,35 130"
        stroke="#2D4A1E"
        strokeWidth="1.8"
        fill="none"
        opacity="0.35"
      />

      {/* Branch right */}
      <path
        d="M100 200C125 215,155 220,175 212"
        stroke="#2D4A1E"
        strokeWidth="1.8"
        fill="none"
        opacity="0.35"
      />

      {/* Tendril — small curl */}
      <path
        d="M98 150C90 148,85 152,88 158C92 155,95 152,98 150"
        stroke="#2D4A1E"
        strokeWidth="1"
        fill="none"
        opacity="0.25"
      />

      {/* Tendril — right side */}
      <path
        d="M102 260C110 258,115 262,112 268C108 265,105 262,102 260"
        stroke="#2D4A1E"
        strokeWidth="1"
        fill="none"
        opacity="0.25"
      />

      {/* Subtle leaf nodes */}
      <ellipse cx="35" cy="128" rx="8" ry="5" fill="#2D5A1E" opacity="0.2" transform="rotate(-20 35 128)" />
      <ellipse cx="175" cy="210" rx="8" ry="5" fill="#2D5A1E" opacity="0.2" transform="rotate(15 175 210)" />
    </svg>
  );
}
