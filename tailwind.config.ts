import colors from 'tailwindcss/colors';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-red': '#D4380D',
        'shakti-purple': '#722ED1',
        saffron: '#FA8C16',
        'forest-green': '#389E0D',
        'off-white': '#F5F5F5',
        ink: '#141414',
        // Merge with Tailwind's default stone scale (stone-50…stone-950, used
        // for muted text/backgrounds on dark sections) — a bare string here
        // would silently replace the whole scale and break every stone-N class.
        stone: { ...colors.stone, DEFAULT: '#595959' },
        'near-black': '#0A0A0A',
        charcoal: '#1A1A1A',
        // Live-tracking page theme tokens (values live in globals.css, light + dark).
        'track-bg': 'rgb(var(--track-bg) / <alpha-value>)',
        'track-surface': 'rgb(var(--track-surface) / <alpha-value>)',
        'track-ink': 'rgb(var(--track-ink) / <alpha-value>)',
        'track-muted': 'rgb(var(--track-muted) / <alpha-value>)',
        'track-line': 'rgb(var(--track-line) / <alpha-value>)',
        'track-warn-bg': 'rgb(var(--track-warn-bg) / <alpha-value>)',
        'track-warn-ink': 'rgb(var(--track-warn-ink) / <alpha-value>)',
        'track-danger-bg': 'rgb(var(--track-danger-bg) / <alpha-value>)',
        'track-danger-ink': 'rgb(var(--track-danger-ink) / <alpha-value>)',
        'track-ok-bg': 'rgb(var(--track-ok-bg) / <alpha-value>)',
        'track-ok-ink': 'rgb(var(--track-ok-ink) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        devanagari: ['Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.7' },
          '100%': { transform: 'scale(0.9)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
