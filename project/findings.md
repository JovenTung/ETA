# findings.md — Client Discovery Notes

## Client: Elite Tennis Academy
## Date: 2026-06-19

---

## Research Findings

### Business Overview
- Tennis (and pickleball) coaching academy. Programs for juniors (age 3+), adults, competitive players, plus private/semi-private lessons.
- Also runs a pro shop, restringing, ball-machine hire, court hire, corporate events, leagues (UTR), holiday & birthday programs.
- Customers: B2C (families, juniors, adult players) + some B2B (corporate team-building days).
- Located at **East Coburg Tennis Club, 45 Pentridge Blvd, Coburg 3058** — this is **Melbourne, VIC** (NOT Sydney).
- Founder / Operations Manager: **Lynton Joseph**.

### Online Presence
- Current website: https://www.elitetennis.com.au/ (WordPress, by Click Creek)
- Facebook: https://www.facebook.com/EliteTennisAcademy/
- Twitter/X: https://twitter.com/EliteTennisAUS
- Instagram: https://www.instagram.com/elitetennisaus/
- YouTube: https://www.youtube.com/c/aatctennis
- Booking/registration: https://elitetennis.intennis.com.au/secure/customer/registration/v1/public

### Contact
- Phone: 0407 697 941
- Email: play@elitetennis.com.au
- Hours: Monday–Sunday, 6:00 AM – 10:00 PM

### Pricing captured
- Corporate Package A: from $70/person (shirt, court hire, equipment, racquets/balls, matchplay management, lunch, refreshments)
- Corporate Package B: from $105/person (Package A + trophies for finalists)
- All other program pricing: enquiry-only (not published on current site)

### Coaches (12)
Caroline Loh (AATC Professional), Connie Leone (Level 3), Jemma Carbis (AATC Pro L1),
Kahlee Rennes (Junior Development), Liam Todd (AATC Pro L1), Lynton Joseph (Operations Manager),
Matthew Larosa (High Performance & Development), Paul Fitzgerald (Level 2 AATC),
Philip Brown (Level 2 AATC), Robert Gray (AATC Pro L1), Russell Higgins (Level 2 AATC),
Sevvy Gallios (Level 3).

### Problems with the current site (what the redesign must fix)
1. **Clutter** — 24-page mega-menu with deep nested sub-items; homepage stacks 12+ near-duplicate
   card sections (Services, Programs, Why Choose, Highlights, Private Coaching, Memberships,
   Testimonials, Gallery, FAQ) that repeat the same ideas.
2. **Placeholder data leaking to production** — stats show "0+" (Players Trained, Coaching Hours,
   Members). Looks broken/unfinished.
3. **Factual error** — copy says "local Sydney tennis community" but academy is in Melbourne (Coburg).
4. **Empty sections** — Testimonials heading with no testimonials.
5. **Mislabelled section** — "Affordable Memberships" heading sits over corporate-events copy.
6. **No clear primary action / hierarchy** — many CTAs competing (Enroll, Join Now, Book...).
7. **AI-tell copy** — "world-class", "unlock your potential", etc.

### Brand Assets Available
- [x] Logo (logo.png) — light blue "ELITE" (#5893ce), navy "TENNIS" (#18374C), ball + player + arc motif
- [x] Brand colors confirmed: #5893ce (primary blue), #18374C (navy), white base
- [x] Photos: 28 images downloaded to /images (logo, 4 service icons, about, 12 coaches, 10 gallery)
- [x] Service/program list (captured above)
- [ ] Videos: none found on site

### Notes
- Site is .com.au → SEO/schema must use Australia (AU), not GB. Service area = Coburg / Melbourne.
- Booking is handled by external system (intennis.com.au) — keep "Enrol / Book" CTAs pointing there.
</content>
</invoke>
<invoke name="TodoWrite">
<parameter name="todos">[{"content": "Crawl & document the existing Elite Tennis site (content, structure, assets)", "status": "completed", "activeForm": "Crawling & documenting the existing site"}, {"content": "Scrape all images (logo, services, team, gallery) and any videos", "status": "completed", "activeForm": "Scraping images and videos"}, {"content": "Confirm direction decisions (structure, fonts/aesthetic)", "status": "in_progress", "activeForm": "Confirming direction decisions"}, {"content": "Fill project/claude.md with real client data + brand tokens", "status": "pending", "activeForm": "Filling project config with real data"}, {"content": "Present staged redesign plan for approval", "status": "pending", "activeForm": "Presenting staged redesign plan"}, {"content": "Stage 1 — Redesign (HTML/CSS/JS, less clutter, brand colors)", "status": "pending", "activeForm": "Building Stage 1 redesign"}, {"content": "Stage 2 — Mobile optimization + 10x SEO", "status": "pending", "activeForm": "Optimizing mobile and SEO"}]