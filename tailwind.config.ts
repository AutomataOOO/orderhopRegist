import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        'mobile': '100%',
        'tablet': '100%',
        'desktop': '580px',
        'wide': '580px',
      },
    },
    extend: {
      // 반응형 breakpoints
      screens: {
        'mobile': '360px',
        'tablet': '600px',
        'desktop': '1024px',
        'wide': '1440px',
      },
      // 색상 테마
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#0ea5e9',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#64748b',
        },
        success: {
          DEFAULT: '#22c55e',
          dark: '#16a34a',
        },
        warning: {
          DEFAULT: '#eab308',
          dark: '#ca8a04',
        },
        error: {
          DEFAULT: '#ef4444',
          dark: '#dc2626',
        }
      },
      // 타이포그래피
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'Helvetica Neue',
          'Segoe UI',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif'
        ],
      },
      fontSize: {
        'heading-1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'heading-2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'heading-3': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        'heading-4': ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.5' }],
        'body': ['1rem', { lineHeight: '1.5' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      // 간격 및 크기
      spacing: {
        '4.5': '1.125rem',
        '18': '4.5rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config; 