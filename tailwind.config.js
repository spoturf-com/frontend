/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        Mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        primary: "#588157",
        secondary: "#3a5a40",
        ternary: "#a3b18a",
        lightTheme: "#dad7cd",
        darkTheme: "#344e41",
        blackBg: "#111111",
      },
    },
  },
  plugins: [require("daisyui"), require("flowbite/plugin")],
  daisyui: {
    themes: [
      {
        light: {
          // importing the built-in 'light' theme
          // and setting the color values for '--primary-muted'
          // (numbers are OKLCH values)
          ...require("daisyui/src/theming/themes")["light"],
          // "--primary-muted": "65% 0.2 295",
        },
      },
    ],
  },
});
