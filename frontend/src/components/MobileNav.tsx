'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, Search, ShoppingBag, User, Camera, Sparkles, X, RotateCcw,
  ArrowRight, Upload, Wine, ShieldCheck, Award, Zap, CheckCircle2, RefreshCw,
  MapPin, CalendarDays, Globe, Star
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Webcam from 'react-webcam';

interface WineAIScanResult {
  name: string;
  vintage: string;
  country: string;
  country_th: string;
  region: string;
  region_th: string;
  city: string;
  city_th: string;
  type: string;
  type_th: string;
  grape: string;
  alcohol: string;
  description_th: string;
  price_estimate: number;
  rating: number;
  confidence: number;
  notes: string[];
  city_image_query: string;
}

// Country code mapping for flag emoji
const COUNTRY_FLAG_MAP: Record<string, string> = {
  'France': '🇫🇷', 'Italy': '🇮🇹', 'Spain': '🇪🇸', 'Australia': '🇦🇺',
  'USA': '🇺🇸', 'United States': '🇺🇸', 'Chile': '🇨🇱', 'Argentina': '🇦🇷',
  'Germany': '🇩🇪', 'New Zealand': '🇳🇿', 'Portugal': '🇵🇹', 'South Africa': '🇿🇦',
  'Austria': '🇦🇹', 'Greece': '🇬🇷', 'Hungary': '🇭🇺', 'Japan': '🇯🇵',
  'Thailand': '🇹🇭', 'China': '🇨🇳',
};

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<WineAIScanResult | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [telemetryText, setTelemetryText] = useState('READY TO SCAN');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    setScanResult(null);
    setScanError(null);
    setCameraError(null);
    setUploadedImage(null);
    setCityImageUrl(null);
    setIsScanning(false);
    setTelemetryText('READY TO SCAN');
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

  // ── DEMO mock results (ใช้แทน AI จริงระหว่างทดสอบ) ──
  // city_image_query ในโหมด demo = URL รูปโดยตรงจาก Unsplash CDN (ไม่ต้อง API key)
  const DEMO_RESULTS: WineAIScanResult[] = [
    {
      name: 'Château Margaux Premier Grand Cru Classé',
      vintage: '2015',
      country: 'France',
      country_th: 'ฝรั่งเศส',
      region: 'Bordeaux',
      region_th: 'บอร์โดซ์',
      city: 'Margaux',
      city_th: 'มาร์โก',
      type: 'Red Wine',
      type_th: 'ไวน์แดง',
      grape: 'Cabernet Sauvignon',
      alcohol: '13.5%',
      description_th: 'ไวน์แดงระดับตำนานจากบอร์โดซ์ กลิ่นหอมซับซ้อนของผลไม้เบอร์รีดาร์กและไม้โอ๊ค แทนนินนุ่มละมุนยาวนาน เหมาะเก็บสะสมหรือดื่มคู่เนื้อแดงชั้นเลิศ',
      price_estimate: 24500,
      rating: 4.9,
      confidence: 98.6,
      notes: ['Blackberry', 'French Oak', 'Violet', 'Tobacco'],
      // Bordeaux vineyard landscape — Unsplash photo by Maja Petric
      city_image_query: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=450&fit=crop&q=80',
    },
    {
      name: 'Dom Pérignon Vintage Champagne',
      vintage: '2012',
      country: 'France',
      country_th: 'ฝรั่งเศส',
      region: 'Champagne',
      region_th: 'ชองปาญ',
      city: 'Épernay',
      city_th: 'เอเปอร์เนย์',
      type: 'Sparkling Wine',
      type_th: 'ไวน์สปาร์กลิ้ง',
      grape: 'Chardonnay & Pinot Noir',
      alcohol: '12.5%',
      description_th: 'แชมเปญระดับไอคอนจากค่าย Moët & Chandon ฟองละเอียดนุ่มนวล กลิ่นหอมของผลไม้ขาว อัลมอนด์คั่ว และขนมปังสด สดชื่นและหรูหรา',
      price_estimate: 13900,
      rating: 4.8,
      confidence: 97.4,
      notes: ['White Peach', 'Brioche', 'Roasted Almond', 'Minerals'],
      // Champagne vineyards — Unsplash photo
      city_image_query: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80',
    },
    {
      name: 'Cloudy Bay Sauvignon Blanc',
      vintage: '2022',
      country: 'New Zealand',
      country_th: 'นิวซีแลนด์',
      region: 'Marlborough',
      region_th: 'มาร์ลโบโรห์',
      city: 'Blenheim',
      city_th: 'เบลนไฮม์',
      type: 'White Wine',
      type_th: 'ไวน์ขาว',
      grape: 'Sauvignon Blanc',
      alcohol: '13.0%',
      description_th: 'ไวน์ขาวชื่อดังจากนิวซีแลนด์ กลิ่นหอมสดชื่นของเสาวรสและส้มเลมอน แอซิดิตี้จัดจ้านดีเยี่ยม ดื่มง่ายทุกโอกาส',
      price_estimate: 2190,
      rating: 4.7,
      confidence: 96.8,
      notes: ['Passionfruit', 'Lime Zest', 'Grapefruit', 'Herbal'],
      // Marlborough NZ vineyard — Unsplash photo
      city_image_query: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800&h=450&fit=crop&q=80',
    },
  ];

  const startAnalysisSequence = (imageSrc?: string) => {
    setIsScanning(true);
    setScanError(null);
    if (imageSrc) setUploadedImage(imageSrc);

    const steps = [
      'CAPTURING LABEL GEOMETRY...',
      'ANALYZING TYPOGRAPHY & VINEYARD EMBLEM...',
      'AI NEURAL MATCHING...',
      'VERIFYING VINTAGE & AUTHENTICITY...',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => setTelemetryText(step), (idx + 1) * 600);
    });

    // สุ่มผลลัพธ์จาก mock data หลัง 2.8 วินาที
    setTimeout(() => {
      const result = DEMO_RESULTS[Math.floor(Math.random() * DEMO_RESULTS.length)];
      setScanResult(result);
      setTelemetryText('NEURAL MATCH VERIFIED ✓');
      setIsScanning(false);
      // city_image_query ในโหมด demo คือ URL รูปโดยตรง
      setCityImageUrl(result.city_image_query);
    }, 2800);
  };

  const capture = useCallback(() => {
    // Demo mode: เรียก scan ได้เลยไม่ต้องอาศัยกล้องจริง
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      startAnalysisSequence(imageSrc || 'demo');
    } else {
      // ไม่มีกล้อง → ใช้ demo mock ได้เลย
      startAnalysisSequence('demo');
    }
  }, [webcamRef]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        startAnalysisSequence(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetScan = () => {
    setScanResult(null);
    setScanError(null);
    setUploadedImage(null);
    setCityImageUrl(null);
    setIsScanning(false);
    setTelemetryText('READY TO SCAN');
  };

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: 'environment',
  };


  return (
    <>
      {/* ── Bottom Mobile Bar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/85 backdrop-blur-xl border-t border-stone-200 px-6 py-3 z-40 flex items-center justify-between pb-safe shadow-2xl">
        {navItems.map((item, idx) => {
          if (item.icon === 'scan') {
            return (
              <button
                key={idx}
                onClick={handleScanInit}
                className="relative -top-7 flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="relative">
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 blur-md opacity-85 group-hover:opacity-100 transition-opacity animate-pulse" />
                  <div className="relative w-15 h-15 bg-black rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(245,158,11,0.5),inset_0_1px_2px_rgba(255,255,255,0.5)] border-2 border-amber-400 active:scale-90 transition-all overflow-hidden p-2">
                    <img
                      src="/logos/bottle-walking-icon.png"
                      alt="AI Scan"
                      className="w-full h-full object-contain filter drop-shadow-md"
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

      {/* ── Ultra-Modern AI Scanner Modal Overlay (Pattern Background + Gold Glass) ── */}
      {isScanOpen && (
        <div className="fixed inset-0 z-[60] bg-[#e7d5b8] text-white flex flex-col items-center justify-between p-6 animate-in fade-in duration-300 select-none overflow-hidden">
          
          {/* User's "Your Local Drunk Dealer" Custom Pattern Background */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: "url('/images/scan-bg-pattern.jpg')",
            }}
          />

          {/* Golden Warm Glass Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090704]/45 via-black/20 to-[#090704]/75 pointer-events-none" />

          {/* Ambient Golden Background Glows & Glass Reflections */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-amber-500/25 via-yellow-500/15 to-transparent blur-[140px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-amber-600/25 via-yellow-600/15 to-transparent blur-[150px]" />
            <div className="absolute top-[35%] left-[25%] w-[45%] h-[45%] rounded-full bg-yellow-400/15 blur-[130px]" />
          </div>

          {/* Top Close Button (Glassmorphic) */}
          <div className="relative z-10 w-full flex items-center justify-end pt-2">
            <button
              onClick={() => setIsScanOpen(false)}
              className="p-2.5 bg-stone-900/60 hover:bg-stone-800/80 text-amber-200/90 hover:text-white rounded-2xl border border-amber-400/30 backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] transition cursor-pointer active:scale-95"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Cyber Camera Viewfinder Card (Golden Glassmorphism) */}
          <div className="relative z-10 w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-amber-400/35 bg-stone-950/80 backdrop-blur-3xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),_0_0_40px_rgba(245,158,11,0.2),_inset_0_1px_2px_rgba(255,255,255,0.25)] my-auto">
            {scanError ? (
              /* Error State (Frosted Glass) */
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-stone-950/90 backdrop-blur-2xl z-40 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-5 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                  <X size={32} />
                </div>
                <p className="text-base font-black text-white mb-2">สแกนไม่สำเร็จ</p>
                <p className="text-sm text-stone-400 leading-relaxed mb-6">{scanError}</p>
                <button
                  onClick={resetScan}
                  className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs rounded-xl shadow-[0_8px_25px_rgba(245,158,11,0.45)] flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <RotateCcw size={14} /> สแกนใหม่
                </button>
              </div>
            ) : scanResult ? (
              <div className="absolute inset-0 bg-[#090704]/90 backdrop-blur-3xl overflow-y-auto animate-in zoom-in-95 duration-300 z-40 text-stone-100">
                {/* ── Premium Wine Result Card (Golden Glassmorphism + Pattern) ── */}
                {/* Subtle Brand Pattern Background Layer */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none mix-blend-screen"
                  style={{ backgroundImage: "url('/images/scan-bg-pattern.jpg')" }}
                />

                {/* ── Top Bar: Logo + Verified Badge ── */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-xl border border-amber-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    <div className="relative">
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 blur-sm opacity-80" />
                      <img
                        src="/logos/Thebottleclub.jpg"
                        alt="Logo"
                        className="relative w-6 h-6 rounded-lg object-cover border border-amber-200/50"
                      />
                    </div>
                    <p className="text-[9px] font-black text-amber-200 uppercase tracking-widest">
                      BottleClub AI
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-500/20 to-amber-600/25 backdrop-blur-xl border border-amber-400/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35),inset_0_1px_1px_rgba(255,255,255,0.3)]">
                    <Sparkles size={11} className="text-amber-300 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      VERIFIED {scanResult.confidence.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* ── Side-by-Side: City Image (Left) + Wine Info (Right) ── */}
                <div className="px-4 pt-2 pb-1">
                  <div className="bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-[#0c0905]/95 backdrop-blur-2xl rounded-3xl p-3 border border-amber-400/35 shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] grid grid-cols-12 gap-3 items-stretch">
                    
                    {/* Left: City / Region Image */}
                    <div className="col-span-5 relative rounded-2xl overflow-hidden border border-amber-400/40 bg-stone-900 shadow-[0_6px_20px_rgba(0,0,0,0.6)] flex flex-col justify-end min-h-[195px]">
                      {cityImageUrl ? (
                        <img
                          src={cityImageUrl}
                          alt={`${scanResult.city}, ${scanResult.region}`}
                          className="absolute inset-0 w-full h-full object-cover brightness-95"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-stone-900 to-stone-950 flex items-center justify-center">
                          <Wine size={36} className="text-amber-500/50" />
                        </div>
                      )}

                      {/* Gradient shadow over bottom of image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Location Badge (Bottom of Image) */}
                      <div className="relative z-10 m-2 px-2 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-200 shadow-md flex items-center gap-1.5">
                        <MapPin size={11} className="text-amber-400 flex-shrink-0" />
                        <span className="text-[10px] font-bold leading-tight line-clamp-2">
                          {scanResult.city_th || scanResult.city}, {scanResult.region_th || scanResult.region}
                        </span>
                      </div>
                    </div>

                    {/* Right: Wine Details */}
                    <div className="col-span-7 flex flex-col justify-between py-0.5">
                      <div className="space-y-1.5">
                        {/* Wine type & Vintage */}
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 to-yellow-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 uppercase tracking-wider">
                            {scanResult.type_th || scanResult.type}
                          </span>
                          <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-amber-200 flex items-center gap-1">
                            <CalendarDays size={10} className="text-amber-300" /> {scanResult.vintage}
                          </span>
                        </div>

                        {/* Wine Name */}
                        <h3 className="text-sm font-black font-serif text-white leading-snug tracking-tight drop-shadow-sm line-clamp-3">
                          {scanResult.name}
                        </h3>

                        {/* Grape variety & Alcohol */}
                        {scanResult.grape && (
                          <div className="text-[10px] font-medium text-stone-300 flex items-center gap-1">
                            <span>🍇</span>
                            <span className="truncate">{scanResult.grape}</span>
                            <span className="text-amber-400/90 font-bold">· {scanResult.alcohol}</span>
                          </div>
                        )}

                        {/* Origin country */}
                        <div className="text-[10px] font-semibold text-amber-200/90 flex items-center gap-1.5">
                          <span>{COUNTRY_FLAG_MAP[scanResult.country] || '🌍'}</span>
                          <span>{scanResult.country_th || scanResult.country}</span>
                        </div>
                      </div>

                      {/* Estimated Price */}
                      <div className="mt-2 pt-2 border-t border-amber-400/20 flex items-baseline justify-between">
                        <span className="text-[9px] text-amber-300/70 font-bold uppercase tracking-wider">ราคาประเมิน</span>
                        <span className="text-base font-black font-serif text-amber-300 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">
                          ฿{scanResult.price_estimate.toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ── Wine Info Section ── */}
                <div className="px-4 pt-2 pb-6 flex flex-col gap-3">

                  {/* ── 3-column stats with Golden Glass Pods ── */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="bg-gradient-to-b from-amber-500/10 via-amber-950/20 to-stone-950/80 backdrop-blur-2xl rounded-2xl p-3 border border-amber-400/25 flex flex-col items-center text-center gap-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),_0_10px_25px_rgba(0,0,0,0.5),_0_0_15px_rgba(245,158,11,0.08)]">
                      <span className="text-2xl leading-none">
                        {COUNTRY_FLAG_MAP[scanResult.country] || '🌍'}
                      </span>
                      <p className="text-[9px] font-black text-amber-300/80 uppercase tracking-widest mt-0.5">ประเทศ</p>
                      <p className="text-[11px] font-black text-white leading-tight">
                        {scanResult.country_th || scanResult.country}
                      </p>
                    </div>

                    <div className="bg-gradient-to-b from-amber-500/10 via-amber-950/20 to-stone-950/80 backdrop-blur-2xl rounded-2xl p-3 border border-amber-400/25 flex flex-col items-center text-center gap-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),_0_10px_25px_rgba(0,0,0,0.5),_0_0_15px_rgba(245,158,11,0.08)]">
                      <CalendarDays size={20} className="text-amber-400" />
                      <p className="text-[9px] font-black text-amber-300/80 uppercase tracking-widest mt-0.5">ปีผลิต</p>
                      <p className="text-base font-black text-amber-300 leading-tight font-serif">{scanResult.vintage}</p>
                    </div>

                    <div className="bg-gradient-to-b from-amber-500/10 via-amber-950/20 to-stone-950/80 backdrop-blur-2xl rounded-2xl p-3 border border-amber-400/25 flex flex-col items-center text-center gap-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),_0_10px_25px_rgba(0,0,0,0.5),_0_0_15px_rgba(245,158,11,0.08)]">
                      <Star size={20} className="text-amber-400 fill-amber-400" />
                      <p className="text-[9px] font-black text-amber-300/80 uppercase tracking-widest mt-0.5">คะแนน</p>
                      <p className="text-base font-black text-amber-300 leading-tight font-serif">{scanResult.rating.toFixed(1)}</p>
                    </div>
                  </div>

                  {/* Terroir / Origin Glass Banner */}
                  <div className="flex items-center gap-3 bg-gradient-to-r from-amber-950/30 via-stone-900/50 to-amber-950/20 backdrop-blur-2xl rounded-2xl p-3.5 border border-amber-400/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                      <Globe size={16} />
                    </div>
                    <div>
                      <p className="text-[9px] text-amber-400/80 uppercase tracking-widest font-black">แหล่งกำเนิดและไร่องุ่น (Terroir)</p>
                      <p className="text-xs font-bold text-stone-200 mt-0.5">
                        {scanResult.city_th || scanResult.city} · {scanResult.region_th || scanResult.region} · {scanResult.country_th || scanResult.country}
                      </p>
                    </div>
                  </div>

                  {/* Tasting notes in Frosted Gold Glass */}
                  {scanResult.notes && scanResult.notes.length > 0 && (
                    <div>
                      <p className="text-[9px] font-black text-amber-400/80 uppercase tracking-[0.25em] mb-2 flex items-center gap-1.5">
                        <Sparkles size={11} className="text-amber-400" />
                        Tasting Profile Notes
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.notes.map((note, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-950/45 to-yellow-950/35 border border-amber-400/35 text-amber-200 shadow-[0_2px_12px_rgba(245,158,11,0.15),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md"
                          >
                            🍷 {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sommelier Tasting Note (Glass Card) */}
                  <div className="bg-stone-900/50 backdrop-blur-2xl p-3.5 rounded-2xl border-l-3 border-l-amber-400 border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                    <p className="text-[9px] font-black uppercase tracking-widest text-amber-400/90 mb-1">
                      Sommelier Note (บทวิเคราะห์จากผู้เชี่ยวชาญ)
                    </p>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {scanResult.description_th}
                    </p>
                  </div>

                  {/* Price & Confidence in Golden Glass */}
                  <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-stone-950/80 backdrop-blur-2xl rounded-2xl p-4 border border-amber-400/40 shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(251,191,36,0.35)]">
                    <div>
                      <p className="text-[9px] text-amber-300/80 font-bold uppercase tracking-wider">ราคาประเมินตลาด</p>
                      <p className="text-xl font-black font-serif text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]">
                        ฿{scanResult.price_estimate.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-amber-300/80 font-bold uppercase tracking-wider">ความแม่นยำ AI</p>
                      <p className="text-sm font-black text-amber-300 font-mono tracking-wider">{scanResult.confidence.toFixed(1)}%</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      onClick={() => {
                        setIsScanOpen(false);
                        router.push('/product');
                      }}
                      className="w-full py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-2xl shadow-[0_12px_35px_rgba(245,158,11,0.5),inset_0_1px_2px_rgba(255,255,255,0.7)] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <ShoppingBag size={16} /> สั่งซื้อไวน์ขวดนี้
                    </button>
                    <button
                      onClick={resetScan}
                      className="w-full py-3.5 bg-stone-950/70 hover:bg-stone-900/90 text-amber-200 hover:text-white font-bold text-xs rounded-2xl border border-amber-400/35 backdrop-blur-xl flex items-center justify-center gap-2 cursor-pointer transition active:scale-95 shadow-[0_6px_20px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
                    >
                      <RotateCcw size={15} /> สแกนฉลากขวดอื่น
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Camera Viewfinder (Golden Glass Cyberpunk) ── */
              <>
                {/* กล้อง หรือ placeholder ถ้าไม่มีกล้อง */}
                {!cameraError ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    onUserMediaError={() => setCameraError('no-camera')}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  /* Placeholder เมื่อไม่มีกล้อง (Golden Theme) */
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-stone-950/80 via-amber-950/15 to-stone-950/90 backdrop-blur-xl">
                    <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                      <Camera size={28} className="text-amber-400" />
                    </div>
                    <p className="text-xs text-amber-200/90 font-bold text-center px-6 leading-relaxed">
                      โหมดทดสอบระบบสแกน AI<br/>
                      <span className="text-stone-400 font-normal text-[11px]">กดปุ่มทองด้านล่างเพื่อเริ่มสแกน</span>
                    </p>
                  </div>
                )}

                {/* Viewfinder Overlay with Golden Glass HUD */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute inset-0 border-[32px] border-black/55 backdrop-blur-[0.5px]" />

                  {/* Logo Center */}
                  <div className="absolute top-5 inset-x-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 blur-sm opacity-90 animate-pulse" />
                      <img src="/logos/Thebottleclub.jpg" alt="Logo" className="relative w-9 h-9 rounded-xl object-cover border border-amber-200/60 shadow-xl" />
                    </div>
                  </div>

                  {/* Golden Corner HUD Brackets */}
                  <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-amber-400 rounded-tl-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
                  <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-amber-400 rounded-tr-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
                  <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-amber-400 rounded-bl-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
                  <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-amber-400 rounded-br-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />

                  {/* Center Target Rect with Golden Pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border border-amber-400/25 rounded-2xl flex items-center justify-center">
                    <div className={`w-24 h-24 rounded-full border border-amber-400/40 transition-all duration-700 ${isScanning ? 'scale-125 opacity-40' : 'scale-100 opacity-80 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.3)]'}`} />
                  </div>

                  {/* Golden Laser Sweep */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_20px_#f59e0b,0_0_40px_#eab308] animate-[scan_2s_ease-in-out_infinite] z-30" />
                  )}

                  {/* Live Telemetry Status Bar (Golden Glass) */}
                  <div className="absolute bottom-5 inset-x-6 text-center bg-black/75 backdrop-blur-2xl border border-amber-400/30 py-2.5 px-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
                    <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-amber-300 animate-pulse">{telemetryText}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── ปุ่ม Scan & Upload (Golden Crystal Glass) ── */}
          {!scanResult && !scanError && (
            <div className="relative z-20 flex items-center justify-center gap-5 pb-3">
              {/* ปุ่มหลัก: ถ่ายรูป / scan demo (The Bottle Club Mascot) */}
              <button
                type="button"
                disabled={isScanning}
                onClick={capture}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-1 shadow-[0_0_35px_rgba(245,158,11,0.65),_0_0_70px_rgba(234,179,8,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                <div className="w-full h-full border-2 border-amber-300/80 rounded-full bg-black flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] overflow-hidden p-2.5">
                  <img
                    src="/logos/bottle-walking-icon.png"
                    alt="Scan Wine"
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
              </button>

              {/* ปุ่มอัปโหลดรูป (Frosted Gold Glass) */}
              <button
                type="button"
                disabled={isScanning}
                onClick={() => fileInputRef.current?.click()}
                className="w-13 h-13 rounded-full bg-stone-900/80 backdrop-blur-xl border border-amber-400/35 flex items-center justify-center text-amber-300 hover:text-amber-100 hover:border-amber-300 shadow-[0_6px_25px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-95 transition cursor-pointer disabled:opacity-50"
              >
                <Upload size={19} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          )}

        </div>
      )}



      <style jsx>{`
        @keyframes scan {
          0% { top: 12%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 88%; opacity: 0; }
        }
      `}</style>
    </>
  );
}
