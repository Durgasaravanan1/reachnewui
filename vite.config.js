import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#4F46E5",
        border: "#E5E7EB",
        muted: "#64748B",
        bg: "#F8FAFC",
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
