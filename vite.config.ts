import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  base: "/raices-de-la-republica-frontend/",
  server: {
    port: 3000,
    strictPort: true,
  },
})