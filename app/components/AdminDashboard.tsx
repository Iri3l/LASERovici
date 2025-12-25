'use client';

import { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { products as initialProducts } from '../data/products';
import ImageUploader from './ImageUploader';
import { saveProducts, getProducts, exportProductsToJSON, importProductsFromJSON } from '../utils/productsStorage';

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    // Load from localStorage if available, otherwise use default
    const savedProducts = getProducts();
    setProducts(savedProducts);
  }, []);

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: '',
      price: 0,
      images: [],
      description: '',
      favorites: 0,
    };
    setEditingProduct(newProduct);
    setShowAddForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setShowAddForm(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id && products.find(p => p.id === product.id)) {
      // Update existing
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // Add new
      setProducts([...products, product]);
    }
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const handleAddImage = (productId: number, imagePath: string) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, images: [...p.images, imagePath] }
        : p
    ));
  };

  const handleRemoveImage = (productId: number, imageIndex: number) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, images: p.images.filter((_, i) => i !== imageIndex) }
        : p
    ));
  };

  const handleExportJSON = () => {
    try {
      exportProductsToJSON(products);
      alert('Products exported to products.json! Place this file in /public/data/ folder and commit to make changes permanent.');
    } catch (error) {
      alert('Error exporting products: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    try {
      const importedProducts = await importProductsFromJSON(file);
      setProducts(importedProducts);
      saveProducts(importedProducts);
      alert(`Successfully imported ${importedProducts.length} products!`);
      // Reset file input
      e.target.value = '';
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setImportError(errorMessage);
      alert('Error importing products: ' + errorMessage);
      e.target.value = '';
    }
  };

  const generateProductsCode = () => {
    const code = `// app/data/products.ts

export type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  favorites?: number;
};

export const products: Product[] = [
${products.map(p => {
      const imagesStr = p.images.map(img => `"${img}"`).join(', ');
      // Escape backticks in description
      const escapedDesc = p.description.replace(/`/g, '\\`').replace(/\$/g, '\\$');
      return `  {
    id: ${p.id},
    name: "${p.name.replace(/"/g, '\\"')}",
    price: ${p.price},
    images: [${imagesStr}],
    description: \`${escapedDesc}\`,
    favorites: ${p.favorites || 0},
  }`;
    }).join(',\n')}
];`;
    setGeneratedCode(code);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Products Management</h2>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => {
                saveProducts(products);
                alert('All changes saved to localStorage! They will be visible on the main site.');
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
            >
              💾 Save All Changes
            </button>
            <button
              onClick={handleExportJSON}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
              title="Export products to JSON file for permanent storage"
            >
              📥 Export JSON
            </button>
            <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer">
              📤 Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
            <button
              onClick={generateProductsCode}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Generate Code
            </button>
            <button
              onClick={handleAddProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </div>
        {importError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            Import Error: {importError}
          </div>
        )}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          <strong>💡 Template Users:</strong> Use "Export JSON" to download products.json, place it in <code className="bg-blue-100 px-1 rounded">/public/data/</code> folder, then commit. This makes changes permanent without coding!
        </div>
      </div>

      {generatedCode && (
        <div className="mb-6 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white">Generated Code (copy this to products.ts):</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedCode);
                alert('Code copied to clipboard!');
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
            >
              Copy
            </button>
          </div>
          <pre className="whitespace-pre-wrap">{generatedCode}</pre>
        </div>
      )}

      {showAddForm && editingProduct && (
        <ProductForm
          product={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setShowAddForm(false);
            setEditingProduct(null);
          }}
          isEditing={!!products.find(p => p.id === editingProduct.id)}
        />
      )}

      <div className="grid gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
            onAddImage={handleAddImage}
            onRemoveImage={handleRemoveImage}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onEdit,
  onDelete,
  onAddImage,
  onRemoveImage,
}: {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onAddImage: (productId: number, imagePath: string) => void;
  onRemoveImage: (productId: number, imageIndex: number) => void;
}) {
  const [newImagePath, setNewImagePath] = useState('');

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          <p className="text-gray-600 mt-1">£{product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Images:</h4>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img
                src={img}
                alt={`${product.name} ${idx + 1}`}
                className="w-20 h-20 object-cover rounded border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.png';
                }}
              />
              <button
                onClick={() => onRemoveImage(product.id, idx)}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newImagePath}
              onChange={(e) => setNewImagePath(e.target.value)}
              placeholder="/images/filename.JPG"
              className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={() => {
                if (newImagePath.trim()) {
                  onAddImage(product.id, newImagePath.trim());
                  setNewImagePath('');
                }
              }}
              className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
            >
              Add Image
            </button>
          </div>
          <ImageUploader
            productId={product.id}
            onImageUploaded={(path) => {
              onAddImage(product.id, path);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductForm({
  product,
  onSave,
  onCancel,
  isEditing,
}: {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
  isEditing?: boolean;
}) {
  const [formData, setFormData] = useState<Product>(product);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Product' : 'Add Product'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg h-32"
            required
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

