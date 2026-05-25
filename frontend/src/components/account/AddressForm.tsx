'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AddressFormProps {
  user: any;
}

export default function AddressForm({ user }: AddressFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    phone: '',
    company: '',
    address: '',
    country: 'ไทย',
    province: '',
    district: '',
    subDistrict: '',
    zipcode: '',
    isDefaultShipping: true,
    isDefaultBilling: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/proxy/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          address_line: formData.address,
          country: formData.country,
          province: formData.province,
          district: formData.district,
          subdistrict: formData.subDistrict,
          postal_code: formData.zipcode,
          is_default_shipping: formData.isDefaultShipping,
          is_default_billing: formData.isDefaultBilling
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      alert(t('account.save_success'));
      window.location.href = '/account';
    } catch (error) {
      console.error('Error saving address:', error);
      alert(t('account.save_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      {/* User Info Column */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-8">{t('account.user_info')}</h3>
        
        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.first_name')} *</label>
          <input 
            type="text" 
            required
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.last_name')} *</label>
          <input 
            type="text" 
            required
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.phone')} *</label>
          <input 
            type="tel" 
            required
            placeholder={t('account.phone')}
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.company')}</label>
          <input 
            type="text" 
            placeholder={t('account.company')}
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>
      </div>

      {/* Address Column */}
      <div className="space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-8">{t('account.address_title')}</h3>
        
        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.address_label')} *</label>
          <input 
            type="text" 
            required
            placeholder="Address Line 1"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.country')} *</label>
          <div className="relative">
            <select className="w-full border border-stone-200 p-3 text-xs focus:outline-none bg-white appearance-none transition-colors">
              <option>{t('account.country_thailand')}</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.province')} *</label>
          <input 
            type="text" 
            required
            placeholder={t('account.province')}
            value={formData.province}
            onChange={(e) => setFormData({...formData, province: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.district')} *</label>
          <input 
            type="text" 
            required
            placeholder={t('account.district')}
            value={formData.district}
            onChange={(e) => setFormData({...formData, district: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.sub_district')} *</label>
          <input 
            type="text" 
            required
            placeholder={t('account.sub_district')}
            value={formData.subDistrict}
            onChange={(e) => setFormData({...formData, subDistrict: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-900 mb-2">{t('account.zipcode')} *</label>
          <input 
            type="text" 
            required
            placeholder={t('account.zipcode')}
            value={formData.zipcode}
            onChange={(e) => setFormData({...formData, zipcode: e.target.value})}
            className="w-full border border-stone-200 p-3 text-xs focus:outline-none focus:border-stone-900 transition-colors"
          />
        </div>
      </div>

      {/* Checkboxes and Submit button */}
      <div className="md:col-start-2 space-y-6">
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={formData.isDefaultShipping}
              onChange={(e) => setFormData({...formData, isDefaultShipping: e.target.checked})}
              className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-stone-900" 
            />
            <span className="text-[11px] font-bold text-stone-700">{t('account.use_shipping')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={formData.isDefaultBilling}
              onChange={(e) => setFormData({...formData, isDefaultBilling: e.target.checked})}
              className="w-4 h-4 border-stone-300 rounded focus:ring-0 accent-stone-900" 
            />
            <span className="text-[11px] font-bold text-stone-700">{t('account.use_billing')}</span>
          </label>
        </div>
      </div>

      <div className="md:col-span-2 flex justify-center mt-10">
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`bg-black text-white px-12 py-4 text-xs font-bold uppercase hover:bg-stone-800 transition-colors tracking-widest ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? t('account.saving') : t('account.save_address')}
        </button>
      </div>
    </form>
  );
}
