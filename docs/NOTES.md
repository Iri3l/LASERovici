# LASERovici Engraving – Project Notes

## ✅ Current Working State (2025‑08‑24)
- **Header**
  - Fixed on mobile, sticky on desktop; gradient preserved.
  - Cart icon + live badge always visible; safe‑area padding enabled for iOS.
- **Products**
  - Lightbox with arrows + zoom for each product gallery.
  - Long descriptions collapse with **See more / See less**.
- **Basket / Checkout**
  - Quantity: `+`/`−` adjust by 1; **Remove** clears the line.
  - **T&C checkbox** required before PayPal (inline gate); links to Terms & Privacy work.
  - Cart **persists across refresh** (localStorage) and syncs across tabs.
- **SEO / Misc**
  - Structured data (Organization, Website).
  - Static export for IONOS works with `images.unoptimized: true`.

## 🚦 Next Planned (short‑list)
- Apple Pay / Google Pay via Stripe.
- Newsletter signup (Mailchimp/Resend + double opt‑in).
- Mobile header micro‑copy (free shipping threshold, optional).
- Brand typography pass.

## 🧩 Implementation Notes
- **Providers** wrap the whole app so Cart context persists:
  - `app/layout.tsx` → `<Providers><Header />{children}<Footer /></Providers>`
- **Safe‑area**:
  - `metadata.viewport.viewportFit = 'cover'` (or `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`).
  - Header includes `pt-[env(safe-area-inset-top)]`.
- **Lightbox**: `yet-another-react-lightbox` with `zoom` plugin via dynamic import (SSR‑safe).
- **Cart storage key**: `laserovici.cart.v1`
- **T&C storage key (if ever persisted)**: `laserovici.terms.acceptedAt.v1` (currently not auto‑checking by design).

## 🛠 Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint (if configured): `npm run lint`
- Deploy: push to `docs-foundation` → IONOS Deploy Now builds the static site.
