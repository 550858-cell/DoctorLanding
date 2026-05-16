import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00897B",
          dark: "#00695C",
          light: "#4DB6AC",
          50: "#E0F2F1",
        },
        accent: {
          DEFAULT: "#FF6B5B",
          dark: "#E85544",
          light: "#FF8A7D",
        },
        cream: "#FAFAF7",
        ink: "#0F1E1C",
        muted: "#5A6A68",
        success: "#10B981",
        line: "#E5E7EB",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-onest)", "var(--font-inter)", "sans-serif"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(15, 30, 28, 0.10)",
        card: "0 8px 40px -12px rgba(15, 30, 28, 0.14)",
        glow: "0 8px 32px -8px rgba(255, 107, 91, 0.5)",
        "glow-primary": "0 8px 32px -8px rgba(0, 137, 123, 0.4)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.85)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
