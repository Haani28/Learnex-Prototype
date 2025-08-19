/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // important!
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        muted: "var(--muted)",
        card: "var(--card)",
      }
    }
  }
}
