import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        card: "var(--card)",
        mint: "var(--mint)",
        lavender: "var(--lavender)",
        sage: "var(--sage)",
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
      },
      fontFamily: {
        sans: ["Funnel Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;