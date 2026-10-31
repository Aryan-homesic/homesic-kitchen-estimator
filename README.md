# Homesic — modular kitchen quote builder

Single-file site: `index.html` + `assets/`. No build, no backend.

```bash
python3 -m http.server 8777   # open http://127.0.0.1:8777
```

## Flow

Start → size → shape → units → board & finish → handles → worktop & backsplash → sink material →
sink type → faucet → hinge brand → hinge function → lighting → drawers → details → quote.

Size comes first so every run, unit price and the dock estimate are based on the real room from the
second screen on.

Board and finish share one screen: a three-way **Board** switch (BWP · HDHMR · BWR, in that order)
with board thumbnails, a **Finish** grid of six square, uncropped photo tiles whose prices update with
the board, an optional **Glass profile shutters** add-on for wall units only, and the **Compare
boards** table open below it. One tap on a finish sets the board+finish rate; the page stays put and a
single **Continue** enables once both are chosen.

Every choice screen is photo-led: each card reserves a photo area (`--rh` desktop, `--rhm` phone in
`STEPS`), so swapping an image never reflows the grid. Sizes are tuned so a 375 × 667 phone shows a
whole screen at once; the stage scrolls only if a longer screen still overflows, and a missing image
file collapses to the card's neutral panel rather than a broken icon.

One topic per screen. Single-choice screens advance on tap. Units and Accessories are
multi-select, so their **Continue / Skip** action sits in the title row on the right; Size has
**Continue** in the same place. Multi-select changes apply in place — no page transition.
The Units screen shows Base, Wall, Loft, Tall and Fridge as separate cards with a price, and the
Accessories cards carry a count stepper. There is no eyebrow label above any title. Hover or
keyboard-focus a single-choice card to see the run, rate and estimated line cost.

Countertop, Backsplash, Sink material, Sink type, Faucet and Lighting have a **Skip** action in the
title row. Skipped items are left out of the price and listed as “Not included” on the quote.

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

