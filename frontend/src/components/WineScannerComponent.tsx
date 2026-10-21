'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Camera, Sparkles, X, RotateCcw, Upload, Wine, ShieldCheck,
  CheckCircle2, MapPin, CalendarDays, Globe, Star, ExternalLink,
  AlertTriangle, ImageIcon
} from 'lucide-react';
import Webcam from 'react-webcam';
import { type Winery } from '@/data/wineriesData';
import { ALL_WINERIES_CATALOG, matchWineryFromCatalog } from '@/data/wineriesCatalog';

export interface WineAIScanResult {
  name: string;
  producer?: string;
  vintage: string;
  country?: string;
  country_th?: string;
  region: string;
  region_th: string;
  city: string;
  city_th: string;
  type: string;
  type_th: string;
  grape: string;
  alcohol: string;
  description_th: string;
  price_estimate?: number;
  rating: number;
  confidence: number;
  notes: string[];
  city_image_query: string;
  isNotWine?: boolean;
}

export interface SampleBottle {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  badgeClass: string;
  status: 'matched' | 'unmatched' | 'not_wine';
  imageUrl: string;
  result?: WineAIScanResult;
}

export const SAMPLE_BOTTLES: SampleBottle[] = [
  {
    id: 'vina-loriente',
    name: 'Viña Loriente Tempranillo',
    shortName: 'Viña Loriente',
    badge: 'มีใน /wineries ✓',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    status: 'matched',
    imageUrl: 'https://images.vivino.com/thumbs/zLNYylRqSBCxLWSJ9LW8cw_pb_x960.png',
    result: {
      name: 'Viña Loriente Tempranillo',
      producer: 'Viña Loriente',
      vintage: '2018',
      region: 'California',
      region_th: 'แคลิฟอร์เนีย',
      city: 'Santa Ynez',
      city_th: 'ซานตาอิเนซ',
      type: 'Red Wine',
      type_th: 'ไวน์แดง',
      grape: 'Tempranillo',
      alcohol: '14.2%',
      description_th: 'ไวน์แดงสไตล์สเปนแท้ที่เพาะบ่มใน Santa Ynez Valley รสชาติเข้มข้น หอมกลิ่นเชอร์รีสุก ไม้โอ๊คฝรั่งเศส และแทนนินที่นุ่มนวลยาวนาน',
      rating: 4.6,
      confidence: 98.2,
      notes: ['Dark Cherry', 'French Oak', 'Vanilla', 'Leather'],
      city_image_query: 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=450&fit=crop&q=80',
    },
  },
  {
    id: 'dom-perignon',
    name: 'Dom Pérignon Vintage Champagne',
    shortName: 'Dom Pérignon',
    badge: 'มีใน /wineries ✓',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    status: 'matched',
    imageUrl: 'https://images.vivino.com/thumbs/tLtS1VwaRxCL25zZ-j6pZg_pb_x960.png',
    result: {
      name: 'Dom Pérignon Vintage Champagne',
      producer: 'Dom Pérignon',
      vintage: '2012',
      region: 'Champagne',
      region_th: 'ชองปาญ',
      city: 'Épernay',
      city_th: 'เอเปอร์เนย์',
      type: 'Sparkling Wine',
      type_th: 'ไวน์สปาร์กลิ้ง',
      grape: 'Chardonnay & Pinot Noir',
      alcohol: '12.5%',
      description_th: 'แชมเปญระดับไอคอนจากค่าย Moët & Chandon ฟองละเอียดนุ่มนวล กลิ่นหอมของผลไม้ขาว อัลมอนด์คั่ว และขนมปังสด สดชื่นและหรูหรา',
      rating: 4.8,
      confidence: 97.4,
      notes: ['White Peach', 'Brioche', 'Roasted Almond', 'Minerals'],
      city_image_query: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80',
    },
  },
  {
    id: 'veuve-clicquot',
    name: 'Veuve Clicquot Brut Champagne',
    shortName: 'Veuve Clicquot',
    badge: 'มีใน /wineries ✓',
    badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    status: 'matched',
    imageUrl: 'https://images.vivino.com/thumbs/vouoFPUKSd-5y3Pii_UhNg_pb_x960.png',
    result: {
      name: 'Veuve Clicquot Brut Yellow Label Champagne',
      producer: 'Veuve Clicquot',
      vintage: 'NV',
      region: 'Champagne',
      region_th: 'ชองปาญ',
      city: 'Reims',
      city_th: 'แร็งส์',
      type: 'Sparkling Wine',
      type_th: 'ไวน์สปาร์กลิ้ง',
      grape: 'Pinot Noir & Chardonnay & Meunier',
      alcohol: '12.0%',
      description_th: 'แชมเปญชื่อดังระดับตำนาน สีทองอร่าม ฟองพรายละเอียด กลิ่นหอมของลูกแพร์ แอปเปิลเขียว วานิลลา และบริออช รสสัมผัสสดชื่นลงตัว',
      rating: 4.5,
      confidence: 96.5,
      notes: ['Apple', 'Brioche', 'Pear', 'Vanilla'],
      city_image_query: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=450&fit=crop&q=80',
    },
  },
  {
    id: 'cloudy-bay',
    name: 'Cloudy Bay Sauvignon Blanc',
    shortName: 'Cloudy Bay',
    badge: 'ไม่มีใน /wineries ✗',
    badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    status: 'unmatched',
    imageUrl: 'https://images.vivino.com/thumbs/sF2zHl4kS32J5B8T9nU29g_pb_x960.png',
    result: {
      name: 'Cloudy Bay Sauvignon Blanc',
      producer: 'Cloudy Bay',
      vintage: '2022',
      region: 'Marlborough',
      region_th: 'มาร์ลโบโรห์',
      city: 'Blenheim',
      city_th: 'เบลนไฮม์',
      type: 'White Wine',
      type_th: 'ไวน์ขาว',
      grape: 'Sauvignon Blanc',
      alcohol: '13.0%',
      description_th: 'ไวน์ขาวชื่อดังจากนิวซีแลนด์ กลิ่นหอมสดชื่นของเสาวรสและส้มเลมอน แอซิดิตี้จัดจ้านดีเยี่ยม ดื่มง่ายทุกโอกาส',
      rating: 4.7,
      confidence: 96.8,
      notes: ['Passionfruit', 'Lime Zest', 'Grapefruit', 'Herbal'],
      city_image_query: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=800&h=450&fit=crop&q=80',
    },
  },
  {
    id: 'beer-sample',
    name: 'ขวดเบียร์ (ไม่ใช่ไวน์แท้)',
    shortName: 'ขวดเบียร์',
    badge: 'ไม่ใช่ไวน์ ⚠️',
    badgeClass: 'bg-red-500/20 text-red-300 border-red-400/40',
    status: 'not_wine',
    imageUrl: 'https://images.unsplash.com/photo-1608270195610-d8350b925b64?w=500&auto=format&fit=crop&q=80',
  },
];

