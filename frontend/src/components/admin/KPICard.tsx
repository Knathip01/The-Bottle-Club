'use client';

import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  sparkline?: number[];
}

function useCountUp(target: number, duration = 900) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (isNaN(target)) { setCurrent(target); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return current;
}

const trendConfig = {
  up: {
    text: 'text-emerald-700',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    icon: ArrowUpRight,
    iconBg: 'rgba(16,185,129,0.1)',
    iconBorder: 'rgba(16,185,129,0.2)',
    iconColor: 'text-emerald-600',
    sparkColor: '#10b981',
    glow: 'rgba(16,185,129,0.06)',
  },
  down: {
    text: 'text-red-600',
    bg: 'rgba(239,68,68,0.07)',
    border: 'rgba(239,68,68,0.2)',
    icon: ArrowDownRight,
    iconBg: 'rgba(239,68,68,0.08)',
    iconBorder: 'rgba(239,68,68,0.18)',
    iconColor: 'text-red-500',
    sparkColor: '#ef4444',
    glow: 'rgba(239,68,68,0.05)',
  },
  neutral: {
    text: 'text-stone-500',
    bg: 'rgba(120,113,108,0.08)',
    border: 'rgba(120,113,108,0.2)',
    icon: Minus,
    iconBg: 'rgba(120,113,108,0.07)',
    iconBorder: 'rgba(120,113,108,0.14)',
    iconColor: 'text-stone-400',
    sparkColor: '#a8a29e',
    glow: 'rgba(120,113,108,0.04)',
  },
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max   = Math.max(...data);
  const min   = Math.min(...data);
  const range = max - min || 1;
  const W = 64, H = 24, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="opacity-75">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`${pad},${H} ${pts} ${W - pad},${H}`} fill={color} fillOpacity="0.1" />
    </svg>
  );
}

export default function KPICard({ title, value, change, trend, icon: Icon, sparkline }: KPICardProps) {
  const cfg      = trendConfig[trend];
  const TrendIcon = cfg.icon;

  const rawNum   = parseFloat(value.replace(/[^0-9.]/g, ''));
  const prefix   = value.match(/^[^\d]*/)?.[0] ?? '';
  const suffix   = value.match(/[^\d.]*$/)?.[0] ?? '';
  const isNumeric = !isNaN(rawNum);

  const animatedNum = useCountUp(isNumeric ? rawNum : 0);
  const displayValue = isNumeric
    ? `${prefix}${animatedNum.toLocaleString('th-TH')}${suffix}`
    : value;

  return (
    <div className="admin-card rounded-2xl p-5 relative overflow-hidden group cursor-default">
      {/* Corner glow */}
      <div className="absolute top-0 right-0 w-28 h-28 rounded-full pointer-events-none"
        style={{ background: cfg.glow, filter: 'blur(32px)', transform: 'translate(30%,-30%)' }} />
      {/* Top shimmer */}
      <div className="absolute top-0 left-4 right-4 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)' }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.15em]" style={{ color: '#a8a29e' }}>{title}</p>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
          style={{ background: cfg.iconBg, border: `1px solid ${cfg.iconBorder}` }}>
          <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
        </div>
      </div>

      {/* Value + sparkline */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="stat-value animate-count-up">{displayValue}</p>
          <div className="flex items-center gap-1.5 mt-2.5">
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${cfg.text}`}
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <TrendIcon className="w-3 h-3" />{change}
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: '#d1cdc9' }}>vs เดือนก่อน</span>
          </div>
        </div>
        {sparkline && (
          <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkline data={sparkline} color={cfg.sparkColor} />
          </div>
        )}
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl">
        <div className="h-full transition-all duration-700"
          style={{ width: trend === 'up' ? '75%' : trend === 'down' ? '35%' : '55%', background: `linear-gradient(to right, ${cfg.sparkColor}50, ${cfg.sparkColor})` }} />
      </div>
    </div>
  );
}
