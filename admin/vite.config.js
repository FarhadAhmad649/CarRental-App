import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 5173, // Forces Admin to ALWAYS use 5174
    strictPort: true,
  }
});
