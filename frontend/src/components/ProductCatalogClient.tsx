'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Filter,
  Wine,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ShoppingCart,
  Check,
  RotateCcw,
  Globe,
  SlidersHorizontal,
  X,
  Lock,
  Tag,
  Flame,
  ArrowUpDown,
} from 'lucide-react';
import type { Product } from '@/lib/products';
import { addCartItem } from '@/lib/cart';
import { useLanguage } from '@/context/LanguageContext';

interface ProductCatalogClientProps {
  initialProducts: Product[];
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  currentSearch?: string;
  currentCategory?: string;
  currentCountry?: string;
  currentSort?: string;
  isLoggedIn: boolean;
}

// Category mappings for quick filter pills
const WINE_CATEGORIES = [
  { id: 'all', label: 'ทั้งหมด', labelEn: 'All Wines', icon: Wine },
  { id: 'Red wines', label: 'ไวน์แดง', labelEn: 'Red Wine', icon: Wine, color: 'text-red-600 bg-red-50 hover:bg-red-100' },
  { id: 'White wines', label: 'ไวน์ขาว', labelEn: 'White Wine', icon: Wine, color: 'text-amber-600 bg-amber-50 hover:bg-amber-100' },
  { id: 'Rosé wines', label: 'ไวน์โรเซ่', labelEn: 'Rosé Wine', icon: Wine, color: 'text-pink-600 bg-pink-50 hover:bg-pink-100' },
  { id: 'Champagnes', label: 'แชมเปญ', labelEn: 'Champagne', icon: Sparkles, color: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100' },
  { id: 'Sparkling wines', label: 'สปาร์กลิ้ง', labelEn: 'Sparkling', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100' },
  { id: 'Sweet wines', label: 'ไวน์หวาน', labelEn: 'Sweet & Dessert', icon: Tag, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
];

// Country flags and mappings
const TOP_COUNTRIES = [
  { id: 'all', label: 'ทุกประเทศ', flag: '🌍' },
  { id: 'France', label: 'ฝรั่งเศส', flag: '🇫🇷' },
  { id: 'Italy', label: 'อิตาลี', flag: '🇮🇹' },
  { id: 'Spain', label: 'สเปน', flag: '🇪🇸' },
  { id: 'United States', label: 'สหรัฐอเมริกา', flag: '🇺🇸' },
  { id: 'Australia', label: 'ออสเตรเลีย', flag: '🇦🇺' },
  { id: 'Germany', label: 'เยอรมนี', flag: '🇩🇪' },
];

export default function ProductCatalogClient({
  initialProducts,
  total,
  currentPage,
  perPage,
  totalPages,
  currentSearch = '',
  currentCategory = 'all',
  currentCountry = 'all',
  currentSort = 'default',
  isLoggedIn,
}: ProductCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { t } = useLanguage();

  const [searchInput, setSearchInput] = useState(currentSearch);
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Sync state if searchParams change externally
  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const updateFilters = (updates: {
    search?: string;
    category?: string;
    countries?: string;
    page?: number;
    per_page?: number;
    sort?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (updates.search !== undefined) {
      if (updates.search.trim()) params.set('search', updates.search.trim());
      else params.delete('search');
      params.set('page', '1');
    }

    if (updates.category !== undefined) {
      if (updates.category && updates.category !== 'all') params.set('category', updates.category);
      else params.delete('category');
      params.set('page', '1');
    }

    if (updates.countries !== undefined) {
      if (updates.countries && updates.countries !== 'all') params.set('countries', updates.countries);
      else params.delete('countries');
      params.set('page', '1');
    }

    if (updates.sort !== undefined) {
      if (updates.sort && updates.sort !== 'default') params.set('sort', updates.sort);
      else params.delete('sort');
      params.set('page', '1');
    }

    if (updates.per_page !== undefined) {
      params.set('per_page', String(updates.per_page));
      params.set('page', '1');
    }

    if (updates.page !== undefined) {
      params.set('page', String(updates.page));
    }

    startTransition(() => {
      router.push(`/product?${params.toString()}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: searchInput });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    updateFilters({ search: '' });
  };

  const handleResetAll = () => {
    setSearchInput('');
    startTransition(() => {
      router.push('/product');
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    addCartItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image || `/images/wine_${product.color || 'red'}.png`,
    });

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  // Calculate display ranges
  const startItem = total === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, total);

  // Generate pagination page numbers
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const getWineColorBadge = (color?: string, type?: string) => {
    const lowerType = (type || '').toLowerCase();
    if (lowerType.includes('champagne') || lowerType.includes('sparkling')) {
      return { bg: 'bg-amber-100 text-amber-900 border-amber-200', label: 'Sparkling' };
    }
    if (color === 'white') {
      return { bg: 'bg-yellow-100 text-yellow-900 border-yellow-200', label: 'White' };
    }
    if (color === 'rose') {
      return { bg: 'bg-pink-100 text-pink-900 border-pink-200', label: 'Rosé' };
    }
    return { bg: 'bg-rose-100 text-rose-900 border-rose-200', label: 'Red' };
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100">
      {/* ─── LUXURY HERO BANNER ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-900 py-12 md:py-16">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center text-center">
            {/* Live API Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md mb-4 shadow-lg shadow-amber-950/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>Wayneven OpenAPI Catalog • 7,600+ Wines</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white mb-3">
              THE BOTTLE CLUB <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">CELLAR</span>
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-stone-400 mb-8 leading-relaxed">
              คอลเลกชันไวน์นำเข้าและสุราชั้นเลิศ คัดสรรพิเศษจากไร่องุ่นชั้นนำทั่วโลก พร้อมจัดส่งตรงถึงมือคุณด้วยมาตรฐานการควบคุมอุณหภูมิระดับพรีเมียม
            </p>

            {/* Quick Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-stone-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="ค้นหาชื่อไวน์, แบรนด์, ชนิดองุ่น หรือแคว้นที่ผลิต (เช่น Bordeaux, Margaux, Champagne)..."
                  className="w-full rounded-2xl border border-stone-700 bg-stone-950/80 py-3.5 pl-12 pr-28 text-sm text-stone-100 placeholder-stone-500 shadow-2xl backdrop-blur-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                />
                {searchInput && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-20 text-stone-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isPending}
                  className="absolute right-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-bold text-stone-950 shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {isPending ? 'ค้นหา...' : 'ค้นหา'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ─── FILTER CONTROLS & PILLS ──────────────────────────────────── */}
      <section className="sticky top-0 z-30 border-b border-stone-800 bg-stone-950/90 backdrop-blur-xl py-3 shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col gap-3">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider whitespace-nowrap pl-1 pr-2 flex items-center gap-1">
                <Filter className="h-3 w-3" /> ชนิด:
              </span>
              {WINE_CATEGORIES.map((cat) => {
                const isActive = (currentCategory === cat.id) || (cat.id === 'all' && !currentCategory);
                return (
                  <button
                    key={cat.id}
                    onClick={() => updateFilters({ category: cat.id })}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700/80 hover:text-white'
                    }`}
                  >
                    <cat.icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-bar: Countries & Sort */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone-800/50">
              {/* Countries Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
                <span className="text-xs text-stone-500 whitespace-nowrap flex items-center gap-1 mr-1">
                  <Globe className="h-3 w-3" /> ประเทศ:
                </span>
                {TOP_COUNTRIES.map((ct) => {
                  const isActive = (currentCountry === ct.id) || (ct.id === 'all' && (!currentCountry || currentCountry === 'all'));
                  return (
                    <button
                      key={ct.id}
                      onClick={() => updateFilters({ countries: ct.id })}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs transition-all ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                          : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-stone-200 hover:border-stone-700'
                      }`}
                    >
                      <span>{ct.flag}</span>
                      <span>{ct.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Sorting & Results Count */}
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3 w-3 text-stone-500" />
                  <select
                    value={currentSort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="rounded-lg border border-stone-800 bg-stone-900 px-2.5 py-1 text-xs text-stone-300 focus:border-amber-400 focus:outline-none"
                  >
                    <option value="default">เรียงตาม: แนะนำ</option>
                    <option value="price-asc">ราคา: ต่ำ ➔ สูง</option>
                    <option value="price-desc">ราคา: สูง ➔ ต่ำ</option>
                    <option value="name">ชื่อ: A ➔ Z</option>
                  </select>
                </div>

                {(currentCategory !== 'all' || currentCountry !== 'all' || currentSearch) && (
                  <button
                    onClick={handleResetAll}
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 ml-1"
                  >
                    <RotateCcw className="h-3 w-3" /> ล้างตัวกรอง
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN CONTENT AREA ────────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
        {/* Results Counter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-800">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>รายการสินค้า</span>
              <span className="text-xs font-normal text-stone-400 bg-stone-800 px-2.5 py-0.5 rounded-full border border-stone-700">
                {total.toLocaleString()} รายการ
              </span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              แสดง {startItem.toLocaleString()} - {endItem.toLocaleString()} จากทั้งหมด {total.toLocaleString()} รายการ
            </p>
          </div>

          {!isLoggedIn && (
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 text-xs text-amber-300">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>สมาชิกรับสิทธิพิเศษและสะสมแต้ม</span>
              <Link href="/login" className="underline font-bold hover:text-white ml-1">
                เข้าสู่ระบบ
              </Link>
            </div>
          )}
        </div>

        {/* ─── PRODUCT GRID ───────────────────────────────────────────── */}
        {initialProducts.length === 0 ? (
          <div className="py-24 text-center rounded-3xl border border-dashed border-stone-800 bg-stone-950/40 p-8">
            <Wine className="mx-auto h-16 w-16 text-stone-600 mb-4 animate-pulse" />
            <h3 className="text-xl font-bold text-white mb-2">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
              ลองเปลี่ยนคำค้นหา หรือล้างตัวกรองเพื่อดูรายการไวน์ทั้งหมดที่มีในคลัง
            </p>
            <button
              onClick={handleResetAll}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-stone-950 shadow-lg hover:bg-amber-400 transition-all"
            >
              <RotateCcw className="h-4 w-4" /> ดูไวน์ทั้งหมด
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {initialProducts.map((product) => {
              const badge = getWineColorBadge(product.color, product.type);
              const isAdded = addedItems[product.id];
              const hasImageError = imageErrors[product.id];

              const displayImage =
                !hasImageError && product.image && product.image !== '/images/bottle-silhouette.svg'
                  ? product.image
                  : `/images/wine_${product.color || 'red'}.png`;

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/70 hover:border-amber-500/40 hover:bg-stone-950 transition-all duration-300 hover:shadow-xl hover:shadow-amber-950/10 hover:-translate-y-1"
                >
                  {/* Card Image Area */}
                  <Link
                    href={`/product/${product.id}`}
                    className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-stone-900 to-stone-950 p-6"
                  >
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border shadow-sm ${badge.bg}`}>
                        {badge.label}
                      </span>
                      {product.vintage && (
                        <span className="rounded-full bg-stone-800/90 border border-stone-700 px-2 py-0.5 text-[10px] font-semibold text-stone-300">
                          {product.vintage}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 z-10">
                      <span className="rounded-full bg-stone-900/80 border border-stone-700 px-2.5 py-0.5 text-[10px] font-medium text-stone-300 flex items-center gap-1">
                        {product.countryCode ? product.countryCode.toUpperCase() : 'WINE'}
                      </span>
                    </div>

                    {/* Bottle Image */}
                    <div className="relative h-full w-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={displayImage}
                        alt={product.name}
                        onError={() => setImageErrors((prev) => ({ ...prev, [product.id]: true }))}
                        className="max-h-52 w-auto object-contain drop-shadow-2xl"
                        loading="lazy"
                      />
                    </div>
                  </Link>

                  {/* Card Content Area */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* Brand / Winery */}
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 line-clamp-1 mb-1">
                      {product.brand || product.sub_type || product.region || 'The Bottle Club Selection'}
                    </p>

                    {/* Product Name */}
                    <Link href={`/product/${product.id}`} className="group-hover:text-amber-300 transition-colors">
                      <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug mb-2" title={product.name}>
                        {product.name}
                      </h3>
                    </Link>

                    {/* Metadata Specs (Volume, Alcohol, Region) */}
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-3">
                      <span>{product.quantity || '75 cl'}</span>
                      <span>•</span>
                      <span>{product.alcohol || '12.5% Vol'}</span>
                      {product.region && (
                        <>
                          <span>•</span>
                          <span className="line-clamp-1">{product.region}</span>
                        </>
                      )}
                    </div>

                    {/* Price and Cart Action */}
                    <div className="mt-auto pt-3 border-t border-stone-800/80 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-amber-400">
                            ฿{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-xs text-stone-500 line-through">
                              ฿{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-400 font-medium">✓ มีในสต็อก</span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, product)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all shadow-md active:scale-90 ${
                          isAdded
                            ? 'bg-emerald-500 text-stone-950 font-bold'
                            : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                        }`}
                        title="เพิ่มลงตะกร้า"
                      >
                        {isAdded ? (
                          <Check className="h-5 w-5 stroke-[2.5]" />
                        ) : (
                          <ShoppingCart className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── PAGINATION BAR ─────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 pt-6">
            <div className="text-xs text-stone-400">
              หน้า <span className="font-bold text-white">{currentPage}</span> จาก{' '}
              <span className="font-bold text-white">{totalPages}</span> หน้า ({total.toLocaleString()} ไวน์ทั้งหมด)
            </div>

            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                onClick={() => updateFilters({ page: 1 })}
                disabled={currentPage <= 1 || isPending}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="หน้าแรก"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              {/* Prev Page */}
              <button
                onClick={() => updateFilters({ page: currentPage - 1 })}
                disabled={currentPage <= 1 || isPending}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="ก่อนหน้า"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Page Number Pills */}
              <div className="flex items-center gap-1">
                {getPaginationNumbers().map((num, idx) => {
                  if (num === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-1 text-stone-600">
                        ...
                      </span>
                    );
                  }
                  const isCurrent = num === currentPage;
                  return (
                    <button
                      key={`page-${num}`}
                      onClick={() => updateFilters({ page: Number(num) })}
                      disabled={isPending}
                      className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-2.5 text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'border border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  );
                })}
              </div>

              {/* Next Page */}
              <button
                onClick={() => updateFilters({ page: currentPage + 1 })}
                disabled={currentPage >= totalPages || isPending}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="ถัดไป"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Last Page */}
              <button
                onClick={() => updateFilters({ page: totalPages })}
                disabled={currentPage >= totalPages || isPending}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-stone-800 bg-stone-950 text-stone-300 hover:bg-stone-800 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                title="หน้าสุดท้าย"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
