/**
 * Vercel-specific Vite config for Ceptrex.
 *
 * The default vite.config.ts uses @lovable.dev/vite-tanstack-config which
 * hard-wires the @cloudflare/vite-plugin and emits a Cloudflare Worker bundle.
 * That bundle is incompatible with Vercel — hence the 404: NOT_FOUND error.
 *
 * Fix: use tanstackStart directly (no Cloudflare plugin).
 * The `server.preset` option does NOT exist in this version of tanstackStart —
 * Vercel deployment is handled by the post-build scripts/build-vercel.mjs instead.
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
        entry: "src/server.vercel.ts",
      },
    }),
    react(),
    tailwindcss(),
  ],
});