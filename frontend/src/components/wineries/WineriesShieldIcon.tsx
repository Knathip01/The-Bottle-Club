import React from 'react';

export function WineriesShieldIcon({
  className = "w-4 h-4",
  size = 16
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Outer shield shape */}
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      {/* Target circle */}
      <circle cx="12" cy="11" r="3.75" strokeWidth="1.75" />
      {/* Target center dot */}
      <circle cx="12" cy="11" r="0.75" fill="currentColor" stroke="none" />
      {/* Crosshairs */}
      <path d="M12 5.5v2.2M12 14.3v2.2M6.5 11h2.2M15.3 11h2.2" strokeWidth="1.75" />
    </svg>
  );
}

export function PremiumPIcon({
  className = "w-4 h-4",
  size = 16
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-black leading-none shrink-0 ${className}`}
    >
      P
    </div>
  );
}
