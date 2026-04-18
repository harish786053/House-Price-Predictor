/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0f111a",
        cardBg: "#1a1d27",
        primary: "#6c5dd3",
        secondary: "#3f8cff",
        accent: "#ffb038",
        success: "#22b07d",
        danger: "#ff754c",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
