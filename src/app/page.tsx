"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react";
import Image from "next/image";

/* ════════════════════════════════════════════════════════════
   TYDENE — Cinematic Scroll Website
   From Soil to Supply — Full Photography Edition
   ════════════════════════════════════════════════════════════ */

/* ─── STAGE CONFIG ─── */
const stages = [
  { id: "field",     img: "/images/stages/01-field.jpg",     ey: "LONDON'S TRUSTED WHOLESALE PARTNER", h: "From Soil\nto Supply.", tx: "Premium fresh produce, delivered with precision.\nSupplying London's finest kitchens since 2003.", s: 0, e: .1 },
  { id: "ripen",     img: "/images/stages/02-ripening.jpg",  ey: "RIPENING", h: "Nature's\nbest work.", tx: "Sun, patience, care. The product earns\nits colour before its journey.", s: .1, e: .2 },
  { id: "select",    img: "/images/stages/03-selection.jpg",  ey: "SELECTION", h: "Chosen\nby hand.", tx: "Every tomato is inspected, touched, chosen.\nQuality begins with what gets selected.", s: .2, e: .3 },
  { id: "detach",    img: "/images/stages/04-detach.jpg",     ey: "THE JOURNEY BEGINS", h: "Picked from\nthe vine.", tx: "A gentle twist. A careful pull.\nThe journey begins the moment it leaves.", s: .3, e: .38 },
  { id: "drop",      img: "/images/stages/05-drop.jpg",       ey: "CINEMATIC DROP", h: "Then everything\nmoves.", tx: "Nature becomes supply chain.\nFrom hand to crate to city.", s: .38, e: .46 },
  { id: "sort",      img: "/images/stages/06-sorting.jpg",    ey: "QUALITY CONTROL", h: "Inspected.\nSorted.\nApproved.", tx: "Colour, firmness, freshness — checked.\nOnly the best make the cut.", s: .46, e: .54 },
  { id: "pack",      img: "/images/stages/07-packing.jpg",    ey: "PACKING", h: "Crated with\nprecision.", tx: "Wooden crates, careful stacking, temperature control.\nEvery crate is a promise.", s: .54, e: .62 },
  { id: "truck",     img: "/images/stages/08-truck.jpg",      ey: "TRANSPORT", h: "Moving\nbefore dawn.", tx: "Midnight starts. Cold chains. Precision routes.\nLondon doesn't wait for sunrise.", s: .62, e: .72 },
  { id: "air",       img: "/images/stages/10-air.jpg",        ey: "GLOBAL REACH", h: "Air freight.\nGlobal chain.", tx: "When the season demands it, cargo moves by air.\nFreshness has no borders.", s: .72, e: .82 },
  { id: "london",    img: "/images/stages/12-london.jpg",     ey: "LONDON ARRIVAL", h: "London\nawakens.", tx: "New Spitalfields Market stirs at midnight.\nRestaurants prep. The city is hungry.", s: .82, e: .9 },
  { id: "final",     img: null,                                ey: "TYDENE", h: "Built on Trust.\nDelivered Fresh.", tx: "From field to table, the chain holds\nbecause the standards do.", s: .9, e: 1 },
];

/* ─── PARALLAX SCENE BG ─── crossfade + ken burns + parallax ─── */
function SceneBG({ p, stage, idx }: { p: MotionValue<number>; stage: typeof stages[0]; idx: number }) {
  if (!stage.img) return null;
  const { s, e } = stage;
  const dur = e - s;
  const fi = Math.max(0, s - dur * .15);
  const fo = Math.min(1, e + dur * .1);

  const o = useTransform(p, [fi, fi + dur * .2, e - dur * .15, fo], [0, 1, 1, 0]);
  // Ken Burns — alternating zoom in/out
  const scale = useTransform(p, [s, e], idx % 2 === 0 ? [1, 1.12] : [1.1, 1]);
  // Parallax — subtle vertical shift
  const yShift = useTransform(p, [s, e], idx % 2 === 0 ? ["-3%", "3%"] : ["2%", "-2%"]);
  // Color temperature shift per stage
  const warmth = idx < 5 ? "sepia(0.08)" : idx < 8 ? "sepia(0.05) brightness(0.95)" : "sepia(0.03) brightness(0.9)";

  return (
    <motion.div className="absolute inset-0 z-[2] will-change-transform" style={{ opacity: o }}>
      <motion.div className="relative h-full w-full overflow-hidden" style={{ scale, y: yShift }}>
        <Image
          src={stage.img} alt={stage.ey} fill
          className="object-cover" sizes="100vw"
          priority={idx < 3} quality={90}
          style={{ filter: warmth }}
        />
      </motion.div>
      {/* Multi-layer cinematic grade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,transparent_30%,rgba(0,0,0,.4))]" />
      {/* Color tint */}
      <div className="absolute inset-0 mix-blend-soft-light" style={{ background: idx < 5 ? "rgba(46,95,32,0.08)" : idx < 8 ? "rgba(43,34,28,0.1)" : "rgba(24,60,46,0.08)" }} />
    </motion.div>
  );
}

