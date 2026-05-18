'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash2, Upload, X, Loader2 } from 'lucide-react';
import { Product, ProductImage } from '@/lib/products';
import { uploadProductImage, deleteProductImage } from '@/app/actions/product';

interface ProductImageManagerProps {
  product: Product;
  onUpdate?: () => void;
}

export default function ProductImageManager({ product, onUpdate }: ProductImageManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Constraints check
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Supported formats: .jpg, .jpeg, .png, .webp');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Max file size: 5MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      await uploadProductImage(product.id, formData);
      if (onUpdate) onUpdate();
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleDelete = async (imageId: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    setIsDeleting(imageId);
    setError(null);

    try {
      await deleteProductImage(product.id, imageId);
      if (onUpdate) onUpdate();
    } catch (err: any) {
      setError(err.message || 'Failed to delete image');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-stone-950">Product Images</h3>
        <label className="flex cursor-pointer items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-stone-800 disabled:bg-stone-400">
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {isUploading ? 'Uploading...' : 'Upload Image'}
          <input
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center justify-between rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {product.images?.map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
            <Image
              src={img.image_url}
              alt={`${product.name} ${img.id}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => handleDelete(img.id)}
                disabled={isDeleting === img.id}
                className="rounded-full bg-white p-2 text-red-600 shadow-lg transition-transform hover:scale-110 disabled:bg-stone-200"
              >
                {isDeleting === img.id ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Trash2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {(!product.images || product.images.length === 0) && (
          <div className="col-span-full flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-stone-200 text-sm text-stone-400">
            No images uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}
