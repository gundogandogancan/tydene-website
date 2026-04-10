"use client";
import { useState } from "react";
import { SectionReveal } from "@/components/ui/SectionReveal";

const contactInfo = [
  { label: "Email", value: "hello@tydene.co.uk", href: "mailto:hello@tydene.co.uk" },
  { label: "Phone", value: "020 8558 8047", href: "tel:+442085588047" },
  { label: "Location", value: "Stands 5-6 & 29, New Spitalfields Market, London E10 5SQ", href: "https://maps.app.goo.gl/6MxYLcbamrmtQhJD6" },
  { label: "Hours", value: "Mon–Sat: Midnight – 11AM", href: "#" },
];

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative bg-[#183C2E] overflow-hidden">
      <div className="px-[5.5%] py-28 md:py-36">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-20">
          <SectionReveal>
            <span className="font-sans text-[10px] md:text-[11px] font-medium tracking-[0.3em] uppercase text-[#AE8C57]">
              Get in Touch
            </span>
            <div className="w-10 h-[1.5px] bg-[#AE8C57]/60 mt-3 mb-8" />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.06] tracking-tight text-[#F5EFE3] max-w-xl">
              Let&apos;s talk produce
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-sans text-[15px] leading-[1.7] text-[#F5EFE3]/45 mt-5 max-w-lg">
              Whether you&apos;re a restaurant, hotel, or catering company — we&apos;d love to hear from you.
            </p>
          </SectionReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left — Info + WhatsApp */}
          <div className="lg:col-span-2 space-y-8">
            <SectionReveal delay={0.1}>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <a key={info.label} href={info.href} className="block group no-underline">
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#F5EFE3]/25 block mb-1">
                      {info.label}
                    </span>
                    <span className="font-sans text-[14px] text-[#F5EFE3]/60 group-hover:text-[#F5EFE3] transition-colors">
                      {info.value}
                    </span>
                  </a>
                ))}
              </div>
            </SectionReveal>

            {/* WhatsApp */}
            <SectionReveal delay={0.25}>
              <a
                href="https://wa.me/442085588047"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#25D366]/8 border border-[#25D366]/15 hover:bg-[#25D366]/12 transition-all duration-300 group no-underline"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p className="font-sans text-[13px] font-semibold text-[#25D366]">WhatsApp Us</p>
                  <p className="font-sans text-[11px] text-[#F5EFE3]/30">Usually within 30 minutes</p>
                </div>
              </a>
            </SectionReveal>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <SectionReveal delay={0.15} direction="right">
              <div className="rounded-2xl bg-[#0F2A1E] border border-[#F5EFE3]/[0.04] p-8 md:p-10">
                {submitted ? (
                  <div className="text-center py-14">
                    <div className="w-14 h-14 rounded-full bg-[#AE8C57]/10 flex items-center justify-center mx-auto mb-6">
                      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#AE8C57" strokeWidth="2" strokeLinecap="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#F5EFE3] mb-2">Message Sent</h3>
                    <p className="font-sans text-[13px] text-[#F5EFE3]/40">We&apos;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#F5EFE3]/25 block mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-[#183C2E]/50 border border-[#F5EFE3]/[0.06] rounded-lg px-4 py-3 font-sans text-[13px] text-[#F5EFE3] placeholder:text-[#F5EFE3]/15 focus:border-[#AE8C57]/30 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#F5EFE3]/25 block mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-[#183C2E]/50 border border-[#F5EFE3]/[0.06] rounded-lg px-4 py-3 font-sans text-[13px] text-[#F5EFE3] placeholder:text-[#F5EFE3]/15 focus:border-[#AE8C57]/30 transition-colors"
                          placeholder="john@restaurant.co.uk"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#F5EFE3]/25 block mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={form.business}
                        onChange={(e) => setForm({ ...form, business: e.target.value })}
                        className="w-full bg-[#183C2E]/50 border border-[#F5EFE3]/[0.06] rounded-lg px-4 py-3 font-sans text-[13px] text-[#F5EFE3] placeholder:text-[#F5EFE3]/15 focus:border-[#AE8C57]/30 transition-colors"
                        placeholder="Your restaurant or company"
                      />
                    </div>

                    <div>
                      <label className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#F5EFE3]/25 block mb-2">
                        Message
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[#183C2E]/50 border border-[#F5EFE3]/[0.06] rounded-lg px-4 py-3 font-sans text-[13px] text-[#F5EFE3] placeholder:text-[#F5EFE3]/15 focus:border-[#AE8C57]/30 transition-colors resize-none"
                        placeholder="Tell us about your produce requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#AE8C57] text-[#2B221C] font-sans font-semibold text-[13px] tracking-wide hover:bg-[#C4A06A] transition-colors duration-300 cursor-pointer border-none"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
