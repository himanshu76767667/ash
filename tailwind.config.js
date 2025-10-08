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
        background: '#0A0B12',
        primary: '#A855F7',
        accent: {
          lime: '#84CC16',
          pink: '#EC4899',
          purple: '#A855F7',
          orange: '#FB923C',
        },
      },
      transitionDuration: {
        'fast': '100ms',
        'normal': '150ms',
      },
    },
  },
  plugins: [],
}