/* ─── TOMATO — persistent cinematic guide ─── */
function Tomato({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0,.1,.2,.3,.38,.46,.54,.62,.72,.82,.9,1], [58,52,55,52,50,50,55,60,62,55,50,50]);
  const y = useTransform(p, [0,.1,.2,.3,.38,.46,.54,.62,.72,.82,.9,1], [42,40,44,38,24,64,60,58,55,50,44,44]);
  const s = useTransform(p, [0,.1,.2,.3,.38,.46,.54,.62,.72,.82,.9,1], [.8,1.3,1.6,1.8,1.3,.75,.55,.4,.3,.25,.2,0]);
  const r = useTransform(p, [0,.1,.2,.3,.38,.46,.54,.62,.72,.82,.9,1], [-4,0,3,5,0,18,8,4,2,0,0,0]);
  const o = useTransform(p, [0,.02,.8,.87], [0,1,1,0]);
  const hue = useTransform(p, [0,.1,.2,.3,1], [68,50,25,10,8]);
  const glow = useTransform(p, [.05,.15,.28,.45,.65,.8], [.04,.35,.5,.15,.1,.06]);
  const bl = useTransform(p, [.36,.42,.46], [0,3.5,0]);

  return (
    <motion.div className="pointer-events-none absolute z-30" style={{
      left: useTransform(x, v => `${v}%`), top: useTransform(y, v => `${v}%`),
      opacity: o, filter: useTransform(bl, v => `blur(${v}px)`)
    }}>
      <motion.div style={{ scale: s, rotate: r, x: "-50%", y: "-50%" }} className="relative">
        <motion.div className="absolute -inset-24 rounded-full" style={{
          opacity: glow,
          background: "radial-gradient(circle,rgba(196,53,32,.25),rgba(174,140,87,.15) 40%,transparent 70%)",
          filter: "blur(35px)"
        }} />
        <svg viewBox="0 0 140 140" width="140" height="140" className="relative" style={{ filter: "drop-shadow(0 16px 45px rgba(0,0,0,.6))" }}>
          <defs>
            <radialGradient id="tS" cx="38%" cy="33%" r="50%"><stop offset="0%" stopColor="white" stopOpacity=".2" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="70" cy="132" rx="38" ry="6" fill="black" opacity=".2" />
          <motion.ellipse cx="70" cy="72" rx="48" ry="46" style={{ fill: useTransform(hue, v => `hsl(${v},74%,${v < 18 ? 42 : 46}%)`) }} />
          <motion.ellipse cx="56" cy="58" rx="18" ry="14" style={{ fill: useTransform(hue, v => `hsl(${v + 8},60%,${v < 18 ? 56 : 60}%)`) }} opacity=".22" />
          <ellipse cx="70" cy="72" rx="48" ry="46" fill="url(#tS)" />
          <ellipse cx="50" cy="50" rx="10" ry="6" fill="white" opacity=".15" />
          <ellipse cx="88" cy="66" rx="3.5" ry="5" fill="white" opacity=".18" />
          <path d="M66 28L70 24L74 28L72 36L68 36Z" fill="#3a6525" />
          <path d="M70 24L70 15" stroke="#2d4a18" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M62 30C54 22 46 26 49 32C52 30 58 29 62 30Z" fill="#4a7a2a" />
          <path d="M78 30C86 22 94 26 91 32C88 30 82 29 78 30Z" fill="#4a7a2a" />
          <path d="M66 27C63 17 57 13 59 22Z" fill="#3d6b22" />
          <path d="M74 27C77 17 83 13 81 22Z" fill="#3d6b22" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── SCENE TEXT — with entrance animations ─── */
function ST({ p, stage }: { p: MotionValue<number>; stage: typeof stages[0] }) {
  const { s, e, ey, h, tx } = stage;
  const a = Math.max(0.001, s);
  const o = useTransform(p, [a, a + .025, e - .025, e], [0, 1, 1, 0]);
  const yy = useTransform(p, [a, a + .04], [40, 0]);
  const xSlide = useTransform(p, [a, a + .05], [-20, 0]);

  return (
    <motion.div className="absolute left-[5%] top-[22%] z-20 max-w-[44rem] px-5 sm:left-[5.5%] sm:px-0 md:top-[24%]" style={{ opacity: o, y: yy }}>
      <motion.div className="mb-3 text-[10px] font-medium uppercase tracking-[.32em] text-[#AE8C57] sm:text-[11px]" style={{ x: xSlide }}>{ey}</motion.div>
      <motion.div className="mb-6 h-[1.5px] w-12 rounded-full bg-[#AE8C57]/70" style={{ scaleX: useTransform(p, [a, a + .04], [0, 1]), transformOrigin: "left" }} />
      <h2 className="whitespace-pre-line font-serif text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[.88] tracking-[-.025em] text-[#F5EFE3]" style={{ textShadow: "0 4px 40px rgba(0,0,0,.6), 0 1px 8px rgba(0,0,0,.4)" }}>{h}</h2>
      <p className="mt-6 max-w-[30rem] whitespace-pre-line text-[14px] leading-[1.9] text-[#F5EFE3]/55 sm:text-[15px]" style={{ textShadow: "0 2px 20px rgba(0,0,0,.5)" }}>{tx}</p>
    </motion.div>
  );
}

/* ─── BRAND FINAL REVEAL ─── */
function Brand({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.9, .95, 1], [0, 1, 1]);
  const s = useTransform(p, [.9, .96], [.85, 1]);
  const bgO = useTransform(p, [.88, .93], [0, 1]);

  return (<>
    {/* Background fade to brand */}
    <motion.div className="absolute inset-0 z-[3]" style={{ opacity: bgO, background: "radial-gradient(ellipse 70% 60% at 50% 50%, #0e3528, #061008)" }} />
    <motion.div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-6 text-center" style={{ opacity: o, scale: s }}>
      <svg viewBox="0 0 100 130" fill="none" width="56" height="72" className="mb-6">
        <rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3" /><rect x="45" y="8" width="9" height="28" fill="#F5EFE3" /><rect x="46" y="34" width="7" height="26" fill="#F5EFE3" />
        <line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round" /><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round" />
        <line x1="24" y1="95" x2="76" y2="95" stroke="#F5EFE3" strokeWidth="2.2" strokeLinecap="round" opacity=".5" />
      </svg>
      <div className="font-serif text-[clamp(3.2rem,9vw,6rem)] tracking-[.22em] text-[#F5EFE3]">TYDENE</div>
      <div className="my-5 h-px w-24 bg-[#AE8C57]" />
      <div className="text-[10px] uppercase tracking-[.4em] text-[#6B7750] sm:text-[11px]">Fresh Produce Wholesalers · London</div>
      <div className="mt-5 font-serif text-xl italic text-[#F5EFE3]/50 sm:text-2xl">Built on Trust. Delivered Fresh.</div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a className="pointer-events-auto rounded-full bg-[#AE8C57] px-9 py-4 text-[14px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline" href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a className="pointer-events-auto rounded-full border border-white/18 px-9 py-4 text-[14px] text-[#F5EFE3]/75 hover:border-white/35 transition-colors no-underline" href="#contact">Get in Touch →</a>
      </div>
    </motion.div>
  </>);
}

