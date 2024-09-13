/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        scale: 'scaleUp 0.3s ease forwards',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1.0)' },
          '50%': { transform: 'scale(1.01)' },
          '100%': { transform: 'scale(1.0)' },
        },
      },
    },
  },
  plugins: [],
}

