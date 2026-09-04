'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
    text: '#34d399',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
    icon: ArrowUpRight,
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.25)',
    iconColor: '#10b981',
    sparkColor: '#10b981',
    glow: 'rgba(16,185,129,0.08)',
    topBorder: '#10b981',
  },
  down: {
    text: '#f87171',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.25)',
    icon: ArrowDownRight,
    iconBg: 'rgba(239,68,68,0.1)',
    iconBorder: 'rgba(239,68,68,0.25)',
    iconColor: '#ef4444',
    sparkColor: '#ef4444',
    glow: 'rgba(239,68,68,0.06)',
    topBorder: '#ef4444',
  },
  neutral: {
    text: '#94a3b8',
    bg: 'rgba(71,85,105,0.15)',
    border: 'rgba(71,85,105,0.25)',
    icon: Minus,
    iconBg: 'rgba(71,85,105,0.12)',
    iconBorder: 'rgba(71,85,105,0.2)',
    iconColor: '#64748b',
    sparkColor: '#64748b',
    glow: 'rgba(71,85,105,0.05)',
    topBorder: '#475569',
  },
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max   = Math.max(...data);
  const min   = Math.min(...data);
  const range = max - min || 1;
  const W = 80, H = 32, pad = 2;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  const firstPt = pts.split(' ')[0];
  const lastPt  = pts.split(' ')[pts.split(' ').length - 1];
  const lastY   = parseFloat(lastPt.split(',')[1]);
  const lastX   = parseFloat(lastPt.split(',')[0]);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id={`spark-fill-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
        <filter id={`glow-${color.replace('#','')}`}>
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <polygon
        points={`${pad},${H} ${pts} ${W - pad},${H}`}
        fill={`url(#spark-fill-${color.replace('#','')})`}
      />
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#glow-${color.replace('#','')})`}
      />
      {/* Glowing endpoint */}
      <circle cx={lastX} cy={lastY} r="3" fill={color} opacity={0.9} />
      <circle cx={lastX} cy={lastY} r="5" fill={color} opacity={0.2} />
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
    <motion.div
      className="admin-kpi-touch rounded-2xl p-4 sm:p-5 relative overflow-hidden group cursor-default"
      style={{
        background: 'rgba(19, 25, 41, 0.92)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03) inset`,
      }}
      whileHover={{
        borderColor: `rgba(255,255,255,0.12)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${cfg.glow}`,
        y: -2,
        transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {/* Top accent line (colored per trend) */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
        style={{ background: `linear-gradient(to right, transparent, ${cfg.topBorder}80, transparent)` }}
      />
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: cfg.glow, filter: 'blur(40px)', transform: 'translate(40%,-40%)' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <p className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.15em]" style={{ color: '#475569' }}>{title}</p>
        <motion.div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: cfg.iconBg, border: `1px solid ${cfg.iconBorder}` }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: cfg.iconColor }} />
        </motion.div>
      </div>

      {/* Value + sparkline */}
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="stat-value animate-count-up">{displayValue}</p>
          <div className="flex items-center gap-1.5 mt-2 sm:mt-2.5">
            <span
              className="inline-flex items-center gap-0.5 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.text }}
            >
              <TrendIcon className="w-3 h-3" />{change}
            </span>
            <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wide hidden sm:inline" style={{ color: '#1e293b' }}>vs เดือนก่อน</span>
          </div>
        </div>
        {sparkline && (
          <div className="shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <Sparkline data={sparkline} color={cfg.sparkColor} />
          </div>
        )}
      </div>

      {/* Bottom progress */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden rounded-b-2xl">
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: trend === 'up' ? '75%' : trend === 'down' ? '35%' : '55%' }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: `linear-gradient(to right, ${cfg.sparkColor}30, ${cfg.sparkColor})` }}
        />
      </div>
    </motion.div>
  );
}
