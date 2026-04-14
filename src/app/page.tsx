"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent } from "motion/react";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   TYDENE — LIVING CINEMATIC WEBSITE
   Every pixel moves. Every section breathes. Nothing is static.
   ═══════════════════════════════════════════════════════════ */

const reviews = [
  { name: "Marco Ricci", role: "Executive Chef — Mayfair", stars: 5, text: "TYDENE transformed our kitchen operations. The consistency means we plan menus with absolute confidence." },
  { name: "Sarah Chen", role: "Head Chef — Borough Market", stars: 5, text: "Freshest produce I've worked with in 15 years. They deliver before we even open, every single morning." },
  { name: "James Crawford", role: "Restaurant Owner — Soho", stars: 5, text: "We switched to TYDENE two years ago. Haven't looked back. Their quality control is exceptional." },
  { name: "Amara Osei", role: "Catering Director — Canary Wharf", stars: 5, text: "For large-scale events, reliability is everything. TYDENE has never let us down. Not once." },
  { name: "David Park", role: "Sous Chef — Shoreditch", stars: 5, text: "The exotic produce range is unmatched. Scotch bonnets, plantain, okra — always fresh, always available." },
  { name: "Elena Volkov", role: "Hotel F&B Manager — Kensington", stars: 5, text: "Premium quality at wholesale prices. Our guests notice the difference. That says everything." },
];

/* ── Reveal ── */
function R({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const v = useInView(ref, { once: true, margin: "-60px" });
  return <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={v ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease: [.22, 1, .36, 1], delay }}>{children}</motion.div>;
}

/* ── Parallax Image — moves on scroll ── */
function PImg({ src, alt, className = "", speed = 20, children }: { src: string; alt: string; className?: string; speed?: number; children?: React.ReactNode }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-15%]" style={{ y }}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="100vw" />
      </motion.div>
      {children}
    </div>
  );
}

/* ── Scale-on-scroll section ── */
function ScaleSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .5, 1], [.96, 1, .96]);
  const opacity = useTransform(scrollYProgress, [0, .2, .8, 1], [.7, 1, 1, .7]);
  return <motion.section ref={ref} className={className} style={{ scale, opacity }}>{children}</motion.section>;
}

