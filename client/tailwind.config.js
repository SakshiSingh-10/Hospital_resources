/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        healthcare: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          navy: '#0f2942',
          darkBlue: '#0a192f',
          surface: '#f8fafc',
          border: '#e2e8f0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 41, 66, 0.06), 0 2px 6px -1px rgba(15, 41, 66, 0.04)',
        'floating': '0 20px 40px -15px rgba(13, 148, 136, 0.12), 0 10px 20px -5px rgba(15, 41, 66, 0.08)'
      }
    },
  },
  plugins: [],
}
