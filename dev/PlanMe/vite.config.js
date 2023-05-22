// *************************************************** 
//   Fichier: vite.config.js
//   Contexte: Configuration de l'api pour vite
//   Auteurs: Jessika Longtin et Finnegan Simpson
// **************************************************** 

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
