import promotionsRaw from './promotions_data.json';

export interface PromotionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  badge: string;
  discountTag?: string;
  validUntil?: string;
  linkUrl: string;
  ctaText: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder?: number;
}

// Helper to normalize any promotion object (handling snake_case and camelCase)
export function normalizePromotion(item: any): PromotionItem {
  if (!item) {
    return {
      id: 'default-promo',
      title: 'The Bottle Club',
      subtitle: '',
      description: 'Exclusive Wine & Spirits',
      imageUrl: '/images/wine_banner.png',
      badge: 'PROMOTION',
      discountTag: '',
      validUntil: '',
      linkUrl: '/#products',
      ctaText: 'ดูสินค้าโปรโมชั่น',
      isFeatured: true,
      isActive: true,
      sortOrder: 1,
    };
  }
  const imageUrl = item.imageUrl || item.image_url || '';
  return {
    id: String(item.id || `promo-${Date.now()}`),
    title: String(item.title || ''),
    subtitle: item.subtitle ? String(item.subtitle) : '',
    description: String(item.description || ''),
    imageUrl,
    badge: String(item.badge || 'PROMOTION'),
    discountTag: item.discountTag || item.discount_tag || '',
    validUntil: item.validUntil || item.valid_until || '',
    linkUrl: item.linkUrl || item.link_url || '/#products',
    ctaText: item.ctaText || item.cta_text || 'ดูสินค้าโปรโมชั่น',
    isFeatured: Boolean(item.isFeatured ?? item.is_featured),
    isActive: item.isActive !== undefined ? Boolean(item.isActive) : (item.is_active !== undefined ? Boolean(item.is_active) : true),
    sortOrder: Number(item.sortOrder || item.sort_order || 0),
  };
}

export const DEFAULT_PROMOTIONS: PromotionItem[] = Array.isArray(promotionsRaw) && promotionsRaw.length > 0
  ? promotionsRaw.map(normalizePromotion)
  : [
      {
        id: 'grand-cru-2026',
        title: 'GRAND CRU EXCLUSIVE SELECTION',
        subtitle: 'คัดสรรสุดยอดไวน์พรีเมียมจากแคว้นบอร์โดซ์และเบอร์กันดี',
        description: 'สัมผัสประสบการณ์สุนทรียภาพแห่งรสชาติกับไวน์ระดับกรองด์ ปรีซ์ พร้อมส่วนลดพิเศษสูงสุด 20% สำหรับสมาชิก The Bottle Club ตลอดเดือนนี้เท่านั้น',
        imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1200&auto=format&fit=crop',
        badge: 'EXCLUSIVE DEALS',
        discountTag: 'UP TO 20% OFF',
        validUntil: 'หมดเขตสิ้นเดือนนี้',
        linkUrl: '/#products',
        ctaText: 'ดูรายการไวน์พิเศษ',
        isFeatured: true,
        isActive: true,
        sortOrder: 1,
      },
    ];
