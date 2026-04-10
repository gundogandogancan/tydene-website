"use client";
import { TYMonogram } from "@/components/ui/TYMonogram";

const links = {
  Company: [
    { label: "Our Story", href: "#story" },
    { label: "Services", href: "#services" },
    { label: "Produce", href: "#produce" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Seasonal Guide", href: "#" },
    { label: "Quality Standards", href: "#" },
    { label: "Delivery Areas", href: "#" },
    { label: "FAQ", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0A0806] border-t border-[#F5EFE3]/[0.03]">
      <div className="px-[5.5%] pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-14 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2.5 mb-5">
              <TYMonogram size={20} color="#F5EFE3" />
              <span className="font-serif font-bold text-[15px] tracking-[0.15em] text-[#F5EFE3]">TYDENE</span>
            </div>
            <p className="font-sans text-[12px] leading-[1.75] text-[#F5EFE3]/25 max-w-[260px] mb-5">
              Premium fresh produce wholesalers serving London&apos;s finest restaurants,
              hotels, and catering companies.
            </p>
            <p className="font-serif text-[13px] italic text-[#AE8C57]/45">
              From Soil to Supply.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F5EFE3]/35 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5 list-none m-0 p-0">
                {items.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="font-sans text-[12px] text-[#F5EFE3]/22 hover:text-[#AE8C57] transition-colors no-underline">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect */}
          <div className="md:col-span-2">
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.2em] uppercase text-[#F5EFE3]/35 mb-4">
              Connect
            </h4>
            <div className="space-y-2.5">
              <a href="https://wa.me/442085588047" target="_blank" rel="noopener noreferrer" className="font-sans text-[12px] text-[#F5EFE3]/22 hover:text-[#25D366] transition-colors no-underline block">
                WhatsApp
              </a>
              <a href="https://instagram.com/tydene" target="_blank" rel="noopener noreferrer" className="font-sans text-[12px] text-[#F5EFE3]/22 hover:text-[#F5EFE3] transition-colors no-underline block">
                Instagram
              </a>
              <a href="mailto:hello@tydene.co.uk" className="font-sans text-[12px] text-[#F5EFE3]/22 hover:text-[#AE8C57] transition-colors no-underline block">
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#F5EFE3]/[0.03] pt-6 flex flex-col md:flex-row items-center justify-between gap-3 max-w-6xl mx-auto">
          <p className="font-sans text-[10px] text-[#F5EFE3]/15">
            &copy; {new Date().getFullYear()} TYDENE Fresh Produce Ltd. All rights reserved.
          </p>
          <p className="font-sans text-[10px] text-[#F5EFE3]/10">
            New Spitalfields Market, London E10 5SQ
          </p>
        </div>
      </div>
    </footer>
  );
}
