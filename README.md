# Homesic — modular kitchen quote builder

Single-file site: `index.html` + `assets/`. No build, no backend.

```bash
python3 -m http.server 8777   # open http://127.0.0.1:8777
```

## Flow

Start → shape → units → board → finish → handles → worktop → backsplash → sink material →
sink type → faucet → hinge brand → hinge function → lighting → accessories → size → details → quote.

One topic per screen. Single-choice screens advance on tap. Units and Accessories are
multi-select, so their **Continue / Skip** action sits in the title row on the right; Size has
**See my price** in the same place. There is no eyebrow label above any title. Hover or
keyboard-focus a card to see the run, rate and estimated line cost for the current kitchen.

All quiz, size and quote screens sit on the cover photo; the contact gate (and the local leads
view) stay on the light background. The details gate asks for name, mobile and city, and accepts
an optional floor plan (PDF/JPG/PNG, 10 MB max). The quote is a document with itemised lines,
10/40/45/5 payment terms, warranty note, WhatsApp share, Save PDF and Edit choices.

## Calculator

Inputs: L × B × H in feet; layout; units; board; finish; handles; countertop; backsplash; sink
material and type; faucet; hinge brand and function; lighting; accessories with counts.

```
Gross base length: straight L · parallel 2L · L L+B · U 2L+B
Base run:          straight L · parallel 2L · L L+B−2 · U 2L+B−4
Wall / loft run:   straight L · parallel 2L · L L+B−1.5 · U 2L+B−3
Fridge gap (−2 ft): base run, wall run and gross base length; loft run unchanged

Base carcass  = base run × 3
Wall carcass  = wall run × 2
Loft carcass  = loft run × (H − 7)
Tall carcass  = 4 sq ft (fixed, no doors)

Base / wall / loft doors = ROUNDUP(run ÷ 2)
Handles = total doors, hinges = handles × 2

CP  = total carcass × board rate
FP  = total carcass × finish rate
HP  = handles × handle rate
CTP = (base run × 2) × countertop rate
BSP = (gross base length × 2) × backsplash rate
SP  = sink material rate × sink type multiplier + faucet rate
HiP = hinges × hinge rate (brand × function)
LP  = gross base length × lighting rate
AP  = Σ accessory count × accessory rate
Grand total = CP + FP + HP + CTP + BSP + SP + HiP + LP + AP, plus 5% design charge
```

Sink multipliers: single 1, double 2, single with tray 1.35. Faucet count 1. All runs are clamped
at zero.

## Rates are placeholders

The formulas are complete; **the numbers in `RATES` are samples** and must be replaced with the
studio's confirmed values before quoting:

- Board (per sq ft carcass): BWP 1250, BWR 1150, HDHMR 800.
- Finish (per sq ft): acrylic 800, laminate 650, spray paint 1800, texture 1700, solid wood 1800,
  jute rattan 2200, glass 1300.
- Handles (each): profile 1200, L-grip 900, groove 1500, knob 600.
- Countertop (per sq ft): granite 700, quartz 1100, full body 500.
- Backsplash (per sq ft): ceramic 250, acrylic 450, mosaic 380.
- Sink material (per sink): stainless 5500, granite 9000, quartz 8000.
- Faucet (each): lever 2800, pull-out 5600, filter 7200.
- Hinges (per hinge, brand × function): Hettich 450/500/550, Innotech 350/400/450,
  Godrej 300/340/390 for standard/soft-close/push-to-open.
- Lighting (per running ft): internal 550, internal + external + outlets 1200, complete 1900.
- Accessories (each): magic corner 14500, wicker 3800, cutlery 2900, bottle 3000.

Change `DEFAULTS` for the preselected units and finishes. No tax line is added; the quote is an
indicative price.

## Data collection (localStorage)

- `homesic.v1` — in-progress state, so a refresh resumes.
- `homesic.leads.v1` — submitted leads, newest first, capped at 100. Each record has the reference,
  date, name, phone, city, plan metadata (name/type/size), total, priced line items, selections and
  the cost breakdown.

Open **`?leads=1`** for the saved leads table with a Clear all action. It is not linked from the
customer UI; bookmark the URL. The plan's binary is not stored — only its name, type and size —
and the preview works for the current session. Set `CONFIG.leadEndpoint` to POST the record to a
server; set `CONFIG.whatsapp` to the studio number for direct WhatsApp sharing.

## Images

`assets/hero-desktop.jpg` (2400×1350) and `assets/hero-phone.jpg` (1080×1920) are crops of Unsplash
photo `photo-1622372738946-62e02505feb3` (Unsplash License). The finish, counter and two sink cards
use the `assets/card-*.jpg` crops; all other images are the studio's own.

## Verified

Headless Chrome run of the full 18-screen flow: 53 functional checks passed with no console errors.
Formula checks confirm the 16 ft base / 16.5 ft wall runs, 114 sq ft carcass, 26 doors, 52 hinges,
CP 91,200, FP 74,100, CTP 22,400, BSP 9,000, LP 9,900, the fridge deduction on backsplash and
lighting (loft unchanged), design at 5%, and a one-page A4 quote. Mobile at 390×844 has no stage
overflow on the new screens; the title-row actions and quantity steppers work.

## Known limits

- Rates are placeholders until the studio's rate values are entered.
- Plans are not persisted, and leads live only in this browser.
- No tax/GST calculation; add it deliberately if the quote must be a tax document.
