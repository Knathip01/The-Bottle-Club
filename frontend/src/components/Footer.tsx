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

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="hidden md:block relative bg-[#EAD3A9] text-stone-800 pt-20 pb-10 overflow-hidden border-t border-[#D9C4A1]/80">
      {/* Background Doodle Pattern (Your Local Drunk Dealer removed) */}
      <div 
        className="absolute inset-0 bg-[url('/images/footer-pattern.jpg')] bg-cover bg-center pointer-events-none opacity-90" 
      />

      {/* Subtle Warm Atmospheric Wash for contrast and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EAD3A9]/50 via-transparent to-[#EAD3A9]/60 pointer-events-none" />

      <div className="container relative mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-6 pb-12">
          
          {/* Brand & Mission Card */}
          <div className="lg:col-span-4 bg-white/85 backdrop-blur-md p-8 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e512c]/5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-4 group">
                <div className="relative">
                  <div className="w-13 h-13 rounded-2xl bg-[#a11a1a] flex items-center justify-center shadow-lg shadow-[#a11a1a]/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                    <Wine className="h-6 w-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-black tracking-tight text-stone-900 uppercase leading-none">
                    The Bottle Club
                  </span>
                  <span className="text-[10px] font-black tracking-[0.3em] text-[#a11a1a] uppercase mt-1">
                    Est. 2025 Premium Selections
                  </span>
                </div>
              </Link>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-medium">
                {t('footer.brand_desc')}. {t('footer.tagline')}.
              </p>
            </div>

            {/* Social Buttons: Only LINE and Facebook */}
            <div className="pt-2 border-t border-stone-200/60">
              <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                <Link 
                  href="https://line.me/ti/p/@thebottleclub" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#06C755] hover:bg-[#05b34c] text-white rounded-xl shadow-md shadow-[#06C755]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-black text-xs uppercase tracking-wider"
                >
                  <LineIcon className="w-4 h-4 fill-current" />
                  <span>LINE</span>
                </Link>
                <Link 
                  href="https://www.facebook.com/thebottleclub.cm" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#1464cc] text-white rounded-xl shadow-md shadow-[#1877F2]/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer font-black text-xs uppercase tracking-wider"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                  <span>Facebook</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Column 1: Categories */}
          <div className="lg:col-span-2 bg-white/85 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e512c]/5 space-y-4">
            <h4 className="text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-stone-200/60">
              {t('footer.categories')}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('footer.red_wine'), href: '/product?category=red' },
                { label: t('footer.white_wine'), href: '/product?category=white' },
                { label: t('footer.sparkling'), href: '/product?category=sparkling' },
                { label: t('footer.gifts'), href: '/promotions' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-[#a11a1a] transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a11a1a]/40 group-hover:bg-[#a11a1a] group-hover:scale-125 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2: Services */}
          <div className="lg:col-span-2 bg-white/85 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e512c]/5 space-y-4">
            <h4 className="text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-stone-200/60">
              {t('footer.services')}
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: t('footer.how_to_order'), href: '#' },
                { label: t('footer.tracking'), href: '/tracking' },
                { label: t('footer.returns'), href: '#' },
                { label: t('footer.faq'), href: '#' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="group flex items-center gap-2 text-xs font-bold text-stone-700 hover:text-[#a11a1a] transition-all duration-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a11a1a]/40 group-hover:bg-[#a11a1a] group-hover:scale-125 transition-all"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Card */}
          <div className="lg:col-span-4 bg-white/85 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-[#D9C4A1]/80 shadow-xl shadow-[#6e512c]/5 space-y-5">
            <h4 className="text-stone-900 text-xs font-black uppercase tracking-[0.25em] pb-2 border-b border-stone-200/60">
              {t('footer.inquiry')} & {t('footer.store_hours')}
            </h4>
            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-red-50 text-[#a11a1a] rounded-xl group-hover:bg-[#a11a1a] group-hover:text-white transition-all shadow-sm">
                <Phone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{t('footer.direct_line')}</span>
                <span className="text-sm text-stone-900 font-extrabold tracking-wide">093 578 6466</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-red-50 text-[#a11a1a] rounded-xl group-hover:bg-[#a11a1a] group-hover:text-white transition-all shadow-sm">
                <Mail size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{t('footer.inquiry')}</span>
                <span className="text-sm text-stone-900 font-extrabold tracking-wide">whatsup@thebottle.club</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="p-3 bg-red-50 text-[#a11a1a] rounded-xl group-hover:bg-[#a11a1a] group-hover:text-white transition-all shadow-sm">
                <Clock3 size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest">{t('footer.store_hours')}</span>
                <span className="text-sm text-stone-900 font-extrabold tracking-wide">08:00 - 00:00 (Daily)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Partners & Footer Bottom Bar */}
        <div className="py-6 flex flex-col lg:flex-row items-center justify-between gap-6 border-t border-[#D9C4A1]/80">
          <div className="flex items-center gap-5 flex-wrap justify-center bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#D9C4A1]/60 shadow-sm">
            <span className="text-[9px] font-black text-stone-600 uppercase tracking-[0.3em]">Delivery Partners</span>
            <Image src="/logos/dhl.png" alt="DHL" width={50} height={20} className="object-contain" style={{ height: 'auto' }} />
            <Image src="/logos/Lalamove.png" alt="Lalamove" width={75} height={20} className="object-contain" style={{ height: 'auto' }} />
          </div>

          <div className="flex items-center gap-4 flex-wrap justify-center bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-[#D9C4A1]/60 shadow-sm">
            <span className="text-[9px] font-black text-stone-600 uppercase tracking-[0.3em]">Secure Checkout</span>
            <Image src="/payments/visa.png" alt="Visa" width={28} height={14} className="object-contain" style={{ height: 'auto' }} />
            <Image src="/payments/mastercard.png" alt="Mastercard" width={28} height={14} className="object-contain" style={{ height: 'auto' }} />
            <Image src="/payments/jcb.png" alt="JCB" width={24} height={14} className="object-contain" style={{ height: 'auto' }} />
            <Image src="/payments/promptpay.png" alt="PromptPay" width={38} height={14} className="object-contain" style={{ height: 'auto' }} />
            <Image src="/payments/shopeepay.png" alt="ShopeePay" width={38} height={14} className="object-contain" style={{ height: 'auto' }} />
          </div>
        </div>

      </div>
    </footer>
  );
}