CP  = total carcass × board+finish rate (one cell of the woodwork matrix)
GL  = wall carcass × glass rate (only when the glass add-on is on and wall units are selected)
HP  = handles × handle rate
CTP = (base run × 2) × countertop rate
BSP = (gross base length × 2) × backsplash rate
SP  = sink material rate × sink type multiplier + faucet rate
HiP = hinges × hinge rate (brand × function)
LP  = lighting rate (flat per project)
DP  = Σ drawer count × drawer rate
Grand total = CP + GL + HP + CTP + BSP + SP + HiP + LP + AP, plus 5% design charge
```

Sink multipliers: single 1, double 2, single with tray 1.35, double with drainboard 2.4. Faucet
count 1. All runs are clamped at zero.

## Rates

The woodwork rate card follows the studio's catalogue (Oct 2026); board order is BWP, HDHMR, BWR.
The other rates are still samples.

- Woodwork, per sq ft of carcass, board + finish, from the catalogue:

  | Board | Laminate | Acrylic | Membrane | PU | Veneer | Rattan |
  |---|---|---|---|---|---|---|
  | HDHMR | 1450 | 1600 | 2500 | 2600 | 2600 | 3000 |
  | BWR ply | 1800 | 2000 | 2700 | 2900 | 2900 | 3200 |
  | BWP ply | 1900 | 2100 | 2800 | 2800 | 3200 | 3200 |

- Glass profile with 5.5 mm shutter: 2100 / sq ft, **add-on for wall units only** — it is charged on
  the wall carcass area and sits on top of the board+finish rate, not instead of it. Disabled when
  wall units are off.
- Handles (per door): profile 250, standard 100, premium 250, designer 500, groove 0 (included).
- Countertop (per sq ft): granite 700, quartz 1100, only installation 300, already existing 0.
- Backsplash (per sq ft): tiles 200, already existing 0.
- Sink material (per sink): stainless 6200, granite 10500, quartz 9200.
- Faucet (each): standard 1000, premium 2000, designer 4000.
- Hinges (per hinge, function only): soft-close 300, push-to-open 600. Brands Hettich, Moda, Doorset.
  Godrej 320/370/420 for standard/soft-close/push-to-open.
- Lighting (per project, flat): standard 10,000, premium 20,000, elite 30,000.
- Drawers (each): normal channel 2000, jali + channels 3000, Innotech tandem 4000.

Glass is an add-on over the woodwork rate, priced on the wall carcass area (33 sq ft for the 10 × 8
default, so ₹69,300 before the design share). Everything else is unchanged.

New cards (marble countertop, wall-mounted faucet, double-with-drainboard sink) reuse the closest
existing photo — swap in real shots when the studio has them. The four-card screens use a 2×2 grid
(`c:2, rh:260` in `STEPS`).

Change `DEFAULTS` for the preselected units and finishes. No tax line is added; the quote is an
indicative price.

## Collecting leads (no server required)

**Local storage is only the device in front of you.** `homesic.leads.v1` holds submitted leads in
that browser, which is useful for a showroom tablet or testing, but a client submitting from their
phone writes to *their* browser — you will not see it. For real client submissions, point the form
at a free form service. The site already POSTs the full record and shows a sent/failed status on the
quote.

### 1. Free email notification — Web3Forms (recommended)

1. Go to **web3forms.com**, enter the studio email and copy the access key (no account needed).
2. In `index.html`, set:

```js
const CONFIG = {
  whatsapp: '919845012345',
  leadEndpoint: 'https://api.web3forms.com/submit',
  leadAccessKey: 'YOUR-WEB3FORMS-ACCESS-KEY',
  leadCompany: 'Homesic',
  calendly: '' // optional, see below
};
```

3. Submit a test quote. The quote should say **Request sent to the studio**, and the lead should
   arrive by email. Free tier: 250 submissions/month. Enable domain restriction in the dashboard
   so the key only works from the deployed site.

**Formspree** is an alternative: create a form at formspree.io, copy the endpoint
(`https://formspree.io/f/xxxx`), paste it as `leadEndpoint`, and leave `leadAccessKey` empty. Free
tier: 50 submissions/month.

**FormSubmit** works with just an email and no account:
`leadEndpoint = 'https://formsubmit.co/ajax/you@studio.com'`. The first submission sends an
activation email; confirm it before leads are delivered.

### 2. WhatsApp / Telegram / Google Sheets

Point `leadEndpoint` at a **Make**, **n8n** or **Zapier** webhook instead. The automation can append
the lead to a Google Sheet and send a Telegram, WhatsApp, Slack or email notification. The payload
includes the reference, date, name, phone, city, plan metadata, total, line items, selections and
breakdown, so the automation can map any field. Free tiers are enough for a small studio.

### 3. Calendly-style site-visit booking

Set `CONFIG.calendly` to the event URL, e.g. `https://calendly.com/your-studio/site-visit`. A
**Book a site visit** button appears on the quote with the client's name prefilled. Calendly sends
the confirmation/notification to both sides. This complements the form endpoint; the quote data
still goes through Web3Forms/Formspree.

### The local fallback

`homesic.v1` keeps the in-progress calculator state. `homesic.leads.v1` keeps up to 100 submitted
leads (reference, date, name, phone, city, plan metadata, total, lines, selections, breakdown).
Open **`?leads=1`** on the same browser for the local table and Clear all. The plan binary is not
stored or sent — only its name, type and size; upload it to Cloudinary/Supabase Storage and send
the URL if you need the actual file.

The quote shows one of: **Sending**, **Request sent**, **Could not reach the studio — saved on this
device**, or **Saved on this device**. A failed send still keeps the lead locally, and the customer
can use WhatsApp/PDF.

Security: endpoints and Web3Forms/Formspree keys are public by design; restrict them by domain and
enable the provider's spam protection. Never put a private API key or SMTP password in the HTML.
If you run your own Cloudflare Worker/Netlify function, validate and rate-limit server-side.

