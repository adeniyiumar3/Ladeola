# La'deola Cakes_n_Confectionery — site files

A single-page site for La'deola: browse the menu, build an order, confirm on WhatsApp — no login, no payment gateway.

## What's pulled from your brand assets
- **Name & tagline**: "La'deola Cakes_n_Confectionery" and "...savoring moments with beautiful patisserie treats" throughout the header, hero, footer and structured data.
- **Colors**: hot pink (`#E6178C`) and gold (`#C9971F`) on a soft cream/white base, sampled from your Eid menu and logo — with matching dark-mode variants.
- **Contact info**: WhatsApp `09018603218` (used as `2349018603218` for the `wa.me` link), Instagram `@ladeola_cakes_n_confectionery` (linked in the header and footer), and location "Oshodi, Lagos state."
- **Real menu**, pulled from your two flyers:
  - *Celebration Packages* — Juwayriyah's (₦15,000), Hind's (₦25,000), Nusaybah's (₦34,000)
  - *Cupcakes* — Vanilla, Red Velvet, Chocolate (packs of 6)
  - *Banana Bread* — Plain, Coconut, Chocolate, Choc Chunk
  - *Savoury* — Meat Pie
  - *Drinks* — Yoghurt Drink (Plain Sweetened / Strawberry)

## Before you deploy
1. **Double-check the WhatsApp number.** It's set to `2349018603218` (from `09018603218`) in `index.html`, inside the `WHATSAPP_NUMBER` constant near the top of the `<script>` block.
2. **Swap in real photos (optional).** Products currently use lightweight illustrated placeholders (SVG, no external hosting needed) so the file works anywhere with no broken links. Replace the `img:` values in the `PRODUCTS` array with real photos whenever you have them.
3. **Update prices or add items.** Edit the `PRODUCTS` array — everything else (cards, search, filters, cart, WhatsApp message) updates automatically.
4. **Host all three files together** (`index.html`, `manifest.json`, `sw.js`) plus `placeholder.jpeg` in the same folder so the manifest and service worker resolve correctly.

## What's implemented
- **WhatsApp-only checkout** — cart → checkout form → auto-generated order message → opens `wa.me` with the message pre-filled, in the "New Order" format you specified (phone, delivery method/address, event date, itemised list with flavour/inscription, special instructions, estimated total).
- **Floating WhatsApp button** for general chat, separate from the order flow.
- **Sticky order summary** on desktop; a tappable bottom bar on mobile.
- **Search** (debounced) and **category filtering** (Packages, Cupcakes, Banana Bread, Savoury, Drinks).
- **Recently viewed** strip, remembered for the session (and across visits if the storage API is available).
- **Smooth scroll**, scroll-triggered reveal animations, a page-load animation, and a back-to-top button.
- **Lazy-loaded images** (`loading="lazy"` on every product image).
- **Dark mode** toggle, respecting system preference on first visit.
- **SEO basics**: descriptive `<title>`/meta description, Open Graph tags, `Bakery` structured data (JSON-LD) with your Oshodi address and Instagram, semantic landmarks, alt text.
- **PWA scaffolding**: `manifest.json` + `sw.js` (app-shell caching, offline fallback) + a pink cupcake-mark SVG icon.

## Honest limitations to know about
- **PWA installability and full SEO indexing only work once this is hosted on a real domain over HTTPS.** In this chat preview the files are static and not crawlable/installable — that's normal, not a bug.
- The `icon.svg` is a simplified cupcake mark in your colors, not your exact logo artwork. For the widest device/OS support, add real PNG icons (192×192 and 512×512) and reference them in `manifest.json`.
- The Eid packages are shown year-round with an "Eid Special" tag rather than tied to a specific Ramadan date — update or remove that tag whenever it suits your calendar.
- There's no backend: the "cart" lives in the browser only until the order is sent — WhatsApp is the actual point of confirmation, exactly as you asked for.
