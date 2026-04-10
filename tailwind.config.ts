import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: { serif: ["var(--font-serif)","Georgia","serif"], sans: ["var(--font-sans)","system-ui","sans-serif"] },
      animation: { grain: "grain 0.4s steps(4) infinite" },
    },
  },
  plugins: [],
};
export default config;
