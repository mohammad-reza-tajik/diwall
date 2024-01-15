import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily:{
        "dana-medium": ["dana-medium","Helvetica","sans-serif"],
        "dana-bold": ["dana-bold", "Helvetica","sans-serif"],
        "dana-black": ["dana-black","Helvetica","sans-serif"],
      },
      backgroundImage: {
        "auth-pattern": "url(/pictures/auth-bg.svg)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),require("daisyui")],
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
} satisfies Config

export default config