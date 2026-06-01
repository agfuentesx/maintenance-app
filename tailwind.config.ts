import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'DM Serif Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dce6ff",
          200: "#b9ceff",
          300: "#87adff",
          400: "#5080ff",
          500: "#2952ff",
          600: "#1230f5",
          700: "#0e23e1",
          800: "#111eb6",
          900: "#141f8f",
          950: "#0d1260",
        },
        slate: {
          850: "#172033",
          925: "#0d1525",
          975: "#080e1a",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
