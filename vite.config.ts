import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from "vite-tsconfig-paths";
import createDsPlugin from "./plugins/ds/ds";
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    createDsPlugin({
      sourceTokenFile: "./src/ui/ds/core/tokens.ts",
      cssOutputPath: "./src/ui/ds/core/_variables.css",
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
})
