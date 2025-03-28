import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

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
        "primary-blue": "#088DDE",
        "primary-blue-dark": "#044E7B",
        'blue-500': '#55BBF9', // 新增自定義藍色
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['40px', { lineHeight: 'auto', fontWeight: '600' }],
        'display-2': ['35px', { lineHeight: 'auto', fontWeight: '600' }],
        'h1': ['25px', { lineHeight: 'auto', fontWeight: '600', letterSpacing: '0.12rem' }],
        'h2': ['25px', { letterSpacing: '0.12rem', lineHeight: 'auto', fontWeight: '500' }],
        'h3': ['20px', { lineHeight: 'auto', fontWeight: '500', letterSpacing: '0.12rem' }],
        'h4': ['18px', { lineHeight: 'auto', fontWeight: '400', letterSpacing: '0.12rem' }],
        'h5': ['16px', { lineHeight: 'auto', fontWeight: '400', letterSpacing: '0.12rem' }],
        'h6': ['14px', { letterSpacing: '0.12rem', lineHeight: 'auto', fontWeight: '400' }],
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
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: 'var(--foreground)',
            a: {
              color: '#088DDE',
              '&:hover': {
                color: '#044E7B',
              },
            },
            strong: {
              color: 'var(--foreground)',
            },
            h1: {
              color: 'var(--foreground)',
            },
            h2: {
              color: 'var(--foreground)',
            },
            h3: {
              color: 'var(--foreground)',
            },
            h4: {
              color: 'var(--foreground)',
            },
            h5: {
              color: 'var(--foreground)',
            },
            h6: {
              color: 'var(--foreground)',
            },
            blockquote: {
              color: 'var(--foreground)',
              borderLeftColor: '#088DDE',
            },
            code: {
              color: 'var(--foreground)',
            },
            pre: {
              backgroundColor: '#f7f7f7',
            },
            img: {
              margin: 'auto',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
} satisfies Config;
