import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';

/** Decode JWT payload server-side to extract user_id */
function decodeJwtUserId(authHeader: string): string | null {
  try {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const payload = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
    return String(payload.id || payload.sub || payload.user_id || '');
  } catch {
    return null;
  }
}

async function tryFetch(url: string, authHeader: string): Promise<any[] | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json', Authorization: authHeader },
      next: { revalidate: 0 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data as any)?.reviews ?? (data as any)?.data ?? null;
    return Array.isArray(list) ? list : null;
  } catch {
    return null;
  }
}

/**
 * GET /api/reviews/user
 * Tries two user-specific endpoints in order — never fetches all reviews.
 *   1. GET /reviews/user/{user_id}
 *   2. GET /reviews?user_id={user_id}
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? '';
  if (!authHeader) return NextResponse.json([], { status: 200 });

  const userId = decodeJwtUserId(authHeader);
  if (!userId) return NextResponse.json([], { status: 200 });

  // Try 1: path-based  /reviews/user/{user_id}
  const result1 = await tryFetch(`${API_BASE_URL}/reviews/user/${userId}`, authHeader);
  if (result1 !== null) {
    return NextResponse.json(result1, { status: 200 });
  }

  // Try 2: query-param  /reviews?user_id={user_id}
  const result2 = await tryFetch(`${API_BASE_URL}/reviews?user_id=${userId}`, authHeader);
  if (result2 !== null) {
    return NextResponse.json(result2, { status: 200 });
  }

  // Both failed — return empty, never pull all reviews
  return NextResponse.json([], { status: 200 });
}
