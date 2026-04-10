"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════
   TYDENE — ONE CONTINUOUS CINEMATIC SCROLL
   Inspired by sleep-well-creatives.com
   No separate sections. One film. One story. One scroll.
   ═══════════════════════════════════════════════════════════════════ */

/* ── ALL SCENES — the complete film ── */
const film = [
  // ACT 1: THE FIELD
  { img: "/images/stages/01-field.jpg", ey: "LONDON'S TRUSTED WHOLESALE PARTNER", h: "From Soil\nto Supply.", tx: "Premium fresh produce, delivered with precision.\nSupplying London's finest kitchens since 2003." },
  // ACT 2: RIPENING
  { img: "/images/stages/02-ripening.jpg", ey: "RIPENING", h: "Nature's\nbest work.", tx: "Sun, patience, care.\nThe product earns its colour before its journey." },
  // ACT 3: SELECTION
  { img: "/images/stages/03-selection.jpg", ey: "CHOSEN BY HAND", h: "Selected\nwith care.", tx: "Every piece is inspected, touched, chosen.\nQuality begins at the source." },
  // ACT 4: THE PICK
  { img: "/images/stages/04-detach.jpg", ey: "THE JOURNEY BEGINS", h: "Picked from\nthe vine.", tx: "A gentle twist. A careful pull.\nThe journey starts the moment it leaves." },
  // ACT 5: THE DROP — cinematic pivot
  { img: "/images/stages/05-drop.jpg", ey: "CINEMATIC DROP", h: "Then\neverything\nmoves.", tx: "Nature becomes supply chain.\nFrom the hand to the crate to the city." },
  // ACT 6: SORTING
  { img: "/images/stages/06-sorting.jpg", ey: "QUALITY CONTROL", h: "Inspected.\nSorted.\nApproved.", tx: "Colour, firmness, freshness — every piece checked.\nOnly the best make the cut." },
  // ACT 7: PACKING
  { img: "/images/stages/07-packing.jpg", ey: "PACKING", h: "Crated with\nprecision.", tx: "Wooden crates. Careful stacking.\nEvery crate is a promise of freshness." },
  // ACT 8: THE REAL WAREHOUSE — TYDENE
  { img: "/images/real/tydene-warehouse.jpg", ey: "NEW SPITALFIELDS MARKET", h: "TYDENE\nwarehouse.", tx: "Stands 5-6 & 29. Purveyors of quality\nfruit and vegetables since 2003." },
  // ACT 9: LOADING
  { img: "/images/stages/08-truck.jpg", ey: "LOADING", h: "Moving\nbefore dawn.", tx: "Midnight starts. Cold chains.\nPrecision routes across London." },
  // ACT 10: TYDENE VAN — real delivery
  { img: "/images/real/tydene-van.jpg", ey: "DELIVERY", h: "TYDENE\non the road.", tx: "Our vans move while the city sleeps.\nFrom market to kitchen before sunrise." },
  // ACT 11: AIR FREIGHT
  { img: "/images/stages/10-air.jpg", ey: "GLOBAL REACH", h: "Air freight.\nGlobal chain.", tx: "When the season demands it, cargo moves by air.\nFreshness has no borders." },
  // ACT 12: LONDON ARRIVAL
  { img: "/images/stages/12-london.jpg", ey: "ARRIVAL", h: "London\nawakens.", tx: "New Spitalfields stirs. Markets open.\nRestaurants prep. The city is hungry." },
  // ACT 13: THE PRODUCE — what we deliver
  { img: "/images/produce/mixed-fresh.jpg", ey: "200+ PRODUCTS", h: "Every fruit.\nEvery vegetable.", tx: "Tomatoes, peppers, greens, citrus, herbs, exotics.\nOver 200 product lines, sourced daily." },
  // ACT 14: THE KITCHEN — destination
  { img: "/images/produce/kitchen.jpg", ey: "FROM FIELD TO TABLE", h: "Your kitchen.\nOur promise.", tx: "The chain holds because the standards do.\n22 years of trust, delivered fresh." },
];

