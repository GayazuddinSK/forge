/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: 'rgba(10, 15, 25, 0.7)',
        surfaceBorder: 'rgba(6, 182, 212, 0.2)',
        arc: {
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        stark: {
          red: '#dc2626',
          gold: '#f59e0b'
        }
      },
      fontFamily: {
        tech: ['Rajdhani', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'arc': '0 0 10px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.1)',
        'arc-hover': '0 0 15px rgba(6, 182, 212, 0.6), inset 0 0 15px rgba(6, 182, 212, 0.2)',
        'red-glow': '0 0 10px rgba(220, 38, 38, 0.5)',
      }
    },
  },
  plugins: [],
}
