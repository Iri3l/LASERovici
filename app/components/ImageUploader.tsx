'use client';

import { useState } from 'react';

interface ImageUploaderProps {
  onImageUploaded: (imagePath: string) => void;
  productId: number;
}

export default function ImageUploader({ onImageUploaded, productId }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setFileName(file.name);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileName) {
      alert('Please select an image file first');
      return;
    }

    setUploading(true);
    
    // For static export, we can't actually upload to server
    // Instead, we'll generate instructions and a suggested path
    const suggestedPath = `/images/${fileName.replace(/[^a-zA-Z0-9.-]/g, '_').toUpperCase().replace(/\.(jpg|jpeg|png|gif)$/i, '.JPG')}`;
    
    // Show instructions
    alert(`Image upload instructions:\n\n1. Save the image file as: ${fileName}\n2. Place it in: /public/images/\n3. Rename it to use .JPG extension (uppercase)\n4. The path will be: ${suggestedPath}\n5. Use this path in the product images field.`);
    
    onImageUploaded(suggestedPath);
    setPreview(null);
    setFileName('');
    setUploading(false);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">Upload New Image</h4>
      <div className="space-y-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        
        {preview && (
          <div className="mt-2">
            <img
              src={preview}
              alt="Preview"
              className="max-w-xs max-h-32 object-contain rounded border"
            />
            <p className="text-xs text-gray-500 mt-1">Preview: {fileName}</p>
          </div>
        )}
        
        <button
          onClick={handleUpload}
          disabled={!fileName || uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? 'Processing...' : 'Generate Image Path'}
        </button>
        
        <p className="text-xs text-gray-500">
          Note: For static sites, you need to manually add the image file to /public/images/ folder.
          This tool will generate the correct path for you to use.
        </p>
      </div>
    </div>
  );
}


