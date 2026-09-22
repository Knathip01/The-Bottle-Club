import { NextResponse } from 'next/server';
import { getInMemPromotions, setInMemPromotions, PromotionItem, DEFAULT_PROMOTIONS } from '@/lib/promotions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let items: PromotionItem[] = [];
    try {
      const { query } = await import('@/lib/db');
      const res = await query(
        `SELECT id, title, subtitle, description, image_url as "imageUrl", badge, 
                discount_tag as "discountTag", valid_until as "validUntil", link_url as "linkUrl", 
                cta_text as "ctaText", is_featured as "isFeatured", is_active as "isActive", sort_order as "sortOrder"
         FROM promotions
         ORDER BY sort_order ASC, created_at DESC`
      );
      if (res.rows && res.rows.length > 0) {
        items = res.rows;
      }
    } catch {
      // Fallback
    }

    if (items.length === 0) {
      items = getInMemPromotions();
    }

    return NextResponse.json({ success: true, data: items });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, title, subtitle, description, imageUrl, badge, discountTag, validUntil, linkUrl, ctaText, isFeatured, isActive } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ success: false, message: 'กรุณาระบุชื่อโปรโมชั่นและรูปภาพ' }, { status: 400 });
    }

    const promoId = id || `promo-${Date.now()}`;
    const newPromo: PromotionItem = {
      id: promoId,
      title,
      subtitle: subtitle || '',
      description: description || '',
      imageUrl,
      badge: badge || 'PROMOTION',
      discountTag: discountTag || '',
      validUntil: validUntil || '',
      linkUrl: linkUrl || '/#products',
      ctaText: ctaText || 'ดูสินค้าโปรโมชั่น',
      isFeatured: !!isFeatured,
      isActive: isActive !== false,
      sortOrder: Number(body.sortOrder) || 1,
    };

    // Try database
    let dbSaved = false;
    try {
      const { query } = await import('@/lib/db');
      await query(`
        CREATE TABLE IF NOT EXISTS promotions (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          subtitle VARCHAR(255),
          description TEXT NOT NULL,
          image_url TEXT NOT NULL,
          badge VARCHAR(100),
          discount_tag VARCHAR(100),
          valid_until VARCHAR(100),
          link_url VARCHAR(255),
          cta_text VARCHAR(100),
          is_featured BOOLEAN DEFAULT FALSE,
          is_active BOOLEAN DEFAULT TRUE,
          sort_order INT DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      await query(
        `INSERT INTO promotions (id, title, subtitle, description, image_url, badge, discount_tag, valid_until, link_url, cta_text, is_featured, is_active, sort_order, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP)
         ON CONFLICT (id) DO UPDATE SET
           title = EXCLUDED.title,
           subtitle = EXCLUDED.subtitle,
           description = EXCLUDED.description,
           image_url = EXCLUDED.image_url,
           badge = EXCLUDED.badge,
           discount_tag = EXCLUDED.discount_tag,
           valid_until = EXCLUDED.valid_until,
           link_url = EXCLUDED.link_url,
           cta_text = EXCLUDED.cta_text,
           is_featured = EXCLUDED.is_featured,
           is_active = EXCLUDED.is_active,
           sort_order = EXCLUDED.sort_order,
           updated_at = CURRENT_TIMESTAMP`,
        [newPromo.id, newPromo.title, newPromo.subtitle, newPromo.description, newPromo.imageUrl, newPromo.badge, newPromo.discountTag, newPromo.validUntil, newPromo.linkUrl, newPromo.ctaText, newPromo.isFeatured, newPromo.isActive, newPromo.sortOrder]
      );
      dbSaved = true;
    } catch {
      // In-memory update
    }

    // Always keep in-memory store in sync
    const current = getInMemPromotions();
    const existingIndex = current.findIndex((p) => p.id === promoId);
    if (existingIndex >= 0) {
      current[existingIndex] = newPromo;
    } else {
      current.unshift(newPromo);
    }
    setInMemPromotions([...current]);

    return NextResponse.json({ success: true, data: newPromo, dbSaved });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 });
    }

    try {
      const { query } = await import('@/lib/db');
      await query(`DELETE FROM promotions WHERE id = $1`, [id]);
    } catch {
      // ignore
    }

    const current = getInMemPromotions();
    setInMemPromotions(current.filter((p) => p.id !== id));

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
