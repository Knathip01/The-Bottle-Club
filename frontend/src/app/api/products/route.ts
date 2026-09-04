import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();
    const token = session?.user?.access_token;
    const products = await getProducts(undefined, token);
    return NextResponse.json(products, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[api/products] fetch failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', products: [] },
      { status: 500 }
    );
  }
}
