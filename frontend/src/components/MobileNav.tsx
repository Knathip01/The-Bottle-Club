'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, ShoppingBag, User, Camera, Sparkles, X, RotateCcw, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Webcam from 'react-webcam';

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const webcamRef = useRef<Webcam>(null);
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
    setScanResult(null);
    setCameraError(null);
    setIsScanning(false);
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

  const capture = useCallback(() => {
    if (webcamRef.current) {
      setIsScanning(true);
      const imageSrc = webcamRef.current.getScreenshot();
      
      // Simulate AI processing the captured image
      setTimeout(() => {
        setIsScanning(false);
        setScanResult("Detected: Chateau Margaux 2015. Premium Red Wine from Bordeaux. Current Price: ฿24,500");
      }, 2500);
    }
  }, [webcamRef]);

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "environment" // Use back camera
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-stone-200 px-6 py-3 z-40 flex items-center justify-between pb-safe">
        {navItems.map((item, idx) => {
          if (item.icon === 'scan') {
            return (
              <button
                key={idx}
                onClick={handleScanInit}
                className="relative -top-8 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-[#8b0000] text-white rounded-full flex items-center justify-center shadow-xl shadow-red-900/30 border-4 border-white active:scale-95 transition-all">
                  <Camera size={28} />
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
                 className={`flex flex-col items-center justify-center gap-1 transition-colors ${
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

      {/* Quick Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-2xl flex flex-col p-6 animate-in slide-in-from-bottom-5 duration-300">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-[#8b0000]">Quick Search</h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 bg-stone-100 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
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
                placeholder={t('search.placeholder') || "Search products..."}
                className="w-full bg-stone-100 border-none rounded-2xl py-5 px-6 pr-16 text-lg font-bold placeholder:text-stone-400 focus:ring-2 focus:ring-[#8b0000]/10 transition-all outline-none"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#8b0000] text-white rounded-xl flex items-center justify-center shadow-lg shadow-red-900/20 active:scale-90 transition-transform"
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
                      className="py-4 bg-stone-50 border border-stone-100 rounded-2xl text-xs font-black uppercase tracking-widest text-stone-600 hover:bg-white hover:border-[#8b0000]/20 hover:text-[#8b0000] transition-all text-center"
                    >
                       {cat}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* AI Scan Modal/Overlay */}
      {isScanOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <button 
            onClick={() => setIsScanOpen(false)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors z-[70]"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-stone-900 shadow-2xl">
            {cameraError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
                  <X size={32} />
                </div>
                <p className="text-white font-bold mb-2">Camera Access Denied</p>
                <p className="text-stone-500 text-xs">Please enable camera permissions in your browser settings to use the AI Scanner.</p>
              </div>
            ) : !scanResult ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMediaError={() => setCameraError("Failed to access camera")}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Viewfinder Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 border-[40px] border-stone-950/40 backdrop-blur-[1px]"></div>
                  
                  {/* Corners */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-2xl shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-2xl shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-2xl shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-2xl shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>

                  {/* Scanning Animation */}
                  {isScanning && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-[scan_2s_ease-in-out_infinite] z-20"></div>
                  )}

                  {/* AI Pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className={`w-32 h-32 rounded-full border-2 border-white/20 transition-all duration-1000 ${isScanning ? 'scale-150 opacity-0' : 'scale-100 opacity-100 animate-pulse'}`}></div>
                  </div>
                </div>

                {/* Capture Button */}
                {!isScanning && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
                    <button 
                      onClick={capture}
                      className="w-16 h-16 bg-white rounded-full p-1 shadow-2xl active:scale-90 transition-transform"
                    >
                      <div className="w-full h-full border-4 border-stone-900 rounded-full bg-white"></div>
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Scan Result Overlay */
              <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-[#8b0000]/20 rounded-3xl flex items-center justify-center mb-6 border border-[#8b0000]/30 shadow-[0_0_30px_rgba(139,0,0,0.3)]">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">Neural Match Found</h2>
                <div className="w-12 h-1 bg-[#8b0000] mb-6"></div>
                <p className="text-stone-300 text-sm leading-relaxed font-medium mb-10">{scanResult}</p>
                
                <div className="w-full space-y-3">
                  <button 
                    onClick={() => setIsScanOpen(false)}
                    className="w-full py-5 bg-[#8b0000] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-red-900/20 active:scale-95 transition-all"
                  >
                    Checkout Product
                  </button>
                  <button 
                    onClick={() => setScanResult(null)}
                    className="w-full py-5 bg-white/5 text-white/60 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl border border-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Scan New Label
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 text-center max-w-xs">
            <div className="flex items-center justify-center gap-3 mb-4">
               <div className="h-[1px] w-8 bg-white/20"></div>
               <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">Quantum AI Vision</p>
               <div className="h-[1px] w-8 bg-white/20"></div>
            </div>
            <p className="text-stone-500 text-xs font-bold leading-relaxed px-4">
              Our advanced neural network analyzes label typography and vineyard metadata in real-time.
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </>
  );
}
