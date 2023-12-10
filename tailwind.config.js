/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#272727",
      secondary: "#3A3636",
      tertiary: "#ff49db",
      dark: "#232323",
      green: "#3BF686",
    },
    fontFamily: {
      sora: ["Sora", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
});
