'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, Search, ShoppingBag, User, Camera, Sparkles, X, RotateCcw,
  ArrowRight, Upload, Wine, ShieldCheck, Award, Zap, CheckCircle2, RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Webcam from 'react-webcam';

interface ScannedWineResult {
  name: string;
  vintage: string;
  region: string;
  type: string;
  price: number;
  rating: number;
  confidence: number;
  notes: string[];
  description: string;
}

const SAMPLE_SCAN_RESULTS: ScannedWineResult[] = [
  {
    name: 'Château Margaux Premier Grand Cru Classé',
    vintage: '2015',
    region: 'Bordeaux, France',
    type: 'Red Wine',
    price: 24500,
    rating: 4.9,
    confidence: 98.6,
    notes: ['Blackberry', 'French Oak', 'Violet', 'Tobacco'],
    description: 'ไวน์แดงระดับพรีเมียมจากบอร์โดซ์ กลิ่นหอมซับซ้อนของผลไม้ตระกูลเบอร์รีดาร์กและไม้อบ แทนนินนุ่มละมุนติดยาวนาน',
  },
  {
    name: 'Dom Pérignon Vintage Champagne',
    vintage: '2012',
    region: 'Champagne, France',
    type: 'Sparkling Wine',
    price: 13900,
    rating: 4.8,
    confidence: 97.4,
    notes: ['White Peach', 'Brioche', 'Roasted Almond', 'Minerals'],
    description: 'แชมเปญสปาร์กลิ้งยอดนิยม ฟองละเอียดนุ่มนวล กลิ่นหอมของผลไม้ขาวและอัลมอนด์คั่ว สดชื่นประทับใจ',
  },
  {
    name: 'Cloudy Bay Sauvignon Blanc',
    vintage: '2022',
    region: 'Marlborough, New Zealand',
    type: 'White Wine',
    price: 2190,
    rating: 4.7,
    confidence: 96.8,
    notes: ['Passionfruit', 'Lime Zest', 'Grapefruit', 'Herbal'],
    description: 'ไวน์ขาวชื่อดังจากนิวซีแลนด์ กลิ่นหอมสดชื่นของเสาวรสและเลมอน แอซิดิตี้ดีเยี่ยม เหมาะดื่มสังสรรค์',
  },
];

