/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans Thai", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
        border: "var(--border)",
        muted: "var(--muted)",
        input: "var(--input-bg)",
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
        wiggle: "wiggle 0.4s ease-in-out",
        "fade-in-up": "fade-in-up 0.35s ease-out both",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg) translateY(0)" },
          "25%": { transform: "rotate(-0.8deg) translateY(-2px)" },
          "75%": { transform: "rotate(0.8deg) translateY(-1px)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
