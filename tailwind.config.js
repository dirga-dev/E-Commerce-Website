/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./src/*.{html,js,jsx}", "./public/*.{html,js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    fontFamily: {
      garamond: ["EB Garamond", ...defaultTheme.fontFamily.sans],
      quicksand: ["Quicksand", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: "#333333",
        primaryLight: "#F8F8F8",
        secondary: "#DBA637",
        blueButton: "#4666A3",
        redButton: "#B20000"
      },
    },
  },
  plugins: [],
};
