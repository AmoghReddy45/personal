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
    // Add history API fallback for SPA routing
    historyApiFallback: true,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    tempo({
      // Explicitly set the storyboards directory
      storyboardsDir: "src/tempobook/storyboards",
      dynamicDir: "src/tempobook/dynamic",
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip",
          ],
          "vendor-utils": [
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
            "tailwindcss-animate",
          ],
          "vendor-charts": ["recharts"],
          "vendor-forms": ["react-hook-form", "@hookform/resolvers", "zod"],
          "vendor-supabase": ["@supabase/supabase-js"],
          "vendor-animations": ["animejs"],
        },
        // Ensure chunks are properly named for caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Enable source maps for production builds
    sourcemap: false,
    // Minify the output
    minify: "esbuild",
    // Reduce build size
    cssCodeSplit: true,
    // Disable chunk size warnings
    chunkSizeWarningLimit: 1000,
  },
}));
