'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, Search, Calendar, ChevronRight } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();

  // Determine current section title based on pathname
  const getSectionTitle = () => {
    if (pathname.includes('/admin/dashboard')) return 'แดชบอร์ด';
    if (pathname.includes('/admin/orders')) return 'จัดการคำสั่งซื้อ';
    if (pathname.includes('/admin/products')) return 'จัดการสินค้าคลัง';
    if (pathname.includes('/admin/members')) return 'จัดการสมาชิก';
    if (pathname.includes('/admin/reviews')) return 'รีวิวและการอนุมัติ';
    if (pathname.includes('/admin/pos')) return 'ขายหน้าร้าน POS';
    if (pathname.includes('/admin/reports')) return 'รายงานยอดขาย';
    if (pathname.includes('/admin/settings')) return 'ตั้งค่าระบบ';
    return 'ผู้ดูแลระบบ';
  };

  const getBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.map((seg, idx) => {
      let label = seg;
      if (seg === 'admin') label = 'Admin';
      else if (seg === 'dashboard') label = 'Dashboard';
      else if (seg === 'orders') label = 'Orders';
      else if (seg === 'products') label = 'Products';
      else if (seg === 'members') label = 'Members';
      else if (seg === 'reviews') label = 'Reviews';
      else if (seg === 'pos') label = 'POS';
      else if (seg === 'reports') label = 'Reports';
      else if (seg === 'settings') label = 'Settings';
      
      const href = '/' + segments.slice(0, idx + 1).join('/');

      return (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-stone-600" />}
          <span className={`${idx === segments.length - 1 ? 'text-stone-100 font-bold' : 'text-stone-500'}`}>
            {label}
          </span>
        </React.Fragment>
      );
    });
  };

  const today = new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-stone-950/40 backdrop-blur-xl border-b border-white/10 py-4 px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 select-none shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
      {/* Title & Breadcrumbs */}
      <div className="flex flex-col gap-1.5 pl-12 lg:pl-0">
        <h1 className="text-xl font-bold font-serif text-stone-100 leading-none">
          {getSectionTitle()}
        </h1>
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
          {getBreadcrumbs()}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-5">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-stone-400">
          <Calendar className="w-4 h-4 text-stone-500" />
          <span>{today}</span>
        </div>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="ค้นหาด่วน..."
            className="w-48 lg:w-64 pl-9 pr-4 py-2.5 bg-stone-950/65 border border-white/10 focus:border-red-650 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)] rounded-full text-xs text-stone-200 focus:outline-none transition duration-300 placeholder:text-stone-600"
          />
        </div>

        {/* Notification Bell */}
        <button className="p-2 hover:bg-white/5 text-stone-400 hover:text-stone-100 rounded-full relative transition duration-200 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
        </button>
      </div>
    </header>
  );
}
