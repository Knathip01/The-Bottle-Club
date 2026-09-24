import fs from 'fs';
import path from 'path';
import { PromotionItem, normalizePromotion, DEFAULT_PROMOTIONS } from './promotions.types';

export * from './promotions.types';

function getJsonFilePath(): string {
  // Statically scoped to avoid NFT whole-project tracing warning
  const explicitPath = 'C:\\ProjectbottleClub1\\frontend\\src\\lib\\promotions_data.json';
  if (fs.existsSync(explicitPath)) return explicitPath;
  const localPath = path.resolve(__dirname, 'promotions_data.json');
  if (fs.existsSync(localPath)) return localPath;
  return explicitPath;
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

// Global in-memory storage fallback
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
 * 2. From in-memory store
 * 3. Fallback to DEFAULT_PROMOTIONS
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

    // 2. Check in-memory store
    const inMem = getInMemPromotions();
    if (inMem && inMem.length > 0) {
      return inMem.filter((p) => p.isActive !== false);
    }

    return DEFAULT_PROMOTIONS;
  } catch {
    return DEFAULT_PROMOTIONS;
  }
}

export async function getPromotionById(id: string): Promise<PromotionItem | null> {
  const promotions = await getPromotions();
  const found = promotions.find((p) => p.id === id);
  if (found) return found;

  const fileItems = readPromotionsFromFile();
  if (fileItems && fileItems.length > 0) {
    const rawFound = fileItems.find((p) => p.id === id);
    if (rawFound) return rawFound;
  }

  const defaultFound = DEFAULT_PROMOTIONS.find((p) => p.id === id);
  if (defaultFound) return defaultFound;

  return null;
}
