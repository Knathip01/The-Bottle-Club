'use client';

import AccountSidebar from '@/components/account/AccountSidebar';
import AddressForm from '@/components/account/AddressForm';
import { useLanguage } from '@/context/LanguageContext';

interface AddressesContentProps {
  user: any;
}

export default function AddressesContent({ user }: AddressesContentProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <AccountSidebar user={user} activePath="/account/addresses" />

      {/* Main Content */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-10">{t('account.add_new_address')}</h1>

        <AddressForm user={user} />
      </div>
    </div>
  );
}
