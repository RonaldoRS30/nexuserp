/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        brand: {
          DEFAULT: 'var(--color-blue)',
          light: 'var(--color-blue-light)',
        },
        surface: {
          DEFAULT: 'var(--color-background)',
          muted: 'var(--color-background-secondary)',
        },
        ink: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-secondary)',
        },
        line: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(38, 52, 71, 0.05), 0 12px 32px rgba(38, 52, 71, 0.08)',
        nav: '0 1px 0 rgba(38, 52, 71, 0.08)',
      },
      maxWidth: {
        content: '72rem',
      },
    },
  },
  plugins: [],
};
