'use client';

import React, { useState, useMemo, useEffect, useTransition, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Check,
  ShoppingCart,
  RotateCcw,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Lock,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
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
  initialSource?: 'api.wayneven.uk' | 'fallback';
  initialApiError?: string | null;
}

const WINE_TYPES = [
  { id: 'Red', label: 'Red' },
  { id: 'White', label: 'White' },
  { id: 'Sparkling', label: 'Sparkling' },
  { id: 'Rosé', label: 'Rosé' },
  { id: 'Dessert', label: 'Dessert' },
  { id: 'Fortified', label: 'Fortified' },
];

const COUNTRY_FLAGS: Record<string, string> = {
  us: '🇺🇸',
  'united states': '🇺🇸',
  fr: '🇫🇷',
  france: '🇫🇷',
  it: '🇮🇹',
  italy: '🇮🇹',
  es: '🇪🇸',
  spain: '🇪🇸',
  au: '🇦🇺',
  australia: '🇦🇺',
  nz: '🇳🇿',
  'new zealand': '🇳🇿',
  cl: '🇨🇱',
  chile: '🇨🇱',
  ar: '🇦🇷',
  argentina: '🇦🇷',
  de: '🇩🇪',
  germany: '🇩🇪',
  pt: '🇵🇹',
  portugal: '🇵🇹',
  za: '🇿🇦',
  'south africa': '🇿🇦',
  hu: '🇭🇺',
  hungary: '🇭🇺',
};

function getCountryFlag(countryCode?: string, countryName?: string): string {
  const code = (countryCode || '').toLowerCase();
  const name = (countryName || '').toLowerCase();
  return COUNTRY_FLAGS[code] || COUNTRY_FLAGS[name] || '🍷';
}

