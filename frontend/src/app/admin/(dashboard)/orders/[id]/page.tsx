'use client';

import React, { use, useEffect, useState } from 'react';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import SlipViewer from '@/components/admin/SlipViewer';
import { ArrowLeft, Calendar, User, Mail, CreditCard, ShieldAlert, Truck, FileText, CheckCircle2, Save, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface OrderDetail {
  id: number;
  customerName: string;
  customerEmail: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  paymentMethod: string;
  shippingMethod: string;
  trackingNumber: string;
  adminNote: string;
  paymentSlipUrl: string;
  stripePaymentIntentId: string;
  date: string;
  taxInvoice: {
    requested: boolean;
    taxId: string;
    businessName: string;
    address: {
      addressLine: string;
      subdistrict: string;
      district: string;
      province: string;
      postcode: string;
    } | null;
  };
}

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const orderId = parseInt(id);

  // States
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [status, setStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [adminNote, setAdminNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Modal State
  const [slipOpen, setSlipOpen] = useState(false);

  async function loadOrderDetail() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, { cache: 'no-store' });
      if (!res.ok) {
        throw new Error('ไม่สามารถดึงข้อมูลรายละเอียดออเดอร์ได้');
      }
      const json = await res.json();
      setOrder(json.order);
      setItems(json.items);
      setStatus(json.order.status);
      setTrackingNumber(json.order.trackingNumber);
      setAdminNote(json.order.adminNote);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrderDetail();
  }, [orderId]);

  const handleSaveSettings = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          trackingNumber,
          adminNote
        })
      });

      if (!res.ok) {
        throw new Error('ไม่สามารถบันทึกการเปลี่ยนแปลงได้');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      // Refresh local order values
      if (order) {
        setOrder({
          ...order,
          status,
          trackingNumber,
          adminNote
        });
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleApproveSlip = async (note: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/approve-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });

      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการอนุมัติสลิป');
      }

      setSlipOpen(false);
      await loadOrderDetail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleRejectSlip = async (note: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/reject-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note })
      });

      if (!res.ok) {
        throw new Error('เกิดข้อผิดพลาดในการปฏิเสธสลิป');
      }

      setSlipOpen(false);
      await loadOrderDetail();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse select-none">
        <div className="h-6 w-32 bg-stone-900 rounded" />
        <div className="h-12 w-full bg-stone-900 rounded-2xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-96 bg-stone-900 rounded-2xl" />
          <div className="h-96 bg-stone-900 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-8 text-center bg-stone-900 border border-white/5 rounded-2xl text-red-400 select-none">
        <ShieldAlert className="w-12 h-12 mx-auto mb-4" />
        <p className="font-bold text-lg">ไม่พบข้อมูลออเดอร์ #{orderId}</p>
        <p className="text-stone-500 text-sm mt-1">{error || 'ไม่พบออเดอร์ในระบบ'}</p>
        <Link
          href="/admin/orders"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition"
        >
          ← กลับสู่หน้ารายการออเดอร์
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-stone-200 transition"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่รายการสั่งซื้อ
        </Link>
        {saveSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4.5 h-4.5" /> บันทึกการเปลี่ยนแปลงสำเร็จ!
          </div>
        )}
      </div>

      {/* Title block */}
      <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-stone-400 shrink-0">
            <ShoppingCartIcon />
          </div>
          <div>
            <h2 className="text-lg font-bold font-serif text-stone-100 flex items-center gap-3">
              ออเดอร์หมายเลข #{order.id} <OrderStatusBadge status={order.status} />
            </h2>
            <div className="flex items-center gap-3 text-xs text-stone-500 mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {order.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 uppercase">
                <CreditCard className="w-3.5 h-3.5" /> {order.paymentMethod}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns (Order Items, Tax, Shipping) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items Table */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-stone-100 font-serif mb-4">รายการสินค้าในออเดอร์</h3>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-bold text-stone-500 uppercase tracking-widest pb-3">
                    <th className="pb-3">รายการสินค้า</th>
                    <th className="pb-3 text-center">ราคา</th>
                    <th className="pb-3 text-center">จำนวน</th>
                    <th className="pb-3 text-right">ยอดรวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {items.map((item) => (
                    <tr key={item.id} className="text-stone-300">
                      <td className="py-4 font-bold text-stone-200">{item.name}</td>
                      <td className="py-4 text-center">฿{item.price.toLocaleString('th-TH')}</td>
                      <td className="py-4 text-center font-bold">{item.quantity}</td>
                      <td className="py-4 text-right font-bold text-stone-200">฿{item.total.toLocaleString('th-TH')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tax Invoice Details if requested */}
          {order.taxInvoice.requested && (
            <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <h3 className="text-sm font-bold text-stone-100 font-serif flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-red-500" /> ข้อมูลการออกใบกำกับภาษีเต็มรูปแบบ
                </h3>
                <span className="text-[10px] bg-red-950/30 border border-red-800/20 text-red-400 font-bold px-2.5 py-0.5 rounded-md">
                  TAX REQUESTED
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                <div className="space-y-2">
                  <p className="text-stone-500 font-bold uppercase tracking-wider">ชื่อผู้เสียภาษี / บริษัท</p>
                  <p className="text-stone-200 font-bold text-sm">{order.taxInvoice.businessName}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-stone-500 font-bold uppercase tracking-wider">เลขประจำตัวผู้เสียภาษี</p>
                  <p className="text-stone-200 font-bold text-sm tracking-wider">{order.taxInvoice.taxId}</p>
                </div>
                {order.taxInvoice.address && (
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <p className="text-stone-500 font-bold uppercase tracking-wider">ที่อยู่ในการออกใบกำกับภาษี</p>
                    <p className="text-stone-200 font-bold bg-stone-950 p-4 rounded-xl border border-white/5">
                      {order.taxInvoice.address.addressLine} ต.{order.taxInvoice.address.subdistrict} อ.{order.taxInvoice.address.district} จ.{order.taxInvoice.address.province} {order.taxInvoice.address.postcode}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Configuration */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg">
            <h3 className="text-sm font-bold text-stone-100 font-serif mb-4 flex items-center gap-2">
              <Truck className="w-4.5 h-4.5 text-purple-400" /> การจัดส่งสินค้า (Shipping)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">วิธีจัดส่ง</label>
                <div className="p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-300 text-xs font-semibold uppercase">
                  {order.shippingMethod} Delivery
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider block">หมายเลขพัสดุ (Tracking Number)</label>
                <input
                  type="text"
                  placeholder="กรอกเลขพัสดุ เช่น TBC-EXP-AIR-JP-001..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full p-3.5 bg-stone-950 border border-white/10 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-red-800 transition"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns (Payment Summary, Slip check, status & admin note action) */}
        <div className="space-y-6">
          {/* Order Details / Pricing */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-stone-100 font-serif">สรุปการจ่ายเงิน</h3>
            <div className="divide-y divide-white/5 text-xs">
              <div className="py-2.5 flex justify-between text-stone-400">
                <span>ราคาสินค้ารวม</span>
                <span>฿{order.subtotal.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="py-2.5 flex justify-between text-stone-400">
                <span>ค่าจัดส่ง</span>
                <span>฿{order.shippingFee.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="py-3.5 flex justify-between text-stone-200 font-black text-sm">
                <span>ยอดชำระสุทธิ</span>
                <span>฿{order.total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Slip Payment Check Section */}
            {order.paymentMethod === 'transfer' && (
              <div className="pt-2 border-t border-white/5">
                {order.paymentSlipUrl ? (
                  <button
                    onClick={() => setSlipOpen(true)}
                    className="w-full py-3 bg-red-900 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-red-950/20 transition"
                  >
                    เปิดตรวจสลิปโอนเงิน (คลิก)
                  </button>
                ) : (
                  <div className="p-3 bg-red-950/20 border border-red-900/20 rounded-xl text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" /> ลูกค้ายังไม่ได้แนบรูปสลิปการโอน
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
            <h3 className="text-sm font-bold text-stone-100 font-serif">ข้อมูลติดต่อลูกค้า</h3>
            <div className="space-y-3.5 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-stone-500">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">ชื่อลูกค้า</p>
                  <p className="text-stone-300 font-bold mt-0.5">{order.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-stone-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">อีเมล</p>
                  <p className="text-stone-300 font-bold mt-0.5 truncate">{order.customerEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Status Updates and Actions */}
          <div className="bg-stone-900 border border-white/5 rounded-2xl p-6 shadow-lg space-y-5">
            <h3 className="text-sm font-bold text-stone-100 font-serif">จัดการสถานะออเดอร์</h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">สถานะออเดอร์</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-300 text-xs focus:outline-none focus:border-red-800 transition"
              >
                <option value="pending">รอดำเนินการ (Pending)</option>
                <option value="confirmed">ยืนยันแล้ว (Confirmed)</option>
                <option value="shipped">จัดส่งแล้ว (Shipped)</option>
                <option value="delivered">ส่งถึงแล้ว (Delivered)</option>
                <option value="payment_rejected">ชำระเงินไม่ผ่าน (Payment Rejected)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">บันทึกข้อความ (Admin Note)</label>
              <textarea
                placeholder="โน้ตเพิ่มเติมสำหรับออเดอร์นี้..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full h-24 p-3 bg-stone-950 border border-white/10 rounded-xl text-stone-300 text-xs focus:outline-none focus:border-red-800 transition placeholder:text-stone-700 resize-none"
              />
            </div>

            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="w-full py-3.5 bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md shadow-red-950/20 hover:shadow-red-900/30 flex items-center justify-center gap-2 cursor-pointer transition"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  กำลังบันทึก...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  บันทึกการเปลี่ยนแปลง
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Slip Viewer Modal overlay */}
      {slipOpen && order.paymentSlipUrl && (
        <SlipViewer
          slipUrl={order.paymentSlipUrl}
          orderId={order.id}
          onClose={() => setSlipOpen(false)}
          onApprove={handleApproveSlip}
          onReject={handleRejectSlip}
        />
      )}
    </div>
  );
}

// Inline custom icon for ShoppingCart
function ShoppingCartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5 text-stone-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    </svg>
  );
}
