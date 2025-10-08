/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#10111A',
        primary: '#A855F7',
        accent: {
          lime: '#84CC16',
          pink: '#EC4899',
          purple: '#A855F7',
          orange: '#FB923C',
        },
      },
    },
  },
  plugins: [],
}
