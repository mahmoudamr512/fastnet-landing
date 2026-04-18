import { transformSync } from 'esbuild';
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ORDER = [
  'primitives', 'nav', 'hero', 'sections', 'howitworks', 'usecases',
  'pricing', 'checkout', 'availability', 'consultation', 'dashboard',
  'tweaks', 'app',
];

const root = process.cwd();
const dist = join(root, 'dist');

if (existsSync(dist)) rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

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
  loader: 'js',
  minify: true,
  target: 'es2019',
});

writeFileSync(join(dist, 'bundle.js'), minified.code);

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

console.log('Build complete → dist/');
