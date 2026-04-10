"use client";
import { useState, useEffect } from "react";
import { TYMonogram } from "@/components/ui/TYMonogram";

const navLinks = [
  { label: "Story", href: "#story" },
  { label: "Services", href: "#services" },
  { label: "Produce", href: "#produce" },
  { label: "Contact", href: "#contact" },
];

export function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[90] flex items-center justify-between px-[5.5%] h-[68px] transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0806]/90 backdrop-blur-md border-b border-[#F5EFE3]/[0.04]"
            : ""
        }`}
        style={!scrolled ? { background: "linear-gradient(180deg, rgba(10,8,6,0.7) 0%, transparent 100%)" } : undefined}
      >
        <a href="/" className="flex items-center gap-2.5 no-underline">
          <TYMonogram size={20} />
          <span className="font-serif font-bold text-[16px] tracking-[0.15em] text-[#F5EFE3]">TYDENE</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-sans text-xs tracking-[0.1em] text-[#F5EFE3]/50 no-underline hover:text-[#F5EFE3] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/442085588047"
            target="_blank"
            rel="noopener noreferrer"
            className="px-[18px] py-[7px] rounded-full bg-[#AE8C57] text-[#2B221C] font-sans font-semibold text-[11px] tracking-[0.05em] no-underline hover:bg-[#C4A06A] transition-colors"
          >
            WhatsApp
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 cursor-pointer bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-[#F5EFE3] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5EFE3] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5EFE3] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[89] bg-[#0A0806]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-3xl font-bold text-[#F5EFE3] no-underline hover:text-[#AE8C57] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/442085588047"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 rounded-full bg-[#AE8C57] text-[#2B221C] font-sans font-semibold text-sm no-underline"
          >
            WhatsApp Us
          </a>
        </div>
      )}
    </>
  );
}
