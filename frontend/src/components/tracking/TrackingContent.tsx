'use client';

import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Search,
  ChevronDown,
  Shield,
  Crosshair,
  Layers,
  Truck,
  Ship,
  Plane,
  Package,
  Phone,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Globe,
  Loader2,
  MessageSquare,
  Star,
  Thermometer,
  Send,
  X,
  Sparkles,
} from 'lucide-react';
import {
  DEMO_TRACKING_IDS,
  EXPORT_DESTINATION_COUNTRIES,
  resolveShipment,
  formatEta,
  getOnTheWayLabel,
  getDestinationLabel,
  getModeLabel,
  type TransportMode,
  type TrackingCountry,
  type Shipment,
  type ShipmentDirection,
} from '@/lib/tracking/shipments';
import { fetchTracking } from '@/lib/tracking/client';
import type { TrackingApiResponse } from '@/lib/tracking/shipments';

const TrackingMap = dynamic(() => import('./TrackingMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[100dvh] w-full bg-stone-100 animate-pulse flex items-center justify-center text-stone-400">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4" />
        <p className="font-medium">กำลังโหลดแผนที่...</p>
      </div>
    </div>
  ),
});

const MODES: { id: TransportMode; icon: typeof Ship }[] = [
  { id: 'sea', icon: Ship },
  { id: 'air', icon: Plane },
  { id: 'local', icon: Truck },
];

function ModeIcon({ mode, size = 28 }: { mode: TransportMode; size?: number }) {
  if (mode === 'sea') return <Ship size={size} className="text-sky-700" strokeWidth={1.5} />;
  if (mode === 'air') return <Plane size={size} className="text-violet-700" strokeWidth={1.5} />;
  return <Truck size={size} className="text-emerald-700" strokeWidth={1.5} />;
}

