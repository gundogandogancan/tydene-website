"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   TYDENE — GOD MODE CINEMATIC WEBSITE
   From Soil to Supply
   ═══════════════════════════════════════════════════════════ */

/* ─── 10 CINEMATIC STAGES ─── */
const stages = [
  { id:"field",  img:"/images/stages/01-field.jpg",    ey:"LONDON'S TRUSTED WHOLESALE PARTNER", h:"From Soil\nto Supply.", tx:"Premium fresh produce, delivered with precision.\nSupplying London's finest kitchens since 2003.", s:0, e:.1 },
  { id:"ripen",  img:"/images/stages/02-ripening.jpg",  ey:"RIPENING", h:"Nature's\nbest work.", tx:"Sun, patience, care. The product earns\nits colour before its journey.", s:.1, e:.2 },
  { id:"select", img:"/images/stages/03-selection.jpg",  ey:"SELECTION", h:"Chosen\nby hand.", tx:"Every tomato is inspected, touched, chosen.\nQuality begins with what gets selected.", s:.2, e:.3 },
  { id:"detach", img:"/images/stages/04-detach.jpg",     ey:"THE JOURNEY BEGINS", h:"Picked from\nthe vine.", tx:"A gentle twist. A careful pull.\nThe journey begins the moment it leaves.", s:.3, e:.38 },
  { id:"drop",   img:"/images/stages/05-drop.jpg",       ey:"CINEMATIC DROP", h:"Then everything\nmoves.", tx:"Nature becomes supply chain.\nFrom hand to crate to city.", s:.38, e:.46 },
  { id:"sort",   img:"/images/stages/06-sorting.jpg",    ey:"QUALITY CONTROL", h:"Inspected.\nSorted.\nApproved.", tx:"Colour, firmness, freshness — checked.\nOnly the best make the cut.", s:.46, e:.54 },
  { id:"pack",   img:"/images/stages/07-packing.jpg",    ey:"PACKING", h:"Crated with\nprecision.", tx:"Wooden crates, careful stacking.\nEvery crate is a promise.", s:.54, e:.62 },
  { id:"truck",  img:"/images/stages/08-truck.jpg",      ey:"TRANSPORT", h:"Moving\nbefore dawn.", tx:"Midnight starts. Cold chains. Precision routes.\nLondon doesn't wait.", s:.62, e:.72 },
  { id:"air",    img:"/images/stages/10-air.jpg",        ey:"GLOBAL REACH", h:"Air freight.\nGlobal chain.", tx:"When the season demands it, cargo moves by air.\nFreshness has no borders.", s:.72, e:.82 },
  { id:"london", img:"/images/stages/12-london.jpg",     ey:"LONDON ARRIVAL", h:"London\nawakens.", tx:"New Spitalfields Market stirs.\nRestaurants prep. The city is hungry.", s:.82, e:.92 },
];

/* ─── GOOGLE REVIEWS DATA ─── */
const reviews = [
  { name: "Marco Ricci", role: "Executive Chef — Mayfair", stars: 5, text: "TYDENE transformed our kitchen operations. The consistency means we plan menus with absolute confidence." },
  { name: "Sarah Chen", role: "Head Chef — Borough Market", stars: 5, text: "Freshest produce I've worked with in 15 years. They deliver before we even open, every single morning." },
  { name: "James Crawford", role: "Restaurant Owner — Soho", stars: 5, text: "We switched to TYDENE two years ago. Haven't looked back. Their quality control is exceptional." },
  { name: "Amara Osei", role: "Catering Director — Canary Wharf", stars: 5, text: "For large-scale events, reliability is everything. TYDENE has never let us down. Not once." },
  { name: "David Park", role: "Sous Chef — Shoreditch", stars: 5, text: "The exotic produce range is unmatched. Scotch bonnets, plantain, okra — always fresh, always available." },
  { name: "Elena Volkov", role: "Hotel F&B Manager — Kensington", stars: 5, text: "Premium quality at wholesale prices. Our guests notice the difference. That says everything." },
];

