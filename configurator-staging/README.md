# Wonderland RV configurator — staging sandbox

A static, self-contained copy of the live `/build-your-caravan` configurator for safe testing.
**Nothing here touches the live website.** Captured 7 Aug 2026.

Live sandbox: <https://piyushdiwte22-crypto.github.io/wonderland-rv-landing/configurator-staging/>

---

## What you can test here

The configurator's interaction logic is entirely client-side (no AJAX calls anywhere in the script), so most of it runs faithfully:

- every layout / size / bed / bunk selection path
- pricing across all four ranges, live from real captured data
- grey-out and conditional rules
- images, previews, styling, responsive behaviour

## What does not work (by design)

| Not working | Why |
|---|---|
| Form submission | Blocked deliberately. The action is neutered and a global handler cancels every submit. |
| Page nav (natively) | Gravity Forms normally does a server round-trip to change page. `staging-shim.js` replaces that by toggling the 14 page divs client-side, so Next/Previous work here. |
| CSV import / admin pages | Those are PHP + MySQL. GitHub Pages is static only. |
| Saving a build | Needs the WordPress backend. |

Analytics (GTM, GA4, Meta Pixel) have been **stripped** so sandbox traffic never lands in the real reports.
The page is also `noindex,nofollow`.

---

## Files

| File | Editable? | What it is |
|---|---|---|
| `index.html` | yes | Snapshot of the live page. Gravity Form markup, all inline config. |
| `configurator-script.js` | **yes** | The real logic, 2,803 lines. **Edit this to test changes.** |
| `configurator-stylesheet.css` | **yes** | The real styling, 1,586 lines. Loaded last so it overrides the bundle. |
| `custom-script.js` / `custom-stylesheet.css` | yes | Site-wide extras |
| `data.js` | **yes** | The four data blobs — edit to test different pricing or layouts |
| `data.json` | reference | Same data, as JSON |
| `form.html` | reference | The Gravity Form markup on its own |
| `staging-shim.js` | sandbox only | Makes Next/Previous work without a server. **Not on the live site.** |

Everything else (jQuery, Gravity Forms, theme CSS, images) loads from the live site, so the sandbox
stays small and looks identical. That does mean **you need to be online**, and if the agency
redeploys, those shared parts change here too.

## How to test a change

1. Edit `configurator-script.js`, `configurator-stylesheet.css`, or `data.js`
2. Commit and push
3. Wait ~1 minute for GitHub Pages, then hard-refresh the sandbox URL

Jump straight to a step from the browser console: `wlStep(7)`.

To run it locally instead: `python3 -m http.server 8000` in this folder, then open
`http://localhost:8000`. Opening `index.html` directly with `file://` will not work.

---

## The data

Captured live from the page, exactly as `wp_localize_script` injects it:

| Blob | Size | Holds |
|---|---|---|
| `caravanData` | 55 KB | layouts × per-range pricing |
| `caravanUpgrades` | 60 KB | optional extras |
| `standardInclusions` | 18 KB | base spec per model |
| `caravanPreview` | 24 KB | preview image paths |

On the live site these come from three CSV-managed database tables, editable in wp-admin under
Configurator, Standard Inclusions and Upgrades. Here they are a frozen snapshot — change `data.js`
to test different values.

## ⚠️ Known defect in the live plugin

`b2me-custom-scripts.php` line 80 reflects a URL parameter into the page unescaped:

```php
echo '<img src="' . $_GET['image'] . '">';   // reflected XSS
```

The fix is `esc_url()`. The PHP is **deliberately not included in this repo** — it isn't publicly
served by the live site, and publishing it would expose that hole. It stays in the local audit
knowledge base. There are also no nonces on the CSV parser forms.

Full architecture notes: `Wonderland RV - System Audit/02-website/04-content-model-and-configurator.md`
and `10-configurator-data-layer.md`.
