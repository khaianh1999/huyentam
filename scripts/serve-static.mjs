#!/usr/bin/env node
/**
 * Serve ./out the way GitHub Pages does, for checking a static build locally.
 *   NEXT_PUBLIC_BASE_PATH=/huyentam PORT=4173 node scripts/serve-static.mjs
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "out");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const port = Number(process.env.PORT || 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  const file = path.join(root, decodeURIComponent(urlPath));
  if (!file.startsWith(root)) return null;
  if (existsSync(file) && statSync(file).isFile()) return file;
  const index = path.join(file, "index.html");
  if (existsSync(index)) return index;
  if (existsSync(`${file}.html`)) return `${file}.html`;
  return null;
}

createServer((req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  if (basePath && pathname === "/") {
    res.writeHead(302, { Location: `${basePath}/` }).end();
    return;
  }
  if (basePath && !pathname.startsWith(`${basePath}/`) && pathname !== basePath) {
    res.writeHead(404).end("Not found");
    return;
  }
  const rel = pathname.slice(basePath.length) || "/";
  // GitHub Pages redirects /dir to /dir/ when dir/index.html exists.
  if (!rel.endsWith("/") && !path.extname(rel) && existsSync(path.join(root, rel, "index.html"))) {
    res.writeHead(301, { Location: `${pathname}/` }).end();
    return;
  }
  const file = resolveFile(rel);
  const status = file ? 200 : 404;
  const target = file ?? path.join(root, "404.html");
  res.writeHead(status, { "Content-Type": TYPES[path.extname(target)] ?? "application/octet-stream" });
  createReadStream(target).pipe(res);
}).listen(port, () => {
  console.log(`Serving ./out at http://localhost:${port}${basePath}/`);
});
