'use client';

import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, Phone, Wine } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function LineIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/* Decorative divider ✦ */
function OrnamentDivider() {
  return (
    <div className="flex items-center gap-2 my-1">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D9C4A1]/70 to-transparent" />
      <span className="text-[#a11a1a]/50 text-[10px]">✦</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D9C4A1]/70 to-transparent" />
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden md:block relative bg-[#EAD3A9] text-stone-800 pt-20 pb-10 overflow-hidden border-t border-[#D9C4A1]/80">

      {/* Background Doodle Pattern */}
      <div
        className="absolute inset-0 bg-[url('/images/footer-pattern.jpg')] bg-cover bg-center pointer-events-none opacity-90"
      />

      {/* Layered Atmospheric Wash — richer depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EAD3A9]/60 via-[#EAD3A9]/10 to-[#C9A97A]/55 pointer-events-none" />

      {/* Top vignette glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#a11a1a]/5 to-transparent pointer-events-none" />

      {/* Ambient bottom warm glow */}
      <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-[#7a3a0a]/20 to-transparent pointer-events-none" />

      {/* Subtle radial gold shimmer center */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(212,165,89,0.18) 0%, transparent 70%)' }}
      />

      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 pb-12">

          {/* ── Brand & Mission Card ── */}
          <div className="lg:col-span-4 relative bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-[#D9C4A1]/90 shadow-2xl shadow-[#6e3010]/15 flex flex-col justify-between space-y-6 overflow-hidden group">
            {/* Card inner glow on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fff8ee]/60 via-transparent to-[#ffe8c8]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            {/* Decorative top-right wine stain circle */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#a11a1a]/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[#D9A050]/10 blur-xl pointer-events-none" />

            <div className="space-y-4 relative">
              <Link href="/" className="inline-flex items-center gap-4 group/logo">
                <div className="relative">
                  {/* Glow ring around icon */}
                  <div className="absolute inset-0 rounded-2xl bg-[#a11a1a]/20 blur-md scale-110 group-hover/logo:scale-125 transition-transform duration-300" />
                  <div className="relative w-13 h-13 rounded-2xl bg-gradient-to-br from-[#c42020] to-[#7a0f0f] flex items-center justify-center shadow-lg shadow-[#a11a1a]/40 group-hover/logo:scale-105 group-hover/logo:rotate-3 transition-all duration-300">
                    <Wine className="h-6 w-6 text-white drop-shadow" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-black tracking-tight text-stone-900 uppercase leading-none drop-shadow-sm">
                    The Bottle Club
                  </span>
                  <span className="text-[10px] font-black tracking-[0.3em] text-[#a11a1a] uppercase mt-1">
                    Est. 2025 · Premium Selections
                  </span>
                </div>
              </Link>

              <OrnamentDivider />

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-medium relative">
                {t('footer.brand_desc')}. {t('footer.tagline')}.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="pt-3 border-t border-[#D9C4A1]/60 relative">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* LINE button */}
                <Link
                  href="https://line.me/ti/p/@thebottleclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider overflow-hidden group/btn transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#06C755]/30 hover:shadow-xl hover:shadow-[#06C755]/40"
                  style={{ background: 'linear-gradient(135deg, #07d95e 0%, #06C755 50%, #04a344 100%)' }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors duration-200 rounded-xl" />
                  {/* shimmer sweep */}
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                  <LineIcon className="w-4 h-4 fill-current relative z-10" />
                  <span className="relative z-10">LINE</span>
                </Link>

                {/* Facebook button */}
                <Link
                  href="https://www.facebook.com/thebottleclub.cm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-black text-xs uppercase tracking-wider overflow-hidden group/btn transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#1877F2]/30 hover:shadow-xl hover:shadow-[#1877F2]/40"
                  style={{ background: 'linear-gradient(135deg, #3b90f5 0%, #1877F2 50%, #1055cc 100%)' }}
                >
                  <span className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/10 transition-colors duration-200 rounded-xl" />
                  <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                  <FacebookIcon className="w-4 h-4 fill-current relative z-10" />
                  <span className="relative z-10">Facebook</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Quick Links: Categories ── */}
          <div className="lg:col-span-2 relative bg-white/88 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e3010]/10 space-y-4 overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#a11a1a]/4 blur-2xl pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fff8ee]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h4 className="relative text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-[#D9C4A1]/60">
              {t('footer.categories')}
            </h4>
            <ul className="flex flex-col gap-3 relative">
              {[
                { label: t('footer.red_wine'), href: '/product?category=red' },
                { label: t('footer.white_wine'), href: '/product?category=white' },
                { label: t('footer.sparkling'), href: '/product?category=sparkling' },
                { label: t('footer.gifts'), href: '/promotions' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group/link flex items-center gap-2.5 text-xs font-bold text-stone-600 hover:text-[#a11a1a] transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a11a1a]/35 group-hover/link:bg-[#a11a1a] group-hover/link:scale-150 group-hover/link:shadow-sm group-hover/link:shadow-[#a11a1a]/40 transition-all duration-300" />
                    <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links: Services ── */}
          <div className="lg:col-span-2 relative bg-white/88 backdrop-blur-xl p-6 sm:p-7 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e3010]/10 space-y-4 overflow-hidden group">
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-[#D9A050]/8 blur-2xl pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#fff8ee]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h4 className="relative text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-[#D9C4A1]/60">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-3 relative">
              {[
                { label: t('footer.how_to_order'), href: '#' },
                { label: t('footer.tracking'), href: '/tracking' },
                { label: t('footer.returns'), href: '#' },
                { label: t('footer.faq'), href: '#' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group/link flex items-center gap-2.5 text-xs font-bold text-stone-600 hover:text-[#a11a1a] transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a11a1a]/35 group-hover/link:bg-[#a11a1a] group-hover/link:scale-150 group-hover/link:shadow-sm group-hover/link:shadow-[#a11a1a]/40 transition-all duration-300" />
                    <span className="group-hover/link:translate-x-0.5 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Information Card ── */}
          <div className="lg:col-span-4 relative bg-white/90 backdrop-blur-xl p-7 sm:p-8 rounded-3xl border border-[#D9C4A1]/90 shadow-2xl shadow-[#6e3010]/15 space-y-5 overflow-hidden group">
            <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#a11a1a]/5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-[#D9A050]/10 blur-2xl pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-[#ffe8c8]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h4 className="relative text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-[#D9C4A1]/60">
              {t('footer.inquiry')} &amp; {t('footer.store_hours')}
            </h4>

            {[
              {
                icon: <Phone size={18} />,
                label: t('footer.direct_line'),
                value: '093 578 6466',
              },
              {
                icon: <Mail size={18} />,
                label: t('footer.inquiry'),
                value: 'whatsup@thebottle.club',
              },
              {
                icon: <Clock3 size={18} />,
                label: t('footer.store_hours'),
                value: '08:00 – 00:00 (Daily)',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group/row relative">
                {/* Icon bubble */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-[#a11a1a]/10 blur-sm scale-110 group-hover/row:bg-[#a11a1a]/20 transition-all duration-300" />
                  <div className="relative p-3 bg-gradient-to-br from-red-50 to-rose-100/60 text-[#a11a1a] rounded-xl group-hover/row:bg-[#a11a1a] group-hover/row:text-white group-hover/row:shadow-lg group-hover/row:shadow-[#a11a1a]/30 transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm text-stone-900 font-extrabold tracking-wide">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Partners & Bottom Bar ── */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-[#D9C4A1]/70">

          {/* Delivery Partners pill */}
          <div className="flex items-center gap-5 flex-wrap justify-center relative bg-white/85 backdrop-blur-xl px-7 py-3 rounded-2xl border border-[#D9C4A1]/70 shadow-md shadow-[#6e3010]/10 hover:shadow-lg hover:shadow-[#6e3010]/15 transition-shadow duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#fff8ee]/50 to-transparent pointer-events-none" />
            <span className="text-[9px] font-black text-stone-500 uppercase tracking-[0.3em] relative">Delivery Partners</span>
            <div className="w-px h-4 bg-[#D9C4A1]/60 relative" />
            <Image src="/logos/dhl.png" alt="DHL" width={50} height={20} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/logos/Lalamove.png" alt="Lalamove" width={75} height={20} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
          </div>

          {/* Secure Checkout pill */}
          <div className="flex items-center gap-4 flex-wrap justify-center relative bg-white/85 backdrop-blur-xl px-7 py-3 rounded-2xl border border-[#D9C4A1]/70 shadow-md shadow-[#6e3010]/10 hover:shadow-lg hover:shadow-[#6e3010]/15 transition-shadow duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#fff8ee]/50 to-transparent pointer-events-none" />
            <span className="text-[9px] font-black text-stone-500 uppercase tracking-[0.3em] relative">Secure Checkout</span>
            <div className="w-px h-4 bg-[#D9C4A1]/60 relative" />
            <Image src="/payments/visa.png" alt="Visa" width={28} height={14} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/mastercard.png" alt="Mastercard" width={28} height={14} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/jcb.png" alt="JCB" width={24} height={14} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/promptpay.png" alt="PromptPay" width={38} height={14} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/shopeepay.png" alt="ShopeePay" width={38} height={14} className="object-contain opacity-80 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
          </div>

        </div>

        {/* ── Copyright strip ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#D9C4A1]/40">
          <p className="text-[10px] font-bold text-stone-500 tracking-widest uppercase">
            © {new Date().getFullYear()} The Bottle Club · All Rights Reserved
          </p>
          <p className="text-[10px] font-bold text-[#a11a1a]/60 tracking-wider uppercase flex items-center gap-1">
            <Wine size={10} /> Premium Wine Curated in Thailand
          </p>
        </div>

      </div>
    </footer>
  );
}