export default function TrackingContent() {
  const { t, language } = useLanguage();
  const lang = language === 'th' ? 'th' : 'en';

  const [trackingId, setTrackingId] = useState('');
  const [direction, setDirection] = useState<ShipmentDirection>('export');
  const [mode, setMode] = useState<TransportMode>('air');
  const [destination, setDestination] = useState<Exclude<TrackingCountry, 'th'>>('jp');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [apiData, setApiData] = useState<TrackingApiResponse | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recenterToken, setRecenterToken] = useState(0);
  const [sheetExpanded, setSheetExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  // --- Simulated Driver Chat States ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: 'user' | 'driver'; text: string; time: string }>
  >([]);
  const [isDriverTyping, setIsDriverTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const availableModes = useMemo((): TransportMode[] => {
    if (direction === 'domestic') return ['local'];
    if (destination === 'cn') return ['sea'];
    return ['air'];
  }, [direction, destination]);

  useEffect(() => {
    if (!availableModes.includes(mode)) setMode(availableModes[0]);
  }, [availableModes, mode]);

  const loadTracking = useCallback(
    async (id: string) => {
      setLoading(true);
      setNotFound(false);
      const destCountry: TrackingCountry = direction === 'domestic' ? 'th' : destination;
      const result = await fetchTracking({
        trackingNumber: id,
        transportMode: mode,
        destinationCountry: destCountry,
        direction,
      });
      setLoading(false);

      if (!result) {
        setNotFound(true);
        setIsTracking(false);
        setShipment(null);
        setApiData(null);
        return;
      }

      setShipment(result.shipment);
      setApiData(result.api);
      setProgress(result.api.progress);
      setIsTracking(true);
      setSheetExpanded(false);
      setRecenterToken((n) => n + 1);
    },
    [direction, destination, mode]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const id = trackingId.trim();
    if (!id) return;
    loadTracking(id);
  };

  const applyDemoId = (id: string) => {
    setTrackingId(id);
    setNotFound(false);
    const resolved = resolveShipment(id);
    if (resolved) {
      setDirection(resolved.direction);
      setMode(resolved.mode);
      if (resolved.destinationCountry !== 'th') {
        setDestination(resolved.destinationCountry);
      }
    }
  };

  useEffect(() => {
    if (!isTracking || !trackingId.trim()) return;
    const interval = setInterval(() => {
      fetchTracking({
        trackingNumber: trackingId.trim(),
        transportMode: mode,
        destinationCountry: direction === 'domestic' ? 'th' : destination,
        direction,
      }).then((result) => {
        if (result) {
          setApiData(result.api);
          setProgress(result.api.progress);
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [isTracking, trackingId, mode, destination, direction]);

  // Scroll chat to bottom when messages update
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isDriverTyping]);

  // Initialize Chat Welcome Message when live tracking begins
  useEffect(() => {
    if (isTracking && shipment) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const isDomestic = shipment.mode === 'local';

      const welcomeMsgTh = isDomestic
        ? 'สวัสดีครับคุณลูกค้า! ผม คุณสมศักดิ์ ยอดนักซิ่ง พาร์ทเนอร์จัดส่งของ The Bottle Club ยินดีให้บริการครับ! ตอนนี้พัสดุของคุณได้รับการควบคุมความเย็นพรีเมียมที่ 16°C และกำลังเร่งเดินทางไปหาคุณแล้วครับ มีหมายเหตุเพิ่มเติมแจ้งผมในแชทนี้ได้เลยนะครับ!'
        : `สวัสดีครับ! ทางคลังสินค้า The Bottle Club ได้รับคำสั่งซื้อแล้ว และกำลังเตรียมขนส่งสินค้าของคุณไปยังประเทศปลายทาง (${getDestinationLabel(
            shipment.destinationCountry,
            'th'
          )}) ผ่านสายการจัดส่ง ${shipment.carrier} เรียบร้อยแล้วครับ หากมีคำถามเพิ่มเติมแจ้งได้เลยครับ!`;

      const welcomeMsgEn = isDomestic
        ? 'Hello! I am Somsak, your delivery partner from The Bottle Club. Your premium package is currently temperature-controlled at 16°C and heading your way. Let me know here if you have any special instructions!'
        : `Hello! The Bottle Club warehouse has processed your order and is dispatching it to your destination (${getDestinationLabel(
            shipment.destinationCountry,
            'en'
          )}) via ${shipment.carrierEn}. Feel free to ask if you have any questions!`;

      setChatMessages([
        {
          sender: 'driver',
          text: lang === 'th' ? welcomeMsgTh : welcomeMsgEn,
          time: timeStr,
        },
      ]);
    } else {
      setChatMessages([]);
      setIsChatOpen(false);
      setIsDriverTyping(false);
    }
  }, [isTracking, shipment, lang]);

  const handleQuickReply = (textTh: string, textEn: string) => {
    if (isDriverTyping) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const userText = lang === 'th' ? textTh : textEn;

    // Add user message
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeStr }]);

    // Trigger driver typing response
    setIsDriverTyping(true);

    // Determine response based on user selection
    let responseTh = '';
    let responseEn = '';

    if (textTh.includes('นิติบุคคล') || textEn.includes('juristic')) {
      responseTh =
        'รับทราบครับผม! ไปถึงคอนโด/หมู่บ้านแล้ว ผมจะรีบประสานงานนำฝากไว้ที่นิติบุคคลให้เรียบร้อย พร้อมถ่ายรูปส่งอัปเดตหลักฐานในแชทนี้ทันทีครับ ขอบคุณครับ!';
      responseEn =
        'Got it! When I arrive, I will immediately drop it off at the juristic/reception desk and post a confirmation photo right here. Thank you!';
    } else if (textTh.includes('โทรหา') || textEn.includes('call me')) {
      responseTh =
        'ได้เลยครับผม! ก่อนจะเข้าถึงประมาณ 2-3 นาที ผมจะกดโทรหาตามเบอร์ที่คุณลูกค้าลงทะเบียนไว้ เพื่อเตรียมความสะดวกนะครับ!';
      responseEn =
        'Sure! I will give you a call on your registered phone number 2-3 minutes before arrival so we can coordinate smoothly!';
    } else if (textTh.includes('ลงไปเปิด') || textEn.includes('Coming down')) {
      responseTh =
        'ขอบคุณมากครับพี่! ผมกำลังมุ่งหน้าไปด้วยความระมัดระวัง อีกประมาณอึดใจเดียวไปเจอกันที่ประตูทางเข้าชั้นล่างครับ!';
      responseEn =
        'Thank you so much! I am driving safely and heading your way. See you at the lobby entrance in just a moment!';
    } else {
      responseTh =
        'ด้วยความยินดีเป็นอย่างยิ่งครับ! ขอบคุณสำหรับความห่วงใยในการเดินทางครับ ขอให้มีความสุขและประทับใจสุดๆ กับไวน์ขวดพิเศษขวดนี้นะครับ 🍷';
      responseEn =
        'My absolute pleasure! Thank you for your kind words and care. Enjoy your premium wine, have a fantastic time! 🍷';
    }

    setTimeout(() => {
      setIsDriverTyping(false);
      const driverTime = new Date().toLocaleTimeString(lang === 'th' ? 'th-TH' : 'en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setChatMessages((prev) => [
        ...prev,
        { sender: 'driver', text: lang === 'th' ? responseTh : responseEn, time: driverTime },
      ]);
    }, 1500);
  };

  const handleProgress = useCallback((p: number) => setProgress(p), []);

  const eta = useMemo(
    () => (shipment ? formatEta(progress, shipment, lang) : { primary: '—', secondary: '' }),
    [progress, shipment, lang]
  );

  const destinationLabel = shipment
    ? lang === 'th'
      ? shipment.destinationName
      : shipment.destinationNameEn
    : '';
  const carrierLabel = shipment
    ? lang === 'th'
      ? shipment.carrier
      : shipment.carrierEn
    : '';
  const onTheWayLabel = shipment
    ? getOnTheWayLabel(shipment.mode, shipment.direction, lang)
    : '';

  // Quick replies definition
  const quickReplies = useMemo(
    () => [
      {
        th: 'ฝากไว้ที่นิติบุคคลได้เลยครับ',
        en: 'Leave it at the juristic office',
      },
      {
        th: 'กรุณาโทรหาเมื่อมาถึงด้วยครับ',
        en: 'Please call me when you arrive',
      },
      {
        th: 'กำลังลงไปเปิดประตูให้ครับ',
        en: 'Coming down to open the door now',
      },
      {
        th: 'ขอบคุณมากครับ ขับขี่ปลอดภัยนะ',
        en: 'Thank you! Drive safely',
      },
    ],
    []
  );

  if (isTracking && shipment) {
    const isDomestic = shipment.mode === 'local';

    return (
      <div className="fixed inset-0 z-[70] bg-stone-100 font-sans">
        <TrackingMap
          isTracking
          fullScreen
          recenterToken={recenterToken}
          onProgress={handleProgress}
          route={shipment.route}
          mode={shipment.mode}
          progressSpeed={shipment.progressSpeed}
          initialProgress={apiData?.progress ?? 0}
        />

        {/* Top Header Floating Card */}
        <div className="absolute top-0 left-0 right-0 z-[500] pointer-events-none p-3 pt-4 sm:p-4">
          <div className="flex items-center justify-between gap-3 pointer-events-auto max-w-4xl mx-auto">
            <button
              type="button"
              onClick={() => {
                setIsTracking(false);
                setShipment(null);
                setApiData(null);
                setProgress(0);
              }}
              className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-stone-700 hover:bg-stone-50 active:scale-95 transition-transform"
              aria-label="กลับ"
            >
              <ChevronDown size={22} />
            </button>
            
            {/* Grab-like Real-time Signal status */}
            <div className="hidden sm:flex items-center gap-2 bg-emerald-500/90 text-white rounded-full px-4 py-2 text-xs font-bold shadow-lg backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>LIVE GPS SIGNAL STRONG</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-end">
              <span className="bg-stone-900 text-white shadow-lg rounded-full px-3.5 py-2.5 text-xs font-bold flex items-center gap-1">
                <span>🇹🇭</span>
                <span>→</span>
                <span>
                  {shipment.destinationCountry === 'th'
                    ? '🇹🇭'
                    : EXPORT_DESTINATION_COUNTRIES.find((c) => c.id === shipment.destinationCountry)
                        ?.flag}
                </span>
                <span className="ml-1 bg-stone-700 px-1.5 py-0.5 rounded text-[10px]">
                  {getModeLabel(shipment.mode, lang)}
                </span>
              </span>
              {apiData?.provider === 'external' && (
                <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-1.5 rounded-full border border-emerald-400 shadow-md">
                  LIVE API
                </span>
              )}
              <Link
                href="/account"
                className="flex items-center gap-1.5 bg-white shadow-lg rounded-full px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50 transition-colors"
              >
                <Shield size={16} className="text-emerald-500 shrink-0" />
                {t('tracking.safety_center')}
              </Link>
            </div>
          </div>
        </div>

        {/* Map Control Buttons */}
        <div className="absolute right-3 bottom-[250px] sm:bottom-[270px] z-[500] flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setRecenterToken((n) => n + 1)}
            className="w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-stone-700 hover:bg-emerald-50 hover:text-emerald-600 active:scale-95 transition-all"
            aria-label={t('tracking.recenter')}
            title={t('tracking.recenter')}
          >
            <Crosshair size={20} />
          </button>
        </div>

        {/* Premium Grab-Style bottom sheet */}
        <div className="absolute bottom-0 left-0 right-0 z-[500] pointer-events-none">
          <div className="max-w-xl mx-auto pointer-events-auto bg-white/95 backdrop-blur-md rounded-t-[32px] shadow-[0_-12px_35px_rgba(0,0,0,0.14)] border-t border-stone-100 transition-all duration-300">
            {/* Grab handle bar */}
            <button
              type="button"
              onClick={() => setSheetExpanded((v) => !v)}
              className="w-full flex flex-col items-center pt-3.5 pb-1 focus:outline-none"
            >
              <span className="w-12 h-1.5 rounded-full bg-stone-200 transition-colors hover:bg-stone-300" />
            </button>

            <div className="px-6 pb-6">
              {/* Primary Live Delivery Status */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                      {isDomestic ? (lang === 'th' ? 'พาร์ทเนอร์กำลังจัดส่ง' : 'Rider is in transit') : (lang === 'th' ? 'อยู่ระหว่างการขนส่งระหว่างประเทศ' : 'In transit internationally')}
                    </p>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1 leading-tight tracking-tight">
                    {isDomestic ? (
                      lang === 'th' ? (
                        <>อีก <span className="text-emerald-500 font-black">{eta.secondary.replace('~', '').split(' ')[0]}</span> นาทีจะถึงผู้รับ</>
                      ) : (
                        <>Arriving in <span className="text-emerald-500 font-black">{eta.secondary.replace('~', '').split(' ')[0]}</span> mins</>
                      )
                    ) : (
                      onTheWayLabel
                    )}
                  </h2>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                    <Package size={13} className="text-stone-400" />
                    <span>{shipment.id} · {shipment.itemCount} {t('tracking.items')}</span>
                  </p>
                </div>

                {/* Big ETA Display */}
                <div className="text-right shrink-0 bg-emerald-50 border border-emerald-100 rounded-2xl px-4 py-2 shadow-sm">
                  <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">{t('tracking.eta_label')}</p>
                  <p className="text-xl sm:text-2xl font-black text-emerald-600 tabular-nums leading-none mt-1">{eta.primary}</p>
                </div>
              </div>

              {/* Temperature controlled wine indicator badge */}
              {isDomestic && (
                <div className="mt-4 flex items-center gap-2.5 bg-sky-50/80 border border-sky-100/60 rounded-xl px-3.5 py-2.5 shadow-sm text-sky-800 animate-pulse">
                  <Thermometer size={16} className="text-sky-500 shrink-0" />
                  <p className="text-xs font-bold leading-normal">
                    {lang === 'th' 
                      ? 'ระบบควบคุมความเย็นพรีเมียม 16°C สำหรับรักษาคุณภาพไวน์ที่ดีที่สุดของคุณ'
                      : 'Premium cold chain controlled at 16°C to preserve your wine quality'}
                  </p>
                </div>
              )}

              {/* Grab-style Visual Stepper Line */}
              <div className="mt-5 mb-5 relative flex items-center justify-between">
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-100 rounded-full z-0">
                  {/* Active progress color filling */}
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(5, progress * 100))}%` }}
                  />
                </div>

                {/* Step 1: Processing */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-2 border-white">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-stone-600 mt-1.5">{lang === 'th' ? 'เตรียมสินค้า' : 'Packed'}</span>
                </div>

                {/* Step 2: Shipping */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-all ${
                    progress < 0.95 ? 'bg-emerald-500 text-white animate-bounce' : 'bg-emerald-500 text-white'
                  }`}>
                    {shipment.mode === 'air' ? <Plane size={15} /> : shipment.mode === 'sea' ? <Ship size={15} /> : <Truck size={15} />}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 mt-1.5">{lang === 'th' ? 'กำลังจัดส่ง' : 'Delivering'}</span>
                </div>

                {/* Step 3: Delivered */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition-colors ${
                    progress >= 0.95 ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-400'
                  }`}>
                    <Sparkles size={15} />
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 mt-1.5">{lang === 'th' ? 'สำเร็จ' : 'Arrived'}</span>
                </div>
              </div>

              {/* Rider Profile Card */}
              {isDomestic && (
                <div className="mt-4 bg-stone-50 rounded-2xl p-4 border border-stone-100 shadow-sm flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar Initials Badge */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-green-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm border border-white shrink-0">
                      SS
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 border border-white flex items-center justify-center">
                        <Truck size={10} className="fill-current" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-stone-900 leading-tight">คุณสมศักดิ์ ยอดนักซิ่ง</h4>
                        <div className="flex items-center gap-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          <Star size={8} className="fill-emerald-800" />
                          <span>4.9</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">Honda Click 160 · <span className="font-semibold text-stone-600">กทม 9กข-5678</span></p>
                      <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">TBC Premium Courier</p>
                    </div>
                  </div>

                  {/* Call and Chat Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="tel:021234567"
                      className="w-10 h-10 rounded-full bg-stone-950 text-white flex items-center justify-center hover:bg-stone-850 active:scale-95 shadow transition-all"
                      title={t('tracking.call_courier')}
                    >
                      <Phone size={16} />
                    </a>
                    
                    {/* Interactive Chat trigger */}
                    <button
                      type="button"
                      onClick={() => setIsChatOpen(true)}
                      className="relative w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 active:scale-95 shadow transition-all"
                      title="แชทหาคนขับ"
                    >
                      <MessageSquare size={16} />
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {sheetExpanded && (
                <div className="mt-5 pt-5 border-t border-stone-100 space-y-5 animate-in fade-in duration-300">
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-100/60">
                    <p className="text-xs font-semibold text-stone-500">
                      {lang === 'th' ? '📍 ต้นทางจัดส่ง' : '📍 Shipment Origin'}:
                    </p>
                    <p className="text-sm font-bold text-stone-800 mt-0.5">
                      {lang === 'th' ? shipment.originName : shipment.originNameEn}
                    </p>
                    <p className="text-xs font-semibold text-stone-500 mt-2">
                      {lang === 'th' ? '🏁 ปลายทางจัดส่ง' : '🏁 Destination'}:
                    </p>
                    <p className="text-sm font-bold text-stone-800 mt-0.5">{destinationLabel}</p>
                  </div>

                  <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-100">
                    {(
                      apiData?.timeline ||
                      shipment.timeline.map((s, i, arr) => ({
                        key: s.key,
                        time: s.time,
                        completed: i < arr.length - 2,
                        active: i === arr.length - 2,
                      }))
                    ).map((step, i) => (
                      <TimelineStep
                        key={`${step.key}-${i}`}
                        title={t(step.key)}
                        time={step.time.startsWith('tracking.') ? t(step.time) : step.time}
                        done={step.completed}
                        active={step.active}
                        mode={shipment.mode}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="tel:021234567"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 text-white font-bold text-sm hover:bg-stone-800 transition-colors"
                    >
                      <Phone size={16} />
                      {t('tracking.contact_carrier')}
                    </a>
                    <Link
                      href="/account"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 text-stone-800 font-bold text-sm hover:bg-stone-50 transition-colors"
                    >
                      {t('tracking.order_help')}
                    </Link>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setSheetExpanded((v) => !v)}
                className="w-full mt-4 py-1.5 flex items-center justify-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800 transition-colors focus:outline-none"
              >
                {sheetExpanded ? (
                  <>
                    <ChevronUp size={14} />
                    {t('tracking.collapse')}
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} />
                    {t('tracking.expand_details')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- Simulated Interactive Courier Chat Panel --- */}
        {isChatOpen && (
          <div className="fixed inset-0 z-[600] bg-stone-900/40 backdrop-blur-sm flex items-end justify-center sm:items-center p-0 sm:p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white rounded-t-[28px] sm:rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-stone-100 flex flex-col h-[85vh] sm:h-[600px] overflow-hidden animate-in slide-in-from-bottom duration-300">
              
              {/* Chat Header */}
              <div className="bg-stone-900 text-white px-5 py-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-extrabold text-sm border border-stone-700 shadow-sm shrink-0">
                    SS
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-stone-900 rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold leading-tight">คุณสมศักดิ์ ยอดนักซิ่ง</h3>
                    <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {lang === 'th' ? 'กำลังปฏิบัติหน้าที่' : 'Active Duty'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center hover:bg-stone-700 active:scale-90 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Safety notice */}
              <div className="bg-emerald-50 border-b border-emerald-100/50 px-4 py-2 text-[10px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <Shield size={12} className="text-emerald-500" />
                <span>{lang === 'th' ? 'แชทเข้ารหัสปลอดภัย · พนักงานขับรถได้รับการตรวจสุขภาพรายวัน' : 'Secured chat · Driver verified daily health check'}</span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    } space-y-1`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-emerald-500 text-white rounded-tr-none'
                          : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-stone-400 px-1">{msg.time}</span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isDriverTyping && (
                  <div className="flex flex-col items-start space-y-1">
                    <div className="bg-white text-stone-500 border border-stone-100 rounded-2xl rounded-tl-none px-4 py-2.5 text-xs shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                
                <div ref={chatBottomRef} />
              </div>

              {/* Quick Replies Panel */}
              <div className="bg-white border-t border-stone-100 p-4 shrink-0 space-y-3">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">
                  {lang === 'th' ? 'ส่งข้อความด่วน (Quick Reply)' : 'Quick Reply'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      disabled={isDriverTyping}
                      onClick={() => handleQuickReply(item.th, item.en)}
                      className="text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 text-stone-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 transition-all text-left disabled:opacity-50 disabled:pointer-events-none active:scale-95"
                    >
                      {lang === 'th' ? item.th : item.en}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const previewShipment = resolveShipment(
    'preview',
    mode,
    direction === 'domestic' ? 'th' : destination,
    direction
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500 font-sans pb-12">
      <div className="text-center space-y-2 px-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          {t('tracking.title')}
        </h1>
        <p className="text-stone-500 text-sm sm:text-base">
          {lang === 'th'
            ? 'ติดตามพัสดุพรีเมียมเรียลไทม์ เหมือนเรียกรถ Grab แต่สำหรับส่งไวน์ของคุณ'
            : 'Track your premium wine packages in real-time, built like Grab ride-hailing'}
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-stone-100 space-y-5">
        <div className="flex gap-2 p-1 bg-stone-100 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setDirection('export');
              setNotFound(false);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all duration-200 ${
              direction === 'export'
                ? 'bg-white shadow-md text-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Globe size={16} />
            {t('tracking.direction_export')}
          </button>
          <button
            type="button"
            onClick={() => {
              setDirection('domestic');
              setMode('local');
              setNotFound(false);
            }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all duration-200 ${
              direction === 'domestic'
                ? 'bg-white shadow-md text-stone-900'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Truck size={16} />
            {t('tracking.direction_domestic')}
          </button>
        </div>

        {direction === 'export' && (
          <div className="space-y-2">
            <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">
              {t('tracking.select_destination')}
            </p>
            <div className="flex flex-wrap gap-2">
              {EXPORT_DESTINATION_COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setDestination(c.id);
                    setNotFound(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-extrabold border transition-all duration-200 active:scale-95 ${
                    destination === c.id
                      ? 'bg-stone-950 text-white border-stone-950 shadow-md'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {c.flag} {lang === 'th' ? c.labelTh : c.labelEn}
                </button>
              ))}
            </div>
            <p className="text-xs text-stone-400 mt-1">{t('tracking.origin_thailand')}</p>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wide">
            {t('tracking.select_mode')}
          </p>
          <div className="flex flex-wrap gap-2">
            {MODES.filter((m) => availableModes.includes(m.id)).map(({ id, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setMode(id);
                  setNotFound(false);
                }}
                className={`flex items-center gap-2 px-4.5 py-3 rounded-xl text-sm font-extrabold border transition-all duration-200 active:scale-95 ${
                  mode === id
                    ? id === 'sea'
                      ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/10'
                      : id === 'air'
                        ? 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-600/10'
                        : 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/10'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Icon size={18} />
                {getModeLabel(id, lang)}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => {
              setTrackingId(e.target.value);
              setNotFound(false);
            }}
            placeholder={t('tracking.search_placeholder')}
            className="w-full pl-12 pr-32 py-4.5 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white transition-all text-lg font-bold"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-emerald-500 transition-colors" size={22} />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 active:scale-95 shadow-lg shadow-emerald-600/20 disabled:opacity-60 flex items-center gap-2 transition-all cursor-pointer"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {t('tracking.track_btn')}
          </button>
        </form>

        {notFound && (
          <div className="flex items-center gap-2.5 text-red-700 text-sm bg-red-50 border border-red-100 px-4 py-3.5 rounded-xl">
            <AlertCircle size={18} className="shrink-0" />
            <span className="font-semibold">{t('tracking.invalid_id')}</span>
          </div>
        )}

        <div className="pt-2">
          <p className="text-xs font-bold text-stone-500 mb-2.5 flex items-center gap-1">
            <Sparkles size={12} className="text-emerald-500" />
            <span>{t('tracking.demo_numbers')}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {DEMO_TRACKING_IDS.map((demo) => (
              <button
                key={demo.id}
                type="button"
                onClick={() => applyDemoId(demo.id)}
                className="text-xs font-mono px-3 py-2 rounded-lg bg-stone-50 text-stone-600 hover:bg-stone-100 hover:text-stone-900 border border-stone-200 transition-all font-bold cursor-pointer"
                title={lang === 'th' ? demo.labelTh : demo.labelEn}
              >
                {demo.id}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Preview Card */}
      <div className="rounded-3xl overflow-hidden border border-stone-100 shadow-lg bg-white p-1">
        <div className="relative">
          <TrackingMap isTracking={false} route={previewShipment?.route} mode={mode} />
          <div className="absolute bottom-4 left-4 right-4 z-[400]">
            <div className="bg-white/95 backdrop-blur rounded-2xl px-4 py-3.5 shadow-lg border border-stone-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center border border-stone-100">
                <ModeIcon mode={mode} size={20} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-stone-950 flex items-center gap-1.5">
                  <span>🇹🇭</span>
                  <span>→</span>
                  <span>
                    {direction === 'domestic'
                      ? getDestinationLabel('th', lang)
                      : getDestinationLabel(destination, lang)}
                  </span>
                  <span className="ml-1 text-xs text-stone-400 font-normal">
                    · {getModeLabel(mode, lang)}
                  </span>
                </p>
                <p className="text-xs font-semibold text-stone-500 mt-0.5">{t('tracking.preview_route')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineStep({
  title,
  time,
  done = false,
  active = false,
  mode = 'local',
}: {
  title: string;
  time: string;
  done?: boolean;
  active?: boolean;
  mode?: TransportMode;
}) {
  const ActiveIcon = mode === 'sea' ? Ship : mode === 'air' ? Plane : Truck;

  return (
    <div className="relative flex gap-4">
      <div
        className={`z-10 w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors ${
          done
            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm'
            : active
              ? 'bg-white border-emerald-500 text-emerald-600 animate-pulse shadow-md'
              : 'bg-white border-stone-200 text-stone-300'
        }`}
      >
        {done ? <CheckCircle2 size={13} /> : active ? <ActiveIcon size={11} /> : <Clock size={11} />}
      </div>
      <div>
        <p className={`font-bold text-sm ${active ? 'text-emerald-600' : 'text-stone-800'}`}>
          {title}
        </p>
        <p className="text-xs text-stone-400 font-semibold">{time}</p>
      </div>
    </div>
  );
}
