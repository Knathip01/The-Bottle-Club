import { WINERIES_DATA, type Winery } from './wineriesData';
import { SPANISH_WINERY_LISTINGS } from './spanishWineryListings';
import { UNITED_STATES_WINERY_LISTINGS } from './unitedStatesWineryListings';
import { AUSTRALIAN_WINERY_LISTINGS } from './australianWineryListings';

const addedCountryListings = [
  ...SPANISH_WINERY_LISTINGS,
  ...UNITED_STATES_WINERY_LISTINGS,
  ...AUSTRALIAN_WINERY_LISTINGS,
];
const addedListingsBySlug = new Map(addedCountryListings.map((winery) => [winery.seo_name, winery]));
const existingWinerySlugs = new Set(WINERIES_DATA.map((winery) => winery.seo_name));
const rawExplorerData: Winery[] = [
  ...WINERIES_DATA.map((winery) => {
    const listing = addedListingsBySlug.get(winery.seo_name);
    return listing ? { ...winery, ...listing, id: winery.id, wines: winery.wines } : winery;
  }),
  ...addedCountryListings.filter((winery) => !existingWinerySlugs.has(winery.seo_name)),
];

const seenExplorerSlugs = new Set<string>();
export const ALL_WINERIES_CATALOG: Winery[] = rawExplorerData.filter((winery) => {
  const slug = winery.seo_name.toLowerCase();
  if (seenExplorerSlugs.has(slug)) return false;
  seenExplorerSlugs.add(slug);
  return true;
});

// Normalize text for diacritics, punctuation and whitespace
export function normalizeWineString(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Match scanned wine name and/or producer against the official /wineries catalog.
 * Returns the matched Winery object if found, or null if there is no match in /wineries.
 */
export function matchWineryFromCatalog(
  wineName: string,
  producerName?: string,
): { winery: Winery; confidence: number } | null {
  const wineNorm = normalizeWineString(wineName);
  const prodNorm = normalizeWineString(producerName || '');

  if (!wineNorm && !prodNorm) return null;

  for (const winery of ALL_WINERIES_CATALOG) {
    const nameNorm = normalizeWineString(winery.name);
    const bizNorm = normalizeWineString(winery.business_name || '');
    const seoNorm = normalizeWineString(winery.seo_name.replace(/-/g, ' '));

    // 1. Direct producer match against winery name / business name / slug
    if (prodNorm) {
      if (prodNorm === nameNorm || prodNorm === bizNorm || prodNorm === seoNorm) {
        return { winery, confidence: 100 };
      }
      if (nameNorm.length >= 4 && (prodNorm.includes(nameNorm) || nameNorm.includes(prodNorm))) {
        return { winery, confidence: 99 };
      }
      if (bizNorm.length >= 4 && (prodNorm.includes(bizNorm) || bizNorm.includes(prodNorm))) {
        return { winery, confidence: 98 };
      }
      if (seoNorm.length >= 4 && (prodNorm.includes(seoNorm) || seoNorm.includes(prodNorm))) {
        return { winery, confidence: 97 };
      }
    }

    // 2. Full wine name contains winery name or business name
    if (nameNorm.length >= 4 && wineNorm.includes(nameNorm)) {
      return { winery, confidence: 98 };
    }
    if (bizNorm.length >= 4 && wineNorm.includes(bizNorm)) {
      return { winery, confidence: 96 };
    }
    if (seoNorm.length >= 4 && wineNorm.includes(seoNorm)) {
      return { winery, confidence: 94 };
    }

    // 3. Match specific wines in this winery's portfolio
    if (winery.wines && winery.wines.length > 0) {
      for (const w of winery.wines) {
        const wNorm = normalizeWineString(w.name);
        // Exclude overly generic grape/style names when matching
        const genericTerms = ['red', 'white', 'rose', 'sparkling', 'brut', 'reserva', 'gran reserva', 'vintage', 'blanc'];
        if (wNorm.length >= 5 && !genericTerms.includes(wNorm) && wineNorm.includes(wNorm)) {
          return { winery, confidence: 92 };
        }
      }
    }
  }

  return null;
}
