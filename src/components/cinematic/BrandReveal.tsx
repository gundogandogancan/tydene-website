"use client";
import { TYMonogram } from "@/components/ui/TYMonogram";

interface Props {
  opacity: number;
  scale: number;
}

/**
 * BrandReveal — The cinematic payoff. Stage 08.
 * Premium brand resolution with clear CTA hierarchy.
 * Must feel confident, restrained, and expensive.
 */
export function BrandReveal({ opacity, scale }: Props) {
  if (opacity <= 0) return null;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center z-[35]"
      style={{
        opacity,
        transform: `scale(${scale})`,
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Subtle radial backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(174,140,87,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Monogram */}
        <div className="mb-5">
          <TYMonogram color="#F5EFE3" size={52} />
        </div>

        {/* Brand name — hero typography */}
        <h1 className="font-serif text-[clamp(2.5rem,7vw,5rem)] font-bold text-[#F5EFE3] tracking-[0.14em] leading-none">
          TYDENE
        </h1>

        {/* Gold rule */}
        <div className="w-16 h-[1.5px] bg-[#AE8C57] mt-5 mb-4" />

        {/* Descriptor */}
        <p className="font-sans text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#6B7750]">
          Fresh Produce Wholesalers
        </p>

        {/* Tagline */}
        <p className="font-serif text-lg md:text-xl italic mt-6 text-[#F5EFE3]/50">
          Built on Trust. Delivered Fresh.
        </p>

        {/* CTA pair */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-10">
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-sans font-semibold text-[13px] tracking-[0.02em] bg-[#AE8C57] text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline"
          >
            Get in Touch
          </a>
          <a
            href="#story"
            className="px-8 py-3.5 rounded-full font-sans text-[13px] tracking-[0.02em] border border-[#F5EFE3]/20 text-[#F5EFE3]/70 hover:border-[#F5EFE3]/40 hover:text-[#F5EFE3] transition-all no-underline"
          >
            Our Story
          </a>
        </div>
      </div>
    </div>
  );
}
