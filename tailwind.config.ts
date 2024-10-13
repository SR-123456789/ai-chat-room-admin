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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "slide-in-top": "slide-in-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
        "slide-out-top": "slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)   both"
    },
    keyframes: {
        "slide-in-top": {
            "0%": {
                transform: "translateY(-100px)",
                opacity: "0"
            },
            to: {
                transform: "translateY(0)",
                opacity: "1"
            }
        },
        "slide-out-top": {
          "0%": {
              transform: "translateY(0)",
              opacity: "1"
          },
          to: {
              transform: "translateY(-1000px)",
              opacity: "0"
          }
      }
    }
    },
  },
  plugins: [],
};
export default config;
