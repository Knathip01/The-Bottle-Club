'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, RefreshCcw, Landmark, MapPin, Truck } from 'lucide-react';

interface ShipmentInfoCardProps {
  trackingId: string;
  carrier: string;
  insuranceStatus: string;
  customsStatus: 'cleared' | 'pending' | 'review' | 'none';
  deliveryAttempt: string;
  itemCount: number;
  origin: string;
  destination: string;
  lastUpdated: string;
  lang?: 'th' | 'en';
}

export default function ShipmentInfoCard({
  trackingId,
  carrier,
  insuranceStatus,
  customsStatus,
  deliveryAttempt,
  itemCount,
  origin,
  destination,
  lastUpdated,
  lang = 'en',
}: ShipmentInfoCardProps) {
  const getCustomsBadge = () => {
    const labels = {
      cleared: { th: 'ศุลกากรตรวจสอบแล้ว', en: 'Customs Cleared', color: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400' },
      pending: { th: 'รอด่านศุลกากรตรวจสอบ', en: 'Pending Customs', color: 'text-amber-600 bg-amber-500/10 dark:text-amber-400' },
      review: { th: 'ด่านศุลกากรตรวจเอกสาร', en: 'Customs In Review', color: 'text-red-600 bg-red-500/10 dark:text-red-400' },
      none: { th: 'ไม่ต้องผ่านศุลกากร (ในประเทศ)', en: 'No Customs (Domestic)', color: 'text-stone-500 bg-stone-500/10 dark:text-stone-400' },
    };
    const current = labels[customsStatus] || labels.none;
    return (
      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${current.color}`}>
        {lang === 'th' ? current.th : current.en}
      </span>
    );
  };

  const getCarrierIcon = () => {
    return <Truck className="text-sky-500 shrink-0" size={20} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Left side: Carrier and Core specs */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-sky-500/10 flex items-center justify-center border border-sky-500/15">
            {getCarrierIcon()}
          </div>
          <div>
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest leading-none block">
              {lang === 'th' ? 'ผู้ให้บริการขนส่ง' : 'Logistics Carrier'}
            </span>
            <span className="text-base font-black text-stone-900 dark:text-stone-50 mt-1 block">
              {carrier}
            </span>
          </div>
        </div>

        <div className="pt-2 grid grid-cols-2 gap-4">
          <div>
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
              {lang === 'th' ? 'รหัสพัสดุ' : 'Tracking ID'}
            </span>
            <span className="text-xs font-mono font-black text-stone-800 dark:text-stone-200 mt-1 block uppercase truncate">
              {trackingId}
            </span>
          </div>
          <div>
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest block">
              {lang === 'th' ? 'จำนวนสินค้า' : 'Total Items'}
            </span>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 mt-1 block">
              {itemCount} {lang === 'th' ? 'รายการสินค้า' : 'Premium Wine Bottles'}
            </span>
          </div>
        </div>

        <div className="pt-2 space-y-2.5">
          <div className="flex gap-2 items-start text-xs">
            <MapPin size={14} className="text-stone-400 shrink-0 mt-0.5" />
            <p className="text-stone-600 dark:text-stone-400 font-semibold truncate">
              <span className="font-extrabold text-stone-400 uppercase tracking-wide mr-1.5">{lang === 'th' ? 'ต้นทาง:' : 'Origin:'}</span>
              {origin}
            </p>
          </div>
          <div className="flex gap-2 items-start text-xs">
            <MapPin size={14} className="text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-stone-600 dark:text-stone-400 font-semibold truncate">
              <span className="font-extrabold text-stone-400 uppercase tracking-wide mr-1.5">{lang === 'th' ? 'ปลายทาง:' : 'Dest:'}</span>
              {destination}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Insurance, Customs and Attempts */}
      <div className="space-y-4.5 border-t md:border-t-0 md:border-l border-stone-200/40 dark:border-stone-800/40 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
              <Shield size={12} className="text-emerald-500" />
              <span>{lang === 'th' ? 'สถานะประกันภัย' : 'Shipment Insurance'}</span>
            </span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 text-right truncate">
              {insuranceStatus}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
              <Landmark size={12} className="text-violet-500" />
              <span>{lang === 'th' ? 'ด่านตรวจสอบศุลกากร' : 'Customs Clearance'}</span>
            </span>
            {getCustomsBadge()}
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-[9px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
              <FileText size={12} className="text-sky-500" />
              <span>{lang === 'th' ? 'รอบนำส่งสูงสุด' : 'Delivery Attempt'}</span>
            </span>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200 text-right truncate">
              {deliveryAttempt}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 text-[10px] text-stone-400 dark:text-stone-500 font-bold tracking-wider border-t border-stone-250/20 pt-3">
          <span className="flex items-center gap-1">
            <RefreshCcw size={10} className="animate-spin" />
            <span>LAST UPDATED</span>
          </span>
          <span className="font-mono">{lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
}
