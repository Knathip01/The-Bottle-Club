'use client';

import React, { useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { BarChart3, Download, Calendar, ShieldAlert, Award, Loader2 } from 'lucide-react';

interface SalesReportData {
  sales: {
    date: string;
    amount: number;
    count: number;
  }[];
  topProducts: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
  payments: {
    method: string;
    value: number;
  }[];
}

const COLORS = ['#8b0000', '#c2410c', '#b45309', '#0f766e', '#1d4ed8'];

export default function AdminReportsPage() {
  const [data, setData] = useState<SalesReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function loadReportData() {
      try {
        const res = await fetch('/api/admin/reports', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('ไม่สามารถโหลดข้อมูลสถิติรายงานได้');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadReportData();
  }, []);

  const handleDownloadCSV = () => {
    window.open('/api/admin/reports?export=csv', '_blank');
  };

  if (loading || !mounted) {
    return (
      <div className="space-y-6 animate-pulse select-none">
        <div className="h-6 w-32 bg-stone-900 rounded" />
        <div className="h-24 w-full bg-stone-900 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-stone-900 rounded-2xl" />
          <div className="h-96 bg-stone-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center bg-stone-900 border border-white/5 rounded-2xl text-red-400 select-none">
        <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
        <p className="font-bold text-lg">เกิดข้อผิดพลาดในการโหลดรายงาน</p>
        <p className="text-stone-500 text-sm mt-1">{error || 'ไม่พบข้อมูลรายงาน'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2.5 bg-red-800 hover:bg-red-700 text-stone-100 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-red-500" /> สถิติรายงานยอดขายและวิเคราะห์การตลาด
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">สรุปรายได้สะสม ช่องทางการเงิน และสินค้าขายดีที่สุดในร้านค้า</p>
        </div>
        <button
          onClick={handleDownloadCSV}
          className="inline-flex items-center gap-2 px-5 py-3 bg-stone-900 hover:bg-stone-850 border border-white/10 text-stone-200 hover:text-stone-100 rounded-xl text-xs font-bold transition cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4" /> ส่งออกรายงาน (CSV)
        </button>
      </div>

      {/* Graphs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
          <div className="mb-6">
            <h3 className="text-sm font-bold text-stone-100 font-serif">กราฟรายได้รายวัน</h3>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">ยอดรวมของออเดอร์ที่ไม่โดนปฏิเสธ</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.sales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="date" stroke="#57534e" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#57534e" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0c0a09', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}
                  labelStyle={{ fontSize: '10px', color: '#78716c', fontWeight: 'bold' }}
                  itemStyle={{ fontSize: '12px', color: '#fafaf9', fontWeight: 'bold' }}
                  formatter={(value: any) => [`฿${Number(value || 0).toLocaleString('th-TH')}`, 'ยอดขาย']}
                />
                <Bar dataKey="amount" fill="#8b0000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Distribution Pie Chart */}
        <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-100 font-serif mb-4">ช่องทางยอดนิยม</h3>
            <div className="h-56 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.payments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="method"
                  >
                    {data.payments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0a09', borderColor: 'rgba(255,255,255,0.08)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '11px', color: '#fafaf9', fontWeight: 'bold' }}
                    formatter={(value: any) => `฿${Number(value || 0).toLocaleString('th-TH')}`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-white/5">
            {data.payments.map((p, idx) => (
              <div key={p.method} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="font-bold text-stone-400 uppercase tracking-wider">{p.method}</span>
                </div>
                <span className="font-bold text-stone-200">฿{p.value.toLocaleString('th-TH')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Selling Products List */}
      <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
        <h3 className="text-sm font-bold text-stone-100 font-serif mb-6 flex items-center gap-2">
          <Award className="w-4.5 h-4.5 text-amber-500" /> รายการสินค้าที่มียอดขายดีที่สุด (Top Selling Products)
        </h3>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-stone-500 uppercase tracking-widest pb-3">
                <th className="pb-3">อันดับ</th>
                <th className="pb-3">ชื่อสินค้า</th>
                <th className="pb-3 text-center">จำนวนที่ขายได้ (ขวด/ชิ้น)</th>
                <th className="pb-3 text-right">ยอดขายรวมสุทธิ (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-stone-300">
              {data.topProducts.map((p, idx) => (
                <tr key={p.name} className="hover:bg-white/2 transition">
                  <td className="py-4 font-bold text-stone-500">#{idx + 1}</td>
                  <td className="py-4 font-bold text-stone-200">{p.name}</td>
                  <td className="py-4 text-center font-bold text-stone-300">{p.quantity} ชิ้น</td>
                  <td className="py-4 text-right font-bold text-stone-100">฿{p.revenue.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
