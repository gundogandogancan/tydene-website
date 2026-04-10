"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView, type MotionValue } from "motion/react";

/* ════════════════════════════════════════════════════════════
   TYDENE — Premium Cinematic Website
   From Soil to Supply
   ════════════════════════════════════════════════════════════ */

/* ─── TOMATO ─── */
function Tomato({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0,.15,.3,.42,.5,.62,.75,.87,1], [56,52,55,50,50,60,55,50,50]);
  const y = useTransform(p, [0,.15,.3,.42,.5,.62,.75,.87,1], [40,38,42,22,66,62,48,42,42]);
  const s = useTransform(p, [0,.15,.3,.42,.5,.62,.75,.87,1], [.9,1.5,1.7,1.2,.85,.6,.55,.45,0]);
  const r = useTransform(p, [0,.15,.3,.42,.5,.62,.75,.87,1], [-3,0,2,0,14,4,0,0,0]);
  const o = useTransform(p, [0,.04,.84,.91], [0,1,1,0]);
  const hue = useTransform(p, [0,.15,.28,1], [62,42,10,8]);
  const glow = useTransform(p, [.1,.25,.4,.6,.8], [.08,.45,.12,.15,.2]);
  const bl = useTransform(p, [.43,.47,.5], [0,2.5,0]);
  const lPct = useTransform(x, v => `${v}%`);
  const tPct = useTransform(y, v => `${v}%`);
  const fBl = useTransform(bl, v => `blur(${v}px)`);
  const fill = useTransform(hue, v => `hsl(${v},74%,${v<18?43:47}%)`);
  const hi = useTransform(hue, v => `hsl(${v+8},60%,${v<18?58:62}%)`);

  return (
    <motion.div className="pointer-events-none absolute z-30" style={{ left:lPct, top:tPct, opacity:o, filter:fBl }}>
      <motion.div style={{ scale:s, rotate:r, x:"-50%", y:"-50%" }} className="relative">
        <motion.div className="absolute -inset-16 rounded-full" style={{ opacity:glow, background:"radial-gradient(circle,rgba(174,140,87,.4),rgba(196,53,32,.08) 55%,transparent 75%)", filter:"blur(25px)" }} />
        <svg viewBox="0 0 140 140" width="140" height="140" className="relative" style={{ filter:"drop-shadow(0 12px 35px rgba(0,0,0,.45))" }}>
          <defs>
            <radialGradient id="tSpec" cx="40%" cy="35%" r="50%"><stop offset="0%" stopColor="white" stopOpacity=".15"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient>
            <radialGradient id="tSh" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="black" stopOpacity=".22"/><stop offset="100%" stopColor="black" stopOpacity="0"/></radialGradient>
          </defs>
          <ellipse cx="70" cy="128" rx="34" ry="6" fill="url(#tSh)"/>
          <motion.ellipse cx="70" cy="72" rx="48" ry="46" style={{ fill }}/>
          <motion.ellipse cx="55" cy="58" rx="20" ry="16" style={{ fill:hi }} opacity=".18"/>
          <ellipse cx="70" cy="72" rx="48" ry="46" fill="url(#tSpec)"/>
          <ellipse cx="52" cy="52" rx="8" ry="5" fill="white" opacity=".12"/>
          <ellipse cx="86" cy="68" rx="3.5" ry="5" fill="white" opacity=".14"/>
          <ellipse cx="85" cy="65" rx="1.5" ry="1" fill="white" opacity=".25"/>
          <path d="M66 28L70 24L74 28L72 36L68 36Z" fill="#3a6525"/>
          <path d="M70 24L70 16" stroke="#2d4a18" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M62 30C54 22 46 26 49 32C52 30 58 29 62 30Z" fill="#4a7a2a"/>
          <path d="M78 30C86 22 94 26 91 32C88 30 82 29 78 30Z" fill="#4a7a2a"/>
          <path d="M66 27C63 17 57 13 59 22Z" fill="#3d6b22"/>
          <path d="M74 27C77 17 83 13 81 22Z" fill="#3d6b22"/>
          <path d="M70 26C68 50 67 72 70 118" stroke="rgba(0,0,0,.05)" strokeWidth=".7" fill="none"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── SCENE TEXT ─── */
function ST({ p, start, end, ey, h, tx }: { p: MotionValue<number>; start: number; end: number; ey: string; h: string; tx: string }) {
  const a = Math.max(0, start);
  const o = useTransform(p, [a, a+.03, end-.02, end], [0,1,1,0]);
  const yy = useTransform(p, [a, a+.04], [28,0]);
  return (
    <motion.div className="absolute left-[5.5%] top-[26%] z-20 max-w-[44rem] px-4 sm:px-0" style={{ opacity:o, y:yy }}>
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[.3em] text-[#AE8C57] sm:text-[11px]">{ey}</div>
      <div className="mb-5 h-[1.5px] w-10 rounded-full bg-[#AE8C57]/60"/>
      <h2 className="whitespace-pre-line font-serif text-[clamp(2.4rem,6.5vw,5rem)] font-semibold leading-[.9] tracking-[-.02em] text-[#F5EFE3]">{h}</h2>
      <p className="mt-5 max-w-[30rem] text-[14px] leading-[1.8] text-[#F5EFE3]/50 sm:text-[15px]">{tx}</p>
    </motion.div>
  );
}

/* ─── HAND ─── */
function Hand({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.28,.33,.42,.44], [0,1,1,0]);
  const r = useTransform(p, [.28,.34], ["110%","46%"]);
  const rot = useTransform(p, [.36,.42], [0,12]);
  return (
    <motion.div className="pointer-events-none absolute top-[26%] z-20" style={{ opacity:o, right:r, rotate:rot }}>
      <svg width="130" height="170" viewBox="0 0 130 170" style={{ filter:"drop-shadow(0 8px 20px rgba(0,0,0,.3))" }}>
        <path d="M65 12C53 12 36 30 30 55C24 77 30 98 36 108L47 138C50 148 58 158 68 158C78 158 88 148 91 138L98 108C103 92 103 70 93 48C84 28 74 12 65 12Z" fill="#c4a080" opacity=".92"/>
        <path d="M46 44C43 55 41 72 43 84" stroke="#a88060" strokeWidth="1" fill="none" opacity=".2"/>
        <path d="M64 36C62 55 59 76 61 92" stroke="#a88060" strokeWidth=".8" fill="none" opacity=".15"/>
        <ellipse cx="52" cy="26" rx="10" ry="15" fill="#cba888" opacity=".55"/>
        <ellipse cx="65" cy="20" rx="9" ry="16" fill="#cba888" opacity=".65"/>
        <ellipse cx="78" cy="28" rx="9" ry="14" fill="#cba888" opacity=".55"/>
      </svg>
    </motion.div>
  );
}

/* ─── CRATE ─── */
function Crate({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.48,.52,.6,.63], [0,1,1,.2]);
  const t = useTransform(p, [.48,.55], ["80%","62%"]);
  return (
    <motion.div className="pointer-events-none absolute left-1/2 z-[18] -translate-x-1/2" style={{ opacity:o, top:t }}>
      <svg width="260" height="160" viewBox="0 0 260 160" style={{ filter:"drop-shadow(0 6px 18px rgba(0,0,0,.25))" }}>
        <rect x="10" y="12" width="240" height="130" rx="5" fill="#5a4530"/>
        <rect x="10" y="12" width="240" height="130" rx="5" fill="none" stroke="#8a7558" strokeWidth="1.5"/>
        <line x1="10" y1="52" x2="250" y2="52" stroke="#7a6548" strokeWidth="1" opacity=".4"/>
        <line x1="10" y1="92" x2="250" y2="92" stroke="#7a6548" strokeWidth="1" opacity=".4"/>
        <line x1="130" y1="12" x2="130" y2="142" stroke="#7a6548" strokeWidth=".6" opacity=".2"/>
        <text x="130" y="79" textAnchor="middle" fill="#ae8c57" opacity=".3" fontSize="12" fontFamily="serif" letterSpacing="5">TYDENE</text>
        {/* Mini tomatoes in crate */}
        <circle cx="60" cy="35" r="10" fill="#c43520" opacity=".35"/>
        <circle cx="85" cy="32" r="8" fill="#b83a20" opacity=".3"/>
        <circle cx="170" cy="34" r="9" fill="#c44520" opacity=".3"/>
        <circle cx="200" cy="36" r="7" fill="#b83a20" opacity=".25"/>
      </svg>
    </motion.div>
  );
}

