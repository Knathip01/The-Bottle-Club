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
  Truck,
  User,
  UserCircle,
  Coins,
  Crown
} from 'lucide-react';
import { logout } from '@/app/actions/auth';
import { useLanguage } from '@/context/LanguageContext';

type AccountUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  username?: string | null;
  avatar?: string | null;
  provider?: string | null;
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
    { name: t('nav.tracking'), icon: Truck, href: '/tracking', active: activePath === '/tracking' },
  ];

  // Modern, warm pastel gradients based on auth provider
  const headerBgClass = user?.provider === 'google'
    ? 'bg-gradient-to-tr from-sky-50 via-white to-blue-50/50'
    : user?.provider === 'line'
      ? 'bg-gradient-to-tr from-emerald-50 via-white to-green-50/50'
      : 'bg-gradient-to-tr from-stone-50 via-white to-amber-50/30';

  return (
    <aside className="w-full md:w-64 xl:w-[280px] shrink-0 xl:sticky xl:top-28 xl:h-fit">
      <div className="overflow-hidden rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-stone-950/5">
        
        {/* User Card Header */}
        <div className={`border-b border-stone-100 p-6 ${headerBgClass}`}>
          <div className="flex items-center gap-4">
            
            {/* Active User Avatar Frame */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-[#a11a1a] to-amber-500 opacity-80 blur-sm transition-all group-hover:opacity-100" />
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={displayName}
                  className="relative h-16 w-16 rounded-full object-cover border-2 border-white shadow-md transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              ) : user?.provider === 'google' ? (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 text-white shadow-md border-2 border-white font-black text-xl transition-transform duration-500 group-hover:scale-105">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              ) : user?.provider === 'line' ? (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 text-white shadow-md border-2 border-white font-black text-xl transition-transform duration-500 group-hover:scale-105">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-stone-900 text-white shadow-md border-2 border-white transition-transform duration-500 group-hover:scale-105">
                  <User size={24} />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="truncate text-sm font-black text-stone-900 leading-tight tracking-tight uppercase">{displayName}</h2>
                {user?.provider === 'google' && (
                  <span className="inline-flex items-center gap-1 bg-white border border-blue-100 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Google
                  </span>
                )}
                {user?.provider === 'line' && (
                  <span className="inline-flex items-center gap-1 bg-white border border-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LINE
                  </span>
                )}
              </div>
              <p className="mt-1 truncate text-xs text-stone-400 font-medium">{user?.email}</p>
            </div>
          </div>

          {/* Luxury Virtual Membership Card */}
          <div className="relative mt-6 overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 p-5 text-white shadow-lg shadow-stone-950/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/5 group border border-stone-800">
            {/* Card Background Overlay */}
            <div className="absolute right-0 top-0 -mr-6 -mt-6 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl group-hover:bg-amber-500/15 transition-all duration-500" />
            
            <div className="relative flex justify-between items-start">
              <div className="flex flex-col gap-0.5">
                <span className="text-[8px] font-black tracking-[0.25em] text-amber-400 uppercase">THE BOTTLE CLUB VIP</span>
                <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">{t('account.your_points')}</span>
              </div>
              
              {/* Gold Card Chip */}
              <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 shadow-inner border border-amber-200/30 flex items-center justify-center p-0.5">
                <Crown size={12} className="text-amber-950/70" />
              </div>
            </div>

            <div className="relative mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-black tracking-tight text-white">0</span>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">PTS</span>
            </div>

            <div className="relative mt-4 flex items-center justify-between border-t border-stone-800 pt-3 text-[9px] font-black tracking-widest text-stone-500 uppercase">
              <span>•••• •••• •••• 2026</span>
              <span className="text-stone-400">CLASSIC LEVEL</span>
            </div>
          </div>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="flex flex-col p-3 gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex min-h-11 items-center gap-3.5 rounded-xl px-4 text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  item.active
                    ? 'bg-[#a11a1a] text-white shadow-md shadow-[#a11a1a]/25'
                    : 'text-stone-600 hover:bg-stone-50 hover:pl-5 hover:text-[#a11a1a]'
                }`}
              >
                <Icon size={16} className={`transition-colors duration-300 ${item.active ? 'text-white' : 'text-stone-400 group-hover:text-[#a11a1a]'}`} />
                <span className="min-w-0 truncate">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="group mt-2 flex min-h-11 w-full items-center gap-3.5 rounded-xl px-4 text-left text-xs font-bold tracking-wider uppercase text-stone-500 transition-all duration-300 hover:bg-red-50 hover:pl-5 hover:text-red-600"
          >
            <LogOut size={16} className="text-stone-400 transition-colors duration-300 group-hover:text-red-600" />
            <span>{t('account.logout')}</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
