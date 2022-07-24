const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,tx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
    container:{
      center:true,
    }
  },
  plugins: [require("daisyui")],
  daisyui:{
    themes:['light','night']
  },

}
