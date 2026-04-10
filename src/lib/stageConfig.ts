// ==========================================
// TYDENE — Expanded 13-Stage Cinematic System
// The complete tomato journey: From Soil to Supply
// ==========================================

export interface TomatoState {
  x: string;
  y: string;
  scale: number;
  rotation: number;
  opacity: number;
  hueShift: number; // 0 = red, 40+ = greenish
  blur: number;
  glowOpacity: number;
}

export interface StageText {
  eyebrow: string;
  headline: string;
  subtext: string;
}

export interface StageConfig {
  id: string;
  label: string;
  range: [number, number];
  bgColor: string;
  text: StageText | null;
  tomato: {
    start: TomatoState;
    end: TomatoState;
  };
}

const T = (x: string, y: string, scale: number, rotation: number, opacity: number, hueShift: number, blur = 0, glowOpacity = 0): TomatoState =>
  ({ x, y, scale, rotation, opacity, hueShift, blur, glowOpacity });

export const STAGES: StageConfig[] = [
  // 01 — FIELD ATMOSPHERE
  {
    id: "field",
    label: "01 — Field",
    range: [0.00, 0.08],
    bgColor: "#0C1A08",
    text: {
      eyebrow: "LONDON'S TRUSTED WHOLESALE PARTNER",
      headline: "From Soil\nto Supply.",
      subtext: "Premium fresh produce, delivered with precision.\nSupplying London's finest since 2003.",
    },
    tomato: {
      start: T("55%", "38%", 0.7, -3, 0, 40),
      end:   T("50%", "36%", 1.4, 0, 1, 35),
    },
  },
  // 02 — RIPENING
  {
    id: "ripening",
    label: "02 — Ripening",
    range: [0.08, 0.18],
    bgColor: "#0F200D",
    text: {
      eyebrow: "GROWTH",
      headline: "Nature's\nbest work.",
      subtext: "Months of sun. Weeks of patience.\nOne perfect moment of ripeness.",
    },
    tomato: {
      start: T("50%", "36%", 1.4, 0, 1, 35),
      end:   T("54%", "40%", 1.6, 2, 1, 0, 0, 0.5),
    },
  },
  // 03 — HARVEST CONTACT
  {
    id: "harvest",
    label: "03 — Harvest",
    range: [0.18, 0.28],
    bgColor: "#1A1408",
    text: {
      eyebrow: "THE HARVEST",
      headline: "Picked by\nhand.",
      subtext: "No machines. No shortcuts.\nHuman hands that know the difference.",
    },
    tomato: {
      start: T("54%", "40%", 1.6, 2, 1, 0, 0, 0.5),
      end:   T("50%", "38%", 1.3, 0, 1, 0, 0, 0.3),
    },
  },
  // 04 — DETACH / PICK
  {
    id: "detach",
    label: "04 — Detach",
    range: [0.28, 0.34],
    bgColor: "#1A1408",
    text: null,
    tomato: {
      start: T("50%", "38%", 1.3, 0, 1, 0, 0, 0.3),
      end:   T("50%", "18%", 1.2, -5, 1, 0, 0, 0.2),
    },
  },
  // 05 — DROP / PIVOT
  {
    id: "drop",
    label: "05 — The Drop",
    range: [0.34, 0.40],
    bgColor: "#161008",
    text: null,
    tomato: {
      start: T("50%", "18%", 1.2, 0, 1, 0, 0, 0.2),
      end:   T("50%", "70%", 0.9, 15, 1, 0, 0, 0),
    },
  },
  // 06 — SORTING / QUALITY
  {
    id: "sorting",
    label: "06 — Sorting",
    range: [0.40, 0.48],
    bgColor: "#2B221C",
    text: {
      eyebrow: "QUALITY CONTROL",
      headline: "Every tomato\ninspected.",
      subtext: "200+ product lines. Each one checked.\nOur standards don't flex.",
    },
    tomato: {
      start: T("50%", "70%", 0.9, 8, 1, 0),
      end:   T("50%", "65%", 0.7, 0, 0.8, 0),
    },
  },
  // 07 — CRATE PACKING
  {
    id: "packing",
    label: "07 — Packing",
    range: [0.48, 0.56],
    bgColor: "#1E180D",
    text: {
      eyebrow: "PREPARATION",
      headline: "Sorted.\nSealed.\nStacked.",
      subtext: "Every crate is a promise.\nOrganized, inspected, ready.",
    },
    tomato: {
      start: T("50%", "65%", 0.7, 0, 0.8, 0),
      end:   T("50%", "72%", 0, 0, 0, 0),
    },
  },
  // 08 — TRUCK LOADING
  {
    id: "loading",
    label: "08 — Loading",
    range: [0.56, 0.62],
    bgColor: "#0E0E18",
    text: {
      eyebrow: "DISPATCH",
      headline: "Loaded\nwith care.",
      subtext: "Pallets move. Trucks fill.\nThe cold chain begins.",
    },
    tomato: {
      start: T("50%", "72%", 0, 0, 0, 0),
      end:   T("50%", "60%", 0, 0, 0, 0),
    },
  },
  // 09 — ROAD TRANSPORT
  {
    id: "transport",
    label: "09 — Transport",
    range: [0.62, 0.72],
    bgColor: "#0E0E1A",
    text: {
      eyebrow: "THE JOURNEY",
      headline: "Moving\nbefore dawn.",
      subtext: "Midnight starts. Cold chains. Precision routes.\nLondon doesn't wait.",
    },
    tomato: {
      start: T("50%", "60%", 0, 0, 0, 0),
      end:   T("52%", "55%", 0.4, 0, 0.6, 0),
    },
  },
  // 10 — GLOBAL SOURCING / AIR FREIGHT
  {
    id: "global",
    label: "10 — Global",
    range: [0.72, 0.78],
    bgColor: "#101220",
    text: {
      eyebrow: "GLOBAL REACH",
      headline: "From fields\nacross the world.",
      subtext: "UK, Europe, Mediterranean, Africa.\nThe freshest, wherever it grows.",
    },
    tomato: {
      start: T("52%", "55%", 0.4, 0, 0.6, 0),
      end:   T("50%", "50%", 0.5, 0, 0.7, 0),
    },
  },
  // 11 — LONDON ARRIVAL
  {
    id: "london",
    label: "11 — London",
    range: [0.78, 0.86],
    bgColor: "#141E14",
    text: {
      eyebrow: "DESTINATION",
      headline: "London\nawakens.",
      subtext: "New Spitalfields Market stirs.\nRestaurants prep. The city is hungry.",
    },
    tomato: {
      start: T("50%", "50%", 0.5, 0, 0.7, 0),
      end:   T("50%", "45%", 0.6, 0, 1, 0),
    },
  },
  // 12 — KITCHEN / TABLE
  {
    id: "kitchen",
    label: "12 — Kitchen",
    range: [0.86, 0.93],
    bgColor: "#183C2E",
    text: {
      eyebrow: "THE RESULT",
      headline: "From our hands\nto yours.",
      subtext: "Chef's prep. The perfect plate.\nThe journey proves its worth.",
    },
    tomato: {
      start: T("50%", "45%", 0.6, 0, 1, 0, 0, 0),
      end:   T("50%", "42%", 0.5, 0, 0.8, 0, 0, 0.3),
    },
  },
  // 13 — TYDENE RESOLUTION
  {
    id: "tydene",
    label: "13 — TYDENE",
    range: [0.93, 1.00],
    bgColor: "#183C2E",
    text: null,
    tomato: {
      start: T("50%", "42%", 0.5, 0, 0.8, 0, 0, 0.3),
      end:   T("50%", "42%", 0, 0, 0, 0),
    },
  },
];

// 13 stages × ~85vh average = ~1100vh (round to 1100)
export const SCROLL_HEIGHT = "1100vh";

// Brand tokens
export const BRAND = {
  green: "#183C2E",
  olive: "#6B7750",
  cream: "#F5EFE3",
  soil: "#2B221C",
  gold: "#AE8C57",
  tomato: "#C43520",
} as const;
