import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

export default function KPICard({ title, value, change, trend, icon: Icon }: KPICardProps) {
  return (
    <div className="admin-glass-panel admin-glass-pulse rounded-2xl p-6 relative overflow-hidden group">
      {/* Tech Corner HUD Brackets */}
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 text-stone-300 transition-all duration-300 group-hover:border-red-500/20 group-hover:bg-red-500/5 group-hover:text-red-400">
          <Icon className="w-5 h-5 text-stone-400 transition-colors duration-300 group-hover:text-red-400" />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-2xl font-black font-serif text-stone-100">{value}</span>
          <div className="flex items-center gap-1 mt-1.5">
            {trend === 'up' && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/10 px-1.5 py-0.5 rounded-md">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
            {trend === 'down' && (
              <span className="text-[10px] font-bold text-red-400 flex items-center gap-0.5 bg-red-500/10 border border-red-500/10 px-1.5 py-0.5 rounded-md">
                <ArrowDownRight className="w-3.5 h-3.5" />
                {change}
              </span>
            )}
            {trend === 'neutral' && (
              <span className="text-[10px] font-bold text-stone-400 bg-white/5 border border-white/5 px-1.5 py-0.5 rounded-md">
                {change}
              </span>
            )}
            <span className="text-[9px] font-semibold text-stone-600 uppercase tracking-wide">เทียบกับเดือนก่อน</span>
          </div>
        </div>
      </div>
    </div>
  );
}
