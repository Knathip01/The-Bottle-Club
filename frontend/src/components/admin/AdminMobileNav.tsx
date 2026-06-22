'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingCart, Wine, BarChart3, Monitor,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: 'หน้าหลัก', icon: LayoutDashboard },
  { href: '/admin/orders',    label: 'ออเดอร์', icon: ShoppingCart },
  { href: '/admin/products',  label: 'สินค้า',  icon: Wine },
  { href: '/admin/reports',   label: 'รายงาน', icon: BarChart3 },
  { href: '/admin/pos',       label: 'POS',     icon: Monitor },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="admin-mobile-nav lg:hidden" aria-label="เมนูหลัก">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={`admin-mobile-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon className={isActive ? 'text-red-600' : ''} strokeWidth={isActive ? 2.5 : 2} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
