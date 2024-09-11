import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#1F1F2B",
        "dark-light": "#353444",
        "dark-body": "#14141E",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
