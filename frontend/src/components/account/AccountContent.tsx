'use client';

import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Clock3,
  Edit2,
  FileText,
  MapPin,
  PackageCheck,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AccountSidebar from './AccountSidebar';

type AccountUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  username?: string | null;
};

interface AccountContentProps {
  user: AccountUser;
}

export default function AccountContent({ user }: AccountContentProps) {
  const { t } = useLanguage();
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
  const displayName = fullName || user?.username || user?.email || 'Member';

  const statusItems = [
    { label: t('account.your_points'), value: '0', icon: Award, tone: 'bg-amber-50 text-amber-700 border-amber-100' },
    { label: t('account.orders'), value: '0', icon: PackageCheck, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { label: t('account.docs_title'), value: '3', icon: FileText, tone: 'bg-sky-50 text-sky-700 border-sky-100' },
    { label: t('account.privacy'), value: 'OK', icon: ShieldCheck, tone: 'bg-rose-50 text-rose-700 border-rose-100' },
  ];

  const requiredDocs = [
    t('account.doc_liquor_license'),
    t('account.doc_id_certificate'),
    t('account.doc_vat_certificate'),
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <AccountSidebar user={user} />

      <div className="min-w-0 space-y-6">
        <section className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="bg-[linear-gradient(135deg,#fff_0%,#fff_48%,#f7f2ed_48%,#f7f2ed_100%)] p-5 sm:p-7">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 size={14} />
                  {t('account.profile')}
                </div>
                <h1 className="text-3xl font-serif font-bold text-stone-950 sm:text-4xl">
                  {t('account.title')}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
                  {displayName}
                  {user?.email ? <span className="block text-stone-400">{user.email}</span> : null}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/account/profile"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-stone-950 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#a11a1a]"
                >
                  <Edit2 size={16} />
                  {t('common.edit')}
                </Link>
                <Link
                  href="/account/orders"
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 shadow-sm transition-colors hover:border-stone-300 hover:bg-stone-50"
                >
                  <PackageCheck size={16} />
                  {t('account.orders')}
                </Link>
              </div>
            </div>
          </div>

          <div className="grid border-t border-stone-200 sm:grid-cols-2 xl:grid-cols-4">
            {statusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="border-b border-stone-200 p-5 last:border-b-0 sm:border-r xl:border-b-0">
                  <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border ${item.tone}`}>
                    <Icon size={19} />
                  </div>
                  <p className="text-xs font-medium text-stone-500">{item.label}</p>
                  <p className="mt-1 text-2xl font-bold text-stone-950">{item.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-stone-950">{t('account.user_info')}</h2>
                <p className="mt-1 text-sm text-stone-500">{t('account.profile')}</p>
              </div>
              <UserRound className="text-stone-300" size={22} />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-semibold text-stone-400">{t('auth.email')}</p>
                <p className="mt-2 break-words text-sm font-semibold text-stone-900">{user?.email || '-'}</p>
              </div>
              <div className="rounded-lg bg-stone-50 p-4">
                <p className="text-xs font-semibold text-stone-400">{t('account.profile')}</p>
                <p className="mt-2 break-words text-sm font-semibold text-stone-900">{displayName}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/account/profile"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-200 px-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
              >
                <Edit2 size={15} />
                {t('common.edit')}
              </Link>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-200 px-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50">
                <ShieldCheck size={15} />
                {t('account.change_password')}
              </button>
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-stone-950">{t('account.newsletter')}</h2>
                <p className="mt-1 text-sm text-stone-500">{t('account.no_newsletter')}</p>
              </div>
              <Sparkles className="text-[#a11a1a]" size={22} />
            </div>

            <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-stone-200 bg-stone-50 p-4 transition-colors hover:bg-white">
              <span className="text-sm font-semibold text-stone-700">{t('account.subscribe_newsletter')}</span>
              <input type="checkbox" className="h-5 w-5 rounded border-stone-300 accent-[#a11a1a]" />
            </label>

            <div className="mt-5 rounded-lg border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
              <Clock3 className="mb-2" size={18} />
              {t('account.your_points')}: 0
            </div>
          </section>
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-3 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-950">{t('account.addresses')}</h2>
              <p className="mt-1 text-sm text-stone-500">{t('account.manage_addresses')}</p>
            </div>
            <Link
              href="/account/addresses"
              className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-stone-200 px-4 text-sm font-semibold text-stone-700 transition-colors hover:bg-stone-50"
            >
              <MapPin size={15} />
              {t('account.edit_address')}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 p-5">
              <h3 className="mb-2 text-sm font-bold text-stone-950">{t('account.billing_address')}</h3>
              <p className="text-sm text-stone-500">{t('account.no_billing_address')}</p>
            </div>
            <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 p-5">
              <h3 className="mb-2 text-sm font-bold text-stone-950">{t('account.shipping_address')}</h3>
              <p className="text-sm text-stone-500">{t('account.no_shipping_address')}</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-3 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-950">{t('account.docs_title')}</h2>
              <p className="mt-1 text-sm text-stone-500">{t('account.docs_list_title')}</p>
            </div>
            <button className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-[#a11a1a] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#7f1414]">
              <Plus size={15} />
              {t('account.add_more_files')}
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {requiredDocs.map((doc) => (
                <div key={doc} className="flex items-start gap-3 rounded-lg border border-stone-200 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-600">
                    <FileText size={17} />
                  </div>
                  <span className="text-sm font-medium leading-6 text-stone-700">{doc}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg bg-stone-950 p-5 text-white">
              <p className="text-sm font-semibold">{t('account.choose_file')}</p>
              <p className="mt-3 text-sm leading-6 text-stone-300">{t('account.docs_hint')}</p>
              <div className="mt-5 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300">
                {t('account.no_file_selected')}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
