/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'ds-primary': {
          DEFAULT: '#f88a24',
          50: '#fff9f4',
          100: '#fde3ca',
          200: '#fccda1',
          300: '#fbb677',
          400: '#f9a04e',
          500: '#f88a24',
          600: '#d3751f',
          700: '#ae6119',
          800: '#884c14',
          900: '#63370e',
          950: '#3e2309',
        },
        'ds-secondary': {
          DEFAULT: '#2fc1ff',
          50: '#f5fcff',
          100: '#cdf0ff',
          200: '#a6e4ff',
          300: '#7ed9ff',
          400: '#57cdff',
          500: '#2fc1ff',
          600: '#28a4d9',
          700: '#2187b3',
          800: '#1a6a8c',
          900: '#134d66',
          950: '#0c3040',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  safelist: [
    {
      pattern:
        /(bg|border)-(ds-primary|ds-secondary|primary|secondary|slate|gray|zinc|neutral|red|yellow|green)(-(50|100|200|300|400|500|600|700|800|900|950))?/,
      variants: ['hover', 'focus', 'hover:dark'],
    },
    {
      pattern: /(border)-('dashed' | 'dotted' | 'double' | 'solid' | 'none')/,
    },
  ],
  plugins: [require('@tailwindcss/typography')],
};
