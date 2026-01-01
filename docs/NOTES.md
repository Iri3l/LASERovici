# LASERovici Engraving – Project Notes

## Progressive Web App (PWA) Support (2025-09-08)

- Added `manifest.webmanifest` in `/public` with icons.
- Added minimal service worker `/public/sw.js` for installability.
- Created `app/components/PWAProvider.tsx` to register service worker.
- Created `app/components/InstallButton.tsx`:
  - Shows **Install App** button on Android/Chromium when `beforeinstallprompt` fires.
  - On iOS, shows instruction bubble: “Share → Add to Home Screen”.
  - Hidden once installed or running in standalone mode.
- Updated `app/layout.tsx`:
  - Linked manifest, theme color, iOS meta tags.
  - Injected `<PWAProvider />` so SW registers globally.
- Updated `app/page.tsx`:
  - Cleaned duplicate `export default`.
  - Added `<InstallButton />` above `<HomeClient />`.

⚠️ Note: On macOS desktop you usually won’t see the install button; that’s expected.

## ✅ Current Working State (2026-01-01)
- **Stripe Payment Gateway**:
  - Securely handles payments via Stripe Elements.
  - Dynamically shows Apple Pay, Google Pay, and card options.
  - Server-side payment intent creation for enhanced security.
- **Admin Panel** (`/admin`)
  - Secure login with password protection
  - Full product management (add, edit, delete)
  - Image management per product
  - Save changes to localStorage for immediate effect
  - Generate TypeScript code for permanent changes
- **Product Storage**
  - Products can be modified via admin panel
  - Changes persist in localStorage
  - Site automatically loads saved products
  - Fallback to default products if no saved data
- **Header**
  - Fixed on mobile, sticky on desktop; gradient preserved.
  - Cart icon + live badge always visible; safe‑area padding enabled for iOS.
- **Products**
  - Lightbox with arrows + zoom for each product gallery.
  - Long descriptions collapse with **See more / See less**.
- **Basket / Checkout**
  - **T&C checkbox** required before payment (inline gate).
  - Cart **persists across refresh** (localStorage) and syncs across tabs.
- **SEO / Misc**
  - Structured data (Organization, Website).
  - Static export for IONOS works with `images.unoptimized: true`.

## ✅ Recently Completed
- Apple Pay / Google Pay via Stripe

## 🚦 Next Planned (short‑list)
- Direct file upload to repository via GitHub API (for admin panel)
- Database integration for persistent product storage
- Image optimization and automatic resizing in admin panel
- Bulk product operations
- Product categories/tags management
- Newsletter signup (Mailchimp/Resend + double opt‑in)
- Mobile header micro‑copy (free shipping threshold, optional)
- Brand typography pass

## 🧩 Implementation Notes
- **Stripe Payments**:
  - Uses `stripe` and `@stripe/react-stripe-js`.
  - `BasketClient.tsx` fetches a `clientSecret` from `/api/create-payment-intent`.
  - The `Elements` provider is initialized in `BasketClient.tsx` with the `clientSecret`.
  - `CheckoutForm.tsx` contains the `<PaymentElement>` and handles submission.
  - Keys are stored in `.env.local`: `STRIPE_SECRET_KEY` (server-side only) and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- **Admin Panel**:
  - Authentication: SHA-256 hashed password verification (client-side)
  - Product storage: `localStorage` key `laserovici_products_v1`
  - Admin layout: Separate layout without header/footer (`app/admin/layout.tsx`)
  - Code generation: Creates TypeScript-ready product definitions
- **Providers** wrap the whole app so Cart context persists:
  - `app/layout.tsx` → `<Providers><Header />{children}<Footer /></Providers>`
- **Safe‑area**:
  - `metadata.viewport.viewportFit = 'cover'` (or `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`).
  - Header includes `pt-[env(safe-area-inset-top)]`.
- **Lightbox**: `yet-another-react-lightbox` with `zoom` plugin via dynamic import (SSR‑safe).
- **Cart storage key**: `laserovici.cart.v1`
- **Product storage key**: `laserovici_products_v1`
- **T&C storage key (if ever persisted)**: `laserovici.terms.acceptedAt.v1` (currently not auto‑checking by design).

## 🛠 Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Lint (if configured): `npm run lint`
- Deploy: push to `docs-foundation` → IONOS Deploy Now builds the static site.
