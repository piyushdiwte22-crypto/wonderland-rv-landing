# Ipswich Expo landing page - handover notes

Mockup. Nothing has been deployed and nothing has been written to any live system.

## Confirm these three before this goes anywhere

They are all JS constants in one block at the top of the `<script>` in `index.html`. Edit there only, every
piece of copy on the page reads from them.

```js
var PASSES        = 10;                                    // how many double passes
var PASSES_WORD   = "Ten";                                 // must match PASSES
var ENTRIES_CLOSE = "Sunday 24 August 2026, 11:59pm AEST"; // assumed
var CLOSE_SHORT   = "Sunday 24 August 2026";               // must match ENTRIES_CLOSE
var DRAW_DATE     = "Monday 25 August 2026";               // assumed
```

I picked those dates so winners get their passes before the show opens on Friday 28 August. If you draw
later, winners have less notice.

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
