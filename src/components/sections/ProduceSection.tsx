"use client";
import { SectionReveal } from "@/components/ui/SectionReveal";

const categories = [
  { name: "Tomatoes", varieties: "Vine, Cherry, Beef, Plum, Heritage", accent: "#C43520" },
  { name: "Peppers", varieties: "Bell, Chilli, Romano, Padron, Scotch Bonnet", accent: "#D4A017" },
  { name: "Salad & Greens", varieties: "Lettuce, Rocket, Spinach, Kale, Watercress", accent: "#4A7A2A" },
  { name: "Citrus & Fruits", varieties: "Lemons, Limes, Oranges, Berries, Avocados", accent: "#D4A017" },
  { name: "Herbs", varieties: "Basil, Coriander, Mint, Parsley, Thyme, Rosemary", accent: "#6B8B3A" },
  { name: "Exotics", varieties: "Aubergine, Okra, Plantain, Yam, Scotch Bonnet", accent: "#8B5A8A" },
];

export function ProduceSection() {
  return (
    <section id="produce" className="relative bg-[#142A10] overflow-hidden">
      {/* Dot texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, #AE8C57 0.5px, transparent 0.5px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 px-[5.5%] py-28 md:py-36">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <SectionReveal>
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              Our Produce
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mb-8 mx-auto" />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#F5EFE3]">
              The freshest selection<br />for London&apos;s finest
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-sans text-[15px] leading-[1.7] text-[#F5EFE3]/45 mt-5 max-w-xl mx-auto">
              A comprehensive range of premium fresh produce, carefully sourced and quality-checked every single day.
            </p>
          </SectionReveal>
        </div>

        {/* Category grid — clean, minimal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <SectionReveal key={cat.name} delay={i * 0.06}>
              <div className="group relative p-7 rounded-xl bg-[#1A3414]/70 border border-[#F5EFE3]/[0.03] hover:border-[#AE8C57]/12 transition-all duration-500">
                {/* Accent dot */}
                <div
                  className="w-2 h-2 rounded-full mb-5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: cat.accent }}
                />

                <h3 className="font-serif text-lg font-bold text-[#F5EFE3] mb-2">
                  {cat.name}
                </h3>
                <p className="font-sans text-[12px] leading-[1.6] text-[#F5EFE3]/35 group-hover:text-[#F5EFE3]/50 transition-colors">
                  {cat.varieties}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.4}>
          <p className="text-center font-sans text-[12px] text-[#F5EFE3]/25 mt-14 max-w-md mx-auto tracking-wide">
            Can&apos;t find what you need? We source bespoke ingredients on request.
          </p>
        </SectionReveal>
      </div>

      <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/12 to-transparent" />
    </section>
  );
}
