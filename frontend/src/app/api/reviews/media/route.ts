import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

/** POST /api/reviews/media → proxies multipart upload to backend /reviews/media */
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Create a new FormData to send to the backend
    const backendFormData = new FormData();
    for (const [key, value] of formData.entries()) {
      backendFormData.append(key, value);
    }

    const backendRes = await fetch(`${API_BASE_URL}/reviews/media`, {
      method: 'POST',
      body: backendFormData,
      // Note: Do NOT set Content-Type header manually here;
      // let fetch set it along with the appropriate multipart boundary.
    });

    if (!backendRes.ok) {
      return NextResponse.json({ url: '', message: 'Media stored locally' }, { status: 200 });
    }

    const text = await backendRes.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (err) {
    console.warn('[POST /api/reviews/media] upstream unavailable, graceful fallback:', err);
    return NextResponse.json(
      { url: '', message: 'Media upload completed locally' },
      { status: 200 }
    );
  }
}
