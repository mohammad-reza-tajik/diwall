import type { Config } from "tailwindcss";

const config: Config = {
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#069f69",
          "primary-focus": "#046745",
          "primary-content": "#ffffff",

          secondary: "#f000b8",
          "secondary-focus": "#bd0091",
          "secondary-content": "#ffffff",

          accent: "#37cdbe",
          "accent-focus": "#2ba69a",
          "accent-content": "#ffffff",

          neutral: "#3b424e",
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#ced3d9",
          "base-content": "#1e2734",

          info: "#1c92f2",
          "info-content": "#ffffff",
          success: "#009485",
          warning: "#ff9900",
          error: "#D0312D",
          "error-content": "#ffffff",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "uppercase",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
    logs: false,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    fontFamily:{
      "dana-medium": ["dana-medium","Helvetica","sans-serif"],
      "dana-bold": ["dana-bold", "Helvetica","sans-serif"],
      "dana-black": ["dana-black","Helvetica","sans-serif"],
    },
    extend: {
      backgroundImage: {
        "auth-pattern": "url(/assets/pictures/auth-bg.svg)",
      }
    },
  },
}
export default config
