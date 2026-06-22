'use client';

import React, { useEffect, useState } from 'react';
import KPICard from '@/components/admin/KPICard';
import SalesChart from '@/components/admin/SalesChart';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { motion } from 'framer-motion';
import {
  DollarSign, ShoppingBag, Users, AlertTriangle,
  ArrowRight, ShieldCheck, Wine, Plus, Eye,
  Package, Star, BarChart3, Clock, Zap, RefreshCw,
  TrendingUp,
} from 'lucide-react';
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

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 90, damping: 18 } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const quickActions = [
  { label: 'เพิ่มสินค้า', icon: Plus, href: '/admin/products/new', color: '#c41e3a' },
  { label: 'ดูออเดอร์', icon: Eye, href: '/admin/orders', color: '#3b82f6' },
  { label: 'รายงาน', icon: BarChart3, href: '/admin/reports', color: '#10b981' },
  { label: 'จัดการสมาชิก', icon: Users, href: '/admin/members', color: '#a855f7' },
];

// Sparkline data stubs (last 7 data points trend)
const sparklines = {
  revenue: [4200, 3800, 5100, 6200, 4900, 7100, 8300],
  orders: [3, 5, 2, 7, 4, 6, 8],
  members: [1, 2, 1, 3, 2, 4, 3],
  stock: [2, 3, 2, 4, 3, 2, 2],
};

function LoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse select-none">
      <div className="h-28 rounded-2xl" style={{ background: 'rgba(0,0,0,0.05)' }} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1,2,3,4].map(i => <div key={i} className="h-32 rounded-2xl" style={{ background: 'rgba(0,0,0,0.05)' }} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 h-80 rounded-2xl" style={{ background: 'rgba(0,0,0,0.05)' }} />
        <div className="h-80 rounded-2xl" style={{ background: 'rgba(0,0,0,0.05)' }} />
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/dashboard', { cache: 'no-store' });
      if (!res.ok) throw new Error('ไม่สามารถดึงข้อมูลแดชบอร์ดได้');
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  if (loading) return <LoadingSkeleton />;

  if (error || !data) {
    return (
      <div className="admin-card rounded-2xl p-10 flex flex-col items-center gap-4 text-center select-none">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <div>
          <p className="font-bold text-stone-800 text-base">โหลดข้อมูลไม่สำเร็จ</p>
          <p className="text-stone-500 text-sm mt-1">{error || 'ข้อมูลไม่สมบูรณ์'}</p>
        </div>
        <button
          onClick={() => { setError(null); setLoading(true); loadData(); }}
          className="admin-btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" /> ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 select-none">

      {/* ─── Welcome Banner ─── */}
      <motion.div variants={fadeUp}>
        <div
          className="relative overflow-hidden rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.95)',
            borderTop: '1px solid white',
            boxShadow: '0 4px 24px rgba(196,30,58,0.06), 0 1px 0 white inset',
          }}
        >
          {/* Top crimson line */}
          <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(to right, transparent, #c41e3a 40%, #f59e0b 60%, transparent)' }} />
          {/* Corner glow */}
          <div className="absolute top-0 right-0 w-64 h-40 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(196,30,58,0.05), transparent 70%)' }} />

          {/* Left info */}
          <div className="flex items-center gap-4 relative z-10">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.2)' }}
            >
              <ShieldCheck className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="font-serif font-black text-stone-800 text-base leading-tight">The Bottle Club — Control Center</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-stone-500 font-semibold">ระบบทำงานปกติ</span>
                {lastUpdated && (
                  <span className="text-[10px] text-stone-400">· อัพเดต {lastUpdated.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}</span>
                )}
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-2 relative z-10 flex-wrap">
            {quickActions.map((qa) => {
              const Icon = qa.icon;
              return (
                <Link
                  key={qa.href}
                  href={qa.href}
                  className="quick-action-card flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-stone-600 hover:text-red-700"
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: qa.color }} />
                  {qa.label}
                </Link>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* ─── KPI Cards ─── */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="ยอดขายวันนี้"
          value={data.metrics.todayRevenue}
          change="+12.5%"
          trend="up"
          icon={DollarSign}
          sparkline={sparklines.revenue}
        />
        <KPICard
          title="ออเดอร์รอดำเนินการ"
          value={data.metrics.pendingOrders.toString()}
          change="+3 ออเดอร์"
          trend="up"
          icon={ShoppingBag}
          sparkline={sparklines.orders}
        />
        <KPICard
          title="สมาชิกใหม่เดือนนี้"
          value={data.metrics.newMembers.toString()}
          change="+18%"
          trend="up"
          icon={Users}
          sparkline={sparklines.members}
        />
        <KPICard
          title="สินค้าใกล้หมดคลัง"
          value={data.metrics.lowStockAlerts.toString()}
          change={data.metrics.lowStockAlerts > 0 ? 'ควรเติมสต็อก' : 'สต็อกเพียงพอ'}
          trend={data.metrics.lowStockAlerts > 0 ? 'down' : 'neutral'}
          icon={AlertTriangle}
          sparkline={sparklines.stock}
        />
      </motion.div>

      {/* ─── Chart + Low Stock ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <motion.div variants={fadeUp} className="lg:col-span-2">
          <SalesChart data={data.salesData} />
        </motion.div>

        {/* Low Stock Panel */}
        <motion.div variants={fadeUp}>
          <div className="admin-card rounded-2xl p-5 h-full flex flex-col">
            <div className="absolute top-0 left-6 right-6 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)' }} />

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-stone-800 font-serif">สต็อกใกล้หมด</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mt-0.5">Low Stock Alert</p>
              </div>
              <span
                className="text-[9px] font-extrabold px-2 py-1 rounded-full uppercase tracking-widest"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#991b1b' }}
              >
                {data.lowStockProducts.length} รายการ
              </span>
            </div>

            <div className="flex-1 divide-y divide-black/5">
              {data.lowStockProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
                  <Package className="w-8 h-8 text-stone-700" />
                  <p className="text-xs text-stone-600 font-semibold">สินค้าทั้งหมดมีสต็อกเพียงพอ</p>
                </div>
              ) : (
                data.lowStockProducts.map((prod) => (
                  <div key={prod.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center" style={{ background: 'rgba(196,30,58,0.07)', border: '1px solid rgba(196,30,58,0.15)' }}>
                        <Wine className="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-stone-700 truncate">{prod.name}</p>
                        <p className="text-[10px] text-stone-400 mt-0.5">฿{prod.price.toLocaleString('th-TH')}</p>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                        prod.stock <= 2
                          ? 'badge-rejected'
                          : 'badge-pending'
                      }`}
                    >
                      {prod.stock} ชิ้น
                    </span>
                  </div>
                ))
              )}
            </div>

            <Link
              href="/admin/products"
              className="mt-4 w-full py-2.5 admin-btn-primary text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              จัดการสินค้า <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ─── Recent Orders Table ─── */}
      <motion.div variants={fadeUp}>
        <div className="admin-card rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }} />

          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-black font-serif text-stone-800">คำสั่งซื้อล่าสุด</h3>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mt-0.5">10 ออเดอร์ล่าสุด</p>
            </div>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all duration-200 text-red-700 hover:text-white admin-action-btn"
              style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.15)' }}
            >
              ดูทั้งหมด <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-left min-w-[640px]">
              <thead>
                <tr className="text-[9px] font-extrabold uppercase tracking-[0.12em]" style={{ color: '#a8a29e' }}>
                  <th className="pb-3 pl-1 pr-3">#ออเดอร์</th>
                  <th className="pb-3 pr-3">ลูกค้า</th>
                  <th className="pb-3 pr-3">ยอดชำระ</th>
                  <th className="pb-3 pr-3">ช่องทาง</th>
                  <th className="pb-3 pr-3">ประเภท</th>
                  <th className="pb-3 pr-3">สถานะ</th>
                  <th className="pb-3 pr-3">วันที่</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center">
                      <div className="flex flex-col items-center gap-2 text-stone-600">
                        <ShoppingBag className="w-8 h-8" />
                        <p className="text-xs font-semibold">ยังไม่มีคำสั่งซื้อ</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.recentOrders.map((order, idx) => (
                    <tr
                      key={order.id}
                      className="admin-table-row text-xs group/row"
                    >
                      <td className="py-3.5 pl-1 pr-3 font-black text-stone-300">
                        <span className="font-mono" style={{ color: '#1c1917' }}>#{String(order.id).padStart(4, '0')}</span>
                      </td>
                      <td className="py-3.5 pr-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white shrink-0"
                            style={{ background: `hsl(${(idx * 47) % 360}, 50%, 40%)` }}
                          >
                            {order.customer.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="truncate max-w-[120px]" style={{ color: '#57534e' }}>{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-3 font-bold" style={{ color: '#292524' }}>{order.total}</td>
                      <td className="py-3.5 pr-3">
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.04)', color: '#78716c' }}>
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3">
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded-md" style={{ background: 'rgba(0,0,0,0.04)', color: '#78716c' }}>
                          {order.type}
                        </span>
                      </td>
                      <td className="py-3.5 pr-3">
                        <OrderStatusBadge status={order.status} size="sm" />
                      </td>
                      <td className="py-3.5 pr-3 text-stone-600 font-medium text-[10px]">{order.date}</td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="admin-action-btn"
                          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
                        >
                          <Eye className="w-3 h-3" /> ดู
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
