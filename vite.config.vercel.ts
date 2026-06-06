/**
 * Vercel-specific Vite config for Ceptrex.
 *
 * The default vite.config.ts uses @lovable.dev/vite-tanstack-config which
 * hard-wires the @cloudflare/vite-plugin and emits a Cloudflare Worker bundle.
 * That bundle is incompatible with Vercel — hence the 404: NOT_FOUND error.
 *
 * This config uses TanStack Start + the 'vercel' nitro preset directly,
 * bypassing the Cloudflare plugin entirely.
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    tanstackStart({
      server: {
        preset: "vercel",
        entry: "src/server.vercel.ts",
      },
    }),
    react(),
    tailwindcss(),
  ],
});
