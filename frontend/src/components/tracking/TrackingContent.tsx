'use client';

import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalLink, Info } from 'lucide-react';

export default function TrackingContent() {
  const { language } = useLanguage();
  const isTh = language === 'th';

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Main Tracking Card ────────────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl shadow-xl shadow-stone-900/5 overflow-hidden transition-all">
        
        {/* Card Header with Brand Aesthetics */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 border-b border-stone-100 bg-gradient-to-r from-amber-50/40 via-white to-stone-50/40">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200/90 shadow-md shadow-stone-900/5 flex items-center justify-center p-2 shrink-0 overflow-hidden">
              <Image
                src="/logos/tracking-rider.png"
                alt="Delivery Mascot"
                width={64}
                height={64}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                {isTh ? 'ติดตามสถานะพัสดุ' : 'Track Your Shipment'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-medium mt-1">
                {isTh
                  ? 'ตรวจสอบสถานะการจัดส่งกับขนส่งพันธมิตร The Bottle Club โดยตรง'
                  : 'Track your shipment directly with The Bottle Club delivery partners'}
              </p>
            </div>
          </div>
        </div>

        {/* Card Body: Partner Carriers Buttons (DHL & Lalamove) */}
        <div className="p-6 sm:p-8">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4 text-center sm:text-left">
            {isTh ? 'เลือกตรวจสอบกับขนส่งพันธมิตร' : 'Select a partner carrier to track'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* DHL Express Button */}
            <a
              href="https://www.dhl.com/th-th/home/tracking/tracking-express.html"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-4 sm:p-5 rounded-2xl border border-stone-200/90 bg-stone-50/70 hover:bg-white hover:border-[#FFCC00] hover:shadow-xl hover:shadow-[#FFCC00]/15 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* DHL Logo */}
                <div className="w-18 h-13 rounded-xl bg-[#FFCC00] flex items-center justify-center p-2.5 shadow-sm border border-[#e6b800] shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logos/dhl.png"
                    alt="DHL Express"
                    width={65}
                    height={26}
                    className="object-contain"
                    style={{ height: 'auto', maxHeight: '26px' }}
                  />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-black text-stone-900 group-hover:text-red-700 transition-colors block">
                    DHL Express
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium block">
                    {isTh ? 'จัดส่งพัสดุด่วนทั่วประเทศ' : 'Domestic Nationwide Delivery'}
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-200/70 text-stone-500 group-hover:bg-[#FFCC00] group-hover:text-stone-950 transition-all shadow-sm shrink-0">
                <ExternalLink size={16} />
              </div>
            </a>

            {/* Lalamove Express Button */}
            <a
              href="https://www.lalamove.com/th-th/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-4 sm:p-5 rounded-2xl border border-stone-200/90 bg-stone-50/70 hover:bg-white hover:border-[#F47920] hover:shadow-xl hover:shadow-[#F47920]/15 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Lalamove Logo */}
                <div className="w-18 h-13 rounded-xl bg-white flex items-center justify-center p-2.5 shadow-sm border border-orange-200 shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logos/Lalamove.png"
                    alt="Lalamove"
                    width={70}
                    height={24}
                    className="object-contain"
                    style={{ height: 'auto', maxHeight: '24px' }}
                  />
                </div>
                <div>
                  <span className="text-base sm:text-lg font-black text-stone-900 group-hover:text-orange-600 transition-colors block">
                    Lalamove
                  </span>
                  <span className="text-[11px] text-stone-500 font-medium block">
                    {isTh ? 'จัดส่งด่วนภายในวัน (Same-day)' : 'Same-day Express Delivery'}
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-200/70 text-stone-500 group-hover:bg-[#F47920] group-hover:text-white transition-all shadow-sm shrink-0">
                <ExternalLink size={16} />
              </div>
            </a>

          </div>
        </div>

        {/* Helpful Info Note */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-stone-600 text-xs sm:text-sm flex items-start gap-3">
            <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-stone-800">
                {isTh ? 'คำแนะนำในการติดตามพัสดุ' : 'Tracking Instructions'}
              </p>
              <p className="text-stone-600 text-xs mt-0.5 leading-relaxed">
                {isTh
                  ? 'ท่านสามารถนำเลขพัสดุ (Tracking No.) ที่ได้รับผ่านทางข้อความ SMS, LINE หรืออีเมลยืนยันคำสั่งซื้อ ไปตรวจสอบสถานะการจัดส่งแบบเรียลไทม์ได้ที่เว็บไซต์ของผู้ให้บริการขนส่งด้านบน'
                  : 'You can use the tracking number received via SMS, LINE, or your order confirmation email to check real-time delivery status on the carrier websites above.'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
