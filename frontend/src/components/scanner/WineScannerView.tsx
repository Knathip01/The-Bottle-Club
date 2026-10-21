'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Webcam from 'react-webcam';
import {
  Camera, Upload, Sparkles, X, RotateCcw, Wine, ShieldCheck,
  AlertTriangle, ExternalLink, MapPin, CalendarDays, Globe, Star,
  CheckCircle2, ArrowRight, ShieldAlert, Award, Zap, Compass, RefreshCw
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Winery } from '@/data/wineriesData';

export interface WineScanApiResponse {
  is_authentic_wine: boolean;
  authenticity_score?: number;
  authenticity_notes_th?: string;
  is_winery_matched?: boolean;
  matched_winery?: Winery | null;
  winery_match_confidence?: number;
  winery_matched_by?: string;
  winery_mismatch_message?: string;
  producer?: string;
  name: string;
  vintage: string;
  country: string;
  country_th?: string;
  region: string;
  region_th?: string;
  city: string;
  city_th?: string;
  type: string;
  type_th?: string;
  grape: string;
  alcohol: string;
  description_th: string;
  price_estimate: number;
  rating: number;
  confidence: number;
  notes: string[];
  city_image_query?: string;
  error?: string;
  message?: string;
  reason?: string;
}

const COUNTRY_FLAG_MAP: Record<string, string> = {
  'France': '🇫🇷', 'Italy': '🇮🇹', 'Spain': '🇪🇸', 'Australia': '🇦🇺',
  'USA': '🇺🇸', 'United States': '🇺🇸', 'Chile': '🇨🇱', 'Argentina': '🇦🇷',
  'Germany': '🇩🇪', 'New Zealand': '🇳🇿', 'Portugal': '🇵🇹', 'South Africa': '🇿🇦',
  'Austria': '🇦🇹', 'Greece': '🇬🇷', 'Hungary': '🇭🇺', 'Japan': '🇯🇵',
  'Thailand': '🇹🇭', 'China': '🇨🇳',
};

