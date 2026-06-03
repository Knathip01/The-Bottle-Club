'use client';

import * as React from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, ShoppingBag, Menu, X, User, LogOut,
  ChevronDown, MapPin, Wine, Sparkles, Grape,
  MapPinned, ShieldCheck, BadgePercent,
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import type { Language } from '@/context/LanguageContext';
import { readCart, subscribeCart, getEmptyCart } from '@/lib/cart';

interface HeaderProps {
  user?: { email?: string | null };
}

const languages = [
  { code: 'th', name: 'Thai', flag: '\u{1F1F9}\u{1F1ED}' },
  { code: 'en', name: 'English', flag: '\u{1F1FA}\u{1F1F8}' },
  { code: 'fr', name: 'French', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'zh', name: 'Chinese', flag: '\u{1F1E8}\u{1F1F3}' },
  { code: 'ja', name: 'Japanese', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'es', name: 'Spanish', flag: '\u{1F1EA}\u{1F1F8}' },
  { code: 'de', name: 'German', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'ko', name: 'Korean', flag: '\u{1F1F0}\u{1F1F7}' },
  { code: 'it', name: 'Italian', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'ru', name: 'Russian', flag: '\u{1F1F7}\u{1F1FA}' },
  { code: 'pt', name: 'Portuguese', flag: '\u{1F1F5}\u{1F1F9}' },
  { code: 'vi', name: 'Vietnamese', flag: '\u{1F1FB}\u{1F1F3}' },
  { code: 'ar', name: 'Arabic', flag: '\u{1F1F8}\u{1F1E6}' },
  { code: 'hi', name: 'Hindi', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'id', name: 'Indonesian', flag: '\u{1F1EE}\u{1F1E9}' },
  { code: 'tr', name: 'Turkish', flag: '\u{1F1F9}\u{1F1F7}' },
  { code: 'nl', name: 'Dutch', flag: '\u{1F1F3}\u{1F1F1}' },
  { code: 'pl', name: 'Polish', flag: '\u{1F1F5}\u{1F1F1}' },
  { code: 'sv', name: 'Swedish', flag: '\u{1F1F8}\u{1F1EA}' },
  { code: 'da', name: 'Danish', flag: '\u{1F1E9}\u{1F1F0}' },
  { code: 'no', name: 'Norwegian', flag: '\u{1F1F3}\u{1F1F4}' },
  { code: 'fi', name: 'Finnish', flag: '\u{1F1EB}\u{1F1EE}' },
  { code: 'ms', name: 'Malay', flag: '\u{1F1F2}\u{1F1FE}' },
  { code: 'he', name: 'Hebrew', flag: '\u{1F1EE}\u{1F1F1}' },
  { code: 'el', name: 'Greek', flag: '\u{1F1EC}\u{1F1F7}' },
] as const satisfies readonly { code: Language; name: string; flag: string }[];

/* ─── Floating Wine Bottle SVG ─────────────────────────────── */
function FloatingWineBottle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Foil cap */}
      <rect x="14" y="0" width="12" height="10" rx="3" fill="#7f1d1d" />
      {/* Neck */}
      <rect x="16" y="10" width="8" height="18" rx="2" fill="#991b1b" />
      {/* Shoulder */}
      <path d="M12 28 Q8 34 7 44 L33 44 Q32 34 28 28 Z" fill="#b91c1c" />
      {/* Body */}
      <rect x="7" y="44" width="26" height="58" rx="5" fill="#b91c1c" />
      {/* Label */}
      <rect x="10" y="54" width="20" height="34" rx="3" fill="white" opacity="0.9" />
      <rect x="12" y="57" width="16" height="2" rx="1" fill="#7f1d1d" opacity="0.4" />
      <text x="20" y="72" textAnchor="middle" fontSize="5" fontWeight="bold" fill="#7f1d1d" fontFamily="serif">
        TBC
      </text>
      <rect x="13" y="76" width="14" height="1.2" rx="0.6" fill="#d4a017" opacity="0.7" />
      <rect x="15" y="80" width="10" height="1" rx="0.5" fill="#7f1d1d" opacity="0.3" />
      {/* Wine fill tint */}
      <rect x="8" y="60" width="24" height="40" rx="4" fill="#7f1d1d" opacity="0.15" />
      {/* Shine */}
      <path d="M13 32 Q12 50 13 85" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.18" />
      {/* Bottom */}
      <ellipse cx="20" cy="102" rx="12" ry="3" fill="#991b1b" />
    </svg>
  );
}

