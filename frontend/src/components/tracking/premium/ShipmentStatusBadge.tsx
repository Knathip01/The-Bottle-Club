'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, Plane, Compass } from 'lucide-react';

interface ShipmentStatusBadgeProps {
  status: 'processing' | 'in_transit' | 'customs' | 'out_for_delivery' | 'delivered';
  lang?: 'th' | 'en';
}

export default function ShipmentStatusBadge({ status, lang = 'en' }: ShipmentStatusBadgeProps) {
  const configs = {
    processing: {
      textTh: 'กำลังเตรียมสินค้า',
      textEn: 'Processing',
      colorClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20 dark:bg-amber-400/5 dark:text-amber-300 dark:border-amber-400/20',
      icon: Clock,
      pulseColor: 'bg-amber-500 dark:bg-amber-300',
    },
    in_transit: {
      textTh: 'อยู่ระหว่างจัดส่ง',
      textEn: 'In Transit',
      colorClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20 dark:bg-sky-400/5 dark:text-sky-300 dark:border-sky-400/20',
      icon: Plane,
      pulseColor: 'bg-sky-500 dark:bg-sky-300',
    },
    customs: {
      textTh: 'ผ่านศุลกากร',
      textEn: 'Customs Clearance',
      colorClass: 'bg-violet-500/10 text-violet-500 border-violet-500/20 dark:bg-violet-400/5 dark:text-violet-300 dark:border-violet-400/20',
      icon: Compass,
      pulseColor: 'bg-violet-500 dark:bg-violet-300',
    },
    out_for_delivery: {
      textTh: 'กำลังนำส่งให้คุณ',
      textEn: 'Out for Delivery',
      colorClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 dark:bg-emerald-400/5 dark:text-emerald-300 dark:border-emerald-400/20',
      icon: Truck,
      pulseColor: 'bg-emerald-500 dark:bg-emerald-300',
    },
    delivered: {
      textTh: 'จัดส่งสำเร็จ',
      textEn: 'Delivered',
      colorClass: 'bg-green-600/15 text-green-600 border-green-500/20 dark:bg-green-500/10 dark:text-green-400 dark:border-green-400/25',
      icon: ShieldCheck,
      pulseColor: 'bg-green-500 dark:bg-green-400',
    },
  };

  const config = configs[status] || configs.processing;
  const Icon = config.icon;
  const text = lang === 'th' ? config.textTh : config.textEn;

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2.5 px-4.5 py-2 border rounded-full text-xs font-black uppercase tracking-widest shadow-sm backdrop-blur transition-all duration-300 ${config.colorClass}`}
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {status !== 'delivered' && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.pulseColor}`} />
        )}
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${config.pulseColor}`} />
      </span>
      <Icon size={14} className="shrink-0" />
      <span className="leading-none">{text}</span>
    </motion.span>
  );
}
