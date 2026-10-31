# Daksh Arora: portfolio

Dark "Builder grid" portfolio. Vite + React + TypeScript, built to a static `dist/` folder.

## Run locally
    npm ci
    npm run dev        # http://localhost:5173
    npm run build      # type-check + production build into dist/
    npm run preview    # serve dist/ at http://localhost:4173

## Edit the copy
All text lives in `src/content.ts`. Anything that starts with `TODO` or `[Result` shows on the page as a placeholder on purpose.
Replace those with real facts only; never invent numbers.

## Structure
- `src/components/`: Nav, Hero, StackStrip, Work (case flows), Experience (log table), Skills, About, Contact + Terminal, CommandPalette, Footer
- `src/hooks/motion.ts`: reveal-on-scroll, text scramble, magnetic buttons, reduced-motion and pointer checks
- `public/`: headshot, OG image, favicon, `robots.txt`, `404.html`

Interactions: cursor spotlight on the grid, scramble labels, scroll reveals, step-by-step case flows (hover a node, "Show details"),
stack-hover highlights, expandable experience rows, a working terminal in Contact (`help`), and a ⌘K / Ctrl+K command palette.
With "reduce motion" switched on in the OS, all motion is off. Cursor effects are off on touch devices.

## Deploy on Vercel (not done yet)
1. In Vercel, New Project → import `daksh103/my_portfolio`.
2. Framework preset **Vite**. Build command `npm run build`. Output directory `dist`. (`vercel.json` sets the same, plus security headers and caching.)
3. After a domain is attached, fill the `TODO(domain)` items: canonical link and absolute `og:image` / `og:url` in `index.html`, and the `Sitemap:` line in `public/robots.txt`.

## Before publishing
Search for `TODO` and fill every placeholder.
