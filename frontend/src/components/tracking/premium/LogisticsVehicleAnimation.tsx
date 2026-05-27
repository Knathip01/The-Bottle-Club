'use client';

import { motion } from 'framer-motion';
import { Plane, Ship, Truck } from 'lucide-react';
import type { TransportMode } from '@/lib/tracking/shipments';

interface LogisticsVehicleAnimationProps {
  mode: TransportMode;
  lang?: 'th' | 'en';
}

export default function LogisticsVehicleAnimation({ mode, lang = 'en' }: LogisticsVehicleAnimationProps) {
  // Render corresponding animation depending on transport mode
  const renderAirAnimation = () => (
    <div className="relative h-44 w-full bg-gradient-to-b from-sky-400 to-sky-300 dark:from-sky-950 dark:to-stone-900 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-4 border border-sky-400/20">
      {/* Moving cloud layers in background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [-200, 400] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-6 left-12 w-28 h-6 bg-white/40 dark:bg-white/10 rounded-full blur-[2px]"
        />
        <motion.div
          animate={{ x: [-300, 300] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute top-16 left-28 w-36 h-8 bg-white/35 dark:bg-white/5 rounded-full blur-[1px]"
        />
        <motion.div
          animate={{ x: [400, -200] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          className="absolute top-28 left-6 w-20 h-5 bg-white/20 dark:bg-white/5 rounded-full blur-[3px]"
        />
      </div>

      {/* Flashing sun/sky star glow */}
      <div className="absolute top-4 right-6 w-2 h-2 bg-yellow-200 dark:bg-sky-400 rounded-full animate-ping" />

      {/* Flying Airplane using Framer Motion */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          animate={{
            y: [-6, 6, -6],
            rotate: [-1, 2, -1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-stone-800/90 shadow-xl flex items-center justify-center border border-white/20 relative">
            <Plane size={28} className="text-violet-600 dark:text-violet-400 rotate-45" strokeWidth={2} />
            {/* Engine fire pulse dot */}
            <span className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          </div>
          <span className="text-[10px] font-black text-white dark:text-sky-300 uppercase tracking-widest bg-stone-900/60 backdrop-blur px-2 py-0.5 rounded">
            ALTITUDE: 38,000 FT
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] text-white/80 dark:text-sky-300/80 font-black tracking-widest uppercase">
        <span>BKK EXPRESS FREIGHT</span>
        <span>BOEING 777F</span>
      </div>
    </div>
  );

  const renderSeaAnimation = () => (
    <div className="relative h-44 w-full bg-gradient-to-b from-cyan-900 to-cyan-750 dark:from-cyan-950 dark:to-stone-900 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-4 border border-cyan-800/20">
      {/* Simulated Moving Ocean Wave SVG Paths */}
      <div className="absolute bottom-0 left-0 right-0 h-16 z-0">
        <svg viewBox="0 0 120 28" className="absolute bottom-0 w-full h-12 fill-cyan-700/50 dark:fill-cyan-900/40">
          <path d="M0,15 C30,5 90,25 120,15 L120,30 L0,30 Z" />
        </svg>
        <svg viewBox="0 0 120 28" className="absolute bottom-0 w-full h-10 fill-cyan-800 dark:fill-stone-950">
          <path d="M0,10 C45,20 75,5 120,10 L120,30 L0,30 Z" />
        </svg>
      </div>

      {/* Soaring seagulls in sky */}
      <div className="absolute top-6 left-12 opacity-30">
        <span className="text-xs text-white">~ ~</span>
      </div>

      {/* Floating Cargo Ship using Framer Motion */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          animate={{
            y: [-3, 3, -3],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-stone-800/90 shadow-xl flex items-center justify-center border border-white/20">
            <Ship size={28} className="text-sky-600 dark:text-sky-400" strokeWidth={1.8} />
          </div>
          <span className="text-[10px] font-black text-white dark:text-cyan-300 uppercase tracking-widest bg-stone-900/60 backdrop-blur px-2 py-0.5 rounded">
            SPEED: 22 KNOTS
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] text-white/80 dark:text-cyan-300/80 font-black tracking-widest uppercase">
        <span>COSCO PARTNER SHIP</span>
        <span>PACIFIC FREIGHTER</span>
      </div>
    </div>
  );

  const renderLocalAnimation = () => (
    <div className="relative h-44 w-full bg-gradient-to-b from-stone-800 to-stone-900 dark:from-stone-950 dark:to-stone-900 rounded-2xl overflow-hidden shadow-inner flex flex-col justify-between p-4 border border-stone-800/20">
      {/* Sliding outline skyscrapers and street lines */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ x: [400, -200] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-6 left-6 flex items-end gap-2 opacity-15"
        >
          <div className="w-8 h-20 bg-white" />
          <div className="w-12 h-28 bg-white" />
          <div className="w-6 h-16 bg-white" />
          <div className="w-14 h-32 bg-white" />
        </motion.div>
        {/* Asphalt road line */}
        <div className="absolute bottom-4 left-0 right-0 h-0.5 bg-stone-700 dark:bg-stone-800" />
      </div>

      {/* Moving courier vehicle using Framer Motion */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          animate={{
            y: [-1, 2, -1],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-stone-850/90 shadow-xl flex items-center justify-center border border-white/20">
            <Truck size={28} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.8} />
          </div>
          <span className="text-[10px] font-black text-white dark:text-emerald-300 uppercase tracking-widest bg-stone-950/60 backdrop-blur px-2 py-0.5 rounded">
            SPEED: 55 KM/H
          </span>
        </motion.div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[9px] text-white/50 dark:text-emerald-300/80 font-black tracking-widest uppercase">
        <span>TBC COURIER VAN</span>
        <span>FINAL MILE DELIVERY</span>
      </div>
    </div>
  );

  const getLabel = () => {
    if (mode === 'air') return lang === 'th' ? 'การจัดส่งทางอากาศ (Next-Flight Service)' : 'Air Freight Logistics (Next-Flight Service)';
    if (mode === 'sea') return lang === 'th' ? 'การจัดส่งทางเรือสินค้า (Ocean Container)' : 'Ocean Cargo Logistics (Ocean Container)';
    return lang === 'th' ? 'พนักงานขับรถนำส่งพัสดุ (Premium Cold-Chain Courier)' : 'Premium Courier Service (Premium Cold-Chain)';
  };

  return (
    <div className="space-y-3">
      <span className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block px-1">
        {lang === 'th' ? 'การจำลองสถานะการขนส่ง' : 'Live Transport Simulation'}
      </span>
      {mode === 'air' && renderAirAnimation()}
      {mode === 'sea' && renderSeaAnimation()}
      {mode === 'local' && renderLocalAnimation()}
      <p className="text-[10px] text-stone-400 dark:text-stone-500 text-center font-bold italic tracking-wide">
        {getLabel()}
      </p>
    </div>
  );
}
