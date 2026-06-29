# claude.md — Project Constitution

## Project: Elite Tennis Academy Website (Redesign)

---

## Discovery Blueprint

| Discovery | Answer |
|-----------|--------|
| North Star | Drive program enquiries & bookings (junior, adult, private). Reduce clutter, look professional. |
| Integrations | Contact form (mailto/handoff), Google Maps embed, external booking (intennis.com.au), rule-based chatbot |
| Source of Truth | `project/findings.md` (scraped from live site) |
| Deployment | Plesk/Exabyte — direct file upload |
| Style Reference | Premium sporting-club / academy sites; clean athletic |

## Design Direction

| Decision | Answer |
|----------|--------|
| Aesthetic Tone | Clean athletic / airy — bright white, generous whitespace, confident navy, blue accents |
| Layout Personality | Editorial sections (no repeated card-soup): asymmetric hero, programs as 4 clear pillars, numbered "why us", coach grid |
| Signature Detail | Tennis-ball arc motif (from logo) used as section accent + animated stat counters + hover-lift program cards |
| Heading Font | Syne |
| Body Font | Plus Jakarta Sans |
| Palette Mood | Cool court blues on white — light sky blue + deep navy, lots of breathing room |

---

## Brand Tokens

```css
--color-primary:         #5893CE;   /* Elite blue (logo "ELITE") */
--color-primary-hover:   #4179B4;   /* darker blue for hover */
--color-secondary:       #18374C;   /* Navy (logo "TENNIS") */
--color-accent:          #5893CE;   /* same blue, used for highlights */
--color-bg:              #FFFFFF;    /* main background */
--color-bg-alt:          #F4F8FC;   /* very light blue-tinted section alt */
--color-text:            #18374C;   /* navy text */
--color-text-muted:      #5A6B78;   /* muted slate */
--color-white:           #FFFFFF;
--color-border:          #E2EAF2;

--font-heading:   'Syne', 'Plus Jakarta Sans', sans-serif;
--font-body:      'Plus Jakarta Sans', system-ui, sans-serif;

--radius-card:    16px;
--radius-btn:     8px;
--shadow-card:    0 4px 24px rgba(24,55,76,0.07);
--shadow-card-hover: 0 14px 40px rgba(24,55,76,0.14);
```

---

## Data Schema

### Business Entity
```json
{
  "name": "Elite Tennis Academy",
  "tagline": "Your Path to Greatness",
  "address": "East Coburg Tennis Club, 45 Pentridge Blvd, Coburg VIC 3058",
  "phone": "0407 697 941",
  "email": "play@elitetennis.com.au",
  "venues": [
    "East Coburg Tennis Club, 45 Pentridge Blvd, Coburg VIC 3058 (sole venue; Tullamarine retired June 2026)"
  ],
  "hours": { "all": "Monday–Sunday, 6:00 AM – 10:00 PM" },
  "socials": {
    "facebook": "https://www.facebook.com/EliteTennisAcademy/",
    "instagram": "https://www.instagram.com/elitetennisaus/",
    "twitter": "https://twitter.com/EliteTennisAUS",
    "youtube": "https://www.youtube.com/c/aatctennis"
  },
  "booking": "https://elitetennis.intennis.com.au/secure/customer/registration/v1/public",
  "focus": "B2C (juniors, adults, families) + some B2B (corporate)"
}
```

### Services / Programs
- **Junior**: Toddler & Junior Tennis (3+), Junior group classes, Group & Squad training, Competition pathways, Holiday programs, Birthday programs
- **Adult**: Adult coaching (beginner→advanced), Social Cardio Tennis, In-House UTR Leagues
- **Private**: Private 1:1, Semi-private (2–3)
- **Pickleball**: Social play, Leagues & competitions, Coaching
- **Pro Shop & Services**: Pro shop (rackets/apparel/shoes), Restringing, Ball-machine hire, Court & equipment hire, Vouchers
- **Corporate/Events**: Corporate days (Pkg A from $70pp, Pkg B from $105pp), Leagues, Workshops, Community days
- **Events**: In-House UTR Leagues (Mon/Wed divisions), Christmas party, School holiday program, Overseas & Regional tours, Annual open day, Get Married by the Coach, Community & networking, Doubles workshop

