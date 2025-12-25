# Release v2.0.1 - JSON Export/Import for Template Users

## 🎯 Main Feature: Template-Ready for Non-Coders

This release makes the template perfect for distribution to non-technical users who want to manage products without coding.

## ✨ New Features

### JSON Export/Import System
- **📥 Export JSON**: Download `products.json` file with all products
- **📤 Import JSON**: Upload and apply products from JSON file
- **Auto-load from `/public/data/products.json`**: Site automatically loads products from JSON file if it exists
- **Priority order**: JSON file → localStorage → default products
- **Product validation**: Import validates JSON structure before applying

### Enhanced Admin Panel
- Export/Import buttons with clear instructions
- User-friendly guidance for template users
- No coding required for product management

## 🔧 Technical Details

- Export creates downloadable JSON file compatible with static sites
- Import validates product structure before applying changes
- JSON file in `/public/data/` takes priority over localStorage
- Perfect for template distribution - users can manage products without coding

## 📚 For Template Users (Non-Coders)

### How to Update Products:
1. Access admin panel at `/admin/login`
2. Make your changes (add/edit/delete products, manage images)
3. Click **"📥 Export JSON"** button
4. Place the downloaded `products.json` file in `/public/data/` folder
5. Commit and push to repository
6. Changes are permanent and visible on live site!

### Import Products:
1. Click **"📤 Import JSON"** button
2. Select your `products.json` file
3. Products are automatically loaded and saved

## 🐛 Bug Fixes

- Fixed workflow to ignore tags (IONOS Deploy Now works with branches only)
- Improved error handling in workflow JSON parsing
- Better fallback for invalid JSON responses

## 📝 Full Changelog

See [CHANGELOG.md](docs/CHANGELOG.md) for complete details.