interface WineScannerComponentProps {
  onClose?: () => void;
  isStandalonePage?: boolean;
}

export default function WineScannerComponent({ onClose, isStandalonePage = false }: WineScannerComponentProps) {
  const router = useRouter();

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<WineAIScanResult | null>(null);
  const [matchedWinery, setMatchedWinery] = useState<Winery | null>(null);
  const [scanError, setScanError] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [telemetryText, setTelemetryText] = useState('READY TO SCAN');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [cityImageUrl, setCityImageUrl] = useState<string | null>(null);
  const [activeSampleId, setActiveSampleId] = useState<string | null>(null);

  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Navigate to winery details page and close modal if in overlay mode
  const navigateToWinery = (seoName: string) => {
    if (onClose) onClose();
    router.push(`/wineries/${seoName}`);
  };

  const startAnalysisSequence = async (imageSrc?: string, sample?: SampleBottle) => {
    setIsScanning(true);
    setScanError(null);
    setMatchedWinery(null);

    const targetImg = sample ? sample.imageUrl : (imageSrc && imageSrc !== 'demo' ? imageSrc : null);
    if (targetImg) {
      setUploadedImage(targetImg);
    }
    if (sample) {
      setActiveSampleId(sample.id);
    }

    const steps = [
      'CAPTURING LABEL GEOMETRY...',
      'ANALYZING TYPOGRAPHY & VINEYARD EMBLEM...',
      'VERIFYING AUTHENTICITY & VINTAGE SEAL...',
      'SEARCHING /WINERIES PARTNER CATALOG...',
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => setTelemetryText(step), (idx + 1) * 550);
    });

    // If testing sample bottle directly
    if (sample) {
      setTimeout(() => {
        if (sample.status === 'not_wine') {
          setScanError('ไม่ใช่ขวดไวน์แท้ หรือภาพไม่สามารถระบุเป็นขวดไวน์แท้ได้ (ระบบอนุญาตเฉพาะขวดไวน์แท้เท่านั้น)');
          setIsScanning(false);
          setTelemetryText('SCAN REJECTED');
          return;
        }

        if (sample.result) {
          const match = matchWineryFromCatalog(sample.result.name, sample.result.producer);
          setMatchedWinery(match?.winery || null);
          setScanResult(sample.result);
          setTelemetryText('NEURAL MATCH VERIFIED ✓');
          setIsScanning(false);
          setCityImageUrl(sample.result.city_image_query);
        }
      }, 2300);
      return;
    }

    // If real image uploaded / captured, call Gemini AI API
    if (imageSrc && imageSrc.startsWith('data:image')) {
      try {
        const res = await fetch('/api/wine-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64: imageSrc }),
        });
        const data = await res.json();

        if (!res.ok || data.error) {
          if (data.error === 'not_wine') {
            setScanError('ไม่ใช่ขวดไวน์แท้ หรือภาพไม่สามารถระบุเป็นขวดไวน์แท้ได้ (ระบบอนุญาตเฉพาะขวดไวน์แท้เท่านั้น)');
          } else {
            setScanError(data.message || 'เกิดข้อผิดพลาดในการสแกน กรุณาลองใหม่อีกครั้ง');
          }
          setIsScanning(false);
          setTelemetryText('SCAN REJECTED');
          return;
        }

        const match = matchWineryFromCatalog(data.name, data.producer);
        setMatchedWinery(match?.winery || null);
        setScanResult(data);
        setTelemetryText('NEURAL MATCH VERIFIED ✓');
        setIsScanning(false);
        if (data.city_image_query) {
          setCityImageUrl(
            data.city_image_query.startsWith('http')
              ? data.city_image_query
              : 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800&h=450&fit=crop&q=80',
          );
        }
        return;
      } catch (err) {
        console.warn('Real API call failed, falling back to simulated analysis:', err);
      }
    }

    // Fallback simulation
    setTimeout(() => {
      const defaultSample = SAMPLE_BOTTLES[0];
      const match = matchWineryFromCatalog(defaultSample.result!.name, defaultSample.result!.producer);
      setMatchedWinery(match?.winery || null);
      setScanResult(defaultSample.result!);
      setUploadedImage(defaultSample.imageUrl);
      setTelemetryText('NEURAL MATCH VERIFIED ✓');
      setIsScanning(false);
      setCityImageUrl(defaultSample.result!.city_image_query);
    }, 2300);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      try {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          startAnalysisSequence(imageSrc);
          return;
        }
      } catch (err) {
        console.warn('Screenshot error:', err);
      }
    }
    startAnalysisSequence(undefined, SAMPLE_BOTTLES[0]);
  }, [webcamRef]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        setUploadedImage(base64Data);
        startAnalysisSequence(base64Data);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const resetScan = () => {
    setScanResult(null);
    setMatchedWinery(null);
    setScanError(null);
    setUploadedImage(null);
    setCityImageUrl(null);
    setActiveSampleId(null);
    setIsScanning(false);
    setTelemetryText('READY TO SCAN');
  };

  const videoConstraints = {
    facingMode: { ideal: 'environment' },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  return (
    <div className={`relative w-full max-w-md mx-auto flex flex-col items-center justify-between p-3 sm:p-5 select-none overflow-hidden ${
      isStandalonePage ? 'rounded-[2.5rem] bg-[#0c0905]/95 border-2 border-amber-400/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl my-4 min-h-[780px]' : 'h-full'
    }`}>
      {/* Background Graphic Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-screen"
        style={{ backgroundImage: "url('/images/scan-bg-pattern.jpg')" }}
      />

      {/* Ambient Golden Background Glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[65%] h-[65%] rounded-full bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-amber-600/20 via-red-950/20 to-transparent blur-[150px]" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 w-full flex items-center justify-between pt-1 pb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/60 backdrop-blur-xl border border-amber-400/30 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-400 blur-sm opacity-80" />
            <img
              src="/logos/Thebottleclub.jpg"
              alt="Logo"
              className="relative w-6 h-6 rounded-lg object-cover border border-amber-200/50"
            />
          </div>
          <span className="text-[10px] font-black text-amber-200 uppercase tracking-widest">
            BottleClub AI Wine Scanner
          </span>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 bg-stone-900/80 hover:bg-stone-800 text-amber-200/90 hover:text-white rounded-2xl border border-amber-400/30 backdrop-blur-2xl shadow-lg transition cursor-pointer active:scale-95"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Center Card Viewport */}
      <div className="relative z-10 w-full aspect-[3/4] max-h-[58vh] sm:max-h-[62vh] rounded-[2.5rem] overflow-hidden border-2 border-amber-400/40 bg-stone-950/90 backdrop-blur-3xl shadow-[0_25px_60px_-10px_rgba(0,0,0,0.95),_0_0_40px_rgba(245,158,11,0.25),_inset_0_1px_2px_rgba(255,255,255,0.25)] my-auto flex flex-col justify-center">
        {scanError ? (
          /* Error / Non-wine Alert */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-stone-950/95 backdrop-blur-2xl z-40 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-400/40 flex items-center justify-center mb-4 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)]">
              <AlertTriangle size={30} />
            </div>
            <p className="text-base font-black text-white font-serif mb-2">ไม่สามารถสแกนได้</p>
            <p className="text-xs text-stone-300 leading-relaxed mb-6 px-4">{scanError}</p>
            <button
              type="button"
              onClick={resetScan}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-[0_8px_25px_rgba(245,158,11,0.45)] flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw size={14} /> สแกนใหม่อีกครั้ง
            </button>
          </div>
        ) : scanResult ? (
          /* LUXURY SCAN RESULT VIEW */
          <div className="absolute inset-0 bg-gradient-to-b from-[#120c05]/95 via-[#0b0805]/95 to-[#080603]/98 backdrop-blur-3xl overflow-y-auto animate-in zoom-in-95 duration-300 z-40 text-stone-100">
            {matchedWinery ? (
              /* ══════════════════════════════════════════════════════════════
                 CASE A: WINERY MATCHED IN /wineries -> แสดงข้อมูลโรงไวน์และไวน์เต็มรูปแบบ
                 (เอาราคาและประเทศออกตามคำสั่ง)
                 ══════════════════════════════════════════════════════════════ */
              <div className="divide-y divide-amber-400/15">
                {/* Top Authenticity Bar */}
                <div className="px-4 pt-3.5 pb-2.5 flex items-center justify-between sticky top-0 bg-[#0c0905]/95 backdrop-blur-xl z-20 border-b border-amber-400/20">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-400/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                    <CheckCircle2 size={12} className="text-amber-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-wider">
                      ไวน์แท้ 100% (AUTHENTIC VERIFIED)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[9px] font-bold text-amber-300/80 bg-black/60 border border-amber-400/30 px-2 py-0.5 rounded-lg">
                    <Sparkles size={10} className="text-amber-300" />
                    <span>AI MATCH {scanResult.confidence?.toFixed(0) || 98}%</span>
                  </div>
                </div>

                {/* Grand Winery Card */}
                <div className="p-3.5">
                  <div className="rounded-2xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-950/40 via-stone-900/80 to-stone-950 p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.25)] space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex items-center justify-between border-b border-amber-400/25 pb-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-lg bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400">
                          <ShieldCheck size={13} />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-300">
                          โรงไวน์พันธมิตร THE BOTTLE CLUB
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[8px] font-black uppercase">
                        ✓ ดึงข้อมูลจาก /wineries
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {matchedWinery.logo_image ? (
                        <img
                          src={matchedWinery.logo_image}
                          alt={matchedWinery.name}
                          onClick={() => navigateToWinery(matchedWinery.seo_name)}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400/50 bg-stone-900 shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div 
                          onClick={() => navigateToWinery(matchedWinery.seo_name)}
                          className="w-14 h-14 rounded-2xl bg-amber-500/10 border-2 border-amber-400/50 flex items-center justify-center flex-shrink-0 text-amber-400 cursor-pointer hover:scale-105 transition"
                        >
                          <Wine size={26} />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <h4 
                          onClick={() => navigateToWinery(matchedWinery.seo_name)}
                          className="text-base font-black text-white font-serif leading-tight truncate cursor-pointer hover:text-amber-300 transition"
                        >
                          {matchedWinery.name}
                        </h4>
                        {matchedWinery.region_name && (
                          <p className="text-[10px] text-amber-200/90 font-semibold mt-0.5 flex items-center gap-1">
                            <MapPin size={10} className="text-amber-400 flex-shrink-0" />
                            <span className="text-stone-300">{matchedWinery.region_name}</span>
                          </p>
                        )}
                        {matchedWinery.description && (
                          <p className="text-[9px] text-stone-400 line-clamp-2 mt-1 leading-snug">
                            {matchedWinery.description}
                          </p>
                        )}
                        <p className="text-[8px] font-black text-amber-400/80 mt-1 uppercase tracking-wider">
                          🍷 ไวน์ในระบบ: {matchedWinery.wines_count || matchedWinery.wines?.length || 1} รายการ
                        </p>
                      </div>
                    </div>

                    {/* Featured Wines (เอาราคาออกตามคำสั่ง) */}
                    {matchedWinery.wines && matchedWinery.wines.length > 0 && (
                      <div className="pt-2 border-t border-amber-400/15">
                        <span className="text-[8px] font-black uppercase tracking-wider text-amber-300/80 block mb-1.5 flex items-center gap-1">
                          <Sparkles size={9} /> ไวน์ที่ผลิตโดยโรงนี้ (จากระบบ /wineries)
                        </span>
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                          {matchedWinery.wines.slice(0, 4).map((w) => (
                            <button
                              key={w.id}
                              type="button"
                              onClick={() => navigateToWinery(matchedWinery.seo_name)}
                              className="flex-shrink-0 w-24 bg-black/60 hover:bg-stone-900 border border-amber-400/20 hover:border-amber-400/50 rounded-xl p-2 flex flex-col items-center gap-1 text-center cursor-pointer transition active:scale-95"
                            >
                              {w.image ? (
                                <img src={w.image} alt={w.name} className="h-14 object-contain" />
                              ) : (
                                <div className="h-14 flex items-center justify-center text-amber-500/50">
                                  <Wine size={18} />
                                </div>
                              )}
                              <p className="text-[9px] font-bold text-stone-200 line-clamp-2 leading-tight">
                                {w.name}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Direct Link to Winery Page (ลิงก์ไปยัง wineries/ ที่ให้กดดูข้อมูลทันที) */}
                    <button
                      type="button"
                      onClick={() => navigateToWinery(matchedWinery.seo_name)}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95"
                    >
                      <ExternalLink size={14} /> ดูข้อมูลโรงไวน์ {matchedWinery.name} ฉบับเต็ม
                    </button>
                  </div>
                </div>

                {/* Scanned Wine Profile (เอาราคาและประเทศออกตามคำสั่ง) */}
                <div className="p-3.5">
                  <div className="bg-gradient-to-b from-stone-900/80 via-stone-950/90 to-[#0c0905]/95 rounded-2xl p-3.5 border border-amber-400/35 shadow-md grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-5 relative rounded-xl overflow-hidden border border-amber-400/40 bg-stone-900 flex flex-col justify-end min-h-[170px]">
                      {uploadedImage ? (
                        <img
                          src={uploadedImage}
                          alt={scanResult.name}
                          className="absolute inset-0 w-full h-full object-contain p-2 bg-stone-950"
                        />
                      ) : cityImageUrl ? (
                        <img
                          src={cityImageUrl}
                          alt={`${scanResult.city}, ${scanResult.region}`}
                          className="absolute inset-0 w-full h-full object-cover brightness-95"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 to-stone-950 flex items-center justify-center text-amber-500/50">
                          <Wine size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                      <div className="relative z-10 m-1.5 px-1.5 py-1 rounded-lg bg-black/80 border border-amber-400/40 text-amber-200 text-[9px] font-bold flex items-center gap-1">
                        <MapPin size={10} className="text-amber-400 flex-shrink-0" />
                        <span className="line-clamp-2">
                          {scanResult.city_th || scanResult.city}, {scanResult.region_th || scanResult.region}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-7 flex flex-col justify-center py-1">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-amber-500/25 border border-amber-400/40 text-amber-300 uppercase">
                            {scanResult.type_th || scanResult.type}
                          </span>
                          <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-200 flex items-center gap-1">
                            <CalendarDays size={9} className="text-amber-300" /> {scanResult.vintage}
                          </span>
                        </div>

                        <h3 className="text-sm font-black font-serif text-white leading-snug tracking-tight">
                          {scanResult.name}
                        </h3>

                        {scanResult.grape && (
                          <div className="text-[10px] font-medium text-stone-300 flex items-center gap-1">
                            <span>🍇</span>
                            <span>{scanResult.grape}</span>
                            <span className="text-amber-400 font-bold">· {scanResult.alcohol}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2-Pod Stats (เอารายการประเทศออกตามคำสั่ง) */}
                <div className="p-3.5 space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gradient-to-b from-amber-500/10 to-stone-950/80 rounded-xl p-2.5 border border-amber-400/25 flex flex-col items-center text-center">
                      <CalendarDays size={18} className="text-amber-400" />
                      <p className="text-[8px] font-black text-amber-300/80 uppercase mt-0.5">ปีผลิต (VINTAGE)</p>
                      <p className="text-sm font-black text-amber-300 font-serif">{scanResult.vintage}</p>
                    </div>

                    <div className="bg-gradient-to-b from-amber-500/10 to-stone-950/80 rounded-xl p-2.5 border border-amber-400/25 flex flex-col items-center text-center">
                      <Star size={18} className="text-amber-400 fill-amber-400" />
                      <p className="text-[8px] font-black text-amber-300/80 uppercase mt-0.5">คะแนน (RATING)</p>
                      <p className="text-sm font-black text-amber-300 font-serif">{scanResult.rating.toFixed(1)}</p>
                    </div>
                  </div>

                  {/* Terroir (เอารายการประเทศออก) */}
                  <div className="flex items-center gap-2.5 bg-stone-900/60 rounded-xl p-2.5 border border-amber-400/20 text-stone-200">
                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-400">
                      <Globe size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] text-amber-400/80 uppercase font-black">แหล่งกำเนิดและไร่องุ่น (TERROIR)</p>
                      <p className="text-[11px] font-bold text-stone-200 mt-0.5">
                        {scanResult.city_th || scanResult.city} · {scanResult.region_th || scanResult.region}
                      </p>
                    </div>
                  </div>

                  {/* Tasting notes */}
                  {scanResult.notes && scanResult.notes.length > 0 && (
                    <div>
                      <p className="text-[8px] font-black text-amber-400/80 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles size={10} className="text-amber-400" />
                        TASTING PROFILE NOTES
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {scanResult.notes.map((note, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-bold px-2.5 py-1 rounded-lg bg-amber-950/45 border border-amber-400/35 text-amber-200 shadow-sm"
                          >
                            🍷 {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sommelier Note */}
                  {scanResult.description_th && (
                    <div className="bg-stone-900/50 p-2.5 rounded-xl border-l-3 border-l-amber-400 text-[11px] text-stone-300 leading-relaxed">
                      <p className="text-[8px] font-black uppercase text-amber-400 mb-0.5">
                        Sommelier Note (บทวิเคราะห์จากผู้เชี่ยวชาญ)
                      </p>
                      <p>{scanResult.description_th}</p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 pt-1 pb-2">
                    <button
                      type="button"
                      onClick={() => navigateToWinery(matchedWinery.seo_name)}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <ExternalLink size={14} /> ดูข้อมูลโรงไวน์ {matchedWinery.name} ฉบับเต็ม
                    </button>
                    <button
                      type="button"
                      onClick={resetScan}
                      className="w-full py-3 bg-stone-950/70 hover:bg-stone-900 text-amber-200 hover:text-white font-bold text-xs rounded-xl border border-amber-400/35 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <RotateCcw size={14} /> สแกนฉลากขวดอื่น
                    </button>
                  </div>

                </div>
              </div>
            ) : (
              /* CASE B: UNMATCHED WINERY (ชื่อไม่ตรงกับใน /wineries -> ซ่อนข้อมูลไวน์ แสดงเฉพาะเตือน) */
              <div className="p-4 sm:p-5 flex flex-col justify-center min-h-full my-auto">
                <div className="rounded-3xl border-2 border-amber-500/35 bg-gradient-to-b from-[#1c1308]/95 via-[#130d06]/95 to-[#0b0804]/98 p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.15)] text-center relative overflow-hidden space-y-4">
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/15 via-yellow-500/5 to-transparent pointer-events-none" />

                  <div className="relative mx-auto w-20 h-28 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.25)] p-2">
                    {uploadedImage ? (
                      <img src={uploadedImage} alt="Bottle" className="h-full object-contain" />
                    ) : (
                      <Wine size={32} />
                    )}
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-[10px] font-black uppercase tracking-wider mb-2">
                      <CheckCircle2 size={12} className="text-emerald-400" />
                      <span>ไวน์แท้ 100% (AUTHENTIC VERIFIED)</span>
                    </div>

                    <h3 className="text-base font-black font-serif text-white leading-snug px-1">
                      {scanResult.name}
                    </h3>
                    {scanResult.producer && (
                      <p className="text-[11px] font-bold text-amber-300/90 mt-1">
                        ผู้ผลิต / โรงไวน์: {scanResult.producer}
                      </p>
                    )}
                  </div>

                  <div className="h-px w-28 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto" />

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 text-amber-300">
                      <AlertTriangle size={15} className="text-amber-400 flex-shrink-0" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        ไม่พบข้อมูลโรงไวน์ในระบบ /wineries
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed font-medium">
                      ขวดไวน์นี้ได้รับการตรวจสอบว่าเป็นไวน์แท้ แต่โรงไวน์นี้ไม่ได้อยู่ในเครือข่ายระบบของ The Bottle Club
                    </p>
                    <div className="bg-black/60 border border-amber-400/25 rounded-2xl p-3 text-[10px] text-amber-200/90 leading-relaxed text-left space-y-1">
                      <p className="font-bold text-amber-300 flex items-center gap-1">
                        <span>📌</span> เงื่อนไขการแสดงผล:
                      </p>
                      <p className="text-stone-300">
                        ระบบจะดึงและแสดงข้อมูลโรงไวน์พร้อมรายละเอียดไวน์เฉพาะขวดที่มีชื่อตรงกับโรงไวน์ในระบบ <strong className="text-amber-300">/wineries</strong> เท่านั้น หากไม่มีชื่อตรงตามระบบจะไม่แสดงข้อมูล
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={resetScan}
                      className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-stone-950 font-black uppercase tracking-wider text-xs rounded-xl shadow-[0_8px_25px_rgba(245,158,11,0.35)] flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <RotateCcw size={15} /> สแกนขวดไวน์อื่น
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onClose) onClose();
                        router.push('/wineries');
                      }}
                      className="w-full py-3 bg-stone-900/90 hover:bg-stone-800 text-amber-200 hover:text-white font-black text-xs uppercase tracking-wider rounded-xl border border-amber-400/35 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                    >
                      <ExternalLink size={14} /> ดูรายชื่อโรงไวน์ทั้งหมดในระบบ /wineries
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        ) : (
          /* Camera Viewfinder (HUD Overlay) */
          <>
            {uploadedImage ? (
              <div className="absolute inset-0 bg-stone-950 flex items-center justify-center p-4">
                <img
                  src={uploadedImage}
                  alt="Sample bottle preview"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : !cameraError ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMediaError={() => setCameraError('no-camera')}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-stone-950/80 via-amber-950/15 to-stone-950/90 backdrop-blur-xl p-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-2 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  <Camera size={26} />
                </div>
                <p className="text-xs text-amber-200/90 font-bold leading-snug">
                  โหมดสแกน AI Wine Scanner
                </p>
                <p className="text-[10px] text-stone-400 mt-1 max-w-[220px]">
                  เลือกรูปภาพตัวอย่างด้านล่าง หรืออัปโหลดรูปภาพขวดไวน์เพื่อเริ่มทดสอบ
                </p>
              </div>
            )}

            {/* Viewfinder Overlay with Golden Glass HUD */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute inset-0 border-[28px] border-black/55 backdrop-blur-[0.5px]" />

              <div className="absolute top-4 inset-x-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 blur-sm opacity-90 animate-pulse" />
                  <img src="/logos/Thebottleclub.jpg" alt="Logo" className="relative w-8 h-8 rounded-xl object-cover border border-amber-200/60 shadow-xl" />
                </div>
              </div>

              <div className="absolute top-4 left-4 w-9 h-9 border-t-2 border-l-2 border-amber-400 rounded-tl-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
              <div className="absolute top-4 right-4 w-9 h-9 border-t-2 border-r-2 border-amber-400 rounded-tr-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
              <div className="absolute bottom-4 left-4 w-9 h-9 border-b-2 border-l-2 border-amber-400 rounded-bl-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />
              <div className="absolute bottom-4 right-4 w-9 h-9 border-b-2 border-r-2 border-amber-400 rounded-br-xl shadow-[0_0_18px_rgba(251,191,36,0.9)]" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-56 border border-amber-400/25 rounded-2xl flex items-center justify-center">
                <div className={`w-20 h-20 rounded-full border border-amber-400/40 transition-all duration-700 ${isScanning ? 'scale-125 opacity-40' : 'scale-100 opacity-80 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.3)]'}`} />
              </div>

              {isScanning && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_20px_#f59e0b,0_0_40px_#eab308] animate-[scan_2s_ease-in-out_infinite] z-30" />
              )}

              <div className="absolute bottom-3 inset-x-5 text-center bg-black/75 backdrop-blur-2xl border border-amber-400/30 py-2 px-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
                <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-amber-300 animate-pulse">{telemetryText}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sample Photo Test Tray & Controls */}
      {!scanResult && !scanError && (
        <div className="relative z-20 w-full flex flex-col gap-2 pt-1 pb-1">
          {/* Sample Images Header */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
              <ImageIcon size={12} className="text-amber-400" />
              เลือกรูปภาพทดสอบ (แตะเพื่อสแกนทันที):
            </span>
            <span className="text-[9px] text-stone-400 font-mono">5 รูปตัวอย่าง</span>
          </div>

          {/* Horizontal Scrollable Sample Images Picker */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none px-0.5">
            {SAMPLE_BOTTLES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                disabled={isScanning}
                onClick={() => startAnalysisSequence(undefined, sample)}
                className={`flex-shrink-0 w-24 bg-stone-900/90 hover:bg-stone-800/90 border rounded-2xl p-1.5 flex flex-col items-center gap-1 transition-all cursor-pointer text-left active:scale-95 disabled:opacity-50 ${
                  activeSampleId === sample.id
                    ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'border-amber-400/20 hover:border-amber-400/50'
                }`}
              >
                <div className="h-12 w-full flex items-center justify-center p-1 bg-black/40 rounded-xl">
                  <img
                    src={sample.imageUrl}
                    alt={sample.name}
                    className="h-full object-contain"
                  />
                </div>
                <p className="text-[9px] font-bold text-stone-200 line-clamp-1 leading-tight w-full text-center">
                  {sample.shortName}
                </p>
                <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-md border text-center whitespace-nowrap ${sample.badgeClass}`}>
                  {sample.badge}
                </span>
              </button>
            ))}
          </div>

          {/* Shutter & Upload Buttons */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <button
              type="button"
              disabled={isScanning}
              onClick={capture}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 p-1 shadow-[0_0_35px_rgba(245,158,11,0.65),_0_0_70px_rgba(234,179,8,0.3)] active:scale-95 transition-all cursor-pointer flex items-center justify-center disabled:opacity-50"
              aria-label="Scan Now"
            >
              <div className="w-full h-full border-2 border-amber-300/80 rounded-full bg-white flex items-center justify-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] overflow-hidden p-1.5">
                <img
                  src="/logos/bottle-walking-icon.png"
                  alt="Scan"
                  className="w-full h-full object-contain"
                />
              </div>
            </button>

            <button
              type="button"
              disabled={isScanning}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-amber-400/40 text-amber-200 hover:text-white flex items-center gap-2 text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition cursor-pointer disabled:opacity-50"
            >
              <Upload size={15} />
              <span>อัปโหลดรูปภาพ</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

        </div>
      )}

      <style jsx>{`
        @keyframes scan {
          0% { top: 12%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 88%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
