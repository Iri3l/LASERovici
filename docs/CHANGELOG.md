# Changelog

All notable changes to this project will be documented in this file.

## [v2.1.0] - Stripe Payment Gateway Integration (2026-01-01)
### Added
- **Stripe Payment Gateway**: Integrated Stripe to handle payments, providing access to multiple payment methods.
- **Dynamic Payment Methods**: The new checkout form dynamically shows available payment methods, including Apple Pay, Google Pay, and credit/debit cards, based on the user's device and browser.
- **Server-Side Payment Intent**: Created a new API route (`/api/create-payment-intent`) to securely create payment intents on the server. This improves security by preventing client-side price manipulation.
- **Stripe Dependencies**: Added `@stripe/stripe-js`, `@stripe/react-stripe-js`, and `stripe` packages.

### Changed
- **Checkout Flow**: Replaced the previous client-side-only PayPal implementation in the basket with a unified checkout form powered by Stripe Elements.
- **Architecture**: Refactored the payment process to be more secure and scalable. The front-end now fetches a `clientSecret` from the server to initialize the payment flow.

### Security
- **Enhanced Security**: Moved payment amount calculation to the server-side, mitigating risks of client-side data tampering.
- **Environment Variables**: Securely configured Stripe keys using `.env.local`, which is excluded from version control.

---

## [v2.0.1] – JSON Export/Import for Template Users (2025‑12‑21)
### Added
- **JSON Export/Import System** - Makes template suitable for non-coders:
  - **Export JSON** button: Downloads `products.json` file with all products
  - **Import JSON** button: Uploads and applies products from JSON file
  - Automatic loading from `/public/data/products.json` if file exists
  - Priority order: JSON file → localStorage → default products
- **Template User Instructions**: Clear guidance in admin panel for non-technical users
- **Product Validation**: Import validates JSON structure before applying

### Changed
- **HomeClient**: Now checks for `/data/products.json` first, then localStorage, then defaults
- **Admin Dashboard**: Added Export/Import buttons with user-friendly instructions
- **Product Storage**: Enhanced with file-based export/import capabilities

### Technical Details
- Export creates downloadable JSON file compatible with static sites
- Import validates product structure before applying changes
- JSON file in `/public/data/` takes priority over localStorage
- Perfect for template distribution - users can manage products without coding

### Template Distribution
- Non-coders can now:
  1. Export products to JSON
  2. Place file in `/public/data/` folder
  3. Commit to repository
  4. Changes are permanent and visible on live site

---

## [v2.0] – Admin Panel & Product Management (2025‑12‑21)
### Added
- **Admin Panel** (`/admin`) - Complete product management interface:
  - Secure password-protected login system with hashed authentication
  - Product CRUD operations (Create, Read, Update, Delete)
  - Image management for products (add/remove images)
  - Real-time product editing with live preview
  - "Save All Changes" button to persist modifications
  - Code generator for TypeScript product definitions
  - Image upload helper with path generation
- **Product Storage System** (`app/utils/productsStorage.ts`):
  - localStorage-based product persistence
  - Automatic loading of saved products on site load
  - Seamless fallback to default products if no saved data exists
- **Authentication System** (`app/utils/auth.ts`):
  - Secure password verification using SHA-256 hashing
  - Password never stored in plain text
  - Client-side compatible authentication
- **Admin Layout** - Separate layout for admin pages (no header/footer)
- **Documentation**:
  - `docs/ADMIN_PANEL.md` - Complete admin panel documentation
  - `docs/PROJECT_CONTEXT.md` - Project reference guide

### Changed
- **HomeClient Component**: Now loads products from localStorage if available (admin changes)
- **Product Management**: All product modifications persist across sessions
- **Security**: Admin password is hashed and never appears in codebase

### Technical Details
- Admin panel works entirely client-side (compatible with static export)
- Product changes saved to localStorage for immediate effect
- Code generator creates TypeScript-ready product definitions
- Image paths validated and normalized (uppercase .JPG extension)

