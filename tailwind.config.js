const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        openSans: ['var(--font-open-sans)', ...fontFamily.sans],
      },
      colors: {
        'main': '#333333',
        'deep-blue': '#045692',
        'form-label': '#4F4F4F',
        'required-pink': '#EF1A57',
        'mid-blue': '#0F75BC',
        'light-blue': '#1890FF',
        'light-red': '#EB5757',
        'light-ash': '#828282'
      }
    },
  },
  plugins: [],
}
