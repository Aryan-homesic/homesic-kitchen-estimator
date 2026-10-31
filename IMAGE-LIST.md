# Image set — one hand-sketch theme, all 50 files generated

Every image in the app is regenerated in a single style so the whole product reads as
one illustrated set. Filenames are fixed: drop the files into `assets/` with these names
and nothing else changes.

---

## The theme

**Hand-drawn interior sketch, pastel pink on white.** Loose ink linework, flat pastel
washes, paper grain, no photography, no text in the image.

### Master prompt — prefix to every image

> Hand-drawn interior sketch on warm white paper. Loose confident ink linework in warm
> charcoal `#4A3B42`, around 2 px at 1400 px wide, slightly wobbly rather than geometric.
> Flat pastel washes only, no gradients and no photographic texture: blush `#FCE4EA`,
> rose `#E8A9B5`, deeper rose `#C4708A` for accents, cream `#FFF8F7` for paper. Soft
> pencil hatching for shadow, a little paper grain. No text, no lettering, no numbers,
> no watermark, no logo. Straight-on eye-level view, subject centred with headroom,
> generous white space around the edges. Editorial cookbook illustration, calm and warm.

### Palette — derived from the set and used by the UI

| Token | Hex | Where it lives |
|---|---|---|
| Paper | `#FFF8F7` | page background, image paper |
| Paper light | `#FFFDFC` | quote card |
| Card white | `#FFFFFF` | option cards, dock |
| Blush wash | `#FBEFF1` | image fills, empty states |
| Blush deep | `#FCE4EA` | first payment chip, tints |
| Rose | `#E8A9B5` | fills, primary buttons |
| Rose deep | `#C4708A` | prices, headings accent, links |
| Ink | `#453A40` | linework, body text |
| Ink soft | `#6B5A61` | secondary text |
| Muted | `#A08E94` | captions, hints |
| Hairline | `#F0E1E4` | dividers |
| Hairline strong | `#E4CDD3` | card borders, controls |
| Sage | `#8FB3A2` | success only |
| Clay | `#C97C6B` | warnings only |

Rules: linework is always ink; fills are always blush/rose; never introduce a second
hue family. Shadows are pencil hatch, never a soft photo shadow.

---

## File list — all generate

Ratio is what the UI crops to; give the generator at least the long edge listed
(1500 px is a safe default for every file). Card images crop to a 4:3 banner anchored
50% 38%, so keep the subject centred with headroom.

### 1 · Start

| File | Prompt | Ratio |
|---|---|---|
| `assets/hero.jpg` | A three-wall cream kitchen seen from the doorway, pencil lines on white, blush pink cabinet washes, a small plant and bowl on the counter | 16:9 |
| `assets/hero-phone.jpg` | Same kitchen, vertical composition, cabinets filling the upper two thirds, counter along the bottom | 3:4 |

### 2 · Storage

| File | Prompt | Ratio |
|---|---|---|
| `assets/storage/hero.jpg` | Wide kitchen elevation, all three unit types visible, loose hatch shadows | 2:1 |
| `assets/storage/unit-base.jpg` | Base run only: three drawer stacks under a counter, open floor below, no wall units | 4:3 |
| `assets/storage/unit-wall.jpg` | Wall units only: two shallow cabinets floating on a plain backsplash | 4:3 |
| `assets/storage/unit-loft.jpg` | Loft band above wall units with two storage boxes, ceiling line visible | 4:3 |
| `assets/storage/unit-tall.jpg` | Tall pantry unit with an oven and microwave stacked, floor to ceiling | 4:3 |
| `assets/storage/unit-fridge.jpg` | Fridge bay: built-in fridge with panels closing the gap above | 4:3 |

### 3 · Build — finishes and boards

| File | Prompt | Ratio |
|---|---|---|
| `assets/finishes/laminate.jpg` | Matte laminate shutters in warm oak wash, three doors, simple profile | 4:3 |
| `assets/finishes/acrylic.jpg` | Gloss acrylic shutters in pale pink, one door catching a white highlight streak | 4:3 |
| `assets/finishes/membrane.jpg` | Matte membrane fronts in cream, handleless, thin shadow gap | 4:3 |
| `assets/finishes/pu.jpg` | PU lacquer in deeper rose, satin sheen, single wide drawer front | 4:3 |
| `assets/finishes/veneer.jpg` | Veneer grain close-up, pencil hatching following the grain | 4:3 |
| `assets/finishes/rattan.jpg` | Rattan cane front, woven cross-hatch pattern, blush wash behind | 4:3 |
| `assets/board-hdhmr-board.jpg` | Stack of three boards in section, edge grain visible, ink outlines | 4:3 |
| `assets/board-bwr-plywood.jpg` | Plywood stack, layered edges, one board leaning | 4:3 |
| `assets/board-bwp-marine-plywood.jpg` | Marine ply stack with a subtle waterproof droplet motif drawn beside it | 4:3 |

### 4 · Handles — five, each visibly different

| File | Prompt | Ratio |
|---|---|---|
| `assets/handles/profile.jpg` | G-profile channel running along the top edge of a shutter, drawn in section | 1:1 |
| `assets/handles/standard.jpg` | One short slim pull handle centred on a flat shutter | 1:1 |
| `assets/handles/premium.jpg` | A longer, thicker bar pull with two posts, deeper rose fill | 1:1 |
| `assets/handles/designer.jpg` | Sculptural round knob with a fine ring detail, drawn larger than life | 1:1 |
| `assets/handles/groove.jpg` | Recessed finger groove cut into a shutter edge, no hardware visible | 1:1 |

