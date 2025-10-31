
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#7c3aed",
          foreground: "#ffffff"
        },
        accent: "#06b6d4"
      },
      borderRadius: {
        "2xl": "1.25rem"
      },
      boxShadow: {
        card: "0 10px 30px rgba(0,0,0,.35)"
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
