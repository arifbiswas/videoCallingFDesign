// tailwind.config.js

module.exports = {
   content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors : {
          primary: '#3498db',
          secondary: '#2ecc71',
          tertiary: '#e74c3c',
          quaternary: '#9b59b6',
          quinary: '#34495e',
          secondaryDark: '#2c3e50',
          secondaryLight: '#ecf0f1',
          secondaryText: '#7f8c8d',
          error: '#e74c3c',
          success: '#2ecc71',
          warning: '#f1c40f',
          info: '#3498db',
          light: '#f5f5f5',
          dark: '#34495e',
        }
      },
    },
    plugins: [],
  }