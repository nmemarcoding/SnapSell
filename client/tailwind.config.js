/** @type {import('tailwindcss').Config} */
import '@tailwindcss/forms'
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [
 
    require('@tailwindcss/forms')
  ],
}