## [v1.1] – CI & Auto-deploy baseline (2025-08-17)
### Added
- **GitHub Actions CI** (`.github/workflows/ci.yml`) running install + build on pushes/PRs (Node 20).
- **IONOS Deploy Now** auto-deploy from branch using static export (`npm run build`, output `out`).  
- **README** status badge for CI.

### Changed
- `next.config.js`: `output: 'export'` and `images.unoptimized: true`.
- `package.json` scripts simplified to `"build": "next build"`, `"start": "next start"`.
- `.gitignore` cleaned (archives, Word docs).

### Removed / Cleanup
- Replaced `next export` command with `output: 'export'`.
- Stopped tracking bulky archives (`*.zip`) and `*.docx`.

## [Upcoming v1.2] – Planned
- Apple Pay + Google Pay integration (Stripe).
- Subscription form for promotions & holiday sales.
- Improved mobile header spacing & refined menu.
- Professional font exploration for LASERovici brand.
