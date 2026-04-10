"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════
   TYDENE — ONE CONTINUOUS CINEMATIC FILM
   14 scenes + brand reveal. No separate sections.
   Sleep-well-creatives style: one scroll, one story.
   ═══════════════════════════════════════════════════════════════ */

const scenes = [
  { img: "/images/stages/01-field.jpg", ey: "LONDON'S TRUSTED WHOLESALE PARTNER", h: "From Soil\nto Supply.", tx: "Premium fresh produce, delivered with precision.\nSupplying London's finest kitchens since 2003." },
  { img: "/images/stages/02-ripening.jpg", ey: "RIPENING", h: "Nature's\nbest work.", tx: "Sun, patience, care.\nThe product earns its colour before its journey." },
  { img: "/images/stages/03-selection.jpg", ey: "CHOSEN BY HAND", h: "Selected\nwith care.", tx: "Every piece is inspected, touched, chosen.\nQuality begins at the source." },
  { img: "/images/stages/04-detach.jpg", ey: "THE JOURNEY BEGINS", h: "Picked from\nthe vine.", tx: "A gentle twist. A careful pull.\nThe journey starts the moment it leaves." },
  { img: "/images/stages/05-drop.jpg", ey: "CINEMATIC DROP", h: "Then\neverything\nmoves.", tx: "Nature becomes supply chain.\nFrom the hand to the crate to the city." },
  { img: "/images/stages/06-sorting.jpg", ey: "QUALITY CONTROL", h: "Inspected.\nSorted.\nApproved.", tx: "Colour, firmness, freshness — every piece checked.\nOnly the best make the cut." },
  { img: "/images/stages/07-packing.jpg", ey: "PACKING", h: "Crated with\nprecision.", tx: "Wooden crates. Careful stacking.\nEvery crate is a promise of freshness." },
  { img: "/images/real/tydene-warehouse.jpg", ey: "NEW SPITALFIELDS MARKET", h: "TYDENE\nwarehouse.", tx: "Stands 5-6 & 29. Purveyors of quality\nfruit and vegetables since 2003." },
  { img: "/images/stages/08-truck.jpg", ey: "LOADING", h: "Moving\nbefore dawn.", tx: "Midnight starts. Cold chains.\nPrecision routes across London." },
  { img: "/images/real/tydene-van.jpg", ey: "DELIVERY", h: "TYDENE\non the road.", tx: "Our vans move while the city sleeps.\nFrom market to kitchen before sunrise." },
  { img: "/images/stages/10-air.jpg", ey: "GLOBAL REACH", h: "Air freight.\nGlobal chain.", tx: "When the season demands it, cargo moves by air.\nFreshness has no borders." },
  { img: "/images/stages/12-london.jpg", ey: "ARRIVAL", h: "London\nawakens.", tx: "New Spitalfields stirs. Markets open.\nRestaurants prep. The city is hungry." },
  { img: "/images/produce/mixed-fresh.jpg", ey: "200+ PRODUCTS", h: "Every fruit.\nEvery vegetable.", tx: "Tomatoes, peppers, greens, citrus, herbs, exotics.\nOver 200 product lines, sourced daily." },
  { img: "/images/produce/kitchen.jpg", ey: "FROM FIELD TO TABLE", h: "Your kitchen.\nOur promise.", tx: "The chain holds because the standards do.\n22 years of trust, delivered fresh." },
];

const N = scenes.length;

/* Helper: get scene boundaries */
function bounds(i: number) {
  const len = 1 / (N + 1); // +1 for brand reveal
  return { s: i * len, e: (i + 1) * len, len };
}

