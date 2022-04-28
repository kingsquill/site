module.exports = {
  content: ["_site/**/*.{html,js}"],
  theme: {
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans: ['Montserrat', 'sans'],
      heading: ['"Uncial Antiqua"', 'serif']
    },
    extend: {
      backgroundImage: {
        home: "url('/img/christs-college.jpg')"
      }
    },
  },
  plugins: [],
}
