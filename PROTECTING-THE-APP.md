# Protecting the app — what works and what doesn't

Short version: **a public website cannot stop a determined person from copying the page.**
The browser has to download the code to run it, so the code is always reachable.

What we have done is make copying *not worth it for a casual passer-by*, and put the
studio's ownership on the record. What actually protects the business is a different shape
of deployment, described at the end.

---

## What is in place now

| Measure | What it does | What it stops |
|---|---|---|
| `dist/` build, served from `gh-pages` | the site you share is a **minified** 162 KB single file: comments stripped, identifiers mangled, no readable structure | nobody can read the rates or the pricing logic from the page source at a glance |
| Licence banner in the HTML | copyright + "licensed for use through this site only" | gives you a written claim if someone reuses it |
| Console notice | same notice in the browser console | the one place a curious user looks first |
| Right-click / F12 / Ctrl-U / Ctrl-S disabled | friction | casual "view source" attempts |
| Source branch separate | readable code lives in `feat/handles-rate`, published artifact in `gh-pages` | the *deployed* site is not the readable source |

**What none of this stops:** anyone who opens DevTools, saves the page, or reads the
`gh-pages` branch can still recover the bundled code. Minification raises the effort from
"copy-paste" to "spend an afternoon". That is all it can do.

## The honest limits, in one paragraph

The rates and the formulas are inside the JavaScript. Anywhere the browser can price a
kitchen, someone can extract those numbers. Obfuscation only changes how long it takes.
If the numbers are the thing worth protecting, they must not be in the browser at all.

## What would actually protect it

**Move the pricing to a server.** The page becomes a form; the browser sends the
selections, the server returns the totals. Rates never leave the server.

```
browser  ──selections──▶  POST /api/price  ──▶  rates + formulas (server only)
         ◀──totals─────
```

- Copying the page then yields a form with no prices in it.
- The API can require a session, rate-limit, log abuse, and change rates without a redeploy.
- Downside: needs a host that runs Node (Render, Railway, Fly, a VPS). GitHub Pages
  cannot do it, because Pages only serves static files.

**Practical middle ground**, if hosting a server is too much right now:

1. Keep this minified build public — it works, it's shareable, and the deterrence is real
   for the 95% of people who will never open DevTools.
2. Put the *real* numbers behind a login for the studio's own quoting, and treat the public
   calculator as a lead magnet with rounded rates.
3. Register the design: a dated commit, the licence banner, and the CIN in the footer are
   what you would show if someone clones it commercially.

## Rebuilding the published site

```bash
node tools/build-dist.js      # writes dist/
```

Then publish `dist/` to the `gh-pages` branch (the deploy script used for this build does
exactly that). The source branch is untouched, so the site can always be rebuilt.
