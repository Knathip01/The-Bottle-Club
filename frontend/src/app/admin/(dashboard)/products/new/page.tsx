'use client';

import React, { useState } from 'react';
import { Wine, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNewProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !stock) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          stock: parseInt(stock)
        })
      });

      if (!res.ok) {
        throw new Error('ไม่สามารถบันทึกข้อมูลสินค้าได้');
      }

      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl select-none font-sans mx-auto">
      {/* Back button */}
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-stone-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่รายการสินค้า
        </Link>
      </div>

      {/* Header Title */}
      <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-red-500 shrink-0">
          <Wine className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold font-serif text-stone-100">เพิ่มสินค้าใหม่ลงคลัง</h2>
          <p className="text-xs text-stone-400 mt-0.5">กรอกข้อมูลรายละเอียดของสินค้าเพื่อบันทึกลงระบบ</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-stone-900 border border-white/5 rounded-2xl p-8 shadow-lg">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/30 border border-red-800/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
              ชื่อสินค้า (Product Name)
            </label>
            <input
              type="text"
              required
              placeholder="เช่น Chateau Margaux 2015..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-red-800 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Price */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                ราคาสินค้า (Price in THB)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="เช่น 2450.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-red-800 transition"
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                จำนวนสินค้าในคลัง (Stock Quantity)
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="เช่น 10"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-100 text-sm focus:outline-none focus:border-red-800 transition"
              />
            </div>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer transition mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                กำลังบันทึกข้อมูล...
              </>
            ) : (
              <>
                <Save className="w-4.5 h-4.5" />
                บันทึกข้อมูลสินค้า
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
