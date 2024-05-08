/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
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
        "cv-star": "#ffc400",
        "cv-primary-background": "#f4f5fa",
        "cv-primary-10": "#e8ebf9",
        "cv-primary-20": "#d0d7f3",
        "cv-primary-30": "#b9c2ed",
        "cv-primary-40": "#a1aee7",
        "cv-primary-50": "#8a9ae1",
        "cv-primary-60": "#7286db",
        "cv-primary-70": "#5b72d5",
        "cv-primary-80": "#435dcf",
        "cv-primary-90": "#2b49c9",
        "cv-primary-100": "#1435c3",
        "cv-gray-10": "#ededed",
        "cv-gray-20": "#dbdbdb",
        "cv-gray-30": "#c9c9c9",
        "cv-gray-40": "#b7b7b7",
        "cv-gray-50": "#a6a6a6",
        "cv-gray-60": "#949494",
        "cv-gray-70": "#828282",
        "cv-gray-80": "#707070",
        "cv-gray-90": "#5e5e5e",
        "cv-gray-100": "#4c4c4c",
        "cv-gray-200": "#444444",
        "cv-gray-300": "#3d3d3d",
        "cv-gray-400": "#353535",
        "cv-gray-500": "#2e2e2e",
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
  plugins: [require("tailwindcss-animate")],
}