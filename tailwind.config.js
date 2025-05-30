/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {
        colors: {
          primary: '#47cfc8',
          secondary: '#76cfbc',
          background: '#f9fafb',
          text: {
            primary: '#1f2937',
            secondary: '#6b7280',
          },
        },
      },
    },
    plugins: [],
  }
  