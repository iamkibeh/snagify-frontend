/** @type {import('tailwindcss').Config} */

// const withMT = require('@material-tailwind/react/utils/withMT')
import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      },
      backgroundImage: () => ({
        'gradient-primary': 'linear-gradient(to top, #30cfd0 0%, #330867 100%)',
      }),
      colors: {
        primary: '#39739d',
        secondary: '#7aa7c7',
        background: '#e1ecf4',
        highlight: '#b3d3ea',
        dark: '#2c5777',
        accent: '#a0c7e4',
      },
    },
  },
  plugins: [],
})
