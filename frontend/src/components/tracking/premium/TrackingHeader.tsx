'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Moon, Sun, Globe, Radio, RefreshCw, Cpu } from 'lucide-react';
import { DEMO_TRACKING_IDS } from '@/lib/tracking/shipments';

interface TrackingHeaderProps {
  trackingId: string;
  setTrackingId: (id: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  isWebSocket: boolean;
  setIsWebSocket: (ws: boolean) => void;
  isAutoRefresh: boolean;
  setIsAutoRefresh: (auto: boolean) => void;
  lang: 'th' | 'en';
  setLang: (lang: 'th' | 'en') => void;
}

export default function TrackingHeader({
  trackingId,
  setTrackingId,
  onSearch,
  isLoading,
  isDarkMode,
  setIsDarkMode,
  isWebSocket,
  setIsWebSocket,
  isAutoRefresh,
  setIsAutoRefresh,
  lang,
  setLang,
}: TrackingHeaderProps) {
  const [refreshSeconds, setRefreshSeconds] = useState(30);

  // Auto Refresh Countdown timer tick
  useEffect(() => {
    if (!isAutoRefresh) return;
    const interval = setInterval(() => {
      setRefreshSeconds((sec) => {
        if (sec <= 1) {
          // Trigger simulated refresh
          const e = { preventDefault: () => {} } as React.FormEvent;
          onSearch(e);
          return 30;
        }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAutoRefresh, onSearch]);

  const toggleLanguage = () => {
    setLang(lang === 'th' ? 'en' : 'th');
  };

  return (
    <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 sm:p-8 rounded-[32px] border border-stone-200/50 dark:border-stone-800/60 shadow-lg transition-all duration-300 space-y-6">
      {/* Top row: Title and Controllers */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50 tracking-tight flex items-center gap-2.5">
            <Cpu className="text-indigo-600 dark:text-indigo-400 shrink-0" size={28} />
            <span className="bg-gradient-to-r from-stone-950 via-stone-850 to-stone-750 dark:from-white dark:via-stone-200 dark:to-stone-400 bg-clip-text text-transparent uppercase tracking-tight">
              {lang === 'th' ? 'ระบบจัดส่งพัสดุระดับโลก' : 'Global Logistics Tracker'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 mt-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>
              {lang === 'th'
                ? 'ติดตามพัสดุผ่านดาวเทียม GPS และ API ผู้ให้บริการชั้นนำเรียลไทม์'
                : 'Real-time satellite GPS tracking with active global carrier integrations'}
            </span>
          </p>
        </div>

        {/* Action Toggles row */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* WebSocket stream toggle */}
          <button
            type="button"
            onClick={() => setIsWebSocket(!isWebSocket)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
              isWebSocket
                ? 'bg-sky-500/10 text-sky-600 border-sky-500/35 dark:text-sky-300 dark:border-sky-500/40 shadow-sm'
                : 'bg-stone-50/50 text-stone-500 border-stone-200/50 hover:bg-stone-100/50 dark:bg-stone-850/40 dark:border-stone-800'
            }`}
            title={lang === 'th' ? 'เปิดสตรีมข้อมูลผ่าน WebSocket จำลอง' : 'Simulate live WebSocket stream'}
          >
            <Radio size={13} className={isWebSocket ? 'animate-pulse text-sky-500' : ''} />
            <span>WS STREAM</span>
          </button>

          {/* Auto Refresh countdown */}
          <button
            type="button"
            onClick={() => {
              setIsAutoRefresh(!isAutoRefresh);
              setRefreshSeconds(30);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
              isAutoRefresh
                ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/35 dark:text-indigo-300 dark:border-indigo-500/40 shadow-sm'
                : 'bg-stone-50/50 text-stone-500 border-stone-200/50 hover:bg-stone-100/50 dark:bg-stone-850/40 dark:border-stone-800'
            }`}
            title="Auto refresh every 30 seconds"
          >
            <RefreshCw size={13} className={isAutoRefresh ? 'animate-spin [animation-duration:8s]' : ''} />
            <span>
              {isAutoRefresh ? `REFRESH IN ${refreshSeconds}S` : 'AUTO REFRESH'}
            </span>
          </button>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest border bg-stone-50/50 text-stone-500 border-stone-200/50 hover:bg-stone-100/50 dark:bg-stone-850/40 dark:border-stone-800 cursor-pointer transition-colors"
            title="Change Language"
          >
            <Globe size={13} />
            <span>{lang === 'th' ? 'EN' : 'TH'}</span>
          </button>

          {/* Dark Mode toggle */}
          <button
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl border bg-stone-50/50 text-stone-500 border-stone-200/50 hover:bg-stone-100/50 dark:bg-stone-850/40 dark:border-stone-800 cursor-pointer transition-colors flex items-center justify-center shrink-0"
            aria-label="Toggle Dark Mode"
            title={lang === 'th' ? 'เปลี่ยนธีมแผนที่' : 'Switch Map Theme'}
          >
            {isDarkMode ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      {/* Main search and select row */}
      <form onSubmit={onSearch} className="relative group">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder={lang === 'th' ? 'กรอกเลขพัสดุ (เช่น TBC-DOM-LOCAL-TH-001)...' : 'Enter tracking number (e.g. TBC-DOM-LOCAL-TH-001)...'}
          className="w-full pl-12 pr-36 py-4.5 bg-stone-50 dark:bg-stone-850/30 border border-stone-200/60 dark:border-stone-800 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white dark:focus:bg-stone-900 transition-all text-sm font-bold tracking-wide text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-600"
        />
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" size={18} />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-500 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-md active:scale-95 disabled:opacity-60 flex items-center gap-1.5 transition-all cursor-pointer border border-indigo-400/20"
        >
          {isLoading ? <RefreshCw size={13} className="animate-spin" /> : null}
          <span>{lang === 'th' ? 'ติดตามพัสดุ' : 'TRACKING'}</span>
        </button>
      </form>

      {/* Carrier shortcuts */}
      <div className="pt-1.5">
        <p className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3 flex items-center gap-1.5 px-1">
          <Sparkles size={11} className="text-indigo-500" />
          <span>{lang === 'th' ? 'หรือเลือกเลขพัสดุตัวอย่างสำหรับจำลองขนส่ง' : 'Or select carrier shortcuts to simulate tracking'}</span>
        </p>
        <div className="flex flex-wrap gap-2.5">
          {DEMO_TRACKING_IDS.map((demo) => (
            <button
              key={demo.id}
              type="button"
              onClick={() => setTrackingId(demo.id)}
              className="text-[10.5px] font-mono font-extrabold px-3 py-2 rounded-xl bg-stone-50/50 dark:bg-stone-850/40 text-stone-600 dark:text-stone-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/20 dark:hover:text-indigo-400 border border-stone-200/40 dark:border-stone-800/60 hover:border-indigo-200 dark:hover:border-indigo-900 cursor-pointer transition-all active:scale-95"
            >
              {lang === 'th' ? demo.labelTh.split(' · ')[0] : demo.labelEn.split(' · ')[0]} ({demo.id.split('-').pop()})
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
