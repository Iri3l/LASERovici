# Admin Panel Documentation

## Overview
The admin panel allows you to manage products and images directly from the browser without needing to edit code manually.

## Access
- **URL**: `/admin/login`
- **Default Password**: `admin123` (change this in production!)

## Setting Admin Password

### For Development
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

### For Production (IONOS)
Since this is a static export, environment variables need to be set at build time. You can:
1. Set the password directly in `app/admin/login/page.tsx` (not recommended for production)
2. Or use a build-time environment variable

**Important**: Change the default password before deploying to production!

## Features

### Product Management
- **View all products**: See all products in a list
- **Add new product**: Click "Add Product" button
- **Edit product**: Click "Edit" on any product card
- **Delete product**: Click "Delete" on any product card (with confirmation)
- **Manage images**: Add or remove images for each product

### Image Management
- **Add image path**: Enter the image path manually (e.g., `/images/filename.JPG`)
- **Upload helper**: Use the image uploader to generate the correct path
  - Select an image file
  - The tool will suggest the correct path format
  - You still need to manually add the file to `/public/images/` folder
  - Use the generated path in the product

### Generate Code
- Click "Generate Code" to create the TypeScript code for all products
- Copy the generated code
- Replace the content in `app/data/products.ts` with the generated code
- Commit and push to deploy changes

## Workflow

1. **Login** at `/admin/login`
2. **Manage products**:
   - Add/edit/delete products
   - Add/remove images
3. **Generate code** when done
4. **Copy generated code** to `app/data/products.ts`
5. **Add image files** to `/public/images/` folder (if new images)
6. **Commit and push** changes to GitHub
7. **IONOS will auto-deploy** the changes

## Important Notes

### Image Files
- All images must be in `/public/images/` folder
- Use `.JPG` extension (uppercase) for consistency
- File names should match the paths in product definitions
- After adding new images, commit them to the repository

### Static Export Limitation
Since this site uses static export (`output: 'export'`), the admin panel:
- Works client-side only
- Cannot directly modify files on the server
- Generates code that you copy-paste into `products.ts`
- Cannot upload files directly (you need to add them manually)

### Security
- Change the default password before production
- The admin panel is accessible to anyone who knows the URL
- Consider adding IP restrictions or additional security measures for production

## Troubleshooting

### Can't login
- Check that `NEXT_PUBLIC_ADMIN_PASSWORD` is set correctly
- Default password is `admin123` if no env variable is set

### Images not showing
- Verify image files exist in `/public/images/`
- Check that paths use `.JPG` (uppercase) extension
- Ensure paths match exactly (case-sensitive)

### Generated code has errors
- Check for special characters in product names/descriptions
- Ensure all image paths are valid
- Verify JSON syntax is correct

## Future Improvements
- Direct file upload to repository via GitHub API
- Database integration for persistent storage
- Image optimization and resizing
- Bulk operations
- Product categories/tags

