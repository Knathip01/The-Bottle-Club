'use client';

import { motion } from 'framer-motion';

interface DeliveryProgressProps {
  progress: number;
  lang?: 'th' | 'en';
}

export default function DeliveryProgress({ progress, lang = 'en' }: DeliveryProgressProps) {
  const percentage = Math.round(progress * 100);

  return (
    <div className="space-y-3.5 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-5 rounded-2xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold text-stone-400 dark:text-stone-500 uppercase tracking-widest leading-none block">
            {lang === 'th' ? 'ความคืบหน้าการจัดส่ง' : 'Transit Progress'}
          </span>
          <span className="text-xs font-bold text-stone-600 dark:text-stone-300 mt-1 block">
            {percentage >= 95 
              ? (lang === 'th' ? 'พัสดุถึงมือผู้รับเรียบร้อยแล้ว' : 'Package successfully delivered') 
              : percentage >= 75 
                ? (lang === 'th' ? 'พนักงานกำลังนำพัสดุส่งถึงคุณ' : 'Out for final delivery')
                : (lang === 'th' ? 'พัสดุอยู่ระหว่างเส้นทางจัดส่ง' : 'Package is in active transit')}
          </span>
        </div>
        <div className="text-right">
          <motion.span 
            key={percentage}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 tabular-nums leading-none"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>

      <div className="relative w-full h-3 bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden shadow-inner">
        {/* Traversed Cyan-Blue Gradient Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(3, percentage))}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-600 rounded-full relative"
        >
          {/* Glowing neon pulse reflection */}
          <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_infinite] rounded-full" />
          
          {/* Active head node pulse */}
          {percentage < 98 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full shadow-lg flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" />
            </div>
          )}
        </motion.div>
      </div>

      {/* Coordinate milestones ticks */}
      <div className="flex justify-between items-center text-[9px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest pt-1 px-1">
        <span>{lang === 'th' ? 'ต้นทาง' : 'Origin'}</span>
        <span>{lang === 'th' ? 'ศุลกากร / ศูนย์กระจาย' : 'Hubs & Customs'}</span>
        <span>{lang === 'th' ? 'ปลายทาง' : 'Destination'}</span>
      </div>
    </div>
  );
}