/* ─── TRUCK ─── */
function Truck({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.6,.65,.73,.76], [0,1,1,0]);
  const l = useTransform(p, [.62,.74], ["-15%","55%"]);
  const rx = useTransform(p, [.62,.74], ["0%","-40%"]);
  return (<>
    <motion.div className="pointer-events-none absolute bottom-[20%] z-[17]" style={{ opacity:o, left:l }}>
      <svg width="220" height="110" viewBox="0 0 220 110" style={{ filter:"drop-shadow(0 4px 12px rgba(0,0,0,.3))" }}>
        <rect x="0" y="8" width="150" height="68" rx="4" fill="#e8e0d4"/>
        <rect x="150" y="22" width="62" height="54" rx="3" fill="#d4ccc0"/>
        <rect x="156" y="30" width="30" height="22" rx="2" fill="#8eaac4" opacity=".5"/>
        <rect x="4" y="12" width="142" height="58" rx="2" fill="#c43520" opacity=".04"/>
        <text x="75" y="48" textAnchor="middle" fill="#183c2e" opacity=".18" fontSize="9" fontFamily="serif" letterSpacing="3">TYDENE</text>
        <circle cx="38" cy="82" r="12" fill="#222"/><circle cx="38" cy="82" r="5.5" fill="#444"/>
        <circle cx="118" cy="82" r="12" fill="#222"/><circle cx="118" cy="82" r="5.5" fill="#444"/>
        <circle cx="180" cy="82" r="10" fill="#222"/><circle cx="180" cy="82" r="4.5" fill="#444"/>
        {/* Headlights */}
        <rect x="208" y="34" width="4" height="8" rx="1" fill="#f0d870" opacity=".6"/>
        <rect x="208" y="48" width="4" height="8" rx="1" fill="#f05050" opacity=".4"/>
      </svg>
    </motion.div>
    <motion.div className="pointer-events-none absolute bottom-[14%] z-[12] flex w-[300%] gap-5" style={{ opacity:o, x:rx }}>
      {Array.from({length:60}).map((_,i) => <div key={i} className="h-[2px] w-[22px] shrink-0 rounded-full bg-white/[.08]"/>)}
    </motion.div>
  </>);
}

