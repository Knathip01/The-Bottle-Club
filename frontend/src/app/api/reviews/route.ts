import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

/** GET /api/reviews?wine_id=123 → proxies to backend /reviews/wine/123 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wineId = searchParams.get('wine_id');

  if (!wineId) {
    return NextResponse.json({ error: 'wine_id is required' }, { status: 400 });
  }

  try {
    const backendRes = await fetch(
      `${API_BASE_URL}/reviews/wine/${wineId}`,
      {
        headers: { Accept: 'application/json' },
        next: { revalidate: 0 }, // always fresh
      }
    );

    const text = await backendRes.text();

    if (!backendRes.ok) {
      return NextResponse.json(
        { error: text },
        { status: backendRes.status }
      );
    }

    const data = JSON.parse(text);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error('[GET /api/reviews] upstream error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch reviews from upstream' },
      { status: 502 }
    );
  }
}

/** POST /api/reviews → proxies to backend POST /reviews */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();

    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.error('[POST /api/reviews] error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
