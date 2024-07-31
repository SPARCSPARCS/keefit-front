import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    mkcert(),
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
  server: {
    https: false,

    proxy: {
      "/api": "http://10.10.0.10:8080",
    },
  },
});
