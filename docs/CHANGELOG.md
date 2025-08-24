# Changelog

All notable changes to this project are documented here.
This project loosely follows Keep a Changelog and semantic versioning.

---

## [Unreleased] – v1.2 (In Progress)
### Added
- Product gallery **lightbox with arrows + zoom** using `yet-another-react-lightbox` (keyboard + swipe).
- Product card **“See more / See less”** toggle for long descriptions.

### Changed
- Updated product catalog (new images, refreshed descriptions, adjusted prices).
- New product assets under `public/images/` (ensure leading slash paths in code).

### Planned
- Apple Pay + Google Pay (Stripe).
- Newsletter subscription form (footer) for promos & holiday sales.
- Improved mobile header spacing & refined menu.
- Professional font exploration for LASERovici brand.

---
## [v1.1.3] – Cart fixes & data cleanup (2025-08-24)
### Fixed
- **Basket decrement button** now decreases quantity by 1 instead of removing the whole line.
- Added `removeItem()` in CartContext so “Remove” deletes a product line, while `removeFromCart()` decrements quantity.
- Cleaned `products.ts` syntax (properly closed array, no stray braces); build now passes locally & in CI.

### Changed
- Basket UI wired to new `removeItem()` + `removeFromCart(id, qty)`.

## [v1.1.2] – Frontend polish & build stability (2025-08-24)
### Fixed
- **TypeScript compile**: cleaned `app/data/products.ts` (proper array termination; removed duplicate keys).
- **Build error**: switched lightbox plugin imports to **regular imports** (plugins aren’t React components).
- **ESLint during build**: added `.eslintrc.json` and `.eslintignore` to stop interactive prompts in CI.

### Changed
- Homepage product cards now show **short description by default** with a toggle to expand/collapse.

### Dev / CI
- Enabled linting in CI without prompts (`eslint` installed as dev dependency).
- Kept Next.js static export (`output: 'export'`, `images.unoptimized: true`) aligned with IONOS Deploy Now.

---

## [v1.1.1] – Maintenance & CI/Deploy Alignment (2025-08-24)
### Changed
- Static export alignment (`next.config.js -> output: 'export'`) with `npm run build` (no `next export`).
- CI workflow simplified to **install + build** (Node 20).
- IONOS Deploy Now: build `npm ci && npm run build`, output `out`.

### Fixed
- Removed >100 MB video from history via `git filter-repo`; added ignores for large media.

### Docs
- `NOTES.md` marked **v1.1 live**; polished changelog.

---

## [v1.1] – CI & Auto‑deploy Baseline (2025-08-17)
### Added
- GitHub Actions CI (`.github/workflows/ci.yml`) on pushes/PRs (Node 20).
- IONOS Deploy Now auto‑deploy (static export).
- README CI status badge.

### Changed
- `next.config.js`: `output: 'export'`, `images.unoptimized: true`.
- `package.json` scripts: `"build": "next build"`, `"start": "next start"`.
- `.gitignore` cleaned (archives, Word docs).

### Removed / Cleanup
- Replaced `next export` command with `output: 'export'`.
- Stopped tracking bulky archives (`*.zip`) and `*.docx`.
