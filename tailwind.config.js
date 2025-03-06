export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {roboto: ['Roboto', 'sans-serif']},
      transitionProperty: {
        'visibility': 'visibility, transform, opacity'
      },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 }
          }
        },
        animation: {
          'fade-in': 'fadeIn 1.5s ease-in-out forwards'
        }
      }

  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],


  darkMode: 'class',
}
