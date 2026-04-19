import { build as esbuild } from 'esbuild';
import { execSync } from 'node:child_process';
import {
  readFileSync, writeFileSync, mkdirSync, existsSync, rmSync,
  readdirSync, copyFileSync, statSync,
} from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 1. Tailwind CSS
console.log('→ tailwind');
execSync('npx @tailwindcss/cli -i src/input.css -o dist/styles.css --minify', {
  stdio: 'inherit',
  cwd: root,
});

// 2. TypeScript/JSX bundle
console.log('→ esbuild');
await esbuild({
  entryPoints: [join(root, 'src/main.tsx')],
  bundle: true,
  minify: true,
  sourcemap: false,
  target: 'es2020',
  format: 'iife',
  outfile: join(dist, 'bundle.js'),
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
});

// 3. HTML entry
const html = readFileSync(join(root, 'FastNet.html'), 'utf8');
const transformed = html
  .replace(/<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/, '')
  .replace(/<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/, '')
  .replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]+"[^>]*><\/script>\s*/, '')
  .replace(
    /(\s*<script type="text\/babel" src="src\/[^"]+\.jsx"><\/script>)+/g,
    '\n<script src="/bundle.js" defer></script>'
  );

writeFileSync(join(dist, 'index.html'), transformed);

// 4. Copy public/*
const pub = join(root, 'public');
if (existsSync(pub)) {
  const copyRecursive = (srcDir, destDir) => {
    mkdirSync(destDir, { recursive: true });
    for (const entry of readdirSync(srcDir)) {
      const s = join(srcDir, entry);
      const d = join(destDir, entry);
      if (statSync(s).isDirectory()) copyRecursive(s, d);
      else copyFileSync(s, d);
    }
  };
  copyRecursive(pub, dist);
  console.log('→ public/ copied');
}

// 5. Prerender SPA routes to static HTML for SEO
console.log('→ prerender');
execSync('node scripts/prerender.mjs', { stdio: 'inherit', cwd: root });

console.log('Build complete → dist/');
