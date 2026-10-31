# Daksh Arora: portfolio

Static site (plain HTML, CSS and a few lines of JS). No build step, no framework.

## Run locally
    python3 -m http.server 8765    # then open http://localhost:8765

Use a local server rather than opening the file directly, because asset paths start with `/`.

## Deploy on Vercel
1. Import this GitHub repo in Vercel (New Project).
2. Framework preset: **Other**. Build command: none. Output directory: `.` (repo root).
3. `vercel.json` sets clean URLs, security headers and long caching for `/images`.
4. Add a domain, then fill the TODO(domain) items: canonical link in `index.html`,
   the `Sitemap:` line in `robots.txt`, and an absolute `og:image` URL.

## Before publishing
Search the code for `TODO` and fill every placeholder. The yellow TODO boxes show on the page on purpose.
