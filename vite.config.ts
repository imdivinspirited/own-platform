import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // load .env files based on mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: Number(env.VITE_PORT) || 8080,
      open: true, // auto-open in browser for smoother DX
    },

    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),

    // dynamic base for easier deployment on multiple environments
    base: env.VITE_BASE_PATH || "/own-platform",

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    build: {
      outDir: "dist",
      sourcemap: mode === "development",
      chunkSizeWarningLimit: 800, // avoid noisy logs
    },

    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  };
});