/* ─── REVEAL WRAPPER ─── */
function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 36 }}
      animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay }}>
      {children}
    </motion.div>
  );
}

/* ─── IMAGE SECTION ─── reusable full-width image with overlay ─── */
function ImageBanner({ src, alt, overlay, children, aspect = "21/9" }: { src: string; alt: string; overlay?: string; children?: React.ReactNode; aspect?: string }) {
  return (
    <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      <div className={`absolute inset-0 ${overlay || "bg-black/40"}`} />
      {children && <div className="absolute inset-0 flex items-center justify-center">{children}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pw = useTransform(p, v => `${v * 100}%`);

  return (
    <div className="min-h-screen bg-[#061008] text-[#F5EFE3]">
      {/* ── Progress ── */}
      <motion.div className="fixed left-0 top-0 z-[120] h-[2.5px]" style={{ width: pw, background: "linear-gradient(90deg, #AE8C57, #C43520 60%, #AE8C57)" }} />

      {/* ── Film grain ── */}
      <div className="pointer-events-none fixed inset-0 z-[110] opacity-[.03] mix-blend-overlay [background-size:200px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── Nav ── */}
      <header className="fixed inset-x-0 top-0 z-[100] flex h-[72px] items-center justify-between px-[5%] backdrop-blur-sm" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.65) 0%, rgba(0,0,0,.2) 70%, transparent 100%)" }}>
        <a href="#" className="flex items-center gap-2.5 text-[13px] font-bold tracking-[.22em] text-[#F5EFE3] no-underline">
          <svg viewBox="0 0 100 130" fill="none" width="17" height="22"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3" /><rect x="45" y="8" width="9" height="28" fill="#F5EFE3" /><rect x="46" y="34" width="7" height="26" fill="#F5EFE3" /><line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round" /><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round" /></svg>
          TYDENE
        </a>
        <nav className="hidden items-center gap-8 text-[11px] tracking-[.14em] text-[#F5EFE3]/50 md:flex">
          {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#F5EFE3] transition-colors no-underline">{l}</a>)}
          <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57] px-5 py-[7px] text-[10px] font-semibold tracking-[.08em] text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline">WhatsApp</a>
        </nav>
      </header>

      {/* ═══════════════════════════════════════
           CINEMATIC SCROLL — 1400vh — 11 STAGES
         ═══════════════════════════════════════ */}
      <section ref={ref} className="relative h-[1400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#061008]">

          {/* Real photographs — crossfading with parallax + ken burns */}
          {stages.map((stage, i) => (
            <SceneBG key={stage.id} p={p} stage={stage} idx={i} />
          ))}

          {/* Ambient glow — follows story */}
          <motion.div className="pointer-events-none absolute z-[14] rounded-full" style={{
            left: useTransform(p, [0, .2, .4, .6, .8, 1], ["58%", "50%", "48%", "60%", "55%", "50%"]),
            top: useTransform(p, [0, .2, .4, .6, .8, 1], ["40%", "42%", "55%", "50%", "45%", "45%"]),
            width: "55vw", height: "55vw", x: "-50%", y: "-50%",
            opacity: useTransform(p, [0, .05, .2, .4, .6, .8, .9, 1], [.08, .2, .18, .12, .1, .14, .06, .03]),
            background: "radial-gradient(circle,rgba(174,140,87,.3),rgba(174,140,87,.06) 45%,transparent 68%)",
            filter: "blur(65px)"
          }} />

          {/* Particles */}
          <div className="pointer-events-none absolute inset-0 z-[16] overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <motion.div key={i} className="absolute rounded-full"
                style={{ left: `${5 + (i * 6) % 90}%`, top: `${8 + (i * 7.5) % 84}%`, width: i % 4 === 0 ? 3 : 2, height: i % 4 === 0 ? 3 : 2, background: i % 3 === 0 ? "rgba(174,140,87,.4)" : "rgba(245,239,227,.1)" }}
                animate={{ y: [0, -(15 + i * 3), -(40 + i * 4), -(60 + i * 2)], opacity: [.05, .3, .12, 0] }}
                transition={{ duration: 6.5 + i * .6, delay: i * .35, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </div>

          {/* Text-safe overlays */}
          <div className="absolute inset-0 z-[17] bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[17] h-[25%] bg-gradient-to-t from-black/45 to-transparent" />
          <div className="absolute inset-x-0 top-0 z-[17] h-[12%] bg-gradient-to-b from-black/35 to-transparent" />

          {/* Tomato */}
          <Tomato p={p} />

          {/* Scene texts */}
          {stages.slice(0, -1).map((stage) => <ST key={stage.id} p={p} stage={stage} />)}

          {/* Brand reveal */}
          <Brand p={p} />

          {/* Scroll indicator */}
          <motion.div className="pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3" style={{ opacity: useTransform(p, [0, .015, .05], [1, 1, 0]) }}>
            <span className="text-[9px] uppercase tracking-[.35em] text-white/22">Scroll to begin the journey</span>
            <motion.div className="h-8 w-px bg-white/12" animate={{ scaleY: [.3, 1, .3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>

          {/* Stage indicator — right dots */}
          <div className="fixed right-5 top-1/2 z-[100] hidden -translate-y-1/2 flex-col gap-[6px] md:flex">
            {stages.map((stage) => (
              <motion.div key={stage.id} className="h-[6px] w-[6px] rounded-full border border-[#AE8C57]/30 transition-colors" style={{
                background: useTransform(p, [stage.s, stage.s + .02, stage.e - .02, stage.e], ["transparent", "#AE8C57", "#AE8C57", "transparent"]),
                borderColor: useTransform(p, [stage.s, stage.s + .02, stage.e - .02, stage.e], ["rgba(174,140,87,.2)", "rgba(174,140,87,.8)", "rgba(174,140,87,.8)", "rgba(174,140,87,.2)"])
              }} />
            ))}
          </div>

          {/* Cinematic vignette */}
          <div className="pointer-events-none absolute inset-0 z-[50]" style={{ boxShadow: "inset 0 0 280px 100px rgba(0,0,0,.5)" }} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
           STORY — with full-width image
         ═══════════════════════════════════════ */}
      <section id="story" className="relative overflow-hidden">
        {/* Full-width story image — mixed fresh produce */}
        <div className="relative h-[50vh] min-h-[400px]">
          <Image src="/images/produce/mixed-fresh.jpg" alt="Fresh produce variety" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#061008] via-transparent to-[#0e3528]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
          <div className="absolute inset-0 flex items-center px-[5.5%]">
            <R>
              <div className="max-w-xl">
                <div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">OUR STORY</div>
                <div className="mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
                <h3 className="mt-6 font-serif text-[clamp(2.5rem,5.5vw,4rem)] leading-[.95] text-[#F5EFE3]" style={{ textShadow: "0 4px 30px rgba(0,0,0,.5)" }}>Built on trust.<br />Delivered fresh.</h3>
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#0e3528] px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-16 lg:grid-cols-2">
              <div>
                <R delay={.1}><p className="max-w-lg text-[16px] leading-[1.9] text-[#F5EFE3]/55">TYDENE was born from a simple belief: London deserves better produce. Not just fresher &mdash; but sourced with care, handled with respect, and delivered before the city wakes.</p></R>
                <R delay={.2}><p className="mt-6 max-w-lg text-[16px] leading-[1.9] text-[#F5EFE3]/55">Every morning our team begins the day&apos;s journey &mdash; inspecting, sorting, loading produce that meets our exacting standards. From Borough Market kitchens to Mayfair restaurants.</p></R>
                <R delay={.3}><div className="mt-10 flex items-center gap-4"><div className="h-px w-14 bg-[#AE8C57]/30" /><span className="font-serif text-[16px] italic text-[#AE8C57]/55">From Soil to Supply</span></div></R>
              </div>
              <R delay={.15}>
                <div className="overflow-hidden rounded-2xl border border-[#F5EFE3]/[.04]">
                  <div className="relative aspect-[4/3]">
                    <Image src="/images/stages/01-field.jpg" alt="TYDENE field" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a1e] via-[#0a2a1e]/30 to-transparent" />
                  </div>
                  <div className="bg-[#0a2a1e] p-10 md:p-12">
                    <div className="text-[10px] uppercase tracking-[.25em] text-[#AE8C57]/60">The numbers</div>
                    <div className="mt-8 grid grid-cols-2 gap-y-10 gap-x-8">
                      {[["Since 2003", "Established"], ["200+", "Product Lines"], ["6 Days", "A Week"], ["99%", "On-Time"]].map(([v, l]) => (
                        <div key={l}><div className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#F5EFE3]">{v}</div><div className="mt-2 text-[11px] text-[#F5EFE3]/28">{l}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           SERVICES — with photo cards
         ═══════════════════════════════════════ */}
      <section id="services" className="relative overflow-hidden">
        {/* Full-width service banner */}
        <div className="relative h-[40vh] min-h-[320px]">
          <Image src="/images/stages/06-sorting.jpg" alt="Quality sorting" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528] via-black/40 to-[#1e150e]" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <R>
              <div>
                <div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">WHAT WE DO</div>
                <div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
                <h3 className="mt-6 font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[.95] text-[#F5EFE3]" style={{ textShadow: "0 4px 30px rgba(0,0,0,.5)" }}>End-to-end wholesale<br />for London</h3>
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#1e150e] px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-6xl">
            {/* Photo cards */}
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { img: "/images/produce/mixed-fresh.jpg", t: "Premium Sourcing", d: "Direct from trusted growers across UK, Europe, and Mediterranean. Sun-ripened, hand-selected." },
                { img: "/images/produce/herbs.jpg", t: "Quality Packing", d: "Every item inspected, sorted, and packed with precision. Temperature-controlled handling." },
                { img: "/images/stages/08-truck.jpg", t: "Dawn Delivery", d: "Midnight starts from New Spitalfields. Cold chain integrity, precision routes across London." },
              ].map((item, i) => (
                <R key={item.t} delay={i * .1}>
                  <div className="group overflow-hidden rounded-2xl border border-[#F5EFE3]/[.04] bg-[#1e150e]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1e150e] via-[#1e150e]/20 to-transparent" />
                    </div>
                    <div className="p-7 pt-5">
                      <h4 className="font-serif text-2xl text-[#F5EFE3]">{item.t}</h4>
                      <p className="mt-3 text-[13px] leading-[1.75] text-[#F5EFE3]/42">{item.d}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>

            {/* Detail grid */}
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-[#F5EFE3]/[.04] md:grid-cols-3">
              {[
                ["04", "Reliable Schedule", "6 days a week, 52 weeks a year. Your business depends on consistency."],
                ["05", "Quality Guarantee", "Not happy? We make it right. Our reputation is built on doing what's right."],
                ["06", "Bespoke Orders", "Exotic ingredients, specific quantities, last-minute additions. We adapt to you."],
              ].map(([n, t, d], i) => (
                <R key={n} delay={.3 + i * .06}>
                  <div className="bg-[#1e150e] p-9 transition-colors hover:bg-[#25190f] h-full">
                    <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/30">{n}</div>
                    <h4 className="mt-4 font-serif text-xl text-[#F5EFE3]">{t}</h4>
                    <p className="mt-3 text-[13px] leading-[1.75] text-[#F5EFE3]/38">{d}</p>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           PRODUCE — with hero image + grid
         ═══════════════════════════════════════ */}
      <section id="produce" className="relative overflow-hidden">
        {/* Full-width produce banner */}
        <div className="relative h-[45vh] min-h-[360px]">
          <Image src="/images/produce/market-crates.jpg" alt="Fresh produce market" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e150e] via-black/30 to-[#0c2e22]" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <R>
              <div>
                <div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">OUR PRODUCE</div>
                <div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
                <h3 className="mt-6 font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[.95] text-[#F5EFE3]" style={{ textShadow: "0 4px 30px rgba(0,0,0,.5)" }}>The freshest for<br />London&apos;s finest</h3>
                <p className="mt-4 text-[14px] text-[#F5EFE3]/50" style={{ textShadow: "0 2px 15px rgba(0,0,0,.5)" }}>Carefully sourced, checked daily, supplied with consistency.</p>
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#0c2e22] px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-6xl">
            {/* Product cards with real photos */}
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {[
                { t: "Tomatoes", img: "/images/produce/tomatoes.jpg", varieties: "Vine, Cherry, Beef, Plum, Heritage", c: "#C43520", desc: "Our signature. Sun-ripened and flavour-packed from Mediterranean growers." },
                { t: "Peppers", img: "/images/produce/peppers.jpg", varieties: "Bell, Chilli, Romano, Padron, Scotch Bonnet", c: "#D4A017", desc: "From sweet bell to fiery scotch bonnet. Vibrant colour, bold taste." },
                { t: "Salad & Greens", img: "/images/produce/greens.jpg", varieties: "Lettuce, Rocket, Spinach, Kale, Watercress", c: "#4A7A2A", desc: "Crisp, fresh, delivered at peak. The foundation of every great plate." },
                { t: "Citrus & Fruits", img: "/images/produce/citrus.jpg", varieties: "Lemons, Limes, Oranges, Berries, Avocados", c: "#E8A800", desc: "Bright, juicy, always in season. Zest and sweetness delivered fresh." },
                { t: "Herbs", img: "/images/produce/herbs.jpg", varieties: "Basil, Coriander, Mint, Parsley, Thyme, Rosemary", c: "#6B8B3A", desc: "Aromatic, fragrant, cut fresh. The finishing touch for any dish." },
                { t: "Exotics", img: "/images/produce/exotic.jpg", varieties: "Aubergine, Okra, Plantain, Yam, Scotch Bonnet", c: "#8B5A8A", desc: "Specialty imports for global kitchens. Hard to find, easy to order." },
              ].map((item, i) => (
                <R key={item.t} delay={i * .07}>
                  <div className="group overflow-hidden rounded-2xl border border-[#F5EFE3]/[.04] bg-[#F5EFE3]/[.02] transition-all hover:border-[#F5EFE3]/[.08]">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width:640px) 100vw, (max-width:768px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c2e22] via-[#0c2e22]/25 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ background: item.c }} />
                        <span className="text-[11px] font-semibold text-[#F5EFE3]/80">{item.t}</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-[13px] leading-[1.7] text-[#F5EFE3]/45">{item.desc}</p>
                      <p className="mt-3 text-[10px] uppercase tracking-[.15em] text-[#F5EFE3]/22">{item.varieties}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           WHY TYDENE — image + stats
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="relative h-[35vh] min-h-[280px]">
          <Image src="/images/stages/12-london.jpg" alt="London delivery" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c2e22] via-black/50 to-[#0e3528]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <R>
              <div className="grid grid-cols-2 gap-10 px-6 md:grid-cols-4 md:gap-16">
                {[["200+", "Products"], ["22+", "Years"], ["6", "Days/Week"], ["99%", "On-Time"]].map(([v, l]) => (
                  <div key={l} className="text-center">
                    <div className="font-serif text-[clamp(2.5rem,6vw,4rem)] font-bold text-[#AE8C57]" style={{ textShadow: "0 2px 20px rgba(0,0,0,.5)" }}>{v}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[.2em] text-[#F5EFE3]/35">{l}</div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#0e3528] px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-5xl">
            <R><div className="text-center"><div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">WHY TYDENE</div><div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" /></div></R>
            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#F5EFE3]/[.04] md:grid-cols-2">
              {[
                ["01", "Trust", "Over 200 London restaurants depend on us daily. Our word is our bond.", "/images/produce/tomatoes.jpg"],
                ["02", "Freshness", "Harvest to kitchen in the shortest time possible. Cold chain integrity.", "/images/produce/greens.jpg"],
                ["03", "Consistency", "Same quality, every delivery, every single morning.", "/images/produce/citrus.jpg"],
                ["04", "Relationships", "We know our growers by name, our clients by preference.", "/images/produce/herbs.jpg"],
              ].map(([n, t, d, img], i) => (
                <R key={n} delay={i * .08}>
                  <div className="group flex gap-5 bg-[#0e3528] p-6 transition-colors hover:bg-[#12402e] h-full md:p-8">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-24">
                      <Image src={img as string} alt={t as string} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="96px" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/40">{n}</div>
                      <h4 className="mt-2 font-serif text-xl text-[#F5EFE3] md:text-2xl">{t}</h4>
                      <p className="mt-2 text-[13px] leading-[1.7] text-[#F5EFE3]/40">{d}</p>
                    </div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           TESTIMONIALS
         ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="relative h-[30vh] min-h-[240px]">
          <Image src="/images/produce/kitchen.jpg" alt="Chef preparing fresh produce" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528]/90 via-black/60 to-[#1e150e]" />
        </div>
        <div className="bg-[#1e150e] px-6 py-20 text-center md:px-14 md:py-28">
          <div className="mx-auto max-w-4xl">
            <R><div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">TRUSTED BY LONDON&apos;S BEST</div></R>
            <R delay={.05}><div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" /></R>
            <R delay={.15}>
              <div className="relative mt-14">
                <div className="absolute -top-8 left-[10%] select-none font-serif text-[8rem] leading-none text-[#AE8C57]/[.05]">&ldquo;</div>
                <blockquote className="relative mx-auto max-w-3xl font-serif text-[clamp(1.2rem,2.8vw,1.6rem)] italic leading-[1.65] text-[#F5EFE3]/75">&ldquo;TYDENE transformed our kitchen operations. The consistency and quality of their produce means we can plan our menus with absolute confidence.&rdquo;</blockquote>
              </div>
            </R>
            <R delay={.25}><div className="mt-10"><div className="text-[14px] font-semibold text-[#F5EFE3]/70">James Crawford</div><div className="mt-1 text-[11px] text-[#F5EFE3]/28">Head Chef &mdash; The Ivy Collection</div></div></R>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           CONTACT — with image
         ═══════════════════════════════════════ */}
      <section id="contact" className="relative overflow-hidden">
        <div className="relative h-[35vh] min-h-[280px]">
          <Image src="/images/produce/mixed-fresh.jpg" alt="Fresh produce variety" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e150e] via-black/55 to-[#0e3528]" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <R>
              <div>
                <div className="text-[10px] uppercase tracking-[.32em] text-[#AE8C57]">GET IN TOUCH</div>
                <div className="mx-auto mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
                <h3 className="mt-6 font-serif text-[clamp(2.2rem,5.5vw,4rem)] leading-[.95] text-[#F5EFE3]" style={{ textShadow: "0 4px 30px rgba(0,0,0,.5)" }}>Let&apos;s talk produce</h3>
              </div>
            </R>
          </div>
        </div>

        <div className="bg-[#0e3528] px-6 py-20 md:px-14 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
              <div className="space-y-7">
                {[["EMAIL", "hello@tydene.co.uk"], ["PHONE", "020 8558 8047"], ["LOCATION", "Stands 5-6 & 29, New Spitalfields Market, London E10 5SQ"], ["HOURS", "Mon–Sat: Midnight – 11AM"]].map(([k, v], i) => (
                  <R key={k} delay={.1 + i * .06}><div><div className="text-[10px] uppercase tracking-[.22em] text-[#AE8C57]/65">{k}</div><div className="mt-2 text-[17px] text-[#F5EFE3]/70 md:text-lg">{v}</div></div></R>
                ))}
                <R delay={.4}>
                  <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[.06] px-6 py-5 text-[#25D366] hover:bg-[#25D366]/[.1] transition-colors no-underline">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    <div><div className="text-[15px] font-semibold">WhatsApp Us</div><div className="text-[12px] text-[#F5EFE3]/35">Quick response, usually within 30 minutes</div></div>
                  </a>
                </R>
              </div>
              <R delay={.15}>
                <div className="rounded-2xl border border-[#F5EFE3]/[.05] bg-black/20 p-8 backdrop-blur-sm md:p-10">
                  <div className="grid gap-5 md:grid-cols-2">
                    <input className="rounded-xl border border-white/[.07] bg-white/[.025] px-5 py-4 text-[14px] text-[#F5EFE3] outline-none placeholder:text-white/20 focus:border-[#AE8C57]/25 transition-colors" placeholder="Your name" />
                    <input className="rounded-xl border border-white/[.07] bg-white/[.025] px-5 py-4 text-[14px] text-[#F5EFE3] outline-none placeholder:text-white/20 focus:border-[#AE8C57]/25 transition-colors" placeholder="Email" />
                    <input className="rounded-xl border border-white/[.07] bg-white/[.025] px-5 py-4 text-[14px] text-[#F5EFE3] outline-none placeholder:text-white/20 focus:border-[#AE8C57]/25 transition-colors md:col-span-2" placeholder="Business name" />
                    <textarea className="min-h-[140px] rounded-xl border border-white/[.07] bg-white/[.025] px-5 py-4 text-[14px] text-[#F5EFE3] outline-none placeholder:text-white/20 focus:border-[#AE8C57]/25 transition-colors resize-none md:col-span-2" placeholder="Tell us about your produce requirements..." />
                    <button className="rounded-full bg-[#AE8C57] px-7 py-4 text-[14px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors cursor-pointer border-none md:col-span-2">Send Message</button>
                  </div>
                </div>
              </R>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
           FOOTER
         ═══════════════════════════════════════ */}
      <footer className="border-t border-white/[.04] bg-[#050804] px-6 py-16 md:px-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <a href="#" className="flex items-center gap-2.5 text-[12px] font-bold tracking-[.22em] text-[#F5EFE3] no-underline">
            <svg viewBox="0 0 100 130" fill="none" width="15" height="20"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3" /><rect x="45" y="8" width="9" height="28" fill="#F5EFE3" /><rect x="46" y="34" width="7" height="26" fill="#F5EFE3" /><line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round" /><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round" /></svg>
            TYDENE
          </a>
          <p className="max-w-sm text-[12px] leading-[1.7] text-[#F5EFE3]/20">Premium fresh produce wholesalers. Serving London&apos;s finest restaurants, hotels, and caterers since 2003.</p>
          <p className="font-serif text-[13px] italic text-[#AE8C57]/28">From Soil to Supply.</p>
          <div className="flex gap-7 text-[10px] tracking-[.12em] text-[#F5EFE3]/15">
            {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#F5EFE3]/40 transition-colors no-underline">{l}</a>)}
          </div>
          <div className="mt-2 h-px w-48 bg-white/[.03]" />
          <p className="text-[9px] text-[#F5EFE3]/10">&copy; {new Date().getFullYear()} TYDENE Fresh Produce Ltd. New Spitalfields Market, London E10 5SQ.</p>
        </div>
      </footer>
    </div>
  );
}
