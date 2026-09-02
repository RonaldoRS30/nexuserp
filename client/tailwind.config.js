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
          hover: 'var(--color-blue-hover)',
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
        sans: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(10, 10, 10, 0.04), 0 16px 40px rgba(10, 10, 10, 0.06)',
        nav: '0 1px 0 rgba(10, 10, 10, 0.06)',
      },
      maxWidth: {
        content: '72rem',
      },
      transitionDuration: {
        ui: '150ms',
      },
    },
  },
  plugins: [],
};