### 5 · Surfaces

| File | Prompt | Ratio |
|---|---|---|
| `assets/card-counter-granite.jpg` | Slab of speckled granite in section, speckles as pencil dots | 4:3 |
| `assets/card-counter-quartz.jpg` | Pale quartz slab with two thin vein lines | 4:3 |
| `assets/card-counter-install.jpg` | Slab resting on two trestles with a clamp and measuring tape, no cabinets | 4:3 |
| `assets/card-counter-existing.jpg` | Old worktop with a sink cut-out and a chipped front edge | 4:3 |
| `assets/backsplash-tiles.jpg` | Brick-bond tile splashback behind a counter, grout lines in ink | 4:3 |
| `assets/backsplash-existing.jpg` | Plain painted wall above a counter, one hairline crack | 4:3 |

### 6 · Sink and tap

| File | Prompt | Ratio |
|---|---|---|
| `assets/sinks/material-ss.jpg` | Brushed stainless texture, fine parallel ink hatching | 1:1 |
| `assets/sinks/material-granite.jpg` | Black composite texture, dotted speckle on a dark wash | 1:1 |
| `assets/sinks/material-quartz.jpg` | White quartz texture, sparse pencil fleck | 1:1 |
| `assets/sinks/material-ceramic.jpg` | Cream glaze, smooth wash with one highlight curve | 1:1 |
| `assets/sinks/type-single.jpg` | Single bowl from above with a tap, water line drawn | 4:3 |
| `assets/sinks/type-double.jpg` | Double bowl from above, two equal basins | 4:3 |
| `assets/sinks/type-doubletray.jpg` | Double bowl with a drainboard, chopping board and colander resting on it | 4:3 |
| `assets/sinks/type-tray.jpg` | Worktop sink with a sloped draining board of fluted lines | 4:3 |
| `assets/faucets/standard.jpg` | Single-lever mixer in profile, slim body | 1:1 |
| `assets/faucets/premium.jpg` | Two-handle mixer, brass body, cross handles | 1:1 |
| `assets/faucets/designer.jpg` | Pull-out spray tap with a coiled hose detail | 1:1 |

### 7 · Hinges

| File | Prompt | Ratio |
|---|---|---|
| `assets/hardware-soft-close.jpg` | Cup hinge on an open door drawn at an angle, damper cylinder visible | 4:3 |
| `assets/hardware-push-open.jpg` | Handleless door with a fingertip pressing the corner, motion lines | 4:3 |
| `assets/hardware-hettich.jpg` | Drawer pulled open in three-quarter view, side runner visible | 4:3 |
| `assets/hardware-moda.jpg` | Same drawer view, different runner detail and a rose wash handle | 4:3 |
| `assets/hardware-doorset.jpg` | Same drawer view, heavier box profile, deeper hatch shadow | 4:3 |

### 8 · Lighting

| File | Prompt | Ratio |
|---|---|---|
| `assets/lighting-standard.jpg` | Cabinet doors open with soft light inside, room otherwise dim, light rays as hatch | 4:3 |
| `assets/lighting-premium.jpg` | Under-cabinet strip along a shelf, a socket plate beside it | 4:3 |
| `assets/lighting-elite.jpg` | Concealed ceiling cove washing the wall, two pendant spots | 4:3 |

### 9 · Drawers

| File | Prompt | Ratio |
|---|---|---|
| `assets/drawers-normal.jpg` | Drawer pulled out, plain channel runner visible, empty interior | 4:3 |
| `assets/drawers-jali.jpg` | Wire-basket drawer with a few utensils sketched inside | 4:3 |
| `assets/drawers-tandem.jpg` | Deep drawer open with stacked crockery, soft-close runner detail | 4:3 |

### 10 · Shape plans

| File | Prompt | Ratio |
|---|---|---|
| `assets/shape/straight.jpg` | Top-down plan, one straight run, sink and hob marked as simple shapes | 1:1 |
| `assets/shape/parallel.jpg` | Top-down plan, two facing runs | 1:1 |
| `assets/shape/lshape.jpg` | Top-down plan, L-shaped run | 1:1 |
| `assets/shape/ushape.jpg` | Top-down plan, U-shaped run | 1:1 |

### 11 · Brand

| File | Prompt | Format |
|---|---|---|
| `assets/logo-mark.png` | The Homesic mark redrawn as a single-line sketch in ink on transparent | transparent PNG, 600 × 520 |
| `assets/logo-full.png` | Mark plus wordmark, single-line sketch, transparent | transparent PNG, 600 × 520 |

---

## How to deliver

1. Generate at 1500 px long edge minimum, sRGB JPEG (PNG for the two logos).
2. Keep the filename exactly as listed — case and folder matter.
3. Drop into `assets/` in this repo, run `node server.js`, open `?cb=1` to bust the cache.
4. No crop is needed: the UI crops to 4:3 itself.

## What the UI already does with them

The interface is on the same palette: paper `#FFF8F7`, ink `#453A40`, rose `#E8A9B5`,
deep rose `#C4708A`, hairlines `#F0E1E4`. Photos sit in white cards with a 16 px radius,
a 4:3 banner crop, and a rose tick when selected — so a sketch with generous white space
reads as part of the page rather than a picture dropped in.