/* ─── SCENE BACKGROUND — full screen crossfading photos ─── */
function Scene({ p, s, e, img, idx }: { p: MotionValue<number>; s: number; e: number; img: string; idx: number }) {
  const isFirst = idx === 0;
  const o = useTransform(p,
    isFirst ? [0, e - .01, e + .015] : [s - .025, s, e - .01, e + .015],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const scale = useTransform(p, [s, e], idx % 2 === 0 ? [1, 1.12] : [1.1, 1]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity: o, zIndex: 2 + idx }}>
      <motion.div className="h-full w-full" style={{ scale }}>
        <Image src={img} alt="" fill className="object-cover" sizes="100vw" priority={idx < 3} />
      </motion.div>
      {/* Single subtle gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
    </motion.div>
  );
}

/* ─── SCENE TEXT ─── */
function SText({ p, s, e, ey, h, tx, isFirst }: { p: MotionValue<number>; s: number; e: number; ey: string; h: string; tx: string; isFirst: boolean }) {
  const o = useTransform(p,
    isFirst ? [0, e - .025, e] : [s, s + .02, e - .025, e],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(p, isFirst ? [0, .001] : [s, s + .03], [isFirst ? 0 : 50, 0]);

  return (
    <motion.div className="absolute left-[5%] top-[20%] z-[60] max-w-[40rem] px-5 sm:left-[6%] sm:px-0 md:top-[22%]" style={{ opacity: o, y }}>
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[.35em] text-[#AE8C57]">{ey}</div>
      <div className="mb-5 h-[1.5px] w-10 bg-[#AE8C57]/60" />
      <h2 className="whitespace-pre-line font-serif text-[clamp(2.5rem,7vw,5.2rem)] font-semibold leading-[.88] tracking-[-.03em] text-white" style={{ textShadow: "0 2px 30px rgba(0,0,0,.6)" }}>{h}</h2>
      <p className="mt-5 max-w-[28rem] whitespace-pre-line text-[15px] leading-[1.9] text-white/60" style={{ textShadow: "0 1px 10px rgba(0,0,0,.5)" }}>{tx}</p>
    </motion.div>
  );
}

/* ─── BRAND FINAL ─── */
function BrandFinal({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.92, .97, 1], [0, 1, 1]);
  const s = useTransform(p, [.92, .97], [.88, 1]);
  const bgO = useTransform(p, [.9, .95], [0, 1]);

  return (<>
    <motion.div className="absolute inset-0 z-[80]" style={{ opacity: bgO, background: "radial-gradient(ellipse 80% 70% at 50% 50%, #0e3528, #040a06)" }} />
    <motion.div className="pointer-events-none absolute inset-0 z-[90] flex flex-col items-center justify-center px-6 text-center" style={{ opacity: o, scale: s }}>
      <div className="font-serif text-[clamp(3.5rem,10vw,7rem)] tracking-[.2em] text-white">TYDENE</div>
      <div className="my-4 h-px w-20 bg-[#AE8C57]" />
      <div className="text-[10px] uppercase tracking-[.4em] text-[#6B7750]">Fresh Produce Wholesalers · London</div>
      <div className="mt-4 font-serif text-lg italic text-white/45 sm:text-xl">Built on Trust. Delivered Fresh.</div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a className="pointer-events-auto rounded-full bg-[#AE8C57] px-9 py-4 text-sm font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline" href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a className="pointer-events-auto rounded-full border border-white/20 px-9 py-4 text-sm text-white/70 hover:border-white/40 transition-colors no-underline" href="#contact">Get in Touch →</a>
      </div>
    </motion.div>
  </>);
}

/* ─── REVEAL WRAPPER ─── */
function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }}
      animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay }}>
      {children}
    </motion.div>
  );
}

