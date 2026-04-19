/* eslint-env node, browser */
// Prerender SPA routes to static HTML for SEO + scraper unfurls
import { createServer } from 'node:http';
import { readFile, stat, writeFile, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

// On Vercel (Linux build sandbox) the system has no Chrome libs.
// Use puppeteer-core + @sparticuz/chromium which ships its own bundled binary.
// Locally (Windows/Mac) use full puppeteer with its bundled Chromium.
const isLinuxBuildEnv = process.platform === 'linux';

let puppeteer, launchOpts;
if (isLinuxBuildEnv) {
  const chromium = (await import('@sparticuz/chromium')).default;
  puppeteer = (await import('puppeteer-core')).default;
  launchOpts = {
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  };
} else {
  puppeteer = (await import('puppeteer')).default;
  launchOpts = { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] };
}

const dist = join(process.cwd(), 'dist');

const ROUTES = [
  '/',
  '/about',
  '/how-it-works',
  '/use-cases',
  '/pricing',
  '/availability',
  '/consultation',
  '/dashboard',
  '/checkout',
];

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain; charset=utf-8',
};

// Static server with SPA fallback
const server = createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let path = normalize(join(dist, url === '/' ? 'index.html' : url));
    if (!path.startsWith(dist)) { res.writeHead(403).end(); return; }
    try {
      const s = await stat(path);
      if (s.isDirectory()) path = join(path, 'index.html');
    } catch {
      path = join(dist, 'index.html');
    }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch (e) {
    res.writeHead(500).end(String(e));
  }
});

await new Promise(r => server.listen(0, r));
const port = server.address().port;
console.log(`→ static server :${port}`);

const browser = await puppeteer.launch(launchOpts);

for (const route of ROUTES) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  await page.goto(`http://localhost:${port}${route}`, {
    waitUntil: 'networkidle0',
    timeout: 30_000,
  });

  // Force all Reveal animations to "in" state so SSG content isn't opacity:0
  // and trigger any deferred renders (Tickers, etc.)
  await page.evaluate(async () => {
    document.querySelectorAll('.reveal').forEach(r => r.classList.add('in'));
    // Scroll once to fire any IntersectionObserver-bound effects
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(r => setTimeout(r, 300));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 200));
  });

  // Strip dev-only / runtime-only nodes that shouldn't ship in static HTML
  await page.evaluate(() => {
    document.querySelectorAll('canvas').forEach(c => c.remove());
  });

  const html = await page.content();

  const outPath = route === '/' ? join(dist, 'index.html') : join(dist, route, 'index.html');
  await mkdir(join(outPath, '..'), { recursive: true });
  await writeFile(outPath, html);
  console.log(`  ✓ ${route.padEnd(20)} → ${outPath.replace(dist, 'dist')}`);

  await page.close();
}

await browser.close();
server.close();
console.log('Prerender complete');
