import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#effaf6",
          100: "#d1f2e3",
          600: "#178f66",
          700: "#117352",
        },
      },
      boxShadow: {
        card: "0 8px 32px -18px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
