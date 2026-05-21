'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User, Camera, Sparkles, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function MobileNav() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: 'scan', label: 'AI Scan', href: '#' },
    { icon: ShoppingBag, label: 'Cart', href: '/cart' },
    { icon: User, label: 'Account', href: '/account' },
  ];

  const handleScan = () => {
    setIsScanOpen(true);
    setIsScanning(true);
    
    // Simulate AI scanning
    setTimeout(() => {
      setIsScanning(false);
      setScanResult("Detected: Chateau Margaux 2015. Premium Red Wine from Bordeaux.");
    }, 3000);
  };

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-stone-200 px-6 py-3 z-40 flex items-center justify-between pb-safe">
        {navItems.map((item, idx) => {
          if (item.icon === 'scan') {
            return (
              <button
                key={idx}
                onClick={handleScan}
                className="relative -top-8 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-xl shadow-primary/30 border-4 border-white active:scale-95 transition-all">
                  <Camera size={28} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-1">
                  AI Scan
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
                isActive ? 'text-primary' : 'text-stone-400'
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

      {/* AI Scan Modal/Overlay */}
      {isScanOpen && (
        <div className="fixed inset-0 z-[60] bg-stone-950 flex flex-col items-center justify-center p-6 animate-in fade-in duration-300">
          <button 
            onClick={() => setIsScanOpen(false)}
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border-2 border-white/20">
            {/* Simulation of Camera View */}
            <div className="absolute inset-0 bg-stone-900 flex items-center justify-center overflow-hidden">
               <img 
                 src="/frontend/public/images/wine_red.png" 
                 alt="Scanning..." 
                 className={`w-full h-full object-cover opacity-40 transition-all duration-1000 ${isScanning ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
               />
               
               {isScanning && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-full h-1 bg-primary/60 shadow-[0_0_20px_rgba(139,0,0,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                    <div className="mt-8 flex flex-col items-center gap-4">
                      <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                      <p className="text-white font-black uppercase tracking-[0.2em] text-xs">AI Detecting...</p>
                    </div>
                 </div>
               )}

               {!isScanning && scanResult && (
                 <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md p-8 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                      <Sparkles className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-4">Detection Complete</h2>
                    <p className="text-stone-400 text-sm leading-relaxed mb-8">{scanResult}</p>
                    <button 
                      onClick={() => setIsScanOpen(false)}
                      className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-lg active:scale-95 transition-all"
                    >
                      View Product
                    </button>
                    <button 
                      onClick={() => setIsScanning(true)}
                      className="mt-4 text-white/60 text-xs font-black uppercase tracking-widest hover:text-white transition-colors"
                    >
                      Scan Again
                    </button>
                 </div>
               )}
            </div>

            {/* Viewfinder corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-primary rounded-tl-2xl"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-primary rounded-tr-2xl"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-primary rounded-bl-2xl"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-primary rounded-br-2xl"></div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Powered by Bottle Club AI</p>
            <p className="text-white text-sm font-medium px-8 text-stone-400">Point your camera at any wine label to get instant details and pricing.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-150px); }
          50% { transform: translateY(150px); }
        }
      `}</style>
    </>
  );
}
