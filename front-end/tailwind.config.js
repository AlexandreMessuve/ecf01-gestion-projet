/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue}", "./index.html"],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F1F1EA'
        },
        'secondary': {
          DEFAULT: '#C8CBC4'
        }
      }
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

