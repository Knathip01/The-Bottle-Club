'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogoutAction } from '@/app/actions/admin/auth';
import {
  LayoutDashboard,
  ShoppingCart,
  Wine,
  Users,
  Star,
  Monitor,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';

interface SidebarProps {
  admin: {
    name: string | null;
    email: string;
    role: string;
  };
}

export default function AdminSidebar({ admin }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    {
      title: 'แดชบอร์ด',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      title: 'ออเดอร์ทั้งหมด',
      icon: ShoppingCart,
      href: '/admin/orders',
    },
    {
      title: 'จัดการสินค้า',
      icon: Wine,
      href: '/admin/products',
    },
    {
      title: 'จัดการสมาชิก',
      icon: Users,
      href: '/admin/members',
    },
    {
      title: 'รีวิวสินค้า',
      icon: Star,
      href: '/admin/reviews',
    },
    {
      title: 'จุดขายหน้าร้าน (POS)',
      icon: Monitor,
      href: '/admin/pos',
    },
    {
      title: 'รายงานยอดขาย',
      icon: BarChart3,
      href: '/admin/reports',
    },
    {
      title: 'ตั้งค่าร้านค้า',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      await adminLogoutAction();
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-stone-950/60 backdrop-blur-xl border-r border-white/10 text-stone-300 select-none shadow-[4px_0_30px_rgba(0,0,0,0.4)]">
      {/* Header / Brand */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src="/logos/Thebottleclub.jpg"
            alt="The Bottle Club Logo"
            className="w-10 h-10 rounded-xl object-cover border border-white/20 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          />
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="font-serif font-black text-stone-100 text-sm tracking-wide truncate">
                THE BOTTLE CLUB
              </h2>
              <span className="text-[9px] bg-red-500/10 border border-red-500/20 text-red-400 font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block mt-0.5 w-max">
                {admin?.role === 'superadmin' ? 'Super Admin' : 'Staff'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all duration-350 relative group overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-red-950/40 to-red-900/10 border border-red-500/20 text-red-400 shadow-[0_4px_20px_rgba(220,38,38,0.12)]'
                  : 'hover:bg-white/5 hover:text-stone-100 border border-transparent hover:translate-x-1.5'
              }`}
              title={collapsed ? item.title : undefined}
            >
              {isActive && (
                <span className="absolute left-0 top-3 bottom-3 w-1 bg-red-500 rounded-r shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              )}
              <Icon className={`w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-red-400' : 'text-stone-400'}`} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Profile */}
      <div className="p-4 border-t border-white/5 bg-stone-950/20">
        {!collapsed ? (
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-stone-100 truncate">{admin?.name || 'Admin User'}</p>
              <p className="text-[10px] text-stone-500 truncate mt-0.5">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/5 hover:text-red-400 rounded-xl text-stone-500 transition-colors cursor-pointer shrink-0"
              title="ออกจากระบบ"
            >
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2.5 hover:bg-white/5 hover:text-red-400 rounded-xl text-stone-500 transition-colors cursor-pointer"
            title="ออกจากระบบ"
          >
            <LogOut className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 bg-stone-900 border border-white/10 rounded-xl text-stone-100 shadow-xl cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 w-[280px] z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block shrink-0 h-screen sticky top-0 transition-all duration-300 z-30 ${
          collapsed ? 'w-[76px]' : 'w-[280px]'
        }`}
      >
        <SidebarContent />

        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-20 right-[-14px] w-7 h-7 bg-stone-900 border border-white/10 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition shadow-md cursor-pointer z-40"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </>
  );
}
