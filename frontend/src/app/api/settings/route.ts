import { NextResponse } from 'next/server';
import { getWaynevenApiToken } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

  // Default fallback values
  const defaultSettings = {
    shipping_fee: 150,
    vat_rate: 7,
    points_rate: 100,
    low_stock_threshold: 10,
    currency: 'THB',
  };

  try {
    const token = await getWaynevenApiToken();
    if (!token) {
      return NextResponse.json({ data: defaultSettings, source: 'default_no_token' });
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/settings/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Branch-Id': '1',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[api/settings] Failed to fetch settings: status ${res.status}`);
      return NextResponse.json({ data: defaultSettings, source: 'fallback_error' });
    }

    const json = await res.json();
    const settingsList: any[] = json?.data?.settings || json?.settings || [];

    const parsedSettings = { ...defaultSettings };

    settingsList.forEach((item) => {
      if (!item || !item.key) return;
      const key = String(item.key).toLowerCase();
      const val = item.value;

      if (key === 'shipping_fee') {
        parsedSettings.shipping_fee = Number(val) || defaultSettings.shipping_fee;
      } else if (key === 'vat_rate' || key === 'tax_rate') {
        parsedSettings.vat_rate = Number(val) ?? defaultSettings.vat_rate;
      } else if (key === 'points_rate' || key === 'loyalty_points_per_baht') {
        parsedSettings.points_rate = Number(val) || defaultSettings.points_rate;
      } else if (key === 'low_stock_threshold') {
        parsedSettings.low_stock_threshold = Number(val) || defaultSettings.low_stock_threshold;
      } else if (key === 'currency') {
        parsedSettings.currency = String(val) || 'THB';
      }
    });

    return NextResponse.json(
      { data: parsedSettings, source: 'api' },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('[api/settings] Error fetching settings:', error);
    return NextResponse.json({ data: defaultSettings, source: 'catch_fallback' });
  }
}
