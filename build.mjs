import { transformSync } from 'esbuild';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync, readdirSync, copyFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ORDER = [
  'primitives', 'nav', 'hero', 'sections', 'howitworks', 'usecases',
  'pricing', 'checkout', 'availability', 'consultation', 'dashboard',
  'about', 'tweaks', 'app',
];

const root = process.cwd();
const dist = join(root, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 1. Tailwind CSS build
console.log('→ tailwind');
execSync(
  `npx @tailwindcss/cli -i src/input.css -o dist/styles.css --minify`,
  { stdio: 'inherit', cwd: root }
);

// 2. JSX transform + bundle
console.log('→ esbuild');
const chunks = ORDER.map((name) => {
  const src = readFileSync(join(root, 'src', `${name}.jsx`), 'utf8');
  const { code } = transformSync(src, {
    loader: 'jsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'es2019',
    sourcefile: `${name}.jsx`,
  });
  return `// === ${name}.jsx ===\n${code}`;
});

const minified = transformSync(chunks.join('\n'), {
  loader: 'js', minify: true, target: 'es2019',
});
writeFileSync(join(dist, 'bundle.js'), minified.code);

// 3. HTML rewrite
const html = readFileSync(join(root, 'FastNet.html'), 'utf8');
const transformed = html
  .replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]+"[^>]*><\/script>/,
    '<script src="https://unpkg.com/react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"></script>'
  )
  .replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]+"[^>]*><\/script>/,
    '<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"></script>'
  )
  .replace(
    /<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]+"[^>]*><\/script>\s*/,
    ''
  )
  .replace(
    /(\s*<script type="text\/babel" src="src\/[^"]+\.jsx"><\/script>)+/g,
    '\n<script src="bundle.js" defer></script>'
  );

writeFileSync(join(dist, 'index.html'), transformed);

// 4. Copy public/* to dist/
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

console.log('Build complete → dist/');
