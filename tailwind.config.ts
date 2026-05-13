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
        // Brand teal - Pantone 3268 C (#03AB8E)
        teal: {
          DEFAULT: "#03AB8E",
          50: "#E6F7F2",
          100: "#C5EAE0",
          200: "#9DDBC8",
          300: "#6BC9AC",
          400: "#3CBA98",
          500: "#03AB8E",
          600: "#039681",
          700: "#057D6B",
          800: "#066354",
          900: "#054839",
        },
        // Brand purple - Pantone 511 C (#894C9E)
        purple: {
          DEFAULT: "#894C9E",
          50: "#F4EDF7",
          100: "#E5D2EE",
          200: "#CFA7DD",
          300: "#B97DCC",
          400: "#A35EB6",
          500: "#894C9E",
          600: "#6E3F7F",
          700: "#553162",
          800: "#3C2245",
          900: "#231429",
        },
        // Brand secondary/tertiary palette (Pantone refs in brand guide)
        brand: {
          cyan: "#21C1DC",        // Pantone 7442
          green: "#81C44D",       // Pantone 7488
          lime: "#D4EB8E",        // Pantone 372  - light yellow-green
          mint: "#A0D1CA",        // Pantone 7464 - light mint
          periwinkle: "#B6B8DC",  // Pantone 7444 - light periwinkle
        },
        sage: {
          DEFAULT: "#A0D1CA",     // brand mint
          50: "#F0F8F6",
          100: "#DDEFEB",
          200: "#C0E1DA",
          300: "#A0D1CA",
          400: "#7BBEB3",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#3D3D3D",
          dark: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
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
              color: "#03AB8E",
              "&:hover": {
                color: "#039681",
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
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(3, 171, 142, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(3, 171, 142, 0)" },
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
