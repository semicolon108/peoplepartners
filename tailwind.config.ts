// tailwind.config.ts
import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e293b',
          darker: '#0f172a'
        },
        'brand-gray': {
          DEFAULT: '#64748b',
          light: '#f8fafc',
          dark: '#334155'
        },
        'brand-yellow': {
          DEFAULT: '#f59e0b',
          light: '#fbbf24'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': "url('/grid-pattern.svg')",
      }
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1200px',
      },
    },
  },
  plugins: [
    typography,
  ],
}
export default config