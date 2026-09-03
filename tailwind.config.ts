import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A1A22",
        cream: "#F6F1E9",
        sand: "#EFE7D8",
        brand: {
          deep: "#04263B",
          DEFAULT: "#004D7C",
          light: "#2E9CCA",
          mist: "#BFE3F0",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
