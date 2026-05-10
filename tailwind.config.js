/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        surfaceBorder: 'var(--color-surface-border)',
        textMain: 'var(--color-text-main)',
        textMuted: 'var(--color-text-muted)',
        arc: {
          light: 'var(--color-primary-light)',
          DEFAULT: 'var(--color-primary)',
          dark: 'var(--color-primary-dark)',
        },
        stark: {
          red: 'var(--color-accent-1)',
          gold: 'var(--color-accent-2)'
        }
      },
      fontFamily: {
        tech: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'arc': '0 0 10px rgba(var(--rgb-primary), 0.3), inset 0 0 10px rgba(var(--rgb-primary), 0.1)',
        'arc-hover': '0 0 15px rgba(var(--rgb-primary), 0.6), inset 0 0 15px rgba(var(--rgb-primary), 0.2)',
        'red-glow': '0 0 10px rgba(var(--rgb-accent-1), 0.5)',
      }
    },
  },
  plugins: [],
}

