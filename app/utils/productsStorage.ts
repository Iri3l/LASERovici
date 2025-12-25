// Utility to handle products storage (localStorage for admin changes)
import { Product } from '../data/products';
import { products as defaultProducts } from '../data/products';

const STORAGE_KEY = 'laserovici_products_v1';

export function getProducts(): Product[] {
  if (typeof window === 'undefined') {
    return defaultProducts;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Validate that it's an array
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error reading products from localStorage:', error);
  }

  return defaultProducts;
}

export function saveProducts(products: Product[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    console.log('Products saved to localStorage');
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
}

export function clearSavedProducts(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('Saved products cleared');
  } catch (error) {
    console.error('Error clearing saved products:', error);
  }
}

// Export products to JSON file (download)
export function exportProductsToJSON(products: Product[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('Products exported to JSON file');
  } catch (error) {
    console.error('Error exporting products:', error);
    throw error;
  }
}

// Import products from JSON file
export function importProductsFromJSON(file: File): Promise<Product[]> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not available'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const products = JSON.parse(content);
        
        // Validate that it's an array
        if (!Array.isArray(products)) {
          reject(new Error('Invalid JSON format: expected an array of products'));
          return;
        }

        // Basic validation
        if (products.length === 0) {
          reject(new Error('JSON file is empty'));
          return;
        }

        // Validate product structure
        const firstProduct = products[0];
        if (!firstProduct.id || !firstProduct.name || typeof firstProduct.price !== 'number') {
          reject(new Error('Invalid product structure in JSON file'));
          return;
        }

        resolve(products);
      } catch (error) {
        reject(new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsText(file);
  });
}

// Load products from /data/products.json (for static site)
export async function loadProductsFromJSON(): Promise<Product[] | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      return null; // File doesn't exist, use defaults
    }
    const products = await response.json();
    
    // Validate
    if (Array.isArray(products) && products.length > 0) {
      return products;
    }
    return null;
  } catch (error) {
    console.error('Error loading products from JSON:', error);
    return null;
  }
}


