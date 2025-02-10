import { crx } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
const manifest = require("./manifest.json");

export default defineConfig(async () => {
  return {
    plugins: [react(), crx({ manifest })],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
  };
});