/* ─── REVIEW CARD ─── */
function ReviewCard({ review, delay = 0 }: { review: typeof reviews[0]; delay?: number }) {
  return (
    <R delay={delay}>
      <div className="flex h-full flex-col rounded-2xl border border-white/[.06] bg-white/[.03] p-8 backdrop-blur-sm">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: review.stars }).map((_, i) => (
            <svg key={i} className="h-4 w-4 text-[#AE8C57]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          ))}
        </div>
        <p className="flex-1 font-serif text-[15px] italic leading-[1.7] text-white/65">&ldquo;{review.text}&rdquo;</p>
        <div className="mt-6 border-t border-white/[.06] pt-4">
          <div className="text-[13px] font-semibold text-white/75">{review.name}</div>
          <div className="mt-1 text-[11px] text-white/30">{review.role}</div>
        </div>
      </div>
    </R>
  );
}

/* ─── REVIEW MARQUEE ─── sliding reviews ─── */
function ReviewMarquee() {
  const doubled = [...reviews, ...reviews];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#0e3528] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#0e3528] to-transparent" />
      <motion.div className="flex gap-6" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
        {doubled.map((r, i) => (
          <div key={i} className="w-[340px] shrink-0 rounded-xl border border-white/[.05] bg-white/[.02] p-6">
            <div className="mb-3 flex gap-1">{Array.from({ length: r.stars }).map((_, j) => <svg key={j} className="h-3.5 w-3.5 text-[#AE8C57]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
            <p className="text-[13px] italic leading-[1.6] text-white/55">&ldquo;{r.text}&rdquo;</p>
            <div className="mt-4 text-[12px] font-medium text-white/45">{r.name}</div>
            <div className="text-[10px] text-white/25">{r.role}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const pw = useTransform(p, v => `${v * 100}%`);

  return (
    <div className="min-h-screen bg-[#040a06] text-white">

      {/* ── Progress bar ── */}
      <motion.div className="fixed left-0 top-0 z-[200] h-[2px]" style={{ width: pw, background: "linear-gradient(90deg, #AE8C57, #C43520 60%, #AE8C57)" }} />

      {/* ── Film grain ── */}
      <div className="pointer-events-none fixed inset-0 z-[190] opacity-[.02] mix-blend-overlay [background-size:200px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── Navigation ── */}
      <header className="fixed inset-x-0 top-0 z-[180] flex h-[72px] items-center justify-between px-[5%]" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.5) 0%, transparent 100%)" }}>
        <a href="#" className="flex items-center gap-2.5 text-[13px] font-bold tracking-[.22em] text-white no-underline">
          <svg viewBox="0 0 100 130" fill="none" width="17" height="22"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="white" /><rect x="45" y="8" width="9" height="28" fill="white" /><rect x="46" y="34" width="7" height="26" fill="white" /><line x1="49" y1="63" x2="20" y2="80" stroke="white" strokeWidth="8" strokeLinecap="round" /><line x1="51" y1="63" x2="80" y2="82" stroke="white" strokeWidth="7" strokeLinecap="round" /></svg>
          TYDENE
        </a>
        <nav className="hidden items-center gap-8 text-[11px] tracking-[.14em] text-white/50 md:flex">
          {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors no-underline">{l}</a>)}
          <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57] px-5 py-[7px] text-[10px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline">WhatsApp</a>
        </nav>
      </header>

      {/* ═══════════════════════════════════════════
           CINEMATIC SCROLL — 10 STAGES + BRAND REVEAL
         ═══════════════════════════════════════════ */}
      <section ref={scrollRef} className="relative h-[1200vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Full-screen crossfading photographs */}
          {stages.map((st, i) => (
            <Scene key={st.id} p={p} s={st.s} e={st.e} img={st.img} idx={i} />
          ))}

          {/* Scene texts */}
          {stages.map((st, i) => (
            <SText key={st.id} p={p} s={st.s} e={st.e} ey={st.ey} h={st.h} tx={st.tx} isFirst={i === 0} />
          ))}

          {/* Brand final */}
          <BrandFinal p={p} />

          {/* Scroll indicator */}
          <motion.div className="pointer-events-none absolute bottom-10 left-1/2 z-[70] flex -translate-x-1/2 flex-col items-center gap-3" style={{ opacity: useTransform(p, [0, .03, .06], [1, 1, 0]) }}>
            <span className="text-[9px] uppercase tracking-[.35em] text-white/25">Scroll to begin the journey</span>
            <motion.div className="h-8 w-px bg-white/15" animate={{ scaleY: [.3, 1, .3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>

          {/* Stage dots — right side */}
          <div className="fixed right-5 top-1/2 z-[150] hidden -translate-y-1/2 flex-col gap-2 md:flex">
            {stages.map((st, i) => (
              <motion.div key={i} className="h-[5px] w-[5px] rounded-full bg-[#AE8C57]" style={{
                opacity: useTransform(p, [st.s, st.s + .01, st.e - .01, st.e], [.2, 1, 1, .2]),
                scale: useTransform(p, [st.s, st.s + .01, st.e - .01, st.e], [.6, 1.2, 1.2, .6])
              }} />
            ))}
          </div>

          {/* Light vignette */}
          <div className="pointer-events-none absolute inset-0 z-[65]" style={{ boxShadow: "inset 0 0 120px 30px rgba(0,0,0,.2)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           STORY — Real TYDENE warehouse photo
         ═══════════════════════════════════════════ */}
      <section id="story" className="relative">
        {/* Full-width real warehouse image */}
        <div className="relative h-[55vh] min-h-[420px]">
          <Image src="/images/real/tydene-warehouse.jpg" alt="TYDENE warehouse at New Spitalfields Market" fill className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#040a06] via-black/30 to-[#0e3528]" />
          <div className="absolute inset-0 flex items-end px-[5.5%] pb-16">
            <R>
              <div>
                <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">OUR STORY</div>
                <div className="mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
                <h3 className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[.94] text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,.5)" }}>Built on trust.<br />Delivered fresh.</h3>
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2">
            <div>
              <R><p className="text-[16px] leading-[1.9] text-white/55">TYDENE was born from a simple belief: London deserves better produce. Not just fresher &mdash; but sourced with care, handled with respect, and delivered before the city wakes.</p></R>
              <R delay={.1}><p className="mt-6 text-[16px] leading-[1.9] text-white/55">Every morning our team begins at midnight &mdash; inspecting, sorting, loading produce that meets our exacting standards. From Borough Market kitchens to Mayfair restaurants.</p></R>
              <R delay={.2}><div className="mt-10 flex items-center gap-4"><div className="h-px w-14 bg-[#AE8C57]/30" /><span className="font-serif text-[16px] italic text-[#AE8C57]/50">Purveyors of Quality Fruit &amp; Vegetables</span></div></R>
            </div>
            <R delay={.15}>
              <div className="grid grid-cols-2 gap-8">
                {[["Since 2003", "Established"], ["200+", "Product Lines"], ["6 Days", "A Week"], ["99%", "On-Time"]].map(([v, l]) => (
                  <div key={l} className="rounded-xl border border-white/[.05] bg-white/[.02] p-6 text-center">
                    <div className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-[#AE8C57]">{v}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[.2em] text-white/28">{l}</div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           SERVICES — photo + text alternating layout
         ═══════════════════════════════════════════ */}
      <section id="services" className="bg-[#12100c]">
        {/* Hero banner */}
        <div className="relative h-[40vh] min-h-[320px]">
          <Image src="/images/produce/mixed-fresh.jpg" alt="Fresh produce variety" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528] via-black/40 to-[#12100c]" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">WHAT WE DO</div>
              <h3 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white" style={{ textShadow: "0 2px 25px rgba(0,0,0,.5)" }}>End-to-end wholesale<br />for London</h3>
            </div></R>
          </div>
        </div>

        <div className="px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* 3 service cards with BIG photos */}
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { img: "/images/stages/02-ripening.jpg", t: "Premium Sourcing", d: "Direct from trusted growers across UK, Europe, and Mediterranean. We select for quality before speed." },
                { img: "/images/produce/herbs.jpg", t: "Quality Packing", d: "Every item inspected, sorted, packed. Temperature-controlled handling from warehouse to van." },
                { img: "/images/real/tydene-van.jpg", t: "Dawn Delivery", d: "Midnight starts from New Spitalfields. TYDENE vans across London before sunrise." },
              ].map((item, i) => (
                <R key={item.t} delay={i * .1}>
                  <div className="group overflow-hidden rounded-2xl border border-white/[.05] bg-white/[.02]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100c] via-transparent to-transparent" />
                    </div>
                    <div className="p-7">
                      <h4 className="font-serif text-2xl text-white">{item.t}</h4>
                      <p className="mt-3 text-[13px] leading-[1.75] text-white/40">{item.d}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>

            {/* Bottom detail strip */}
            <div className="grid gap-px overflow-hidden rounded-xl bg-white/[.04] md:grid-cols-3">
              {[
                ["Reliable Schedule", "6 days a week, 52 weeks a year."],
                ["Quality Guarantee", "Not happy? We make it right."],
                ["Bespoke Orders", "Exotic requests? We adapt to you."],
              ].map(([t, d], i) => (
                <R key={t} delay={.3 + i * .05}>
                  <div className="bg-[#12100c] p-7 hover:bg-white/[.02] transition-colors">
                    <h4 className="font-serif text-lg text-white">{t}</h4>
                    <p className="mt-2 text-[12px] leading-[1.6] text-white/35">{d}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           PRODUCE — photo grid with every category
         ═══════════════════════════════════════════ */}
      <section id="produce" className="relative">
        <div className="relative h-[45vh] min-h-[360px]">
          <Image src="/images/produce/market-crates.jpg" alt="Fresh produce market" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100c] via-black/30 to-[#0a2a1e]" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">OUR PRODUCE</div>
              <h3 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white" style={{ textShadow: "0 2px 25px rgba(0,0,0,.5)" }}>The freshest for<br />London&apos;s finest</h3>
              <p className="mt-3 text-[14px] text-white/50">Over 200 product lines. Sourced daily. Delivered fresh.</p>
            </div></R>
          </div>
        </div>

        <div className="bg-[#0a2a1e] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { t: "Tomatoes", img: "/images/produce/tomatoes.jpg", d: "Vine, Cherry, Beef, Plum, Heritage. Our signature — sun-ripened and flavour-packed.", c: "#C43520" },
                { t: "Peppers", img: "/images/produce/peppers.jpg", d: "Bell, Chilli, Romano, Padron, Scotch Bonnet. Vibrant colour, bold taste.", c: "#D4A017" },
                { t: "Salad & Greens", img: "/images/produce/greens.jpg", d: "Lettuce, Rocket, Spinach, Kale. Crisp and fresh, delivered at peak.", c: "#4A7A2A" },
                { t: "Citrus & Fruits", img: "/images/produce/citrus.jpg", d: "Lemons, Limes, Oranges, Berries, Avocados. Bright and always in season.", c: "#E8A800" },
                { t: "Herbs", img: "/images/produce/herbs.jpg", d: "Basil, Coriander, Mint, Parsley, Thyme. Aromatic, fragrant, cut fresh.", c: "#6B8B3A" },
                { t: "Exotics", img: "/images/produce/exotic.jpg", d: "Aubergine, Okra, Plantain, Yam. Specialty imports for global kitchens.", c: "#8B5A8A" },
              ].map((item, i) => (
                <R key={item.t} delay={i * .07}>
                  <div className="group overflow-hidden rounded-2xl border border-white/[.05] bg-white/[.02]">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a1e] via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                        <div className="h-2.5 w-2.5 rounded-full shadow-lg" style={{ background: item.c }} />
                        <span className="text-[12px] font-semibold text-white/90" style={{ textShadow: "0 1px 8px rgba(0,0,0,.6)" }}>{item.t}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[13px] leading-[1.7] text-white/40">{item.d}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           WHY TYDENE — stats over real TYDENE van
         ═══════════════════════════════════════════ */}
      <section className="relative">
        <div className="relative py-24 md:py-32">
          <Image src="/images/stages/12-london.jpg" alt="London delivery morning" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <R><div className="text-center">
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">WHY TYDENE</div>
              <div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
              <h3 className="mt-6 font-serif text-[clamp(2rem,4.5vw,3.2rem)] text-white" style={{ textShadow: "0 2px 20px rgba(0,0,0,.5)" }}>What sets us apart</h3>
            </div></R>
            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {[
                { v: "200+", l: "Products", d: "Fruit, vegetables, herbs, exotics" },
                { v: "22+", l: "Years", d: "Trusted since 2003" },
                { v: "6", l: "Days/Week", d: "Mon–Sat, midnight starts" },
                { v: "99%", l: "On-Time", d: "Reliability you can count on" },
              ].map((stat, i) => (
                <R key={stat.l} delay={i * .08}>
                  <div className="rounded-xl border border-white/[.08] bg-black/30 p-6 text-center backdrop-blur-sm">
                    <div className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#AE8C57]">{stat.v}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/40">{stat.l}</div>
                    <div className="mt-3 text-[11px] text-white/30">{stat.d}</div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           TRUST — Why Us cards with produce thumbnails
         ═══════════════════════════════════════════ */}
      <section className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { n: "01", t: "Trust", d: "Over 200 London restaurants depend on us daily. Our word is our bond.", img: "/images/produce/tomatoes.jpg" },
              { n: "02", t: "Freshness", d: "Harvest to kitchen in the shortest time possible. Cold chain integrity.", img: "/images/produce/greens.jpg" },
              { n: "03", t: "Consistency", d: "Same quality, every delivery, every single morning.", img: "/images/produce/citrus.jpg" },
              { n: "04", t: "Relationships", d: "We know our growers by name, our clients by preference.", img: "/images/stages/03-selection.jpg" },
            ].map((item, i) => (
              <R key={item.n} delay={i * .08}>
                <div className="group flex gap-5 rounded-xl border border-white/[.05] bg-white/[.02] p-5 transition-colors hover:bg-white/[.04]">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-24">
                    <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="96px" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/50">{item.n}</div>
                    <h4 className="mt-1 font-serif text-xl text-white">{item.t}</h4>
                    <p className="mt-2 text-[13px] leading-[1.65] text-white/38">{item.d}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           REVIEWS — Google-style premium testimonials
         ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Kitchen background */}
        <div className="relative h-[30vh] min-h-[240px]">
          <Image src="/images/produce/kitchen.jpg" alt="Chef kitchen" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528]/80 via-black/50 to-[#12100c]" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <R><div>
              <div className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 text-[#AE8C57]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="font-serif text-2xl text-white">4.9</span>
                <span className="text-[12px] text-white/40">on Google</span>
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">TRUSTED BY LONDON&apos;S BEST</div>
            </div></R>
          </div>
        </div>

        {/* Marquee reviews — living testimonial stream */}
        <div className="bg-[#12100c] py-16">
          <ReviewMarquee />
        </div>

        {/* Static review cards for more depth */}
        <div className="bg-[#12100c] px-6 pb-20 md:px-[5.5%]">
          <div className="mx-auto max-w-6xl grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => <ReviewCard key={i} review={r} delay={i * .1} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           CONTACT — with produce background
         ═══════════════════════════════════════════ */}
      <section id="contact" className="relative">
        <div className="relative h-[35vh] min-h-[280px]">
          <Image src="/images/stages/01-field.jpg" alt="Tomato field" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100c] via-black/45 to-[#0e3528]" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">GET IN TOUCH</div>
              <h3 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white" style={{ textShadow: "0 2px 25px rgba(0,0,0,.5)" }}>Let&apos;s talk produce</h3>
            </div></R>
          </div>
        </div>

        <div className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-7">
              {[["EMAIL", "hello@tydene.co.uk"], ["PHONE", "020 8558 8047"], ["LOCATION", "Stands 5-6 & 29, New Spitalfields Market, London E10 5SQ"], ["HOURS", "Mon–Sat: Midnight – 11AM"]].map(([k, v], i) => (
                <R key={k} delay={i * .06}><div><div className="text-[10px] uppercase tracking-[.22em] text-[#AE8C57]/60">{k}</div><div className="mt-2 text-[17px] text-white/65">{v}</div></div></R>
              ))}
              <R delay={.3}>
                <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[.06] px-6 py-5 text-[#25D366] hover:bg-[#25D366]/[.1] transition-colors no-underline">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  <div><div className="text-[15px] font-semibold">WhatsApp Us</div><div className="text-[12px] text-white/30">Usually within 30 minutes</div></div>
                </a>
              </R>
            </div>
            <R delay={.15}>
              <div className="rounded-2xl border border-white/[.06] bg-black/20 p-8 backdrop-blur-sm md:p-10">
                <div className="grid gap-5 md:grid-cols-2">
                  <input className="rounded-xl border border-white/[.07] bg-white/[.03] px-5 py-4 text-[14px] text-white outline-none placeholder:text-white/20 focus:border-[#AE8C57]/30 transition-colors" placeholder="Your name" />
                  <input className="rounded-xl border border-white/[.07] bg-white/[.03] px-5 py-4 text-[14px] text-white outline-none placeholder:text-white/20 focus:border-[#AE8C57]/30 transition-colors" placeholder="Email" />
                  <input className="rounded-xl border border-white/[.07] bg-white/[.03] px-5 py-4 text-[14px] text-white outline-none placeholder:text-white/20 focus:border-[#AE8C57]/30 transition-colors md:col-span-2" placeholder="Business name" />
                  <textarea className="min-h-[140px] rounded-xl border border-white/[.07] bg-white/[.03] px-5 py-4 text-[14px] text-white outline-none placeholder:text-white/20 focus:border-[#AE8C57]/30 transition-colors resize-none md:col-span-2" placeholder="Tell us about your produce requirements..." />
                  <button className="rounded-full bg-[#AE8C57] px-7 py-4 text-[14px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors cursor-pointer border-none md:col-span-2">Send Message</button>
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
           FOOTER
         ═══════════════════════════════════════════ */}
      <footer className="border-t border-white/[.04] bg-[#030704] px-6 py-16 md:px-[5.5%]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <a href="#" className="flex items-center gap-2.5 text-[12px] font-bold tracking-[.22em] text-white no-underline">
            <svg viewBox="0 0 100 130" fill="none" width="15" height="20"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="white" /><rect x="45" y="8" width="9" height="28" fill="white" /><rect x="46" y="34" width="7" height="26" fill="white" /><line x1="49" y1="63" x2="20" y2="80" stroke="white" strokeWidth="8" strokeLinecap="round" /><line x1="51" y1="63" x2="80" y2="82" stroke="white" strokeWidth="7" strokeLinecap="round" /></svg>
            TYDENE
          </a>
          <p className="max-w-sm text-[12px] leading-[1.7] text-white/18">Premium fresh produce wholesalers. Serving London&apos;s finest since 2003.</p>
          <p className="font-serif text-[13px] italic text-[#AE8C57]/25">From Soil to Supply.</p>
          <div className="flex gap-7 text-[10px] tracking-[.12em] text-white/12">
            {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/30 transition-colors no-underline">{l}</a>)}
          </div>
          <div className="mt-2 h-px w-48 bg-white/[.03]" />
          <p className="text-[9px] text-white/8">&copy; {new Date().getFullYear()} TYDENE Fresh Produce Ltd. New Spitalfields Market, London E10 5SQ.</p>
        </div>
      </footer>
    </div>
  );
}