/* ── Animated counter ── */
function Counter({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => { start += step; if (start >= end) { setCount(end); clearInterval(timer); } else setCount(Math.floor(start)); }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Star() {
  return <svg className="h-4 w-4 text-[#AE8C57]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>;
}

/* ── Marquee ── */
function Marquee() {
  const d = [...reviews, ...reviews];
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#12100c] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#12100c] to-transparent" />
      <motion.div className="flex gap-5" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
        {d.map((r, i) => (
          <div key={i} className="w-[320px] shrink-0 rounded-xl border border-white/[.05] bg-white/[.02] p-5">
            <div className="mb-2 flex gap-1">{Array.from({ length: r.stars }).map((_, j) => <Star key={j} />)}</div>
            <p className="text-[13px] italic leading-[1.6] text-white/50">&ldquo;{r.text}&rdquo;</p>
            <div className="mt-3 text-[12px] font-medium text-white/40">{r.name}</div>
            <div className="text-[10px] text-white/20">{r.role}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME — LIVING FILM
   ═══════════════════════════════════════ */
export default function Home() {
  const heroRef = useRef(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroP, [0, 1], ["0%", "40%"]);
  const heroScale = useTransform(heroP, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(heroP, [0, 1], [0, -80]);
  const heroO = useTransform(heroP, [0, .7], [1, 0]);

  /* ═══ PREMIUM INTRO / PRELOADER ═══ */
  const [entered, setEntered] = useState(false);
  const [introFading, setIntroFading] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Preload video in background during intro screen
  useEffect(() => {
    const v = vidRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.load();
    const onReady = () => setVideoLoaded(true);
    v.addEventListener("canplaythrough", onReady);
    v.addEventListener("loadeddata", onReady);
    // Fallback: after 4s assume loaded enough
    const t = setTimeout(() => setVideoLoaded(true), 4000);
    return () => { v.removeEventListener("canplaythrough", onReady); v.removeEventListener("loadeddata", onReady); clearTimeout(t); };
  }, []);

  // When user clicks "Enter" — start video + fade out intro
  const handleEnter = () => {
    setIntroFading(true);
    const v = vidRef.current;
    if (v) { v.muted = true; v.play().catch(() => {}); }
    setTimeout(() => setEntered(true), 1200);
  };

  return (
    <div className="min-h-screen bg-[#040a06] text-white overflow-x-hidden">

      {/* ═══ PREMIUM INTRO SCREEN ═══ */}
      {!entered && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040a06]"
          animate={introFading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1.2, ease: [.22, 1, .36, 1] }}
        >
          {/* Background subtle field image */}
          <div className="absolute inset-0 opacity-15">
            <Image src="/images/stages/01-field.jpg" alt="" fill className="object-cover" priority />
          </div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,#040a06_100%)]" />

          {/* Logo + Content */}
          <motion.div className="relative z-10 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .2 }}>
            {/* Gold line top */}
            <motion.div className="mb-8 h-px w-12 bg-[#AE8C57]/40" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: .5 }} />

            {/* TYDENE */}
            <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-semibold tracking-[.18em] text-[#F5EFE3]">TYDENE</h1>

            {/* Subtitle */}
            <motion.p className="mt-3 text-[11px] uppercase tracking-[.35em] text-[#AE8C57]/70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }}>
              Fresh Produce Wholesalers
            </motion.p>

            {/* Divider */}
            <motion.div className="mt-6 h-px w-24 bg-white/10" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 1 }} />

            {/* Tagline */}
            <motion.p className="mt-6 font-serif text-[18px] italic text-[#F5EFE3]/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              From Soil to Supply
            </motion.p>

            {/* Enter button — appears after video loaded or 2.5s */}
            <motion.button
              onClick={handleEnter}
              className="group mt-12 flex flex-col items-center gap-3 bg-transparent border-none cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: videoLoaded ? 1 : 0 }}
              transition={{ duration: .8, delay: videoLoaded ? 0 : 2.5 }}
            >
              <span className="rounded-full border border-[#AE8C57]/40 px-10 py-3.5 text-[11px] uppercase tracking-[.3em] text-[#AE8C57] transition-all duration-500 group-hover:border-[#AE8C57] group-hover:bg-[#AE8C57]/10 group-hover:tracking-[.4em]">
                Enter Site
              </span>
              {/* Animated pulse line */}
              <motion.div
                className="h-6 w-px bg-[#AE8C57]/30"
                animate={{ scaleY: [.4, 1, .4], opacity: [.3, .7, .3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Loading indicator — shows while video loads */}
            {!videoLoaded && (
              <motion.div className="mt-8 flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: .5 }} transition={{ delay: 1 }}>
                <motion.div className="h-1 w-1 rounded-full bg-[#AE8C57]" animate={{ opacity: [.2, 1, .2] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
                <motion.div className="h-1 w-1 rounded-full bg-[#AE8C57]" animate={{ opacity: [.2, 1, .2] }} transition={{ duration: 1.2, repeat: Infinity, delay: .2 }} />
                <motion.div className="h-1 w-1 rounded-full bg-[#AE8C57]" animate={{ opacity: [.2, 1, .2] }} transition={{ duration: 1.2, repeat: Infinity, delay: .4 }} />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── Film grain — alive ── */}
      <div className="pointer-events-none fixed inset-0 z-[500] opacity-[.02] mix-blend-overlay [background-size:200px]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* ═══ FIXED WhatsApp Button — always visible ═══ */}
      {entered && (
        <a
          href="https://wa.me/442085588047"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[600] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_4px_24px_rgba(37,211,102,.4)] transition-transform duration-300 hover:scale-110 no-underline"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      )}

      {/* ═══ SCROLL TO TOP Button — appears after scrolling ═══ */}
      {entered && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-24 z-[600] flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 backdrop-blur-sm text-white/50 hover:text-white hover:border-[#AE8C57]/40 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M18 15l-6-6-6 6"/></svg>
        </motion.button>
      )}

      {/* ── Nav ── */}
      <header className="fixed inset-x-0 top-0 z-[200] flex h-16 items-center justify-between px-[5%] backdrop-blur-sm" style={{ background: "linear-gradient(180deg,rgba(0,0,0,.4),transparent)" }}>
        <a href="#" className="text-[13px] font-bold tracking-[.22em] text-white no-underline">TYDENE</a>
        <nav className="hidden items-center gap-8 text-[11px] tracking-[.14em] text-white/50 md:flex">
          {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white transition-colors no-underline">{l}</a>)}
          <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57] px-5 py-1.5 text-[10px] font-semibold text-[#2B221C] no-underline">WhatsApp</a>
        </nav>
      </header>

      {/* ═══ HERO — CINEMATIC VIDEO BACKGROUND ═══ */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden bg-black">
        {/* Kling AI cinematic video — starts on Enter click */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ y: heroY, scale: heroScale }}>
          <video
            ref={vidRef}
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover scale-110"
            src="/images/hero-video.mp4"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-[#040a06] to-transparent" />
        <motion.div className="absolute inset-0 flex items-center px-[5.5%]" style={{ y: heroTextY, opacity: heroO }}>
          <div className="max-w-2xl">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: .3 }} className="mb-3 text-[10px] font-medium uppercase tracking-[.4em] text-[#AE8C57]">LONDON&apos;S TRUSTED WHOLESALE PARTNER</motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .8, delay: .6 }} className="mb-5 h-[1.5px] w-10 origin-left bg-[#AE8C57]/50" />
            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .5 }} className="font-serif text-[clamp(3rem,8vw,6rem)] font-semibold leading-[.88] tracking-[-.03em] text-white">From Soil<br />to Supply.</motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .9 }} className="mt-6 max-w-md text-[16px] leading-[1.85] text-white/55">Premium fresh produce, delivered with precision. Supplying London&apos;s finest kitchens since 2003.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: 1.2 }} className="mt-10 flex flex-wrap gap-4">
              <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#AE8C57] px-8 py-3.5 text-[14px] font-semibold text-[#2B221C] hover:bg-[#C4A06A] transition-colors no-underline">WhatsApp Us</a>
              <a href="#story" className="rounded-full border border-white/20 px-8 py-3.5 text-[14px] text-white/65 hover:border-white/40 transition-colors no-underline">Our Story →</a>
            </motion.div>
          </div>
        </motion.div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: heroO }}>
          <span className="text-[9px] uppercase tracking-[.4em] text-white/20">Scroll</span>
          <motion.div className="h-6 w-px bg-white/15" animate={{ scaleY: [.3, 1, .3] }} transition={{ duration: 2, repeat: Infinity }} />
        </motion.div>
      </section>

      {/* ═══ JOURNEY — parallax photo strip ═══ */}
      <ScaleSection className="bg-[#040a06] py-20 md:py-28">
        <div className="px-[5.5%]">
          <R><div className="text-center">
            <div className="text-[10px] uppercase tracking-[.4em] text-[#AE8C57]">THE JOURNEY</div>
            <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.5rem)] text-white">From field to your kitchen</h2>
          </div></R>
        </div>
        <div className="mt-14 grid grid-cols-2 gap-1 md:grid-cols-5">
          {[
            { img: "/images/stages/01-field.jpg", label: "01 — Field" },
            { img: "/images/stages/03-selection.jpg", label: "02 — Selection" },
            { img: "/images/stages/06-sorting.jpg", label: "03 — Sorting" },
            { img: "/images/stages/07-packing.jpg", label: "04 — Packing" },
            { img: "/images/stages/08-truck.jpg", label: "05 — Delivery" },
          ].map((item, i) => (
            <R key={i} delay={i * .1}>
              <div className="group relative aspect-[3/4] overflow-hidden">
                <Image src={item.img} alt={item.label} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" sizes="(max-width:768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-[11px] font-medium tracking-[.15em] text-white/80">{item.label}</div>
              </div>
            </R>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-2 gap-1 md:grid-cols-5">
          {[
            { img: "/images/stages/10-air.jpg", label: "06 — Air Freight" },
            { img: "/images/stages/12-london.jpg", label: "07 — London" },
            { img: "/images/produce/mixed-fresh.jpg", label: "08 — Market" },
            { img: "/images/produce/kitchen.jpg", label: "09 — Kitchen" },
            { img: "/images/stages/04-detach.jpg", label: "10 — Your Table" },
          ].map((item, i) => (
            <R key={i} delay={i * .1}>
              <div className="group relative aspect-[3/4] overflow-hidden">
                <Image src={item.img} alt={item.label} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" sizes="(max-width:768px) 50vw, 20vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 text-[11px] font-medium tracking-[.15em] text-white/80">{item.label}</div>
              </div>
            </R>
          ))}
        </div>
      </ScaleSection>

      {/* ═══ STORY — parallax image ═══ */}
      <section id="story">
        <PImg src="/images/produce/warehouse-pro.jpg" alt="" className="h-[55vh] min-h-[420px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#040a06] via-black/25 to-[#0e3528] z-10" />
          <div className="absolute inset-0 z-20 flex items-end px-[5.5%] pb-14">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">OUR STORY</div>
              <div className="mt-3 h-[1.5px] w-12 bg-[#AE8C57]/60" />
              <h2 className="mt-6 font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[.94] text-white [text-shadow:0_2px_20px_rgba(0,0,0,.5)]">Built on trust.<br />Delivered fresh.</h2>
            </div></R>
          </div>
        </PImg>
        <div className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2">
            <div>
              <R><p className="text-[16px] leading-[1.9] text-white/55">TYDENE was born from a simple belief: London deserves better produce. Not just fresher &mdash; but sourced with care, handled with respect, and delivered before the city wakes.</p></R>
              <R delay={.1}><p className="mt-6 text-[16px] leading-[1.9] text-white/55">Every morning our team begins at midnight &mdash; inspecting, sorting, loading produce that meets our exacting standards. From Borough Market kitchens to Mayfair restaurants.</p></R>
              <R delay={.2}><div className="mt-10 flex items-center gap-4"><div className="h-px w-14 bg-[#AE8C57]/30" /><span className="font-serif text-[16px] italic text-[#AE8C57]/50">Purveyors of Quality Fruit &amp; Vegetables</span></div></R>
            </div>
            <R delay={.15}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { v: 2003, s: "", l: "Established" },
                  { v: 200, s: "+", l: "Product Lines" },
                  { v: 6, s: " Days", l: "A Week" },
                  { v: 99, s: "%", l: "On-Time" },
                ].map((item) => (
                  <div key={item.l} className="rounded-xl border border-white/[.05] bg-white/[.02] p-6 text-center">
                    <div className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold text-[#AE8C57]"><Counter end={item.v} suffix={item.s} /></div>
                    <div className="mt-2 text-[10px] uppercase tracking-[.2em] text-white/28">{item.l}</div>
                  </div>
                ))}
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* ═══ SERVICES — parallax header ═══ */}
      <section id="services" className="bg-[#12100c]">
        <PImg src="/images/stages/06-sorting.jpg" alt="" className="h-[40vh] min-h-[320px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528] via-black/35 to-[#12100c] z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">WHAT WE DO</div>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white [text-shadow:0_2px_25px_rgba(0,0,0,.5)]">End-to-end wholesale<br />for London</h2>
            </div></R>
          </div>
        </PImg>
        <div className="px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl space-y-5">
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { img: "/images/stages/02-ripening.jpg", t: "Premium Sourcing", d: "Direct from trusted growers. UK, Europe, Mediterranean. We select for quality." },
                { img: "/images/produce/herbs.jpg", t: "Quality Packing", d: "Every item inspected, sorted, packed. Temperature-controlled from warehouse to door." },
                { img: "/images/produce/delivery-fleet.jpg", t: "Dawn Delivery", d: "Midnight starts. Our fleet moves across London before sunrise. Cold chain guaranteed." },
              ].map((item, i) => (
                <R key={item.t} delay={i * .12}>
                  <div className="group overflow-hidden rounded-2xl border border-white/[.05] bg-white/[.02]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-[1s] group-hover:scale-110" sizes="33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100c] via-transparent to-transparent" />
                    </div>
                    <div className="p-7"><h3 className="font-serif text-2xl text-white">{item.t}</h3><p className="mt-3 text-[13px] leading-[1.75] text-white/40">{item.d}</p></div>
                  </div>
                </R>
              ))}
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { img: "/images/produce/schedule.jpg", t: "Reliable Schedule", d: "6 days a week, 52 weeks. Your kitchen depends on consistency." },
                { img: "/images/produce/quality.jpg", t: "Quality Guarantee", d: "Not happy? We make it right. Reputation built on trust." },
                { img: "/images/produce/bespoke.jpg", t: "Bespoke Orders", d: "Exotic requests, specific quantities. We adapt to you." },
              ].map((item, i) => (
                <R key={item.t} delay={.3 + i * .1}>
                  <div className="group overflow-hidden rounded-xl border border-white/[.05] bg-white/[.02]">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-[1s] group-hover:scale-110" sizes="33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12100c] via-[#12100c]/20 to-transparent" />
                    </div>
                    <div className="p-6"><h3 className="font-serif text-lg text-white">{item.t}</h3><p className="mt-2 text-[13px] leading-[1.65] text-white/38">{item.d}</p></div>
                  </div>
                </R>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRODUCE — parallax + 9 categories ═══ */}
      <section id="produce">
        <PImg src="/images/produce/market-crates.jpg" alt="" className="h-[45vh] min-h-[360px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100c] via-black/25 to-[#0a2a1e] z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">OUR PRODUCE</div>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white [text-shadow:0_2px_25px_rgba(0,0,0,.5)]">The freshest for<br />London&apos;s finest</h2>
              <p className="mt-3 text-[14px] text-white/50">Fresh, dried, tropical, roots, herbs — everything your kitchen needs.</p>
            </div></R>
          </div>
        </PImg>
        <div className="bg-[#0a2a1e] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Tomatoes", img: "/images/produce/tomatoes.jpg", d: "Vine, Cherry, Beef, Plum, Heritage.", c: "#C43520" },
              { t: "Peppers & Chillies", img: "/images/produce/peppers.jpg", d: "Bell, Chilli, Romano, Padron, Scotch Bonnet.", c: "#D4A017" },
              { t: "Salad & Greens", img: "/images/produce/greens.jpg", d: "Lettuce, Rocket, Spinach, Kale, Pak Choi.", c: "#4A7A2A" },
              { t: "Citrus & Fruits", img: "/images/produce/citrus.jpg", d: "Lemons, Limes, Oranges, Berries, Avocados.", c: "#E8A800" },
              { t: "Root Vegetables", img: "/images/produce/roots.jpg", d: "Potatoes, Carrots, Onions, Beetroot, Parsnips.", c: "#8B6914" },
              { t: "Herbs & Aromatics", img: "/images/produce/herbs.jpg", d: "Basil, Coriander, Mint, Garlic, Ginger.", c: "#6B8B3A" },
              { t: "Tropical & Exotic", img: "/images/produce/tropical.jpg", d: "Mango, Pineapple, Plantain, Yam, Okra.", c: "#E85D00" },
              { t: "Mushrooms", img: "/images/produce/mushrooms.jpg", d: "Button, Chestnut, Portobello, Shiitake.", c: "#8B7355" },
              { t: "Dried Fruits & Nuts", img: "/images/produce/dried-fruits.jpg", d: "Dates, Figs, Apricots, Almonds, Cashews.", c: "#A0522D" },
            ].map((item, i) => (
              <R key={item.t} delay={i * .06}>
                <div className="group overflow-hidden rounded-2xl border border-white/[.05] bg-white/[.02]">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image src={item.img} alt={item.t} fill className="object-cover transition-transform duration-[1s] group-hover:scale-110" sizes="33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a2a1e] via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                      <div className="h-2.5 w-2.5 rounded-full shadow-lg" style={{ background: item.c }} />
                      <span className="text-[12px] font-semibold text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,.6)]">{item.t}</span>
                    </div>
                  </div>
                  <div className="p-6"><p className="text-[13px] leading-[1.7] text-white/40">{item.d}</p></div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY TYDENE — parallax bg + animated counters ═══ */}
      <section>
        <div className="relative overflow-hidden">
          <PImg src="/images/stages/12-london.jpg" alt="" className="absolute inset-0" speed={10} />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
              <R><div className="text-center">
                <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">WHY TYDENE</div>
                <h2 className="mt-4 font-serif text-[clamp(2rem,4.5vw,3.2rem)] text-white">What sets us apart</h2>
              </div></R>
              <div className="mt-16 grid gap-8 md:grid-cols-4">
                {[
                  { v: 200, s: "+", l: "Products", d: "Fresh, dried, tropical, herbs" },
                  { v: 22, s: "+", l: "Years", d: "Trusted since 2003" },
                  { v: 6, s: "", l: "Days/Week", d: "Mon–Sat, midnight starts" },
                  { v: 99, s: "%", l: "On-Time", d: "Reliability guaranteed" },
                ].map((stat, i) => (
                  <R key={stat.l} delay={i * .1}>
                    <div className="rounded-xl border border-white/[.08] bg-black/30 p-6 text-center backdrop-blur-sm">
                      <div className="font-serif text-[clamp(2.2rem,5vw,3.5rem)] font-bold text-[#AE8C57]"><Counter end={stat.v} suffix={stat.s} /></div>
                      <div className="mt-1 text-[10px] uppercase tracking-[.2em] text-white/40">{stat.l}</div>
                      <div className="mt-3 text-[11px] text-white/30">{stat.d}</div>
                    </div>
                  </R>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST ═══ */}
      <ScaleSection className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
        <div className="mx-auto max-w-5xl grid gap-5 md:grid-cols-2">
          {[
            { n: "01", t: "Trust", d: "Over 200 London restaurants depend on us daily.", img: "/images/produce/mixed-fresh.jpg" },
            { n: "02", t: "Freshness", d: "Harvest to kitchen in the shortest time possible.", img: "/images/produce/roots.jpg" },
            { n: "03", t: "Consistency", d: "Same quality, every delivery, every morning.", img: "/images/produce/mushrooms.jpg" },
            { n: "04", t: "Full Range", d: "Fresh, dried, tropical — every product you need.", img: "/images/produce/dried-fruits.jpg" },
          ].map((item, i) => (
            <R key={item.n} delay={i * .1}>
              <div className="group flex gap-5 rounded-xl border border-white/[.05] bg-white/[.02] p-5 hover:bg-white/[.04] transition-colors">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-24">
                  <Image src={item.img} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="96px" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[.2em] text-[#AE8C57]/50">{item.n}</div>
                  <h3 className="mt-1 font-serif text-xl text-white">{item.t}</h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-white/38">{item.d}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
      </ScaleSection>

      {/* ═══ REVIEWS — parallax + marquee + cards ═══ */}
      <section className="overflow-hidden">
        <PImg src="/images/produce/kitchen.jpg" alt="" className="h-[30vh] min-h-[240px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e3528]/80 via-black/50 to-[#12100c] z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <R><div>
              <div className="flex items-center justify-center gap-2"><Star /><span className="font-serif text-2xl text-white">4.9</span><span className="text-[12px] text-white/40">on Google</span></div>
              <div className="mt-2 text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">TRUSTED BY LONDON&apos;S BEST</div>
            </div></R>
          </div>
        </PImg>
        <div className="bg-[#12100c] py-14"><Marquee /></div>
        <div className="bg-[#12100c] px-6 pb-20 md:px-[5.5%]">
          <div className="mx-auto max-w-6xl grid gap-5 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <R key={i} delay={i * .12}>
                <div className="flex h-full flex-col rounded-2xl border border-white/[.06] bg-white/[.03] p-8">
                  <div className="mb-4 flex gap-1">{Array.from({ length: r.stars }).map((_, j) => <Star key={j} />)}</div>
                  <p className="flex-1 font-serif text-[15px] italic leading-[1.7] text-white/65">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-6 border-t border-white/[.06] pt-4">
                    <div className="text-[13px] font-semibold text-white/75">{r.name}</div>
                    <div className="mt-1 text-[11px] text-white/30">{r.role}</div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT — parallax ═══ */}
      <section id="contact">
        <PImg src="/images/stages/01-field.jpg" alt="" className="h-[35vh] min-h-[280px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#12100c] via-black/40 to-[#0e3528] z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
            <R><div>
              <div className="text-[10px] uppercase tracking-[.35em] text-[#AE8C57]">GET IN TOUCH</div>
              <h2 className="mt-4 font-serif text-[clamp(2.2rem,5.5vw,4rem)] text-white">Let&apos;s talk produce</h2>
            </div></R>
          </div>
        </PImg>
        <div className="bg-[#0e3528] px-6 py-20 md:px-[5.5%] md:py-28">
          <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div className="space-y-7">
              {[["EMAIL", "hello@tydene.co.uk"], ["PHONE", "020 8558 8047"], ["HOURS", "Mon–Sat: Midnight – 11AM"]].map(([k, v], i) => (
                <R key={k} delay={i * .06}><div><div className="text-[10px] uppercase tracking-[.22em] text-[#AE8C57]/60">{k}</div><div className="mt-2 text-[17px] text-white/65">{v}</div></div></R>
              ))}
              {/* LOCATION with Google Maps + Apple Maps */}
              <R delay={.18}>
                <div>
                  <div className="text-[10px] uppercase tracking-[.22em] text-[#AE8C57]/60">LOCATION</div>
                  <div className="mt-2 text-[17px] text-white/65">Stands 5-6 &amp; 29, New Spitalfields Market, London E10 5SQ</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a href="https://maps.app.goo.gl/6MxYLcbamrmtQhJD6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-4 py-2.5 text-[12px] text-white/60 hover:border-[#4285F4]/40 hover:text-[#4285F4] transition-all no-underline">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>
                      Google Maps
                    </a>
                    <a href="https://maps.apple.com/?address=New%20Spitalfields%20Market,%20London%20E10%205SQ" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-4 py-2.5 text-[12px] text-white/60 hover:border-white/30 hover:text-white transition-all no-underline">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#FF3B30"/><circle cx="12" cy="9" r="2.5" fill="white"/></svg>
                      Apple Maps
                    </a>
                  </div>
                </div>
              </R>
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

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/[.04] bg-[#030704] px-6 py-16 md:px-[5.5%]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 text-center">
          <span className="text-[12px] font-bold tracking-[.22em] text-white">TYDENE</span>
          <p className="max-w-sm text-[12px] leading-[1.7] text-white/18">Premium fresh produce wholesalers. Serving London&apos;s finest since 2003.</p>
          <p className="font-serif text-[13px] italic text-[#AE8C57]/25">From Soil to Supply.</p>
          <div className="flex gap-7 text-[10px] tracking-[.12em] text-white/12">
            {["Story", "Services", "Produce", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-white/30 transition-colors no-underline">{l}</a>)}
          </div>
          <div className="h-px w-48 bg-white/[.03]" />
          <p className="text-[9px] text-white/8">&copy; {new Date().getFullYear()} TYDENE Fresh Produce Ltd. New Spitalfields Market, London E10 5SQ.</p>
          <p className="mt-2 text-[10px] text-white/15">Created by <a href="https://aymedo.io" target="_blank" rel="noopener noreferrer" className="text-[#AE8C57]/40 hover:text-[#AE8C57]/70 transition-colors no-underline">aymedo.io</a></p>
        </div>
      </footer>
    </div>
  );
}
