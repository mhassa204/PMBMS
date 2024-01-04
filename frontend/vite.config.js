import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/PMBMS/frontend/",
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@src": "/src",
      "@images": "/src/assets/images",
    },
  },
});
