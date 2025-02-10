import process from "process";

/** @type {import('tailwindcss').Config} */

export default {
  safelist: process.env.NODE_ENV === "development" ? [{ pattern: /./ }] : [],
  darkMode: ["class"],
  purge: {
    enabled: false,
  },
  prefix: "sally-",
  corePlugins: {
    preflight: false,
  },
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      padding: {
        2: "8px",
        4: "16px",
        6: "24px",
        8: "32px",
        16: "64px",
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
  plugins: [],
};
