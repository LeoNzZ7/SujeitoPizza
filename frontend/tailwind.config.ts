import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: {
            900: "#101026",
            800: "#1D1D2E",
          },
          gray: {
            100: "#8A8A8A"
          },
          green: {
            100: "#3FFFA3"
          },
          red: {
            100: "#FF3F4B",
            200: "#EE2E3A"
          }
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
