'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Package, ShoppingBag, ArrowRight } from 'lucide-react';

interface OrdersContentProps {
  initialOrders: any[];
  addresses?: any[];
}

export default function OrdersContent({ initialOrders, addresses = [] }: OrdersContentProps) {
  const { t, language } = useLanguage();
  const [expandedOrders, setExpandedOrders] = useState<number[]>([]);

  const toggleOrder = (orderId: number) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId) 
        : [...prev, orderId]
    );
  };

  const formatAddress = (order: any) => {
    const savedAddress = addresses.find(a => a.id === order.address_id);
    if (savedAddress) {
      const parts = [
        savedAddress.first_name || savedAddress.firstName,
        savedAddress.last_name || savedAddress.lastName,
        savedAddress.phone ? `(${savedAddress.phone})` : '',
        savedAddress.address_line || savedAddress.address,
        savedAddress.subdistrict,
        savedAddress.district,
        savedAddress.province,
        savedAddress.postal_code || savedAddress.zipcode,
        savedAddress.country
      ].filter(Boolean);
      return parts.join(' ');
    }
    return order.address_id ? `${t('order.address_id')} #${order.address_id}` : t('order.no_address');
  };

  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold mb-8 uppercase tracking-tight">{t('account.orders')}</h1>

      <div className="space-y-6">
        {initialOrders.length === 0 ? (
          <div className="bg-white border border-stone-200 p-8 text-center shadow-sm">
            <div className="bg-[#fcf8e3] text-[#8a6d3b] p-4 text-sm inline-flex items-center gap-3 border border-[#faebcc] mx-auto">
              <span className="font-bold text-lg">⚠</span> {t('account.no_orders')}
            </div>
          </div>
        ) : (
          initialOrders.map((order: any) => (
            <div key={order.id} className="bg-white border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-stone-900 text-white p-2.5">
                      <Package size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wide">{t('order.number')} #{order.id}</h3>
                      <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-0.5">
                        {new Date(order.created_at).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-4 py-1.5 font-bold uppercase tracking-widest ${
                      order.status === 'completed' ? 'bg-green-50 text-green-700 border border-green-100' : 
                      order.status === 'pending' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 
                      'bg-stone-50 text-stone-600 border border-stone-100'
                    }`}>
                      {t(`order.status_${order.status}`) || order.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center border-t border-stone-100 pt-6">
                  <div>
                    <p className="text-stone-400 text-[9px] uppercase font-bold mb-1.5 tracking-[0.15em]">{t('order.total')}</p>
                    <p className="font-bold text-stone-900 text-lg">฿{order.total_price?.toLocaleString() || 0}</p>
                  </div>
                  <div>
                    <p className="text-stone-400 text-[9px] uppercase font-bold mb-1.5 tracking-[0.15em]">{t('order.payment')}</p>
                    <p className="font-bold text-stone-700 text-xs uppercase tracking-tight">{order.payment_method}</p>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-stone-400 text-[9px] uppercase font-bold mb-1.5 tracking-[0.15em]">{language === 'th' ? 'วิธีจัดส่ง' : 'SHIPPING'}</p>
                    <p className="font-bold text-stone-700 text-xs uppercase tracking-tight">{order.shipping_method || 'Standard'}</p>
                  </div>
                  <div className="flex justify-end gap-4 items-center">
                    {order.status === 'pending' && (
                      <Link
                        href={`/confirm-payment/${order.id}`}
                        className="text-[10px] font-bold text-[#a11a1a] border border-[#a11a1a] px-3 py-1 hover:bg-[#a11a1a] hover:text-white transition-all uppercase tracking-widest hidden sm:block"
                      >
                        {language === 'th' ? 'ยืนยันการชำระเงิน' : 'CONFIRM PAYMENT'}
                      </Link>
                    )}
                    <button 
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="text-[11px] font-bold text-stone-900 border-b-2 border-stone-900 pb-0.5 hover:text-[#a11a1a] hover:border-[#a11a1a] transition-all uppercase tracking-widest"
                    >
                      {expandedOrders.includes(order.id) ? t('order.hide_details') : t('order.details')}
                    </button>
                  </div>
                </div>
              </div>

              {expandedOrders.includes(order.id) && (
                <div className="bg-[#fcfcfc] border-t border-stone-100 p-8 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <h4 className="text-[11px] font-bold text-stone-900 uppercase mb-6 tracking-widest border-b border-stone-200 pb-2">{t('order.items')}</h4>
                      <div className="space-y-4">
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-xs pb-4 border-b border-stone-50 last:border-0">
                            <div className="flex-1">
                              <p className="font-bold text-stone-800 uppercase tracking-tight">{item.name}</p>
                              <p className="text-stone-400 text-[10px] mt-1">QTY: {item.quantity} × ฿{Number(item.price).toLocaleString()}</p>
                            </div>
                            <span className="font-bold text-stone-900">฿{(item.quantity * item.price).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-[11px] font-bold text-stone-900 uppercase mb-4 tracking-widest border-b border-stone-200 pb-2">{t('checkout.shipping_address')}</h4>
                          <p className="text-[11px] text-stone-600 leading-relaxed uppercase tracking-tight">
                            {formatAddress(order)}
                          </p>
                        </div>
                        {order.is_full_tax_invoice && (
                          <div>
                            <h4 className="text-[11px] font-bold text-stone-900 uppercase mb-4 tracking-widest border-b border-stone-200 pb-2">{language === 'th' ? 'ข้อมูลใบกำกับภาษี' : 'TAX INVOICE INFO'}</h4>
                            <div className="space-y-1 text-[11px] text-stone-600 uppercase tracking-tight">
                              <p><span className="font-bold">{language === 'th' ? 'เลขที่ภาษี:' : 'TAX ID:'}</span> {order.tax_id}</p>
                              <p><span className="font-bold">{language === 'th' ? 'ชื่อ:' : 'NAME:'}</span> {order.tax_business_name}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-stone-50 p-6 border border-stone-100">
                      <h4 className="text-[11px] font-bold text-stone-900 uppercase mb-6 tracking-widest">{t('checkout.order_summary')}</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-stone-500 font-medium uppercase">{t('checkout.subtotal')}</span>
                          <span className="font-bold text-stone-900">฿{Number(order.subtotal_amount || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-stone-500 font-medium uppercase">{language === 'th' ? 'ค่าจัดส่ง' : 'SHIPPING FEE'}</span>
                          <span className="font-bold text-stone-900">
                            {Number(order.shipping_fee) === 0 ? 'FREE' : `฿${Number(order.shipping_fee).toLocaleString()}`}
                          </span>
                        </div>
                        <div className="pt-4 border-t border-stone-200 flex justify-between items-center">
                          <span className="text-[11px] font-bold uppercase tracking-widest">{t('checkout.total')}</span>
                          <span className="text-base font-bold text-[#a11a1a]">฿{Number(order.total_amount || 0).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      {order.status === 'pending' && (
                        <div className="mt-8">
                          <Link
                            href={`/confirm-payment/${order.id}`}
                            className="w-full flex items-center justify-center gap-2 bg-[#a11a1a] text-white px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#801414] transition-all"
                          >
                            <ArrowRight size={14} />
                            {language === 'th' ? 'ไปหน้าแจ้งชำระเงิน' : 'GO TO PAYMENT CONFIRMATION'}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
