'use client';

import { motion } from 'framer-motion';
import { History, Globe, ArrowRight, CornerDownRight } from 'lucide-react';
import type { TrackingApiResponse } from '@/lib/tracking/shipments';

interface TrackingHistoryTableProps {
  history: TrackingApiResponse[];
  onSelect: (trackingNumber: string) => void;
  lang?: 'th' | 'en';
}

export default function TrackingHistoryTable({
  history,
  onSelect,
  lang = 'en',
}: TrackingHistoryTableProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm text-center">
        <History className="mx-auto text-stone-300 dark:text-stone-700 mb-3" size={28} />
        <p className="text-xs font-bold text-stone-500 dark:text-stone-400">
          {lang === 'th' ? 'ไม่มีประวัติการติดตามพัสดุล่าสุด' : 'No recent tracking history'}
        </p>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1">
          {lang === 'th' ? 'กรอกเลขพัสดุด้านบนเพื่อบันทึกประวัติการค้นหา' : 'Searched tracking numbers will appear here'}
        </p>
      </div>
    );
  }

  const getStatusLabel = (status: string) => {
    const map = {
      processing: { th: 'กำลังจัดเตรียม', en: 'Processing' },
      in_transit: { th: 'อยู่ระหว่างส่ง', en: 'In Transit' },
      customs: { th: 'ผ่านศุลกากร', en: 'Customs' },
      out_for_delivery: { th: 'กำลังนำจ่าย', en: 'Out for Delivery' },
      delivered: { th: 'ส่งสำเร็จ', en: 'Delivered' },
    };
    const current = map[status as keyof typeof map] || map.processing;
    return lang === 'th' ? current.th : current.en;
  };

  return (
    <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-6 rounded-3xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm transition-all duration-300 space-y-4">
      <h3 className="text-xs font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest flex items-center gap-2">
        <History size={14} className="text-stone-400" />
        <span>{lang === 'th' ? 'ประวัติการติดตามพัสดุล่าสุด' : 'Recent Tracking History'}</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200/30 dark:border-stone-800/40 pb-2 text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">
              <th className="pb-3 pl-1">{lang === 'th' ? 'เลขพัสดุ / ขนส่ง' : 'Tracking ID & Carrier'}</th>
              <th className="pb-3 hidden sm:table-cell">{lang === 'th' ? 'เส้นทางจัดส่ง' : 'Route Path'}</th>
              <th className="pb-3">{lang === 'th' ? 'สถานะปัจจุบัน' : 'Current Status'}</th>
              <th className="pb-3 text-right pr-1"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200/20 dark:divide-stone-800/20">
            {history.map((item, index) => (
              <motion.tr
                key={`${item.tracking_number}-${index}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group hover:bg-stone-50/50 dark:hover:bg-stone-850/30 transition-all duration-200 cursor-pointer"
                onClick={() => onSelect(item.tracking_number)}
              >
                {/* Tracking ID & Carrier */}
                <td className="py-3.5 pl-1">
                  <span className="text-xs font-black font-mono text-stone-800 dark:text-stone-200 uppercase block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.tracking_number}
                  </span>
                  <span className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block mt-0.5">
                    {item.carrier.name_en}
                  </span>
                </td>

                {/* Route */}
                <td className="py-3.5 hidden sm:table-cell">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-600 dark:text-stone-300">
                    <span className="truncate max-w-[100px]">{item.origin.name_en.split(' ')[0]}</span>
                    <ArrowRight size={10} className="text-stone-400 shrink-0" />
                    <span className="truncate max-w-[100px]">{item.destination.name_en.split(' ')[0] || 'BANGKOK'}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      item.status === 'delivered'
                        ? 'bg-green-500'
                        : item.status === 'out_for_delivery'
                          ? 'bg-emerald-500'
                          : item.status === 'customs'
                            ? 'bg-violet-500'
                            : item.status === 'in_transit'
                              ? 'bg-sky-500'
                              : 'bg-amber-500'
                    }`} />
                    <span className="text-xs font-black text-stone-800 dark:text-stone-250 leading-none">
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                </td>

                {/* Reload action trigger */}
                <td className="py-3.5 text-right pr-1">
                  <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1">
                    <span>TRACK</span>
                    <CornerDownRight size={10} />
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
