# LASERovici - Project Context & Quick Reference

This document provides essential context about the project for future development sessions.

## 📋 Project Overview
- **Name**: LASERovici Engraving
- **Type**: E-commerce shop for custom laser engraving products
- **Repository**: https://github.com/Iri3l/LASERovici
- **Deployment**: IONOS Deploy Now (https://shop.lazarovici.co.uk)
- **Branch**: `docs-foundation` (main working branch)

## 🛠 Tech Stack
- **Framework**: Next.js 14.2.31 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: TailwindCSS 3.4.17
- **React**: 18.2.0
- **Payment**: Stripe (Apple Pay, Google Pay, Cards) & PayPal
- **Build**: Static export (`output: 'export'` in next.config.js)
- **Node Version**: 22.x (for IONOS builds)

## 📁 Key Project Structure
```
/app
  /api/create-payment-intent - Server-side Stripe payment intent creation
  /components      - React components (Header, CheckoutForm, etc.)
  /data
    products.ts    - Product catalog (array of Product objects)
  /context
    CartContext.tsx - Shopping cart state management (localStorage)
  /basket          - Basket/checkout pages
  /privacy, /terms, /shipping, /refunds - Static pages

/public
  /images          - Product images (⚠️ Note: Use .JPG extension, not .jpg)
  .htaccess        - Apache configuration for IONOS deployment
  manifest.webmanifest - PWA manifest
  sw.js            - Service worker

/.github/workflows
  LASERovici-build.yaml - IONOS build workflow (⚠️ DEPLOYMENT_FOLDER: out)
  ci.yml           - CI checks on push/PR

/docs
  CHANGELOG.md     - Version history
  NOTES.md         - Current working state
  ROADMAP.md       - Future features
```

## ⚠️ Important Configuration Notes

### Image File Extensions
- **CRITICAL**: All image files in `/public/images/` use `.JPG` (uppercase) extension
- Product definitions in `app/data/products.ts` must match exact case: `.JPG` not `.jpg`
- Case-sensitive file systems (Linux/IONOS) will return 404 if case doesn't match

### IONOS Deployment
- **Deployment folder**: `out/` (not `public/`)
- Next.js static export generates HTML files in `out/` folder
- `.htaccess` file in `public/` is automatically copied to `out/` during build
- Workflow file: `.github/workflows/LASERovici-build.yaml`
- Project ID: `1d4290bb-1634-4dd1-9de6-8a5e55b910ba`

### Build Configuration
- `next.config.js`: `output: 'export'` for static site generation
- `images: { unoptimized: true }` required for static export
- Build command: `npm run build`
- Output directory: `out/`

## 🔧 Common Issues & Solutions

### Issue: 403 Forbidden on IONOS
**Solution**: 
- Ensure `.htaccess` exists in `public/` folder
- Verify `DEPLOYMENT_FOLDER: out` in build workflow
- Check that HTML files are generated in `out/` folder

### Issue: Images not displaying
**Solution**:
- Check file extension case: must be `.JPG` (uppercase) in both file system and code
- Verify images exist in `/public/images/` folder
- Ensure paths in `products.ts` match exact file names

### Issue: Build/deployment errors
**Solution**:
- Verify Node.js version: 22.x for IONOS builds
- Check that `npm ci` runs successfully
- Ensure all dependencies are in `package.json`

## 📦 Product Management

### Adding New Products
1. Add product object to `app/data/products.ts` array
2. Use template at bottom of file (currently commented)
3. Ensure images are in `/public/images/` with `.JPG` extension
4. Follow existing product structure:
   ```typescript
   {
     id: number,
     name: string,
     price: number,
     images: string[],  // Paths like "/images/filename.JPG"
     description: string,
     favorites?: number
   }
   ```

### Current Products (as of 2025-12-21)
1. Engraved Aluminium Business Card - £3.40
2. Dog Tag Stainless Steel - £6.50
3. Selfie :-) - £5.00
4. Engraved RFID (pre-order) - £30.00
5. Personalised knives - £30.00
6. Customised Pandative - £15.00

## 🔄 Git Workflow
- **Main branch**: `docs-foundation`
- **Remote**: `origin` → `https://github.com/Iri3l/LASERovici.git`
- **Deployment**: Auto-deploys on push to `docs-foundation` branch

## 📝 Recent Changes (2026-01-01)
- Integrated Stripe payment gateway.
- Added support for Apple Pay, Google Pay, and card payments.
- Refactored checkout to use a secure, server-side payment flow.

## 🚀 Development Commands
```bash
npm install      # Install dependencies
npm run dev      # Start development server (localhost:3000)
npm run build    # Build static site (outputs to /out)
npm run lint     # Run ESLint
```

## 📚 Documentation Files
- `README.md` - Project overview and setup
- `docs/CHANGELOG.md` - Version history and changes
- `docs/NOTES.md` - Current working state and next steps
- `docs/ROADMAP.md` - Future features and ideas
- `docs/PROJECT_CONTEXT.md` - This file (quick reference)

## 💡 Key Features
- PWA support (installable app)
- Shopping cart with localStorage persistence
- Stripe & PayPal checkout integration (Apple Pay, Google Pay, Cards)
- Lightbox gallery for product images
- Responsive design (mobile-first)
- SEO optimized (metadata, Open Graph, structured data)

---
*Last updated: 2026-01-01*

