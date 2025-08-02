/** @type {import('tailwindcss').Config} */
const { corpAstroThemeExtension } = require('./src/components/foundations/nativewind/NativeWindIntegration');

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Original theme extensions
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
        // Corp Astro theme colors
        ...corpAstroThemeExtension.colors,
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        // Corp Astro font families
        ...corpAstroThemeExtension.fontFamily,
      },
      fontSize: {
        // Corp Astro font sizes
        ...corpAstroThemeExtension.fontSize,
      },
      spacing: {
        // Corp Astro spacing
        ...corpAstroThemeExtension.spacing,
      },
      lineHeight: {
        // Corp Astro line heights
        ...corpAstroThemeExtension.lineHeight,
      },
      letterSpacing: {
        // Corp Astro letter spacing
        ...corpAstroThemeExtension.letterSpacing,
      },
    },
  },
  plugins: [],
};