const N = film.length; // 14 scenes
const sceneLen = 1 / (N + 1); // +1 for brand reveal at end

/* ── SCENE PHOTO — full-screen crossfade with Ken Burns ── */
function ScenePhoto({ p, idx }: { p: MotionValue<number>; idx: number }) {
  const start = idx * sceneLen;
  const end = (idx + 1) * sceneLen;
  const isFirst = idx === 0;

  const o = useTransform(p,
    isFirst ? [0, end - sceneLen * .15, end] : [start - sceneLen * .2, start, end - sceneLen * .15, end],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const scale = useTransform(p, [start, end], idx % 2 === 0 ? [1, 1.1] : [1.08, 1]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity: o, zIndex: idx + 1 }}>
      <motion.div className="h-full w-full" style={{ scale }}>
        <Image src={film[idx].img} alt="" fill className="object-cover" sizes="100vw" priority={idx < 4} />
      </motion.div>
      {/* Minimal overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-black/25 to-transparent" />
    </motion.div>
  );
}

/* ── SCENE TEXT — cinematic type ── */
function SceneType({ p, idx }: { p: MotionValue<number>; idx: number }) {
  const start = idx * sceneLen;
  const end = (idx + 1) * sceneLen;
  const isFirst = idx === 0;
  const { ey, h, tx } = film[idx];

  const o = useTransform(p,
    isFirst ? [0, end - sceneLen * .2, end - sceneLen * .05] : [start + sceneLen * .05, start + sceneLen * .15, end - sceneLen * .2, end - sceneLen * .05],
    isFirst ? [1, 1, 0] : [0, 1, 1, 0]
  );
  const y = useTransform(p,
    isFirst ? [0, .001] : [start, start + sceneLen * .2],
    [isFirst ? 0 : 60, 0]
  );

  return (
    <motion.div className="absolute left-[5%] top-[18%] z-[100] max-w-[42rem] px-5 sm:left-[6%] sm:px-0 md:top-[22%]" style={{ opacity: o, y }}>
      <motion.div className="mb-3 text-[10px] font-medium uppercase tracking-[.4em] text-[#AE8C57] sm:text-[11px]">{ey}</motion.div>
      <div className="mb-5 h-[1.5px] w-10 bg-[#AE8C57]/50" />
      <h2 className="whitespace-pre-line font-serif text-[clamp(2.5rem,7.5vw,5.5rem)] font-semibold leading-[.86] tracking-[-.03em] text-white" style={{ textShadow: "0 2px 25px rgba(0,0,0,.5)" }}>{h}</h2>
      <p className="mt-6 max-w-[28rem] whitespace-pre-line text-[15px] leading-[1.9] text-white/55" style={{ textShadow: "0 1px 10px rgba(0,0,0,.4)" }}>{tx}</p>
    </motion.div>
  );
}

/* ── PERSISTENT TOMATO — flows through the ENTIRE scroll ── */
function Tomato({ p }: { p: MotionValue<number> }) {
  // 15 keyframes across the full scroll — tomato travels through every scene
  const keys = [0, .07, .13, .2, .27, .33, .4, .47, .53, .6, .67, .73, .8, .87, .93, 1];
  //              field ripe  sel   pick  DROP  sort  pack  ware  truck van   air   lon   prod  kitch brand
  const xK =    [62,   55,   58,   52,   50,   50,   55,   40,   60,   35,   65,   55,   50,   70,   50,   50];
  const yK =    [38,   36,   42,   35,   20,   65,   58,   55,   62,   50,   45,   50,   55,   45,   42,   50];
  const sK =    [.7,   1.2,  1.5,  1.7,  1.3,  .7,   .5,   .35,  .3,   .25,  .2,   .22,  .25,  .18,  .15,  0];
  const rK =    [-3,   0,    3,    6,    0,    20,   10,   5,    3,    0,    -2,   0,    2,    0,    0,    0];
  const hueK =  [65,   50,   30,   15,   10,   8,    8,    8,    8,    8,    8,    8,    8,    8,    8,    8];

  const x = useTransform(p, keys, xK);
  const y = useTransform(p, keys, yK);
  const s = useTransform(p, keys, sK);
  const r = useTransform(p, keys, rK);
  const hue = useTransform(p, keys, hueK);
  const o = useTransform(p, [0, .005, .88, .93], [1, 1, 1, 0]);
  const glow = useTransform(p, [0, .1, .2, .33, .5, .7, .9], [.12, .3, .45, .2, .1, .08, .04]);
  const bl = useTransform(p, [.3, .36, .4], [0, 3, 0]); // blur during drop

  return (
    <motion.div className="pointer-events-none absolute z-[90]" style={{
      left: useTransform(x, v => `${v}%`),
      top: useTransform(y, v => `${v}%`),
      opacity: o,
      filter: useTransform(bl, v => `blur(${v}px)`)
    }}>
      <motion.div style={{ scale: s, rotate: r, x: "-50%", y: "-50%" }} className="relative">
        {/* Glow */}
        <motion.div className="absolute -inset-20 rounded-full" style={{
          opacity: glow,
          background: "radial-gradient(circle,rgba(196,53,32,.2),rgba(174,140,87,.1) 45%,transparent 70%)",
          filter: "blur(30px)"
        }} />
        {/* SVG Tomato */}
        <svg viewBox="0 0 140 140" width="140" height="140" style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,.5))" }}>
          <defs>
            <radialGradient id="tS" cx="38%" cy="33%" r="50%"><stop offset="0%" stopColor="white" stopOpacity=".18" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="70" cy="132" rx="36" ry="6" fill="black" opacity=".18" />
          <motion.ellipse cx="70" cy="72" rx="48" ry="46" style={{ fill: useTransform(hue, v => `hsl(${v},72%,${v < 15 ? 42 : 45}%)`) }} />
          <motion.ellipse cx="56" cy="58" rx="18" ry="14" opacity=".2" style={{ fill: useTransform(hue, v => `hsl(${v + 8},58%,${v < 15 ? 55 : 58}%)`) }} />
          <ellipse cx="70" cy="72" rx="48" ry="46" fill="url(#tS)" />
          <ellipse cx="50" cy="50" rx="9" ry="5.5" fill="white" opacity=".14" />
          <ellipse cx="88" cy="66" rx="3" ry="4.5" fill="white" opacity=".16" />
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

/* ── BRAND FINAL REVEAL ── */
function BrandReveal({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.93, .97, 1], [0, 1, 1]);
  const s = useTransform(p, [.93, .97], [.88, 1]);
  const bgO = useTransform(p, [.91, .95], [0, 1]);

  return (<>
    <motion.div className="absolute inset-0 z-[95]" style={{ opacity: bgO, background: "radial-gradient(ellipse 75% 65% at 50% 50%, #0e3528, #030906)" }} />
    <motion.div className="pointer-events-none absolute inset-0 z-[96] flex flex-col items-center justify-center px-6 text-center" style={{ opacity: o, scale: s }}>
      <div className="font-serif text-[clamp(3.5rem,10vw,7rem)] tracking-[.2em] text-white">TYDENE</div>
      <div className="my-4 h-px w-20 bg-[#AE8C57]" />
      <div className="text-[10px] uppercase tracking-[.45em] text-[#6B7750]">Fresh Produce Wholesalers · London</div>
      <div className="mt-4 font-serif text-lg italic text-white/40 sm:text-xl">Built on Trust. Delivered Fresh.</div>
      <div className="mt-3 text-[12px] text-white/25">New Spitalfields Market · London E10 5SQ</div>
      <div className="mt-3 text-[12px] text-white/25">020 8558 8047 · Mon–Sat: Midnight – 11AM</div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a className="pointer-events-auto rounded-full bg-[#AE8C57] px-9 py-4 text-sm font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline" href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a className="pointer-events-auto rounded-full border border-white/20 px-9 py-4 text-sm text-white/65 hover:border-white/40 transition-colors no-underline" href="mailto:hello@tydene.co.uk">hello@tydene.co.uk</a>
      </div>
    </motion.div>
  </>);
}

/* ── SCENE COUNTER — shows which act we're on ── */
function SceneCounter({ p }: { p: MotionValue<number> }) {
  const num = useTransform(p, v => {
    const idx = Math.min(N - 1, Math.floor(v / sceneLen));
    return String(idx + 1).padStart(2, "0");
  });
  const counterO = useTransform(p, [0, .02, .9, .93], [0, 1, 1, 0]);

  return (
    <motion.div className="fixed bottom-8 right-8 z-[150] hidden items-end gap-2 md:flex" style={{ opacity: counterO }}>
      <motion.div className="font-serif text-[28px] font-bold text-[#AE8C57]">{num}</motion.div>
      <div className="mb-1 text-[10px] text-white/20">/ {N}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HOME — ONE CONTINUOUS FILM
   ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const pw = useTransform(p, v => `${v * 100}%`);

  return (
    <div className="min-h-screen bg-[#030906] text-white">

      {/* ── Progress bar ── */}
      <motion.div className="fixed left-0 top-0 z-[200] h-[2px]" style={{ width: pw, background: "linear-gradient(90deg, #AE8C57, #C43520 50%, #AE8C57)" }} />

      {/* ── Film grain ── */}
      <div className="pointer-events-none fixed inset-0 z-[195] opacity-[.015] mix-blend-overlay [background-size:200px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ── Navigation — minimal, cinematic ── */}
      <header className="fixed inset-x-0 top-0 z-[180] flex h-16 items-center justify-between px-[5%]" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.4) 0%, transparent 100%)" }}>
        <a href="#" className="text-[12px] font-bold tracking-[.25em] text-white no-underline">TYDENE</a>
        <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57]/90 px-5 py-[6px] text-[10px] font-semibold text-[#2B221C] hover:bg-[#AE8C57] transition-colors no-underline">Contact</a>
      </header>

      {/* ── Scene counter ── */}
      <SceneCounter p={p} />

      {/* ═══════════════════════════════════════════
           THE FILM — one continuous scroll
           14 scenes + brand reveal
           2100vh total
         ═══════════════════════════════════════════ */}
      <section ref={scrollRef} className="relative h-[2100vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Full-screen photographs — crossfading */}
          {film.map((_, i) => <ScenePhoto key={i} p={p} idx={i} />)}

          {/* Persistent tomato — flows through everything */}
          <Tomato p={p} />

          {/* Scene texts */}
          {film.map((_, i) => <SceneType key={i} p={p} idx={i} />)}

          {/* Brand final */}
          <BrandReveal p={p} />

          {/* Scroll indicator — first scene only */}
          <motion.div className="absolute bottom-10 left-1/2 z-[110] flex -translate-x-1/2 flex-col items-center gap-3" style={{ opacity: useTransform(p, [0, .02, .04], [1, 1, 0]) }}>
            <span className="text-[9px] uppercase tracking-[.4em] text-white/20">Scroll to begin the journey</span>
            <motion.div className="h-8 w-px bg-white/12" animate={{ scaleY: [.3, 1, .3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>

          {/* Stage progress dots — right side */}
          <div className="fixed right-5 top-1/2 z-[150] hidden -translate-y-1/2 flex-col gap-[5px] md:flex">
            {film.map((_, i) => {
              const start = i * sceneLen;
              const end = (i + 1) * sceneLen;
              return (
                <motion.div key={i} className="h-[4px] w-[4px] rounded-full bg-[#AE8C57]" style={{
                  opacity: useTransform(p, [start, start + .005, end - .005, end], [.15, .9, .9, .15]),
                  scale: useTransform(p, [start, start + .005, end - .005, end], [.5, 1.3, 1.3, .5])
                }} />
              );
            })}
          </div>

          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 z-[92]" style={{ boxShadow: "inset 0 0 100px 25px rgba(0,0,0,.15)" }} />
        </div>
      </section>
    </div>
  );
}
