export type ProductImage = {
  id: number;
  image_url: string;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  color?: string;
  stock: number;
  sub_type?: string;
  type?: string;
  countryCode?: string;
  region?: string;
  image?: string;
  images?: ProductImage[];
  description?: string;
  vintage?: number;
  alcohol?: string;
  designation?: string;
};

function extractWineArray(rawData: unknown): unknown[] {
  if (Array.isArray(rawData)) return rawData;
  if (rawData && typeof rawData === 'object') {
    const obj = rawData as Record<string, unknown>;
    for (const key of ['wines', 'data', 'items', 'results', 'products']) {
      if (Array.isArray(obj[key])) return obj[key] as unknown[];
    }
  }
  return [];
}

/**
 * Fetch wines/products from API (server-side or via /api/products proxy for client)
 */
export async function getProducts(query?: string, token?: string): Promise<Product[]> {
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      'https://possimon.onrender.com';

    const url = `${API_BASE_URL}/api/wines/wines`;

    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const isServer = typeof window === 'undefined';
    const response = await fetch(url, {
      headers,
      ...(isServer ? { next: { revalidate: 300 } } : { cache: 'no-store' }),
    });

    if (!response.ok) {
      console.error(`API response error: ${response.status} ${response.statusText}`);
      return [];
    }

    const rawData = await response.json();
    const wineList = extractWineArray(rawData);

    if (wineList.length === 0) {
      console.error('API returned no wine list:', rawData);
      return [];
    }

    // Country code mapping
    const countryMap: Record<string, string> = {
      US: 'us',
      France: 'fr',
      Italy: 'it',
      Spain: 'es',
      Australia: 'au',
      Chile: 'cl',
      Argentina: 'ar',
      'South Africa': 'za',
      Germany: 'de',
      Portugal: 'pt',
      'New Zealand': 'nz',
      Thailand: 'th'
    };

    // Helper to ensure we always get a string from potentially complex API fields
    const ensureString = (val: any): string => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object') {
        // If it's an object, try to find a name or title property
        return val.name || val.title || '';
      }
      return String(val);
    };

    let products: Product[] = wineList.map((item: any) => {
      const wineType = ensureString(item.wine_type);
      let color = 'red';

      const lowerType = wineType.toLowerCase();

      if (
        lowerType.includes('white') ||
        lowerType.includes('chardonnay') ||
        lowerType.includes('sauvignon blanc')
      ) {
        color = 'white';
      } else if (
        lowerType.includes('rose') ||
        lowerType.includes('rosé')
      ) {
        color = 'rose';
      } else {
        color = 'red';
      }

      // Handle multiple images
      const images: ProductImage[] = (item.images || [])
        .filter((img: any) => img?.image_url)
        .map((img: any) => {
          const path = String(img.image_url);
          const image_url = path.startsWith('http')
            ? path
            : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
          return {
            id: img.id,
            image_url,
            created_at: img.created_at,
          };
        });

      // If no token is provided, we show a silhouette placeholder
      // Otherwise, use the first image if available, else fallback to color-based default
      let image = '/images/bottle-silhouette.svg';
      
      if (token) {
        if (images.length > 0) {
          image = images[0].image_url;
        } else {
          image = `/images/wine_${color}.png`;
        }
      }

      // Use selling_price if available, otherwise fallback to price
      const sellingPrice = Number(item.selling_price) || Number(item.price) || 0;
      const originalPrice = Number(item.price) || 0;

      return {
        id: Number(item.id) || 0,
        name: ensureString(item.name) || 'Unknown Wine',
        price: sellingPrice,
        originalPrice: originalPrice > sellingPrice ? originalPrice : undefined,
        stock: Number(item.stock) || 0,
        color,
        type: ensureString(item.type) || 'wine',
        sub_type: ensureString(item.wine_type) || 'Classic',
        region: ensureString(item.region),
        image,
        images,
        description: ensureString(item.description),
        vintage: item.vintage ? Number(item.vintage) : undefined,
        alcohol: ensureString(item.alcohol),
        designation: ensureString(item.designation || item.winery),
        countryCode:
          countryMap[ensureString(item.country)] ||
          ensureString(item.country).toLowerCase() ||
          ensureString(item.country_code).toLowerCase() ||
          'fr'
      };
    });

    // Search filtering
    if (query && query.trim() !== '') {
      const lowerQuery = query.toLowerCase();

      products = products.filter(
        (p) =>
          p.name?.toLowerCase().includes(lowerQuery) ||
          p.type?.toLowerCase().includes(lowerQuery) ||
          p.sub_type?.toLowerCase().includes(lowerQuery) ||
          p.region?.toLowerCase().includes(lowerQuery)
      );
    }

    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);

    return [];
  }
}

export async function getProductById(id: number, token?: string): Promise<Product | null> {
  try {
    const products = await getProducts(undefined, token);
    const found = products.find((p) => p.id === Number(id));
    return found ?? null;
  } catch (error) {
    console.error('Failed to fetch product by id:', error);
    return null;
  }
}