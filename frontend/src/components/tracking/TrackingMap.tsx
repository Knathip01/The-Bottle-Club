'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { TransportMode } from '@/lib/tracking/shipments';
import { DELIVERY_ROUTE } from '@/lib/tracking/shipments';

// 1. Beautiful Premium Origin (Warehouse) Icon
const warehouseIcon =
  typeof window !== 'undefined'
    ? L.divIcon({
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
            <div style="background:#8b0000;padding:8px;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;border:2.5px solid #fff;box-shadow:inset 0 0 4px rgba(255,255,255,0.3)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          </div>`,
        className: '',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      })
    : null;

// 2. Beautiful Grab-style Destination Pin Icon
const destinationPinIcon =
  typeof window !== 'undefined'
    ? L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25))">
            <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0C8.05888 0 0 8.05888 0 18C0 29.8333 18 44 18 44C18 44 36 29.8333 36 18C36 8.05888 27.9411 0 18 0Z" fill="#00B14F"/>
              <circle cx="18" cy="18" r="7" fill="white"/>
              <circle cx="18" cy="18" r="4" fill="#00B14F"/>
            </svg>
          </div>`,
        className: '',
        iconSize: [36, 44],
        iconAnchor: [18, 44],
      })
    : null;

// 3. Helper to calculate rotation heading between coordinates
function calculateHeading(p1: [number, number], p2: [number, number]): number {
  if (!p1 || !p2) return 0;
  const dy = p2[0] - p1[0];
  const dx = Math.cos(Math.PI / 180 * p1[0]) * (p2[1] - p1[1]);
  return Math.atan2(dx, dy) * (180 / Math.PI);
}

// 4. Custom Grab-Style Vehicle Icon with rotation and pulsing radar
function createVehicleIcon(mode: TransportMode, heading: number) {
  if (typeof window === 'undefined') return null;

  // Custom high-fidelity SVGs with embedded pulsing radar circles
  const scooterSvg = `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Pulsing Radar Glow -->
      <circle cx="32" cy="32" r="28" fill="url(#greenPulse)" opacity="0.35" class="radar-pulse" />
      
      <defs>
        <radialGradient id="greenPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#10B981" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#10B981" stop-opacity="0"/>
        </radialGradient>
        <filter id="shadow-scooter" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
        <linearGradient id="scooterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00B14F"/>
          <stop offset="100%" stop-color="#007e38"/>
        </linearGradient>
      </defs>

      <!-- Shadow -->
      <circle cx="32" cy="36" r="14" fill="#000000" opacity="0.2" filter="blur(2px)"/>

      <!-- Rotated Inner Group -->
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.2s ease-out;">
        <!-- Core Marker Circle -->
        <circle cx="32" cy="32" r="17" fill="white" filter="url(#shadow-scooter)" />
        <circle cx="32" cy="32" r="14.5" fill="url(#scooterGrad)" />
        
        <!-- Scooter Silhouette pointing UP (0° North) -->
        <!-- Front shield -->
        <path d="M32 20 L27 27 H37 Z" fill="#ffffff" opacity="0.9" />
        <!-- Headlight -->
        <circle cx="32" cy="21" r="1.5" fill="#FBBF24" />
        <!-- Backpack (Wine delivery box) -->
        <rect x="27" y="31" width="10" height="8" rx="1.5" fill="#10B981" stroke="white" stroke-width="1" />
        <!-- Rider helmet -->
        <circle cx="32" cy="27" r="4" fill="#1e293b" />
        <circle cx="32" cy="27" r="2.8" fill="#10B981" />
        <!-- Visor -->
        <path d="M30 26.5 C30.5 25 33.5 25 34 26.5 Z" fill="#0f172a" />
      </g>
    </svg>
  `;

  const planeSvg = `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="url(#violetPulse)" opacity="0.3" class="radar-pulse" />
      <defs>
        <radialGradient id="violetPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0"/>
        </radialGradient>
        <filter id="shadow-plane" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.2s ease-out;">
        <circle cx="32" cy="32" r="17" fill="white" filter="url(#shadow-plane)" />
        <circle cx="32" cy="32" r="14.5" fill="#7C3AED" />
        
        <!-- Plane shape facing UP -->
        <path d="M19 33.5 L32 28.5 L45 33.5 L44 35.5 L32 31 L20 35.5 Z" fill="white" />
        <rect x="30.5" y="21" width="3" height="19" rx="1.5" fill="white" />
        <path d="M26 38.5 L32 36 L38 38.5 Z" fill="#DDD6FE" />
      </g>
    </svg>
  `;

  const shipSvg = `
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill="url(#skyPulse)" opacity="0.3" class="radar-pulse" />
      <defs>
        <radialGradient id="skyPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0284C7" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#0284C7" stop-opacity="0"/>
        </radialGradient>
        <filter id="shadow-ship" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
        </filter>
      </defs>
      
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.2s ease-out;">
        <circle cx="32" cy="32" r="17" fill="white" filter="url(#shadow-ship)" />
        <circle cx="32" cy="32" r="14.5" fill="#0284C7" />
        
        <!-- Cargo Ship shape facing UP -->
        <path d="M30.5 19 C31 18 33 18 33.5 19 L35.5 39 H28.5 Z" fill="white" />
        <rect x="29.5" y="23" width="5" height="3.5" rx="0.5" fill="#EF4444" />
        <rect x="29.5" y="28" width="5" height="3.5" rx="0.5" fill="#0EA5E9" />
        <rect x="29.5" y="33" width="5" height="3.5" rx="0.5" fill="#F59E0B" />
      </g>
    </svg>
  `;

  const svg = mode === 'sea' ? shipSvg : mode === 'air' ? planeSvg : scooterSvg;

  return L.divIcon({
    html: `
      <div style="width:64px;height:64px;display:flex;align-items:center;justify-content:center;">
        <style>
          @keyframes radarGrow {
            0% { transform: scale(0.65); opacity: 0.85; }
            100% { transform: scale(1.6); opacity: 0; }
          }
          .radar-pulse {
            transform-origin: center;
            animation: radarGrow 2.2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
          }
        </style>
        ${svg}
      </div>`,
    className: '',
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });
}

// 5. Minimal Ring for Recipient / Destination
const recipientIcon =
  typeof window !== 'undefined'
    ? L.divIcon({
        html: `
          <div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center">
            <style>
              @keyframes recipientRing {
                0% { transform: scale(0.8); opacity: 0.5; }
                50% { transform: scale(1.4); opacity: 0.25; }
                100% { transform: scale(0.8); opacity: 0.5; }
              }
              .recipient-glow {
                position: absolute;
                inset: -6px;
                background: rgba(0, 177, 79, 0.18);
                border: 2px solid rgba(0, 177, 79, 0.3);
                border-radius: 50%;
                animation: recipientRing 2.5s infinite ease-in-out;
              }
            </style>
            <div class="recipient-glow"></div>
            <div style="width:14px;height:14px;background:#00B14F;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>
          </div>`,
        className: '',
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      })
    : null;

// Helper component to recenter and fit map viewport to route bounds
function MapViewportController({
  positions,
  recenterToken,
}: {
  positions: [number, number][];
  recenterToken: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (positions.length < 2) return;
    const maxZoom = positions.length > 20 ? 5 : positions.length > 10 ? 6 : 16;
    map.fitBounds(L.latLngBounds(positions), { padding: [80, 80], maxZoom });
  }, [map, positions, recenterToken]);

  return null;
}

interface TrackingMapProps {
  isTracking: boolean;
  fullScreen?: boolean;
  recenterToken?: number;
  onProgress?: (progress: number) => void;
  route?: [number, number][];
  mode?: TransportMode;
  progressSpeed?: number;
  initialProgress?: number;
}

export default function TrackingMap({
  isTracking,
  fullScreen = false,
  recenterToken = 0,
  onProgress,
  route = DELIVERY_ROUTE,
  mode = 'local',
  progressSpeed = 0.008,
  initialProgress = 0,
}: TrackingMapProps) {
  const [mounted, setMounted] = useState(false);
  const [vehiclePos, setVehiclePos] = useState<[number, number]>(route[0]);
  const [progress, setProgress] = useState(initialProgress);
  const [heading, setHeading] = useState(0);

  // Memoize vehicleIcon based on mode and current heading angle
  const vehicleIcon = useMemo(() => {
    return createVehicleIcon(mode, heading);
  }, [mode, heading]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setVehiclePos(route[0]);
    setProgress(0);
    setHeading(0);
  }, [route]);

  useEffect(() => {
    if (isTracking && initialProgress > 0) {
      setProgress(initialProgress);
    }
  }, [isTracking, initialProgress]);

  // Simulation tick interpolation
  useEffect(() => {
    if (!isTracking) {
      setProgress(0);
      setVehiclePos(route[0]);
      setHeading(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 1) {
          clearInterval(interval);
          return 1;
        }
        return prev + progressSpeed;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isTracking, progressSpeed, route]);

  // Calculate smooth vehicle position and rotation angle based on simulated progress
  useEffect(() => {
    if (progress === 0) {
      setVehiclePos(route[0]);
      setHeading(0);
      return;
    }
    if (progress >= 1) {
      setVehiclePos(route[route.length - 1]);
      return;
    }

    const index = Math.floor(progress * (route.length - 1));
    const nextIndex = Math.min(index + 1, route.length - 1);
    const segmentProgress = progress * (route.length - 1) - index;

    const currentPoint = route[index];
    const nextPoint = route[nextIndex];

    const lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * segmentProgress;
    const lng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * segmentProgress;

    setVehiclePos([lat, lng]);

    // Calculate heading from current point to next point
    const h = calculateHeading(currentPoint, nextPoint);
    setHeading(h);
  }, [progress, route]);

  useEffect(() => {
    onProgress?.(progress);
  }, [progress, onProgress]);

  // Dynamic route segments: Traversed vs Remaining
  const traversedRoute = useMemo(() => {
    if (!isTracking || progress === 0) return [route[0]];
    const index = Math.floor(progress * (route.length - 1));
    const slice = route.slice(0, index + 1);
    slice.push(vehiclePos);
    return slice;
  }, [route, vehiclePos, progress, isTracking]);

  const remainingRoute = useMemo(() => {
    if (!isTracking || progress >= 1) return route;
    const index = Math.floor(progress * (route.length - 1));
    return [vehiclePos, ...route.slice(index + 1)];
  }, [route, vehiclePos, progress, isTracking]);

  const mapCenter = route[Math.floor(route.length / 2)] ?? route[0];

  if (!mounted) {
    return (
      <div
        className={`w-full bg-stone-100 animate-pulse flex items-center justify-center text-stone-400 ${
          fullScreen ? 'h-full min-h-[100dvh]' : 'h-[420px] rounded-2xl'
        }`}
      >
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-medium text-stone-500">กำลังโหลดแผนที่...</p>
        </div>
      </div>
    );
  }

  const heightClass = fullScreen ? 'h-full min-h-[100dvh]' : 'h-[420px] rounded-2xl';

  // Dynamic route colors matching branding
  const activeColor = mode === 'sea' ? '#0284C7' : mode === 'air' ? '#7C3AED' : '#00B14F';
  const remainingColor = mode === 'sea' ? '#0ea5e9' : mode === 'air' ? '#a78bfa' : '#34d399';

  return (
    <div className={`w-full overflow-hidden relative shadow-inner ${heightClass}`}>
      <MapContainer
        center={mapCenter}
        zoom={mode === 'local' ? 14 : 4}
        scrollWheelZoom={fullScreen}
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapViewportController positions={route} recenterToken={recenterToken} />

        {/* 1. Traversed Path (Solid line, bold color) */}
        {isTracking && (
          <Polyline
            positions={traversedRoute}
            color={activeColor}
            weight={6}
            opacity={0.9}
            lineCap="round"
            lineJoin="round"
          />
        )}

        {/* 2. Remaining Path (Dashed line, translucent) */}
        <Polyline
          positions={remainingRoute}
          color={isTracking ? remainingColor : '#94a3b8'}
          weight={isTracking ? 5 : 4}
          opacity={isTracking ? 0.35 : 0.25}
          dashArray={isTracking ? '8, 8' : undefined}
          lineCap="round"
          lineJoin="round"
        />

        {/* Origin / Warehouse Pin */}
        {warehouseIcon && (
          <Marker position={route[0]} icon={warehouseIcon} />
        )}

        {/* Destination / Customer Pin */}
        {destinationPinIcon && (
          <Marker position={route[route.length - 1]} icon={destinationPinIcon} />
        )}

        {/* Recipient pulsing core (only for domestic delivery) */}
        {isTracking && recipientIcon && mode === 'local' && (
          <Marker position={route[route.length - 1]} icon={recipientIcon} />
        )}

        {/* Live moving vehicle with rotation and pulsing radar */}
        {isTracking && vehicleIcon && (
          <Marker position={vehiclePos} icon={vehicleIcon} />
        )}
      </MapContainer>

      {!isTracking && !fullScreen && (
        <div className="absolute inset-0 bg-stone-900/5 backdrop-blur-[1px] z-[400] flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 p-5 rounded-2xl shadow-xl text-center max-w-xs border border-stone-100 mx-4 pointer-events-auto transition-transform hover:scale-102">
            <p className="text-stone-700 text-sm font-semibold flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ส่งออกและจัดส่งพัสดุเรียลไทม์
            </p>
            <p className="text-stone-500 text-xs mt-1.5 leading-relaxed">
              กรอกหมายเลขพัสดุด้านบนเพื่อเปิดแผนที่ติดตามยานพาหนะเดลิเวอรีจำลอง
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