---

## [v1.3] – IONOS Deployment Fix & Product Template (2025‑12‑21)
### Added
- **Product template** in `app/data/products.ts` for easy addition of new products.
- **Apache `.htaccess` configuration** for proper static file serving on IONOS:
  - Directory index configuration for `index.html`.
  - Client-side routing support (redirects to `index.html` for non-existent files).
  - MIME type configuration for JavaScript, CSS, SVG, and JSON files.
  - Compression and caching headers for better performance.
  - Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection).
- **New product**: "Customised Pandative" (Dog Tag Necklace with Viking Fehu Rune).

### Fixed
- **IONOS deployment workflow**: Changed `DEPLOYMENT_FOLDER` from `public` to `out` in `.github/workflows/LASERovici-build.yaml`.
  - Next.js static export generates HTML files in `out/` folder, not `public/`.
  - This fix ensures all generated HTML files (`index.html`, `basket.html`, etc.) are properly deployed.
- **403 Forbidden error** on IONOS deployment resolved by:
  - Correct deployment folder configuration.
  - Apache `.htaccess` file for proper file serving and routing.

### Changed
- Updated GitHub Actions workflow to use correct deployment folder.
- Merged remote workflow changes with local `.htaccess` addition.

---

### Added (2025-09-08)
- Progressive Web App (PWA) support:
  - Web app manifest with icons.
  - Service worker registration via `PWAProvider`.
  - Install button with iOS/Android-specific behaviour.

### Changed
- Cleaned `app/page.tsx` to fix duplicate default export error.
- Updated `app/layout.tsx` with manifest link, theme color, and PWA meta tags.

## [v1.2] – UX & Checkout Hardening (2025‑08‑24)
### Added
- **Lightbox gallery** for product images with arrows + pinch/scroll zoom (mobile‑friendly).
- **Collapsible product descriptions** (See more / See less).
- **Mobile‑first header**: fixed on mobile, sticky on desktop; cart badge always visible.
- **T&C gating** at checkout:
  - Inline checkbox shown above PayPal; PayPal is disabled until accepted.
  - Links to `/terms` and `/privacy` open in a new tab.
- **Cart persistence** across refresh via `localStorage` (lazy init + cross‑tab sync).

### Changed
- **Basket quantity controls**: `−` now decrements one by one; “Remove” deletes the whole line.
- Header supports **safe‑area** (`viewport-fit=cover` + `env(safe-area-inset-top)`).
- Cleaned lightbox imports using Next dynamic import; removed legacy zoom package.
- Minor UI polish (badges, hover states, accessibility labels).

### Fixed
- Image gallery not allowing swipe/next on zoomed view — now handled by the new lightbox.
- Header overlap on iOS/Android due to notch/safe‑area.
- Build/lint issues in CI: removed outdated ESLint options; TS errors in product data.

### Files / Modules
- `app/components/Header.tsx`: fixed on mobile, sticky on desktop; persistent cart badge; safe‑area padding.
- `app/components/HomeClient.tsx`: lightbox integration; description truncation; tidy imports.
- `app/basket/BasketClient.tsx`: inline T&C gate + corrected quantity handling.
- `app/context/CartContext.tsx`: localStorage persistence (lazy init) + cross‑tab storage sync.
- `app/layout.tsx`: safe‑area viewport + (if needed) mobile spacer under header.

---

## [v1.1] – CI & Auto‑deploy baseline (2025‑08‑17)
### Added
- **GitHub Actions CI** (`.github/workflows/ci.yml`) running install + build on pushes/PRs (Node 20).
- **IONOS Deploy Now** auto‑deploy from branch using static export (`next build` with `output: 'export'`).
- **README** badge for CI status.

### Changed
- `next.config.js`: `output: 'export'`, `images.unoptimized: true`.
- `package.json` scripts simplified.

### Removed / Cleanup
- Stopped tracking large/binary files; expanded `.gitignore` (archives, Word docs, videos).
