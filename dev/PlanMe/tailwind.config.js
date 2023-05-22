// *************************************************** 
//   Fichier: tailwind.config.js
//   Contexte: Configuration chemins de nos fichier pour tailwind
//   Auteurs: Jessika Longtin et Finnegan Simpson
// **************************************************** 

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/Components/**/*.{html,jsx,js,cjs}",
            "./src/index.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}