/* ═══ SCENE IMAGE — crossfade between full-screen photos ═══ */
function SceneImg({ p, i }: { p: MotionValue<number>; i: number }) {
  const { s, e, len } = bounds(i);

  /* Opacity: fade in before scene start, hold, fade out after scene end.
     First scene starts at opacity 1. All use same z-index — opacity handles stacking. */
  const fade = len * 0.15;
  const opacity = useTransform(p,
    i === 0
      ? [0, e - fade, e]
      : [Math.max(0, s - fade), s, e - fade, e],
    i === 0
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );

  /* Ken Burns zoom */
  const scale = useTransform(p, [s, e], i % 2 === 0 ? [1, 1.08] : [1.06, 1]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, zIndex: 1 }}
    >
      <motion.div className="h-full w-full" style={{ scale }}>
        {/* ALL images loaded eagerly — they're all in the same viewport */}
        <Image src={scenes[i].img} alt="" fill className="object-cover" sizes="100vw" loading="eager" />
      </motion.div>
      {/* Minimal overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[15%] bg-gradient-to-t from-black/20 to-transparent" />
    </motion.div>
  );
}

/* ═══ SCENE TEXT — title + description ═══ */
function SceneTxt({ p, i }: { p: MotionValue<number>; i: number }) {
  const { s, e, len } = bounds(i);
  const { ey, h, tx } = scenes[i];
  const fade = len * 0.12;

  const opacity = useTransform(p,
    i === 0
      ? [0, e - fade * 2, e - fade]
      : [s + fade * 0.5, s + fade * 1.5, e - fade * 2, e - fade],
    i === 0
      ? [1, 1, 0]
      : [0, 1, 1, 0]
  );
  const y = useTransform(p,
    i === 0 ? [0, 0.001] : [s, s + fade * 2],
    [i === 0 ? 0 : 50, 0]
  );

  return (
    <motion.div className="absolute left-[5%] top-[18%] z-[50] max-w-[40rem] px-5 sm:left-[6%] sm:px-0 md:top-[22%]" style={{ opacity, y }}>
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[.4em] text-[#AE8C57] sm:text-[11px]">{ey}</div>
      <div className="mb-5 h-[1.5px] w-10 bg-[#AE8C57]/50" />
      <h2 className="whitespace-pre-line font-serif text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[.88] tracking-[-.03em] text-white [text-shadow:0_2px_25px_rgba(0,0,0,.5)]">{h}</h2>
      <p className="mt-5 max-w-[28rem] whitespace-pre-line text-[14px] leading-[1.9] text-white/55 sm:text-[15px] [text-shadow:0_1px_10px_rgba(0,0,0,.4)]">{tx}</p>
    </motion.div>
  );
}

/* ═══ PERSISTENT TOMATO ═══ */
function Tomato({ p }: { p: MotionValue<number> }) {
  const t = Array.from({ length: N + 2 }, (_, i) => Math.min(1, i / (N + 1)));
  const x = useTransform(p, t, [62, 55, 58, 52, 50, 50, 55, 40, 60, 35, 65, 55, 50, 70, 50, 50]);
  const y = useTransform(p, t, [38, 36, 42, 35, 20, 65, 58, 55, 62, 50, 45, 50, 55, 45, 42, 50]);
  const s = useTransform(p, t, [.7, 1.2, 1.5, 1.7, 1.3, .7, .5, .35, .3, .25, .2, .22, .25, .18, .15, 0]);
  const r = useTransform(p, t, [-3, 0, 3, 6, 0, 20, 10, 5, 3, 0, -2, 0, 2, 0, 0, 0]);
  const hue = useTransform(p, t, [65, 50, 30, 15, 10, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]);
  const o = useTransform(p, [0, .005, .88, .92], [1, 1, 1, 0]);
  const glow = useTransform(p, [0, .1, .2, .3, .5, .7, .9], [.12, .3, .45, .2, .1, .08, .04]);
  const bl = useTransform(p, [.28, .34, .38], [0, 3, 0]);

  return (
    <motion.div className="pointer-events-none absolute z-[40]" style={{
      left: useTransform(x, v => `${v}%`), top: useTransform(y, v => `${v}%`),
      opacity: o, filter: useTransform(bl, v => `blur(${v}px)`)
    }}>
      <motion.div style={{ scale: s, rotate: r, x: "-50%", y: "-50%" }} className="relative">
        <motion.div className="absolute -inset-20 rounded-full" style={{
          opacity: glow,
          background: "radial-gradient(circle,rgba(196,53,32,.2),rgba(174,140,87,.1) 45%,transparent 70%)",
          filter: "blur(30px)"
        }} />
        <svg viewBox="0 0 140 140" width="140" height="140" style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,.5))" }}>
          <defs><radialGradient id="tS" cx="38%" cy="33%" r="50%"><stop offset="0%" stopColor="white" stopOpacity=".18" /><stop offset="100%" stopColor="white" stopOpacity="0" /></radialGradient></defs>
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

/* ═══ BRAND REVEAL — final scene ═══ */
function Brand({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.93, .97, 1], [0, 1, 1]);
  const s = useTransform(p, [.93, .97], [.88, 1]);
  const bgO = useTransform(p, [.91, .95], [0, 1]);
  return (<>
    <motion.div className="absolute inset-0 z-[55]" style={{ opacity: bgO, background: "radial-gradient(ellipse 75% 65% at 50% 50%, #0e3528, #030906)" }} />
    <motion.div className="pointer-events-none absolute inset-0 z-[56] flex flex-col items-center justify-center px-6 text-center" style={{ opacity: o, scale: s }}>
      <div className="font-serif text-[clamp(3.5rem,10vw,7rem)] tracking-[.2em] text-white">TYDENE</div>
      <div className="my-4 h-px w-20 bg-[#AE8C57]" />
      <div className="text-[10px] uppercase tracking-[.45em] text-[#6B7750]">Fresh Produce Wholesalers · London</div>
      <div className="mt-4 font-serif text-lg italic text-white/40">Built on Trust. Delivered Fresh.</div>
      <div className="mt-2 text-[12px] text-white/25">New Spitalfields Market · E10 5SQ · 020 8558 8047</div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a className="pointer-events-auto rounded-full bg-[#AE8C57] px-9 py-4 text-sm font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline" href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
        <a className="pointer-events-auto rounded-full border border-white/20 px-9 py-4 text-sm text-white/65 hover:border-white/40 transition-colors no-underline" href="mailto:hello@tydene.co.uk">hello@tydene.co.uk</a>
      </div>
    </motion.div>
  </>);
}

/* ═══ SCENE COUNTER — bottom right ═══ */
function Counter({ p }: { p: MotionValue<number> }) {
  const { len } = bounds(0);
  const num = useTransform(p, v => String(Math.min(N, Math.floor(v / len) + 1)).padStart(2, "0"));
  const o = useTransform(p, [0, .01, .9, .93], [0, 1, 1, 0]);
  return (
    <motion.div className="fixed bottom-8 right-8 z-[200] hidden items-end gap-1.5 font-mono md:flex" style={{ opacity: o }}>
      <motion.div className="text-[24px] font-bold text-[#AE8C57]">{num}</motion.div>
      <div className="mb-1 text-[10px] text-white/20">/{N}</div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   HOME — THE FILM
   ═══════════════════════════════════════ */
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pw = useTransform(p, v => `${v * 100}%`);

  return (
    <div className="min-h-screen bg-[#030906] text-white">
      {/* Progress */}
      <motion.div className="fixed left-0 top-0 z-[300] h-[2px]" style={{ width: pw, background: "linear-gradient(90deg, #AE8C57, #C43520 50%, #AE8C57)" }} />

      {/* Film grain */}
      <div className="pointer-events-none fixed inset-0 z-[290] opacity-[.015] mix-blend-overlay [background-size:200px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-[280] flex h-14 items-center justify-between px-[5%]" style={{ background: "linear-gradient(180deg, rgba(0,0,0,.35) 0%, transparent 100%)" }}>
        <span className="text-[12px] font-bold tracking-[.25em] text-white">TYDENE</span>
        <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57]/90 px-5 py-1.5 text-[10px] font-semibold text-[#2B221C] no-underline">Contact</a>
      </header>

      {/* Counter */}
      <Counter p={p} />

      {/* ════════ THE FILM ════════ */}
      <section ref={ref} className="relative" style={{ height: `${(N + 1) * 150}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* All scene photos — same z-index, opacity handles visibility */}
          {scenes.map((_, i) => <SceneImg key={i} p={p} i={i} />)}

          {/* Tomato — flows through everything */}
          <Tomato p={p} />

          {/* All scene texts */}
          {scenes.map((_, i) => <SceneTxt key={i} p={p} i={i} />)}

          {/* Brand reveal */}
          <Brand p={p} />

          {/* Scroll hint */}
          <motion.div className="absolute bottom-8 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-3" style={{ opacity: useTransform(p, [0, .02, .04], [1, 1, 0]) }}>
            <span className="text-[9px] uppercase tracking-[.4em] text-white/20">Scroll to begin</span>
            <motion.div className="h-7 w-px bg-white/12" animate={{ scaleY: [.3, 1, .3] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
          </motion.div>

          {/* Stage dots */}
          <div className="fixed right-5 top-1/2 z-[250] hidden -translate-y-1/2 flex-col gap-[5px] md:flex">
            {scenes.map((_, i) => {
              const { s, e } = bounds(i);
              return <motion.div key={i} className="h-1 w-1 rounded-full bg-[#AE8C57]" style={{
                opacity: useTransform(p, [s, s + .005, e - .005, e], [.15, .9, .9, .15]),
                scale: useTransform(p, [s, s + .005, e - .005, e], [.6, 1.4, 1.4, .6])
              }} />;
            })}
          </div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 z-[52]" style={{ boxShadow: "inset 0 0 100px 20px rgba(0,0,0,.12)" }} />
        </div>
      </section>
    </div>
  );
}
