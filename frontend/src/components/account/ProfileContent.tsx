'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { updateProfile } from '@/app/actions/auth';

interface ProfileContentProps {
  user: any;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const { t } = useLanguage();
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [gender, setGender] = useState('MALE');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      });

      if (res?.error) {
        setStatus({ type: 'error', message: res.error });
      } else {
        setStatus({ type: 'success', message: t('account.save_success') || 'บันทึกข้อมูลเรียบร้อยแล้ว' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold mb-10">{t('account.profile')}</h1>

      <section className="max-w-2xl">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-8 pb-2 border-b border-stone-100">{t('account.user_info')}</h3>
        
        {status && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.member_type')} *</label>
            <input 
              type="text" 
              value={user?.tier || 'CLASSIC LEVEL'}
              disabled
              className="w-full border border-stone-100 bg-stone-50 p-3 text-xs text-stone-500 font-bold focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.first_name')} *</label>
              <input 
                type="text" 
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-stone-200 p-3 text-xs focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.last_name')} *</label>
              <input 
                type="text" 
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-stone-200 p-3 text-xs focus:border-stone-900 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.phone')} *</label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="EX. 0801235588"
              className="w-full border border-stone-200 p-3 text-xs focus:border-stone-900 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.email')} *</label>
            <input 
              type="email" 
              value={user?.email || ''}
              disabled
              className="w-full border border-stone-100 bg-stone-50 p-3 text-xs text-stone-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-900 mb-2 uppercase tracking-wide">{t('account.gender')}</label>
            <div className="relative">
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-stone-200 p-3 text-xs bg-white appearance-none focus:border-stone-900 focus:outline-none transition-colors"
              >
                <option value="MALE">{t('account.gender_male')}</option>
                <option value="FEMALE">{t('account.gender_female')}</option>
                <option value="OTHER">{t('account.gender_other')}</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              disabled={loading}
              className="bg-black text-white px-16 py-3 text-xs font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {t('common.save')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
