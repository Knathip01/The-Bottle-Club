'use client';

import Link from 'next/link';
import { WineriesShieldIcon } from './WineriesShieldIcon';

interface WineriesNavDropdownProps {
  label: string;
}

export default function WineriesNavDropdown({ label }: WineriesNavDropdownProps) {
  return (
    <Link
      href="/wineries"
      className="nav-link-line group flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2 text-stone-700 transition-all duration-300 hover:bg-[#a11a1a]/5 hover:text-[#a11a1a]"
    >
      <WineriesShieldIcon
        size={16}
        className="text-stone-700 transition-colors duration-300 group-hover:text-[#a11a1a]"
      />
      <span className="text-[0.78rem] font-bold tracking-wide text-stone-800 group-hover:text-[#a11a1a]">
        {label}
      </span>
    </Link>
  );
}
