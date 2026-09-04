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

export type ProductReview = {
  id: number;
  wine_id: number;
  user_id: string;
  username: string;
  rating: number;
  comment: string;
  images?: string[];
  videos?: string[];
  created_at: string;
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

function filterProducts(products: Product[], query?: string): Product[] {
  if (!query || query.trim() === '') return products;
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(lowerQuery) ||
      p.type?.toLowerCase().includes(lowerQuery) ||
      p.sub_type?.toLowerCase().includes(lowerQuery) ||
      p.region?.toLowerCase().includes(lowerQuery)
  );
}

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Château Margaux Premier Grand Cru Classé',
    price: 24500,
    originalPrice: 28000,
    color: 'Red',
    stock: 12,
    type: 'Red Wine',
    sub_type: 'Grand Cru',
    countryCode: 'fr',
    region: 'Bordeaux, France',
    image: '/images/wine_red.png',
    description: 'ไวน์แดงคลาสสิกระดับพรีเมียมจากบอร์โดซ์ กลิ่นหอมซับซ้อนของบลูเบอร์รี ดอกไวโอเล็ต และซิการ์บ็อกซ์ แทนนินนุ่มละมุนติดลึกยาวนาน',
    vintage: 2015,
    alcohol: '13.5%'
  },
  {
    id: 2,
    name: 'Dom Pérignon Vintage Champagne',
    price: 13900,
    originalPrice: 15500,
    color: 'White',
    stock: 8,
    type: 'Sparkling',
    sub_type: 'Vintage',
    countryCode: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญสปาร์กลิ้งระดับตำนาน ฟองละเอียดนุ่มละมุน กลิ่นหอมของผลไม้สีขาว อัลมอนด์คั่ว และขนมปังบริออช สดชื่นประทับใจ',
    vintage: 2012,
    alcohol: '12.5%'
  },
  {
    id: 3,
    name: 'Cloudy Bay Sauvignon Blanc',
    price: 2190,
    originalPrice: 2490,
    color: 'White',
    stock: 25,
    type: 'White Wine',
    sub_type: 'Sauvignon Blanc',
    countryCode: 'nz',
    region: 'Marlborough, New Zealand',
    image: '/images/wine_white.png',
    description: 'ไวน์ขาวชื่อดังจากนิวซีแลนด์ กลิ่นหอมสดชื่นของแพชชันฟรุต เสาวรส กะเพรา และเลมอน แอซิดิตี้ดีเยี่ยม ดื่มง่ายในทุกโอกาส',
    vintage: 2022,
    alcohol: '13.0%'
  },
  {
    id: 4,
    name: 'Whispering Angel Rosé Côtes de Provence',
    price: 1850,
    originalPrice: 2100,
    color: 'Rose',
    stock: 18,
    type: 'Rose Wine',
    sub_type: 'Provence Rosé',
    countryCode: 'fr',
    region: 'Provence, France',
    image: '/images/wine_rose.png',
    description: 'ไวน์โรเซ่ยอดนิยมระดับโลก รสสัมผัสสดชื่น กลิ่นหอมของสตรอว์เบอร์รี พีช และส้มแมนดาริน เหมาะดื่มสังสรรค์ชิลๆ',
    vintage: 2023,
    alcohol: '13.0%'
  }
];

export function sanitizeProductsForAuth(products: Product[], isAuth: boolean): Product[] {
  return products.map((p) => {
    let img = p.image;
    if (!isAuth) {
      img = '/images/bottle-silhouette.svg';
    } else {
      if (!img || img === '/images/bottle-silhouette.svg') {
        img = `/images/wine_${p.color || 'red'}.png`;
      }
    }
    return {
      ...p,
      image: img,
      images: isAuth ? (p.images ?? []) : [],
    };
  });
}

