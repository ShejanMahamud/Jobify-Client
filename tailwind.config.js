/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#0A65CC'
      },
      fontFamily: {
        'inter' : 'Inter'
      },
      backgroundImage: {
        'login': "linear-gradient(180deg, rgba(4, 26, 60, 0.45) 0%, rgba(4, 26, 60, 0.90) 100%), url('https://i.ibb.co/F8LXjp5/luis-villasmil-ml-Vb-Mbxf-WI4-unsplash-1.jpg')",
        'featured' : 'linear-gradient(90deg, #FFF6E6 0%, #FFF 100%)',
        'gradient': 'linear-gradient(90deg, #FFF6E6 0%, #FFF 100%)'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}