### Pricing (PUBLISHED — confirmed from live site, GST noted where applicable)
| Service | Price |
|---------|-------|
| Private 1:1 | 60min $82.50 · 45min $62.00 · 30min $42.50 (GST incl) |
| Semi-private (2+) | 60min $85.00 · 45min $68.00 · 30min $52.00 (GST incl, split between players) |
| Adult Social Cardio | $20.00 per 45-min session (booked online in advance) |
| Ball machine hire | $50 + GST / hour · $75 + GST / 2 hours (balls + tube included) |
| Restringing | $40–$60 (string-dependent), free regrip, 24–48hr turnaround |
| Birthday party | Option A $600 (all included, up to 20 kids) · Option B $400 (up to 20, +$15/extra child) |
| Vouchers | $20 / $50 / $100 / $200 (valid 12 months) |
| A Taste of Tennis | $15/hr daylight · $25/hr under lights (court, balls, equipment incl) |
| Corporate | Package A from $70pp · Package B from $105pp |

---

## Architectural Invariants
- Mobile-first, responsive at 375 / 768 / 1024 / 1440px + fluid clamp() between
- No horizontal scroll on any viewport
- Accessible: contrast ≥ 4.5:1, alt text on all images, keyboard nav
- Fast-loading: font-display: swap, lazy loading below the fold
- Tone: warm, confident, professional — local Melbourne club, NOT corporate jargon
- Logo: `/images/logo.png`
- Pages share one `styles.css` + one `script.js`

## Site Architecture (6 pages)
1. **index.html** — Home: hero, trust strip (real stats), program pillars, highlights video, why us, coach preview, gallery, testimonials, corporate CTA, contact preview
2. **programs.html** — Coaching programs (junior + squad tiers / adult + cardio / private + semi w/ prices / pickleball / birthday & holiday)
3. **events.html** — In-house UTR leagues (divisions + register), workshops, community & networking, tours, Get Married by the Coach, Christmas, open day, yearly planner
4. **about.html** — Who we are, mission/vision, values, full coach team (12), venues (East Coburg + Tullamarine), child safety, community initiatives, policies
5. **services.html** — Pro shop, restringing, ball-machine hire, court hire, vouchers, Experience Tennis, corporate (all with published prices)
6. **contact.html** — Contact form, hours, both venue maps, FAQ + policies

## SEO Data

| Field | Value |
|-------|-------|
| Page Title (home) | Elite Tennis Academy — Tennis Coaching in Coburg, Melbourne |
| Meta Description | Tennis coaching for juniors, adults & competitive players at East Coburg Tennis Club. Group classes, private lessons, pickleball, leagues & pro shop in Coburg, Melbourne. |
| Primary Keyword | tennis coaching Coburg / tennis lessons Melbourne |
| Service Area | Coburg, Melbourne VIC |
| Business Type | SportsActivityLocation |
| OG Image | `/images/og-image.jpg` (1200×630) |
| Canonical URL | https://www.elitetennis.com.au |

## Behavioral Rules
- Tone: warm, specific, professional. Australian spelling (enrol, programme→program, organise).
- Do Not: say "Sydney" (it's Melbourne); show "0+" placeholder stats; use em dashes in copy; use "world-class/unlock/seamless"; leave empty testimonial sections.
- Pricing: PUBLISH real prices (see Pricing table above). Show figures for fixed-rate services; coaching programs may still link to booking for class times.

## Tech Stack
- Pure HTML5 / CSS3 / Vanilla JS
- Google Fonts: Syne + Plus Jakarta Sans (font-display: swap)
- GSAP 3.14.2 + ScrollTrigger (CDN)
- Anime.js 4.3.6 (CDN)
- Lucide Icons (CDN)
- Google Maps embed (iframe, no API key)
- Rule-based chatbot (vanilla JS, knowledge base + guided booking handoff)
- Deployment: Plesk/Exabyte (direct upload)

---

*This file is Law. Update only when schema, rules, or architecture change.*
</content>
