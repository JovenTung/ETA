# task_plan.md — Build Plan

## Client: [CLIENT NAME]
## Start Date: [DATE]

---

## Phase 1 — Brief (complete before any code)

- [ ] Duplicate TEMPLATE folder, rename to client name, open in Antigrav
- [ ] Fill Discovery Blueprint table in `claude.md`
- [ ] Fill Design Direction table in `claude.md` (all 6 fields — no placeholders)
- [ ] Fill SEO Data table in `claude.md` (all 7 fields)
- [ ] Fill Brand Tokens (CSS variables) in `claude.md`
- [ ] Fill Business Data / Data Schema in `claude.md`
- [ ] Fill `findings.md` — online presence, competitors, brand assets
- [ ] Add client logo → `project/`
- [ ] Add client photos → `images/`
- [ ] Add product/service data → `products/`

---

## Phase 2 — Design Direction (before any code)

- [ ] Run `/frontend-design` — describe client using the filled Design Direction table
- [ ] Confirm aesthetic direction is correct before proceeding

---

## Phase 3 — Build

### HTML
- [ ] Build `index.html` following Site Architecture in `claude.md`
- [ ] `<html lang="en">` set
- [ ] Full SEO `<head>` block — title, meta description, canonical, robots, Open Graph, Twitter Card
- [ ] `font-display: swap` on Google Fonts `<link>`
- [ ] Semantic landmarks — `<main>`, `<nav>`, `<footer>`, `<section>`, `<article>`
- [ ] One `<h1>` only — contains primary keyword naturally
- [ ] Heading hierarchy correct — h1 → h2 → h3, no levels skipped
- [ ] `loading="lazy"` on all below-fold images — NOT on hero image
- [ ] Alt text on every image
- [ ] LocalBusiness JSON-LD block just before `</body>`

### CSS
- [ ] Build `styles.css` — mobile-first, base styles target 375px
- [ ] `overflow-x: hidden` on both `html` and `body`
- [ ] All colours via CSS variables — no hardcoded hex in components
- [ ] Input/textarea `font-size: 1rem` minimum
- [ ] All touch targets minimum 44×44px
- [ ] Breakpoints implemented: 375 / 768 / 1024 / 1440px
- [ ] All multi-column layouts collapse to single column at ≤767px
- [ ] Desktop decorative elements hidden on mobile
- [ ] Hero headline uses `clamp()` with mobile-safe minimum — no overflow at 375px
- [ ] No `padding-left` offsets on headlines at mobile

### Motion
- [ ] Run `/gsap` — scroll animations and timelines
- [ ] Run `/animejs` — micro-interactions and counters (run last)

### JS
- [ ] Build `script.js` — nav scroll state, mobile toggle, IntersectionObserver, form handling

### SEO Files
- [ ] Create `robots.txt`
- [ ] Create `sitemap.xml` with correct live URL and today's date

---

## Phase 4 — QA

### 375px (mobile)
- [ ] No horizontal scroll
- [ ] Nav hamburger opens and closes correctly
- [ ] Hero headline fits without overflow
- [ ] All sections single column
- [ ] Inputs and buttons tappable (44px minimum)
- [ ] Decorative elements hidden

### 768px (tablet)
- [ ] Two-column layouts activate correctly
- [ ] Nav links visible, hamburger hidden
- [ ] Spacing and images feel balanced

### 1024px (desktop)
- [ ] Full layout correct
- [ ] Desktop-only elements visible

### 1440px (wide desktop)
- [ ] Nothing breaks or stretches excessively

### SEO Head Check
- [ ] `<title>` filled with real client data — no placeholders
- [ ] Meta description is 150–160 characters
- [ ] All Open Graph tags filled
- [ ] Canonical URL correct
- [ ] JSON-LD contains real name, address, phone, hours
- [ ] `robots.txt` references correct sitemap URL
- [ ] `sitemap.xml` contains correct live URL and today's date

---

## Phase 5 — Delivery (done by you, not Claude)

- [ ] Upload to Plesk via File Manager or FTP
  - `index.html`
  - `styles.css`
  - `script.js`
  - `robots.txt`
  - `sitemap.xml`
  - `images/` folder
- [ ] Verify live URL loads correctly on mobile and desktop
- [ ] Run post-launch SEO check (optional but recommended)
  - `/seo local <url>`
  - `/seo technical <url>`
  - `/seo page <url>`
- [ ] Client handoff — set expectations on Google visibility timeline

---

## Blockers

- [List any blockers here]
