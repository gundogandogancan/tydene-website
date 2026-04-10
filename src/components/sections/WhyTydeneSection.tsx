"use client";
import { SectionReveal } from "@/components/ui/SectionReveal";

const pillars = [
  {
    number: "01",
    title: "Trust",
    desc: "Over 200 London restaurants depend on us daily. Our word is our bond — if we say it'll be there, it'll be there.",
  },
  {
    number: "02",
    title: "Freshness",
    desc: "From harvest to your kitchen in the shortest possible time. Cold chain integrity from the moment produce leaves the ground.",
  },
  {
    number: "03",
    title: "Consistency",
    desc: "Same quality, every delivery, every morning. We don't have off days — your business depends on our reliability.",
  },
  {
    number: "04",
    title: "Relationships",
    desc: "We know our growers by name. We know our clients by preference. This isn't just logistics — it's partnership.",
  },
];

const stats = [
  { value: "200+", label: "Restaurants Served" },
  { value: "22+", label: "Years Experience" },
  { value: "6", label: "Days a Week" },
  { value: "99%", label: "On-Time Delivery" },
];

export function WhyTydeneSection() {
  return (
    <section className="relative bg-[#183C2E] overflow-hidden">
      {/* Large decorative text */}
      <div className="absolute -right-16 top-1/2 -translate-y-1/2 font-serif text-[18vw] font-bold text-[#F5EFE3]/[0.012] leading-none select-none pointer-events-none">
        TY
      </div>

      <div className="relative z-10 px-[5.5%] py-28 md:py-36">
        {/* Stats row */}
        <SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto mb-28 md:mb-36">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold text-[#AE8C57] leading-none block">
                  {stat.value}
                </span>
                <p className="font-sans text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-[#F5EFE3]/30 mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* Pillars header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              Why Tydene
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mx-auto" />
          </div>
        </SectionReveal>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px max-w-5xl mx-auto bg-[#F5EFE3]/[0.04] rounded-2xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <SectionReveal key={pillar.number} delay={i * 0.08}>
              <div className="bg-[#183C2E] p-9 md:p-11 h-full hover:bg-[#1C4432] transition-colors duration-500">
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#AE8C57]/45">
                  {pillar.number}
                </span>
                <h3 className="font-serif text-2xl md:text-[1.75rem] font-bold text-[#F5EFE3] mt-3 mb-4">
                  {pillar.title}
                </h3>
                <p className="font-sans text-[13px] leading-[1.75] text-[#F5EFE3]/45">
                  {pillar.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/15 to-transparent" />
    </section>
  );
}
