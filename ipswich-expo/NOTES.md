# Ipswich Expo landing page - handover notes

Mockup. Nothing has been deployed and nothing has been written to any live system.

## Confirm these before this goes anywhere

### 1. Draw size and dates

One JS constant block at the top of the `<script>` in `index.html`. Every piece of copy on the page reads
from it, including the weekday names and the word "Ten" in the terms, so nothing can desync.

```js
var PASSES            = 10;             // how many double passes
var ENTRIES_CLOSE_ISO = "2026-08-23";   // assumed
var CLOSE_TIME        = "11:59pm AEST";
var DRAW_DATE_ISO     = "2026-08-24";   // assumed
```

Dates are ISO only and the weekday is calculated, so "Sunday 23 August" can never drift out of step with
the date. Both must land before the show opens on Friday 28 August 2026. As set: entries close Sunday
23 August, drawn Monday 24 August, which gives winners four days notice.

### 2. Two facts I could not verify

- **The partner's exact trading name.** The page says "Aussie Escape Caravans" five times, which is your
  wording. The audit KB says "Aussie Escape" in one place and "Aussie Escapes" in two others. Confirm the
  registered trading name before this is public, it appears on their event page.
- **Wonderland RV's ABN.** The terms name the promoter as "Wonderland RV Pty Ltd, 46 Lara Way,
  Campbellfield VIC 3061". Australian trade-promotion practice is to include the ABN too. I did not have
  it, so it is not on the page. Add it to the terms string.

### 3. What is on the stand

The page says the 2026 range is on display and shows all four models. If only some vans travel to
Willowbank, the range section needs trimming. The section deliberately says "tell us which one you want to
see and we will have someone ready for you at the stand" rather than promising all four are walkable.

## Where the leads go

The form posts to the **existing** ActiveCampaign form 47, so automation 118 "Event: Meta/Google Ad Enquiry"
fires exactly as it does for the current ad landing page. State routing and dealer deals are unchanged.
Queensland entries route to Aussie Escape Caravans. **No ActiveCampaign changes were made or are needed.**

Form 47 has no budget field and no van field. Rather than build new fields in the AC UI, budget, van and
request type are packed into `field[86]` (Ad Source), which already lands in the deal note. A lead looks like:

```
Ipswich Expo LP (Direct) | Ticket draw + private consultation | Van: Hornet | Budget: $120,000 - $140,000
```

If the page is used behind a paid ad, keep the existing `?ad_source=` format and it gets prepended:

```
<ad_source value> | Ipswich Expo LP | Ticket draw | Van: Hornet | Budget: $120,000 - $140,000
```

## Testing it end to end

**A real submit creates a contact AND a deal AND emails the routed dealer.** Do not test casually.
For UI testing there is `test-noop.html`, which is identical except the form posts to a local dead end.
For a genuine end-to-end test, use a plus-addressed email (`piyushdiwte22+ipswichtest@gmail.com`) and clean
the contact up afterwards.

## Still outstanding

- Meta Pixel and Google Ads conversion IDs. The hooks are in place and guarded, so they no-op until the base
  snippets are added. Same as the WL1066 landing page, still the highest-impact remaining task.
- The hero video is Caravanning Queensland's own show promo (`XYQm7BmRkF8`), embedded from YouTube. It has
  burned-in titles of its own, so it is blurred to sit behind the headline as texture. If Wonderland RV
  footage from the stand is preferred later, swap `VIDEO_ID` and drop the blur in `.hero-poster` /
  `.hero-video`.
- Fonts: Aviano is the Adobe Typekit kit `ywn7byg`, loaded from the network. Gordita is self-hosted in
  `assets/fonts/`. If the kit is ever domain-locked, headings fall back to Arial Narrow.

## Files

| File | What it is |
|---|---|
| `index.html` | the deliverable |
| `assets/` | fonts, logo, four 2026 range shots, hero poster, lifestyle photo |
| `BRIEF.md` | the brief, including every verified event fact and its source |
| `test-noop.html` | UI testing copy, form posts nowhere |
| `qc-desktop.html` | screenshot helper, pins the hero height for tall captures |
