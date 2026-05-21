'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icons using Lucide-like SVGs in divIcons to avoid path issues with default Leaflet icons
const warehouseIcon = typeof window !== 'undefined' ? L.divIcon({
  html: `<div style="background-color: #78350f; padding: 8px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
  </div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
}) : null;

const homeIcon = typeof window !== 'undefined' ? L.divIcon({
  html: `<div style="background-color: #10b981; padding: 8px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
}) : null;

const vehicleIcon = typeof window !== 'undefined' ? L.divIcon({
  html: `<div style="background-color: #d97706; padding: 8px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 4px 6px rgba(0,0,0,0.3); transition: all 0.5s ease;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 17h4V5H2v12h3m15 0h2v-3.34a2 2 0 0 0-1.17-1.82l-3.83-1.84V5h-3v12m-3-4h-3m12 4a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="17.5" r="2.5"/></svg>
  </div>`,
  className: '',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
}) : null;

interface TrackingMapProps {
  isTracking: boolean;
}

const route: [number, number][] = [
  [13.7367, 100.5231], // Warehouse
  [13.7380, 100.5250],
  [13.7400, 100.5280],
  [13.7420, 100.5310],
  [13.7450, 100.5350],
  [13.7480, 100.5390],
  [13.7520, 100.5430], // Customer Home
];

export default function TrackingMap({ isTracking }: TrackingMapProps) {
  const [mounted, setMounted] = useState(false);
  const [vehiclePos, setVehiclePos] = useState<[number, number]>(route[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isTracking) {
      setProgress(0);
      setVehiclePos(route[0]);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + 0.005; // Slower movement for better visibility
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isTracking]);

  useEffect(() => {
    if (progress === 0) {
      setVehiclePos(route[0]);
      return;
    }
    if (progress >= 1) {
      setVehiclePos(route[route.length - 1]);
      return;
    }

    const index = Math.floor(progress * (route.length - 1));
    const nextIndex = Math.min(index + 1, route.length - 1);
    const segmentProgress = (progress * (route.length - 1)) - index;
    
    const lat = route[index][0] + (route[nextIndex][0] - route[index][0]) * segmentProgress;
    const lng = route[index][1] + (route[nextIndex][1] - route[index][1]) * segmentProgress;
    
    setVehiclePos([lat, lng]);
  }, [progress]);

  if (!mounted) return (
    <div className="h-96 w-full bg-stone-100 animate-pulse rounded-xl flex items-center justify-center text-stone-400">
      Loading Map...
    </div>
  );

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-stone-200 shadow-inner relative">
      <MapContainer 
        center={[13.7443, 100.5330]} 
        zoom={14} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline 
          positions={route} 
          color="#d97706" 
          weight={4} 
          opacity={0.4} 
          dashArray="10, 10"
        />

        {warehouseIcon && (
          <Marker position={route[0]} icon={warehouseIcon}>
            <Popup>คลังสินค้า (The Bottle Club Warehouse)</Popup>
          </Marker>
        )}

        {homeIcon && (
          <Marker position={route[route.length - 1]} icon={homeIcon}>
            <Popup>บ้านของคุณ (Your Home)</Popup>
          </Marker>
        )}

        {isTracking && vehicleIcon && (
          <Marker position={vehiclePos} icon={vehicleIcon}>
            <Popup>พัสดุของคุณอยู่ตรงนี้!</Popup>
          </Marker>
        )}
      </MapContainer>
      
      {!isTracking && (
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[2px] z-[1000] flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-xs border border-stone-100">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
            </div>
            <p className="text-stone-600 font-medium">กรุณากรอกเลขพัสดุเพื่อเริ่มติดตามพัสดุของคุณบนแผนที่แบบ Real-time</p>
          </div>
        </div>
      )}
    </div>
  );
}
