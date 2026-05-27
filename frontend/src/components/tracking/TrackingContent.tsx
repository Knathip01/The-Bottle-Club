'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';
import { fetchTracking } from '@/lib/tracking/client';
import type { TrackingApiResponse, Shipment } from '@/lib/tracking/types';
import { getDestinationLabel } from '@/lib/tracking/shipments';

// ── PREMIUM MODULAR COMPONENTS ────────────────────────────────────────────────
import TrackingHeader from './premium/TrackingHeader';
import ShipmentInfoCard from './premium/ShipmentInfoCard';
import DeliveryProgress from './premium/DeliveryProgress';
import TrackingTimeline from './premium/TrackingTimeline';
import ShipmentStatusBadge from './premium/ShipmentStatusBadge';
import LogisticsVehicleAnimation from './premium/LogisticsVehicleAnimation';
import TrackingHistoryTable from './premium/TrackingHistoryTable';

const LiveMapTracking = dynamic(() => import('./premium/LiveMapTracking'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-80 sm:h-110 bg-stone-100 dark:bg-stone-900 animate-pulse flex items-center justify-center text-stone-400 rounded-[32px] border border-stone-200/50 dark:border-stone-800/60">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-stone-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-bold text-stone-500">กำลังโหลดแผนที่ดาวเทียม...</p>
      </div>
    </div>
  ),
});

