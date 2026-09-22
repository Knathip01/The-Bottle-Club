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
  isFeatured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export const DEFAULT_PROMOTIONS: PromotionItem[] = [
  {
    id: 'grand-cru-2026',
    title: 'GRAND CRU & VINTAGE SELECTION',
    subtitle: 'คอลเลกชันไวน์วินเทจระดับพรีเมียม',
    description: 'สิทธิพิเศษสำหรับสมาชิก The Bottle Club รับส่วนลดสูงสุด 30% สำหรับไวน์คอลเลกชัน Grand Cru คัดสรรพิเศษ พร้อมบริการจัดส่งควบคุมอุณหภูมิฟรี',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop',
    badge: 'FEATURED PROMOTION',
    discountTag: 'UP TO 30% OFF',
    validUntil: 'จำกัดเวลาสิทธิพิเศษ',
    linkUrl: '/#products',
    ctaText: 'ดูสินค้าโปรโมชั่น',
    isFeatured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: 'welcome-privilege',
    title: 'Welcome Member Bonus',
    subtitle: 'สิทธิพิเศษต้อนรับสมาชิกใหม่',
    description: 'สมัครสมาชิกวันนี้ รับโค้ดส่วนลด 500 บาท ทันทีเมื่อมียอดสั่งซื้อไวน์ครั้งแรกตั้งแต่ 2,500 บาทขึ้นไป',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=800&auto=format&fit=crop',
    badge: 'NEW MEMBER',
    discountTag: 'ลดทันที 500฿',
    validUntil: 'สำหรับสมาชิกใหม่',
    linkUrl: '/register',
    ctaText: 'สมัครรับสิทธิ์',
    isFeatured: false,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: 'sommelier-pairings',
    title: 'Sommelier Curated Sets',
    subtitle: 'ชุดเซ็ตไวน์จับคู่อาหารค่ำ',
    description: 'แพ็กเกจไวน์นำเข้าจับคู่จานโปรด คัดสรรโดยซอมเมอลิเยร์มืออาชีพ ให้คุณเพลิดเพลินกับมื้อค่ำสุดหรูที่บ้าน',
    imageUrl: 'https://images.unsplash.com/photo-1528823872057-9c018a7a7553?q=80&w=800&auto=format&fit=crop',
    badge: 'CURATED BUNDLE',
    discountTag: 'BUY 2 GET 10%',
    validUntil: 'มีจำนวนจำกัด',
    linkUrl: '/#products',
    ctaText: 'เลือกดูเซ็ตไวน์',
    isFeatured: false,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: 'cold-chain-express',
    title: 'Cold-Chain Express Delivery',
    subtitle: 'จัดส่งด่วนแบบควบคุมอุณหภูมิ',
    description: 'รักษามาตรฐานและรสชาติไวน์ทุกขวดด้วยรถห้องเย็นพิเศษ จัดส่งฟรีทั่วกรุงเทพฯ และปริมณฑลเมื่อช้อปครบ 3,000 บาท',
    imageUrl: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?q=80&w=800&auto=format&fit=crop',
    badge: 'COMPLIMENTARY',
    discountTag: 'FREE SHIPPING',
    validUntil: 'ทุกวันไม่มีวันหยุด',
    linkUrl: '/#products',
    ctaText: 'สั่งซื้อเลย',
    isFeatured: false,
    isActive: true,
    sortOrder: 4,
  },
];

// Global in-memory storage fallback when external database is restarting/offline
declare global {
  // eslint-disable-next-line no-var
  var __promotionsStore: PromotionItem[] | undefined;
}

export function getInMemPromotions(): PromotionItem[] {
  if (!global.__promotionsStore) {
    global.__promotionsStore = [...DEFAULT_PROMOTIONS];
  }
  return global.__promotionsStore;
}

export function setInMemPromotions(items: PromotionItem[]) {
  global.__promotionsStore = items;
}

/**
 * Fetch promotions from database if table exists, falling back to in-memory store / DEFAULT_PROMOTIONS
 */
export async function getPromotions(): Promise<PromotionItem[]> {
  try {
    if (typeof window === 'undefined') {
      try {
        const { query } = await import('@/lib/db');
        const res = await query(
          `SELECT id, title, subtitle, description, image_url as "imageUrl", badge, 
                  discount_tag as "discountTag", valid_until as "validUntil", link_url as "linkUrl", 
                  cta_text as "ctaText", is_featured as "isFeatured", is_active as "isActive", sort_order as "sortOrder"
           FROM promotions
           WHERE is_active = true
           ORDER BY sort_order ASC, created_at DESC`
        );
        if (res.rows && res.rows.length > 0) {
          return res.rows;
        }
      } catch {
        // Fallback to in-memory store
      }
    }
    return getInMemPromotions().filter((p) => p.isActive !== false);
  } catch {
    return DEFAULT_PROMOTIONS;
  }
}
