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

