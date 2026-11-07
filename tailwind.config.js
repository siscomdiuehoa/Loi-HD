/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fluent: {
          blue: '#0078D4',
          blueHover: '#006CBE',
          blueActive: '#005A9E',
          accentLight: '#60CDFF',
          accentDark: '#005FB8',
          subtle: 'rgba(0, 0, 0, 0.04)',
          subtleDark: 'rgba(255, 255, 255, 0.05)',
          surface: '#F3F3F3',
          surfaceDark: '#202020',
          card: '#FFFFFF',
          cardDark: '#2C2C2C',
          micaLight: 'rgba(243, 243, 243, 0.85)',
          micaDark: 'rgba(32, 32, 32, 0.85)',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a5f7',
          500: '#0c87eb',
          600: '#0069c7',
          700: '#0154a3',
          800: '#054786',
          900: '#0a3c6f',
          950: '#07264a',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI Variable Display"', '"Segoe UI Variable Text"', '"Segoe UI"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'win11-window': '0 32px 64px -16px rgba(0, 0, 0, 0.3), 0 16px 32px -8px rgba(0, 0, 0, 0.2)',
        'win11-card': '0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'win11-card-hover': '0 8px 16px -2px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)',
        'win11-flyout': '0 16px 32px -4px rgba(0, 0, 0, 0.18), 0 8px 16px -4px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'win': '8px',
        'win-lg': '12px',
        'win-xl': '16px',
      }
    },
  },
  plugins: [],
}
