'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Package, ArrowRight, AlertCircle } from 'lucide-react';

interface ConfirmPaymentListContentProps {
  orders: any[];
}

export default function ConfirmPaymentListContent({ orders }: ConfirmPaymentListContentProps) {
  const { t, language } = useLanguage();

  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold mb-8 uppercase tracking-tight">
        {t('account.payment_confirm') || 'Confirm Payment'}
      </h1>
      
      <div className="bg-white border border-stone-200 shadow-sm rounded-sm p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-[#a11a1a]/10 text-[#a11a1a] p-3 rounded-full">
            <CreditCard size={24} />
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-2">
              {t('checkout.upload_slip') || 'Upload Payment Receipt'}
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('checkout.confirm_payment_listing_desc') || 
                'Please select an order from the list below to upload your transfer slip and confirm your payment. Our staff will verify your payment and update your order status within 24 hours.'}
            </p>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-stone-200 p-12 text-center rounded-sm">
          <Package size={48} className="text-stone-200 mx-auto mb-6" />
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-2">
            {t('checkout.no_pending_payments') || 'No Pending Payments'}
          </h3>
          <p className="text-[11px] text-stone-400 uppercase tracking-wider mb-8">
            {t('checkout.confirm_payment_listing_no_pending_desc') || "You don't have any orders waiting for payment confirmation."}
          </p>
          <Link 
            href="/account/orders" 
            className="inline-flex items-center gap-2 text-[10px] font-bold text-stone-900 uppercase tracking-widest border-b-2 border-stone-900 pb-1 hover:text-[#a11a1a] hover:border-[#a11a1a] transition-all"
          >
            {t('checkout.view_all_orders') || 'View All Orders'} <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <Link 
              key={order.id} 
              href={`/confirm-payment/${order.id}`}
              className="group bg-white border border-stone-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-[#a11a1a] hover:shadow-md transition-all duration-300 rounded-sm"
            >
              <div className="flex items-center gap-5">
                <div className="bg-stone-50 p-4 border border-stone-100 group-hover:bg-[#a11a1a]/5 group-hover:border-[#a11a1a]/10 transition-colors">
                  <Package size={24} className="text-stone-400 group-hover:text-[#a11a1a]" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-sm text-stone-900 uppercase tracking-tight">
                      {t('order.number') || 'Order'} #{order.id}
                    </h3>
                    <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest border border-amber-100">
                      {t('checkout.waiting_for_payment') || 'Waiting for Payment'}
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                    {t('checkout.placed_on') || 'Placed on'} {new Date(order.created_at).toLocaleDateString(language, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-10 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0">
                <div className="text-right">
                  <p className="text-[9px] text-stone-400 uppercase font-bold mb-1 tracking-widest">
                    {t('checkout.total_amount') || 'Total Amount'}
                  </p>
                  <p className="font-bold text-lg text-[#a11a1a]">฿{Number(order.total_price || 0).toLocaleString()}</p>
                </div>
                <div className="bg-[#a11a1a] text-white p-2 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 bg-stone-900 text-white p-8 rounded-sm">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle size={18} className="text-amber-400" />
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]">
            {t('checkout.important_information') || 'Important Information'}
          </h4>
        </div>
        <ul className="space-y-3 text-[10px] text-stone-400 uppercase tracking-widest leading-loose">
          <li>• {t('checkout.important_rule1') || 'Payment must be made within 24 hours of placing your order.'}</li>
          <li>• {t('checkout.important_rule2') || 'Please ensure the receipt image is clear and includes the transaction ID.'}</li>
          <li>• {t('checkout.important_rule3') || 'For PromptPay, the system may take up to 10 minutes to auto-verify.'}</li>
          <li>• {t('checkout.important_rule4') || 'Orders without payment confirmation will be automatically cancelled.'}</li>
        </ul>
      </div>
    </div>
  );
}
