"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const testimonials = [
  {
    quote: "TYDENE transformed our kitchen operations. The consistency and quality of their produce means we can plan our menus with absolute confidence.",
    name: "James Crawford",
    role: "Head Chef",
    venue: "The Ivy Collection",
  },
  {
    quote: "At 5AM when we open our deliveries, we know exactly what to expect. That reliability is priceless in this industry.",
    name: "Sarah Mitchell",
    role: "Executive Chef",
    venue: "Ottolenghi",
  },
  {
    quote: "They sourced heritage tomatoes for us that we couldn't find anywhere else in London. Their network of growers is exceptional.",
    name: "Marco De Luca",
    role: "Owner & Chef",
    venue: "Bocca di Lupo",
  },
  {
    quote: "We switched to TYDENE two years ago and haven't looked back. Fresher produce, better prices, and a team that genuinely cares.",
    name: "Priya Sharma",
    role: "Procurement Manager",
    venue: "Dishoom",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#2B221C] overflow-hidden">
      <div className="px-[5.5%] py-28 md:py-36">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              Trusted By London&apos;s Best
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mx-auto" />
          </div>
        </SectionReveal>

        <div className="max-w-3xl mx-auto">
          <SectionReveal delay={0.15}>
            <div className="relative min-h-[260px] md:min-h-[220px] flex items-center justify-center">
              {/* Decorative quote mark */}
              <div className="absolute -top-2 left-0 md:left-4 font-serif text-[7rem] leading-none text-[#AE8C57]/[0.06] select-none pointer-events-none">
                &ldquo;
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center px-4 md:px-8"
                >
                  <blockquote className="font-serif text-[clamp(1.15rem,2.5vw,1.5rem)] leading-[1.55] text-[#F5EFE3]/80 italic">
                    &ldquo;{testimonials[active].quote}&rdquo;
                  </blockquote>

                  <div className="mt-8 flex flex-col items-center gap-1.5">
                    <p className="font-sans text-[13px] font-semibold text-[#F5EFE3]/80">
                      {testimonials[active].name}
                    </p>
                    <p className="font-sans text-[11px] text-[#F5EFE3]/30">
                      {testimonials[active].role} — {testimonials[active].venue}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </SectionReveal>

          {/* Navigation */}
          <SectionReveal delay={0.25}>
            <div className="flex justify-center gap-2.5 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-[3px] rounded-full transition-all duration-500 cursor-pointer border-none ${
                    i === active
                      ? "bg-[#AE8C57] w-8"
                      : "bg-[#F5EFE3]/10 w-4 hover:bg-[#F5EFE3]/20"
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>

      <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/12 to-transparent" />
    </section>
  );
}
