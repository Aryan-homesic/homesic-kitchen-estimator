# Material & rate list — by page

Every option the customer can pick, the rate behind it, and the quantity that rate
multiplies. Pages follow the estimator flow, so this doubles as a spec sheet and a
procurement list.

Rates are the studio's selling prices, ex-tax, taken from the live `RATES` object.

---

## Page 1 · Size — no material

Room length, breadth and height drive every quantity below. Nothing is bought here.

| Input | Drives |
|---|---|
| Length × breadth | gross run, base run, wall run |
| Height | loft band = height − 7 ft |
| Fridge bay toggle | −2 ft base and wall run |

---

## Page 3 · Storage — carcass

The board is chosen on Page 4; storage decides **how much** of it.

| Option | Unit | Quantity rule |
|---|---|---|
| Base units | sq ft of carcass | base run × 3 |
| Wall units | sq ft | wall run × 2 |
| Loft units | sq ft | loft run × (height − 7) |
| Tall unit | sq ft | fixed 4 |
| Fridge bay | — | no carcass, −2 ft run |

---

## Page 4 · Build — board × finish

One combined rate per sq ft of carcass. Glass shutters are an add-on for wall units only.

| Board | Laminate | Acrylic | Membrane | PU | Veneer | Rattan |
|---|---|---|---|---|---|---|
| HDHMR | 1,450 | 1,600 | 2,500 | 2,600 | 2,600 | 3,000 |
| BWR ply | 1,800 | 2,000 | 2,700 | 2,900 | 2,900 | 3,200 |
| BWP ply | 1,900 | 2,100 | 2,800 | 2,800 | 3,200 | 3,200 |

| Add-on | Unit | Rate | Quantity rule |
|---|---|---|---|
| Glass profile shutters | sq ft | 2,100 | wall carcass (wall run × 2) |

*Rate covers 18 mm board, edge banding, shutters, adhesive and labour.*

---

## Page 5 · Handles — per door

| Option | Rate / door |
|---|---|
| Profile (G-profile channel) | 250 |
| Standard (pull handle) | 100 |
| Premium (longer pull) | 250 |
| Designer | 500 |
| Groove (recessed, included) | 0 |

Quantity: doors = ceil(base run ÷ 2) + ceil(wall run ÷ 2) + ceil(loft run ÷ 2).

---

## Page 6 · Surfaces

### Worktop — per sq ft

| Option | Rate / sq ft |
|---|---|
| Granite | 700 |
| Quartz | 1,100 |
| Only installation (customer supplies slab) | 300 |
| Already existing | 0 |

Quantity: base run × 2 ft (2 ft deep).

### Backsplash — per sq ft

| Option | Rate / sq ft |
|---|---|
| Tiles | 200 |
| Already existing | 0 |

Quantity: gross run × 2 ft (2 ft high).

---

## Page 7 · Sink & tap

### Sink — per set (material × bowl type)

| Material | Single bowl | Double bowl | Double + drainboard | Worktop sink |
|---|---|---|---|---|
| Stainless steel | 7,200 | 15,600 | 21,600 | 12,000 |
| Granite | 9,600 | 21,800 | 30,100 | 16,400 |
| Quartz | 8,400 | 19,200 | 26,400 | 14,400 |
| Ceramic | 18,000 | 33,600 | 46,200 | 30,600 |

### Tap — per piece

| Option | Rate |
|---|---|
| Standard | 1,000 |
| Premium | 2,000 |
| Designer | 4,000 |

Quantity: one sink and one tap per kitchen.

---

## Page 8 · Hinges — per piece

Rates depend on the function only; the brand is a preference.

| Function | Rate / hinge |
|---|---|
| Soft-close | 300 |
| Push-to-open | 600 |

| Brand | Price effect |
|---|---|
| Hettich | none |
| Moda | none |
| Dorset | none |

Quantity: hinges = doors × 2.

---

## Page 9 · Lighting — per project

| Grade | Scope | Rate |
|---|---|---|
| Standard | Internal lighting only | 10,000 |
| Premium | Internal + external + outlets | 20,000 |
| Elite | Complete lighting + concealed outlets | 30,000 |

Flat per kitchen — not multiplied by run length.

---

## Page 10 · Drawers — per piece

| Option (as the studio lists it) | Rate / piece |
|---|---|
| Normal channel with drawers | 2,000 |
| Jali drawers + channels | 3,000 |
| Innotech tandem drawers | 4,000 |

Quantity: entered per type (0–20). Optional; zero by default.

---

## Page 12 · Quote — support items

These are never picked by the customer; they are calculated and billed automatically.

| Item | Unit | Rate | Quantity rule |
|---|---|---|---|
| PVC legs | piece | 50 | ceil(base run ÷ 2) × 4 → 32 on a 16 ft base |
| PVC skirting | strip | 3,000 | ceil(base run ÷ 10) → 2 on a 16 ft base |
| Design charge | % of subtotal | 5% | applied once, after everything else |

---

## Worked example — 10 × 8 ft L-shape

HDHMR + laminate · granite · tiles · stainless single bowl · standard tap ·
Hettich soft-close · standard lighting · no drawers.

| Material | Quantity | Rate | Amount |
|---|---|---|---|
| 18 mm HDHMR + laminate | 114 sq ft | 1,450 | 1,65,300 |
| Profile handles | 26 doors | 250 | 6,500 |
| Soft-close hinges | 52 pieces | 300 | 15,600 |
| PVC legs 32 + skirting 2 | 1 set | 50 / 3,000 | 7,600 |
| Granite worktop | 32 sq ft | 700 | 22,400 |
| Tile backsplash | 36 sq ft | 200 | 7,200 |
| Sink + tap | 1 set | 7,200 + 1,000 | 8,200 |
| Lighting, standard | 1 project | 10,000 | 10,000 |
| **Subtotal** | | | **2,42,800** |
| Design charge | 5% | | 12,140 |
| **Total** | | | **2,54,940** |

Payment split on the total: 10% token (25,494) · 40% production (1,01,976) ·
45% before shutters and hardware (1,14,723) · 5% after handover (12,747).

---

## Not itemised (already inside the rates)

Carcass assembly, edge banding, shutter pressing, hardware fitting, adhesives and
sealants, transport to site, installation labour, site handling, waste removal and
the 5% design fee. The quote is all-inclusive by design — no line for these appears.

## Excluded

Civil work, plumbing and electrical points, chimney/hob/appliances, demolition and
disposal, statutory taxes.
