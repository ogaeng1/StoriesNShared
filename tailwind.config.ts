import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "480px",
        tablet: "768px",
        laptop: "1024px",
      },
      keyframes: {
        spinner: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
