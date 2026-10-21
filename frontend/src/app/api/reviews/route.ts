import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getSession } from '@/lib/auth-utils';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const SHARED_REVIEWS_FILE = path.resolve('C:\\ProjectbottleClub1\\shared\\reviews.json');

function readSharedReviews(): any[] {
  try {
    if (fs.existsSync(SHARED_REVIEWS_FILE)) {
      const data = fs.readFileSync(SHARED_REVIEWS_FILE, 'utf8');
      return JSON.parse(data) || [];
    }
  } catch (e) {
    console.warn('[reviews] Failed to read shared reviews:', e);
  }
  return [];
}

function writeSharedReviews(reviews: any[]) {
  try {
    const dir = path.dirname(SHARED_REVIEWS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SHARED_REVIEWS_FILE, JSON.stringify(reviews, null, 2), 'utf8');
  } catch (e) {
    console.error('[reviews] Failed to write shared reviews:', e);
  }
}

/** GET /api/reviews?wine_id=123 → retrieves reviews */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const wineId = searchParams.get('wine_id') || searchParams.get('product_id');
  const all = searchParams.get('all') === 'true';

  const shared = readSharedReviews();

  // If requesting all (for admin sync or general list)
  if (all || !wineId) {
    return NextResponse.json(shared, {
      status: 200,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  }

  const parsedId = parseInt(wineId, 10);
  if (isNaN(parsedId)) {
    return NextResponse.json([], { status: 200 });
  }

  // Filter shared reviews for this product
  const productReviews = shared.filter(
    (r) => Number(r.product_id) === parsedId || Number(r.productId) === parsedId
  );

  return NextResponse.json(productReviews, {
    status: 200,
    headers: { 'Cache-Control': 'no-store, max-age=0' },
  });
}

/** POST /api/reviews → saves a review persistently and syncs with Admin POS */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const productId = parseInt(String(body.wine_id || body.product_id), 10);
    const userId = String(body.user_id || 'guest');
    const userName = String(body.user_name || body.username || body.name || 'ลูกค้าสมาชิก');
    const rating = Math.min(5, Math.max(1, parseInt(String(body.rating), 10) || 5));
    const comment = String(body.comment || '');
    const images = Array.isArray(body.images) ? body.images : [];
    const videos = Array.isArray(body.videos) ? body.videos : [];
    const productName = String(body.product_name || body.productName || `สินค้าไวน์ #${productId}`);

    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Valid product_id is required' }, { status: 400 });
    }

    const now = new Date();
    const newReview = {
      id: Date.now(),
      product_id: productId,
      productId: productId,
      product_name: productName,
      productName: productName,
      user_id: userId,
      userId: userId,
      user_name: userName,
      userName: userName,
      username: userName,
      customer_name: userName,
      customer_id: isNaN(Number(userId)) ? null : Number(userId),
      rating,
      comment,
      images,
      videos,
      is_approved: true, // Visible on the storefront
      isApproved: true,
      status: 'pending', // Marked as pending in Admin for moderation
      created_at: now.toISOString(),
      createdAt: now.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    };

    // 1. Save to shared reviews file (persisted for Admin POS & Storefront)
    const shared = readSharedReviews();
    shared.unshift(newReview);
    writeSharedReviews(shared);

    // 2. Best-effort forward to Wayneven API (if endpoint is active and authenticated)
    try {
      const session = await getSession();
      const token = session?.user?.access_token;
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      fetch(`${API_BASE_URL}/api/v1/reviews/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          product_id: productId,
          customer_id: isNaN(Number(userId)) ? 1 : Number(userId),
          rating,
          comment,
        }),
      }).catch(() => {});
    } catch {}

    // 3. Best-effort write to local postgres
    try {
      await query(
        `INSERT INTO product_reviews (product_id, user_id, user_name, rating, comment, is_approved)
         VALUES ($1, $2, $3, $4, $5, true)`,
        [productId, userId, userName, rating, comment]
      ).catch(() => {});
    } catch {}

    return NextResponse.json(newReview, {
      status: 201,
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    });
  } catch (err: any) {
    console.error('[POST /api/reviews] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to save review' }, { status: 500 });
  }
}
