import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, "index.html"),
        "design-system": resolve(import.meta.dirname, "design-system.html"),
      },
    },
  },
});
