'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  Upload,
  CheckCircle,
  Loader2,
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  CalendarDays,
  Receipt,
  ShieldCheck,
  Sparkles,
  ImagePlus,
  FileCheck2,
} from 'lucide-react';

interface ConfirmPaymentClientProps {
  accessToken: string;
  orderId: string;
  initialOrder: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

export default function ConfirmPaymentClient({ accessToken, orderId, initialOrder }: ConfirmPaymentClientProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const order = initialOrder;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('order_id', String(orderId));

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/slip-verify/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.message || errorData.error || 'Failed to upload slip');
      }

      setUploadSuccess(true);
      setTimeout(() => {
        router.push('/account/orders');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };



  /* ───────── ERROR STATE ───────── */
  if (error && !order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[60vh]">
        <div className="max-w-sm w-full text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-inner">
            <ShoppingBag size={32} className="text-red-400" />
          </div>
          <div className="rounded-2xl bg-red-50/80 border border-red-100 px-6 py-5 mb-8 backdrop-blur-sm">
            <p className="text-sm font-semibold text-red-600">{error}</p>
          </div>
          <button
            onClick={() => router.push('/account/orders')}
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-stone-900/20 transition-all hover:bg-[#a11a1a] hover:shadow-[#a11a1a]/20 active:scale-95"
          >
            <ArrowLeft size={14} />
            {t('common.back_to_orders') || 'Back to Orders'}
          </button>
        </div>
      </div>
    );
  }

  /* ───────── ORDER NOT FOUND STATE ───────── */
  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[60vh]">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-stone-50 to-stone-100 flex items-center justify-center shadow-inner">
            <Receipt size={32} className="text-stone-300" />
          </div>
          <div>
            <h2 className="text-lg font-black text-stone-800 mb-2">
              {language === 'th' ? 'ไม่พบข้อมูลออเดอร์' : 'Order Not Found'}
            </h2>
            <p className="text-sm text-stone-400">
              {language === 'th'
                ? `ไม่พบออเดอร์ #${orderId} หรือระบบไม่สามารถดึงข้อมูลได้ในขณะนี้`
                : `Order #${orderId} could not be found or loaded at this time.`}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push('/account/orders')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg hover:bg-[#a11a1a] active:scale-95 transition-all"
            >
              <ArrowLeft size={14} />
              {language === 'th' ? 'กลับหน้าคำสั่งซื้อ' : 'Back to Orders'}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600 hover:bg-stone-50 active:scale-95 transition-all"
            >
              {language === 'th' ? 'ลองใหม่อีกครั้ง' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ───────── MAIN UI ───────── */
  return (
    <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-stone-200 bg-white px-5 py-2.5 text-stone-500 shadow-sm transition-all hover:border-stone-300 hover:text-stone-900 hover:shadow-md active:scale-95 group"
        >
          <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('common.back') || 'Back'}</span>
        </button>

        {/* PAGE TITLE */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#a11a1a] to-rose-400" />
            <h1 className="text-2xl font-black tracking-tight text-stone-900 sm:text-3xl">
              {t('checkout.payment_confirmation')}
            </h1>
          </div>
          <p className="ml-[1.1rem] text-sm text-stone-400 font-medium">
            {t('checkout.order_id')}: <span className="font-bold text-stone-600">#{orderId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ═══════════════════════════════
              LEFT SIDE: ORDER DETAILS (7 cols)
              ═══════════════════════════════ */}
          <div className="lg:col-span-7 space-y-6">

            {/* ── ORDER CARD ── */}
            <div className="overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-lg shadow-stone-200/40">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-100 px-7 py-5 sm:px-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-stone-50 to-stone-100 shadow-inner">
                    <Receipt size={18} className="text-stone-500" />
                  </div>
                  <h2 className="text-base font-black uppercase tracking-tight text-stone-900 sm:text-lg">
                    {t('checkout.order_summary') || 'Order Summary'}
                  </h2>
                </div>
                <span className={`rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                  order.status === 'completed'
                    ? 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200'
                    : order.status === 'cancelled'
                      ? 'bg-red-50 text-red-500 ring-1 ring-red-200'
                      : 'bg-amber-50 text-amber-600 ring-1 ring-amber-200'
                }`}>
                  {t('order.status_' + order.status) || order.status}
                </span>
              </div>

              {/* Item List */}
              <div className="divide-y divide-stone-100/80 px-7 sm:px-8">
                {order.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between gap-5 py-5">
                    <div className="flex items-center gap-5">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 shadow-inner">
                        <ShoppingBag size={22} className="text-stone-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-stone-900 leading-snug line-clamp-2">
                          {item.product?.name ?? item.name ?? `Product #${item.product_id ?? item.id}`}
                        </p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                          <span className="text-[11px] text-stone-400 font-medium">
                            Qty: <span className="text-stone-600 font-bold">{item.quantity}</span>
                          </span>
                          <span className="text-[11px] text-stone-400 font-medium">
                            ฿{Number(item.price ?? item.product?.price ?? 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-bold text-stone-900 tabular-nums">
                      ฿{(Number(item.price ?? item.product?.price ?? 0) * Number(item.quantity ?? 0)).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-stone-100 bg-gradient-to-b from-stone-50/60 to-stone-100/40 px-7 py-6 sm:px-8">
                <div className="space-y-2.5">
                  <div className="flex justify-between text-[11px] text-stone-500 font-semibold">
                    <span>{t('checkout.subtotal') || 'Subtotal'}</span>
                    <span className="text-stone-700 tabular-nums">฿{order.subtotal_amount?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-stone-500 font-semibold">
                    <span>{t('checkout.shipping_fee') || 'Shipping Fee'}</span>
                    <span className="text-stone-700 tabular-nums">฿{order.shipping_fee?.toLocaleString() || 0}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-stone-200/80 pt-4">
                  <span className="text-sm font-black uppercase tracking-tight text-stone-900">
                    {t('checkout.total_amount') || 'Total'}
                  </span>
                  <span className="text-xl font-black tracking-tight text-[#a11a1a] tabular-nums">
                    ฿{order.total_price?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* ── PAYMENT INFO CARD ── */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 p-[1px] shadow-xl shadow-stone-900/30">
              <div className="rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 px-7 py-6 sm:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                      <CreditCard size={18} className="text-stone-300" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 mb-1.5">
                        {t('checkout.payment_method') || 'Payment Method'}
                      </h3>
                      <p className="text-sm font-bold text-white">
                        {order.payment_method === 'promptpay' ? (t('checkout.promptpay') || 'QR PromptPay') :
                         order.payment_method === 'credit_card' ? (t('checkout.credit_card') || 'Credit / Debit Card') :
                         order.payment_method}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                      <CalendarDays size={18} className="text-stone-300" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-500 mb-1.5">
                        {t('checkout.order_date') || 'Order Date'}
                      </h3>
                      <p className="text-sm font-bold text-white">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString(language, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════
              RIGHT SIDE: UPLOAD FORM (5 cols)
              ═══════════════════════════════ */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 overflow-hidden rounded-3xl border border-stone-200/80 bg-white shadow-2xl shadow-stone-300/30">

              {/* Upload Card Header */}
              <div className="relative overflow-hidden px-7 py-6 sm:px-8">
                <div className="absolute inset-0 bg-gradient-to-br from-[#a11a1a] via-[#c42929] to-[#8b1515]" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm shadow-inner">
                    <FileCheck2 size={22} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white tracking-tight">
                      {t('checkout.payment_confirmation')}
                    </h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                      {t('checkout.order_id')}: #{orderId}
                    </p>
                  </div>
                </div>
              </div>

              {/* Upload Card Body */}
              <div className="px-7 py-7 sm:px-8">
                {uploadSuccess ? (
                  /* ── SUCCESS STATE ── */
                  <div className="text-center py-10">
                    <div className="relative mx-auto mb-8">
                      <div className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-gradient-to-br from-emerald-200 to-green-100 blur-xl animate-pulse" />
                      <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-xl shadow-emerald-500/30">
                        <CheckCircle size={36} className="text-white" />
                      </div>
                    </div>
                    <h2 className="text-lg font-black text-stone-900 tracking-tight mb-2">
                      {t('checkout.payment_success')}
                    </h2>
                    <p className="text-xs text-stone-400 mb-8 leading-relaxed max-w-[260px] mx-auto font-medium">
                      {t('checkout.redirecting_to_orders') || 'Redirecting to your orders list in a moment...'}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 size={16} className="animate-spin text-stone-300" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300">
                        {t('checkout.redirecting') || 'Redirecting'}
                      </span>
                    </div>
                  </div>
                ) : (
                  /* ── UPLOAD FORM ── */
                  <div className="space-y-6">

                    {/* Instructions */}
                    <div className="rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/60 p-5">
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                          <Sparkles size={16} className="text-[#a11a1a]" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-stone-900 mb-1">
                            {t('checkout.upload_slip')}
                          </h3>
                          <p className="text-[11px] text-stone-500 leading-relaxed font-medium">
                            {t('checkout.upload_instruction')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Drop Zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 group ${
                        dragActive
                          ? 'border-[#a11a1a] bg-red-50/50 scale-[1.01]'
                          : previewUrl
                            ? 'border-stone-200 bg-stone-50 hover:border-stone-300'
                            : 'border-stone-200 bg-stone-50/50 hover:border-[#a11a1a]/40 hover:bg-stone-50'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                      />

                      {previewUrl ? (
                        <div className="relative aspect-[3/4] max-w-[260px] mx-auto overflow-hidden p-5">
                          <div className="relative h-full w-full overflow-hidden rounded-xl border border-stone-200 shadow-lg transition-transform duration-500 group-hover:scale-[1.02]">
                            <img src={previewUrl} alt="Slip preview" className="h-full w-full object-contain bg-white" />
                            <div className="absolute inset-0 flex items-center justify-center bg-stone-900/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <span className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 shadow-xl">
                                <ImagePlus size={14} />
                                {t('common.edit') || 'Change'}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center px-6 py-14">
                          <div className="relative mb-5">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a11a1a]/10 to-rose-200/20 blur-xl transition-all duration-500 group-hover:scale-125" />
                            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg shadow-stone-200/50 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-[#a11a1a]/10">
                              <Upload size={24} className="text-stone-400 transition-colors duration-300 group-hover:text-[#a11a1a]" />
                            </div>
                          </div>
                          <span className="text-xs font-bold text-stone-800 mb-1.5">
                            {t('checkout.select_file')}
                          </span>
                          <p className="text-[10px] text-stone-400 font-medium">
                            Drag & drop or click · JPG, PNG, PDF (Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="flex items-start gap-3 rounded-2xl bg-red-50 border border-red-100 p-4">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100">
                          <span className="text-red-500 text-xs font-black">!</span>
                        </div>
                        <p className="text-xs text-red-600 font-semibold leading-relaxed pt-0.5">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      onClick={handleConfirmPayment}
                      disabled={!selectedFile || isUploading}
                      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#a11a1a] to-[#c42929] px-8 py-5 text-[11px] font-bold uppercase tracking-[0.25em] text-white shadow-xl shadow-[#a11a1a]/20 transition-all duration-300 hover:shadow-2xl hover:shadow-[#a11a1a]/30 active:scale-[0.98] disabled:from-stone-100 disabled:to-stone-200 disabled:text-stone-300 disabled:shadow-none"
                    >
                      <span className="relative flex items-center justify-center gap-3">
                        {isUploading ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                        {t('checkout.confirm_payment_button')}
                      </span>
                    </button>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                      <ShieldCheck size={13} className="text-stone-300" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-300">
                        Secure · Encrypted · SSL Protected
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
