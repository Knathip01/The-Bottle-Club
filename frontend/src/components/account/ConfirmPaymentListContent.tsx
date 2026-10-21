'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { CreditCard, Package, ArrowRight, AlertCircle, Eye, CheckCircle2, Clock, X, ExternalLink } from 'lucide-react';

interface ConfirmPaymentListContentProps {
  orders: any[];
}

export default function ConfirmPaymentListContent({ orders }: ConfirmPaymentListContentProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [selectedSlipOrder, setSelectedSlipOrder] = useState<any | null>(null);

  const pendingOrders = orders.filter(
    (o) => o.status === 'pending' || o.status === 'unfulfilled' || (o.slip?.status === 'pending' && o.status !== 'completed' && o.status !== 'paid')
  );

  const approvedOrders = orders.filter(
    (o) => o.status === 'paid' || o.status === 'completed' || o.status === 'confirmed' || o.slip?.status === 'approved'
  );

  const displayOrders = activeTab === 'pending' ? pendingOrders : approvedOrders;

  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold mb-8 uppercase tracking-tight">
        {t('account.payment_confirm') || 'Confirm Payment'}
      </h1>
      
      <div className="bg-white border border-stone-200 shadow-sm rounded-sm p-8 mb-6">
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

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-200 mt-6 gap-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
              activeTab === 'pending'
                ? 'text-[#a11a1a] border-b-2 border-[#a11a1a]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {language === 'th' ? 'รอแจ้งชำระ / รอตรวจสอบ' : 'Pending Verification'} ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors relative cursor-pointer ${
              activeTab === 'approved'
                ? 'text-[#a11a1a] border-b-2 border-[#a11a1a]'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {language === 'th' ? 'อนุมัติแล้ว (ดูสลิปเก่า)' : 'Approved & Verified'} ({approvedOrders.length})
          </button>
        </div>
      </div>

      {displayOrders.length === 0 ? (
        <div className="bg-white border border-stone-200 p-12 text-center rounded-sm">
          <Package size={48} className="text-stone-200 mx-auto mb-6" />
          <h3 className="text-sm font-bold text-stone-900 uppercase tracking-widest mb-2">
            {activeTab === 'pending'
              ? (t('checkout.no_pending_payments') || 'No Pending Payments')
              : (language === 'th' ? 'ไม่มีรายการชำระเงินที่อนุมัติแล้ว' : 'No Approved Payments')}
          </h3>
          <p className="text-[11px] text-stone-400 uppercase tracking-wider mb-8">
            {activeTab === 'pending'
              ? (t('checkout.confirm_payment_listing_no_pending_desc') || "You don't have any orders waiting for payment confirmation.")
              : (language === 'th' ? 'ยังไม่มีประวัติการอนุมัติการชำระเงินในระบบ' : 'No approved payment history found.')}
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
          {displayOrders.map((order) => {
            const hasSlip = Boolean(order.slip?.slip_url);
            const isApproved = order.status === 'paid' || order.status === 'completed' || order.status === 'confirmed' || order.slip?.status === 'approved';

            return (
              <div 
                key={order.id} 
                className="group bg-white border border-stone-200 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-[#a11a1a] hover:shadow-md transition-all duration-300 rounded-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="bg-stone-50 p-4 border border-stone-100 group-hover:bg-[#a11a1a]/5 group-hover:border-[#a11a1a]/10 transition-colors">
                    <Package size={24} className="text-stone-400 group-hover:text-[#a11a1a]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                      <h3 className="font-bold text-sm text-stone-900 uppercase tracking-tight">
                        {t('order.number') || 'Order'} #{order.id}
                      </h3>

                      {isApproved ? (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-emerald-600" />
                          {language === 'th' ? 'อนุมัติการชำระเงินแล้ว' : 'Payment Approved'}
                        </span>
                      ) : hasSlip ? (
                        <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-sky-200 flex items-center gap-1">
                          <Clock size={12} className="text-sky-600" />
                          {language === 'th' ? 'แนบสลิปแล้ว (รอตรวจสอบ)' : 'Slip Attached (Reviewing)'}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border border-amber-200">
                          {t('checkout.waiting_for_payment') || 'Waiting for Payment'}
                        </span>
                      )}
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

                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 mt-4 sm:mt-0 flex-wrap">
                  <div className="text-left sm:text-right">
                    <p className="text-[9px] text-stone-400 uppercase font-bold mb-1 tracking-widest">
                      {t('checkout.total_amount') || 'Total Amount'}
                    </p>
                    <p className="font-bold text-lg text-[#a11a1a]">฿{Number(order.total_price || 0).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasSlip && (
                      <button
                        type="button"
                        onClick={() => setSelectedSlipOrder(order)}
                        className="px-3.5 py-2 text-xs font-bold border border-stone-300 text-stone-700 rounded-sm hover:border-[#a11a1a] hover:text-[#a11a1a] transition-all flex items-center gap-1.5 cursor-pointer bg-white"
                        title="ดูสลิปที่แนบไว้"
                      >
                        <Eye size={14} />
                        <span>{language === 'th' ? 'ดูสลิปที่แนบ' : 'View Slip'}</span>
                      </button>
                    )}

                    <Link
                      href={`/confirm-payment/${order.id}`}
                      className="bg-[#a11a1a] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#8b1515] transition-colors flex items-center gap-1.5"
                    >
                      <span>{hasSlip ? (language === 'th' ? 'ดูรายละเอียด' : 'Details') : (language === 'th' ? 'แจ้งชำระเงิน' : 'Pay Now')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Slip Preview Modal */}
      {selectedSlipOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setSelectedSlipOrder(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4 border-b border-stone-100 pb-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">
                  {language === 'th' ? 'สลิปการโอนเงิน' : 'Payment Slip'} #{selectedSlipOrder.id}
                </h3>
                <p className="text-xs text-stone-400">
                  {selectedSlipOrder.slip?.uploaded_at
                    ? `${language === 'th' ? 'อัปโหลดเมื่อ' : 'Uploaded on'} ${new Date(selectedSlipOrder.slip.uploaded_at).toLocaleDateString(language === 'th' ? 'th-TH' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : ''}
                </p>
              </div>
            </div>

            <div className="my-4 relative aspect-[3/4] max-w-[340px] mx-auto overflow-hidden rounded-lg border border-stone-200 bg-stone-50 shadow-inner">
              <img
                src={selectedSlipOrder.slip?.slip_url}
                alt={`Slip #${selectedSlipOrder.id}`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="bg-stone-50 p-4 rounded-lg space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">{language === 'th' ? 'สถานะการตรวจสอบ:' : 'Verification Status:'}</span>
                <span className="font-bold text-stone-900">
                  {selectedSlipOrder.status === 'paid' || selectedSlipOrder.status === 'completed' || selectedSlipOrder.status === 'confirmed' || selectedSlipOrder.slip?.status === 'approved'
                    ? (language === 'th' ? 'อนุมัติเรียบร้อยแล้ว' : 'Approved')
                    : (language === 'th' ? 'รอเจ้าหน้าที่ตรวจสอบ' : 'Under Review')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500 font-medium">{language === 'th' ? 'ยอดที่ต้องชำระ:' : 'Total Amount:'}</span>
                <span className="font-bold text-[#a11a1a]">
                  ฿{Number(selectedSlipOrder.total_price || 0).toLocaleString()}
                </span>
              </div>
              {selectedSlipOrder.slip?.admin_note && (
                <div className="pt-2 border-t border-stone-200 text-stone-600">
                  <span className="font-bold">{language === 'th' ? 'บันทึกจากแอดมิน: ' : 'Admin Note: '}</span>
                  {selectedSlipOrder.slip.admin_note}
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href={selectedSlipOrder.slip?.slip_url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 text-center text-xs font-bold border border-stone-300 rounded-sm text-stone-700 hover:border-[#a11a1a] hover:text-[#a11a1a] transition flex items-center justify-center gap-1.5"
              >
                <ExternalLink size={14} />
                <span>{language === 'th' ? 'เปิดดูรูปเต็ม' : 'View Full Image'}</span>
              </a>
              <button
                onClick={() => setSelectedSlipOrder(null)}
                className="flex-1 py-2.5 bg-stone-900 text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-stone-800 transition cursor-pointer"
              >
                {language === 'th' ? 'ปิด' : 'Close'}
              </button>
            </div>
          </div>
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
