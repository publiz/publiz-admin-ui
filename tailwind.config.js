/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,html,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}