interface WineScannerViewProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function WineScannerView({ onClose, isModal = false }: WineScannerViewProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<WineScanApiResponse | null>(null);
  const [scanError, setScanError] = useState<{ title: string; message: string; isNotWine?: boolean } | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [telemetryText, setTelemetryText] = useState('READY TO SCAN');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Switch camera between front / back
  const toggleCamera = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Reset scan state
  const resetScan = () => {
    setScanResult(null);
    setScanError(null);
    setPreviewImage(null);
    setCityImageUrl(null);
    setIsScanning(false);
    setTelemetryText('READY TO SCAN');
  };

  // Execute AI scan via backend API
  const runScan = useCallback(async (base64DataUrl: string) => {
    setIsScanning(true);
    setScanError(null);
    setScanResult(null);
    setPreviewImage(base64DataUrl);

    const steps = [
      'CAPTURING BOTTLE GEOMETRY & APERTURE...',
      'VERIFYING AUTHENTICITY & VINTAGE SEAL...',
      'SEARCHING /WINERIES PARTNER CATALOG...',
      'EVALUATING TERROIR & SOMMELIER PROFILE...',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setTelemetryText(step);
      }, (idx + 1) * 650);
    });

    try {
      const res = await fetch('/api/wine-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: base64DataUrl }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        if (data.error === 'not_authentic_wine' || data.error === 'not_wine') {
          setScanError({
            title: 'ไม่ใช่ขวดไวน์แท้ / Unverified Bottle',
            message: data.reason || data.message || 'ระบบตรวจจับไม่พบฉลากไวน์แท้ หรือพบว่าเป็นสินค้าชนิดอื่นที่ไม่ใช่ไวน์แท้ (ระบบอนุญาตเฉพาะขวดไวน์แท้เท่านั้น)',
            isNotWine: true,
          });
        } else {
          setScanError({
            title: 'เกิดข้อผิดพลาดในการสแกน',
            message: data.message || 'ไม่สามารถวิเคราะห์ฉลากไวน์ได้ กรุณาลองใหม่อีกครั้ง',
          });
        }
        setIsScanning(false);
        setTelemetryText('SCAN REJECTED');
        return;
      }

      const result = data as WineScanApiResponse;
      setScanResult(result);
      setTelemetryText('NEURAL SCAN COMPLETE ✓');

      if (result.city_image_query) {
        setCityImageUrl(`https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=450&fit=crop&q=80`);
      }
    } catch {
      setScanError({
        title: 'การเชื่อมต่อขัดข้อง',
        message: 'ไม่สามารถติดต่อเซิร์ฟเวอร์ AI ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่',
      });
      setTelemetryText('CONNECTION ERROR');
    } finally {
      setIsScanning(false);
    }
  }, []);

  // Capture frame from webcam
  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        runScan(imageSrc);
      } else {
        setScanError({
          title: 'ไม่สามารถเปิดกล้องได้',
          message: 'กรุณาอนุญาตการเข้าถึงกล้องบนอุปกรณ์ของคุณ หรือใช้วิธีอัปโหลดรูปภาพ',
        });
      }
    } else {
      setScanError({
        title: 'ไม่พบกล้อง',
        message: 'กรุณาอัปโหลดรูปภาพฉลากขวดไวน์แทนการถ่ายรูป',
      });
    }
  }, [webcamRef, runScan]);

  // Upload file from camera roll / files
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageSrc = reader.result as string;
        runScan(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick 1-click test samples (Demonstration)
  const handleSampleTest = async (sampleType: 'vina_loriente' | 'chateau_margaux' | 'non_wine') => {
    // Generate a quick base64 sample representation or simulate prompt
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (sampleType === 'non_wine') {
      // Draw a fake soda can / orange drink
      ctx.fillStyle = '#f97316';
      ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 48px sans-serif';
      ctx.fillText('ORANGE SODA CAN', 80, 400);
      ctx.font = '24px sans-serif';
      ctx.fillText('Non-Alcoholic Soft Drink 330ml', 110, 460);
    } else if (sampleType === 'vina_loriente') {
      // Draw Viña Loriente Tempranillo label
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 44px serif';
      ctx.fillText('VIÑA LORIENTE', 130, 320);
      ctx.fillStyle = '#ffffff';
      ctx.font = '30px serif';
      ctx.fillText('Tempranillo 2018', 180, 380);
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#a8a29e';
      ctx.fillText('Santa Ynez Valley, California', 170, 430);
      ctx.fillText('Estate Bottled - 14.2% Vol', 185, 470);
    } else {
      // Draw Château Margaux label
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 600, 800);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 40px serif';
      ctx.fillText('CHÂTEAU MARGAUX', 90, 320);
      ctx.fillStyle = '#ffffff';
      ctx.font = '28px serif';
      ctx.fillText('Premier Grand Cru Classé 2015', 105, 380);
      ctx.font = '22px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText('Appellation Margaux Contrôlée', 135, 430);
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    runScan(dataUrl);
  };

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode,
  };

  return (
    <div className={`relative w-full ${isModal ? 'fixed inset-0 z-50 overflow-y-auto' : 'min-h-[85vh]'} bg-[#0a0806] text-white flex flex-col items-center justify-start select-none`}>
      {/* Background Graphic Pattern Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-screen"
        style={{ backgroundImage: "url('/images/scan-bg-pattern.jpg')" }}
      />

      {/* Ambient Luxury Dark Red & Gold Backlighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-amber-600/20 via-red-950/20 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[65%] h-[65%] rounded-full bg-gradient-to-tl from-red-900/25 via-amber-600/15 to-transparent blur-[160px]" />
        <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] rounded-full bg-yellow-500/10 blur-[120px]" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            <div className="w-full h-full bg-stone-950 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src="/logos/Thebottleclub.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black uppercase tracking-wider text-white font-serif">
                The Bottle Club AI Scanner
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 text-[9px] font-black uppercase tracking-widest shadow-sm">
                Authentic Only
              </span>
            </div>
            <p className="text-[11px] text-amber-200/70 font-medium">
              สแกนขวดไวน์แท้ และเชื่อมโยงข้อมูลโรงไวน์พันธมิตรจาก /wineries
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2.5 bg-stone-900/80 hover:bg-stone-800 text-amber-300 hover:text-white rounded-2xl border border-amber-400/30 backdrop-blur-2xl transition cursor-pointer active:scale-95 shadow-lg"
            aria-label="Close Scanner"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-4xl px-4 sm:px-6 py-4 flex-1 flex flex-col items-center justify-center">

        {/* ── State 1: Scan Error or Not Authentic Wine ── */}
        {scanError ? (
          <div className="w-full max-w-lg bg-stone-950/90 border border-red-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(239,68,68,0.2)] text-center animate-in zoom-in-95 duration-300 my-auto">
            <div className="w-18 h-18 rounded-3xl bg-red-500/10 border border-red-400/40 flex items-center justify-center mx-auto mb-5 text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.25)]">
              {scanError.isNotWine ? <ShieldAlert size={36} /> : <AlertTriangle size={36} />}
            </div>

            <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-[10px] font-black uppercase tracking-widest mb-3">
              {scanError.isNotWine ? 'ตรวจจับเฉพาะขวดไวน์แท้เท่านั้น' : 'การสแกนไม่สำเร็จ'}
            </span>

            <h3 className="text-xl font-black text-white font-serif mb-2">
              {scanError.title}
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed mb-6 px-2">
              {scanError.message}
            </p>

            {previewImage && (
              <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border border-red-500/30 mb-6 relative">
                <img src={previewImage} alt="Captured" className="w-full h-full object-cover filter grayscale contrast-125" />
                <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
                  <X size={32} className="text-red-400 drop-shadow-md" />
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={resetScan}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-[0_10px_25px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
              >
                <RotateCcw size={16} /> สแกนใหม่อีกครั้ง
              </button>
              <button
                onClick={() => router.push('/wineries')}
                className="px-6 py-4 bg-stone-900 border border-amber-400/30 text-amber-200 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-stone-800 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition"
              >
                <Compass size={16} /> ดูโรงไวน์ที่รองรับทั้งหมด
              </button>
            </div>
          </div>
        ) : scanResult ? (
          /* ── State 2: Result Verified (Authentic Wine with Winery Match Check) ── */
          <div className="w-full max-w-2xl bg-gradient-to-b from-stone-900/90 via-stone-950/95 to-[#0b0805]/95 border border-amber-400/40 rounded-[2.5rem] p-5 sm:p-7 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.15)] animate-in fade-in duration-300 space-y-6">

            {/* Top Authenticity Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-400/20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-400/40 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <CheckCircle2 size={16} className="text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider">
                  ตรวจพบขวดไวน์แท้ (Authentic Wine Bottle)
                </span>
              </div>

              <div className="flex items-center gap-2 text-stone-400 text-xs">
                <span>ความแม่นยำ AI:</span>
                <span className="font-mono font-black text-amber-300 bg-black/60 px-2 py-0.5 rounded-lg border border-amber-400/30">
                  {scanResult.confidence?.toFixed(1) || '95.0'}%
                </span>
              </div>
            </div>

            {/* ── WINERY MATCHING VERIFICATION RESULT ── */}
            {scanResult.is_winery_matched && scanResult.matched_winery ? (
              /* MATCHED: Show Grand Winery Card */
              <div className="rounded-3xl border-2 border-amber-400/60 bg-gradient-to-br from-amber-950/30 via-stone-900/70 to-stone-950 p-5 shadow-[0_15px_40px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-amber-400" />
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-amber-300">
                      โรงไวน์พันธมิตร The Bottle Club ที่ตรงกัน
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-400/50 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                    {scanResult.winery_match_confidence || 100}% ตรงกับ /wineries
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {scanResult.matched_winery.logo_image ? (
                    <img
                      src={scanResult.matched_winery.logo_image}
                      alt={scanResult.matched_winery.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400/50 shadow-xl bg-stone-900 flex-shrink-0"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0">
                      <Wine size={32} className="text-amber-400" />
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-tight">
                      {scanResult.matched_winery.name}
                    </h2>
                    <p className="text-xs text-amber-200/90 font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                      <span>{COUNTRY_FLAG_MAP[scanResult.matched_winery.country_name] || '🌍'}</span>
                      <span>{scanResult.matched_winery.country_name}</span>
                      <span>·</span>
                      <span className="text-stone-300">{scanResult.matched_winery.region_name}</span>
                    </p>
                    {scanResult.matched_winery.description && (
                      <p className="text-xs text-stone-300 leading-relaxed mt-2 line-clamp-3">
                        {scanResult.matched_winery.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Winery's available wines */}
                {scanResult.matched_winery.wines && scanResult.matched_winery.wines.length > 0 && (
                  <div className="pt-2 border-t border-amber-400/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Sparkles size={12} /> ไวน์ที่ผลิตโดยโรงนี้ ({scanResult.matched_winery.wines_count || scanResult.matched_winery.wines.length} รายการ)
                      </span>
                      <Link
                        href={`/wineries/${scanResult.matched_winery.seo_name}`}
                        className="text-[10px] text-amber-400 hover:text-amber-300 underline font-bold"
                      >
                        ดูทั้งหมด
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {scanResult.matched_winery.wines.slice(0, 4).map((w) => (
                        <div
                          key={w.id}
                          className="bg-black/40 border border-amber-400/20 rounded-2xl p-2.5 flex flex-col items-center text-center gap-1.5 hover:border-amber-400/50 transition"
                        >
                          {w.image ? (
                            <img src={w.image} alt={w.name} className="h-16 object-contain" />
                          ) : (
                            <div className="h-16 flex items-center justify-center">
                              <Wine size={24} className="text-amber-500/60" />
                            </div>
                          )}
                          <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                            {w.name}
                          </p>
                          <span className="text-xs font-black font-serif text-amber-300">
                            ฿{w.price?.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Direct CTA to Winery Page */}
                <Link
                  href={`/wineries/${scanResult.matched_winery.seo_name}`}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-2xl shadow-[0_10px_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                >
                  <ExternalLink size={16} /> ไปที่หน้ารายละเอียดโรงไวน์ {scanResult.matched_winery.name}
                </Link>
              </div>
            ) : (
              /* UNMATCHED: Authentic wine, but NOT matching our /wineries database */
              <div className="rounded-3xl border border-amber-500/40 bg-amber-950/20 p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-amber-300">
                  <AlertTriangle size={20} className="text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-wider">
                      ไม่พบข้อมูลโรงไวน์ในระบบ The Bottle Club
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      ขวดไวน์นี้เป็นไวน์แท้ ({scanResult.name}) แต่ชื่อขวดไวน์หรือผู้ผลิตไม่ตรงกับโรงไวน์ใดในระบบ /wineries ของเรา
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-black/40 rounded-2xl text-[11px] text-stone-400 leading-relaxed border border-white/5">
                  <span className="font-bold text-amber-300">ข้อกำหนดระบบ:</span> ตามนโยบายการสแกน ข้อมูลโรงไวน์จะแสดงผลเมื่อชื่อขวดไวน์ตรงกับโรงไวน์ที่ขึ้นทะเบียนใน The Bottle Club เท่านั้น
                </div>
              </div>
            )}

            {/* Scanned Wine Bottle Details */}
            <div className="bg-stone-900/60 rounded-3xl p-5 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase">
                      {scanResult.type_th || scanResult.type}
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                      Vintage {scanResult.vintage}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-serif">
                    {scanResult.name}
                  </h3>
                  <p className="text-xs text-amber-200/80 mt-1">
                    {COUNTRY_FLAG_MAP[scanResult.country] || '🌍'} {scanResult.country_th || scanResult.country} · {scanResult.region_th || scanResult.region}
                  </p>
                </div>

                <div className="sm:text-right bg-amber-500/10 sm:bg-transparent p-3 sm:p-0 rounded-2xl w-full sm:w-auto">
                  <span className="text-[9px] uppercase tracking-wider text-amber-400/80 font-bold block">
                    ราคาประเมินตลาด
                  </span>
                  <span className="text-2xl font-black font-serif text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
                    ฿{scanResult.price_estimate?.toLocaleString() || '1,500'}
                  </span>
                </div>
              </div>

              {/* Grape & Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                  <span className="text-[9px] text-stone-400 uppercase font-bold block">พันธุ์องุ่น</span>
                  <span className="text-xs font-black text-white truncate block">{scanResult.grape || 'Cabernet Sauvignon'}</span>
                </div>
                <div className="bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                  <span className="text-[9px] text-stone-400 uppercase font-bold block">แอลกอฮอล์</span>
                  <span className="text-xs font-black text-amber-300 block">{scanResult.alcohol || '13.5%'}</span>
                </div>
                <div className="col-span-2 sm:col-span-1 bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                  <span className="text-[9px] text-stone-400 uppercase font-bold block">คะแนนชิมสากล</span>
                  <span className="text-xs font-black text-yellow-400 flex items-center justify-center gap-1">
                    <Star size={12} className="fill-yellow-400" /> {scanResult.rating?.toFixed(1) || '4.5'} / 5.0
                  </span>
                </div>
              </div>

              {/* Tasting Notes */}
              {scanResult.notes && scanResult.notes.length > 0 && (
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-400/80 block mb-1.5">
                    Tasting Profile Notes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.notes.map((note, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-3 py-1 rounded-xl bg-amber-950/40 border border-amber-400/30 text-amber-200"
                      >
                        🍷 {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sommelier Note */}
              {scanResult.description_th && (
                <div className="bg-black/40 rounded-2xl p-3 border-l-4 border-l-amber-400 text-xs text-stone-300 leading-relaxed">
                  <span className="font-bold text-amber-300 block mb-1">บทวิเคราะห์ซอมเมลิเยร์:</span>
                  {scanResult.description_th}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => router.push('/product')}
                className="flex-1 py-4 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
              >
                <Wine size={16} /> สั่งซื้อไวน์ในคลังสินค้า The Bottle Club
              </button>
              <button
                onClick={resetScan}
                className="py-4 px-6 bg-stone-900 border border-amber-400/30 text-amber-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-stone-800 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
              >
                <RotateCcw size={16} /> สแกนขวดอื่น
              </button>
            </div>
          </div>
        ) : (
          /* ── State 3: Live Viewfinder / Camera Ready ── */
          <div className="w-full flex flex-col items-center space-y-5 my-auto">

            {/* Viewfinder Card */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden border-2 border-amber-400/40 bg-stone-950 shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.2)]">

              {!cameraError ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMediaError={() => setCameraError('no-camera')}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-950">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-3">
                    <Camera size={32} className="text-amber-400" />
                  </div>
                  <p className="text-sm text-white font-bold mb-1">กล้องไม่พร้อมใช้งาน</p>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    กรุณาอนุญาตการเข้าถึงกล้อง หรืออัปโหลดรูปภาพฉลากขวดไวน์โดยตรง
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-amber-500/20 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-amber-500/30 transition cursor-pointer"
                  >
                    เลือกรูปภาพจากเครื่อง
                  </button>
                </div>
              )}

              {/* Viewfinder HUD Overlays */}
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Vignette border */}
                <div className="absolute inset-0 border-[28px] sm:border-[36px] border-black/55 backdrop-blur-[0.5px]" />

                {/* Top Logo */}
                <div className="absolute top-4 inset-x-0 flex items-center justify-center">
                  <div className="px-3 py-1 rounded-full bg-black/75 border border-amber-400/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Sparkles size={12} className="text-amber-400 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-200">
                      BOTTLECLUB AUTHENTICITY AI
                    </span>
                  </div>
                </div>

                {/* Glowing Corner HUD Brackets */}
                <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-400 rounded-tl-xl shadow-[0_0_15px_#f59e0b]" />
                <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-400 rounded-tr-xl shadow-[0_0_15px_#f59e0b]" />
                <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-400 rounded-bl-xl shadow-[0_0_15px_#f59e0b]" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-400 rounded-br-xl shadow-[0_0_15px_#f59e0b]" />

                {/* Central Target Alignment Reticle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-72 border border-amber-400/30 rounded-3xl flex flex-col items-center justify-between p-4">
                  <span className="text-[9px] font-mono text-amber-300/60 uppercase tracking-widest">
                    ALIGN WINE LABEL
                  </span>
                  <div className={`w-28 h-28 rounded-full border border-amber-400/40 transition-all duration-700 ${isScanning ? 'scale-125 opacity-30' : 'scale-100 opacity-80 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.25)]'}`} />
                  <span className="text-[9px] font-mono text-amber-300/60 uppercase tracking-widest">
                    VERIFYING VINTAGE
                  </span>
                </div>

                {/* Scanning Laser Line Sweep Animation */}
                {isScanning && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_20px_#f59e0b,0_0_40px_#fbbf24] animate-[scan_2s_ease-in-out_infinite] z-30" />
                )}

                {/* Telemetry Status Bar */}
                <div className="absolute bottom-4 inset-x-6 text-center bg-black/85 backdrop-blur-2xl border border-amber-400/30 py-2.5 px-4 rounded-2xl shadow-xl">
                  <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-amber-300 animate-pulse">
                    {telemetryText}
                  </p>
                </div>
              </div>
            </div>

            {/* Scan Controls */}
            <div className="flex items-center justify-center gap-4 pt-1">
              {/* Camera Flip Button */}
              <button
                type="button"
                onClick={toggleCamera}
                disabled={isScanning}
                title="สลับกล้องหน้า/หลัง"
                className="w-13 h-13 rounded-full bg-stone-900/90 border border-amber-400/30 flex items-center justify-center text-amber-300 hover:text-white shadow-lg active:scale-95 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw size={20} />
              </button>

              {/* Main Shutter Button */}
              <button
                type="button"
                disabled={isScanning}
                onClick={handleCapture}
                className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-1 shadow-[0_0_40px_rgba(245,158,11,0.65)] active:scale-95 transition cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                <div className="w-full h-full border-2 border-amber-300/80 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden p-2">
                  <img
                    src="/logos/bottle-walking-icon.png"
                    alt="Scan Wine"
                    className="w-full h-full object-contain"
                  />
                </div>
              </button>

              {/* File Upload Button */}
              <button
                type="button"
                disabled={isScanning}
                onClick={() => fileInputRef.current?.click()}
                title="อัปโหลดรูปภาพฉลาก"
                className="w-13 h-13 rounded-full bg-stone-900/90 border border-amber-400/30 flex items-center justify-center text-amber-300 hover:text-white shadow-lg active:scale-95 transition cursor-pointer disabled:opacity-50"
              >
                <Upload size={20} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Quick Demonstration Samples for User / Tester */}
            <div className="w-full max-w-md pt-3 border-t border-white/10 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400 mb-2">
                ทดสอบด่วน (1-Click Sample Test)
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSampleTest('vina_loriente')}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200 text-[10px] font-bold hover:bg-amber-500/20 transition cursor-pointer active:scale-95"
                >
                  🍷 ขวด Viña Loriente (ตรงกับ /wineries)
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSampleTest('chateau_margaux')}
                  className="px-3 py-1.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-[10px] font-bold hover:bg-stone-700 transition cursor-pointer active:scale-95"
                >
                  🍷 Château Margaux
                </button>
                <button
                  type="button"
                  disabled={isScanning}
                  onClick={() => handleSampleTest('non_wine')}
                  className="px-3 py-1.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-[10px] font-bold hover:bg-red-900/40 transition cursor-pointer active:scale-95"
                >
                  🚫 ทดสอบน้ำอัดลม (ไม่ใช่ไวน์แท้)
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 10%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
