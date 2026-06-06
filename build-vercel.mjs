#!/usr/bin/env node
/**
 * build-vercel.mjs — Post-build assembler for Vercel Build Output API v3
 *
 * TanStack Start outputs:
 *   dist/client/   → static assets (JS, CSS, images)
 *   dist/server/   → SSR server bundle (server.js with default.fetch())
 *
 * Vercel needs:
 *   .vercel/output/config.json                        → routing rules
 *   .vercel/output/static/                            → static CDN files
 *   .vercel/output/functions/index.func/.vc-config.json + index.mjs → Edge SSR
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT      = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST_CLI  = path.join(ROOT, "dist/client");
const DIST_SRV  = path.join(ROOT, "dist/server");
const OUT       = path.join(ROOT, ".vercel/output");
const STATIC    = path.join(OUT, "static");
const FUNC      = path.join(OUT, "functions/index.func");

// Clean
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(FUNC,   { recursive: true });
fs.mkdirSync(STATIC, { recursive: true });

// 1. Static assets
console.log("📦  Copying dist/client → static/");
copyDir(DIST_CLI, STATIC);

// 2. Server bundle
console.log("⚙️   Copying dist/server → functions/index.func/");
copyDir(DIST_SRV, FUNC);

// 3. Edge function entry
fs.writeFileSync(path.join(FUNC, "index.mjs"), [
  "// Vercel Edge Runtime — wraps TanStack Start SSR handler",
  'import serverEntry from "./server.js";',
  "export default (request) => serverEntry.fetch(request);",
  'export const config = { runtime: "edge" };',
].join("\n") + "\n");

// 4. Function config
fs.writeFileSync(path.join(FUNC, ".vc-config.json"), JSON.stringify({
  runtime: "edge",
  entrypoint: "index.mjs",
}, null, 2));

// 5. Vercel routing config
fs.writeFileSync(path.join(OUT, "config.json"), JSON.stringify({
  version: 3,
  routes: [
    // Immutable hashed assets
    { src: "^/assets/(.+)$", dest: "/assets/$1",
      headers: { "cache-control": "public, max-age=31536000, immutable" } },
    // Favicons / static files in root
    { src: "^/(favicon[^/]*|apple-touch-icon[^/]*)$", dest: "/$1" },
    // Everything else → SSR edge function
    { src: "/(.*)", dest: "/index" },
  ],
}, null, 2));

const n = countFiles(STATIC);
console.log(`✅  .vercel/output ready — ${n} static files + 1 edge function`);

function copyDir(src, dest) {
  if (!fs.existsSync(src)) { console.warn("  ⚠ missing:", src); return; }
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src)) {
    const s = path.join(src, e), d = path.join(dest, e);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}
function countFiles(dir, n = 0) {
  if (!fs.existsSync(dir)) return n;
  for (const e of fs.readdirSync(dir)) {
    const p = path.join(dir, e);
    n = fs.statSync(p).isDirectory() ? countFiles(p, n) : n + 1;
  }
  return n;
}
