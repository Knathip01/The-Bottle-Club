'use client';

import React, { useEffect, useState } from 'react';
import KPICard from '@/components/admin/KPICard';
import SalesChart from '@/components/admin/SalesChart';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, AlertTriangle, ArrowRight, ShieldCheck, Wine } from 'lucide-react';
import Link from 'next/link';

interface DashboardData {
  metrics: {
    todayRevenue: string;
    pendingOrders: number;
    newMembers: number;
    lowStockAlerts: number;
  };
  lowStockProducts: {
    id: number;
    name: string;
    stock: number;
    price: number;
  }[];
  salesData: {
    date: string;
    amount: number;
  }[];
  recentOrders: {
    id: number;
    customer: string;
    total: string;
    status: string;
    date: string;
    paymentMethod: string;
    type: string;
  }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลแดชบอร์ดได้');
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse select-none">
        {/* KPI Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-stone-900 border border-white/5 rounded-2xl" />
          ))}
        </div>
        {/* Grid Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-stone-900 border border-white/5 rounded-2xl" />
          <div className="h-80 bg-stone-900 border border-white/5 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-8 text-center bg-stone-900 border border-white/5 rounded-2xl text-red-400 select-none">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
        <p className="font-bold text-lg">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <p className="text-stone-500 text-sm mt-1">{error || 'ข้อมูลไม่สมบูรณ์'}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2.5 bg-red-800 hover:bg-red-700 text-stone-100 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 select-none"
    >
      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative bg-gradient-to-r from-red-950/35 via-stone-950/60 to-stone-950/90 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden shadow-[0_8px_30px_rgba(220,38,38,0.04)] admin-glass-pulse group"
      >
        {/* Tech Corner HUD Brackets */}
        <div className="hud-bracket hud-bracket-tl" />
        <div className="hud-bracket hud-bracket-tr" />
        <div className="hud-bracket hud-bracket-bl" />
        <div className="hud-bracket hud-bracket-br" />

        {/* Scanline Effect */}
        <div className="ai-scanline opacity-30" />

        <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full relative z-10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-900/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              <ShieldCheck className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-stone-100 text-cyber-glow">ระบบจัดการร้านค้า The Bottle Club [AI Core Enabled]</h2>
              <p className="text-xs text-stone-400 mt-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>ADMIN PROTOCOL: ACTIVE (PORTAL v2.26)</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 font-mono text-[9px] text-stone-500 bg-stone-950/50 p-2.5 rounded-xl border border-white/5 md:self-center">
            <div>CPU_TEMP: <span className="text-red-400">38.4°C</span></div>
            <div className="border-l border-white/10 pl-2">LATENCY: <span className="text-emerald-500">8ms</span></div>
            <div className="border-l border-white/10 pl-2">SECURE_LINK: <span className="text-amber-500">SHA-512</span></div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="ยอดขายวันนี้"
          value={data.metrics.todayRevenue}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
        />
        <KPICard
          title="ออเดอร์รอดำเนินการ"
          value={data.metrics.pendingOrders.toString()}
          change="+3 ออเดอร์"
          trend="up"
          icon={ShoppingBag}
        />
        <KPICard
          title="สมาชิกใหม่เดือนนี้"
          value={data.metrics.newMembers.toString()}
          change="+18%"
          trend="up"
          icon={Users}
        />
        <KPICard
          title="สินค้าใกล้หมดคลัง"
          value={data.metrics.lowStockAlerts.toString()}
          change="ควรเติมสต็อก"
          trend={data.metrics.lowStockAlerts > 0 ? 'down' : 'neutral'}
          icon={AlertTriangle}
        />
      </motion.div>

      {/* Charts & Alerts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart Area */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <SalesChart data={data.salesData} />
        </motion.div>

        {/* Low Stock Alerts Area */}
        <motion.div
          variants={itemVariants}
          className="admin-glass-panel admin-glass-pulse rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Tech Corner HUD Brackets */}
          <div className="hud-bracket hud-bracket-tl" />
          <div className="hud-bracket hud-bracket-tr" />
          <div className="hud-bracket hud-bracket-bl" />
          <div className="hud-bracket hud-bracket-br" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-100 font-serif">สินค้าใกล้หมดคลัง</h3>
              <span className="text-[10px] bg-red-950/30 border border-red-800/20 text-red-400 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Low Stock Warning
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {data.lowStockProducts.length === 0 ? (
                <p className="text-xs text-stone-500 py-4 text-center">สินค้าทั้งหมดมีสต็อกเพียงพอ</p>
              ) : (
                data.lowStockProducts.map((prod) => (
                  <div key={prod.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-200 truncate">{prod.name}</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">ราคา: ฿{prod.price.toLocaleString('th-TH')}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                        prod.stock <= 2 
                          ? 'bg-red-500/10 border border-red-500/20 text-red-400' 
                          : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                      }`}>
                        เหลือ {prod.stock} ชิ้น
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <Link
            href="/admin/products"
            className="mt-6 w-full py-3 admin-glow-btn text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
          >
            ไปหน้าจัดการสินค้า <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Recent Orders Section */}
      <motion.div
        variants={itemVariants}
        className="admin-glass-panel admin-glass-pulse rounded-2xl p-6 relative overflow-hidden group"
      >
        {/* Tech Corner HUD Brackets */}
        <div className="hud-bracket hud-bracket-tl" />
        <div className="hud-bracket hud-bracket-tr" />
        <div className="hud-bracket hud-bracket-bl" />
        <div className="hud-bracket hud-bracket-br" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-stone-100 font-serif">รายการคำสั่งซื้อล่าสุด</h3>
            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mt-1">10 ออเดอร์ล่าสุดที่เข้ามา</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
          >
            ดูคำสั่งซื้อทั้งหมด <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold text-stone-500 uppercase tracking-widest pb-3">
                <th className="pb-3 text-stone-500">ออเดอร์</th>
                <th className="pb-3 text-stone-500">ลูกค้า</th>
                <th className="pb-3 text-stone-500">ยอดชำระ</th>
                <th className="pb-3 text-stone-500">ช่องทาง</th>
                <th className="pb-3 text-stone-500">ประเภท</th>
                <th className="pb-3 text-stone-500">สถานะ</th>
                <th className="pb-3 text-stone-500">วันที่สร้าง</th>
                <th className="pb-3 text-right text-stone-500">ดูรายละเอียด</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-xs text-stone-500">
                    ไม่พบรายการคำสั่งซื้อล่าสุด
                  </td>
                </tr>
              ) : (
                data.recentOrders.map((order) => (
                  <tr key={order.id} className="text-xs hover:bg-white/5 transition-colors">
                    <td className="py-4 font-bold text-stone-300">#{order.id}</td>
                    <td className="py-4 text-stone-400 truncate max-w-[150px]">{order.customer}</td>
                    <td className="py-4 font-bold text-stone-300">{order.total}</td>
                    <td className="py-4 uppercase text-stone-500 font-semibold">{order.paymentMethod}</td>
                    <td className="py-4 uppercase text-stone-500 font-semibold">{order.type}</td>
                    <td className="py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="py-4 text-stone-500 font-medium">{order.date}</td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex py-1.5 px-3 bg-white/5 border border-white/5 hover:border-red-800/30 hover:bg-red-900/10 text-stone-300 hover:text-red-400 font-bold rounded-lg transition"
                      >
                        เปิดดู
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
