'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, ChevronRight, Home, X } from 'lucide-react';

const sectionMap: Record<string, { label: string; emoji: string }> = {
  dashboard: { label: 'แดชบอร์ด',    emoji: '📊' },
  orders:    { label: 'คำสั่งซื้อ',  emoji: '🛒' },
  products:  { label: 'สินค้า',      emoji: '🍷' },
  members:   { label: 'สมาชิก',      emoji: '👥' },
  reviews:   { label: 'รีวิว',       emoji: '⭐' },
  pos:       { label: 'POS',         emoji: '🖥️' },
  reports:   { label: 'รายงาน',      emoji: '📈' },
  settings:  { label: 'ตั้งค่า',    emoji: '⚙️' },
  payments:  { label: 'การชำระเงิน', emoji: '💳' },
};

function useCurrentTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function AdminHeader() {
  const pathname = usePathname();
  const time     = useCurrentTime();
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const prevSectionRef = useRef<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const segments = pathname.split('/').filter(Boolean);
  const crumbs   = segments.map((seg, idx) => ({
    seg,
    label: sectionMap[seg]?.label ?? (seg.charAt(0).toUpperCase() + seg.slice(1)),
    href:  '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1,
  }));
  const current = sectionMap[segments[segments.length - 1]];
  const today   = mounted
    ? new Date().toLocaleDateString('th-TH', { weekday: 'short', day: 'numeric', month: 'short' })
    : '';

  // Track section changes for title animation
  const currentKey = segments[segments.length - 1] || 'admin';
  const directionRef = useRef(1);
  useEffect(() => {
    if (prevSectionRef.current !== currentKey) {
      directionRef.current = 1;
      prevSectionRef.current = currentKey;
    }
  }, [currentKey]);

  // Focus search when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  return (
    <header
      className="admin-header-2027 sticky top-0 z-20 select-none"
      style={{
        background: 'rgba(11, 15, 26, 0.97)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.03) inset',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8" style={{ height: 56, minHeight: 56 }}>
        {/* Left: breadcrumb + title */}
        <div className="flex flex-col gap-0.5 pl-11 sm:pl-12 lg:pl-0 min-w-0 flex-1">
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold tracking-wider" style={{ color: '#334155' }}>
            <Home className="w-3 h-3" style={{ color: '#1e293b' }} />
            {crumbs.map((c) => (
              <React.Fragment key={c.href}>
                <ChevronRight className="w-3 h-3" style={{ color: '#1e293b' }} />
                <span className={c.isLast ? 'font-bold' : ''} style={{ color: c.isLast ? '#94a3b8' : '#334155' }}>{c.label}</span>
              </React.Fragment>
            ))}
          </div>
          {/* Animated title transition */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentKey}
              className="text-sm sm:text-base font-black font-serif leading-none tracking-tight truncate"
              style={{ color: '#f1f5f9' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {current ? `${current.emoji} ${current.label}` : 'Admin Panel'}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile clock pill — visible on all mobile */}
          <div className="flex sm:hidden min-w-[50px] justify-end">
            {mounted && (
              <div className="admin-clock-pill">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <span>{time.slice(0, 5)}</span>
              </div>
            )}
          </div>

          {/* Desktop Clock */}
          <div className="hidden md:flex flex-col items-end justify-center min-h-[28px] min-w-[70px]">
            {mounted ? (
              <>
                <span className="font-mono text-xs font-bold tabular-nums leading-none" style={{ color: '#e2e8f0' }}>{time}</span>
                <span className="text-[10px] font-medium leading-none mt-0.5 truncate max-w-[200px]" style={{ color: '#475569' }}>{today}</span>
              </>
            ) : (
              <div className="h-5 w-16 rounded animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
            )}
          </div>

          <div className="hidden md:block w-px h-8" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Mobile search icon */}
          <motion.button
            className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            aria-label="ค้นหา"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {mobileSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </motion.button>

          {/* Desktop Search */}
          <div className="relative hidden sm:block">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none transition-colors duration-200 ${focused ? 'text-red-400' : 'text-slate-600'}`} />
            <input
              type="text"
              placeholder="ค้นหาด่วน..."
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-44 lg:w-52 pl-9 pr-10 py-2 text-xs rounded-xl transition-all duration-250"
              style={{
                background: focused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                border: focused ? '1px solid rgba(196,30,58,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: '#e2e8f0',
                boxShadow: focused ? '0 0 0 3px rgba(196,30,58,0.12)' : 'none',
                outline: 'none',
              }}
            />
            <kbd className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
              <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ color: '#475569', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>⌘K</span>
            </kbd>
          </div>

          {/* Online pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#34d399' }}>Online</span>
          </div>

          {/* Bell with glow animation */}
          <motion.button
            className="relative w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer group"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Bell className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" style={{ color: '#94a3b8' }} />
            <motion.span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"
              style={{ boxShadow: '0 0 5px rgba(196,30,58,0.6)' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Pull-down Search */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            className="admin-header-search-expanded sm:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-400 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="ค้นหาออเดอร์, สินค้า, สมาชิก..."
                className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl placeholder:text-stone-400"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(196,30,58,0.25)',
                  color: '#292524',
                  boxShadow: '0 0 0 3px rgba(196,30,58,0.06)',
                  outline: 'none',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
