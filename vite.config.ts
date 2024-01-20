import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import basicSSL from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), TanStackRouterVite(), basicSSL()],
  resolve: {
    alias: [
      { find: "#utils", replacement: path.resolve(__dirname, "./src/utils") },
      { find: "#types", replacement: path.resolve(__dirname, "./src/types") },
      { find: "#test", replacement: path.resolve(__dirname, "./src/test") },
      { find: "#stores", replacement: path.resolve(__dirname, "./src/stores") },
      {
        find: "#modules",
        replacement: path.resolve(__dirname, "./src/modules"),
      },
      { find: "#mocks", replacement: path.resolve(__dirname, "./src/mocks") },
      { find: "#hooks", replacement: path.resolve(__dirname, "./src/hooks") },
      { find: "#config", replacement: path.resolve(__dirname, "./src/config") },
      {
        find: "#components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      { find: "#assets", replacement: path.resolve(__dirname, "./src/assets") },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