export async function getProducts(query?: string, token?: string): Promise<Product[]> {
  const isAuth = !!token;
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      'https://api.wayneven.uk';

    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const isServer = typeof window === 'undefined';

    // Set a strict 3.5-second timeout so requests don't hang if host is down/unreachable
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let response: Response;
    try {
      const url = token
        ? `${API_BASE_URL}/api/v1/wine-products/`
        : `${API_BASE_URL}/api/wines/wines`;

      response = await fetch(url, {
        headers,
        signal: controller.signal,
        ...(isServer ? { next: { revalidate: 300 } } : { cache: 'no-store' }),
      });

      if (!response.ok && token) {
        response = await fetch(`${API_BASE_URL}/api/wines/wines`, {
          headers,
          signal: controller.signal,
          ...(isServer ? { next: { revalidate: 300 } } : { cache: 'no-store' }),
        });
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      console.warn(`API response status: ${response.status}. Using fallback products.`);
      return sanitizeProductsForAuth(filterProducts(FALLBACK_PRODUCTS, query), isAuth);
    }

    const responseText = await response.text();
    if (!responseText) {
      return sanitizeProductsForAuth(filterProducts(FALLBACK_PRODUCTS, query), isAuth);
    }
    const rawData = JSON.parse(responseText);
    const wineList = extractWineArray(rawData);

    if (wineList.length === 0) {
      return sanitizeProductsForAuth(filterProducts(FALLBACK_PRODUCTS, query), isAuth);
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
      Germany: 'de',
      NewZealand: 'nz',
      Portugal: 'pt',
      SouthAfrica: 'za',
      Austria: 'at',
      Thailand: 'th'
    };

    // Helper to ensure we always get a string from potentially complex API fields
    const ensureString = (val: any): string => {
      if (!val) return '';
      if (typeof val === 'string') return val;
      if (typeof val === 'object') {
        // If it's an object, try to find a name or title property
        return val.name || val.title || val.product_name || '';
      }
      return String(val);
    };

    let products: Product[] = wineList.map((item: any) => {
      const wineType = ensureString(item.wine_type || item.categories_en);
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
      let images: ProductImage[] = (item.images || [])
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

      if (images.length === 0 && item.image_url) {
        const path = String(item.image_url);
        const image_url = path.startsWith('http')
          ? path
          : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
        images = [{ id: 1, image_url, created_at: new Date().toISOString() }];
      }

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
        name: ensureString(item.name || item.product_name) || 'Unknown Wine',
        price: sellingPrice,
        originalPrice: originalPrice > sellingPrice ? originalPrice : undefined,
        stock: Number(item.stock) || 0,
        color,
        type: ensureString(item.type || item.categories_en) || 'wine',
        sub_type: ensureString(item.wine_type || item.sub_type) || 'Classic',
        region: ensureString(item.region || item.origins_en),
        image,
        images,
        description: ensureString(item.description || item.ingredients_text),
        vintage: item.vintage ? Number(item.vintage) : undefined,
        alcohol: ensureString(item.alcohol || item.alcohol_100g),
        designation: ensureString(item.designation || item.winery || item.brands),
        countryCode:
          countryMap[ensureString(item.country || item.countries_en)] ||
          ensureString(item.country || item.countries_en).toLowerCase() ||
          ensureString(item.country_code).toLowerCase() ||
          'fr'
      };
    });

    return sanitizeProductsForAuth(filterProducts(products, query), isAuth);
  } catch (error: any) {
    console.warn('API fetch unavailable or timed out. Falling back to default products.', error?.message || error);
    return sanitizeProductsForAuth(filterProducts(FALLBACK_PRODUCTS, query), isAuth);
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

export async function getReviews(wineId: number): Promise<ProductReview[]> {
  try {
    const isServer = typeof window === 'undefined';
    const API_BASE_URL = isServer
      ? process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk'
      : '';

    // On client: call our own Next.js proxy (/api/reviews) to avoid CORS.
    // On server: call the backend directly at /reviews/wine/{wine_id}.
    const url = isServer
      ? `${API_BASE_URL}/reviews/wine/${wineId}`
      : `/api/reviews?wine_id=${wineId}`;

    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : data.reviews ?? data.data ?? [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return [];
  }
}

export type CreateReviewResult =
  | { ok: true; review: ProductReview }
  | { ok: false; status: number; message: string };

export async function createReview(
  payload: {
    wine_id: number;
    user_id: string;
    username: string;
    rating: number;
    comment: string;
    images?: string[];
    videos?: string[];
  }
): Promise<CreateReviewResult> {
  try {
    // Always use the proxy on client-side to avoid CORS
    const isServer = typeof window === 'undefined';
    const API_BASE_URL = isServer
      ? process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk'
      : '';
    const url = isServer ? `${API_BASE_URL}/reviews` : '/api/reviews';

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        wine_id: Number(payload.wine_id),
        user_id: payload.user_id,
        username: payload.username,
        rating: Number(payload.rating),
        comment: payload.comment,
        images: payload.images ?? [],
        videos: payload.videos ?? [],
      }),
    });

    if (response.ok) {
      const review: ProductReview = await response.json();
      return { ok: true, review };
    }

    let message = 'เกิดข้อผิดพลาด กรุณาลองใหม่';
    try {
      const err = await response.json();
      message = err?.detail || err?.message || message;
    } catch {/* ignore */}

    return { ok: false, status: response.status, message };
  } catch (error) {
    console.error('Failed to create review:', error);
    return { ok: false, status: 0, message: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้' };
  }
}