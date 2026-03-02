import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: "#5BBCD6",
          50: "#EDF7FB",
          100: "#D4EDF5",
          200: "#ADDDED",
          300: "#86CDE4",
          400: "#5BBCD6",
          500: "#5BBCD6",
          600: "#4AABCA",
          700: "#3A8FAA",
          800: "#2B6D82",
          900: "#1C4A59",
        },
        purple: {
          DEFAULT: "#7B4F9E",
          50: "#F3EDF9",
          100: "#E7DBF3",
          200: "#CFB7E7",
          300: "#B793DB",
          400: "#9F6FCF",
          500: "#7B4F9E",
          600: "#623F7E",
          700: "#4A2F5F",
          800: "#311F3F",
          900: "#190F20",
        },
        sage: {
          DEFAULT: "#E8F0E9",
          50: "#F4F8F5",
          100: "#E8F0E9",
          200: "#D1E1D3",
          300: "#BAD2BD",
          400: "#A3C3A7",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#3D3D3D",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-dancing-script)", "cursive"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#2C2C2C",
            a: {
              color: "#5BBCD6",
              "&:hover": {
                color: "#4AABCA",
              },
            },
            h1: { color: "#2C2C2C" },
            h2: { color: "#2C2C2C" },
            h3: { color: "#2C2C2C" },
          },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bounce-dot": "bounceDot 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(91, 188, 214, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(91, 188, 214, 0)" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: "0.4" },
          "40%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
