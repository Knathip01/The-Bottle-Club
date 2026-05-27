'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function ConfirmationRedirectPage() {
  const { orderId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      router.replace(`/confirm-payment/${orderId}`);
    } else {
      router.replace('/account/orders');
    }
  }, [orderId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-stone-400" size={32} />
        <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">Redirecting to confirmation page...</p>
      </div>
    </div>
  );
}
