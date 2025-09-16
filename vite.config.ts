import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      '/api': {
        // Prefer vercel dev if running; fallback to 3001 if you use a custom API
        target: process.env.VERCEL_DEV === '1' ? 'http://localhost:8080' : (process.env.API_PORT ? `http://localhost:${process.env.API_PORT}` : 'http://localhost:8080'),
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
