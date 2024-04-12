/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'primaryColor': '#3758F9', // blue
      'primaryColorHover': '#1B44C8', // darker blue
      'green': '#13C296',
      'greenHover': '#0BB489',
      'primaryText': '#637381', // placeholder color, greyish
      'secondaryText': '#8899A8', // light grey
      'stroke': '#DFE4EA', // lightest grey, border for input areas
      'dark': '#111928', // headers/labels
      'white': '#FFFFFF',
      'background': '#F3F4F6', // background for components
      'danger': '#F23030', // red
      'dangerHover': '#E10E0E', // darker red
      
    },
    extend: {},
  },
  plugins: [],
};
