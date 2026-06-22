'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogoutAction } from '@/app/actions/admin/auth';
import {
  LayoutDashboard, ShoppingCart, Wine, Users, Star,
  Monitor, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, Menu, X,
} from 'lucide-react';

interface SidebarProps {
  admin: { name: string | null; email: string; role: string };
}

const menuSections = [
  {
    label: 'MAIN',
    items: [
      { title: 'แดชบอร์ด', icon: LayoutDashboard, href: '/admin/dashboard', badge: null },
    ],
  },
  {
    label: 'COMMERCE',
    items: [
      { title: 'ออเดอร์ทั้งหมด', icon: ShoppingCart, href: '/admin/orders',  badge: null },
      { title: 'จัดการสินค้า',   icon: Wine,          href: '/admin/products', badge: null },
      { title: 'จัดการสมาชิก',  icon: Users,         href: '/admin/members',  badge: null },
      { title: 'รีวิวสินค้า',    icon: Star,          href: '/admin/reviews',  badge: null },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { title: 'จุดขายหน้าร้าน', icon: Monitor,  href: '/admin/pos',      badge: 'POS' },
      { title: 'รายงานยอดขาย',  icon: BarChart3, href: '/admin/reports',  badge: null },
      { title: 'ตั้งค่าร้านค้า', icon: Settings, href: '/admin/settings', badge: null },
    ],
  },
];

function getInitials(name: string | null, email: string) {
  if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return email.slice(0, 2).toUpperCase();
}

export default function AdminSidebar({ admin }: SidebarProps) {
  const pathname   = usePathname();
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      await adminLogoutAction();
    }
  };

  const SidebarContent = () => (
    <div
      className="flex flex-col h-full overflow-hidden select-none"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(28px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
        borderRight: '1px solid rgba(255,255,255,0.95)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.06), 1px 0 0 rgba(0,0,0,0.04)',
      }}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full shrink-0" style={{ background: 'linear-gradient(to right, transparent, #c41e3a 40%, #f59e0b 60%, transparent)' }} />

      {/* Brand */}
      <div className={`flex items-center gap-3 px-5 py-4 border-b shrink-0 ${collapsed ? 'justify-center px-3' : ''}`}
        style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-xl opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(196,30,58,0.35), rgba(245,158,11,0.2))' }} />
          <img src="/logos/Thebottleclub.jpg" alt="The Bottle Club"
            className="relative w-9 h-9 rounded-xl object-cover"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }} />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-neon-flicker"
            style={{ border: '2px solid white' }} />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="font-serif font-black text-stone-800 text-sm tracking-tight leading-none truncate">THE BOTTLE CLUB</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                admin?.role === 'superadmin'
                  ? 'text-amber-700 bg-amber-50 border border-amber-200'
                  : 'text-red-700 bg-red-50 border border-red-200'
              }`}>
                {admin?.role === 'superadmin' ? '⚡ Super Admin' : '● Staff'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar space-y-4">
        {menuSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-3 mb-1.5"
                style={{ color: '#a8a29e' }}>
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon    = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.title : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group ${
                      isActive ? 'sidebar-nav-active' : 'sidebar-nav-inactive'
                    } ${collapsed ? 'justify-center' : ''}`}
                  >
                    {/* Active left bar */}
                    {isActive && (
                      <span className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full"
                        style={{ background: 'linear-gradient(to bottom, #f87171, #c41e3a)' }} />
                    )}

                    {/* Icon */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-all duration-200 ${
                      isActive ? 'bg-red-50 shadow-sm' : 'group-hover:bg-red-50/60'
                    }`}
                      style={isActive ? { boxShadow: '0 2px 8px rgba(196,30,58,0.12)' } : {}}>
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-red-600' : 'text-stone-400 group-hover:text-stone-600'}`} />
                    </div>

                    {!collapsed && (
                      <>
                        <span className={`flex-1 truncate ${isActive ? 'text-red-700' : 'text-stone-600 group-hover:text-stone-800'}`}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase"
                            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#92400e' }}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-4 mb-3 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.07) 30%, rgba(0,0,0,0.07) 70%, transparent)' }} />

      {/* Footer */}
      <div className={`px-3 pb-4 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <button onClick={handleLogout} title="ออกจากระบบ"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer">
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-black/3 transition-colors">
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black text-white"
              style={{ background: 'linear-gradient(135deg, #c41e3a, #7f1d1d)' }}>
              {getInitials(admin?.name, admin?.email)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-stone-700 truncate leading-none">{admin?.name || 'Admin'}</p>
              <p className="text-[10px] text-stone-400 truncate mt-0.5">{admin?.email}</p>
            </div>
            <button onClick={handleLogout} title="ออกจากระบบ"
              className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer shrink-0">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-xl cursor-pointer transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          {mobileOpen ? <X className="w-5 h-5 text-stone-700" /> : <Menu className="w-5 h-5 text-stone-700" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-y-0 left-0 w-[270px] z-50 transform transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-out ${collapsed ? 'w-[68px]' : 'w-[256px]'}`}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bottom-[90px] right-[-13px] flex items-center justify-center rounded-full text-stone-500 hover:text-stone-700 transition-all duration-200 shadow-md cursor-pointer z-40"
          style={{ width: 26, height: 26, background: 'white', border: '1px solid rgba(0,0,0,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>
    </>
  );
}
