'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, ChevronRight, Home } from 'lucide-react';

const sectionMap: Record<string, { label: string; emoji: string }> = {
  dashboard: { label: 'แดชบอร์ด',    emoji: '📊' },
  orders:    { label: 'คำสั่งซื้อ',  emoji: '🛒' },
  products:  { label: 'สินค้า',      emoji: '🍷' },
  members:   { label: 'สมาชิก',      emoji: '👥' },
  reviews:   { label: 'รีวิว',       emoji: '⭐' },
  pos:       { label: 'POS',         emoji: '🖥️' },
  reports:   { label: 'รายงาน',      emoji: '📈' },
  settings:  { label: 'ตั้งค่า',    emoji: '⚙️' },
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

  const segments = pathname.split('/').filter(Boolean);
  const crumbs   = segments.map((seg, idx) => ({
    seg,
    label: sectionMap[seg]?.label ?? (seg.charAt(0).toUpperCase() + seg.slice(1)),
    href:  '/' + segments.slice(0, idx + 1).join('/'),
    isLast: idx === segments.length - 1,
  }));
  const current = sectionMap[segments[segments.length - 1]];
  const today   = new Date().toLocaleDateString('th-TH', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 select-none"
      style={{
        height: 56,
        minHeight: 56,
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.8) inset',
      }}
    >
      {/* Left: breadcrumb + title */}
      <div className="flex flex-col gap-0.5 pl-11 sm:pl-12 lg:pl-0 min-w-0 flex-1">
        <div className="hidden sm:flex items-center gap-1 text-[10px] font-semibold tracking-wider" style={{ color: '#a8a29e' }}>
          <Home className="w-3 h-3" style={{ color: '#d1cdc9' }} />
          {crumbs.map((c) => (
            <React.Fragment key={c.href}>
              <ChevronRight className="w-3 h-3" style={{ color: '#e7e5e4' }} />
              <span className={c.isLast ? 'text-stone-500 font-bold' : 'text-stone-400'}>{c.label}</span>
            </React.Fragment>
          ))}
        </div>
        <h1 className="text-sm sm:text-base font-black font-serif leading-none tracking-tight truncate" style={{ color: '#1c1917' }}>
          {current ? `${current.emoji} ${current.label}` : 'Admin Panel'}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Clock */}
        <div className="hidden md:flex flex-col items-end">
          <span className="font-mono text-xs font-bold tabular-nums leading-none" style={{ color: '#292524' }}>{time}</span>
          <span className="text-[10px] font-medium leading-none mt-0.5 truncate max-w-[200px]" style={{ color: '#a8a29e' }}>{today}</span>
        </div>

        <div className="hidden md:block w-px h-8" style={{ background: 'rgba(0,0,0,0.08)' }} />

        {/* Mobile search icon */}
        <button
          className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl text-stone-500 cursor-pointer"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
          aria-label="ค้นหา"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none transition-colors duration-200 ${focused ? 'text-red-500' : 'text-stone-400'}`} />
          <input
            type="text"
            placeholder="ค้นหาด่วน..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-44 lg:w-52 pl-9 pr-10 py-2 text-xs rounded-xl placeholder:text-stone-400 transition-all duration-250"
            style={{
              background: focused ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.04)',
              border: focused ? '1px solid rgba(196,30,58,0.4)' : '1px solid rgba(0,0,0,0.1)',
              color: '#292524',
              boxShadow: focused ? '0 0 0 3px rgba(196,30,58,0.08)' : 'none',
              outline: 'none',
            }}
          />
          <kbd className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none">
            <span className="text-[9px] font-bold px-1 py-0.5 rounded" style={{ color: '#a8a29e', background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.08)' }}>⌘K</span>
          </kbd>
        </div>

        {/* Online pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Online</span>
        </div>

        {/* Bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-xl text-stone-500 hover:text-stone-700 transition-all duration-200 cursor-pointer group"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <Bell className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ boxShadow: '0 0 5px rgba(196,30,58,0.6)' }} />
        </button>
      </div>
    </header>
  );
}
