import React from 'react';
import { Clock, CheckCircle2, Truck, Package, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusMap: Record<string, { label: string; bg: string; text: string; border: string; icon: React.ComponentType<any> }> = {
    pending: {
      label: 'รอดำเนินการ',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      icon: Clock,
    },
    confirmed: {
      label: 'ยืนยันแล้ว',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      icon: CheckCircle2,
    },
    shipped: {
      label: 'จัดส่งแล้ว',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/20',
      icon: Truck,
    },
    delivered: {
      label: 'ส่งถึงแล้ว',
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/20',
      icon: Package,
    },
    payment_rejected: {
      label: 'ชำระเงินไม่ผ่าน',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
      icon: XCircle,
    },
  };

  const current = statusMap[status] || {
    label: status,
    bg: 'bg-stone-500/10',
    text: 'text-stone-400',
    border: 'border-stone-500/20',
    icon: Clock,
  };

  const Icon = current.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${current.bg} ${current.text} ${current.border}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{current.label}</span>
    </span>
  );
}