export default function TrackingContent() {
  const { language } = useLanguage();
  const [lang, setLang] = useState<'th' | 'en'>(language === 'th' ? 'th' : 'en');

  // Core tracking states
  const [trackingId, setTrackingId] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [apiData, setApiData] = useState<TrackingApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(0);

  // Control toggles
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isWebSocket, setIsWebSocket] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [recenterToken, setRecenterToken] = useState(0);

  // History table log state
  const [historyList, setHistoryList] = useState<TrackingApiResponse[]>([]);

  // Keep lang state synchronized with LanguageContext fallback
  useEffect(() => {
    setLang(language === 'th' ? 'th' : 'en');
  }, [language]);

  // Main search / fetch tracking handler
  const loadTracking = useCallback(
    async (id: string) => {
      const trimmed = id.trim();
      if (!trimmed) return;

      setLoading(true);
      setNotFound(false);

      try {
        const result = await fetchTracking({ trackingNumber: trimmed });
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
        setRecenterToken((prev) => prev + 1);

        // Add to history log if not already tracked
        setHistoryList((prev) => {
          const exists = prev.some((item) => item.tracking_number === result.api.tracking_number);
          if (exists) return prev;
          return [result.api, ...prev].slice(0, 5); // Limit logs to last 5
        });
      } catch (err) {
        console.error('[PremiumTracking] Failed to fetch:', err);
        setLoading(false);
        setNotFound(true);
      }
    },
    []
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      loadTracking(trackingId.trim());
    }
  };

  const handleHistorySelect = (id: string) => {
    setTrackingId(id);
    loadTracking(id);
  };

  // Simulated WebSocket Streaming Ticks for coordinates interpolation
  useEffect(() => {
    if (!isTracking || !isWebSocket || !shipment) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 0.98) {
          return 0.05; // Reset looping progress for infinite active animation demo
        }
        return prev + 0.015; // Glides smoothly
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isTracking, isWebSocket, shipment]);

  // Simulated auto refresh metadata sync every 30s
  useEffect(() => {
    if (!isTracking || !isAutoRefresh || !trackingId.trim()) return;

    const interval = setInterval(() => {
      fetchTracking({ trackingNumber: trackingId.trim() }).then((res) => {
        if (res) {
          setApiData(res.api);
          if (!isWebSocket) setProgress(res.api.progress);
        }
      });
    }, 30000);

    return () => clearInterval(interval);
  }, [isTracking, isAutoRefresh, trackingId, isWebSocket]);

  // Generate responsive mock summary stats
  const activeTimeline = useMemo(() => {
    if (!apiData || !shipment) return [];

    // Length of steps
    const timelineLen = apiData.timeline.length;
    return apiData.timeline.map((step, idx) => {
      const stepFraction = idx / (timelineLen - 1);
      const completed = progress >= stepFraction || idx === 0;
      const active = progress >= stepFraction && (idx === timelineLen - 1 || progress < (idx + 1) / (timelineLen - 1));

      return {
        ...step,
        completed,
        active,
      };
    });
  }, [apiData, shipment, progress]);

  // Premium UI wrapper
  return (
    <div className={isDarkMode ? 'dark bg-stone-950 min-h-screen text-stone-50 transition-colors duration-300' : 'bg-stone-50 min-h-screen text-stone-800 transition-colors duration-300'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Core Control Center Header */}
        <TrackingHeader
          trackingId={trackingId}
          setTrackingId={setTrackingId}
          onSearch={handleSearchSubmit}
          isLoading={loading}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isWebSocket={isWebSocket}
          setIsWebSocket={setIsWebSocket}
          isAutoRefresh={isAutoRefresh}
          setIsAutoRefresh={setIsAutoRefresh}
          lang={lang}
          setLang={setLang}
        />

        {notFound && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-6 py-4.5 rounded-2xl flex items-center justify-between gap-4 max-w-xl mx-auto shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <span className="font-bold text-sm">
              {lang === 'th'
                ? '⚠ ไม่พบหมายเลขพัสดุนี้ โปรดตรวจสอบหมายเลขอีกครั้ง'
                : '⚠ Tracking number not found. Please review and try again.'}
            </span>
            <button
              type="button"
              onClick={() => setNotFound(false)}
              className="text-xs font-black uppercase tracking-widest bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg"
            >
              CLOSE
            </button>
          </div>
        )}

        {/* Dynamic Double-column SaaS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Map tracking section (Full width taking 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {isTracking && shipment && apiData ? (
              <div className="space-y-6">
                
                {/* Active Map Card Header Status info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-5.5 rounded-2xl border border-stone-200/50 dark:border-stone-800/60 shadow-sm transition-all duration-300">
                  <div>
                    <span className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest leading-none block">
                      {lang === 'th' ? 'สถานะขนส่งพัสดุเรียลไทม์' : 'Active Live Transit status'}
                    </span>
                    <span className="text-xl font-black text-stone-950 dark:text-stone-50 mt-1.5 block">
                      {trackingId}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRecenterToken((n) => n + 1)}
                      className="px-4 py-2 border border-stone-200/60 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all active:scale-95 cursor-pointer text-stone-700 dark:text-stone-300"
                    >
                      {lang === 'th' ? 'กึ่งกลางแผนที่' : 'Recenter Map'}
                    </button>
                    <ShipmentStatusBadge status={apiData.status} lang={lang} />
                  </div>
                </div>

                {/* Animated Leaflet Full Map component */}
                <LiveMapTracking
                  route={shipment.route}
                  mode={shipment.mode}
                  progress={progress}
                  isDarkMode={isDarkMode}
                  recenterToken={recenterToken}
                />

                {/* Technical key values details metadata */}
                <ShipmentInfoCard
                  trackingId={shipment.id}
                  carrier={shipment.carrier}
                  insuranceStatus={shipment.insuranceStatus || ''}
                  customsStatus={shipment.customsStatus || 'none'}
                  deliveryAttempt={shipment.deliveryAttempt || ''}
                  itemCount={shipment.itemCount}
                  origin={lang === 'th' ? shipment.originName : shipment.originNameEn}
                  destination={lang === 'th' ? shipment.destinationName : shipment.destinationNameEn}
                  lastUpdated={apiData.updated_at.split('T')[1].slice(0, 8)}
                  lang={lang}
                />
              </div>
            ) : (
              /* Map Placeholder state before query loads */
              <div className="bg-white/40 dark:bg-stone-900/40 backdrop-blur-md p-10 rounded-[32px] border border-stone-200/50 dark:border-stone-800/60 shadow-lg text-center h-120 flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shadow-inner">
                  <Globe className="animate-spin [animation-duration:15s]" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-800 dark:text-stone-200 uppercase tracking-tight">
                    {lang === 'th' ? 'ระบุรหัสพัสดุสำหรับจำลองการขนส่ง' : 'Awaiting Tracking Selection'}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-sm leading-relaxed">
                    {lang === 'th'
                      ? 'ระบบติดตามพัสดุระดับสากลพร้อมเชื่อมต่อแผนที่ความร้อนและจำลอง WebSocket สตรีมมิ่งสด กรอกหมายเลขพัสดุจากทางเลือกด้านบนหรือใช้เลขพัสดุตัวอย่างเพื่อเริ่มต้นใช้งาน'
                      : 'Global shipping dashboard connected with satellite layouts. Select a carrier shortcut above or enter a tracking code to initialize coordinates.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar taking 1 column */}
          <div className="space-y-6">
            
            {isTracking && shipment && apiData ? (
              <div className="space-y-6">
                
                {/* Horizontal digital ticker progress bar */}
                <DeliveryProgress progress={progress} lang={lang} />

                {/* Continuous vehicle movement loop CSS animation */}
                <LogisticsVehicleAnimation mode={shipment.mode} lang={lang} />

                {/* 9-stage active vertical timeline highlights */}
                <TrackingTimeline timeline={activeTimeline} lang={lang} />
              </div>
            ) : null}

            {/* Recents logged history list */}
            <TrackingHistoryTable
              history={historyList}
              onSelect={handleHistorySelect}
              lang={lang}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
