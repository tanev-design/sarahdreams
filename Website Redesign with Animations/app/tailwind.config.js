/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
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
        obsidian: '#050505',
        ink: '#0a0a0a',
        charcoal: '#141414',
        mist: '#2a2a2a',
        bone: '#e8e4e0',
        champagne: '#c9a96e',
        gold: '#d4af37',
        blush: '#f5e6e0',
        'rose-gold': '#c9897e',
        wine: '#3d0f1a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'section': ['clamp(1.8rem, 3.5vw, 3.2rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'subheading': ['clamp(1.2rem, 2vw, 1.6rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        glow: "0 0 12px rgba(212, 175, 55, 0.35)",
        'glow-lg': "0 12px 36px rgba(212, 175, 55, 0.25)",
        card: "0 24px 60px rgba(0, 0, 0, 0.5)",
        'card-hover': "0 28px 80px rgba(0, 0, 0, 0.6)",
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "pulse-line": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "pulse-line": "pulse-line 2s ease infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
