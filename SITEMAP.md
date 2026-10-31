# Homesic Kitchen Estimator — site map & UX brief

A one-page brief plus the page tree, for UI/UX work on the estimator.

---

## 1. The brief

**What it is.** A mobile-first web app that prices a modular kitchen in about three
minutes. The customer taps through thirteen short screens, sees the price move with
each choice, and leaves with a written quote — and the studio gets the exact
configuration as a lead.

**Why it exists.** Kitchen pricing is opaque: people are quoted lakhs without ever
seeing what drives the number, and studios waste site visits on tyre-kickers. The
estimator gives a real, itemised number up front, so the site visit is about design
rather than discovery.

**Who it is for.**
- *Primary:* homeowners in India planning a kitchen in the next 0–6 months, arriving
  from Instagram, WhatsApp or Google, almost always on a phone, often on mobile data.
- *Secondary:* the studio's own salesperson, walking a customer through options on a
  tablet during a call or a showroom visit.

**Jobs to be done.**
1. "Tell me roughly what my kitchen will cost before I talk to anyone."
2. "Show me what changes the price, so I can decide where to spend."
3. "Take down exactly what I picked and send me something I can keep."

**Design principles.**
1. **One decision per screen.** No scrolling menus, no forms until the very end.
2. **The price is always on screen.** A docked bar shows the running total on every step after size.
3. **Tap, don't type.** All choices are tiles, chips or steppers. Typing happens once, at the end.
4. **Every number is explainable.** Each line is quantity × rate; the quote shows both.
5. **Calm, warm, premium.** Dark shell, cream paper for the quote, one amber accent.
6. **Never trap the user.** Back, skip and edit stay reachable; the quote is regenerable.

**Tone.** Plain, confident, short. Rupee amounts in Indian grouping (₹2,54,940).
No jargon ("carcass" is fine, "BOQ" is not).

**Constraints.**
- Static single-page app, no backend, no build step; hosted on GitHub Pages.
- State persists in `localStorage`; a reload resumes the same step.
- 390 px is the design width; 320 px must not break; desktop is a wider version of the same flow.
- Photos are the studio's own; placeholders allowed where none exist.

**Success measures.** Steps completed per visit, quotes reached, PDFs downloaded,
leads delivered, feedback responses.

---

## 2. Site map

```
Homesic Estimator (single page, one flow)
│
├── 0 · Start ────────────────────────────── hero, default price teaser, "Price my kitchen"
│
├── 1 · Size ─────────────────────────────── L × B × H, presets, fridge bay later
├── 2 · Shape ────────────────────────────── straight · parallel · L · U
├── 3 · Storage ──────────────────────────── base · wall · loft · tall · fridge
├── 4 · Build ────────────────────────────── board × finish, compare boards, glass add-on
├── 5 · Handles ──────────────────────────── profile · standard · premium · designer · groove
├── 6 · Surfaces ───────────────────────────┬─ Worktop: granite · quartz · install only · existing
│                                           └─ Backsplash: tiles · existing
├── 7 · Sink & tap ─────────────────────────┬─ Sink material: SS · granite · quartz · ceramic
│                                           ├─ Bowl type: single · double · double+drainboard · worktop
│                                           └─ Tap: standard · premium · designer
├── 8 · Hinges ─────────────────────────────┬─ Brand: Hettich · Moda · Doorset
│                                           └─ Function: soft-close · push-to-open
├── 9 · Lighting ──────────────────────────── standard · premium · elite (flat per project)
├── 10 · Drawers ──────────────────────────── normal · jali · tandem (counts, optional)
│
├── 11 · Details ──────────────────────────── name · mobile · email (opt) · city · floor plan (opt)
│
└── 12 · Quote ────────────────────────────── the deliverable
        ├── Selections summary ("What you picked")
        ├── Compact bill (8 lines + total)
        ├── Payment stages 10 / 40 / 45 / 5
        ├── Download PDF (A4, one page)
        ├── Feedback: 6 reaction chips + budget lever (₹2 L–₹6 L)
        └── Delivery: one email, auto-sent after 3.5 min, re-sent if feedback changes

Utility routes (not part of the flow)
├── ?leads=1 ......... saved leads in this browser
└── ?selftest=lead ... lead-delivery diagnostic
```

---

## 3. Page inventory

