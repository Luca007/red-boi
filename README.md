# Red Boi Gastrobar — Digital Menu

A fast, mobile-first digital menu for Red Boi Gastrobar. Built with Vite + React, deployed for free on GitHub Pages.

## Stack

- Vite 5 + React 18 (JSX, no TypeScript)
- Plain CSS + inline styles driven by CSS custom properties
- Minimal service worker for offline / weak networks
- No UI libraries, no CSS frameworks

## Open it locally

> **Heads up:** opening `index.html` from the repo root with Live Server / a plain static server **will not work**. The browser cannot execute `.jsx` directly — only Vite (in `dev` mode) or the built `dist/` (after `npm run build`) can be served.

Use one of these three options:

```bash
# 1. Vite dev server with HMR (recommended for editing)
npm install
npm run dev
# → http://localhost:5173/

# 2. Build + preview the production output
npm run build
npm run preview
# → http://localhost:4173/

# 3. Live Server (or any static server) on the built dist/
npm run build
# then "Open with Live Server" inside the dist/ folder, NOT the repo root
```

Requires Node 18+.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:

1. Builds the Vite app
2. Uploads `dist/` as a Pages artifact
3. Deploys it via `actions/deploy-pages`

Site URL: `https://<user>.github.io/red-boi/`

`base` is set to `./` so the same build works on GitHub Pages (`/red-boi/` subpath) and on any other static host or local preview without rebuilding.

## AI & search accessibility

- `public/robots.txt` — allows all crawlers, points to the sitemap
- `public/sitemap.xml` — single canonical URL
- `public/llms.txt` — full menu in Markdown ([llmstxt.org](https://llmstxt.org)) so LLMs can read prices and descriptions without executing JavaScript

## Structure

```
src/
  main.jsx               ReactDOM bootstrap, SW registration
  App.jsx                Top-level layout
  data/menu.js           SECTIONS — full menu data
  data/constants.js      RED, RED_DK, GOLD, COMPACT_IDS, fmt()
  theme/themes.js        Dark + light CSS variable tokens
  hooks/useTheme.js      dark / light / system cycle
  hooks/useActiveSection.js  Scroll spy + nav auto-center
  components/            Header, NavPills, Section, FullCard,
                         CompactRow, Badge, SuggestionForm, Footer
  styles/global.css      Keyframes, .pill, .theme-btn, scrollbar, reset

public/
  logo.png               App icon + header/footer logo
  manifest.webmanifest   PWA manifest
  sw.js                  Cache-first service worker (offline app-shell)
  robots.txt             Crawler policy
  sitemap.xml            Sitemap
  llms.txt               Full menu in Markdown for LLMs
  .nojekyll              Tells Pages not to run Jekyll
  404.html               SPA fallback
```
