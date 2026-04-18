# FastNet

Landing site for FastNet — resilient 5G internet for homes and businesses.

Single-page React prototype with multi-page navigation, animated hero variants, interactive failover diagram, availability checker, multi-step checkout, consultation scheduler, and a live dashboard preview.

## Stack

- React 18 (UMD, served from CDN)
- JSX bundled and minified with esbuild
- Static output, deployable to any CDN

## Develop

```bash
npm install
npm run dev
```

Opens on `http://localhost:5173`.

## Build

```bash
npm run build
```

Outputs `dist/` (single `index.html` + `bundle.js`). Drop into any static host.

## Deploy (Vercel)

`vercel.json` is preconfigured. Push to a Git repo and import it into Vercel — build runs automatically.

## Layout

```
src/
  app.jsx           root + router
  primitives.jsx    Logo, Arrow, Reveal, Ticker, …
  nav.jsx           top nav
  hero.jsx          3 hero variants (editorial / product / signal)
  sections.jsx      home page sections
  howitworks.jsx    /how
  usecases.jsx      /usecases
  pricing.jsx       /pricing
  checkout.jsx      /checkout (5-step flow)
  availability.jsx  /availability (ZIP lookup)
  consultation.jsx  /consultation (calendar booking)
  dashboard.jsx     /dashboard (live preview)
  tweaks.jsx        floating tweaks panel
build.mjs           esbuild + HTML rewrite
serve.mjs           tiny static dev server
```

## Tweaks panel

Bottom-right toggle. Swap hero variant, accent color, display typeface, pricing layout. Defaults persist via `TWEAK_DEFAULTS` in `src/app.jsx`.