| # | Page | Purpose | Primary control | Advances when | Skip? |
|---|---|---|---|---|---|
| 0 | Start | Earn the tap | One CTA + default price | Tap | — |
| 1 | Size | Get L × B × H | 3 steppers + 4 presets | All three valid | No |
| 2 | Shape | Set the runs | 4 photo tiles | Tile chosen | No |
| 3 | Storage | Set the carcass | 5 unit tiles (multi) | Any unit on | No |
| 4 | Build | Board + finish | 3 board segments × 6 finishes | Both chosen | No |
| 5 | Handles | One rate per door | 5 photo tiles | Tile chosen | No |
| 6 | Surfaces | Two rates | 2 groups of 2–4 tiles | Any tile per group | Per group |
| 7 | Sink & tap | Three rates | 3 groups (circles, tiles, tiles) | One per group | Whole step |
| 8 | Hinges | Brand + function | 2 groups of 2–3 tiles | One per group | No |
| 9 | Lighting | One flat rate | 3 tiles | Tile chosen | Yes |
| 10 | Drawers | Optional quantity | 3 tiles with steppers | Quantity set | Yes (0) |
| 11 | Details | Contact + plan | 4 fields + file | Name + valid mobile | No |
| 12 | Quote | Deliver + learn | Download, chips, lever | — | — |

**Per-page notes**

- **Start.** Shows a real number ("A 10 × 8 ft L-shape kitchen from ₹2,54,940") so the
  first screen is a promise, not a form. Trust row: all-inclusive, 10-year warranty, free visit.
- **Size.** Steppers with presets; the dock switches from "Estimate" to the real total once
  size is known. Fridge bay is a storage toggle, not a dimension.
- **Shape.** Four plans; each card previews the resulting base/wall run before selection.
- **Build.** Board as a segmented control, finish as a photo grid with the rate printed per
  finish. The compare table is secondary, inside an expander.
- **Sink & tap.** Material is a circular swatch row; the bowl tiles show live prices for the
  chosen material; the tap row reprices with the sink.
- **Hinges.** Brand changes the photo, never the price; the function row carries the rate.
- **Lighting & Drawers.** Both are optional; the CTA reads "Skip" until something is chosen.
- **Details.** The price is deliberately hidden here — the number appears on the quote. One
  submit, then the quote builds locally.
- **Quote.** Cream card, total at the top with Download PDF beside it, picks list, compact
  bill, payment stages, then the feedback block. Quiet, printable, shareable.

---

## 4. Components

| Component | Used on | Behaviour |
|---|---|---|
| Photo tile | shape, handles, lighting, sink type, faucet | 4:3 or 1:1 image, name, rate, tick on select, ⤢ opens full size |
| Circular swatch | sink material | 1:1 texture inside a circle, no crop of the grain |
| Counted tile | drawers | Tile + "− 0 +" stepper, clamps 0–20 |
| Multi toggle | storage | Independent on/off per unit |
| Segmented control | board | Text-only pills, 3 options |
| Grouped section | surfaces, sink, hinges | Section label + skip chip per group |
| Skip chip | surfaces, sink, lighting, faucet | Text button that zeroes a line and moves on |
| Price dock | steps 1–11 | Back, step dots, name, running total; tap for a jump menu |
| Quote card | quote | Cream paper, dark ink, amber accent |
| Feedback chips | quote | Multi-select reactions, no free text |
| Budget lever | quote | ₹2 L–₹6 L, ₹25 k steps, thumb parked at the quote |
| Lightbox | every photo | Full-size view, caption, Esc to close |

---

## 5. States and rules

- **Selection:** unselected (outline) → hover → selected (accent border + tick) → skipped (muted, line zeroed).
- **CTA:** disabled until the step is complete; reads "Skip →" on optional steps, "Continue →" otherwise.
- **Dock:** hidden on Start and Details; the total is "—" before size is known.
- **Quote gating:** price never appears before Details submits; payment stages reuse the same total.
- **Persistence:** every tap writes to `localStorage`; reload resumes the same step, and a pending
  quote-send is rescheduled from its original timestamp.
- **Delivery:** one email per quote; feedback arriving later produces one update email, debounced 8 s.

---

## 6. Data model (what a screen may read or write)

```
room      l, b, h, layout
storage   units{base,wall,loft,tall,fridge}, glass
build     board, finish
surfaces  counter, backsplash, skip{counter,backsplash}
sink      sinkMaterial, sinkType, faucet, skip{sink,faucet}
hardware  handle, hingeBrand, hingeFunction
lighting  lighting, skip{lighting}
drawers   drawers{normal,jali,tandem}
contact   name, phone, email, city, plan
output    lead{id, at, delivery}, fb{tags, budget, touched}
```

Derived, never stored: runs, carcass area, doors, handles, hinges, legs, skirting, line amounts.

---

## 7. Out of scope (for this map)

- Accounts, saved quotes across devices, multi-kitchen projects.
- Payment collection, order tracking, CRM sync.
- Languages other than English.
- Desktop-specific layouts beyond a wider version of the same flow.
