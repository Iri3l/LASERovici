# Changelog

All notable changes to this project will be documented in this file.

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
