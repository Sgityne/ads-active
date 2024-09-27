/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary :{
          DEFAULT: "#40D4CC",
          100: "#E3F9F8",
        },
        tertiary :{
          DEFAULT: "#24857E",
        },
        black: {
          DEFAULT: "#000",
        },
        gray: {
          DEFAULT: "#535353",
        },
      },
      fontFamily: {
        rthin: ["Roboto-Thin", "sans-serif"],
        rlight: ["Roboto-Light", "sans-serif"],
        rregular: ["Roboto-Regular", "sans-serif"],
        rmedium: ["Roboto-Medium", "sans-serif"],
        rbold: ["Roboto-Bold", "sans-serif"],
        rblack: ["Roboto-Black", "sans-serif"],
        imedium: ["Inter-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
