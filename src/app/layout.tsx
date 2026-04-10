import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/styles/globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#183C2E",
};

export const metadata: Metadata = {
  title: "TYDENE — Fresh Produce Wholesalers | London",
  description:
    "Premium fresh produce wholesale for London's finest restaurants, hotels, and caterers. From Soil to Supply. Trusted by 200+ establishments.",
  keywords: [
    "fresh produce",
    "wholesale",
    "London",
    "vegetables",
    "fruit",
    "restaurant supply",
    "TYDENE",
    "New Spitalfields Market",
  ],
  authors: [{ name: "TYDENE Fresh Produce Ltd" }],
  openGraph: {
    title: "TYDENE — Fresh Produce Wholesalers",
    description:
      "Premium fresh produce, delivered with precision. Supplying London's finest since 2003.",
    url: "https://tydene.co.uk",
    siteName: "TYDENE",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TYDENE — Fresh Produce Wholesalers",
    description:
      "Premium fresh produce, delivered with precision. From Soil to Supply.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased bg-[#0C1A08] text-[#F5EFE3]">
        {children}
      </body>
    </html>
  );
}
