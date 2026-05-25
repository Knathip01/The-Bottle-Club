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
  Upload,
  ChevronRight,
  Sparkle
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AccountSidebar from './AccountSidebar';

const SOCIAL_PROFILE_TRANSLATIONS: Record<string, string> = {
  th: 'ช่องทางเชื่อมต่อโซเชียล',
  en: 'Linked Social Profile',
  fr: 'Profil social lié',
  zh: '关联的社交网络资料',
  ja: '連携済みのソーシャルプロフィール',
  es: 'Perfil social vinculado',
  de: 'Verknüpftes soziales Profil',
  ko: '연동된 소셜 프로필',
  it: 'Profilo social collegato',
  ru: 'Связанный social профиль',
  pt: 'Perfil social associado',
  vi: 'Hồ sơ mạng xã hội liên kết',
  ar: 'الملف الشخصي الاجتماعي المرتبط',
  hi: 'लिंक किया गया सामाजिक प्रोफ़ाइल',
  id: 'Profil Sosial Terhubung',
  tr: 'Bağlı Sosyal Profil',
  nl: 'Gekoppeld sociaal profiel',
  pl: 'Połączony profil społecznościowy',
  sv: 'Länkad social profil',
  da: 'Tilknyttet social profil',
  no: 'Tilknyttet sosial profil',
  fi: 'Linkitetty sosiaalinen profiili',
  ms: 'Profil Sosial Terpaut',
  he: 'פרופיל רשת חברתית מקושר',
  el: 'Συνδεδεμένο κοινωνικό προφίλ'
};

const GOOGLE_AUTH_TRANSLATIONS: Record<string, string> = {
  th: 'ยืนยันตัวตนผ่าน Google',
  en: 'Google Authenticated',
  fr: 'Authentifié via Google',
  zh: '已通过 Google 验证',
  ja: 'Googleで認証済み',
  es: 'Autenticado con Google',
  de: 'Über Google authentifiziert',
  ko: 'Google 인증됨',
  it: 'Autenticato con Google',
  ru: 'Авторизован через Google',
  pt: 'Autenticado com Google',
  vi: 'Đã xác thực qua Google',
  ar: 'تم التحقق عبر Google',
  hi: 'Google द्वारा प्रमाणित',
  id: 'Terverifikasi Google',
  tr: 'Google ile Doğrulandı',
  nl: 'Geverifieerd via Google',
  pl: 'Uwierzytelniono przez Google',
  sv: 'Verifierad via Google',
  da: 'Godkendt via Google',
  no: 'Verifisert via Google',
  fi: 'Google-tunnistautunut',
  ms: 'Diverifikasi Google',
  he: 'מאומת באמצעות Google',
  el: 'Ταυτοποιήθηκε μέσω Google'
};

const LINE_AUTH_TRANSLATIONS: Record<string, string> = {
  th: 'ยืนยันตัวตนผ่าน LINE',
  en: 'LINE Authenticated',
  fr: 'Authentifié via LINE',
  zh: '已通过 LINE 验证',
  ja: 'LINEで認証済み',
  es: 'Autenticado con LINE',
  de: 'Über LINE authentifiziert',
  ko: 'LINE 인증됨',
  it: 'Autenticato con LINE',
  ru: 'Авторизован через LINE',
  pt: 'Autenticado com LINE',
  vi: 'Đã xác thực qua LINE',
  ar: 'تم التحقق عبر LINE',
  hi: 'LINE द्वारा प्रमाणित',
  id: 'Terverifikasi LINE',
  tr: 'LINE ile Doğrulandı',
  nl: 'Geverifieerd via LINE',
  pl: 'Uwierzytelniono przez LINE',
  sv: 'Verifierad via LINE',
  da: 'Godkendt via LINE',
  no: 'Verifisert via LINE',
  fi: 'LINE-tunnistautunut',
  ms: 'Diverifikasi LINE',
  he: 'מאומת באמצעות LINE',
  el: 'Ταυτοποιήθηκε μέσω LINE'
};

type AccountUser = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  username?: string | null;
  avatar?: string | null;
  provider?: string | null;
};

interface AccountContentProps {
  user: AccountUser;
}

