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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['40px', { lineHeight: 'auto', fontWeight: '600' }],
        'display-2': ['35px', { lineHeight: 'auto', fontWeight: '600' }],
        'h1': ['25px', { lineHeight: 'auto', fontWeight: '600' }],
        'h2': ['25px', { lineHeight: 'auto', fontWeight: '500' }],
        'h3': ['20px', { lineHeight: 'auto', fontWeight: '500' }],
        'h4': ['18px', { lineHeight: 'auto', fontWeight: '400' }],
        'h5': ['16px', { lineHeight: 'auto', fontWeight: '400' }],
        'h6': ['14px', { lineHeight: 'auto', fontWeight: '400' }],
      },
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        }
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out'
      }
    },
  },
  plugins: [],
} satisfies Config;
