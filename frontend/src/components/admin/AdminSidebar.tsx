'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { adminLogoutAction } from '@/app/actions/admin/auth';
import {
  LayoutDashboard, ShoppingCart, Wine, Users, Star,
  Monitor, BarChart3, Settings, LogOut,
  ChevronLeft, ChevronRight, Menu, X, CreditCard,
} from 'lucide-react';
import CartoonBottleIcon from '@/components/icons/CartoonBottleIcon';

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
      { title: 'ออเดอร์ทั้งหมด',      icon: ShoppingCart, href: '/admin/orders',   badge: null },
      { title: 'ตรวจสอบการชำระเงิน', icon: CreditCard,   href: '/admin/payments', badge: null },
      { title: 'จัดการสินค้า',         icon: Wine,         href: '/admin/products', badge: null },
      { title: 'จัดการสมาชิก',         icon: Users,        href: '/admin/members',  badge: null },
      { title: 'รีวิวสินค้า',           icon: Star,         href: '/admin/reviews',  badge: null },
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
  {
    label: 'AI',
    items: [
      { title: 'AI วิเคราะห์ธุรกิจ', icon: CartoonBottleIcon, href: '#ai-chat', badge: null },
    ],
  },
];

function getInitials(name: string | null, email: string) {
  if (name) return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  return email.slice(0, 2).toUpperCase();
}

// Stagger animation variants for menu items
const menuContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

