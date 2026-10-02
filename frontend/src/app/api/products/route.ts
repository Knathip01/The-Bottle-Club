import { NextResponse } from 'next/server';
import { getWineProducts } from '@/lib/products';
import { getSession } from '@/lib/auth-utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || searchParams.get('q') || undefined;
    const category = searchParams.get('category') || undefined;
    const countries = searchParams.get('countries') || searchParams.get('country') || undefined;
    const brands = searchParams.get('brands') || searchParams.get('brand') || undefined;
    const page = parseInt(searchParams.get('page') || '1', 10) || 1;
    const per_page = Math.min(100, Math.max(1, parseInt(searchParams.get('per_page') || '24', 10) || 24));
    const sort = searchParams.get('sort') || undefined;

    const session = await getSession();
    const token = session?.user?.access_token;

    const result = await getWineProducts({
      search,
      category,
      countries,
      brands,
      page,
      per_page,
      sort,
      token,
    });

    const requestId = crypto.randomUUID();

    return NextResponse.json({
      data: {
        items: result.products,
        total: result.total,
        page: result.page,
        per_page: result.per_page,
        pages: result.pages,
      },
      meta: {
        page: result.page,
        per_page: result.per_page,
        total: result.total,
      },
      // Backward compatibility fields
      products: result.products,
      total: result.total,
      page: result.page,
      pages: result.pages,
      request_id: requestId,
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[api/products] fetch failed:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch products',
        data: { items: [], total: 0, page: 1, per_page: 24, pages: 1 },
        meta: { page: 1, per_page: 24, total: 0 },
        products: [],
      },
      { status: 500 }
    );
  }
}
