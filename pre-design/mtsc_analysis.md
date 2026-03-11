# MTSC (Mission to Seafarers Canada) — Redesign Analysis

**URL:** https://mtsc.ca/  
**Date:** March 2026  
**Analyst:** CloudGenZ Design Agency

---

## 1. Brand Identity

### Organization
**Mission to Seafarers Canada (MTSC)** is a nonprofit serving seafarers — maritime workers who spend months at sea — providing practical, emotional, and spiritual support at Canadian ports. Part of a global 160+ year legacy.

### Mission Statement
*"To serve seafarers with compassion, friendship, and vital support throughout Canada."*

### Core Brand Values
- Compassion & Humanity
- Community & Connection
- Faith & Spirituality
- Practical Action
- Canadian Identity

---

## 2. Color Palette (EXACT)

| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue (Primary) | `#2d3580` / `#1e3270` | Header, footer, nav text, section headings |
| Coral / Orange-Red (Accent) | `#e05a2b` / `#d95a27` | CTAs, accent headings, donate buttons, section titles |
| Light Gray (Background) | `#f0f0f0` / `#e8e9ea` | Section backgrounds |
| White | `#ffffff` | Card backgrounds, text on dark |
| Periwinkle / Mid-Blue | `#7b8cce` / `#9ea8d8` | Soft accents, service icons |
| Teal | `#2db5b5` | Illustration/map accents |
| Dark Navy (Footer) | `#1c2e6b` / `#1a2660` | Footer background |

---

## 3. Typography

- **Headings:** Bold sans-serif (appears to be a custom/Google Font — close to Nunito or Raleway Bold)
- **Body:** Clean sans-serif, medium weight
- **CTAs:** Uppercase, bold, rounded buttons
- **Style:** Approachable, friendly — not rigid corporate

---

## 4. Existing Homepage Sections

1. **Top Bar** — Org name + Social icons (LinkedIn, YouTube, Instagram, Facebook, TikTok) + Prayer Wall + DONATE button (navy pill)
2. **Navigation** — Logo (circular seal) + dropdown nav (For Seafarers, Get Involved, Who We Are, Contact) + search
3. **Hero** — Full-bleed seafarer photo, large headline "A Global Lifeline with Local Heart", DONATE CTA (coral)
4. **Mission Teaser** — "Caring for seafarers, the unsung heroes of global trade"
5. **Stats Row** — 90% stat (photo) | 7,104 Operating Ships | 181,440 Seafarers Worldwide | 15+ Years Supporting Seafarers
6. **Dual CTA** — "I am a Seafarer" + "I am a Volunteer" split cards with photos
7. **How We Support** — Full-bleed port photo, 5 service circles (Practical, Mental, Spiritual, Advocacy, Community)
8. **Service Detail Cards** — Practical Support, Mental & Emotional Health, Spiritual Care, Advocacy & Rights, Community Connection
9. **Supporters Carousel** — Partner logos (NAMMA, Prince Rupert, Helm, Ontario Shipyards, TK, Ports Toronto, etc.)
10. **Video Section** — "Learn About The Mission to Seafarers Canada" + YouTube embed
11. **Ways to Get Involved** — Coral background, 5 circle icons (Give Now, View Events, Apply to Volunteer, Subscribe, Explore Campaigns)
12. **Find a Station** — Canada illustrated map, CTA "Find a Station"
13. **Join Our Community** — 5 cards (Find a Station, Prayer Wall, Get 24/7 Help, Newsletter, Host an Event)
14. **Footer** — Logo, nav links, social icons, mission statement

---

## 5. Icons Used (from site)

- **Hands (wavy lines)** — Practical Support
- **Head with gear** — Mental & Emotional Health
- **Praying hands** — Spiritual Care
- **Pillars / columns** — Advocacy & Rights
- **Two people side by side** — Community Connection
- **Ship with anchor** — Find a Station
- **Calendar with X** — View Events / Host an Event
- **Dollar coin jar** — Give Now / Donate
- **Eye** — Explore Campaigns
- **Hand raised** — Apply to Volunteer
- **Checkmark** — Subscribe to Newsletter
- **Seagull** — Brand mascot/motif
- **Anchor** — Maritime identity
- **Canadian flag** — National identity

---

## 6. Current Design Issues

1. **Hero lacks visual hierarchy** — CTA is small relative to image size
2. **Statistics section feels disconnected** — mismatched column widths
3. **Service circles on photo background** are hard to read (low contrast)
4. **Card section is plain** — no visual depth or animation
5. **Ways to Get Involved** circles are unclickable-feeling (low affordance)
6. **Find a Station illustration** is large but not interactive
7. **Join Our Community cards** lack hover states and visual polish
8. **No sticky navigation** — scroll UX could be improved
9. **Section spacing inconsistent** — some sections feel cramped

---

## 7. Redesign Strategy

### Keep Exactly
- Navy blue + Coral color scheme
- Logo (circular seal)
- All existing content, copy, and icons
- Navigation structure (For Seafarers, Get Involved, Who We Are, Contact)
- DONATE CTA prominence
- Social icons in header

### Improve
- Visual hierarchy in hero (larger headline, split layout)
- Stats section — animated counters, cleaner grid
- Service sections — bento grid or card layout
- Microinteractions on CTA buttons
- Section transitions and scroll-triggered animations
- Consistent card hover states

---

## 8. 7 Design Blueprint

| # | Style Name | Layout Concept | Key Innovation |
|---|-----------|---------------|----------------|
| 1 | Oceanic Elegance | Classic centered, clean white | Animated stat counters, service icon cards |
| 2 | Coastal Bold | Split hero, large type | Asymmetric dual-CTA, bento grid services |
| 3 | Maritime Minimal | Ultra-white, fine lines | Floating nav, minimal decoration, whitespace |
| 4 | Deep Blue Cinematic | Dark navy dominant | Coral accents, video hero, parallax |
| 5 | Warm Harbor | Coral dominant warm | Illustrated hero, community-first layout |
| 6 | Corporate Trust | Structured columns | Professional grid, trust signals prominent |
| 7 | Modern Maritime | Two-tone asymmetric | Bold statement type, scroll-kinetic reveals |

---

## 9. Component List (Expert-Level)

- **Animated counter stats** (Intersection Observer)
- **Bento grid service layout** (CSS Grid with varying cell sizes)
- **Glassmorphic cards** (backdrop-filter blur on dark sections)
- **Scroll-triggered section reveals** (IntersectionObserver fade+slide)
- **Parallax hero background** (CSS transform on scroll)
- **Sticky transparent-to-solid nav** (scroll event + classList)
- **Interactive supporter carousel** (CSS scroll snap + JS)
- **Hover-lift CTA cards** (transform + box-shadow transition)
- **Split hero with overlay text** (CSS grid, pseudo-element overlay)
- **Floating anchor decorative elements** (CSS animation keyframes)
