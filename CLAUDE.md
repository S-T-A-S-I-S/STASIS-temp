# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**S.T.A.S.I.S.** is a personal brand/portfolio site for esports infrastructure and production. It is a pure static HTML site — no build system, no package manager, no framework.

**To run locally:** Open any `.html` file directly in a browser, or serve with:
```bash
python -m http.server 8000
```

## Stack

- Pure HTML5 with inline `<style>` blocks (no external stylesheet currently)
- Vanilla JavaScript (client-side portfolio filtering only)
- Google Fonts: Teko (weights 300–700)
- CDN icons: `cdn.simpleicons.org` for social media
- No backend — contact form redirects to `thankyou.html` only

## Design System (CSS Variables)

All pages share this token set (currently duplicated per-page in each `<style>` block):

```css
:root {
  --primary: #60a5fa;
  --accent: #3b82f6;
  --highlight: #93c5fd;
  --text: #d1d5db;
  --muted: #9ca3af;
  --panel: #1f2937;
  --panel2: #111827;
  --border: #3b82f6;
  --bg1: #000000;
  --bg2: #1a1a1a;
  --shadow: 0 0 20px rgba(96,165,250,.35);
}
```

Font: Teko, sans-serif — used at multiple weights for headings and UI.

## Site Structure

| File | Role |
|------|------|
| `index.html` | Landing page: hero, 4 capability cards, 2 featured works, regional expansion CTA |
| `selected-work.html` | Filterable portfolio grid (5 items, client-side JS filtering) |
| `archives.html` | Full work history with search/sort/filter |
| `regional-expansion.html` | Long-form vision page for Midwest + Central America expansion |
| `contact.html` | Lead capture form (no backend) |
| `thankyou.html` | Post-form confirmation |
| `branding-guide.html` | Password-protected internal style guide (password: `stasis2025`) |
| `Logo.png` | Primary brand logo asset |

Nav order: Home → Archives → Selected Work → Regional Expansion → Contact

## Known Duplication Issues

- The `<style>` block (CSS variables + base styles) is copy-pasted into every HTML file.
- The `<header>` / `<nav>` and `<footer>` are manually repeated in every file.
- Work items in `selected-work.html` are hardcoded in a JS `const` array — not driven from a data file.
- Any design change currently requires editing all 7+ HTML files.

## Key Renovation Opportunities

1. Extract shared CSS to `style.css` and link it in all pages
2. Move shared nav/footer into reusable includes (or adopt a static site generator like Astro or 11ty)
3. Move work data to `works.json` and generate portfolio pages from it
4. Wire up contact form to a real backend (Formspree, Netlify Forms, etc.)
5. Add `robots.txt`, `sitemap.xml`, and proper `<meta og:>` tags

## Brand Voice

Minimal, confident, infrastructure-first. Avoids hype language. The audience is esports program directors, athletic departments, and collegiate administrators — not gamers.
