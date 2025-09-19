/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "./src/**/*.module.css", // Inclui arquivos CSS explicitamente
    // Removido "node_modules/flowbite/**/*.js" pois não será mais necessário
  ],
  theme: {
    extend: {
      colors: {
        cream: '#fdf6f0',        // tom claro, elegante
        rose: '#f43f5e',         // rosa vibrante
        wine: '#5e1f3d',         // vinho principal
        wineDark: '#3e1428',     // vinho escuro
      },
    },
  },
  plugins: [
    // Removido require('flowbite/plugin'),
    require('tailwind-scrollbar-hide'),
    require("@tailwindcss/aspect-ratio"),
  ],
};