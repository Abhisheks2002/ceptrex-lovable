#!/usr/bin/env node
/**
 * build-vercel.mjs — Post-build assembler for Vercel Build Output API v3
 * Lives at repo ROOT (not scripts/).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT     = path.dirname(fileURLToPath(import.meta.url)); // repo root
const DIST_CLI = path.join(ROOT, "dist/client");
const DIST_SRV = path.join(ROOT, "dist/server");
const OUT      = path.join(ROOT, ".vercel/output");
const STATIC   = path.join(OUT, "static");
const FUNC     = path.join(OUT, "functions/index.func");

// Clean
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(FUNC,   { recursive: true });
fs.mkdirSync(STATIC, { recursive: true });

console.log("📦  Copying dist/client → .vercel/output/static/");
copyDir(DIST_CLI, STATIC);

console.log("⚙️   Copying dist/server → .vercel/output/functions/index.func/");
copyDir(DIST_SRV, FUNC);

// Edge function entry wrapper
fs.writeFileSync(path.join(FUNC, "index.mjs"), [
  "// Vercel Edge Runtime — wraps TanStack Start SSR handler",
  'import serverEntry from "./server.js";',
  "export default (request) => serverEntry.fetch(request);",
  'export const config = { runtime: "edge" };',
].join("\n") + "\n");

// Function metadata
fs.writeFileSync(path.join(FUNC, ".vc-config.json"), JSON.stringify({
  runtime: "edge",
  entrypoint: "index.mjs",
}, null, 2));

// Vercel routing rules
fs.writeFileSync(path.join(OUT, "config.json"), JSON.stringify({
  version: 3,
  routes: [
    { src: "^/assets/(.+)$", dest: "/assets/$1",
      headers: { "cache-control": "public, max-age=31536000, immutable" } },
    { src: "^/(favicon[^/]*|apple-touch-icon[^/]*)$", dest: "/$1" },
    { src: "/(.*)", dest: "/index" },
  ],
}, null, 2));

console.log(`✅  .vercel/output ready — ${countFiles(STATIC)} static files + 1 edge function`);

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
