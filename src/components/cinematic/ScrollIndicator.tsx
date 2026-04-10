"use client";

/**
 * ScrollIndicator — Minimal, elegant prompt to scroll.
 * Fades out quickly as user begins scrolling.
 */
export function ScrollIndicator({ opacity }: { opacity: number }) {
  if (opacity <= 0) return null;

  return (
    <div
      className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3"
      style={{
        opacity,
        transition: "opacity 0.6s ease",
      }}
    >
      <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-[#F5EFE3]/20">
        Scroll to explore
      </span>
      {/* Animated line */}
      <div className="relative w-px h-8 bg-[#F5EFE3]/10 overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 w-full bg-[#AE8C57]/40 rounded-full"
          style={{
            height: "40%",
            animation: "scrollPulse 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      </div>
    </div>
  );
}
