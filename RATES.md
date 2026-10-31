# Rate sheet

Every price the calculator uses lives in the `RATES` object in `index.html`.
Change a number there, save, reload — nothing else to touch.

## 1. Woodwork — ₹ per sq ft of carcass (board × finish)

| Board | Laminate | Acrylic | Membrane | PU | Veneer | Rattan |
|---|---|---|---|---|---|---|
| HDHMR | 1450 | 1600 | 2500 | 2600 | 2600 | 3000 |
| BWR ply | 1800 | 2000 | 2700 | 2900 | 2900 | 3200 |
| BWP ply | 1900 | 2100 | 2800 | 2800 | 3200 | 3200 |

## 2. Glass profile shutters — ₹ per sq ft

| Item | Rate | How it applies |
|---|---|---|
| Glass | 2100 | add-on over the wall carcass (its own line) |

## 3. Handles — ₹ per door

| Profile | Standard | Premium | Designer | Groove |
|---|---|---|---|---|
| 250 | 100 | 250 | 500 | 0 (included) |

Handles = number of doors (run ÷ 2 ft, rounded up) across base, wall and loft.

## 4. Hinges — ₹ per hinge (function only; brand does not change the price)

| Soft-close | Push-to-open |
|---|---|
| 300 | 600 |

Brands offered: **Hettich · Moda · Doorset** (preference only).

Hinges = handles × 2.

## 5. Drawers — ₹ per piece

| Normal channel with drawers | Jali drawers + channels | Innotech tandem drawers |
|---|---|---|
| 2000 | 3000 | 4000 |

Quantity is set per type on the Drawers screen; only non-zero types are billed.

## 6. Worktop — ₹ per sq ft

| Granite | Quartz | Only installation | Already existing |
|---|---|---|---|
| 700 | 1100 | 300 | 0 |

## 7. Backsplash — ₹ per sq ft

| Tiles | Already existing |
|---|---|
| 200 | 0 |

## 8. Sink — ₹ per set (material × type)

| Material | Single bowl | Double bowl | Double + drainboard | Worktop sink |
|---|---|---|---|---|
| Stainless steel | 7,200 | 15,600 | 21,600 | 12,000 |
| Granite | 9,600 | 21,800 | 30,100 | 16,400 |
| Quartz | 8,400 | 19,200 | 26,400 | 14,400 |
| Ceramic | 18,000 | 33,600 | 46,200 | 30,600 |

## 9. Faucet — ₹ per piece

| Standard | Premium | Designer |
|---|---|---|
| 1000 | 2000 | 4000 |

## 10. Lighting — ₹ per project (flat, not per foot)

| Standard (internal) | Premium (internal + external + outlets) | Elite (complete + concealed outlets) |
|---|---|---|
| 10,000 | 20,000 | 30,000 |

## 11. PVC — per piece

| Item | Rate | Quantity |
|---|---|---|
| PVC leg | 50 | `ceil(base run ÷ 2) × 4` → 32 legs on a 16 ft base |
| Skirting strip | 3000 | `ceil(base run ÷ 10)` → 2 strips on a 16 ft base |

## 12. Percentages and fixed factors

| Constant | Value | Used for |
|---|---|---|
| `DESIGN_PCT` | 5% | design charge on the construction subtotal |
| Door width | 2 ft | doors = ceil(run ÷ 2) |
| Fridge gap | 2 ft | deducted from base, wall and splash |
| Loft offset | 7 ft | loft carcass = loft run × (H − 7) |
| Tall carcass | 4 sq ft | fixed, no doors |
| Counter depth | 2 ft | worktop area = base run × 2 |
| Splash height | 2 ft | splash area = gross base × 2 |
| Faucet count | 1 | per kitchen |

## Formula recap

```
carcass = base run×3 + wall run×2 + loft run×(H−7) + tall(4)
doors   = ceil(base/2) + ceil(wall/2) + ceil(loft/2)     hinges = doors×2

CP   = carcass × woodwork[board][finish]
HP   = doors × handle
CTP  = base run × 2 × counter
BSP  = gross base × 2 × backsplash
SP   = sink[material][type] + faucet
HiP  = hinges × hingeFn[function]
LP   = lighting[grade]                       (flat per project)
DP   = Σ drawer qty × drawer rate
GL   = wall carcass × 2100                   (only when glass add-on is on)
PVCP = legs × 50 + strips × 3000

construction = CP + GL + PVCP + HP + CTP + BSP + SP + HiP + LP + DP
total        = construction × 1.05
```

Payment split: 10% token · 40% production · 45% before shutters and hardware · 5% after handover.
