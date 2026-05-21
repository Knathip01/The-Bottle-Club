'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from 'lucide-react';

// Dynamically import the map to avoid SSR issues with Leaflet
const TrackingMap = dynamic(() => import('./TrackingMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-stone-100 animate-pulse rounded-2xl flex items-center justify-center text-stone-400 border border-stone-200">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-stone-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-medium">กำลังโหลดแผนที่...</p>
      </div>
    </div>
  )
});

export default function TrackingContent() {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* Search Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">{t('tracking.title')}</h1>
            <p className="text-stone-500">ติดตามตำแหน่งพัสดุของคุณแบบเรียลไทม์บนแผนที่</p>
          </div>
          <div className="flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-stone-600 text-sm">
            <MapPin size={16} />
            <span>จัดส่งไปยัง: บ้านของคุณ</span>
          </div>
        </div>
        
        <form onSubmit={handleSearch} className="relative group">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder={t('tracking.search_placeholder')}
            className="w-full pl-14 pr-36 py-5 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 focus:bg-white transition-all text-xl font-medium"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-600 transition-colors" size={28} />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all active:scale-95 shadow-lg shadow-amber-600/20"
          >
            {t('nav.tracking') === 'ติดตามพัสดุ' ? 'ติดตาม' : 'Track'}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Map View */}
        <div className="lg:col-span-3">
          <div className="bg-white p-2 rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
            <TrackingMap isTracking={isTracking} />
          </div>
        </div>
        
        {/* Status Timeline Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-100 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Package size={22} />
              </div>
              <h3 className="font-bold text-stone-900 text-lg">สถานะการจัดส่ง</h3>
            </div>
            
            <div className="relative flex-grow space-y-10 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-[2px] before:bg-stone-100">
              <StatusItem 
                icon={<Clock size={14} />} 
                title={t('tracking.status.processing')} 
                time="08:30" 
                active={isTracking} 
                completed={isTracking}
              />
              <StatusItem 
                icon={<Truck size={14} />} 
                title={t('tracking.status.shipped')} 
                time="10:15" 
                active={isTracking} 
                completed={isTracking}
              />
              <StatusItem 
                icon={<Truck size={14} />} 
                title={t('tracking.status.delivering')} 
                time="กำลังเคลื่อนที่" 
                active={isTracking} 
                completed={false}
                highlight
              />
              <StatusItem 
                icon={<CheckCircle2 size={14} />} 
                title={t('tracking.status.delivered')} 
                time="รอดำเนินการ" 
                active={false} 
                completed={false}
              />
            </div>

            {isTracking && (
              <div className="mt-10 p-6 bg-amber-600 rounded-2xl text-white shadow-xl shadow-amber-600/20 transform hover:scale-[1.02] transition-transform">
                <p className="text-amber-100 text-sm font-medium mb-1">{t('tracking.estimated_arrival')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black">12-15</span>
                  <span className="text-lg font-bold">{t('tracking.minutes')}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Help Section */}
      <div className="bg-stone-900 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h4 className="text-xl font-bold mb-2">มีปัญหาเกี่ยวกับการจัดส่ง?</h4>
          <p className="text-stone-400">พนักงานของเราพร้อมช่วยเหลือคุณตลอด 24 ชั่วโมง</p>
        </div>
        <button className="relative z-10 bg-white text-stone-900 px-8 py-3 rounded-xl font-bold hover:bg-stone-100 transition-colors">
          ติดต่อฝ่ายบริการลูกค้า
        </button>
      </div>
    </div>
  );
}

function StatusItem({ 
  icon, 
  title, 
  time, 
  active, 
  completed, 
  highlight = false 
}: { 
  icon: React.ReactNode, 
  title: string, 
  time: string, 
  active: boolean, 
  completed: boolean,
  highlight?: boolean
}) {
  return (
    <div className={`relative flex gap-5 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-30'}`}>
      <div className={`z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
        completed ? 'bg-amber-600 border-amber-600 text-white shadow-lg shadow-amber-600/30' : 
        highlight ? 'bg-white border-amber-600 text-amber-600 shadow-lg shadow-amber-600/20 animate-pulse scale-110' : 
        'bg-white border-stone-200 text-stone-400'
      }`}>
        {completed ? <CheckCircle2 size={16} /> : icon}
      </div>
      <div className="flex flex-col">
        <p className={`font-bold transition-colors ${highlight ? 'text-amber-600' : 'text-stone-800'}`}>{title}</p>
        <p className="text-sm text-stone-400 font-medium">{time}</p>
      </div>
    </div>
  );
}