function CrimsonStars({ rating = 0 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillAmount = Math.max(0, Math.min(1, rating - (star - 1)));
        return (
          <div key={star} className="relative inline-block w-3.5 h-3.5 sm:w-4 sm:h-4">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-stone-200 fill-stone-200"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillAmount * 100}%` }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ba1628] fill-[#ba1628]"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VivinoBadge({ text }: { text: string }) {
  const isTopPercent = text.includes('top') || text.includes('1%') || text.includes('3%') || text.includes('5%');
  const isVintage = text.includes('vintage') || text.includes('Latest');
  const cleanText = text.replace(/^[⭐🏛🏷️🔥]\s*/, '');

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#f4f4f4] px-3.5 py-1.5 text-xs text-stone-800 font-normal">
      {isTopPercent ? (
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#e5a824] text-[10px] text-white">
          ★
        </span>
      ) : isVintage ? (
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#b89569] text-[9px] text-white">
          🏛
        </span>
      ) : (
        <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-stone-400 text-[10px] text-white">
          ★
        </span>
      )}
      <span>{cleanText}</span>
    </div>
  );
}

export default function ProductCatalogClient({
  initialProducts,
  total,
  currentPage,
  perPage,
  totalPages,
  currentSearch = '',
  currentCategory = 'all',
  currentCountry = 'all',
  currentSort = 'highest-rated',
  isLoggedIn,
  initialSource,
  initialApiError,
}: ProductCatalogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { t, language } = useLanguage();

  const [effectiveLoggedIn, setEffectiveLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasToken = !!localStorage.getItem('token') || !!document.cookie.match(/token|session|auth/);
      setEffectiveLoggedIn(isLoggedIn || hasToken);
    }
  }, [isLoggedIn]);

  // Data state powered by /api/products
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [totalCount, setTotalCount] = useState<number>(total);
  const [totalPagesCount, setTotalPagesCount] = useState<number>(totalPages);
  const [activePage, setActivePage] = useState<number>(currentPage);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
  const [apiSource, setApiSource] = useState<'api.wayneven.uk' | 'fallback' | undefined>(initialSource);
  const [apiError, setApiError] = useState<string | null | undefined>(initialApiError);

  // Search input state
  const [searchInput, setSearchInput] = useState(currentSearch);

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'Red',
    'White',
    'Sparkling',
    'Rosé',
    'Dessert',
    'Fortified',
  ]);
  const [naturalOnly, setNaturalOnly] = useState(false);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>(
    currentSort === 'default' ? 'highest-rated' : currentSort
  );

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    types: true,
    price: true,
    rating: true,
  });

  // Mobile filter drawer state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Added to cart feedback
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  const fetchProductsFromApi = useCallback(
    async (
      pageToFetch: number = activePage,
      searchVal: string = searchInput,
      sortVal: string = sortOption,
      typesVal: string[] = selectedTypes,
      priceVal: number = maxPrice,
      ratingVal: number = selectedRating,
      naturalVal: boolean = naturalOnly,
      discountVal: boolean = discountOnly
    ) => {
      setIsLoadingApi(true);
      try {
        const q = new URLSearchParams();
        q.set('page', String(pageToFetch));
        q.set('per_page', String(perPage));
        if (sortVal) q.set('sort', sortVal);
        if (searchVal.trim()) q.set('search', searchVal.trim());
        if (typesVal.length > 0 && typesVal.length < WINE_TYPES.length) {
          q.set('types', typesVal.join(','));
        }
        if (priceVal > 0) q.set('max_price', String(priceVal));
        if (ratingVal > 0) q.set('min_rating', String(ratingVal));
        if (naturalVal) q.set('natural_only', 'true');
        if (discountVal) q.set('discount_only', 'true');

        const res = await fetch(`/api/products?${q.toString()}`);
        if (res.ok) {
          const json = await res.json();
          const items = json?.data?.items || json?.products || [];
          setProducts(items);
          setTotalCount(json?.data?.total ?? json?.total ?? items.length);
          setTotalPagesCount(json?.data?.pages ?? json?.pages ?? 1);
          setActivePage(json?.data?.page ?? pageToFetch);
          setApiSource(json?.data?.source || json?.source);
          setApiError(json?.data?.api_error || json?.api_error || null);
        } else {
          setApiSource('fallback');
          setApiError(`HTTP ${res.status}: Failed to fetch /api/products`);
        }
      } catch (err: any) {
        console.error('[ProductCatalogClient] API fetch failed:', err);
        setApiSource('fallback');
        setApiError(err?.message || 'Failed to connect to API');
      } finally {
        setIsLoadingApi(false);
      }
    },
    [perPage, activePage, searchInput, sortOption, selectedTypes, maxPrice, selectedRating, naturalOnly, discountOnly]
  );

  useEffect(() => {
    // Actively load from API on mount
    fetchProductsFromApi(1, currentSearch, sortOption);
  }, []);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleType = (typeId: string) => {
    const updated = selectedTypes.includes(typeId)
      ? selectedTypes.filter((t) => t !== typeId)
      : [...selectedTypes, typeId];
    setSelectedTypes(updated);
    fetchProductsFromApi(1, searchInput, sortOption, updated, maxPrice, selectedRating, naturalOnly, discountOnly);
  };

  const handlePriceChange = (newMax: number) => {
    setMaxPrice(newMax);
    fetchProductsFromApi(1, searchInput, sortOption, selectedTypes, newMax, selectedRating, naturalOnly, discountOnly);
  };

  const handleRatingChange = (newRatingVal: number) => {
    const valToSet = selectedRating === newRatingVal ? 0 : newRatingVal;
    setSelectedRating(valToSet);
    fetchProductsFromApi(1, searchInput, sortOption, selectedTypes, maxPrice, valToSet, naturalOnly, discountOnly);
  };

  const handleNaturalToggle = () => {
    const newVal = !naturalOnly;
    setNaturalOnly(newVal);
    fetchProductsFromApi(1, searchInput, sortOption, selectedTypes, maxPrice, selectedRating, newVal, discountOnly);
  };

  const handleDiscountToggle = () => {
    const newVal = !discountOnly;
    setDiscountOnly(newVal);
    fetchProductsFromApi(1, searchInput, sortOption, selectedTypes, maxPrice, selectedRating, naturalOnly, newVal);
  };

  const handleResetFilters = () => {
    const allTypes = ['Red', 'White', 'Sparkling', 'Rosé', 'Dessert', 'Fortified'];
    setSelectedTypes(allTypes);
    setNaturalOnly(false);
    setDiscountOnly(false);
    setMaxPrice(0);
    setSelectedRating(0);
    setSearchInput('');
    setSortOption('highest-rated');
    fetchProductsFromApi(1, '', 'highest-rated', allTypes, 0, 0, false, false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProductsFromApi(1, searchInput, sortOption, selectedTypes, maxPrice, selectedRating, naturalOnly, discountOnly);
  };

  const handleSortChange = (newSort: string) => {
    setSortOption(newSort);
    fetchProductsFromApi(1, searchInput, newSort, selectedTypes, maxPrice, selectedRating, naturalOnly, discountOnly);
  };

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
    fetchProductsFromApi(newPage, searchInput, sortOption, selectedTypes, maxPrice, selectedRating, naturalOnly, discountOnly);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="bg-[#ffffff] text-stone-900 min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Header Filter Trigger & Search */}
        <div className="lg:hidden mb-4 flex items-center gap-2">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4 text-stone-600" />
            <span>Filters</span>
          </button>

          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search wine, producer, region..."
              className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-8 pr-8 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:outline-none"
            />
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* 2-Column Layout */}
        <div className="flex items-start gap-8 lg:gap-10">
          {/* ─── LEFT SIDEBAR (FILTERS) ─────────────────────────────────── */}
          <aside
            className={`
              fixed inset-0 z-50 overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300 lg:static lg:z-0 lg:block lg:w-64 lg:shrink-0 lg:p-0 lg:shadow-none
              ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
          >
            {/* Mobile Close Header */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-4 lg:hidden">
              <span className="font-bold text-base text-stone-900">Filters</span>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-1 text-stone-500 hover:bg-stone-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Search on Desktop */}
            <div className="hidden lg:block mb-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search wines..."
                  className="w-full rounded-lg border border-stone-200 bg-stone-50/60 py-2 pl-8 pr-7 text-xs text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:bg-white focus:outline-none transition-colors"
                />
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-400" />
                {searchInput && (
                  <button
                    type="button"
                    onClick={() => setSearchInput('')}
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </form>
            </div>

            {/* ── Section 1: Wine types ───────────────────────────────── */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => toggleSection('types')}
                className="flex w-full items-center justify-between text-left text-sm font-bold text-stone-900 focus:outline-none"
              >
                <span>Wine types</span>
                {openSections.types ? (
                  <ChevronUp className="h-4 w-4 text-stone-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-500" />
                )}
              </button>

              {openSections.types && (
                <div className="mt-3.5 space-y-2.5">
                  {WINE_TYPES.map((t) => {
                    const isChecked = selectedTypes.includes(t.id);
                    return (
                      <label
                        key={t.id}
                        onClick={() => toggleType(t.id)}
                        className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-stone-900 select-none group"
                      >
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded transition-colors ${
                            isChecked
                              ? 'bg-stone-900 text-white'
                              : 'border border-stone-300 bg-white group-hover:border-stone-500'
                          }`}
                        >
                          {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                        <span className="font-normal text-stone-900">{t.label}</span>
                      </label>
                    );
                  })}

                  {/* Natural wines only switch */}
                  <div className="pt-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-stone-800 font-normal">
                      Natural wines only
                    </span>
                    <button
                      type="button"
                      onClick={handleNaturalToggle}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        naturalOnly ? 'bg-stone-900' : 'bg-stone-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                          naturalOnly ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-5 border-stone-200" />

            {/* ── Section 2: Price range (THB) ────────────────────────── */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => toggleSection('price')}
                className="flex w-full items-center justify-between text-left text-sm font-bold text-stone-900 focus:outline-none"
              >
                <span>Price range <span className="font-normal text-stone-500 text-xs">(THB)</span></span>
                {openSections.price ? (
                  <ChevronUp className="h-4 w-4 text-stone-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-500" />
                )}
              </button>

              {openSections.price && (
                <div className="mt-3.5 space-y-3">
                  <div className="text-xs sm:text-sm font-medium text-stone-800">
                    ฿0 - ฿{maxPrice === 0 ? '0' : maxPrice >= 250000 ? '250,000+' : maxPrice.toLocaleString()}
                  </div>

                  <div className="relative pt-1 pb-1">
                    <input
                      type="range"
                      min="0"
                      max="250000"
                      step="5000"
                      value={maxPrice}
                      onChange={(e) => handlePriceChange(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                    />
                  </div>

                  {/* Only show wines with a discount switch */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-stone-800 font-normal">
                      Only show wines with a discount
                    </span>
                    <button
                      type="button"
                      onClick={handleDiscountToggle}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        discountOnly ? 'bg-stone-900' : 'bg-stone-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ${
                          discountOnly ? 'translate-x-4' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <hr className="my-5 border-stone-200" />

            {/* ── Section 3: Customer rating ─────────────────────── */}
            <div className="mb-6">
              <button
                type="button"
                onClick={() => toggleSection('rating')}
                className="flex w-full items-center justify-between text-left text-sm font-bold text-stone-900 focus:outline-none"
              >
                <span>{language === 'th' ? 'คะแนนรีวิวจากลูกค้า' : 'Customer rating'}</span>
                {openSections.rating ? (
                  <ChevronUp className="h-4 w-4 text-stone-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-stone-500" />
                )}
              </button>

              {openSections.rating && (
                <div className="mt-3.5 space-y-2.5">
                  {[
                    { value: 4.5, label: language === 'th' ? '4.5 ดาวขึ้นไป' : '4.5 & up' },
                    { value: 4.0, label: language === 'th' ? '4.0 ดาวขึ้นไป' : '4.0 & up' },
                    { value: 3.5, label: language === 'th' ? '3.5 ดาวขึ้นไป' : '3.5 & up' },
                    { value: 0, label: language === 'th' ? 'คะแนนทั้งหมด' : 'Any rating' },
                  ].map((option) => {
                    const isSelected = selectedRating === option.value;
                    return (
                      <label
                        key={option.value}
                        onClick={() => handleRatingChange(option.value)}
                        className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-stone-900 select-none group"
                      >
                        {/* Radio indicator */}
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                            isSelected
                              ? 'border-stone-900'
                              : 'border-stone-300 group-hover:border-stone-400'
                          }`}
                        >
                          {isSelected && <div className="h-2 w-2 rounded-full bg-stone-900" />}
                        </div>

                        {option.value > 0 ? (
                          <div className="flex items-center gap-1.5">
                            <CrimsonStars rating={option.value} />
                            <span className="font-normal text-stone-800 text-xs sm:text-sm">
                              {option.label}
                            </span>
                          </div>
                        ) : (
                          <span className="font-normal text-stone-800 text-xs sm:text-sm">
                            {option.label}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Clear Filters CTA */}
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>

            {/* Mobile Apply Button */}
            <div className="mt-8 lg:hidden">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full rounded-xl bg-stone-900 py-3 text-center text-xs font-bold text-white shadow-md"
              >
                View {totalCount} Wines
              </button>
            </div>
          </aside>

          {/* ─── RIGHT SECTION (TOP BAR + PRODUCT CARDS) ─────────────────── */}
          <main className="flex-1 min-w-0">
            {/* Real API Status Banner */}
            {apiSource === 'fallback' && (
              <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-xs sm:text-sm text-stone-900 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-950 flex flex-wrap items-center gap-2">
                        <span>สถานะ API (api.wayneven.uk):</span>
                        <span className="inline-flex items-center rounded-full bg-amber-200/90 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                          {apiError ? 'Database Operation Failed (500)' : 'Fallback Mode'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-stone-600 leading-relaxed">
                        ระบบ Frontend เชื่อมต่อกับ Backend API โดยตรงที่{' '}
                        <a
                          href="https://api.wayneven.uk/api/v1/wine-products/"
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[#ba1628] underline inline-flex items-center gap-0.5 hover:text-black"
                        >
                          https://api.wayneven.uk/api/v1/wine-products/
                          <ExternalLink className="h-3 w-3 inline" />
                        </a>{' '}
                        แต่เซิร์ฟเวอร์ Backend ตอบกลับด้วย{' '}
                        <code className="bg-amber-100/90 px-1 py-0.5 rounded text-[11px] font-semibold text-stone-800">
                          {apiError || 'HTTP 500 (DATABASE_ERROR)'}
                        </code>{' '}
                        เนื่องจากฐานข้อมูล PostgreSQL บน Render ขัดข้อง ระบบจึงแสดงข้อมูลสำรองเพื่อไม่ให้หน้าเว็บว่างเปล่า
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => fetchProductsFromApi(activePage)}
                    disabled={isLoadingApi}
                    className="shrink-0 self-start inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-stone-800 hover:bg-stone-50 transition-colors shadow-sm disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isLoadingApi ? 'animate-spin' : ''}`} />
                    <span>ลองเชื่อมต่อ API อีกครั้ง</span>
                  </button>
                </div>
              </div>
            )}

            {apiSource === 'api.wayneven.uk' && (
              <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs sm:text-sm text-emerald-950 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="font-medium">
                    กำลังแสดงข้อมูลไวน์จริงจาก Backend API: <strong className="font-semibold text-emerald-900">api.wayneven.uk</strong> ({totalCount.toLocaleString()} รายการ)
                  </span>
                </div>
                <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                  Live Data
                </span>
              </div>
            )}

            {/* Top Bar: Results Count + Sort Selector */}
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="text-xs sm:text-sm text-stone-600 font-normal">
                Showing {totalCount === 0 ? 0 : (activePage - 1) * perPage + 1}-{Math.min(activePage * perPage, totalCount)} of {totalCount.toLocaleString()} wines
              </div>

              {/* Sort Selector Dropdown */}
              <div className="relative">
                <div className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs text-stone-800 shadow-sm hover:border-stone-400 transition-colors cursor-pointer">
                  <span className="text-stone-500">Sort:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="bg-transparent font-medium text-stone-900 focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="highest-rated">Highest rated</option>
                    <option value="popular">Most popular</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                  <ChevronDown className="h-3.5 w-3.5 text-stone-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* API Loading Banner */}
            {isLoadingApi && (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-stone-900 text-white px-4 py-2.5 text-xs font-semibold shadow-md animate-pulse">
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>กำลังโหลดข้อมูลรายการไวน์จาก API...</span>
              </div>
            )}

            {/* Wine Cards List */}
            {products.length === 0 && !isLoadingApi ? (
              <div className="py-20 text-center rounded-2xl border border-stone-200 bg-white p-8">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-1">No wines match your filters</h3>
                <p className="text-xs sm:text-sm text-stone-500 mb-4 max-w-sm mx-auto">
                  Try adjusting the rating threshold, price range, or selecting more wine types.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-black transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset filters</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => {
                  const rating = Number(product.rating) || 0;
                  const ratingsCount = Number(product.ratings_count) || 0;
                  const isAdded = addedItems[product.id];
                  const flag = getCountryFlag(product.countryCode || product.country_code, product.country);
                  const displayImage = product.image || `/images/wine_${product.color || 'red'}.png`;

                  // Format producer & title
                  const wineryName = product.winery || product.brand || 'Selected Estate';
                  const wineTitle = product.wine_name
                    ? `${product.wine_name}${product.vintage ? ` ${product.vintage}` : ''}`
                    : product.name;

                  // Format region and country
                  const locationString = product.region
                    ? product.region
                    : product.country
                    ? product.country
                    : 'Selected Vineyard';

                  return (
                    <div
                      key={product.id}
                      className="group relative flex flex-col md:flex-row items-center md:items-stretch gap-5 sm:gap-7 rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-stone-300 transition-all duration-200"
                    >
                      {/* ── Column 1: Bottle Image ── */}
                      <Link
                        href={`/product/${product.id}`}
                        className="w-28 sm:w-36 md:w-44 shrink-0 flex items-center justify-center relative py-1"
                      >
                        {effectiveLoggedIn ? (
                          <img
                            src={displayImage}
                            alt={product.name}
                            loading="lazy"
                            className="max-h-52 sm:max-h-60 w-auto object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.12)] group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="relative flex h-52 sm:h-60 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-stone-50 p-3 transition-colors group-hover:bg-stone-100/80">
                            <img
                              src="/images/thebottleclub-locked-wine.png"
                              alt={product.name}
                              className="h-44 sm:h-52 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-stone-900/85 backdrop-blur-xs px-2.5 py-0.5 text-[9px] font-bold text-white flex items-center gap-1 shadow-sm whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
                              <Lock size={10} className="text-amber-400" />
                              <span>{language === 'th' ? 'เข้าสู่ระบบเพื่อดูขวดจริง' : 'Login to view'}</span>
                            </div>
                          </div>
                        )}
                      </Link>

                      {/* ── Column 2: Wine Info ── */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center text-center md:text-left">
                        {/* Wine Type / Classification */}
                        <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                          {(product.type || 'RED').toUpperCase()} - {product.sub_type || (language === 'th' ? 'คลาสสิค' : 'Classic')}
                        </div>

                        {/* Wine Name */}
                        <Link href={`/product/${product.id}`}>
                          <h2 className="text-base sm:text-xl font-bold text-stone-950 group-hover:text-[#ba1628] transition-colors leading-snug">
                            {wineTitle}
                          </h2>
                        </Link>

                        {/* Country Flag & Region */}
                        <div className="mt-1.5 flex items-center justify-center md:justify-start gap-1.5 text-xs sm:text-sm text-stone-500 font-normal">
                          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full overflow-hidden text-xs">
                            {flag}
                          </span>
                          <span>{locationString}</span>
                        </div>
                      </div>

                      {/* ── Column 3: Rating & Action / Price ── */}
                      <div className="w-full md:w-52 shrink-0 flex md:flex-col justify-between md:items-end items-center md:text-right border-t md:border-t-0 md:border-l border-stone-100 md:pl-6 pt-4 md:pt-0">
                        {/* Rating block: ONLY show stars and review counts if real customer reviews exist */}
                        {ratingsCount > 0 ? (
                          <Link
                            href={`/product/${product.id}#reviews`}
                            className="group/rating flex flex-col md:items-end items-start hover:opacity-85 transition-opacity"
                            title={
                              language === 'th'
                                ? `คะแนนรีวิวจากลูกค้า: ${rating.toFixed(1)} ดาว (${ratingsCount} รีวิว)`
                                : `Customer rating: ${rating.toFixed(1)} (${ratingsCount} reviews)`
                            }
                          >
                            <div className="flex items-baseline gap-1 mb-0.5">
                              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-none">
                                {rating.toFixed(1)}
                              </span>
                              <span className="text-xs text-stone-400 font-medium">/ 5.0</span>
                            </div>
                            <CrimsonStars rating={rating} />
                            <div className="text-xs text-[#ba1628] font-semibold mt-1 flex items-center gap-1">
                              <span>
                                ({ratingsCount.toLocaleString()} {language === 'th' ? 'รีวิวจากลูกค้า' : 'reviews'})
                              </span>
                            </div>
                          </Link>
                        ) : (
                          <Link
                            href={`/product/${product.id}#reviews`}
                            className="group/rating inline-flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 hover:border-[#ba1628] bg-stone-50/70 hover:bg-red-50/40 px-3 py-1.5 text-xs text-stone-500 hover:text-[#ba1628] transition-all"
                            title={language === 'th' ? 'คลิกเพื่อรีวิวสินค้านี้เป็นคนแรก' : 'Click to be the first to review'}
                          >
                            <span className="text-stone-400 group-hover/rating:text-[#ba1628]">✍️</span>
                            <span className="text-[11px] font-medium text-stone-600 group-hover/rating:text-[#ba1628]">
                              {language === 'th' ? 'ยังไม่มีรีวิว (เขียนรีวิวคนแรก)' : 'No reviews yet (Write review)'}
                            </span>
                          </Link>
                        )}

                        {/* Price & Action button */}
                        <div className="mt-auto pt-4 flex flex-col md:items-end items-end w-full sm:w-auto">
                          {effectiveLoggedIn ? (
                            <>
                              <div className="text-lg sm:text-xl font-bold text-stone-950">
                                THB {product.price.toLocaleString()}
                              </div>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="text-xs text-stone-400 line-through">
                                  THB {product.originalPrice.toLocaleString()}
                                </div>
                              )}
                              <div className="text-xs text-stone-400 mb-2">
                                {t('search.avg_price') || 'Average price'}
                              </div>

                              <button
                                type="button"
                                onClick={(e) => handleAddToCart(e, product)}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold shadow-sm transition-all active:scale-95 ${
                                  isAdded
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-[#ba1628] hover:bg-[#991120] text-white'
                                }`}
                                title="Add to cart"
                              >
                                {isAdded ? (
                                  <>
                                    <Check className="h-3.5 w-3.5" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingCart className="h-3.5 w-3.5" />
                                    <span>Add to cart</span>
                                  </>
                                )}
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="text-xs text-stone-400 mb-2 text-right">
                                {t('search.avg_price') || 'ราคาเฉลี่ย'}
                              </div>
                              <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                              >
                                <Lock size={15} />
                                <span>{t('auth.login') || 'เข้าสู่ระบบ'}</span>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPagesCount > 1 && (
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-6">
                <div className="text-xs text-stone-500">
                  Page <span className="font-semibold text-stone-900">{activePage}</span> of{' '}
                  <span className="font-semibold text-stone-900">{totalPagesCount}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={activePage <= 1 || isLoadingApi}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(activePage - 1)}
                    disabled={activePage <= 1 || isLoadingApi}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-1 px-1">
                    {(() => {
                      const maxButtons = 5;
                      let start = Math.max(1, activePage - 2);
                      let end = Math.min(totalPagesCount, start + maxButtons - 1);
                      if (end - start < maxButtons - 1) {
                        start = Math.max(1, end - maxButtons + 1);
                      }
                      const pages = [];
                      for (let i = start; i <= end; i++) {
                        pages.push(i);
                      }
                      return pages.map((pageNum) => {
                        const isActive = pageNum === activePage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={isLoadingApi}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                              isActive
                                ? 'bg-stone-900 text-white shadow-sm'
                                : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                            } disabled:opacity-50`}
                          >
                            {pageNum}
                          </button>
                        );
                      });
                    })()}
                  </div>

                  <button
                    onClick={() => handlePageChange(activePage + 1)}
                    disabled={activePage >= totalPagesCount || isLoadingApi}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Next page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handlePageChange(totalPagesCount)}
                    disabled={activePage >= totalPagesCount || isLoadingApi}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
