import { NextResponse } from 'next/server';
import { getPromotions } from '@/lib/promotions.server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const promotions = await getPromotions();
    return NextResponse.json({ success: true, data: promotions });
  } catch (error) {
    console.error('[API /api/promotions] Error:', error);
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}