/* ─── BRAND REVEAL ─── */
function Brand({ p }: { p: MotionValue<number> }) {
  const o = useTransform(p, [.88,.94,1], [0,1,1]);
  const s = useTransform(p, [.88,.95], [.8,1]);
  return (
    <motion.div className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center px-6 text-center" style={{ opacity:o, scale:s }}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(174,140,87,.06),transparent_70%)]"/>
      <svg viewBox="0 0 100 130" fill="none" width="48" height="62" className="relative mb-5">
        <rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3"/><rect x="45" y="8" width="9" height="28" fill="#F5EFE3"/><rect x="46" y="34" width="7" height="26" fill="#F5EFE3"/>
        <line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round"/><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round"/>
        <line x1="24" y1="95" x2="76" y2="95" stroke="#F5EFE3" strokeWidth="2.2" strokeLinecap="round" opacity=".5"/><line x1="16" y1="104" x2="84" y2="104" stroke="#F5EFE3" strokeWidth="1.6" strokeLinecap="round" opacity=".28"/>
      </svg>
      <div className="relative font-serif text-[clamp(2.8rem,7vw,5rem)] tracking-[.2em] text-[#F5EFE3]">TYDENE</div>
      <div className="my-4 h-px w-16 bg-[#AE8C57]"/>
      <div className="text-[10px] uppercase tracking-[.35em] text-[#6B7750]">Fresh Produce Wholesalers</div>
      <div className="mt-4 font-serif text-lg italic text-[#F5EFE3]/50 sm:text-xl">Built on Trust. Delivered Fresh.</div>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a className="pointer-events-auto rounded-full bg-[#AE8C57] px-7 py-3 text-[13px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline" href="#contact">Get in Touch</a>
        <a className="pointer-events-auto rounded-full border border-white/15 px-7 py-3 text-[13px] text-[#F5EFE3]/70 hover:border-white/30 transition-colors no-underline" href="#story">Our Story →</a>
      </div>
    </motion.div>
  );
}

