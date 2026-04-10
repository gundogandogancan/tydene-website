"use client";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { TYMonogram } from "@/components/ui/TYMonogram";

const stats = [
  { value: "Since 2003", label: "Established" },
  { value: "200+", label: "Product lines" },
  { value: "6", label: "Days a week" },
  { value: "100%", label: "Quality guaranteed" },
];

export function StorySection() {
  return (
    <section id="story" className="relative bg-[#183C2E] overflow-hidden">
      {/* Gradient bridge from hero */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#183C2E] to-transparent z-10 pointer-events-none" />

      <div className="relative z-20 px-[5.5%] pt-28 pb-28 md:pt-36 md:pb-36">
        {/* Section header — left-aligned editorial */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <SectionReveal>
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              Our Story
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mb-8" />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#F5EFE3] max-w-xl">
              Built on trust.<br />Delivered fresh.
            </h2>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left — Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            <SectionReveal delay={0.15}>
              <p className="font-sans text-[15px] leading-[1.85] text-[#F5EFE3]/65 max-w-lg">
                TYDENE was born from a simple belief: London deserves better produce.
                Not just fresher — but sourced with care, handled with respect, and
                delivered before the city wakes.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <p className="font-sans text-[15px] leading-[1.85] text-[#F5EFE3]/65 max-w-lg">
                Every morning at 3AM, our team begins the day&apos;s journey — inspecting,
                sorting, and loading produce that meets our exacting standards. We work
                with trusted growers who share our commitment to quality, building
                relationships that span seasons and years.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.35}>
              <p className="font-sans text-[15px] leading-[1.85] text-[#F5EFE3]/65 max-w-lg">
                From Borough Market kitchens to Mayfair restaurants, our clients trust us
                because we never compromise. Every crate we deliver is a promise kept.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.45}>
              <div className="flex items-center gap-4 pt-6">
                <div className="w-14 h-px bg-[#AE8C57]/30" />
                <span className="font-serif text-base italic text-[#AE8C57]/70">From Soil to Supply</span>
              </div>
            </SectionReveal>
          </div>

          {/* Right — Stats card (5 cols) */}
          <div className="lg:col-span-5">
            <SectionReveal delay={0.2} direction="right">
              <div className="relative rounded-2xl bg-[#0F2A1E] p-9 md:p-12 border border-[#F5EFE3]/[0.04]">
                {/* Watermark */}
                <div className="absolute top-6 right-6 opacity-[0.03]">
                  <TYMonogram size={120} color="#F5EFE3" />
                </div>

                <div className="relative z-10">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#AE8C57]/70">
                    The numbers
                  </span>

                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 mt-10">
                    {stats.map((stat, i) => (
                      <SectionReveal key={stat.label} delay={0.3 + i * 0.08}>
                        <div>
                          <span className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-[#F5EFE3] leading-none block">
                            {stat.value}
                          </span>
                          <p className="font-sans text-[12px] text-[#F5EFE3]/35 mt-2 tracking-wide">
                            {stat.label}
                          </p>
                        </div>
                      </SectionReveal>
                    ))}
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/15 to-transparent" />
    </section>
  );
}
