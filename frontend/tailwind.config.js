/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#0F172A",
        secondary: "#94A3B8",
        accent: "#6366F1",
        back: "#F1F5F9",
        muted: "#94A3B8",
        white: "#FFFFFF",
        slate500: "#334155",
      },
    },
  },
  plugins: [],
};