export default function AccountContent({ user }: AccountContentProps) {
  const { t, language } = useLanguage();
  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim();
  const displayName = fullName || user?.username || user?.email || 'Member';

  const statusItems = [
    { label: t('account.your_points'), value: '0', icon: Award, tone: 'from-amber-400/20 to-amber-500/5 text-amber-700 border-amber-200/50 hover:shadow-amber-500/5' },
    { label: t('account.orders'), value: '0', icon: PackageCheck, tone: 'from-emerald-400/20 to-emerald-500/5 text-emerald-700 border-emerald-200/50 hover:shadow-emerald-500/5' },
    { label: t('account.docs_title'), value: '3', icon: FileText, tone: 'from-sky-400/20 to-sky-500/5 text-sky-700 border-sky-200/50 hover:shadow-sky-500/5' },
    { label: t('account.privacy'), value: 'OK', icon: ShieldCheck, tone: 'from-rose-400/20 to-rose-500/5 text-rose-700 border-rose-200/50 hover:shadow-rose-500/5' },
  ];

  const requiredDocs = [
    t('account.doc_liquor_license'),
    t('account.doc_id_certificate'),
    t('account.doc_vat_certificate'),
  ];

  // Modern soft pastel styling for active mesh gradients
  const welcomeMeshBg = user?.provider === 'google'
    ? 'bg-gradient-to-tr from-blue-500/10 via-sky-50/40 to-blue-600/5'
    : user?.provider === 'line'
      ? 'bg-gradient-to-tr from-emerald-500/10 via-green-50/40 to-emerald-600/5'
      : 'bg-gradient-to-tr from-[#a11a1a]/10 via-amber-500/5 to-[#a11a1a]/5';

  const providerColor = user?.provider === 'google'
    ? 'border-blue-100 bg-blue-50 text-blue-700'
    : user?.provider === 'line'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 font-black'
      : 'border-[#a11a1a]/20 bg-[#a11a1a]/5 text-[#a11a1a]';

  return (
    <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
      <AccountSidebar user={user} />

      <div className="min-w-0 space-y-8">
        
        {/* Modern Glassmorphic Welcome Card */}
        <section className="relative overflow-hidden rounded-2xl border border-stone-200/60 bg-white/70 backdrop-blur-xl shadow-xl shadow-stone-950/5 group">
          {/* Accent Blobs */}
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-tr from-amber-400/10 to-red-400/10 blur-3xl transition-opacity duration-700 opacity-60 group-hover:opacity-85" />
          <div className="absolute left-1/4 -bottom-16 h-48 w-48 rounded-full bg-amber-400/5 blur-3xl" />
          
          <div className={`relative p-6 sm:p-8 ${welcomeMeshBg}`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className={`mb-3.5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10px] font-black uppercase tracking-widest ${providerColor}`}>
                  <CheckCircle2 size={12} className="stroke-[3]" />
                  {user?.provider === 'google' 
                    ? GOOGLE_AUTH_TRANSLATIONS[language] || `${t('account.profile')} · Google` 
                    : user?.provider === 'line'
                      ? LINE_AUTH_TRANSLATIONS[language] || `${t('account.profile')} · LINE`
                      : t('account.profile')}
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl uppercase">
                  {t('account.title')}
                </h1>
                <p className="mt-2.5 max-w-2xl text-xs sm:text-sm font-medium leading-relaxed text-stone-500">
                  Welcome back, <span className="font-extrabold text-stone-800 uppercase tracking-wide">{displayName}</span>. 
                  {user?.email ? <span className="block mt-0.5 text-stone-400 font-normal lowercase">{user.email}</span> : null}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <Link
                  href="/account/profile"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-stone-950 hover:bg-[#a11a1a] text-white px-5 text-xs font-black tracking-widest uppercase shadow-lg shadow-stone-950/15 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Edit2 size={14} className="stroke-[2.5]" />
                  {t('common.edit')}
                </Link>
                <Link
                  href="/account/orders"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-stone-200 bg-white hover:border-stone-300 hover:bg-stone-50 text-stone-700 px-5 text-xs font-black tracking-widest uppercase shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  <PackageCheck size={14} className="stroke-[2.5]" />
                  {t('account.orders')}
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid border-t border-stone-100 sm:grid-cols-2 lg:grid-cols-4 bg-white/40">
            {statusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="group/stat border-b border-stone-100 p-6 last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0 transition-all duration-300 hover:bg-white/60">
                  <div className={`mb-3.5 inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br p-2.5 transition-transform duration-500 group-hover/stat:scale-110 ${item.tone}`}>
                    <Icon size={18} className="stroke-[2]" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">{item.label}</p>
                  <p className="mt-1 text-2xl font-black text-stone-900 tracking-tight">{item.value}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          
          {/* User Info Module */}
          <section className="rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-stone-950/5 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">{t('account.user_info')}</h2>
                  <p className="mt-1 text-xs text-stone-400 font-medium">{t('account.profile')}</p>
                </div>
                <div className="p-2 bg-stone-50 rounded-xl">
                  <UserRound className="text-stone-400" size={18} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-100 bg-stone-50/40 p-4 hover:bg-stone-50 transition-colors">
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('auth.email')}</p>
                  <p className="mt-1.5 break-all text-xs font-bold text-stone-800 leading-tight">{user?.email || '-'}</p>
                </div>
                <div className="rounded-xl border border-stone-100 bg-stone-50/40 p-4 hover:bg-stone-50 transition-colors">
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">{t('account.profile')}</p>
                  <p className="mt-1.5 text-xs font-bold text-stone-800 leading-tight uppercase">{displayName}</p>
                </div>

                {user?.provider && (
                  <div className="rounded-xl border border-stone-250 bg-stone-50/20 p-4 sm:col-span-2 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt="provider avatar" 
                          className="w-10 h-10 rounded-full border border-stone-200 shadow-sm object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold uppercase">
                          {user.provider.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-stone-400">
                          {SOCIAL_PROFILE_TRANSLATIONS[language] || SOCIAL_PROFILE_TRANSLATIONS['en']}
                        </p>
                        <p className="mt-0.5 text-xs font-black text-stone-800 uppercase flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${user.provider === 'google' ? 'bg-blue-500' : 'bg-emerald-500 animate-pulse'}`} />
                          {user.provider} Connected
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-full shadow-inner shadow-emerald-600/5">Verified</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-stone-100 pt-5">
              <Link
                href="/account/profile"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-black uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-50 hover:text-stone-900 shadow-sm hover:shadow active:scale-98"
              >
                <Edit2 size={13} className="stroke-[2.5]" />
                {t('common.edit')}
              </Link>
              <button className="inline-flex h-10 items-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-black uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-50 hover:text-stone-900 shadow-sm hover:shadow active:scale-98">
                <ShieldCheck size={13} className="stroke-[2.5]" />
                {t('account.change_password')}
              </button>
            </div>
          </section>

          {/* Newsletter Panel */}
          <section className="rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-stone-950/5 flex flex-col justify-between">
            <div>
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">{t('account.newsletter')}</h2>
                  <p className="mt-1 text-xs text-stone-400 font-medium">{t('account.no_newsletter')}</p>
                </div>
                <div className="p-2 bg-[#a11a1a]/5 rounded-xl">
                  <Sparkles className="text-[#a11a1a]" size={18} />
                </div>
              </div>

              {/* Custom Animated Sliding Toggle */}
              <div className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-stone-150 bg-stone-50/40 p-4 transition-colors hover:bg-white">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-700">{t('account.subscribe_newsletter')}</span>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5.5 bg-stone-200 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#a11a1a] shadow-inner" />
                </label>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-amber-200/50 bg-gradient-to-tr from-amber-50/80 to-amber-100/10 p-4 text-xs text-amber-800 shadow-sm flex items-center gap-3">
              <div className="p-2 bg-amber-400 text-stone-950 rounded-lg shadow font-black shrink-0">
                <Clock3 size={15} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-amber-600/80 leading-none mb-1">{t('account.your_points')}</p>
                <p className="text-base font-extrabold text-amber-900 leading-none">0 Points</p>
              </div>
            </div>
          </section>
        </div>

        {/* Addresses Section */}
        <section className="rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-stone-950/5">
          <div className="mb-6 flex flex-col gap-4 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">{t('account.addresses')}</h2>
              <p className="mt-1 text-xs text-stone-400 font-medium">{t('account.manage_addresses')}</p>
            </div>
            <Link
              href="/account/addresses"
              className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-stone-200 px-4 text-xs font-black uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-50 hover:text-stone-900 shadow-sm hover:shadow"
            >
              <MapPin size={13} className="stroke-[2.5]" />
              {t('account.edit_address')}
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50/30 p-5 flex flex-col justify-between min-h-[120px] transition-all hover:bg-stone-50/60 hover:border-amber-400/50 hover:shadow-md hover:shadow-amber-500/5 group">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-850 group-hover:text-stone-900 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 group-hover:bg-amber-500 transition-colors" />
                  {t('account.billing_address')}
                </h3>
                <p className="mt-3 text-xs font-medium text-stone-400 leading-relaxed">{t('account.no_billing_address')}</p>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <Link href="/account/addresses" className="text-[10px] font-black uppercase text-[#a11a1a] tracking-widest flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all hover:translate-x-1">
                  Manage <ChevronRight size={10} className="stroke-[3]" />
                </Link>
              </div>
            </div>
            
            <div className="rounded-xl border border-dashed border-stone-200 bg-stone-50/30 p-5 flex flex-col justify-between min-h-[120px] transition-all hover:bg-stone-50/60 hover:border-amber-400/50 hover:shadow-md hover:shadow-amber-500/5 group">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-stone-850 group-hover:text-stone-900 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-400 group-hover:bg-amber-500 transition-colors" />
                  {t('account.shipping_address')}
                </h3>
                <p className="mt-3 text-xs font-medium text-stone-400 leading-relaxed">{t('account.no_shipping_address')}</p>
              </div>
              <div className="mt-4 flex items-center justify-end">
                <Link href="/account/addresses" className="text-[10px] font-black uppercase text-[#a11a1a] tracking-widest flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all hover:translate-x-1">
                  Manage <ChevronRight size={10} className="stroke-[3]" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Upload Section */}
        <section className="rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-xl p-6 shadow-xl shadow-stone-950/5">
          <div className="mb-6 flex flex-col gap-4 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">{t('account.docs_title')}</h2>
              <p className="mt-1 text-xs text-stone-400 font-medium">{t('account.docs_list_title')}</p>
            </div>
            <button className="inline-flex h-10 w-fit items-center gap-2 rounded-xl bg-[#a11a1a] hover:bg-[#7f1414] px-4 text-xs font-black uppercase tracking-widest text-white transition-all shadow-md active:scale-98">
              <Plus size={13} className="stroke-[3]" />
              {t('account.add_more_files')}
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-3">
              {requiredDocs.map((doc) => (
                <div key={doc} className="flex items-start gap-4 rounded-xl border border-stone-100 bg-stone-50/20 p-4 transition-all hover:bg-stone-50/50 hover:shadow-sm">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-150 text-stone-600 shadow-inner">
                    <FileText size={16} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Required Document</span>
                    <span className="text-xs font-bold leading-normal text-stone-850">{doc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Drag and Drop Visual */}
            <div className="rounded-2xl bg-gradient-to-br from-stone-900 to-stone-950 p-6 text-white shadow-lg border border-stone-800 flex flex-col justify-between min-h-[220px] group/upload">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <Sparkle size={10} className="fill-amber-400" />
                  {t('account.choose_file')}
                </p>
                
                {/* Dashed Golden Hover Zone */}
                <div className="mt-4 border-2 border-dashed border-stone-800 group-hover/upload:border-amber-400/40 rounded-xl bg-white/2 hover:bg-white/5 p-5 text-center transition-all duration-500 cursor-pointer flex flex-col items-center justify-center min-h-[110px]">
                  <Upload size={24} className="text-stone-500 group-hover/upload:text-amber-400 group-hover/upload:-translate-y-1 transition-all duration-500 stroke-[2]" />
                  <span className="block mt-2.5 text-[10px] font-bold text-stone-400 leading-normal group-hover/upload:text-stone-300">
                    Drag & Drop File Here<br />
                    <span className="text-stone-600 group-hover/upload:text-amber-500/80 font-black uppercase tracking-wider text-[8px]">or Browse device</span>
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-1 border-t border-stone-800/80 pt-3">
                <span className="text-[8px] font-black text-stone-500 uppercase tracking-widest">Active Verification Status</span>
                <div className="rounded-lg bg-stone-900/60 border border-stone-800/60 px-3 py-2 text-[9px] font-bold text-stone-400 tracking-wider flex items-center justify-between">
                  <span>{t('account.no_file_selected')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
