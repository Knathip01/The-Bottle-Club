/**
 * allWineriesData.ts
 * Exports the combined, de-duplicated winery list used by both the
 * WineriesExplorer page (/wineries) and the AI wine-scanner feature.
 */

import { WINERIES_DATA, type Winery } from './wineriesData';
import { SPANISH_WINERY_LISTINGS } from './spanishWineryListings';
import { UNITED_STATES_WINERY_LISTINGS } from './unitedStatesWineryListings';
import { AUSTRALIAN_WINERY_LISTINGS } from './australianWineryListings';

const addedCountryListings: Winery[] = [
  ...SPANISH_WINERY_LISTINGS,
  ...UNITED_STATES_WINERY_LISTINGS,
  ...AUSTRALIAN_WINERY_LISTINGS,
];
const addedListingsBySlug = new Map(
  addedCountryListings.map((w) => [w.seo_name, w]),
);
const existingWinerySlugs = new Set(WINERIES_DATA.map((w) => w.seo_name));

const rawAll: Winery[] = [
  ...WINERIES_DATA.map((w) => {
    const listing = addedListingsBySlug.get(w.seo_name);
    return listing ? { ...w, ...listing, id: w.id, wines: w.wines } : w;
  }),
  ...addedCountryListings.filter((w) => !existingWinerySlugs.has(w.seo_name)),
];

const seen = new Set<string>();
export const ALL_WINERIES: Winery[] = rawAll.filter((w) => {
  const slug = w.seo_name.toLowerCase();
  if (seen.has(slug)) return false;
  seen.add(slug);
  return true;
});

/**
 * Remove accents / diacritics and non-alphanumeric chars for robust matching.
 * Examples: "Château Margaux" -> "chateau margaux", "Viña Loriente" -> "vina loriente"
 */
export function normalizeWineText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .replace(/[^a-z0-9\s]/g, ' ')   // replace punctuation with space
    .replace(/\s+/g, ' ')           // collapse whitespace
    .trim();
}

/**
 * Common prefixes in winery names to optionally strip for root matching
 */
const WINERY_STOP_WORDS = new Set([
  'chateau', 'chateaux', 'domaine', 'bodega', 'bodegas', 'tenuta',
  'cantina', 'weingut', 'vina', 'vinas', 'winery', 'vineyards', 'estate',
  'cellars', 'family', 'wines', 'de', 'del', 'la', 'le', 'les', 'the',
]);

function extractKeyTokens(text: string): string[] {
  const norm = normalizeWineText(text);
  return norm
    .split(' ')
    .filter((w) => w.length > 2 && !WINERY_STOP_WORDS.has(w));
}

/**
 * Find a winery whose name matches `query` (or `producer` + `wineName`).
 * Enforces strict matching so ONLY genuine winery names present in /wineries
 * will be matched.
 */
export function findMatchingWinery(
  query: string,
  producer?: string,
): { winery: Winery; confidence: number; matchedBy: string } | null {
  const candidateQueries = [query, producer].filter(Boolean) as string[];
  if (candidateQueries.length === 0) return null;

  let bestMatch: { winery: Winery; confidence: number; matchedBy: string } | null = null;

  for (const q of candidateQueries) {
    const qNorm = normalizeWineText(q);
    if (!qNorm) continue;
    const qTokens = extractKeyTokens(q);

    for (const winery of ALL_WINERIES) {
      const nameNorm = normalizeWineText(winery.name);
      const bizNorm = normalizeWineText(winery.business_name || '');
      const seoNorm = normalizeWineText(winery.seo_name.replace(/-/g, ' '));

      // 1. Exact match (100% confidence)
      if (qNorm === nameNorm || qNorm === bizNorm || qNorm === seoNorm) {
        return { winery, confidence: 100, matchedBy: 'exact_name' };
      }

      // 2. Full phrase inclusion (e.g. "vina loriente tempranillo" includes "vina loriente")
      if (
        (nameNorm.length >= 4 && qNorm.includes(nameNorm)) ||
        (bizNorm.length >= 4 && qNorm.includes(bizNorm)) ||
        (seoNorm.length >= 4 && qNorm.includes(seoNorm))
      ) {
        if (!bestMatch || bestMatch.confidence < 95) {
          bestMatch = { winery, confidence: 95, matchedBy: 'winery_phrase_contained' };
        }
        continue;
      }

      // 3. Reverse inclusion (winery name contains full search term if search term >= 5 chars)
      if (qNorm.length >= 5 && (nameNorm.includes(qNorm) || bizNorm.includes(qNorm))) {
        if (!bestMatch || bestMatch.confidence < 90) {
          bestMatch = { winery, confidence: 90, matchedBy: 'query_in_winery_name' };
        }
        continue;
      }

      // 4. Match against specific wine names within the winery's portfolio
      if (winery.wines && winery.wines.length > 0) {
        let winePortfolioMatch = false;
        for (const w of winery.wines) {
          const wineNameNorm = normalizeWineText(w.name);
          if (wineNameNorm.length >= 4 && qNorm.includes(wineNameNorm)) {
            winePortfolioMatch = true;
            break;
          }
        }
        if (winePortfolioMatch) {
          if (!bestMatch || bestMatch.confidence < 88) {
            bestMatch = { winery, confidence: 88, matchedBy: 'wine_portfolio_match' };
          }
          continue;
        }
      }

      // 5. Distinctive token matching (must match all non-stopword tokens if >= 2 tokens,
      // or at least 75% of distinctive tokens)
      const wineryTokens = extractKeyTokens(winery.name);
      if (wineryTokens.length > 0 && qTokens.length > 0) {
        const matches = wineryTokens.filter((token) => qTokens.includes(token));
        const matchRatio = matches.length / wineryTokens.length;

        // If all significant words match (e.g. "Margaux" for "Chateau Margaux")
        if (matches.length >= 1 && matchRatio === 1) {
          const conf = 85;
          if (!bestMatch || bestMatch.confidence < conf) {
            bestMatch = { winery, confidence: conf, matchedBy: 'all_distinctive_tokens' };
          }
        } else if (matchRatio >= 0.75 && matches.length >= 2) {
          const conf = 78;
          if (!bestMatch || bestMatch.confidence < conf) {
            bestMatch = { winery, confidence: conf, matchedBy: 'partial_distinctive_tokens' };
          }
        }
      }
    }
  }

  // Threshold: only return high confidence matches
  if (bestMatch && bestMatch.confidence >= 75) {
    return bestMatch;
  }

  return null;
}
