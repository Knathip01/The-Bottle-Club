'use client';

import { useLanguage } from '@/context/LanguageContext';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface LoyaltyTx {
  id?: number | string;
  transaction_type?: string;
  points?: number;
  notes?: string | null;
  created_at?: string;
  expires_at?: string | null;
}

interface RewardPointsContentProps {
  user?: {
    id?: string | number | null;
    points?: number | null;
    loyalty_points?: number | null;
    loyalty_points_balance?: number | null;
    loyalty_transactions?: LoyaltyTx[];
  };
}

export default function RewardPointsContent({ user }: RewardPointsContentProps) {
  const { t, language } = useLanguage();
  const currentPoints = Number(user?.points ?? user?.loyalty_points ?? user?.loyalty_points_balance ?? 0);
  const transactions = user?.loyalty_transactions || [];

  return (
    <div className="flex-1">
      <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-8">
        {t('common.home')} / {t('account.title').toUpperCase()}
      </div>

      <h1 className="text-xl font-bold mb-10">{t('account.points_title')}</h1>

      {/* Points Summary Header */}
      <div className="relative bg-gradient-to-r from-[#a11a1a] via-[#851515] to-[#450a0a] rounded-3xl p-10 text-white mb-12 flex flex-col items-center justify-center overflow-hidden shadow-xl shadow-stone-900/10">
        <div className="text-center z-10">
          <span className="text-5xl font-black block mb-1 tracking-tight">{currentPoints.toLocaleString()}</span>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">{t('account.points_available')} (PTS)</span>
        </div>
        
        {/* Decorative logo on the right */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20 hidden md:block">
          <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-2xl font-serif italic">
            wn
          </div>
        </div>
      </div>

      {/* Info Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mb-16">
        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-6 border-b border-stone-100 pb-2">{t('account.points_earn_title')}</h3>
          <div className="text-xs text-stone-600 leading-relaxed space-y-4">
            <p>{t('account.points_earn_desc')}</p>
            <p className="font-bold text-stone-800 italic">{t('account.points_earn_rate')}</p>
          </div>
        </section>

        <section>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-6 border-b border-stone-100 pb-2">{t('account.points_spend_title')}</h3>
          <div className="text-xs text-stone-600 leading-relaxed space-y-4">
            <p>{t('account.points_spend_desc')}</p>
            <p className="font-bold text-stone-800 italic">{t('account.points_spend_rate')}</p>
          </div>
        </section>

        <section className="md:col-span-2 bg-stone-50/50 p-8 border border-stone-100">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-6">{t('account.points_manage_title')}</h3>
          <ul className="text-xs text-stone-500 space-y-4 list-disc pl-4">
            <li>{t('account.points_manage_rule1')}</li>
            <li>{t('account.points_manage_rule2')}</li>
            <li>{t('account.points_manage_rule3')}</li>
            <li>{t('account.points_manage_rule4')}</li>
          </ul>
          <div className="mt-6 p-4 bg-white border border-stone-200 text-[10px] text-stone-400 italic">
            {t('account.points_example')}
          </div>
        </section>
      </div>

      {/* Transaction History */}
      <section>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-6 pb-2 border-b border-stone-100">{t('account.points_history_title')}</h3>
        {transactions && transactions.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="divide-y divide-stone-100">
              {transactions.map((tx, idx) => {
                const isEarn = tx.transaction_type === 'earn';
                const createdDate = tx.created_at ? new Date(tx.created_at).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                }) : '-';
                return (
                  <div key={tx.id || idx} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isEarn ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {isEarn ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-stone-800">
                          {tx.notes || (isEarn ? (language === 'th' ? 'ได้รับคะแนนสะสม' : 'Points Earned') : (language === 'th' ? 'แลกใช้คะแนน' : 'Points Redeemed'))}
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{createdDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-black ${isEarn ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {isEarn ? `+${Math.abs(Number(tx.points || 0)).toLocaleString()}` : `-${Math.abs(Number(tx.points || 0)).toLocaleString()}`} PTS
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-stone-400 py-4 italic">
            {t('account.points_no_history')}
          </div>
        )}
      </section>
    </div>
  );
}
