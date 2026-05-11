# Red Boi Gastrobar — Digital Menu

A fast, mobile-first digital menu for Red Boi Gastrobar. Built with Vite + React, deployed for free on GitHub Pages.

## Stack

- Vite 5 + React 18 (JSX, no TypeScript)
- Plain CSS + inline styles driven by CSS custom properties
- Minimal service worker for offline / weak networks
- No UI libraries, no CSS frameworks

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the built dist/
```

Requires Node 18+.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which:

1. Builds the Vite app
2. Uploads `dist/` as a Pages artifact
3. Deploys it via `actions/deploy-pages`

Site URL: `https://<user>.github.io/red-boi/`

The Vite `base` is set to `/red-boi/` to match the GitHub Pages project path.

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
  sw.js                  Cache-first service worker
  .nojekyll              Tells Pages not to run Jekyll
  404.html               SPA fallback
```
