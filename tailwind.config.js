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
        'login': "linear-gradient(180deg, rgba(4, 26, 60, 0.45) 0%, rgba(4, 26, 60, 0.90) 100%), url('https://i.ibb.co/ZxGdnJ4/eric-prouzet-B3-UFXwc-Vbc4-unsplash.jpg')",
      }
    },
  },
  plugins: []
}