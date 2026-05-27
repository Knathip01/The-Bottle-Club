'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewsContentProps {
  user: any;
}

export default function ReviewsContent({ user }: ReviewsContentProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <AccountSidebar user={user} activePath="/account/reviews" />

      <div className="flex-1">
        <h1 className="text-xl font-bold mb-10">{t('account.reviews_title')}</h1>

        <div className="bg-[#fff9e6] border border-[#ffeb99] p-4 flex items-center gap-3">
          <AlertCircle size={18} className="text-[#b38f00]" />
          <span className="text-xs font-bold text-[#665200]">{t('account.no_reviews')}</span>
        </div>
      </div>
    </div>
  );
}
