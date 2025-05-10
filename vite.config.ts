import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { tempo } from "tempo-devtools/dist/vite"; // Import tempo plugin

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow Tempo to access the server
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    tempo(), // Use default configuration
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
