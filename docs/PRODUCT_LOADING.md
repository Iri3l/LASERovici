# Product Loading Priority

## How Products Are Loaded

The site loads products in the following priority order:

1. **`products.ts` (Default - ALWAYS used for developers)**
   - This is the source of truth for your code changes
   - When you modify `app/data/products.ts` and push, changes are immediately visible
   - Used in development and production unless JSON file exists

2. **`/public/data/products.json` (Optional - for template users)**
   - Only used if the file exists
   - Allows non-coders to manage products without editing code
   - If this file exists, it overrides `products.ts`
   - To use `products.ts` again, simply delete this file

3. **localStorage (Temporary - admin panel preview only)**
   - Only used in admin panel for preview
   - NOT used on the main site in production
   - Changes are temporary and not persisted

## For Developers (You)

**To ensure your code changes are used:**

1. Make sure `/public/data/products.json` does NOT exist
2. Clear browser localStorage if you've used admin panel:
   - Open browser console
   - Run: `localStorage.removeItem('laserovici_products_v1')`
3. Modify `app/data/products.ts`
4. Commit and push
5. Changes will be live after deployment

## For Template Users (Non-Coders)

**To manage products without coding:**

1. Use admin panel at `/admin`
2. Make your changes
3. Click "📥 Export JSON"
4. Place `products.json` in `/public/data/` folder
5. Commit and push
6. Site will use JSON file instead of `products.ts`

**To go back to code-based products:**
- Delete `/public/data/products.json`
- Site will use `products.ts` again

## Troubleshooting

### My code changes in products.ts don't show up

**Solution:**
1. Check if `/public/data/products.json` exists - if yes, delete it
2. Clear localStorage: `localStorage.removeItem('laserovici_products_v1')`
3. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Verify build includes your changes

### I want to use JSON file for template users

**Solution:**
1. Export products from admin panel
2. Place `products.json` in `/public/data/` folder
3. Commit and push
4. Site will use JSON file

### I want to go back to products.ts

**Solution:**
1. Delete `/public/data/products.json`
2. Commit and push
3. Site will use `products.ts` again



