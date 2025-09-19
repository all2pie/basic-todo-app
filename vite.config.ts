import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "components", replacement: resolve(__dirname, "src/components") },
      { find: "hooks", replacement: resolve(__dirname, "src/hooks") },
      { find: "models", replacement: resolve(__dirname, "src/models") },
      { find: "usecases", replacement: resolve(__dirname, "src/usecases") },
      { find: "services", replacement: resolve(__dirname, "src/services") },
    ],
  },
  build: {
    outDir: "dist",
  },
});
