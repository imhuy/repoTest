/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#0F172A',
        pinkRed: '#D71C5D',
        grey: '#64748B',
        greyWeak: '#F1F5F9',
        greyVeryWeak: '#EDF2F7',
        success: '#027A48',
        successWeak: '#ECFDF3',
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.typo-h1, h1': {
          fontSize: '3.2rem',
          lineHeight: '4.8rem',
          fontWeight: '500',
        },

        '.typo-normal': {
          fontSize: '1.5rem',
          lineHeight: '2.25rem',
          fontWeight: '400',
        },

        '.typo-medium-bold': {
          fontSize: '1.7rem',
          lineHeight: '2.55rem',
          fontWeight: '500',
        },

        '.typo-small': {
          fontSize: '1.3rem',
          lineHeight: '1.95rem',
          fontWeight: '500',
        },

        '.typo-pagination': {
          fontSize: '1.5rem',
          lineHeight: '2.2rem',
          fontWeight: '400',
        },
      })
    },
  ],
}
