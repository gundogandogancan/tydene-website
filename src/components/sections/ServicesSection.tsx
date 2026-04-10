"use client";
import { SectionReveal } from "@/components/ui/SectionReveal";

const services = [
  {
    num: "01",
    title: "Premium Sourcing",
    desc: "Direct relationships with trusted growers across the UK and Europe. We handpick suppliers who meet our exacting quality standards.",
  },
  {
    num: "02",
    title: "Quality Packing",
    desc: "Every item is inspected, sorted, and packed with precision. Temperature-controlled handling from warehouse to your kitchen.",
  },
  {
    num: "03",
    title: "Dawn Delivery",
    desc: "Our fleet moves before London wakes. 3AM starts, precision routes, cold chain integrity. Your produce arrives when you need it.",
  },
  {
    num: "04",
    title: "Reliable Schedule",
    desc: "6 days a week, 52 weeks a year. Your business depends on consistency. Count on us, every single morning.",
  },
  {
    num: "05",
    title: "Quality Guarantee",
    desc: "Not happy? We make it right — no questions asked. Our reputation is built on trust, and we stand behind every delivery.",
  },
  {
    num: "06",
    title: "Bespoke Orders",
    desc: "Need something special? Exotic ingredients, specific quantities, last-minute additions — we adapt to your menu.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#2B221C] overflow-hidden">
      <div className="px-[5.5%] py-28 md:py-36">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <SectionReveal>
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              What We Do
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mb-8" />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#F5EFE3] max-w-2xl">
              End-to-end fresh produce<br />wholesale for London
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-sans text-[15px] leading-[1.7] text-[#F5EFE3]/45 mt-5 max-w-xl">
              From sourcing the finest produce to delivering it to your door before dawn — we handle every step of the chain.
            </p>
          </SectionReveal>
        </div>

        {/* Service grid — numbered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px max-w-6xl mx-auto bg-[#F5EFE3]/[0.04] rounded-2xl overflow-hidden">
          {services.map((service, i) => (
            <SectionReveal key={service.num} delay={i * 0.06}>
              <div className="bg-[#2B221C] p-8 md:p-9 h-full group hover:bg-[#332A22] transition-colors duration-500">
                {/* Number */}
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#AE8C57]/40 block mb-5">
                  {service.num}
                </span>

                <h3 className="font-serif text-lg md:text-xl font-bold text-[#F5EFE3] mb-3 group-hover:text-[#F5EFE3] transition-colors">
                  {service.title}
                </h3>

                <p className="font-sans text-[13px] leading-[1.75] text-[#F5EFE3]/40 group-hover:text-[#F5EFE3]/55 transition-colors">
                  {service.desc}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/12 to-transparent" />
    </section>
  );
}
