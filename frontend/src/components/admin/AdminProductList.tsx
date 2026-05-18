'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/products';
import ProductImageManager from './ProductImageManager';
import { Search } from 'lucide-react';

interface AdminProductListProps {
  initialProducts: Product[];
  token?: string;
}

export default function AdminProductList({ initialProducts, token }: AdminProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sub_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Product List */}
      <div className="lg:col-span-1 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-xl border border-stone-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-stone-950 focus:outline-none focus:ring-1 focus:ring-stone-950"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="h-[calc(100vh-300px)] overflow-y-auto pr-2 space-y-2">
          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition-all ${
                selectedProduct?.id === product.id
                  ? 'border-stone-950 bg-stone-950 text-white shadow-md'
                  : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                <Image
                  src={product.image || `/images/wine_${product.color || 'red'}.png`}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-bold">{product.name}</h4>
                <p className={`text-xs ${selectedProduct?.id === product.id ? 'text-stone-400' : 'text-stone-500'}`}>
                  {product.sub_type}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Management Area */}
      <div className="lg:col-span-2">
        {selectedProduct ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-stone-50 p-4">
                <Image
                  src={selectedProduct.image || `/images/wine_${selectedProduct.color || 'red'}.png`}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a11a1a]">
                  Product Management
                </span>
                <h2 className="mt-1 text-2xl font-black text-stone-950">{selectedProduct.name}</h2>
                <p className="text-stone-500">{selectedProduct.sub_type}</p>
                <div className="mt-3 flex gap-3">
                  <div className="rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">
                    ID: {selectedProduct.id}
                  </div>
                  <div className="rounded-lg bg-stone-100 px-3 py-1 text-xs font-bold text-stone-700">
                    Price: ฿{selectedProduct.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-8">
              <ProductImageManager 
                product={selectedProduct} 
                onUpdate={async () => {
                  // Refresh products list
                  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';
                  const response = await fetch(`${API_BASE_URL}/api/wines/wines`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                  });
                  if (response.ok) {
                    const rawData = await response.json();
                    // Basic transformation for sync (simplified version of lib/products.ts logic)
                    const updatedProducts = rawData.map((item: any) => ({
                      ...item,
                      id: Number(item.id),
                      image: item.images?.[0] ? (item.images[0].image_url.startsWith('http') ? item.images[0].image_url : `${API_BASE_URL}${item.images[0].image_url}`) : undefined,
                      images: item.images?.map((img: any) => ({
                        ...img,
                        image_url: img.image_url.startsWith('http') ? img.image_url : `${API_BASE_URL}${img.image_url}`
                      }))
                    }));
                    setProducts(updatedProducts);
                    const updatedSelected = updatedProducts.find((p: any) => p.id === selectedProduct.id);
                    if (updatedSelected) setSelectedProduct(updatedSelected);
                  }
                }} 
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50 text-center">
            <div className="mb-4 rounded-full bg-stone-100 p-4 text-stone-400">
              <Search size={40} />
            </div>
            <h3 className="text-lg font-bold text-stone-900">No Product Selected</h3>
            <p className="mt-1 text-sm text-stone-500">Select a product from the list to manage its images</p>
          </div>
        )}
      </div>
    </div>
  );
}