/* ─── REVEAL WRAPPER ─── */
function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: .7, ease: [.22,1,.36,1], delay }}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const bg = useTransform(p, [0,.15,.3,.42,.5,.62,.75,.87,1],
    ["#061008","#0c1e0e","#1a1408","#16100a","#2a2015","#08091a","#0c1810","#0e3528","#0e3528"]);
  const pw = useTransform(p, v => `${v * 100}%`);

  // Glow system
  const gX = useTransform(p, [0,.2,.42,.6,.8,1], [58,48,50,62,52,50]);
  const gY = useTransform(p, [0,.2,.42,.6,.8,1], [38,40,58,55,42,42]);
  const gXP = useTransform(gX, v => `${v}%`);
  const gYP = useTransform(gY, v => `${v}%`);
  const gO = useTransform(p, [0,.05,.25,.42,.55,.75,.87,1], [.18,.35,.28,.2,.15,.22,.12,.08]);

  // Field
  const fO = useTransform(p, [0,.05,.22,.3], [.65,1,.55,0]);
  const fS = useTransform(p, [0,.3], [1,1.1]);
  const lO = useTransform(p, [0,.05,.17,.24], [1,1,.4,0]);

  // Stages
  const scenes = [
    { s:0, e:.15, ey:"LONDON'S TRUSTED WHOLESALE PARTNER", h:"From Soil\nto Supply.", tx:"Premium fresh produce, delivered with precision.\nSupplying London's finest kitchens since 2003." },
    { s:.15, e:.3, ey:"RIPENING", h:"Nature's\nbest work.", tx:"Sun, patience, care.\nThe product earns its colour before its journey." },
    { s:.3, e:.42, ey:"HARVEST", h:"Picked by\nhand.", tx:"Chosen with care, not rushed.\nQuality starts with what gets selected." },
    { s:.42, e:.5, ey:"TRANSITION", h:"Then everything\nmoves.", tx:"Nature becomes supply.\nThe field gives way to timing and motion." },
    { s:.5, e:.62, ey:"PACKING", h:"Sorted.\nSealed.\nStacked.", tx:"Every crate is a promise.\nOrganised, inspected, ready." },
    { s:.62, e:.75, ey:"TRANSPORT", h:"Moving\nbefore dawn.", tx:"Midnight starts. Cold chains. Precision routes.\nLondon doesn't wait." },
    { s:.75, e:.87, ey:"ARRIVAL", h:"London\nawakens.", tx:"New Spitalfields Market stirs.\nRestaurants prep. The city is hungry." },
  ];

  return (
    <div className="min-h-screen bg-[#061008] text-[#F5EFE3]">
      {/* Progress */}
      <motion.div className="fixed left-0 top-0 z-[120] h-[2px] bg-gradient-to-r from-[#AE8C57] to-[#C43520]" style={{ width:pw }}/>

      {/* Grain */}
      <div className="pointer-events-none fixed inset-0 z-[110] opacity-[.04] mix-blend-overlay [background-size:200px]" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-[100] flex h-[68px] items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-[5.5%]">
        <a href="#" className="flex items-center gap-2.5 text-[13px] font-bold tracking-[.2em] text-[#F5EFE3] no-underline">
          <svg viewBox="0 0 100 130" fill="none" width="16" height="21"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3"/><rect x="45" y="8" width="9" height="28" fill="#F5EFE3"/><rect x="46" y="34" width="7" height="26" fill="#F5EFE3"/><line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round"/><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round"/></svg>
          TYDENE
        </a>
        <nav className="hidden items-center gap-7 text-[11px] tracking-[.12em] text-[#F5EFE3]/45 md:flex">
          {["Story","Services","Produce","Contact"].map(l=><a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#F5EFE3] transition-colors no-underline">{l}</a>)}
          <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57] px-5 py-[6px] text-[10px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline">WhatsApp</a>
        </nav>
      </header>

      {/* ══════ CINEMATIC SCROLL ══════ */}
      <section ref={ref} className="relative h-[900vh]">
        <motion.div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor:bg }}>

          {/* GLOW — scroll-driven living light */}
          <motion.div className="pointer-events-none absolute z-[4] rounded-full" style={{ left:gXP, top:gYP, width:"45vw", height:"45vw", x:"-50%", y:"-50%", opacity:gO, background:"radial-gradient(circle,rgba(174,140,87,.45),rgba(174,140,87,.1) 45%,transparent 72%)", filter:"blur(60px)" }}/>

          {/* FIELD BG */}
          <motion.div className="absolute inset-0 z-[3]" style={{ scale:fS, opacity:fO }}>
            <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse 90% 70% at 55% 35%,rgba(26,58,16,.85),transparent 68%),radial-gradient(ellipse 50% 40% at 25% 75%,rgba(15,32,13,.65),transparent 55%),linear-gradient(175deg,#061008,#0c1e0f 40%,#1a1408 100%)"}}/>
            <div className="absolute -top-[12%] left-[15%] h-[75%] w-[50%] -rotate-[4deg]" style={{ background:"radial-gradient(ellipse at 45% 0%,rgba(174,140,87,.12),transparent 55%)"}}/>
          </motion.div>

          {/* PARTICLES */}
          <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
            {Array.from({length:18}).map((_,i)=>(
              <motion.div key={i} className="absolute rounded-full"
                style={{ left:`${4+(i*5.5)%92}%`, top:`${8+(i*7.7)%82}%`, width:i%4===0?3:2, height:i%4===0?3:2, background:i%3===0?"rgba(174,140,87,.5)":"rgba(245,239,227,.15)" }}
                animate={{ x:[0,10+i*2,22+i,6], y:[0,-(12+i*3),-(35+i*5),-(55+i*2)], opacity:[.08,.45,.2,0] }}
                transition={{ duration:5.5+i*.8, delay:i*.35, repeat:Infinity, ease:"easeInOut" }}/>
            ))}
          </div>

          {/* VINE */}
          <motion.svg className="pointer-events-none absolute left-[35%] top-0 z-[7] h-[55%] w-[28%]" style={{ opacity:useTransform(p,[0,.25,.32],[.35,.35,0]) }} viewBox="0 0 200 400" preserveAspectRatio="none">
            <path d="M100 0C95 80,112 160,100 240C88 300,105 360,100 400" stroke="#2d4a1e" strokeWidth="2.5" fill="none"/>
            <path d="M100 105C76 128,50 138,30 132" stroke="#2d4a1e" strokeWidth="1.5" fill="none" opacity=".5"/>
            <path d="M100 215C124 230,155 232,175 222" stroke="#2d4a1e" strokeWidth="1.5" fill="none" opacity=".5"/>
          </motion.svg>

          {/* LEAVES */}
          <motion.div className="pointer-events-none absolute inset-0 z-[8]" style={{ opacity:lO }}>
            {[
              { t:"8%",l:"12%",s:105,b:5,d:6.8,dl:0,o:.42 },
              { t:"20%",r:"9%",s:125,b:6,d:7.5,dl:1,o:.35 },
              { t:"11%",l:"33%",s:82,b:1.2,d:4.8,dl:.4,o:.55 },
              { t:"42%",r:"20%",s:78,b:1,d:5.2,dl:1.6,o:.5 },
              { t:"5%",l:"52%",s:58,b:.4,d:4.2,dl:.7,o:.6 },
              { bt:"10%",r:"11%",s:48,b:0,d:3.8,dl:.8,o:.55 },
            ].map((leaf,i)=>(
              <motion.div key={i} className="absolute" style={{ top:leaf.t, left:leaf.l, right:leaf.r, bottom:leaf.bt, width:leaf.s, height:leaf.s*1.35, filter:`blur(${leaf.b}px)` }}
                animate={{ rotate:[-3,4,-2], x:[-5,7,-3] }} transition={{ duration:leaf.d, delay:leaf.dl, repeat:Infinity, ease:"easeInOut" }}>
                <svg viewBox="0 0 80 112" fill="none" width="100%" height="100%">
                  <path d="M40 4C20 20 6 50 10 80C14 95 25 108 40 110C55 108 66 95 70 80C74 50 60 20 40 4Z" fill="#2e5f20" opacity={leaf.o}/>
                  <path d="M40 10V100" stroke="#17340f" strokeWidth="1.5" opacity=".25"/>
                  <path d="M40 35L28 52" stroke="#17340f" strokeWidth=".7" opacity=".15"/>
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* OVERLAYS */}
          <div className="absolute inset-0 z-[10] bg-gradient-to-r from-black/55 via-black/20 to-transparent"/>
          <div className="absolute inset-x-0 bottom-0 z-[10] h-[30%] bg-gradient-to-t from-black/45 to-transparent"/>

          {/* INTERACTIVE */}
          <Hand p={p}/><Crate p={p}/><Truck p={p}/>

          {/* TOMATO */}
          <Tomato p={p}/>

          {/* TEXTS */}
          {scenes.map((sc,i) => <ST key={i} p={p} start={sc.s} end={sc.e} ey={sc.ey} h={sc.h} tx={sc.tx}/>)}

          {/* BRAND */}
          <Brand p={p}/>

          {/* SCROLL INDICATOR */}
          <motion.div className="pointer-events-none absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2.5" style={{ opacity:useTransform(p,[0,.03,.06],[1,1,0]) }}>
            <span className="text-[9px] uppercase tracking-[.3em] text-white/20">Scroll to explore</span>
            <motion.div className="h-6 w-px bg-white/12" animate={{ scaleY:[.4,1,.4] }} transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}/>
          </motion.div>

          {/* VIGNETTE */}
          <div className="pointer-events-none absolute inset-0 z-[50]" style={{ boxShadow:"inset 0 0 220px 70px rgba(0,0,0,.5)" }}/>
        </motion.div>
      </section>

      {/* ══════ STORY ══════ */}
      <section id="story" className="relative overflow-hidden bg-[#0e3528]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_20%,rgba(174,140,87,.05),transparent)]"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_20%_80%,rgba(24,60,46,.2),transparent)]"/>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-14 md:py-36">
          <R><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">OUR STORY</div></R>
          <R delay={.05}><div className="mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></R>
          <div className="mt-10 grid gap-16 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <R delay={.1}><h3 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.02] text-[#F5EFE3]">Built on trust.<br/>Delivered fresh.</h3></R>
              <R delay={.2}><p className="mt-7 max-w-lg text-[15px] leading-[1.85] text-[#F5EFE3]/50">TYDENE was born from a simple belief: London deserves better produce. Not just fresher &mdash; but sourced with care, handled with respect, and delivered before the city wakes.</p></R>
              <R delay={.3}><p className="mt-5 max-w-lg text-[15px] leading-[1.85] text-[#F5EFE3]/50">Every morning our team begins the day&apos;s journey &mdash; inspecting, sorting, loading produce that meets our exacting standards. From Borough Market kitchens to Mayfair restaurants.</p></R>
              <R delay={.4}><div className="mt-8 flex items-center gap-4"><div className="h-px w-12 bg-[#AE8C57]/30"/><span className="font-serif text-[15px] italic text-[#AE8C57]/60">From Soil to Supply</span></div></R>
            </div>
            <R delay={.2}>
              <div className="rounded-2xl border border-[#F5EFE3]/[.04] bg-[#0a2a1e] p-10 md:p-12">
                <div className="text-[10px] uppercase tracking-[.25em] text-[#AE8C57]/65">The numbers</div>
                <div className="mt-8 grid grid-cols-2 gap-y-10 gap-x-8">
                  {[["Since 2003","Established"],["200+","Product Lines"],["6 Days","A Week"],["99%","On-Time"]].map(([v,l])=>(
                    <div key={l}><div className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] font-bold text-[#F5EFE3]">{v}</div><div className="mt-2 text-[11px] text-[#F5EFE3]/30">{l}</div></div>
                  ))}
                </div>
              </div>
            </R>
          </div>
        </div>
        <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/12 to-transparent"/>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section id="services" className="relative overflow-hidden bg-[#1e150e]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_30%_60%,rgba(43,34,28,.4),transparent)]"/>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-14 md:py-36">
          <R><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">WHAT WE DO</div></R>
          <R delay={.05}><div className="mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></R>
          <R delay={.1}><h3 className="mt-8 max-w-2xl font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-[#F5EFE3]">End-to-end wholesale<br/>for London</h3></R>
          <R delay={.15}><p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-[#F5EFE3]/42">From sourcing the finest produce to delivering it before dawn &mdash; we handle every step.</p></R>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[#F5EFE3]/[.04] md:grid-cols-3">
            {[
              ["01","Premium Sourcing","Direct relationships with trusted growers across the UK, Europe, and Mediterranean."],
              ["02","Quality Packing","Every item inspected, sorted, packed with precision. Temperature-controlled handling."],
              ["03","Dawn Delivery","Midnight starts from New Spitalfields Market. Cold chain integrity, precision routes."],
              ["04","Reliable Schedule","6 days a week, 52 weeks a year. Your business depends on our consistency."],
              ["05","Quality Guarantee","Not happy? We make it right. Our reputation is built on trust."],
              ["06","Bespoke Orders","Exotic ingredients, specific quantities, last-minute additions. We adapt to your menu."],
            ].map(([n,t,d],i)=>(
              <R key={n} delay={i*.06}>
                <div className="bg-[#1e150e] p-8 transition-colors hover:bg-[#25190f] h-full">
                  <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/35">{n}</div>
                  <h4 className="mt-4 font-serif text-xl text-[#F5EFE3]">{t}</h4>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#F5EFE3]/38">{d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
        <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/10 to-transparent"/>
      </section>

      {/* ══════ PRODUCE ══════ */}
      <section id="produce" className="relative overflow-hidden bg-[#0c2e22]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_60%_35%,rgba(26,58,16,.12),transparent)]"/>
        <div className="absolute inset-0 opacity-[.02]" style={{ backgroundImage:"radial-gradient(circle at 50% 50%,#AE8C57 .5px,transparent .5px)", backgroundSize:"32px 32px" }}/>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-14 md:py-36">
          <div className="text-center">
            <R><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">OUR PRODUCE</div></R>
            <R delay={.05}><div className="mx-auto mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></R>
            <R delay={.1}><h3 className="mt-8 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-[#F5EFE3]">The freshest for<br/>London&apos;s finest</h3></R>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              ["Tomatoes","Vine, Cherry, Beef, Plum, Heritage","#C43520"],
              ["Peppers","Bell, Chilli, Romano, Padron, Scotch Bonnet","#D4A017"],
              ["Salad & Greens","Lettuce, Rocket, Spinach, Kale, Watercress","#4A7A2A"],
              ["Citrus & Fruits","Lemons, Limes, Oranges, Berries, Avocados","#E8A800"],
              ["Herbs","Basil, Coriander, Mint, Parsley, Thyme, Rosemary","#6B8B3A"],
              ["Exotics","Aubergine, Okra, Plantain, Yam, Scotch Bonnet","#8B5A8A"],
            ].map(([t,d,c],i)=>(
              <R key={t} delay={i*.05}>
                <div className="group rounded-xl border border-[#F5EFE3]/[.04] bg-[#F5EFE3]/[.02] p-7 transition-colors hover:bg-[#F5EFE3]/[.04]">
                  <div className="mb-4 h-1.5 w-1.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity" style={{ background:c }}/>
                  <h4 className="font-serif text-lg text-[#F5EFE3]">{t}</h4>
                  <p className="mt-2 text-[12px] leading-[1.6] text-[#F5EFE3]/35">{d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
        <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/10 to-transparent"/>
      </section>

      {/* ══════ WHY TYDENE ══════ */}
      <section className="relative overflow-hidden bg-[#0e3528]">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 select-none font-serif text-[18vw] font-bold leading-none text-[#F5EFE3]/[.01]">TY</div>
        <div className="relative mx-auto max-w-5xl px-6 py-28 md:px-14 md:py-36">
          <R><div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
            {[["200+","Product Lines"],["22+","Years"],["6","Days/Week"],["99%","On-Time"]].map(([v,l])=>(
              <div key={l} className="text-center"><div className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] font-bold text-[#AE8C57]">{v}</div><div className="mt-2 text-[10px] uppercase tracking-[.2em] text-[#F5EFE3]/25">{l}</div></div>
            ))}
          </div></R>
          <R delay={.15}><div className="mt-20 text-center"><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">WHY TYDENE</div><div className="mx-auto mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></div></R>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[#F5EFE3]/[.04] md:grid-cols-2">
            {[["01","Trust","Over 200 London restaurants depend on us daily. Our word is our bond."],["02","Freshness","Harvest to kitchen in the shortest time. Cold chain integrity."],["03","Consistency","Same quality, every delivery, every morning."],["04","Relationships","We know our growers by name, our clients by preference."]].map(([n,t,d],i)=>(
              <R key={n} delay={i*.08}>
                <div className="bg-[#0e3528] p-9 transition-colors hover:bg-[#12402e] h-full">
                  <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/40">{n}</div>
                  <h4 className="mt-3 font-serif text-2xl text-[#F5EFE3]">{t}</h4>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#F5EFE3]/40">{d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
        <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/12 to-transparent"/>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="relative overflow-hidden bg-[#1e150e]">
        <div className="absolute top-10 left-[15%] select-none font-serif text-[7rem] leading-none text-[#AE8C57]/[.04]">&ldquo;</div>
        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:px-14 md:py-36">
          <R><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">TRUSTED BY LONDON&apos;S BEST</div></R>
          <R delay={.05}><div className="mx-auto mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></R>
          <R delay={.15}><blockquote className="mx-auto mt-12 max-w-3xl font-serif text-[clamp(1.1rem,2.5vw,1.5rem)] italic leading-[1.6] text-[#F5EFE3]/75">&ldquo;TYDENE transformed our kitchen operations. The consistency and quality of their produce means we can plan our menus with absolute confidence.&rdquo;</blockquote></R>
          <R delay={.25}><div className="mt-8"><div className="text-[13px] font-semibold text-[#F5EFE3]/75">James Crawford</div><div className="mt-1 text-[11px] text-[#F5EFE3]/30">Head Chef &mdash; The Ivy Collection</div></div></R>
        </div>
        <div className="mx-[5.5%] h-px bg-gradient-to-r from-transparent via-[#AE8C57]/10 to-transparent"/>
      </section>

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="relative overflow-hidden bg-[#0e3528]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_50%,rgba(174,140,87,.04),transparent)]"/>
        <div className="relative mx-auto max-w-6xl px-6 py-28 md:px-14 md:py-36">
          <R><div className="text-[10px] uppercase tracking-[.3em] text-[#AE8C57]">GET IN TOUCH</div></R>
          <R delay={.05}><div className="mt-3 h-[1.5px] w-10 bg-[#AE8C57]/50"/></R>
          <R delay={.1}><h3 className="mt-8 font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] text-[#F5EFE3]">Let&apos;s talk produce</h3></R>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-6">
              {[["EMAIL","hello@tydene.co.uk"],["PHONE","020 8558 8047"],["LOCATION","Stands 5-6 & 29, New Spitalfields Market, London E10 5SQ"],["HOURS","Mon–Sat: Midnight – 11AM"]].map(([k,v],i)=>(
                <R key={k} delay={.1+i*.05}><div><div className="text-[10px] uppercase tracking-[.2em] text-[#AE8C57]/70">{k}</div><div className="mt-1.5 text-[16px] text-[#F5EFE3]/70 md:text-lg">{v}</div></div></R>
              ))}
              <R delay={.35}>
                <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center gap-3 rounded-2xl border border-[#25D366]/18 bg-[#25D366]/[.05] px-5 py-4 text-[#25D366] hover:bg-[#25D366]/[.08] transition-colors no-underline">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <div><div className="text-[14px] font-semibold">WhatsApp Us</div><div className="text-[11px] text-[#F5EFE3]/35">Usually within 30 minutes</div></div>
                </a>
              </R>
            </div>
            <R delay={.15}>
              <div className="rounded-2xl border border-[#F5EFE3]/[.04] bg-black/18 p-7 backdrop-blur md:p-9">
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="rounded-xl border border-white/[.06] bg-white/[.02] px-4 py-3.5 text-[13px] text-[#F5EFE3] outline-none placeholder:text-white/18 focus:border-[#AE8C57]/20 transition-colors" placeholder="Your name"/>
                  <input className="rounded-xl border border-white/[.06] bg-white/[.02] px-4 py-3.5 text-[13px] text-[#F5EFE3] outline-none placeholder:text-white/18 focus:border-[#AE8C57]/20 transition-colors" placeholder="Email"/>
                  <input className="rounded-xl border border-white/[.06] bg-white/[.02] px-4 py-3.5 text-[13px] text-[#F5EFE3] outline-none placeholder:text-white/18 focus:border-[#AE8C57]/20 transition-colors md:col-span-2" placeholder="Business name"/>
                  <textarea className="min-h-[130px] rounded-xl border border-white/[.06] bg-white/[.02] px-4 py-3.5 text-[13px] text-[#F5EFE3] outline-none placeholder:text-white/18 focus:border-[#AE8C57]/20 transition-colors resize-none md:col-span-2" placeholder="Tell us about your produce requirements..."/>
                  <button className="rounded-full bg-[#AE8C57] px-6 py-3.5 text-[13px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors cursor-pointer border-none md:col-span-2">Send Message</button>
                </div>
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="border-t border-white/[.03] bg-[#050804] px-6 py-14 md:px-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <a href="#" className="flex items-center gap-2 text-[12px] font-bold tracking-[.2em] text-[#F5EFE3] no-underline">
            <svg viewBox="0 0 100 130" fill="none" width="14" height="18"><rect x="16" y="0" width="66" height="8" rx="1.5" fill="#F5EFE3"/><rect x="45" y="8" width="9" height="28" fill="#F5EFE3"/><rect x="46" y="34" width="7" height="26" fill="#F5EFE3"/><line x1="49" y1="63" x2="20" y2="80" stroke="#F5EFE3" strokeWidth="8" strokeLinecap="round"/><line x1="51" y1="63" x2="80" y2="82" stroke="#F5EFE3" strokeWidth="7" strokeLinecap="round"/></svg>
            TYDENE
          </a>
          <p className="max-w-xs text-[11px] leading-5 text-[#F5EFE3]/18">Premium fresh produce wholesalers serving London&apos;s finest since 2003.</p>
          <p className="font-serif text-[12px] italic text-[#AE8C57]/30">From Soil to Supply.</p>
          <div className="flex gap-6 text-[10px] tracking-[.1em] text-[#F5EFE3]/15">
            {["Story","Services","Produce","Contact"].map(l=><a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#F5EFE3]/35 transition-colors no-underline">{l}</a>)}
          </div>
          <div className="mt-1 h-px w-40 bg-white/[.03]"/>
          <p className="text-[9px] text-[#F5EFE3]/10">&copy; {new Date().getFullYear()} TYDENE Fresh Produce Ltd. New Spitalfields Market, London E10 5SQ.</p>
        </div>
      </footer>
    </div>
  );
}
