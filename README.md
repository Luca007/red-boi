# Red Boi Gastrobar — Cardápio Digital

Static digital menu for Red Boi Gastrobar. Pure HTML + CSS + ES Modules. No build, no `npm install`, no framework.

## Live preview

Production: https://luca007.github.io/red-boi/

## Run locally

Open `index.html` through any static server (browser security blocks ES modules over `file://`):

```bash
# Python (preinstalled almost everywhere)
python3 -m http.server 4173

# or with VS Code: right-click index.html → "Open with Live Server"
```

Then visit http://localhost:4173.

There is **nothing to install**. No `package.json`, no bundler. The browser loads the modules natively.

## Editing the menu

All items live in `js/menu-data.js`. Each section has `id`, `label`, `icon`, `sub`, and an `items` array.

- Add a price/badge/description by editing the item entry.
- Add a whole section by appending a `{ id, label, icon, sub, items }` block.
- If the new section should render as a one-line compact list (like *Cervejas*, *Doses*), add its `id` to `COMPACT_IDS` in the same file. Otherwise it renders as a full card.

## Editing styles

CSS is split by concern under `css/`:

- `reset.css` — minimal browser reset.
- `tokens.css` — 40 CSS custom properties per theme, in `:root[data-theme="dark"|"light"]`.
- `layout.css` — `.app`, `.header`, `.nav-strip`, `.section`, `.footer`, spinner.
- `components.css` — `.card`, `.compact-row`, `.badge*`, `.pill`, `.suggestion-form`, chips, variants.
- `animations.css` — keyframes + `prefers-reduced-motion` overrides.

To tweak the palette, change values in `tokens.css`. Never set colors inline in JS.

## Project structure

```
index.html              entry, includes critical CSS + anti-FOUC theme script
css/                    5 stylesheets loaded in parallel
js/
  main.js               orchestrator
  menu-data.js          SECTIONS, COMPACT_IDS, formatPrice
  constants.js          timing constants, color literals
  dom.js                el(), clearChildren(), on()
  components/           pure render functions returning HTMLElement
  features/             theme.js, scroll-spy.js, sw-register.js
logo.png                ~56 KB, optimised
manifest.webmanifest    PWA manifest
sw.js                   cache-first service worker (VERSION = redboi-v3)
404.html                GitHub Pages fallback → redirects to `/`
robots.txt, sitemap.xml, llms.txt   SEO + AI crawlability
```

## Deploy (GitHub Pages)

1. Settings → Pages.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder `/ (root)`.
4. Save. First deploy takes 1–2 minutes.

No GitHub Actions workflow needed — Pages serves the repo root directly.

## AI accessibility

`llms.txt` summarises the menu in a structured form for AI assistants. `robots.txt` and `sitemap.xml` allow crawler indexing.
