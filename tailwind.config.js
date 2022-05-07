const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      "dukeOrange": "#B05249",
      "dukeGray": "#8B8C9F",
      "dukeBlack": "#373137"
    },
    screens: {
      "2xs": "320px",
      "xs": "480px",
      'fhd': '1920px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}
