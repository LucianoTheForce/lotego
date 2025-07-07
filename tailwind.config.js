/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#38A169',
          secondary: '#68D391',
          tertiary: '#9AE6B4',
        },
        success: '#48BB78',
        warning: '#ED8936',
        error: '#E53E3E',
        info: '#3182CE',
      },
    },
  },
  plugins: [],
}