/* ─── Animated Wine Orbs (background sparkle) ──────────────── */
function WineOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* large slow blob left */}
      <div
        className="absolute -left-8 -top-8 h-40 w-40 rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #b91c1c 0%, transparent 70%)',
          animation: 'orbFloat1 8s ease-in-out infinite',
        }}
      />
      {/* medium blob right */}
      <div
        className="absolute -right-4 -top-4 h-28 w-28 rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #a11a1a 0%, transparent 70%)',
          animation: 'orbFloat2 10s ease-in-out infinite',
        }}
      />
    </div>
  );
}

export default function Header({ user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLangOpen, setIsLangOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchFocused, setSearchFocused] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItems = React.useSyncExternalStore(subscribeCart, readCart, getEmptyCart);
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = async () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('access_token');
    await logout();
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    router.refresh();
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const desktopNavItems = [
    { href: '#wine-categories', label: t('nav.wine'),     icon: Wine },
    { href: '#products',        label: t('nav.pairings'), icon: Sparkles },
    { href: '#wine-categories', label: t('nav.grapes'),   icon: Grape },
    { href: '#products',        label: t('nav.regions'),  icon: MapPinned },
    { href: '#products',        label: t('nav.premium'),  icon: BadgePercent },
    { href: '#products',        label: t('nav.wineries'), icon: ShieldCheck, badge: 'New' },
  ];

  return (
    <>
      {/* ── Global keyframe styles ──────────────────────────────── */}
      <style>{`
        @keyframes orbFloat1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(12px,16px) scale(1.15); }
        }
        @keyframes orbFloat2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-10px,12px) scale(1.1); }
        }
        @keyframes bottleFloat {
          0%,100% { transform: translateY(0px) rotate(-4deg); }
          50%      { transform: translateY(-10px) rotate(4deg); }
        }
        @keyframes bottleFloat2 {
          0%,100% { transform: translateY(0px) rotate(6deg); }
          50%      { transform: translateY(-14px) rotate(-3deg); }
        }
        @keyframes bottleFloat3 {
          0%,100% { transform: translateY(0px) rotate(-2deg) scale(0.85); }
          50%      { transform: translateY(-8px) rotate(5deg) scale(0.9); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes navUnderline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes cartPulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.25); }
        }
        .bottle-1 { animation: bottleFloat  6s ease-in-out infinite; }
        .bottle-2 { animation: bottleFloat2 8s ease-in-out infinite 1s; }
        .bottle-3 { animation: bottleFloat3 7s ease-in-out infinite 2s; }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #1c1917 0%,
            #44403c 30%,
            #a11a1a 50%,
            #44403c 70%,
            #1c1917 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 6s linear infinite;
        }
        .nav-link-line::after {
          content: '';
          display: block;
          height: 2px;
          border-radius: 9999px;
          background: #a11a1a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link-line:hover::after {
          transform: scaleX(1);
        }
        .cart-badge-pulse { animation: cartPulse 2s ease-in-out infinite; }
        .glass-panel {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(24px) saturate(180%);
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.4);
        }
        @keyframes borderShimmer {
          0%, 100% {
            border-color: rgba(161, 26, 26, 0.15);
            box-shadow: 0 4px 30px rgba(161, 26, 26, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.6);
          }
          50% {
            border-color: rgba(212, 160, 23, 0.35);
            box-shadow: 0 8px 32px rgba(212, 160, 23, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.85);
          }
        }
        .floating-island {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(161, 26, 26, 0.15);
          animation: borderShimmer 8s infinite ease-in-out;
        }
        .floating-island.scrolled {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(28px) saturate(210%) !important;
          -webkit-backdrop-filter: blur(28px) saturate(210%) !important;
          box-shadow: 0 12px 40px -10px rgba(161, 26, 26, 0.18), 0 0 25px rgba(161, 26, 26, 0.05) !important;
          border: 1px solid rgba(161, 26, 26, 0.28) !important;
        }
      `}</style>

      <header className={`sticky z-40 mx-auto transition-all duration-500 ease-in-out floating-island glass-panel ${
        scrolled 
          ? 'top-2 w-[95%] max-w-7xl rounded-2xl md:rounded-3xl scrolled' 
          : 'top-4 w-[96%] max-w-7xl rounded-2xl md:rounded-3xl shadow-[0_4px_30px_rgba(161,26,26,0.05)]'
      }`}>
        <WineOrbs />

        {/* ── TOP BAR ─────────────────────────────────────────────── */}
        <div className="relative container mx-auto px-3 sm:px-5 lg:px-12">
          <div className={`flex items-center justify-between gap-3 transition-all duration-500 ${
            scrolled ? 'h-12 md:h-14 md:gap-4' : 'h-16 md:h-20 md:gap-6'
          }`}>

            {/* Mobile menu button */}
            <button
              className={`flex items-center justify-center rounded-full border border-stone-200/70 bg-white/80 text-stone-700 shadow-sm transition-all duration-500 hover:border-[#a11a1a]/30 hover:shadow-[#a11a1a]/10 active:scale-90 md:hidden ${
                scrolled ? 'h-9 w-9' : 'h-11 w-11'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen
                ? <X size={scrolled ? 18 : 22} strokeWidth={2.5} />
                : <Menu size={scrolled ? 18 : 22} strokeWidth={2.5} />}
            </button>

            {/* ── LOGO + floating bottles ──────────────────────────── */}
            <Link href="/" className="group flex shrink-0 items-center gap-3">
              {/* Floating mini bottles — hidden on very small screens */}
              <div className={`relative hidden md:flex items-end gap-0.5 mr-1 select-none transition-all duration-500 ${
                scrolled ? 'scale-75 opacity-70 origin-bottom' : 'scale-100 opacity-100 origin-bottom'
              }`}>
                <FloatingWineBottle className="w-[10px] h-[28px] bottle-3 opacity-50" />
                <FloatingWineBottle className="w-[13px] h-[36px] bottle-1 opacity-80" />
                <FloatingWineBottle className="w-[10px] h-[28px] bottle-2 opacity-50" />
              </div>

              {/* Logo image */}
              <div className="relative shrink-0">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#a11a1a] via-rose-400 to-amber-300 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-25" />
                <Image
                  src="/logos/Thebottleclub.jpg"
                  alt="The Bottle Club"
                  width={48}
                  height={48}
                  className={`relative rounded-full border-2 border-white object-cover shadow-lg ring-2 ring-stone-100 transition-all duration-500 group-hover:scale-105 group-hover:ring-[#a11a1a]/20 ${
                    scrolled ? 'h-8 w-8 md:h-9 md:w-9' : 'h-10 w-10 md:h-12 md:w-12'
                  }`}
                />
              </div>

              {/* Brand name */}
              <div className="flex min-w-0 flex-col transition-all duration-500">
                <span className={`shimmer-text truncate font-black uppercase tracking-tight transition-all duration-500 ${
                  scrolled ? 'text-sm sm:text-lg' : 'text-base sm:text-xl'
                }`}>
                  The Bottle Club
                </span>
                <span className={`-mt-0.5 uppercase tracking-[0.3em] text-[#a11a1a]/70 transition-all duration-500 ${
                  scrolled ? 'hidden' : 'hidden text-[8px] font-black sm:block'
                }`}>
                  Premium Selections
                </span>
              </div>
            </Link>

            {/* ── CENTER: Location + Search ─────────────────────────── */}
            <div className="hidden lg:flex flex-1 items-center gap-4 max-w-2xl">
              {/* Location chip */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=179/1+ถนนพระปกเกล้า+ตำบลศรีภูมิ+อำเภอเมืองเชียงใหม่+จังหวัดเชียงใหม่+50200"
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex shrink-0 items-center gap-3 rounded-2xl border border-stone-200/60 bg-white/60 shadow-sm transition-all duration-500 hover:border-[#a11a1a]/20 hover:bg-white hover:shadow-[#a11a1a]/8 hover:shadow-lg ${
                  scrolled ? 'px-3 py-1.5' : 'px-4 py-2.5'
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-xl bg-[#a11a1a] opacity-0 blur-md transition-all duration-500 group-hover:opacity-20" />
                  <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#a11a1a] to-rose-700 shadow-sm transition-all duration-500 ${
                    scrolled ? 'h-6 w-6' : 'h-8 w-8'
                  }`}>
                    <MapPin size={scrolled ? 11 : 14} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className={`font-black uppercase tracking-widest text-stone-800 transition-all duration-500 ${
                    scrolled ? 'text-[9px]' : 'text-[10px]'
                  }`}>Chiang Mai</span>
                  <span className={`font-medium text-stone-400 transition-all duration-500 ${
                    scrolled ? 'text-[8px] max-w-[80px] truncate' : 'text-[9px]'
                  }`}>179/1 Phrapokklao Rd.</span>
                </div>
              </a>

              {/* Search */}
              <form onSubmit={handleSearch} className="relative flex-1 group">
                <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${searchFocused ? 'bg-[#a11a1a]/5 shadow-lg shadow-[#a11a1a]/10 ring-2 ring-[#a11a1a]/15' : ''}`} />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`relative w-full rounded-2xl border border-stone-200/60 bg-white/70 pr-12 text-[11px] font-medium text-stone-700 placeholder:text-stone-300 focus:border-transparent focus:bg-white focus:outline-none transition-all duration-500 ${
                    scrolled ? 'px-4 py-2' : 'px-5 py-3'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-xl p-1.5 text-stone-300 transition-all duration-300 hover:text-[#a11a1a]"
                >
                  <Search size={15} strokeWidth={3} />
                </button>
              </form>
            </div>

            {/* ── RIGHT: Lang + Auth + Cart ─────────────────────────── */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Language picker */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center gap-1.5 rounded-xl border border-stone-200/60 bg-white/70 shadow-sm transition-all duration-500 hover:border-[#a11a1a]/20 hover:bg-white hover:shadow-md ${
                    scrolled ? 'px-2 py-1.5' : 'px-3 py-2.5'
                  }`}
                >
                  <span className="text-lg leading-none">{currentLang.flag}</span>
                  <ChevronDown
                    size={10} strokeWidth={3}
                    className={`text-stone-300 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isLangOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-20 overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-2xl backdrop-blur-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        aria-label={lang.name}
                        aria-pressed={language === lang.code}
                        className={`flex w-full items-center justify-center px-3 py-2.5 transition-colors hover:bg-[#a11a1a]/5 ${language === lang.code ? 'bg-[#a11a1a]/8' : ''}`}
                      >
                        <span className="text-xl leading-none">{lang.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mx-1 hidden h-5 w-px bg-stone-200/60 md:block" />

              {/* Auth buttons */}
              <div className="hidden md:flex items-center gap-2">
                {user ? (
                  <>
                    <Link
                      href="/account"
                      className={`group flex items-center gap-2.5 rounded-xl border border-stone-200/60 bg-white/70 shadow-sm transition-all duration-500 hover:border-[#a11a1a]/20 hover:bg-white hover:shadow-md ${
                        scrolled ? 'py-1.5 pl-2 pr-3' : 'py-2 pl-2.5 pr-4'
                      }`}
                    >
                      <div className={`flex items-center justify-center rounded-lg bg-gradient-to-br from-stone-100 to-stone-200 transition-all duration-500 group-hover:from-[#a11a1a]/10 group-hover:to-rose-100 ${
                        scrolled ? 'h-6 w-6' : 'h-7 w-7'
                      }`}>
                        <User size={13} strokeWidth={2.5} className="text-stone-500 group-hover:text-[#a11a1a] transition-colors" />
                      </div>
                      <span className="max-w-[80px] truncate text-[10px] font-black uppercase tracking-widest text-stone-500 transition-colors group-hover:text-stone-800">
                        {user.email}
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className={`flex items-center justify-center rounded-xl border border-stone-200/60 bg-white/70 text-stone-300 shadow-sm transition-all duration-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-90 ${
                        scrolled ? 'h-8 w-8' : 'h-9 w-9'
                      }`}
                    >
                      <LogOut size={14} strokeWidth={2.5} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1">
                    <Link
                      href="/login"
                      className={`text-[10px] font-black uppercase tracking-widest text-stone-400 transition-all duration-500 hover:text-stone-900 ${
                        scrolled ? 'px-3 py-2' : 'px-4 py-2.5'
                      }`}
                    >
                      {t('auth.login')}
                    </Link>
                    <Link
                      href="/register"
                      className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 via-[#a11a1a] to-rose-900 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#a11a1a]/20 transition-all duration-500 hover:shadow-[#a11a1a]/40 hover:scale-105 active:scale-95 ${
                        scrolled ? 'px-4 py-2' : 'px-5 py-2.5'
                      }`}
                    >
                      <span className="relative z-10">{t('auth.register')}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Cart button */}
              <Link
                href="/cart"
                aria-label="Cart"
                className={`group relative flex items-center justify-center rounded-full border border-stone-200/70 bg-white/80 text-stone-800 shadow-sm transition-all duration-500 hover:border-[#a11a1a]/20 hover:shadow-[#a11a1a]/15 hover:shadow-lg active:scale-90 ${
                  scrolled ? 'h-10 w-10 md:h-11 md:w-11' : 'h-11 w-11 md:h-12 md:w-12'
                }`}
              >
                <ShoppingBag
                  size={scrolled ? 17 : 19}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                {cartItemsCount > 0 && (
                  <span className="cart-badge-pulse absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#a11a1a] to-rose-700 text-[8px] font-black text-white shadow-lg">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* ── DESKTOP NAV BAR ───────────────────────────────────── */}
          <nav className={`hidden items-center justify-center gap-1 overflow-hidden transition-all duration-500 ease-in-out md:flex lg:gap-2 ${
            scrolled ? 'h-0 opacity-0 pointer-events-none' : 'h-12 opacity-100'
          }`}>
            {desktopNavItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link-line group flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-stone-600 transition-all duration-300 hover:bg-[#a11a1a]/5 hover:text-[#a11a1a]"
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    className="text-stone-400 transition-all duration-300 group-hover:text-[#a11a1a] group-hover:scale-110"
                  />
                  <span className="text-[0.78rem] font-bold tracking-wide">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-stone-900 shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Decorative floating mini bottle in nav */}
            <div className="ml-auto hidden lg:flex items-center gap-1.5 select-none pl-4 opacity-40">
              <FloatingWineBottle className="w-[8px] h-[22px] bottle-2" />
              <FloatingWineBottle className="w-[10px] h-[28px] bottle-1" />
              <FloatingWineBottle className="w-[8px] h-[22px] bottle-3" />
            </div>
          </nav>
        </div>

        {/* ── MOBILE MENU ───────────────────────────────────────────── */}
        {isMobileMenuOpen && (
          <div className="overflow-y-auto border-t border-stone-100/60 bg-white/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden animate-in slide-in-from-top-6 duration-300 ease-out">

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-stone-200/60 bg-stone-50 px-5 py-3.5 pr-12 text-sm font-medium text-stone-700 placeholder:text-stone-300 focus:border-[#a11a1a]/20 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#a11a1a]/10 transition-all"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-[#a11a1a]">
                <Search size={16} strokeWidth={2.5} />
              </button>
            </form>

            {/* Location */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=179/1+ถนนพระปกเกล้า+ตำบลศรีภูมิ+อำเภอเมืองเชียงใหม่+จังหวัดเชียงใหม่+50200"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex items-center gap-4 rounded-2xl border border-stone-100 bg-stone-50/80 p-4 shadow-inner transition-all active:scale-[0.98]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a11a1a] to-rose-700 shadow-md">
                <MapPin size={20} className="text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-wider text-stone-800">Chiang Mai</span>
                <span className="text-xs font-medium text-stone-400">179/1 Phrapokklao Rd.</span>
              </div>
            </a>

            {/* Nav links */}
            <nav className="flex flex-col gap-2">
              {desktopNavItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center justify-between rounded-2xl bg-stone-50/80 p-4 transition-all active:scale-[0.98] hover:bg-[#a11a1a]/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm transition-all group-hover:shadow-md group-hover:bg-[#a11a1a]/5">
                        <Icon size={18} strokeWidth={2} className="text-[#a11a1a]" />
                      </div>
                      <span className="text-sm font-black uppercase tracking-wider text-stone-700 group-hover:text-[#a11a1a] transition-colors">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[9px] font-black uppercase text-stone-900">
                          {item.badge}
                        </span>
                      )}
                      <ChevronDown size={16} strokeWidth={2.5} className="-rotate-90 text-stone-300" />
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile auth (if not logged in) */}
            {!user && (
              <div className="mt-4 flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-2xl border border-stone-200 py-3.5 text-center text-[11px] font-black uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-50"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 rounded-2xl bg-gradient-to-br from-stone-900 via-[#a11a1a] to-rose-900 py-3.5 text-center text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#a11a1a]/20 transition-all active:scale-95"
                >
                  {t('auth.register')}
                </Link>
              </div>
            )}

            {/* Language grid */}
            <div className="mt-5 border-t border-stone-100 pt-5">
              <p className="mb-3 px-1 text-[10px] font-black uppercase tracking-[0.32em] text-stone-400">World Languages</p>
              <div className="grid grid-cols-5 gap-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    aria-label={lang.name}
                    aria-pressed={language === lang.code}
                    className={`flex items-center justify-center rounded-xl border p-2.5 transition-all duration-200 ${
                      language === lang.code
                        ? 'scale-110 border-[#a11a1a]/30 bg-gradient-to-br from-[#a11a1a]/10 to-rose-50 shadow-md'
                        : 'border-stone-100 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <span className="text-xl leading-none">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
