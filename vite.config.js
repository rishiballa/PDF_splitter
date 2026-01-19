// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    include: ["pdf-lib"],
  },

  build: {
    rollupOptions: {
      external: ["pdf-lib"],
    },
  },

  define: {
    "process.env": {},
  },
});

