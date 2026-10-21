'use client';

import Image from "next/image";
import Link from "next/link";
import { Clock3, Mail, Phone } from "lucide-react";
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
    <div className="flex items-center gap-2 my-2 w-full max-w-[200px] mx-auto">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="text-[#a11a1a] text-[10px]">✦</span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden md:block relative bg-[#EAD3A9] text-white pt-20 pb-10 overflow-hidden border-t border-[#D9C4A1]">

      {/* Background Doodle Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-90"
        style={{ backgroundImage: "url('/images/footer-pattern.jpg?v=5')" }}
      />

      {/* Layered Atmospheric Wash — warm parchment wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EAD3A9]/40 via-transparent to-[#C9A97A]/45 pointer-events-none" />

      {/* Ambient warm lighting on the right side behind card 4 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 85% 50%, rgba(212,145,50,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 pb-12">

          {/* ── Brand & Mission Card ── */}
          <div className="lg:col-span-4 relative bg-gradient-to-b from-[#2b221a]/95 via-[#1f1914]/95 to-[#16120e]/98 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col justify-between space-y-6 overflow-hidden group text-center">
            {/* Top glass reflection rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            
            {/* Subtle warm amber radial accent on top-right */}
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-amber-600/15 blur-3xl pointer-events-none" />

            <div className="space-y-5 relative flex flex-col items-center">
              <Link href="/" className="inline-block group/logo mx-auto">
                <div className="relative inline-block">
                  <div className="relative h-24 w-24 rounded-2xl bg-gradient-to-b from-stone-900 via-black to-stone-950 border border-white/15 shadow-2xl flex items-center justify-center p-3 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/logos/thebottleclub-mascot.png"
                      alt="The Bottle Club"
                      width={56}
                      height={72}
                      className="h-16 w-auto object-contain drop-shadow"
                    />
                  </div>
                </div>
              </Link>

              <div className="w-full">
                <OrnamentDivider />
              </div>

              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-normal relative text-center">
                {t('footer.brand_desc')}. {t('footer.tagline')}.
              </p>
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-white/10 relative flex flex-col items-center">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3 text-center">
                Connect With Us
              </span>
              <div className="flex items-center justify-center gap-3">
                {/* LINE button */}
                <Link
                  href="https://line.me/ti/p/@thebottleclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider overflow-hidden group/btn transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_16px_rgba(6,199,85,0.4)] hover:shadow-[0_6px_20px_rgba(6,199,85,0.5)]"
                  style={{ background: 'linear-gradient(135deg, #07d95e 0%, #06C755 50%, #04a344 100%)' }}
                >
                  <LineIcon className="w-4 h-4 fill-current relative z-10" />
                  <span className="relative z-10">LINE</span>
                </Link>

                {/* Facebook button */}
                <Link
                  href="https://www.facebook.com/thebottleclub.cm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider overflow-hidden group/btn transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_16px_rgba(24,119,242,0.4)] hover:shadow-[0_6px_20px_rgba(24,119,242,0.5)]"
                  style={{ background: 'linear-gradient(135deg, #3b90f5 0%, #1877F2 50%, #1055cc 100%)' }}
                >
                  <FacebookIcon className="w-4 h-4 fill-current relative z-10" />
                  <span className="relative z-10">FACEBOOK</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ── Quick Links: Categories ── */}
          <div className="lg:col-span-2 relative bg-gradient-to-b from-[#2b221a]/95 via-[#1f1914]/95 to-[#16120e]/98 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] space-y-4 overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <h4 className="relative text-white text-xs font-bold uppercase tracking-[0.2em] pb-3 border-b border-white/10 flex items-center justify-between">
              <span>{t('footer.categories')}</span>
              <span className="text-amber-400 text-xs">✦</span>
            </h4>
            <ul className="flex flex-col gap-3 relative">
              {[
                { label: t('footer.red_wine'), href: '/product?category=red' },
                { label: t('footer.white_wine'), href: '/product?category=white' },
                { label: t('footer.sparkling'), href: '/product?category=sparkling' },
                { label: t('footer.gifts'), href: '/promotions' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group/link flex items-center gap-2.5 text-xs sm:text-sm font-normal text-stone-300 hover:text-white transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] group-hover/link:bg-amber-300 group-hover/link:scale-125 transition-all duration-300" />
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links: Services ── */}
          <div className="lg:col-span-2 relative bg-gradient-to-b from-[#2b221a]/95 via-[#1f1914]/95 to-[#16120e]/98 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] space-y-4 overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            <h4 className="relative text-white text-xs font-bold uppercase tracking-[0.2em] pb-3 border-b border-white/10 flex items-center justify-between">
              <span>{t('footer.services')}</span>
              <span className="text-amber-400 text-xs">✦</span>
            </h4>
            <ul className="flex flex-col gap-3 relative">
              {[
                { label: t('footer.how_to_order'), href: '#' },
                { label: t('footer.tracking'), href: '/tracking' },
                { label: t('footer.returns'), href: '#' },
                { label: t('footer.faq'), href: '#' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group/link flex items-center gap-2.5 text-xs sm:text-sm font-normal text-stone-300 hover:text-white transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] group-hover/link:bg-amber-300 group-hover/link:scale-125 transition-all duration-300" />
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact Information Card ── */}
          <div className="lg:col-span-4 relative bg-gradient-to-b from-[#2b221a]/95 via-[#1f1914]/95 to-[#16120e]/98 backdrop-blur-2xl p-7 sm:p-8 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.55)] space-y-5 overflow-hidden group">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            {/* Subtle warm amber radial accent on the bottom-right */}
            <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

            <h4 className="relative text-white text-xs font-bold uppercase tracking-[0.2em] pb-3 border-b border-white/10 flex items-center justify-between">
              <span>{t('footer.inquiry')} &amp; {t('footer.store_hours')}</span>
              <span className="text-amber-400 text-xs">✦</span>
            </h4>

            {[
              {
                icon: <Phone size={18} className="text-amber-400" />,
                label: t('footer.direct_line'),
                value: '093 578 6466',
              },
              {
                icon: <Mail size={18} className="text-amber-400" />,
                label: t('footer.inquiry'),
                value: 'whatsup@thebottle.club',
              },
              {
                icon: <Clock3 size={18} className="text-amber-400" />,
                label: t('footer.store_hours'),
                value: '08:00 – 00:00',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group/row relative">
                {/* Icon bubble */}
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-[#362b20]/90 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-sm group-hover/row:border-amber-400/40 group-hover/row:bg-amber-500/20 transition-all duration-300">
                    {item.icon}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm sm:text-base text-white font-bold tracking-wide">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── Partners & Bottom Bar (Dark Glass Pills) ── */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-black/10">

          {/* Delivery Partners pill */}
          <div className="flex items-center gap-5 flex-wrap justify-center relative bg-[#241c16]/90 backdrop-blur-2xl px-7 py-3 rounded-2xl border border-white/10 shadow-xl shadow-black/30">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent pointer-events-none" />
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.3em] relative">Delivery Partners</span>
            <div className="w-px h-4 bg-white/20 relative" />
            <Image src="/logos/dhl.png" alt="DHL" width={50} height={20} className="object-contain brightness-110 contrast-125 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/logos/Lalamove.png" alt="Lalamove" width={75} height={20} className="object-contain brightness-110 contrast-125 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
          </div>

          {/* Secure Checkout pill */}
          <div className="flex items-center gap-4 flex-wrap justify-center relative bg-[#241c16]/90 backdrop-blur-2xl px-7 py-3 rounded-2xl border border-white/10 shadow-xl shadow-black/30">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            <span className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.3em] relative">Secure Checkout</span>
            <div className="w-px h-4 bg-white/20 relative" />
            <Image src="/payments/visa.png" alt="Visa" width={28} height={14} className="object-contain brightness-110 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/mastercard.png" alt="Mastercard" width={28} height={14} className="object-contain brightness-110 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/jcb.png" alt="JCB" width={24} height={14} className="object-contain brightness-110 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/promptpay.png" alt="PromptPay" width={38} height={14} className="object-contain brightness-110 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
            <Image src="/payments/shopeepay.png" alt="ShopeePay" width={38} height={14} className="object-contain brightness-110 hover:opacity-100 transition-opacity relative" style={{ height: 'auto' }} />
          </div>

        </div>

        {/* ── Copyright strip ── */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-black/10">
          <p className="text-[10px] font-bold text-stone-700 tracking-widest uppercase">
            © {new Date().getFullYear()} The Bottle Club · All Rights Reserved
          </p>
          <p className="text-[10px] font-bold text-[#a11a1a] tracking-wider uppercase flex items-center gap-1.5">
            <Image
              src="/logos/thebottleclub-mascot.png"
              alt=""
              width={12}
              height={16}
              className="h-3.5 w-auto object-contain inline-block opacity-90"
            />
            Premium Wine Curated in Thailand
          </p>
        </div>

      </div>
    </footer>
  );
}
