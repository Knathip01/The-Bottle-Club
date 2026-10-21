'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { ordersApi, PublicTrackingResponse } from '@/lib/api-client';
import {
  ExternalLink,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  Calendar,
} from 'lucide-react';

export default function TrackingContent() {
  const { language } = useLanguage();
  const isTh = language === 'th';

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<PublicTrackingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    setIsLoading(true);
    setError(null);
    setSearched(true);

    try {
      const res = await ordersApi.trackPublic(query);
      if (res.error || !res.data) {
        setTrackedOrder(null);
        setError(res.error || (isTh ? 'ไม่พบข้อมูลคำสั่งซื้อหรือเลขพัสดุนี้' : 'Order or tracking number not found'));
      } else {
        setTrackedOrder(res.data);
      }
    } catch (err: any) {
      setTrackedOrder(null);
      setError(err?.message || (isTh ? 'เกิดข้อผิดพลาดในการตรวจสอบข้อมูล' : 'Failed to track order'));
    } finally {
      setIsLoading(false);
    }
  };

  // Status mapping
  const getFulfillmentBadge = (status?: string) => {
    switch (status) {
      case 'delivered':
        return {
          label: isTh ? 'จัดส่งสำเร็จ' : 'Delivered',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          step: 4,
        };
      case 'shipped':
        return {
          label: isTh ? 'กำลังจัดส่ง' : 'Shipped / In Transit',
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          step: 3,
        };
      case 'processing':
        return {
          label: isTh ? 'กำลังเตรียมสินค้า' : 'Processing',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          step: 2,
        };
      case 'cancelled':
        return {
          label: isTh ? 'ยกเลิกแล้ว' : 'Cancelled',
          color: 'bg-red-50 text-red-700 border-red-200',
          step: 0,
        };
      case 'unfulfilled':
      default:
        return {
          label: isTh ? 'รอดำเนินการจัดส่ง' : 'Unfulfilled / Placed',
          color: 'bg-stone-100 text-stone-700 border-stone-200',
          step: 1,
        };
    }
  };

  const badge = trackedOrder ? getFulfillmentBadge(trackedOrder.fulfillment_status) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ── Main Tracking Card ────────────────────────────────────────────── */}
      <div className="bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl shadow-xl shadow-stone-900/5 overflow-hidden transition-all">
        
        {/* Card Header with Brand Aesthetics */}
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-stone-100 bg-gradient-to-r from-amber-50/40 via-white to-stone-50/40">
          <div className="flex items-center justify-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-stone-200/90 shadow-md shadow-stone-900/5 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
              <Image
                src="/logos/tracking-rider.png"
                alt="Delivery Mascot"
                width={64}
                height={64}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight text-center">
                {isTh ? 'ติดตามสถานะพัสดุ' : 'Track Your Shipment'}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 text-center font-medium mt-0.5">
                {isTh
                  ? 'ตรวจสอบสถานะคำสั่งซื้อ The Bottle Club แบบเรียลไทม์'
                  : 'Real-time order and delivery status tracking'}
              </p>
            </div>
          </div>
        </div>

        {/* Live Search Form */}
        <div className="p-6 sm:p-8 border-b border-stone-100 bg-stone-50/40">
          <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isTh
                    ? 'ใส่หมายเลขคำสั่งซื้อ (เช่น ORD-...) หรือเลขพัสดุ (Tracking Number)'
                    : 'Enter Order Number (e.g. ORD-...) or Tracking Number'
                }
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-stone-200 bg-white text-stone-900 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>{isTh ? 'กำลังค้นหา...' : 'Searching...'}</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>{isTh ? 'ค้นหาสถานะ' : 'Track'}</span>
                </>
              )}
            </button>
          </form>

          {/* Search Result Display */}
          {searched && !isLoading && (
            <div className="mt-6 transition-all">
              {trackedOrder ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
                  {/* Order Header Summary */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                          {isTh ? 'หมายเลขคำสั่งซื้อ' : 'Order Reference'}
                        </span>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-bold ${badge?.color}`}>
                          {badge?.label}
                        </span>
                      </div>
                      <div className="text-lg sm:text-xl font-black text-stone-900 mt-1">
                        {trackedOrder.order_number}
                      </div>
                    </div>

                    {trackedOrder.created_at && (
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Calendar size={14} className="text-stone-400" />
                        <span>
                          {new Date(trackedOrder.created_at).toLocaleDateString(isTh ? 'th-TH' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tracking Number if provided */}
                  {trackedOrder.tracking_number && (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60">
                      <div className="flex items-center gap-3">
                        <Package className="text-amber-800" size={18} />
                        <div>
                          <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                            {isTh ? 'หมายเลขพัสดุ (Tracking No.)' : 'Tracking Number'}
                          </div>
                          <div className="text-sm font-black text-stone-900">
                            {trackedOrder.tracking_number}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {/* Step 1 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            (badge?.step || 0) >= 1 ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-stone-800 mt-2">
                          {isTh ? 'รับคำสั่งซื้อ' : 'Order Placed'}
                        </span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            (badge?.step || 0) >= 2 ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <Package size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-stone-800 mt-2">
                          {isTh ? 'กำลังเตรียมสินค้า' : 'Processing'}
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            (badge?.step || 0) >= 3 ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <Truck size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-stone-800 mt-2">
                          {isTh ? 'กำลังจัดส่ง' : 'In Transit'}
                        </span>
                      </div>

                      {/* Step 4 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                            (badge?.step || 0) >= 4 ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-[11px] font-bold text-stone-800 mt-2">
                          {isTh ? 'จัดส่งสำเร็จ' : 'Delivered'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-red-50/80 border border-red-200/70 text-red-700 flex items-center gap-3">
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <div className="text-sm font-medium">
                    {error || (isTh ? 'ไม่พบข้อมูลคำสั่งซื้อหรือเลขพัสดุนี้ กรุณาตรวจสอบอีกครั้ง' : 'Order not found. Please verify and try again.')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Body: Partner Carriers Buttons (DHL & Lalamove) */}
        <div className="p-6 sm:p-8">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4 text-center sm:text-left">
            {isTh ? 'หรือตรวจสอบกับขนส่งพันธมิตรโดยตรง' : 'Or track directly via partner carriers'}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* DHL Express Button */}
            <a
              href="https://www.dhl.com/th-th/home/tracking/tracking-express.html"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-4 sm:p-5 rounded-2xl border border-stone-200/90 bg-stone-50/70 hover:bg-white hover:border-[#FFCC00] hover:shadow-xl hover:shadow-[#FFCC00]/15 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* DHL Logo */}
                <div className="w-18 h-13 rounded-xl bg-[#FFCC00] flex items-center justify-center p-2.5 shadow-sm border border-[#e6b800] shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logos/dhl.png"
                    alt="DHL Express"
                    width={65}
                    height={26}
                    className="object-contain"
                    style={{ height: 'auto', maxHeight: '26px' }}
                  />
                </div>
                <span className="text-base sm:text-lg font-black text-stone-900 group-hover:text-red-700 transition-colors">
                  DHL Express
                </span>
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-200/70 text-stone-500 group-hover:bg-[#FFCC00] group-hover:text-stone-950 transition-all shadow-sm">
                <ExternalLink size={16} />
              </div>
            </a>

            {/* Lalamove Express Button */}
            <a
              href="https://www.lalamove.com/th-th/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group p-4 sm:p-5 rounded-2xl border border-stone-200/90 bg-stone-50/70 hover:bg-white hover:border-[#F47920] hover:shadow-xl hover:shadow-[#F47920]/15 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Lalamove Logo */}
                <div className="w-18 h-13 rounded-xl bg-white flex items-center justify-center p-2.5 shadow-sm border border-orange-200 shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logos/Lalamove.png"
                    alt="Lalamove"
                    width={70}
                    height={24}
                    className="object-contain"
                    style={{ height: 'auto', maxHeight: '24px' }}
                  />
                </div>
                <span className="text-base sm:text-lg font-black text-stone-900 group-hover:text-orange-600 transition-colors">
                  Lalamove
                </span>
              </div>

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-stone-200/70 text-stone-500 group-hover:bg-[#F47920] group-hover:text-white transition-all shadow-sm">
                <ExternalLink size={16} />
              </div>
            </a>

          </div>
        </div>
      </div>

    </div>
  );
}
