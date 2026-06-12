import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Expose shared partials automatically to all SCSS modules.
        // Components only need to @use individual partials they need.
        api: "modern-compiler",
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
