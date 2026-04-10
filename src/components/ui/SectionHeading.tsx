"use client";
import { SectionReveal } from "./SectionReveal";

interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  sub?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeading({ eyebrow, headline, sub, align = "center", light = false }: SectionHeadingProps) {
  const textAlign = align === "center" ? "text-center" : "text-left";
  const mx = align === "center" ? "mx-auto" : "";

  return (
    <div className={`${textAlign} mb-16 md:mb-20`}>
      <SectionReveal>
        <span className="font-sans text-xs font-medium tracking-[0.25em] uppercase text-[#AE8C57]">
          {eyebrow}
        </span>
        <div className={`w-10 h-[2px] bg-[#AE8C57] mt-3 mb-6 ${mx} ${align === "left" ? "" : "mx-auto"}`} />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <h2 className={`font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] tracking-tight ${light ? "text-[#F5EFE3]" : "text-[#F5EFE3]"}`}>
          {headline}
        </h2>
      </SectionReveal>
      {sub && (
        <SectionReveal delay={0.2}>
          <p className={`font-sans text-base md:text-lg leading-relaxed mt-5 max-w-2xl ${mx} ${light ? "text-[#F5EFE3]/60" : "text-[#F5EFE3]/55"}`}>
            {sub}
          </p>
        </SectionReveal>
      )}
    </div>
  );
}
