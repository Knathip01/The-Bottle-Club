'use client';

import React, { useEffect, useState, useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SalesChartProps {
  data: {
    date: string;
    amount: number;
  }[];
}

const TABS = [
  { label: '7 วัน', days: 7 },
  { label: '30 วัน', days: 30 },
  { label: '90 วัน', days: 90 },
];

const formatYAxis = (value: number) => {
  if (value >= 1000000) return `฿${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `฿${(value / 1000).toFixed(0)}k`;
  return `฿${value}`;
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const val: number = payload[0].value;
    return (
      <div
        className="shadow-2xl"
        style={{
          background: 'rgba(255,255,255,0.95)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '12px',
          padding: '10px 14px',
          backdropFilter: 'blur(16px)',
          minWidth: '140px',
        }}
      >
        <p className="text-[9px] text-stone-500 font-extrabold uppercase tracking-widest mb-1.5">
          {payload[0].payload.date}
        </p>
        <p className="text-lg font-black text-stone-800 leading-none">
          ฿{val.toLocaleString('th-TH', { minimumFractionDigits: 0 })}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] text-emerald-600 font-semibold">ยอดขายวันนี้</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesChart({ data }: SalesChartProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(1); // default 30 days

  useEffect(() => { setMounted(true); }, []);

  const filteredData = useMemo(() => {
    const days = TABS[activeTab].days;
    return data.slice(-days);
  }, [data, activeTab]);

  const average = useMemo(() => {
    if (filteredData.length === 0) return 0;
    return filteredData.reduce((sum, d) => sum + d.amount, 0) / filteredData.length;
  }, [filteredData]);

  const total = useMemo(() => filteredData.reduce((s, d) => s + d.amount, 0), [filteredData]);
  const maxDay = useMemo(() => filteredData.reduce((a, b) => a.amount > b.amount ? a : b, filteredData[0] ?? { amount: 0, date: '' }), [filteredData]);

  // Trend: compare first half vs second half
  const mid = Math.floor(filteredData.length / 2);
  const firstHalf = filteredData.slice(0, mid).reduce((s, d) => s + d.amount, 0);
  const secondHalf = filteredData.slice(mid).reduce((s, d) => s + d.amount, 0);
  const isTrendUp = secondHalf >= firstHalf;

  if (!mounted) {
    return (
      <div className="admin-card rounded-2xl p-6 flex items-center justify-center" style={{ height: '340px' }}>
        <div className="text-stone-700 text-sm font-semibold animate-pulse">กำลังโหลดกราฟ...</div>
      </div>
    );
  }

  return (
    <div className="admin-card rounded-2xl p-6 relative overflow-hidden group" style={{ minHeight: '340px' }}>
      {/* Inner top highlight */}
      <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)' }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-black font-serif text-stone-800">สถิติยอดขาย</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-lg font-black text-stone-800">
              ฿{total.toLocaleString('th-TH')}
            </p>
            <span
              className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isTrendUp ? 'text-emerald-700' : 'text-red-600'}`}
              style={{ background: isTrendUp ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${isTrendUp ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}
            >
              {isTrendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {isTrendUp ? '+' : '-'}{Math.abs(((secondHalf - firstHalf) / (firstHalf || 1)) * 100).toFixed(1)}%
            </span>
          </div>
          <p className="text-[10px] text-stone-500 font-semibold mt-0.5 uppercase tracking-wider">
            รวม {TABS[activeTab].label}ที่ผ่านมา
          </p>
        </div>

        {/* Tab switcher */}
        <div className="admin-tab-group shrink-0">
          {TABS.map((tab, idx) => (
            <button
              key={tab.days}
              onClick={() => setActiveTab(idx)}
              className={`admin-tab ${activeTab === idx ? 'admin-tab-active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}>
          <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">ค่าเฉลี่ย/วัน</p>
          <p className="text-sm font-black text-stone-700 mt-0.5">฿{average.toLocaleString('th-TH', { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="rounded-xl px-3 py-2.5" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}>
          <p className="text-[9px] text-stone-500 font-bold uppercase tracking-wider">วันยอดสูงสุด</p>
          <p className="text-sm font-black text-stone-700 mt-0.5">{maxDay?.date || '-'}</p>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '180px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 5, right: 4, left: -22, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c41e3a" stopOpacity={0.35} />
                <stop offset="75%" stopColor="#c41e3a" stopOpacity={0.04} />
                <stop offset="100%" stopColor="#c41e3a" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="salesLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#c41e3a" />
                <stop offset="100%" stopColor="#9b1c1c" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.06)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="transparent"
              tick={{ fill: '#57534e', fontSize: 9, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              dy={8}
              interval={filteredData.length > 20 ? Math.floor(filteredData.length / 7) : 'preserveStartEnd'}
            />
            <YAxis
              stroke="transparent"
              tick={{ fill: '#57534e', fontSize: 9, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(196,30,58,0.3)', strokeWidth: 1, strokeDasharray: '4 2' }} />
            {average > 0 && (
              <ReferenceLine
                y={average}
                stroke="rgba(245,158,11,0.25)"
                strokeDasharray="4 4"
                label={{ value: 'avg', fill: '#78716c', fontSize: 8, position: 'right' }}
              />
            )}
            <Area
              type="monotone"
              dataKey="amount"
              stroke="url(#salesLine)"
              strokeWidth={2}
              fill="url(#salesGrad)"
              dot={false}
              activeDot={{ r: 4, fill: '#c41e3a', stroke: 'rgba(196,30,58,0.4)', strokeWidth: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
