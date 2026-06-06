/**
 * Vercel server entry — re-exports TanStack Start's default SSR handler.
 * The default src/server.ts exports a Cloudflare Worker handler which
 * is incompatible with Vercel Edge Runtime.
 */
export { default } from "@tanstack/react-start/server-entry";
