'use client';

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SalesChartProps {
  data: {
    date: string;
    amount: number;
  }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-80 bg-stone-900/35 backdrop-blur-md border border-white/5 rounded-2xl flex items-center justify-center animate-pulse">
        <span className="text-xs text-stone-600 font-semibold">กำลังโหลดกราฟ...</span>
      </div>
    );
  }

  // Format currency THB
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `฿${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `฿${(value / 1000).toFixed(0)}k`;
    return `฿${value}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-950/80 backdrop-blur-md border border-white/15 p-3.5 rounded-xl shadow-2xl">
          <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">{payload[0].payload.date}</p>
          <p className="text-sm font-black text-white mt-1 leading-none">
            ฿{payload[0].value.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="admin-glass-panel admin-glass-pulse rounded-2xl p-6 relative overflow-hidden group select-none">
      {/* Tech Corner HUD Brackets */}
      <div className="hud-bracket hud-bracket-tl" />
      <div className="hud-bracket hud-bracket-tr" />
      <div className="hud-bracket hud-bracket-bl" />
      <div className="hud-bracket hud-bracket-br" />

      <div className="mb-6">
        <h3 className="text-sm font-bold text-stone-100 font-serif">สถิติยอดขาย 30 วันย้อนหลัง</h3>
        <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">สรุปรายได้สะสมรายวัน</p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b0000" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b0000" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#57534e"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#57534e"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8b0000"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
