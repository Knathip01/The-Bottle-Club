'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchTracking } from '@/lib/tracking/client';
import type { TrackingApiResponse } from '@/lib/tracking/types';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  AlertCircle,
  ArrowRight,
  Loader2,
  RefreshCw,
  Calendar,
  Box,
  Globe,
} from 'lucide-react';

// ── Status config ──────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  processing: {
    labelTh: 'กำลังดำเนินการ',
    labelEn: 'Processing',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-700',
    icon: Clock,
    step: 1,
  },
  in_transit: {
    labelTh: 'อยู่ระหว่างขนส่ง',
    labelEn: 'In Transit',
    color: 'text-blue-600',
    bg: 'bg-blue-50 border-blue-200',
    badgeBg: 'bg-blue-100 text-blue-700',
    icon: Truck,
    step: 2,
  },
  customs: {
    labelTh: 'อยู่ที่ศุลกากร',
    labelEn: 'At Customs',
    color: 'text-purple-600',
    bg: 'bg-purple-50 border-purple-200',
    badgeBg: 'bg-purple-100 text-purple-700',
    icon: AlertCircle,
    step: 3,
  },
  out_for_delivery: {
    labelTh: 'กำลังจัดส่ง',
    labelEn: 'Out for Delivery',
    color: 'text-orange-600',
    bg: 'bg-orange-50 border-orange-200',
    badgeBg: 'bg-orange-100 text-orange-700',
    icon: MapPin,
    step: 4,
  },
  delivered: {
    labelTh: 'จัดส่งสำเร็จ',
    labelEn: 'Delivered',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    icon: CheckCircle2,
    step: 5,
  },
} as const;

const STEPS_ORDER = ['processing', 'in_transit', 'customs', 'out_for_delivery', 'delivered'] as const;

const STEPS_LABEL: Record<string, { th: string; en: string }> = {
  processing:       { th: 'รับพัสดุ', en: 'Order Received' },
  in_transit:       { th: 'กำลังขนส่ง', en: 'In Transit' },
  customs:          { th: 'ศุลกากร', en: 'Customs' },
  out_for_delivery: { th: 'กำลังจัดส่ง', en: 'Out for Delivery' },
  delivered:        { th: 'สำเร็จ', en: 'Delivered' },
};

const TRANSPORT_MODE_LABEL: Record<string, { th: string; en: string }> = {
  sea:   { th: 'ทางเรือ', en: 'Sea Freight' },
  air:   { th: 'ทางอากาศ', en: 'Air Freight' },
  local: { th: 'ในประเทศ', en: 'Domestic' },
};

// ── Example tracking numbers ──────────────────────────────────────────────────
const EXAMPLES = [
  { id: 'TBC-EXP-AIR-JP-001', labelTh: '✈ ญี่ปุ่น', labelEn: '✈ Japan' },
  { id: 'TBC-EXP-SEA-CN-001', labelTh: '🚢 จีน', labelEn: '🚢 China' },
  { id: 'TBC-EXP-AIR-GB-001', labelTh: '✈ UK', labelEn: '✈ UK' },
  { id: 'TBC-DOM-LOCAL-TH-001', labelTh: '📦 ในประเทศ', labelEn: '📦 Domestic' },
];

