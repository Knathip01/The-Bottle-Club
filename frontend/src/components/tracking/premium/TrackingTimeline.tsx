'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, Loader2 } from 'lucide-react';

interface TimelineStep {
  key: string;
  time: string;
  completed: boolean;
  active: boolean;
}

interface TrackingTimelineProps {
  timeline: TimelineStep[];
  lang?: 'th' | 'en';
}

export default function TrackingTimeline({ timeline, lang = 'en' }: TrackingTimelineProps) {
  // Predefined translation mappings for all 9 key states
  const translations: Record<string, { th: string; en: string }> = {
    'tracking.status.order_received': {
      th: 'ได้รับคำสั่งซื้อแล้ว',
      en: 'Order Received',
    },
    'tracking.status.processing': {
      th: 'กำลังจัดเตรียมและบรรจุสินค้า',
      en: 'Processing & Packing',
    },
    'tracking.status.in_warehouse': {
      th: 'สินค้าจัดเก็บในคลังสินค้าควบคุมอุณหภูมิ 16°C',
      en: 'Stored in Staged Cold-Chain Warehouse',
    },
    'tracking.status.departed_origin': {
      th: 'พัสดุออกจากศูนย์กระจายสินค้าต้นทาง',
      en: 'Departed Origin Facility',
    },
    'tracking.status.customs_clearance': {
      th: 'ผ่านด่านการตรวจสอบศุลกากรระหว่างประเทศ',
      en: 'International Customs Clearance Cleared',
    },
    'tracking.status.in_transit': {
      th: 'อยู่ระหว่างการขนส่ง (ทางเรือ/ทางอากาศ)',
      en: 'In Transit (Sea/Air Freight)',
    },
    'tracking.status.arrived_dest': {
      th: 'พัสดุถึงศูนย์คัดแยกประเทศปลายทางแล้ว',
      en: 'Arrived at Destination Distribution Hub',
    },
    'tracking.status.out_for_delivery': {
      th: 'พนักงานขับรถกำลังเดินทางนำพัสดุส่งให้คุณ',
      en: 'Out for Final Delivery',
    },
    'tracking.status.delivered': {
      th: 'สินค้าจัดส่งและลงลายมือชื่อรับเรียบร้อย',
      en: 'Successfully Delivered & Signed',
    },
  };

  const getLabel = (key: string) => {
    // Check direct match
    if (translations[key]) {
      return lang === 'th' ? translations[key].th : translations[key].en;
    }
    // Check fallback for short status labels
    const shortKey = `tracking.status.${key}`;
    if (translations[shortKey]) {
      return lang === 'th' ? translations[shortKey].th : translations[shortKey].en;
    }
    // Default text fallback
    return key.replace('tracking.', '').replace('status.', '').toUpperCase();
  };

  return (
    <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm transition-all duration-300">
      <h3 className="text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-6 flex items-center gap-2">
        <Clock size={14} className="text-stone-400" />
        <span>{lang === 'th' ? 'ประวัติสถานะพัสดุแบบละเอียด' : 'Detailed Status History'}</span>
      </h3>

      <div className="relative space-y-6 pl-2 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-100 dark:before:bg-stone-800 transition-all duration-300">
        {timeline.map((step, index) => {
          const label = getLabel(step.key);
          const displayTime = step.time === 'tracking.live' || step.time === '—'
            ? (step.completed || step.active ? (lang === 'th' ? 'กำลังอัปเดตแบบเรียลไทม์' : 'Updating Live') : '—')
            : step.time;

          return (
            <motion.div
              key={`${step.key}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex gap-4 items-start"
            >
              {/* Dot Icon Indicator */}
              <div className="relative shrink-0 z-10">
                {step.completed ? (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-stone-950">
                    <CheckCircle2 size={13} className="stroke-white" strokeWidth={3} />
                  </div>
                ) : step.active ? (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-stone-950 animate-pulse">
                    <Loader2 size={11} className="animate-spin text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-stone-50 dark:bg-stone-900 text-stone-300 dark:text-stone-700 flex items-center justify-center border-2 border-stone-200 dark:border-stone-800">
                    <Circle size={10} className="fill-current text-stone-200 dark:text-stone-800" />
                  </div>
                )}

                {/* Animated active beacon halo */}
                {step.active && (
                  <span className="absolute -inset-1 rounded-full border border-indigo-500/40 animate-ping opacity-60" />
                )}
              </div>

              {/* Text Description */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p 
                  className={`text-sm font-extrabold tracking-tight ${
                    step.active 
                      ? 'text-indigo-600 dark:text-indigo-400 font-black' 
                      : step.completed 
                        ? 'text-stone-800 dark:text-stone-200' 
                        : 'text-stone-400 dark:text-stone-600'
                  }`}
                >
                  {label}
                </p>
                <p 
                  className={`text-xs font-semibold mt-1 tracking-wide uppercase ${
                    step.active
                      ? 'text-indigo-500/80 dark:text-indigo-500/90 font-bold'
                      : 'text-stone-400 dark:text-stone-500'
                  }`}
                >
                  {displayTime}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
