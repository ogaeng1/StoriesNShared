import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#101010",
        secondary: "#1e1e1e",
        tertiary: "#677777",
      },
      fontSize: {
        xl: "2rem",
        lg: "1.5rem",
        md: "1.25rem",
        sm: "1rem",
      },
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
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
        fadeOut: "fadeOut 0.3s linear forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
