import fs from 'fs';
import path from 'path';
import { PromotionItem, normalizePromotion, DEFAULT_PROMOTIONS } from './promotions.types';

export * from './promotions.types';

function getJsonFilePath(): string {
  const candidates = [
    path.join(process.cwd(), 'src', 'lib', 'promotions_data.json'),
    path.join(process.cwd(), 'frontend', 'src', 'lib', 'promotions_data.json'),
    'C:\\ProjectbottleClub1\\frontend\\src\\lib\\promotions_data.json',
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

export function readPromotionsFromFile(): PromotionItem[] | null {
  try {
    const jsonPath = getJsonFilePath();
    if (fs.existsSync(jsonPath)) {
      const fileContent = fs.readFileSync(jsonPath, 'utf8');
      const parsed = JSON.parse(fileContent);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizePromotion);
      }
    }
  } catch (e) {
    console.warn('[Promotions] Could not read promotions_data.json:', e);
  }
  return null;
}

export function savePromotionsToFile(items: PromotionItem[]): boolean {
  try {
    const jsonPath = getJsonFilePath();
    fs.writeFileSync(jsonPath, JSON.stringify(items, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.warn('[Promotions] Could not write promotions_data.json:', e);
  }
  return false;
}

// Global in-memory storage fallback when external database is restarting/offline
declare global {
  // eslint-disable-next-line no-var
  var __promotionsStore: PromotionItem[] | undefined;
}

export function getInMemPromotions(): PromotionItem[] {
  if (!global.__promotionsStore) {
    const fromFile = readPromotionsFromFile();
    global.__promotionsStore = fromFile && fromFile.length > 0 ? fromFile : [...DEFAULT_PROMOTIONS];
  }
  return global.__promotionsStore;
}

export function setInMemPromotions(items: PromotionItem[]) {
  global.__promotionsStore = items.map(normalizePromotion);
  savePromotionsToFile(global.__promotionsStore);
}

/**
 * Fetch promotions:
 * 1. From local promotions_data.json (where project-admin-wine updates are stored)
 * 2. From PostgreSQL database if configured
 * 3. From in-memory store
 * 4. Fallback to DEFAULT_PROMOTIONS
 */
export async function getPromotions(): Promise<PromotionItem[]> {
  try {
    // 1. Check local file storage (promotions_data.json)
    const fileItems = readPromotionsFromFile();
    if (fileItems && fileItems.length > 0) {
      const active = fileItems.filter((p) => p.isActive !== false);
      if (active.length > 0) {
        return active;
      }
    }

    // 2. Check PostgreSQL database
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
        return res.rows.map(normalizePromotion);
      }
    } catch {
      // Fallback
    }

    // 3. Check in-memory store
    const inMem = getInMemPromotions();
    if (inMem && inMem.length > 0) {
      return inMem.filter((p) => p.isActive !== false);
    }

    return DEFAULT_PROMOTIONS;
  } catch {
    return DEFAULT_PROMOTIONS;
  }
}
