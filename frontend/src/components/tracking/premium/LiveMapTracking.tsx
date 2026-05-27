'use client';

import { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { TransportMode } from '@/lib/tracking/shipments';

// 1. Sleek Origin (Warehouse) Pin Icon
const warehouseIcon =
  typeof window !== 'undefined'
    ? L.divIcon({
        html: `
          <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.15))">
            <div style="background:#1e1b4b;padding:7px;border-radius:10px;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid #fff;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          </div>`,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      })
    : null;

// 2. High-end Destination Pin Icon (with green styling)
const destinationPinIcon =
  typeof window !== 'undefined'
    ? L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25))">
            <svg width="32" height="40" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 0C8.05888 0 0 8.05888 0 18C0 29.8333 18 44 18 44C18 44 36 29.8333 36 18C36 8.05888 27.9411 0 18 0Z" fill="#00B14F"/>
              <circle cx="18" cy="18" r="6" fill="white"/>
              <circle cx="18" cy="18" r="3" fill="#00B14F"/>
            </svg>
          </div>`,
        className: '',
        iconSize: [32, 40],
        iconAnchor: [16, 40],
      })
    : null;

// Helper to calculate heading angle between coordinates
function calculateHeading(p1: [number, number], p2: [number, number]): number {
  if (!p1 || !p2) return 0;
  const dy = p2[0] - p1[0];
  const dx = Math.cos(Math.PI / 180 * p1[0]) * (p2[1] - p1[1]);
  return Math.atan2(dx, dy) * (180 / Math.PI);
}

// Custom animated vehicle icon creator
function createVehicleIcon(mode: TransportMode, heading: number) {
  if (typeof window === 'undefined') return null;

  const scooterSvg = `
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="url(#cyanPulse)" opacity="0.4" class="radar-pulse" />
      <defs>
        <radialGradient id="cyanPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.25s ease-out;">
        <circle cx="32" cy="32" r="15" fill="white" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))" />
        <circle cx="32" cy="32" r="12.5" fill="#06b6d4" />
        <path d="M32 21 L27 28 H37 Z" fill="#ffffff" />
        <circle cx="32" cy="27" r="3" fill="#0f172a" />
      </g>
    </svg>
  `;

  const planeSvg = `
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="url(#indigoPulse)" opacity="0.4" class="radar-pulse" />
      <defs>
        <radialGradient id="indigoPulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.25s ease-out;">
        <circle cx="32" cy="32" r="15" fill="white" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))" />
        <circle cx="32" cy="32" r="12.5" fill="#6366f1" />
        <rect x="30.5" y="21" width="3" height="19" rx="1.5" fill="white" />
        <path d="M19 33.5 L32 28.5 L45 33.5 L44 35.5 L32 31 L20 35.5 Z" fill="white" />
      </g>
    </svg>
  `;

  const shipSvg = `
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="26" fill="url(#bluePulse)" opacity="0.4" class="radar-pulse" />
      <defs>
        <radialGradient id="bluePulse" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <g style="transform: rotate(${heading}deg); transform-origin: 32px 32px; transition: transform 0.25s ease-out;">
        <circle cx="32" cy="32" r="15" fill="white" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.2))" />
        <circle cx="32" cy="32" r="12.5" fill="#3b82f6" />
        <path d="M30.5 19 C31 18 33 18 33.5 19 L35.5 39 H28.5 Z" fill="white" />
      </g>
    </svg>
  `;

  const svg = mode === 'sea' ? shipSvg : mode === 'air' ? planeSvg : scooterSvg;

  return L.divIcon({
    html: `
      <div style="width:60px;height:60px;display:flex;align-items:center;justify-content:center;">
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
    iconSize: [60, 60],
    iconAnchor: [30, 30],
  });
}

// Controller to auto center map bounds
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
    const maxZoom = positions.length > 20 ? 5 : positions.length > 10 ? 6 : 14;
    map.fitBounds(L.latLngBounds(positions), { padding: [60, 60], maxZoom });
  }, [map, positions, recenterToken]);

  return null;
}

interface LiveMapTrackingProps {
  route: [number, number][];
  mode: TransportMode;
  progress: number;
  isDarkMode: boolean;
  recenterToken?: number;
}

export default function LiveMapTracking({
  route,
  mode,
  progress,
  isDarkMode,
  recenterToken = 0,
}: LiveMapTrackingProps) {
  const [mounted, setMounted] = useState(false);
  const [vehiclePos, setVehiclePos] = useState<[number, number]>(route[0]);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update vehicle position and heading rotation when route or progress ticks
  useEffect(() => {
    if (!route || route.length === 0) return;
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

    if (!currentPoint || !nextPoint) return;

    const lat = currentPoint[0] + (nextPoint[0] - currentPoint[0]) * segmentProgress;
    const lng = currentPoint[1] + (nextPoint[1] - currentPoint[1]) * segmentProgress;

    setVehiclePos([lat, lng]);

    const angle = calculateHeading(currentPoint, nextPoint);
    setHeading(angle);
  }, [progress, route]);

  // Dynamic route segments
  const traversedRoute = useMemo(() => {
    if (progress === 0) return [route[0]];
    const index = Math.floor(progress * (route.length - 1));
    const slice = route.slice(0, index + 1);
    slice.push(vehiclePos);
    return slice;
  }, [route, vehiclePos, progress]);

  const remainingRoute = useMemo(() => {
    if (progress >= 1) return route;
    const index = Math.floor(progress * (route.length - 1));
    return [vehiclePos, ...route.slice(index + 1)];
  }, [route, vehiclePos, progress]);

  const vehicleIcon = useMemo(() => {
    return createVehicleIcon(mode, heading);
  }, [mode, heading]);

  if (!mounted) {
    return (
      <div className="w-full h-80 sm:h-110 bg-stone-100 dark:bg-stone-900 animate-pulse flex items-center justify-center text-stone-400">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-stone-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-stone-500">กำลังโหลดแผนที่ดาวเทียม...</p>
        </div>
      </div>
    );
  }

  // Neon theme colors for traversed vs remaining paths
  const activeColor = isDarkMode ? '#22d3ee' : '#6366f1';
  const remainingColor = isDarkMode ? '#1e293b' : '#cbd5e1';
  const tileUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <div className="w-full h-80 sm:h-110 rounded-[32px] overflow-hidden border border-stone-200/50 dark:border-stone-800/60 shadow-lg relative z-0">
      <MapContainer
        center={route[0]}
        zoom={mode === 'local' ? 14 : 4}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap &copy; CARTO'
          url={tileUrl}
        />

        <MapViewportController positions={route} recenterToken={recenterToken} />

        {/* Dynamic Traversed Line */}
        <Polyline
          positions={traversedRoute}
          color={activeColor}
          weight={5}
          opacity={0.95}
          lineCap="round"
          lineJoin="round"
        />

        {/* Dynamic Remaining Line */}
        <Polyline
          positions={remainingRoute}
          color={remainingColor}
          weight={4}
          opacity={0.4}
          dashArray="6, 8"
          lineCap="round"
          lineJoin="round"
        />

        {/* Origin pin */}
        {warehouseIcon && <Marker position={route[0]} icon={warehouseIcon} />}

        {/* Destination pin */}
        {destinationPinIcon && <Marker position={route[route.length - 1]} icon={destinationPinIcon} />}

        {/* Smooth animated moving vehicle marker */}
        {vehicleIcon && <Marker position={vehiclePos} icon={vehicleIcon} />}
      </MapContainer>
    </div>
  );
}
