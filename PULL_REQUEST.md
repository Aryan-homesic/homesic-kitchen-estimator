# Estimator v2 — guided flow, transparent pricing, PDF quote

## What this PR does

Rebuilds the Homesic kitchen estimator from a static price list into a guided,
mobile-first flow that produces a customer-ready quote.

**Flow (13 steps)**
Room size first → shape → storage → board + finish (merged) → handles → worktop +
backsplash (merged) → sink + material + tap (merged) → hinges (brand + function,
merged) → lighting → accessories → details → quote.

**Pricing**
- Sink is priced as a material × type matrix (`RATES.sink`), matching how board ×
  finish already worked.
- Hinges are priced by function only (`RATES.hingeFn`) — brand no longer changes
  the price.
- PVC legs (4 per 2 ft of base) and skirting (1 strip per 10 ft) are calculated
  and billed as their own line.
- Glass shutters are an add-on over the wall carcass.
- 5% design charge applies to the construction subtotal.
- All rates live in one `RATES` object; `RATES.md` documents every one with units.

**Quote page**
- Cream card, total at the top with a **Download PDF** button beside it.
- "What you picked" list + a compact 8-line bill (no long itemised table).
- Payment stages, with the first stage labelled *token amount*.
- All-inclusive wording throughout (material, labour, hardware, transport,
  design, 10-year warranty).
- One-page A4 PDF generated in the browser (jsPDF), same content and palette.

**Feedback + delivery**
- One-tap reactions + a ₹2 L–₹6 L budget lever, no typing.
- The quote emails itself 3.5 minutes after it is shown if the customer does
  nothing; answering within that window folds the feedback into the same email.
- Changes made after it was sent trigger a single "updated" email.
- Quote data never appears in the email until the customer submits their details.

**Assets**
- Homesic logo (transparent PNG) in header, PDF and favicon.
- New photography wired for finishes, handles, storage, shapes, sinks, faucets,
  lighting and Ebco hinges.
- Sink material swatches are now textures (steel, granite, quartz, ceramic).

## Files

| File | Change |
|---|---|
| `index.html` | App: flow, pricing, quote card, feedback, email |
| `quote-pdf.js` | Browser PDF generator (jsPDF) |
| `assets/vendor/jspdf.umd.min.js` | Vendored, no CDN dependency |
| `assets/**` | New images (logo, textures, photos) |
| `RATES.md` | Every rate, unit and formula |
| `README.md` | Updated flow, formulas, deployment |
| `server.js`, `tools/shot.js` | Local preview + screenshot helper |

## How to review

1. `node server.js` → open `http://127.0.0.1:8777`
2. Walk the 13 steps; the dock shows a live estimate.
3. At the end: check the cream card, the picks list, the bill totals, the
   **Download PDF** button, then answer or ignore the feedback card.
4. Confirm the email arrives once (and once more only if feedback changes).

## Known follow-ups

- Payment terms are 10 / 50 / 45 / 5 = 110%; needs a decision (10 / 45 / 40 / 5
  or similar).
- `CONFIG.leadEndpoint` still points at Web3Forms; swap for a studio address.
- Photos are placeholders where the supplier set has no shot (noted per option).

## Checklist

- [x] Mobile-first, no horizontal scroll at 390 px
- [x] Every screen keyboard reachable, aria labels on controls
- [x] Rates centralised, documented in `RATES.md`
- [x] No backend required; quote PDF built client-side
- [x] localStorage state survives reload; pending sends are re-scheduled