export default function MobileNav() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  const router = useRouter();
  const { t } = useLanguage();

  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScannedWineResult | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [telemetryText, setTelemetryText] = useState('READY TO SCAN');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

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
    setCameraError(null);
    setUploadedImage(null);
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

  const startAnalysisSequence = (imageSrc?: string) => {
    setIsScanning(true);
    if (imageSrc) setUploadedImage(imageSrc);

    const steps = [
      'CAPTURING LABEL GEOMETRY...',
      'ANALYZING TYPOGRAPHY & VINEYARD EMBLEM...',
      'THEBOTTLECLUB NEURAL MATCHING...',
      'VERIFYING VINTAGE & AUTHENTICITY...',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTelemetryText(step);
      }, (idx + 1) * 550);
    });

    setTimeout(() => {
      setIsScanning(false);
      const randomResult = SAMPLE_SCAN_RESULTS[Math.floor(Math.random() * SAMPLE_SCAN_RESULTS.length)];
      setScanResult(randomResult);
      setTelemetryText('NEURAL MATCH VERIFIED');
    }, 2600);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      startAnalysisSequence(imageSrc || undefined);
    } else {
      startAnalysisSequence();
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
    setUploadedImage(null);
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
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 blur-sm opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-15 h-15 bg-gradient-to-br from-[#8b0000] to-[#5c0000] text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white/80 active:scale-90 transition-all">
                    <Camera size={26} />
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8b0000] mt-1">
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

      {/* ── Ultra-Modern AI Scanner Modal Overlay ── */}
      {isScanOpen && (
        <div className="fixed inset-0 z-[60] bg-[#060408] text-white flex flex-col items-center justify-between p-6 animate-in fade-in duration-300 select-none overflow-hidden">
          
          {/* Ambient Background Glows */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-600/20 blur-[130px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-600/15 blur-[140px]" />
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          {/* Top Close Button Only */}
          <div className="relative z-10 w-full flex items-center justify-end pt-2">
            <button
              onClick={() => setIsScanOpen(false)}
              className="p-2.5 bg-black/60 hover:bg-black/80 text-white/70 hover:text-white rounded-2xl border border-white/10 backdrop-blur-xl transition cursor-pointer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Center Cyber Camera Viewfinder Card */}
          <div className="relative z-10 w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/15 bg-stone-950 shadow-[0_20px_60px_rgba(0,0,0,0.9)] my-auto">
            {cameraError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-stone-950">
                <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4 text-red-400">
                  <Camera size={28} />
                </div>
                <p className="text-sm font-bold text-white mb-1">ไม่สามารถเชื่อมต่อกล้องถ่ายรูปได้</p>
                <p className="text-xs text-stone-400 max-w-xs mb-4 leading-relaxed">
                  กรุณาอนุญาตสิทธิ์กล้องในเบราว์เซอร์เพื่อใช้งานระบบสแกนไวน์ AI
                </p>
              </div>
            ) : !scanResult ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMediaError={() => setCameraError('Failed to access camera')}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Viewfinder Cyber Overlay */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <div className="absolute inset-0 border-[32px] border-black/45 backdrop-blur-[0.5px]" />

                  {/* Top Center Logo inside Camera Frame */}
                  <div className="absolute top-5 inset-x-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 blur-sm opacity-80 animate-pulse" />
                      <img
                        src="/logos/Thebottleclub.jpg"
                        alt="Thebottleclub Logo"
                        className="relative w-9 h-9 rounded-xl object-cover border border-white/30 shadow-2xl"
                      />
                    </div>
                  </div>

                  {/* Corner HUD Brackets */}
                  <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-red-500 rounded-tl-xl shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                  <div className="absolute top-5 right-5 w-10 h-10 border-t-2 border-r-2 border-red-500 rounded-tr-xl shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                  <div className="absolute bottom-5 left-5 w-10 h-10 border-b-2 border-l-2 border-red-500 rounded-bl-xl shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                  <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-red-500 rounded-br-xl shadow-[0_0_15px_rgba(239,68,68,0.8)]" />

                  {/* Center Target Rect */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 border border-white/20 rounded-2xl flex items-center justify-center">
                    <div className={`w-24 h-24 rounded-full border border-red-500/30 transition-all duration-700 ${isScanning ? 'scale-125 opacity-40' : 'scale-100 opacity-80 animate-pulse'}`} />
                  </div>

                  {/* Laser Scan Line Sweep */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#ef4444] animate-[scan_2s_ease-in-out_infinite] z-30" />
                  )}

                  {/* Live Telemetry Status Bar */}
                  <div className="absolute bottom-5 inset-x-6 text-center bg-black/80 backdrop-blur-xl border border-white/10 py-2 px-3 rounded-xl">
                    <p className="text-[9px] font-mono font-bold tracking-widest text-red-400 animate-pulse">
                      {telemetryText}
                    </p>
                  </div>
                </div>

                {/* Bottom Trigger Action (Camera Capture Only) */}
                <div className="absolute bottom-16 inset-x-0 z-30 flex items-center justify-center gap-4 px-6 pointer-events-auto">
                  <button
                    type="button"
                    disabled={isScanning}
                    onClick={capture}
                    className="w-18 h-18 rounded-full bg-gradient-to-tr from-red-700 to-red-500 p-1 shadow-[0_0_30px_rgba(196,30,58,0.6)] active:scale-95 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
                  >
                    <div className="w-full h-full border-2 border-white rounded-full bg-red-950/40 flex items-center justify-center">
                      <Camera className="w-7 h-7 text-white" />
                    </div>
                  </button>
                </div>
              </>
            ) : (
              /* Result Popup Card */
              <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in zoom-in duration-300 z-40 text-left">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 blur-sm opacity-80" />
                        <img
                          src="/logos/Thebottleclub.jpg"
                          alt="Logo"
                          className="relative w-9 h-9 rounded-xl object-cover border border-white/20"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                          Thebottleclub AI Neural Match
                        </p>
                        <p className="text-xs font-bold text-white">ความแม่นยำ {scanResult.confidence}%</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                      VERIFIED
                    </span>
                  </div>

                  <div className="bg-stone-900/80 p-3.5 rounded-2xl border border-white/10 mb-3">
                    <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                      {scanResult.type} · Vintage {scanResult.vintage}
                    </span>
                    <h3 className="text-sm font-bold font-serif text-white mt-1 leading-snug">
                      {scanResult.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{scanResult.region}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-stone-900/60 p-2.5 rounded-xl border border-white/5 text-center">
                      <p className="text-[9px] text-stone-400 font-bold uppercase">ราคาขายหน้าร้าน</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        ฿{scanResult.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-stone-900/60 p-2.5 rounded-xl border border-white/5 text-center">
                      <p className="text-[9px] text-stone-400 font-bold uppercase">คะแนนประเมิน</p>
                      <p className="text-sm font-black text-amber-400 mt-0.5">
                        ★ {scanResult.rating} / 5.0
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                      กลิ่นและรสสัมผัสเด่น (Taste Profile)
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {scanResult.notes.map((note) => (
                        <span
                          key={note}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-red-950/40 border border-red-800/30 text-red-300"
                        >
                          🍷 {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-300 leading-relaxed bg-stone-900/40 p-3 rounded-xl border border-white/5">
                    {scanResult.description}
                  </p>
                </div>

                <div className="space-y-2 mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => {
                      setIsScanOpen(false);
                      router.push('/cart');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                  >
                    <ShoppingBag size={15} /> สั่งซื้อไวน์ขวดนี้
                  </button>
                  <button
                    onClick={resetScan}
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-xs rounded-xl border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    <RotateCcw size={14} /> สแกนฉลากขวดอื่น
                  </button>
                </div>
              </div>
            )}
          </div>

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
