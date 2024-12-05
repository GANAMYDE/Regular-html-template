// tailwind.config.js (ES Module Syntax)
export default {
  content: [
    './src/**/*.{html,js,jsx}', // Make sure to include files where Tailwind classes will be used
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