export default function AdminSidebar({ admin }: SidebarProps) {
  const pathname   = usePathname();
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    if (confirm('คุณต้องการออกจากระบบใช่หรือไม่?')) {
      await adminLogoutAction();
    }
  };

  // Swipe-to-close handler
  const touchStartX = React.useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) {
      setMobileOpen(false);
    }
  }, []);

  const NavContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full overflow-hidden select-none">
      {/* Top accent line */}
      <div className="h-[2px] w-full shrink-0" style={{ background: 'linear-gradient(to right, transparent, #c41e3a 40%, #f59e0b 60%, transparent)' }} />

      {/* Brand */}
      <div className={`flex items-center gap-3 px-5 py-4 border-b shrink-0 ${collapsed && !isMobile ? 'justify-center px-3' : ''}`}
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="relative shrink-0">
          <div className="absolute -inset-1 rounded-xl opacity-50"
            style={{ background: 'linear-gradient(135deg, rgba(196,30,58,0.35), rgba(245,158,11,0.2))' }} />
          <img src="/logos/Thebottleclub.jpg" alt="The Bottle Club"
            className="relative w-9 h-9 rounded-xl object-cover"
            style={{ border: '1px solid rgba(0,0,0,0.08)' }} />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-neon-flicker"
            style={{ border: '2px solid white' }} />
        </div>
        {(!collapsed || isMobile) && (
          <div className="min-w-0 flex-1">
            <p className="font-serif font-black text-sm tracking-tight leading-none truncate" style={{ color: '#f1f5f9' }}>THE BOTTLE CLUB</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                admin?.role === 'superadmin'
                  ? 'text-amber-300 bg-amber-950/60 border border-amber-700/40'
                  : 'text-red-300 bg-red-950/60 border border-red-700/40'
              }`}>
                {admin?.role === 'superadmin' ? '⚡ Super Admin' : '● Staff'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <motion.nav
        className="flex-1 px-3 py-4 overflow-y-auto no-scrollbar space-y-4"
        variants={isMobile ? menuContainerVariants : undefined}
        initial={isMobile ? 'hidden' : undefined}
        animate={isMobile ? 'show' : undefined}
      >
        {menuSections.map((section) => (
          <div key={section.label}>
            {(!collapsed || isMobile) && (
              <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] px-3 mb-1.5"
                style={{ color: '#334155' }}>
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon    = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const isAction = item.href.startsWith('#');

                const itemClass = `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group ${
                  isActive ? 'sidebar-nav-active' : 'sidebar-nav-inactive'
                } ${collapsed && !isMobile ? 'justify-center' : ''}`;

                const iconContent = (
                  <>
                    {/* Active left bar */}
                    {isActive && (
                      <motion.span
                        className="absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-r-full"
                        style={{ background: 'linear-gradient(to bottom, #f87171, #c41e3a)' }}
                        layoutId={isMobile ? 'mobile-active-bar' : 'desktop-active-bar'}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    {/* Icon */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0 transition-all duration-200 ${
                      isActive ? 'bg-red-50 shadow-sm' : 'group-hover:bg-red-50/60'
                    }`}
                      style={isActive ? { boxShadow: '0 2px 8px rgba(196,30,58,0.12)' } : {}}>
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-red-600' : 'text-stone-400 group-hover:text-stone-600'}`} />
                    </div>

                    {(!collapsed || isMobile) && (
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
                  </>
                );

                const navElement = isAction ? (
                  <button
                    type="button"
                    title={collapsed && !isMobile ? item.title : undefined}
                    onClick={() => {
                      setMobileOpen(false);
                      document.getElementById('admin-ai-chat-btn')?.click();
                    }}
                    className={itemClass + ' w-full text-left cursor-pointer'}
                  >
                    {iconContent}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed && !isMobile ? item.title : undefined}
                    className={itemClass}
                  >
                    {iconContent}
                  </Link>
                );

                return isMobile ? (
                  <motion.div key={item.href} variants={menuItemVariants}>
                    {navElement}
                  </motion.div>
                ) : (
                  <React.Fragment key={item.href}>
                    {navElement}
                  </React.Fragment>
                );
              })}

            </div>
          </div>
        ))}
      </motion.nav>

      {/* Divider */}
      <div className="mx-4 mb-3 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 30%, rgba(255,255,255,0.07) 70%, transparent)' }} />

      {/* Footer */}
      <div className={`px-3 pb-4 shrink-0 ${collapsed && !isMobile ? 'flex justify-center' : ''}`}>
        {collapsed && !isMobile ? (
          <button onClick={handleLogout} title="ออกจากระบบ"
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 cursor-pointer"
            style={{ color: '#475569' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,30,58,0.1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#475569'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
            <LogOut className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-3 p-2.5 rounded-xl transition-colors"
            style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black text-white"
              style={{ background: 'linear-gradient(135deg, #c41e3a, #7f1d1d)', boxShadow: '0 0 12px rgba(196,30,58,0.3)' }}>
              {getInitials(admin?.name, admin?.email)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate leading-none" style={{ color: '#e2e8f0' }}>{admin?.name || 'Admin'}</p>
              <p className="text-[10px] truncate mt-0.5" style={{ color: '#475569' }}>{admin?.email}</p>
            </div>
            <button onClick={handleLogout} title="ออกจากระบบ"
              className="p-1.5 rounded-lg transition-all duration-200 cursor-pointer shrink-0"
              style={{ color: '#475569' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#f87171'; (e.currentTarget as HTMLButtonElement).style.background = 'rgba(196,30,58,0.1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#475569'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}>
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger — floating hamburger */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <motion.button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2.5 rounded-2xl cursor-pointer"
          style={{
            background: 'rgba(11, 15, 26, 0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4), 0 0 16px rgba(196,30,58,0.05)',
          }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5" style={{ color: '#94a3b8' }} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5" style={{ color: '#94a3b8' }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile overlay with heavy blur */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden admin-drawer-overlay-2027"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer with spring animation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="lg:hidden admin-drawer-2027"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <NavContent isMobile={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className={`hidden lg:block shrink-0 h-screen sticky top-0 z-30 transition-all duration-300 ease-out ${collapsed ? 'w-[68px]' : 'w-[256px]'}`}
        style={{
          background: 'rgba(11, 15, 26, 0.97)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
          borderRight: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '4px 0 40px rgba(0,0,0,0.6), 1px 0 0 rgba(255,255,255,0.04)',
        }}
      >
        <NavContent isMobile={false} />
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
