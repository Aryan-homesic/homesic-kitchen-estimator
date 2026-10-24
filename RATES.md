# Rate sheet

Every price the calculator uses lives in the `RATES` object in `index.html` (around line 521).
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

| Profile | Bar pull | Groove | Knob |
|---|---|---|---|
| 600 | 400 | 150 | 400 |

Handles = number of doors (run ÷ 2 ft, rounded up) across base, wall and loft.

## 4. Worktop — ₹ per sq ft

| Granite | Quartz | Full body | Marble |
|---|---|---|---|
| 350 | 650 | 500 | 700 |

## 5. Backsplash — ₹ per sq ft

| Ceramic | Quartz / acrylic panel | Mosaic | Paint |
|---|---|---|---|
| 150 | 650 | 250 | 50 |

## 6. Sink — ₹ per set (material × type)

| Material | Single bowl | Double bowl | Double + drainboard | Worktop sink |
|---|---|---|---|---|
| Stainless steel | 7,200 | 15,600 | 21,600 | 12,000 |
| Granite | 9,600 | 21,800 | 30,100 | 16,400 |
| Quartz | 8,400 | 19,200 | 26,400 | 14,400 |
| Ceramic | 18,000 | 33,600 | 46,200 | 30,600 |

## 7. Faucet — ₹ per piece

| Single handle | Pull out | Wall tap | Double handle |
|---|---|---|---|
| 4,200 | 7,200 | 1,800 | 3,600 |

## 8. Hinges — ₹ per hinge (function only; brand does not change the price)

| Standard | Soft-close | Push-to-open |
|---|---|---|
| 250 | 400 | 600 |

Hinges = handles × 2.

## 9. Lighting — ₹ per running ft

| Internal | Internal + external + outlets | Complete + concealed | Only outlets |
|---|---|---|---|
| 145 | 520 | 700 | 260 |

## 10. Accessories — ₹ per piece

| Magic corner | Wicker basket | Cutlery tray | Bottle pull-out |
|---|---|---|---|
| 21,600 | 5,400 | 1,440 | 3,600 |

## 11. PVC — per piece

| Item | Rate | Quantity |
|---|---|---|
| PVC leg | 50 | `ceil(base run ÷ 2) × 4` → 32 legs on a 16 ft base |
| Skirting strip | 3,000 | `ceil(base run ÷ 10)` → 2 strips on a 16 ft base |

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

CP  = carcass × woodwork[board][finish]
HP  = doors × handle
CTP = base run × 2 × counter
BSP = gross base × 2 × backsplash
SP  = sink[material][type] + faucet
HiP = hinges × hingeFn[function]
LP  = gross base × lighting
AP  = Σ accessory qty × rate
GL  = wall carcass × 2100          (only when glass add-on is on)
PVCP = legs × 50 + strips × 3000

construction = CP + GL + PVCP + HP + CTP + BSP + SP + HiP + LP + AP
total        = construction × 1.05
```
