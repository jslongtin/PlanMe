/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{cjs,js,ts,jsx,tsx}",
    "./src/**/**/*.{cjs,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00A388", // change to green color of your choice
        green: {
          450: "#00796B", // add a darker shade of green for contrast
        },
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
      },
      fontFamily: {
        body: ["Nunito"],
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0,0,0,0.3)",
      },
      borderRadius: {
        xl: "1rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [],
};
