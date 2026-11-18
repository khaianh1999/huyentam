#!/usr/bin/env node
/**
 * Build a static export (./out) for GitHub Pages.
 *
 * The project is copied into ./.static-build, server-only routes (admin,
 * account, API) are removed from that copy, and `next build` runs there with
 * STATIC_EXPORT=1. The real src/ is never modified, so this works while
 * `next dev` is running. node_modules is resolved from the project root.
 *
 * Env:
 *   NEXT_PUBLIC_BASE_PATH  sub-path the site is served from, e.g. "/huyentam"
 *                          (empty for a custom domain or a <user>.github.io repo)
 *   NEXT_PUBLIC_SITE_URL   absolute site URL for canonical/sitemap links
 */
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const stage = path.join(root, ".static-build");
const outDir = path.join(root, "out");

// Server-only routes, relative to src/app. They need Node at request time.
const SERVER_ONLY = ["api", "admin"];

// What the build needs from the project root.
const COPY = [
  "src",
  "public",
  "next.config.ts",
  "tsconfig.json",
  "package.json",
  "next-env.d.ts",
  "postcss.config.mjs",
  ...readdirSync(root).filter((f) => f.startsWith(".env")),
];

rmSync(stage, { recursive: true, force: true });
for (const rel of COPY) {
  const from = path.join(root, rel);
  if (existsSync(from)) cpSync(from, path.join(stage, rel), { recursive: true });
}
for (const rel of SERVER_ONLY) {
  rmSync(path.join(stage, "src", "app", rel), { recursive: true, force: true });
}

const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules", "next", "dist", "bin", "next"), "build"],
  {
    cwd: stage,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1", STATIC_EXPORT_ROOT: root },
  },
);
const status = result.status ?? 1;

/**
 * Next.js names client-router prefetch files "__next.<segment>.<segment>.txt",
 * but on Windows its export joins segments with "\\" and writes them as nested
 * folders ("__next.lich-am-duong/$d$date.txt"), so every prefetch 404s.
 * Flatten them back to the names the router requests. No-op on Linux/macOS.
 */
function flattenSegmentFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const rel of readdirSync(full, { recursive: true })) {
        const from = path.join(full, rel);
        if (statSync(from).isDirectory()) continue;
        renameSync(from, path.join(dir, `${entry.name}.${rel.split(path.sep).join(".")}`));
      }
      rmSync(full, { recursive: true, force: true });
    } else {
      flattenSegmentFiles(full);
    }
  }
}

if (status === 0) {
  rmSync(outDir, { recursive: true, force: true });
  renameSync(path.join(stage, "out"), outDir);
  flattenSegmentFiles(outDir);
  // GitHub Pages runs Jekyll by default, which would drop the _next/ folder.
  writeFileSync(path.join(outDir, ".nojekyll"), "");
  rmSync(stage, { recursive: true, force: true });
  console.log("\nStatic site ready in ./out");
} else {
  console.error(`\nStatic build failed (staging copy kept in ${stage} for inspection).`);
}
process.exit(status);