// ── Helper ────────────────────────────────────────────────────────────────────
function formatDate(iso: string, lang: 'th' | 'en'): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString(lang === 'th' ? 'th-TH' : 'en-GB', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TrackingContent() {
  const { language } = useLanguage();
  const [lang, setLang] = useState<'th' | 'en'>(language === 'th' ? 'th' : 'en');

  const [trackingId, setTrackingId] = useState('');
  const [result, setResult] = useState<TrackingApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setLang(language === 'th' ? 'th' : 'en');
  }, [language]);

  const handleSearch = useCallback(async (id: string) => {
    const trimmed = id.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchTracking({ trackingNumber: trimmed });
      if (!data) {
        setError(lang === 'th'
          ? 'ไม่พบหมายเลขพัสดุนี้ กรุณาตรวจสอบอีกครั้ง'
          : 'Tracking number not found. Please check and try again.');
      } else {
        setResult(data.api);
        setHistory((prev) => {
          const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(0, 5);
          return next;
        });
      }
    } catch {
      setError(lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [lang]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(trackingId);
  };

  const currentStatus = result ? STATUS_CONFIG[result.status] : null;
  const currentStep = currentStatus?.step ?? 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ── Search Card ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                <Package size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-stone-900 leading-tight">
                  {lang === 'th' ? 'ติดตามพัสดุ' : 'Track Your Parcel'}
                </h1>
                <p className="text-xs text-stone-500">
                  {lang === 'th' ? 'กรอกหมายเลขพัสดุเพื่อตรวจสอบสถานะ' : 'Enter your tracking number to check status'}
                </p>
              </div>
            </div>
            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === 'th' ? 'en' : 'th')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-500 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <Globe size={13} />
              {lang === 'th' ? 'EN' : 'TH'}
            </button>
          </div>
        </div>

        {/* Search form */}
        <div className="px-6 py-5 space-y-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
              <input
                id="tracking-input"
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={lang === 'th' ? 'กรอกหมายเลขพัสดุ...' : 'Enter tracking number...'}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/15 focus:bg-white transition-all"
                autoComplete="off"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !trackingId.trim()}
              id="tracking-search-btn"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 shadow-sm"
            >
              {loading
                ? <Loader2 size={15} className="animate-spin" />
                : <Search size={15} />}
              {lang === 'th' ? 'ค้นหา' : 'Search'}
            </button>
          </form>

          {/* Example chips */}
          <div>
            <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
              {lang === 'th' ? 'ตัวอย่างหมายเลขพัสดุ' : 'Example tracking numbers'}
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => {
                    setTrackingId(ex.id);
                    handleSearch(ex.id);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold bg-stone-100 hover:bg-indigo-50 hover:text-indigo-700 text-stone-600 rounded-lg border border-stone-200 hover:border-indigo-200 transition-all cursor-pointer active:scale-95"
                >
                  {lang === 'th' ? ex.labelTh : ex.labelEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Error ───────────────────────────────────────────────────────── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
          <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Loading skeleton ─────────────────────────────────────────────── */}
      {loading && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="h-5 bg-stone-100 rounded-lg w-1/3" />
          <div className="h-4 bg-stone-100 rounded-lg w-2/3" />
          <div className="flex gap-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 h-2 bg-stone-100 rounded-full" />
            ))}
          </div>
        </div>
      )}

      {/* ── Result ──────────────────────────────────────────────────────── */}
      {result && !loading && currentStatus && (() => {
        const StatusIcon = currentStatus.icon;
        return (
          <div className="space-y-4">

            {/* Status banner */}
            <div className={`border rounded-2xl p-5 ${currentStatus.bg}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <StatusIcon size={22} className={currentStatus.color} />
                  <div>
                    <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      {lang === 'th' ? 'สถานะพัสดุ' : 'Parcel Status'}
                    </p>
                    <p className={`text-xl font-black mt-0.5 ${currentStatus.color}`}>
                      {lang === 'th' ? currentStatus.labelTh : currentStatus.labelEn}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${currentStatus.badgeBg}`}>
                  {result.tracking_number}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  {STEPS_ORDER.map((step, i) => {
                    const stepNum = i + 1;
                    const isDone = stepNum < currentStep;
                    const isActive = stepNum === currentStep;
                    return (
                      <div key={step} className="flex-1 flex flex-col items-center gap-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                          isDone   ? 'bg-emerald-500 border-emerald-500 text-white'
                          : isActive ? `border-current ${currentStatus.color} bg-white`
                          : 'bg-white border-stone-200 text-stone-300'
                        }`}>
                          {isDone ? <CheckCircle2 size={14} className="text-white" /> : stepNum}
                        </div>
                        <span className={`text-[9px] font-bold text-center leading-tight hidden sm:block ${
                          isActive ? currentStatus.color : isDone ? 'text-emerald-600' : 'text-stone-300'
                        }`}>
                          {lang === 'th' ? STEPS_LABEL[step].th : STEPS_LABEL[step].en}
                        </span>
                        {i < STEPS_ORDER.length - 1 && (
                          <div className="absolute" />
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* Line connector */}
                <div className="relative flex items-center">
                  <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.status === 'delivered' ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${((currentStep - 1) / (STEPS_ORDER.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Origin → Destination */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                  {lang === 'th' ? 'เส้นทาง' : 'Route'}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <p className="text-[11px] text-stone-400 font-semibold">{lang === 'th' ? 'ต้นทาง' : 'Origin'}</p>
                    <p className="text-sm font-bold text-stone-800 mt-0.5">
                      {lang === 'th' ? result.origin.name : result.origin.name_en}
                    </p>
                  </div>
                  <ArrowRight size={16} className="text-stone-300 shrink-0" />
                  <div className="flex-1 text-right">
                    <p className="text-[11px] text-stone-400 font-semibold">{lang === 'th' ? 'ปลายทาง' : 'Destination'}</p>
                    <p className="text-sm font-bold text-stone-800 mt-0.5">
                      {lang === 'th' ? result.destination.name : result.destination.name_en}
                    </p>
                  </div>
                </div>
              </div>

              {/* Carrier + mode */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                  {lang === 'th' ? 'ผู้ให้บริการ' : 'Carrier'}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Truck size={14} className="text-stone-400 shrink-0" />
                    <p className="text-sm font-bold text-stone-800">
                      {lang === 'th' ? result.carrier.name : result.carrier.name_en}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Box size={14} className="text-stone-400 shrink-0" />
                    <p className="text-sm font-semibold text-stone-600">
                      {lang === 'th'
                        ? TRANSPORT_MODE_LABEL[result.transport_mode]?.th ?? result.transport_mode
                        : TRANSPORT_MODE_LABEL[result.transport_mode]?.en ?? result.transport_mode}
                      {' · '}
                      {result.item_count} {lang === 'th' ? 'ชิ้น' : 'item(s)'}
                    </p>
                  </div>
                </div>
              </div>

              {/* ETA */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                  {lang === 'th' ? 'เวลาจัดส่งโดยประมาณ' : 'Estimated Delivery'}
                </p>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-stone-400 shrink-0" />
                  <p className="text-sm font-bold text-stone-800">
                    {result.eta.remaining}{' '}
                    {lang === 'th'
                      ? result.eta.unit === 'days' ? 'วัน' : result.eta.unit === 'hours' ? 'ชั่วโมง' : 'นาที'
                      : result.eta.unit}{' '}
                    {lang === 'th' ? 'คงเหลือ' : 'remaining'}
                  </p>
                </div>
                <p className="text-xs text-stone-400 mt-1.5">
                  {lang === 'th' ? 'รวมทั้งหมด' : 'Total'}: {result.eta.total}{' '}
                  {lang === 'th'
                    ? result.eta.unit === 'days' ? 'วัน' : result.eta.unit === 'hours' ? 'ชั่วโมง' : 'นาที'
                    : result.eta.unit}
                </p>
              </div>

              {/* Last updated */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
                  {lang === 'th' ? 'อัปเดตล่าสุด' : 'Last Updated'}
                </p>
                <div className="flex items-center gap-2">
                  <RefreshCw size={14} className="text-stone-400 shrink-0" />
                  <p className="text-sm font-bold text-stone-800">
                    {formatDate(result.updated_at, lang)}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            {result.timeline && result.timeline.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-4">
                  {lang === 'th' ? 'ประวัติการขนส่ง' : 'Shipping Timeline'}
                </p>
                <div className="space-y-0">
                  {result.timeline.map((step, idx) => {
                    const isCompleted = step.completed;
                    const isActive = step.active;
                    const isLast = idx === result.timeline.length - 1;

                    const TIMELINE_LABELS: Record<string, { th: string; en: string }> = {
                      order_received:     { th: 'รับออเดอร์', en: 'Order Received' },
                      warehouse_pickup:   { th: 'รับที่คลัง', en: 'Warehouse Pickup' },
                      processing:         { th: 'กำลังดำเนินการ', en: 'Processing' },
                      departed_origin:    { th: 'ออกจากต้นทาง', en: 'Departed Origin' },
                      in_transit:         { th: 'ระหว่างขนส่ง', en: 'In Transit' },
                      customs_clearance:  { th: 'ผ่านศุลกากร', en: 'Customs Clearance' },
                      arrived_destination:{ th: 'ถึงปลายทาง', en: 'Arrived at Destination' },
                      out_for_delivery:   { th: 'กำลังจัดส่ง', en: 'Out for Delivery' },
                      delivered:          { th: 'จัดส่งสำเร็จ', en: 'Delivered' },
                    };

                    const label = TIMELINE_LABELS[step.key];

                    return (
                      <div key={step.key} className="flex gap-4">
                        {/* Dot + line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full mt-1 shrink-0 border-2 transition-all ${
                            isActive    ? 'bg-indigo-500 border-indigo-500 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                            : isCompleted ? 'bg-emerald-500 border-emerald-500'
                            : 'bg-white border-stone-200'
                          }`} />
                          {!isLast && (
                            <div className={`w-0.5 flex-1 my-1 ${isCompleted ? 'bg-emerald-200' : 'bg-stone-100'}`} />
                          )}
                        </div>
                        {/* Content */}
                        <div className={`pb-4 flex-1 ${isLast ? '' : ''}`}>
                          <p className={`text-sm font-bold leading-tight ${
                            isActive ? 'text-indigo-700' : isCompleted ? 'text-stone-800' : 'text-stone-300'
                          }`}>
                            {label ? (lang === 'th' ? label.th : label.en) : step.key.replace(/_/g, ' ')}
                            {isActive && (
                              <span className="ml-2 text-[10px] font-black bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full uppercase">
                                {lang === 'th' ? 'ปัจจุบัน' : 'NOW'}
                              </span>
                            )}
                          </p>
                          <p className={`text-xs mt-0.5 ${isCompleted ? 'text-stone-400' : 'text-stone-200'}`}>
                            {step.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Re-search button */}
            <button
              type="button"
              onClick={() => { setResult(null); setTrackingId(''); }}
              className="w-full py-3 border border-stone-200 text-stone-500 text-sm font-semibold rounded-xl hover:bg-stone-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Search size={14} />
              {lang === 'th' ? 'ค้นหาพัสดุรายการใหม่' : 'Search another parcel'}
            </button>
          </div>
        );
      })()}

      {/* ── Recent history ──────────────────────────────────────────────── */}
      {history.length > 0 && !result && !loading && (
        <div className="bg-white border border-stone-200 rounded-2xl p-5">
          <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-3">
            {lang === 'th' ? 'ค้นหาล่าสุด' : 'Recent Searches'}
          </p>
          <div className="space-y-1">
            {history.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTrackingId(id);
                  handleSearch(id);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-stone-50 text-sm font-mono font-semibold text-stone-700 cursor-pointer transition-colors group text-left"
              >
                <div className="flex items-center gap-2">
                  <Package size={13} className="text-stone-400 shrink-0" />
                  {id}
                </div>
                <ArrowRight size={13} className="text-stone-300 group-hover:text-indigo-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
