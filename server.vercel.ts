/**
 * Vercel server entry point for TanStack Start.
 *
 * Unlike the default src/server.ts (which wraps a Cloudflare Worker handler),
 * this file simply re-exports the TanStack Start server entry directly.
 * The 'vercel' nitro preset in vite.config.vercel.ts handles the rest.
 */
import "./lib/error-capture";

export { default } from "@tanstack/react-start/server-entry";
