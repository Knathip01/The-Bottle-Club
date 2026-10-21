'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, Search, ShoppingBag, User, X, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WineScannerView from '@/components/scanner/WineScannerView';

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputRef = useRef<HTMLInputElement>(null);

  const navItems = [
    { icon: Home, label: t('nav.home') || 'Home', href: '/' },
    { icon: Search, label: t('nav.search') || 'Search', href: 'search_action' },
    { icon: 'scan', label: t('nav.scan') || 'AI Scan', href: '#' },
    { icon: ShoppingBag, label: t('nav.cart') || 'Cart', href: '/cart' },
    { icon: User, label: t('nav.account') || 'Account', href: '/account' },
  ];

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleScanInit = () => {
    setIsScanOpen(true);
    setIsSearchOpen(false);
  };

  const handleSearchInit = () => {
    setIsSearchOpen(true);
    setIsScanOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      {/* ── Bottom Mobile Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-stone-200 px-6 py-3 z-40 flex items-center justify-between pb-safe shadow-2xl">
        {navItems.map((item, idx) => {
          if (item.icon === 'scan') {
            return (
              <button
                key={idx}
                type="button"
                onClick={handleScanInit}
                className="relative -top-7 z-50 flex flex-col items-center justify-center cursor-pointer group"
                aria-label="AI Wine Scanner"
              >
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 blur-md opacity-85 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <div className="relative w-15 h-15 bg-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.4),inset_0_1px_2px_rgba(255,255,255,0.8)] border-2 border-amber-400 active:scale-90 transition-all overflow-hidden p-1.5">
                    <img
                      src="/logos/bottle-walking-icon.png"
                      alt="AI Scan"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 mt-1">
                  {t('nav.scan') || 'AI Scan'}
                </span>
              </button>
            );
          }

          if (item.href === 'search_action') {
            return (
              <button
                key={idx}
                onClick={handleSearchInit}
                className={`flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                  isSearchOpen ? 'text-[#8b0000]' : 'text-stone-400'
                }`}
              >
                <Search size={22} strokeWidth={isSearchOpen ? 2.5 : 2} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isSearchOpen ? 'opacity-100' : 'opacity-60'}`}>
                  {item.label}
                </span>
              </button>
            );
          }

          const Icon = item.icon as any;
          const isActive = pathname === item.href;

          return (
            <Link
              key={idx}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? 'text-[#8b0000]' : 'text-stone-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* ── Quick Search Overlay ── */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl flex flex-col p-6 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black uppercase tracking-widest text-[#8b0000]">Quick Search</h2>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 bg-stone-100 rounded-full text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative mb-8">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('search.placeholder') || 'Search products...'}
              className="w-full bg-stone-100 border-none rounded-2xl py-5 px-6 pr-16 text-lg font-bold placeholder:text-stone-400 focus:ring-2 focus:ring-[#8b0000]/10 transition-all outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#8b0000] text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 active:scale-90 transition-transform cursor-pointer"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Popular Categories</p>
            <div className="grid grid-cols-2 gap-3">
              {['Red Wine', 'White Wine', 'Sparkling', 'Rose'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSearchQuery(cat);
                    router.push(`/search?q=${encodeURIComponent(cat)}`);
                    setIsSearchOpen(false);
                  }}
                  className="py-4 bg-stone-50 border border-stone-100 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-600 hover:bg-white hover:border-[#8b0000]/20 hover:text-[#8b0000] transition-all text-center cursor-pointer"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── AI Scanner View Modal ── */}
      {isScanOpen && (
        <WineScannerView onClose={() => setIsScanOpen(false)} isModal={true} />
      )}
    </>
  );
}
