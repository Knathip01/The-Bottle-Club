'use client';

import Link from 'next/link';
import {
  Award,
  ClipboardList,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  ShieldCheck,
  Star,
  User,
  UserCircle,
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';

type AccountUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  username?: string | null;
};

interface AccountSidebarProps {
  user: AccountUser;
  activePath?: string;
}

export default function AccountSidebar({ user, activePath = '/account' }: AccountSidebarProps) {
  const { t } = useLanguage();
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
  const displayName = fullName || user?.username || user?.email || 'Member';
  
  const handleLogout = async () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('access_token');
    await logout();
  };

  const menuItems = [
    { name: t('account.title'), icon: UserCircle, href: '/account', active: activePath === '/account' },
    { name: t('account.payment_confirm'), icon: CreditCard, href: '#' },
    { name: t('account.profile'), icon: User, href: '/account/profile', active: activePath === '/account/profile' },
    { name: t('account.addresses'), icon: MapPin, href: '/account/addresses', active: activePath === '/account/addresses' },
    { name: t('account.orders'), icon: ClipboardList, href: '/account/orders', active: activePath === '/account/orders' },
    { name: t('account.favorites'), icon: Heart, href: '#' },
    { name: t('account.privacy'), icon: ShieldCheck, href: '/account/privacy', active: activePath === '/account/privacy' },
    { name: t('account.reviews'), icon: Star, href: '/account/reviews', active: activePath === '/account/reviews' },
    { name: t('account.points'), icon: Award, href: '/account/points', active: activePath === '/account/points' },
  ];

  return (
    <aside className="w-full xl:sticky xl:top-28 xl:h-fit">
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 bg-[linear-gradient(135deg,#f8fafc,#fff7ed)] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-stone-950 text-white shadow-sm">
              <User size={28} />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-stone-950">{displayName}</h2>
              <p className="mt-1 truncate text-xs text-stone-500">{user?.email}</p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between rounded-lg border border-amber-100 bg-amber-50 px-4 py-3">
            <span className="text-xs font-semibold text-amber-800">{t('account.your_points')}</span>
            <span className="rounded-md bg-amber-400 px-2 py-1 text-xs font-bold text-stone-950">0</span>
          </div>
        </div>

        <nav className="flex flex-col p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-stone-950 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-950'
                }`}
              >
                <Icon size={17} />
                <span className="min-w-0 truncate">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="mt-2 flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-medium text-stone-500 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={17} />
            <span>{t('account.logout')}</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
