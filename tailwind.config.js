const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  plugins: [require('@tailwindcss/forms'),
],
}
