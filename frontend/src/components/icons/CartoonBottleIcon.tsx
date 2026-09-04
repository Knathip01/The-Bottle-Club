import React from 'react';

interface CartoonBottleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function CartoonBottleIcon({
  size = 24,
  className,
  ...props
}: CartoonBottleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Cork */}
      <path d="M11.5 3V1.5c0-.3.2-.5.5-.5h0c.3 0 .5.2.5.5V3" strokeWidth={1.5} />
      
      {/* Collar/Rim */}
      <path d="M9.5 3h5" />

      {/* Bottle Outline */}
      <path d="M10 3v4.5l-3 2.5v9c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-9l-3-2.5V3" />
      
      {/* Liquid level */}
      <path d="M7.5 14.5c1.5-.8 2.5.8 4 0s2.5.8 4 0" strokeWidth={1.5} opacity={0.65} />
      
      {/* Label */}
      <rect x="9.5" y="15.5" width="5" height="3.5" rx="0.5" strokeWidth={1.2} />
      
      {/* Cute face above label */}
      <circle cx="10.8" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="12" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.6 13c.4.3.4.3.8 0" strokeWidth={1} fill="none" />
      
      {/* Tiny Sparkles */}
      <path d="M18.5 5.5l.3.3-.3.3-.3-.3z" fill="currentColor" stroke="none" />
      <path d="M5.5 8.5l.2.2-.2.2-.2-.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
