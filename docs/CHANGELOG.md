# Changelog

All notable changes to this project are documented here.  
This project loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and semantic versioning.

---

## [Unreleased] – v1.2 (In Progress)
### Added
- Product gallery **lightbox with arrows + zoom** using `yet-another-react-lightbox` (keyboard + swipe support).
- Product card **“See more / See less”** toggle for long descriptions.

### Changed
- Updated product catalog with refreshed descriptions, prices, and new images.
- New product assets added under `public/products/`.

### Planned
- Apple Pay + Google Pay (Stripe).
- Newsletter subscription form (footer) for promos & holiday sales.
- Improved mobile header spacing & refined menu.
- Professional font exploration for LASERovici brand.

---

## [v1.1.1] – Maintenance & CI/Deploy Alignment (2025-08-24)
### Changed
- **Next.js static export alignment:** switched fully to `next.config.js -> output: 'export'` and build via `npm run build` (no `next export` command).
- **CI workflow simplified:** GitHub Actions now runs **install + build** (Node 20) for reliability on pushes/PRs.
- **IONOS Deploy Now config:** build command updated to `npm ci && npm run build`, output path `out`.

### Fixed
- Removed a >100 MB committed video (`public/images/IMG_5326.MOV`) from history using `git filter-repo`; resolves GitHub push rejection.
- Added ignores for large media (`*.mov`, `*.mp4`, `*.zip`, etc.) to prevent future repo bloat.

### Docs
- `NOTES.md` updated to mark **v1.1 live** and record current workflow (CI + Deploy Now).
- `CHANGELOG.md` consolidated and polished.

---

## [v1.1] – CI & Auto‑deploy Baseline (2025-08-17)
### Added
- **GitHub Actions CI** (`.github/workflows/ci.yml`) running install + build on pushes/PRs (Node 20).
- **IONOS Deploy Now** auto‑deploy from branch using static export (`npm run build`, output `out`).
- **README** status badge for CI.

### Changed
- `next.config.js`: `output: 'export'` and `images.unoptimized: true`.
- `package.json` scripts simplified to `"build": "next build"`, `"start": "next start"`.
- `.gitignore` cleaned (archives, Word docs).

### Removed / Cleanup
- Replaced `next export` command with `output: 'export'`.
- Stopped tracking bulky archives (`*.zip`) and `*.docx`.
