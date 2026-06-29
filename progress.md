# progress.md — Session Log

## Client: Elite Tennis Academy

---

## Session 1 — 2026-06-19

### Discovery
- Crawled live site https://www.elitetennis.com.au (WordPress, 24 pages, very cluttered).
- Documented all content, programs, pricing, coaches, contact in `findings.md`.
- Scraped 28 assets (logo, 4 service icons, about, 12 coach photos, 10 gallery) into `images/` and `project/images/`.
- Confirmed direction with client: few-page site + clean-athletic aesthetic (Syne + Plus Jakarta Sans).

### Stage 1 — Redesign (DONE)
- New design system in `styles.css` (brand tokens #5893CE / #18374C on white, motion tokens, components).
- 5 lean pages built: `index.html`, `programs.html`, `about.html`, `services.html`, `contact.html` (shared nav/footer).
- Decluttered: 24 pages → 5; removed "0+" placeholder stats, "Sydney" error (it's Melbourne), empty testimonials, mislabelled "Memberships" block, AI-tell copy. No em/en dashes in client copy.
- Motion in `script.js`: scroll reveals (IntersectionObserver + stagger), animated stat counters, hover-lift, FAQ accordion, GSAP loaded for hero. Respects prefers-reduced-motion.

### Stage 2 — Mobile optimization (DONE)
- Mobile-first CSS, breakpoints 375/768/1024/1440 + fluid clamp().
- Verified via Chrome DevTools Protocol device emulation at 375px on all 5 pages: scrollWidth == innerWidth (NO horizontal overflow).
- Hamburger drawer, 44px+ touch targets, 16px inputs, single-column collapse, chat FAB collapses to icon under 480px.

### Stage 3 — SEO (DONE)
- Per-page title/description/canonical/robots/OG/Twitter (AU locale).
- `SportsActivityLocation` JSON-LD with correct AU address, phone (+61), 7-day hours, socials.
- `robots.txt` + `sitemap.xml` (5 URLs, dated 2026-06-19). og-image.jpg created.
- Semantic landmarks, one H1/page, alt text on all images, lazy-loading below fold.

### Stage 4 — Rule-based chatbot (DONE)
- Vanilla JS assistant in `script.js`. Knowledge base covers programs, prices, corporate, hours, location, contact, coaches, pro shop, restringing, ball machine, court hire, vouchers, beginners, child safety, about.
- Guided booking flow: program → name → email (validated) → phone → preferred time → summary + handoff (opens intennis booking link + prefilled mailto to play@elitetennis.com.au).
- Verified end-to-end via CDP: greeting, Q&A ($105 corporate), full booking flow, handoff links present with prefilled program.

### Notes / Constraints
- Static hosting (Plesk, no backend): chatbot "scheduling" = structured capture + handoff to existing booking system + email. True calendar-writing would need a backend the stack forbids.
- Booking/registration intentionally links out to existing intennis.com.au system.
- Local preview verified with headless Brave (Chromium); deploy = upload contents of `project/` (incl. `images/`) to web root.

### Errors / Notes
- Headless Brave enforces ~500px min layout for `--screenshot`; used CDP `Emulation.setDeviceMetricsOverride` for true 375 verification.

---

<!-- Add new sessions below as work progresses -->

## Session 2 — 2026-06-24 — Client revision round 1

Client sent feedback PDF ("Elite Tennis Webiste ideas.pdf", 21 pages, mostly annotated
screenshots of our build). Reviewed it, sent a response doc (`client-response.html`), got
the client's decisions back by phone, then implemented all changes that do not need assets.

### Shared (all 6 pages)
- Nav: added **About dropdown** (Our story / coaches / venues / child safety) on desktop +
  mobile drawer accordion. JS updated to handle multiple dropdowns + drawer toggles.
- Nav **Call button**: hover reveals the phone number (`.btn-call`), tap-to-call on mobile.
- Removed the **Twitter/X** social link from the footer + from JSON-LD `sameAs` (kept the
  `twitter:` SEO share-card meta tags, which are standard).
- Footer: split "Birthday & holiday" into **Birthday parties** + **Holiday programs** lines;
  "East Coburg Tennis Club" set `nowrap`; added **Terms & conditions** link
  (https://www.elitetennis.com.au/terms-conditions/) alongside FAQs.
- Added **Acknowledgement of Country + inclusion statement** band below the footer, with
  CSS-drawn Aboriginal / Torres Strait Islander / Progress Pride flags (placeholders; can be
  swapped for official flag images).
- **Welcome announcement popup** (JS-injected, once per session, placeholder image
  `images/gallery-7.jpg`): Free Trial Junior + Adult Social Cardio → contact.
- Bumped cache-busting to `?v=4`.

### Programs
- Renamed **Toddler → Pre School** tennis (also in chatbot KB + index pillar + contact FAQ).
- Junior: added **Hot Shots group classes $20/session** line + **Book a free trial** button
  (→ contact). New **Hot Shots section** (#hotshots) with Red/Orange/Green/Blue stages,
  "Join the Crew" free t-shirt block, placeholder image + video-coming note.
- Adult: added **Social Cardio FAQ** accordion (who for / skill / $20 cost / what to bring).
- Private/Semi: replaced single-price table with **Casual / 5-pack / 10-pack** pricing for
  both (per client's guidance: one-off lifted, 10-pack ≈ current price). Added "can't find a
  time, enquire" note + pack validity/GST note. **Numbers for 45/30 min + semi are derived
  from his guidance — confirm before setting up in inTennis.**
- Pickleball → **Enquire now** only (booking link removed).
- Birthday Option A/B → **Enquire** (contact). School holiday "Book" → **Enquire now**.

### Events
- Added **A Taste of Tennis** card + **Become a coach** card (→ www.aatc.tennis).
- Reordered by client priority (School holiday, Taste of Tennis, Get married, Community,
  Tours, Christmas, Open day, Become a coach). School holiday → Enquire.

### Services
- New **restringing price list** (#restringing-prices) from the client's string menu; note
  "you only pay when you come in." Card now links to the menu.
- Added **Get in touch** links to pro shop / ball machine / court hire / vouchers cards.
- UTR leagues card → **Register now** (external booking link).

### Held — pending assets or decisions
- Photos: client to supply real images later (placeholders in use for popup + Hot Shots).
- Hot Shots video: needs file or YouTube link.
- Junior Group Classes / Adult Cardio dedicated media: awaiting photos/videos zip.
- Final private/semi pricing numbers: confirm, then set up packs in inTennis.
- Pro shop full product catalogue: no e-commerce on static stack (enquire/catalogue only).

## Session 3 — 2026-06-25

- **Coaches roster updated.** Client sent 12 new "Meet the Coach" poster graphics (old roster
  removed). Copied to `project/images/meet-<name>.jpeg`. New roster: Lynton, Vinay, Caroline,
  Hugh, Kevin, Buckley, Paul, Cara, Shan, Alexia, Keith, Daniel. Replaced the old headshot
  cards with full-poster cards (`.coach-poster`): about.html = responsive grid (click to
  enlarge), index.html = auto-scroll carousel of posters. Old headshot files left unused.
- **Fixed testimonials scroll trap.** "Our community speaks" was a horizontal `overflow-x`
  scroller that captured the mouse wheel on desktop and blocked page scroll. Now wraps into a
  2/3-col grid at ≥768px (phones keep the swipe carousel).
- **New Terms & Conditions page** (`terms.html`), content scraped from the live site
  (missed lessons, make-ups, wet weather, payments, refunds, disclaimer, governing law).
  Footer "Terms & conditions" link now points to `terms.html` (was external). Added
  events.html + terms.html to sitemap.xml. Cache bumped to `?v=5`.