## Images

`assets/hero-desktop.jpg` (2400×1350) and `assets/hero-phone.jpg` (1080×1920) are crops of Unsplash
photo `photo-1622372738946-62e02505feb3` (Unsplash License). The finish, counter and two sink cards
use the `assets/card-*.jpg` crops; all other images are the studio's own.

Card images are used as-is — no grading or re-encoding step. Replace any of them by dropping a file
with the same name into `assets/`.

The six shutter finishes use the studio's own shots in `assets/finishes/` (`laminate.jpg`,
`acrylic.jpg`, `membrane.jpg`, `pu.jpg`, `veneer.jpg`, `rattan.jpg`). They appear as square,
uncropped tiles on the Build screen (3 across on a phone, 6 on desktop), and the ⤢ button on any
card photo opens it full size in a lightbox.

The Shape screen uses the studio's 1:1 plan images in `assets/shape/` (`straight.jpg`, `parallel.jpg`,
`lshape.jpg`, `ushape.jpg`), shown square with a lightbox to inspect the plan full size.

The Storage screen uses `assets/storage/hero.jpg` (the annotated all-units layout, shown at its own
aspect ratio) as a page banner, and `assets/storage/unit-*.jpg` — the five supplied section cards
(base, wall, loft, tall, fridge), each shown whole and uncropped, one per row — as the unit choices.

## Verified

Headless Chrome runs cover the 18-screen calculator and the latest UI pass (53 + 38 checks) with no
console errors. Formula checks confirm the 16 ft base / 16.5 ft wall runs, 114 sq ft carcass, 26
doors, 52 hinges, design at 5%, and a one-page A4 quote. The skip paths produce zeroed lines and the
“Not included” note. Mobile at 390×844 fits the Units, Board (table scrolls when open), Counter and
Accessories screens; multi-select selections do not re-animate the page.

Re-checked after the local revision (catalogue rates, size first, merged board & finish screen) in
Node against the extracted script: same runs, carcass, door and hinge counts, woodwork line 114 sq ft
× ₹1,450 = ₹1,65,300, a 10 × 8 L-shape default quoting ₹2,97,696, glass add-on 33 sq ft × ₹2,100 =
₹69,300 (₹72,765 with the design share), zero glass when wall units are off, and board order BWP →
HDHMR → BWR in both the switch and the compare table. Across all 12 choice screens: one photo card
per option, every referenced image present in `assets/`. Browser UI checks were not re-run, so the
“no scroll on a phone” layout is by construction (compact rows, no horizontal scroll) rather than
screenshot-verified.

## Known limits

- Rates are placeholders until the studio's rate values are entered.
- Plans are not persisted, and leads live only in this browser unless `CONFIG.leadEndpoint` is
  configured with a form service or automation webhook.
- No tax/GST calculation; add it deliberately if the quote must be a tax document.

## Deploy

Source lives in the **private** repo `akm-akm/modular-kitchen-estimator-site`. GitHub Pages needs a
public repo on the free plan, so the site is published from `akm-akm/homesic-kitchen-estimator`:

```bash
./deploy.sh     # rsyncs index.html + assets into .deploy/ and pushes it
```

Live: https://akm-akm.github.io/homesic-kitchen-estimator/ (rebuilds ~1 min after each push).
`.deploy/` is a separate clone and is gitignored here.

Publishing is automatic: `.githooks/pre-push` runs `deploy.sh` before every `git push` from this
machine, so a normal push updates the live site. Enabled via `git config core.hooksPath .githooks`
(already set for this clone).

GitHub Actions is not usable on this account right now: every workflow, including a one-line
`echo`, ends in `startup_failure` with zero jobs, which points at account-level billing or Actions
verification rather than the workflow itself. `.github/workflows/publish-pages.yml.disabled` is a
ready-made mirror for when Actions works again — rename it to `.yml` and it publishes on every push
using the `PAGES_DEPLOY_KEY` secret (an ed25519 deploy key with write access to the Pages repo
only).
