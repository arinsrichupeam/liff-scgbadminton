/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        SCGBold: "SCG-Bold,sans-serif",
        SCGRegular: "SCG-Regular,sans-serif",
        SCGLight: "SCG-Light,sans-serif",
      },
    },
  },
  plugins: [],
};
