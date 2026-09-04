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
    for (const key of ['wines', 'items', 'results', 'products']) {
      if (Array.isArray(obj[key])) return obj[key] as unknown[];
    }
    if (Array.isArray(obj.data)) return obj.data as unknown[];
    if (obj.data && typeof obj.data === 'object') {
      const dataObj = obj.data as Record<string, unknown>;
      for (const key of ['items', 'wines', 'products', 'results']) {
        if (Array.isArray(dataObj[key])) return dataObj[key] as unknown[];
      }
    }
  }
  return [];
}

let cachedApiToken: string | null = null;
let tokenExpiresAt = 0;

export async function getWaynevenApiToken(): Promise<string | null> {
  const now = Date.now();
  if (cachedApiToken && now < tokenExpiresAt - 60000) {
    return cachedApiToken;
  }

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    'https://api.wayneven.uk';

  const username = process.env.API_ADMIN_USER || 'admin';
  const password = process.env.API_ADMIN_PASSWORD || 'admin123';

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`[Wayneven Auth] Login status: ${res.status}`);
      return cachedApiToken;
    }

    const data = await res.json();
    const token = data?.data?.access_token || data?.access_token;
    const expiresIn = Number(data?.data?.expires_in || data?.expires_in || 900);

    if (token) {
      cachedApiToken = token;
      tokenExpiresAt = now + expiresIn * 1000;
      return token;
    }
  } catch (error) {
    console.error('[Wayneven Auth] Failed to fetch token:', error);
  }

  return cachedApiToken;
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
  },
  {
    id: 5,
    name: 'Penfolds Grange Shiraz 2018',
    price: 32000,
    originalPrice: 35000,
    color: 'Red',
    stock: 6,
    type: 'Red Wine',
    sub_type: 'Shiraz',
    countryCode: 'au',
    region: 'South Australia',
    image: '/images/wine_red.png',
    description: 'ไวน์แดงระดับไอคอนของออสเตรเลีย รสชาติทรงพลัง กลิ่นหอมของแบล็กเบอร์รี เครื่องเทศ และโอ๊กสไตล์เข้มข้น แทนนินแน่นยาวนาน',
    vintage: 2018,
    alcohol: '14.5%'
  },
  {
    id: 6,
    name: "Château d'Yquem Premier Cru Supérieur",
    price: 18500,
    originalPrice: 21000,
    color: 'White',
    stock: 5,
    type: 'Dessert Wine',
    sub_type: 'Sauternes',
    countryCode: 'fr',
    region: 'Sauternes, Bordeaux, France',
    image: '/images/wine_rose.png',
    description: 'ไวน์หวานระดับโลกที่มีชื่อเสียงที่สุด กลิ่นหอมของแอปริคอตแห้ง น้ำผึ้ง วานิลลา และดอกส้ม หวานฉ่ำลงตัวพร้อมความสดชื่น',
    vintage: 2016,
    alcohol: '14.0%'
  },
  {
    id: 7,
    name: 'Royal Tokaji 5 Puttonyos Aszú',
    price: 3800,
    originalPrice: 4200,
    color: 'White',
    stock: 10,
    type: 'Dessert Wine',
    sub_type: 'Tokaji',
    countryCode: 'hu',
    region: 'Tokaj, Hungary',
    image: '/images/wine_rose.png',
    description: 'ไวน์หวานชั้นเลิศจากฮังการี ผลิตจากองุ่นบ่มโบทรีติส รสหวานกลมกล่อม มีชีวิตชีวาด้วยแอซิดิตี้สูง กลิ่นพีชสุกและขิงอบ',
    vintage: 2017,
    alcohol: '11.5%'
  },
  {
    id: 8,
    name: "Taylor's 20 Year Old Tawny Port",
    price: 4600,
    originalPrice: 5200,
    color: 'Red',
    stock: 14,
    type: 'Fortified Wine',
    sub_type: 'Tawny Port',
    countryCode: 'pt',
    region: 'Douro Valley, Portugal',
    image: '/images/wine_red.png',
    description: 'ไวน์พอร์ตเสริมแอลกอฮอล์บ่มถังโอ๊กกว่า 20 ปี กลิ่นถั่วคั่ว แยมแบล็กเคอร์แรนท์ มะเดื่อ และบัตเตอร์สก็อตช์ นุ่มนวลละมุนลิ้น',
    vintage: 2003,
    alcohol: '20.0%'
  },
  {
    id: 9,
    name: 'Lustau San Emilio Pedro Ximénez Sherry',
    price: 2600,
    originalPrice: 2950,
    color: 'Red',
    stock: 12,
    type: 'Fortified Wine',
    sub_type: 'Sherry',
    countryCode: 'es',
    region: 'Jerez, Spain',
    image: '/images/wine_red.png',
    description: 'เชอร์รี่สีน้ำตาลเข้มข้น รสหวานล้ำลึก กลิ่นลูกเกด ลูกพรุน อินทผลัม และกาแฟคั่ว เหมาะดื่มคู่ของหวานหรือราดบนไอศกรีม',
    vintage: 2019,
    alcohol: '17.0%'
  },
  {
    id: 10,
    name: 'Moët & Chandon Impérial Brut',
    price: 3200,
    originalPrice: 3600,
    color: 'White',
    stock: 30,
    type: 'Sparkling',
    sub_type: 'Brut Champagne',
    countryCode: 'fr',
    region: 'Champagne, France',
    image: '/images/wine_sparkling.png',
    description: 'แชมเปญอันเป็นเอกลักษณ์ระดับสากล รสชาติสดชื่นและมีชีวิตชีวา โดดเด่นด้วยกลิ่นผลไม้สด ดอกไม้ขาว และขนมปังสดใหม่',
    vintage: 2021,
    alcohol: '12.0%'
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

    const effectiveToken = token || (await getWaynevenApiToken());

    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (effectiveToken) {
      headers['Authorization'] = `Bearer ${effectiveToken.replace(/^Bearer\s+/i, '')}`;
    }

    const isServer = typeof window === 'undefined';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    let response: Response;
    try {
      // Exclusively use Wayneven Swagger API
      const searchParam = query && query.trim() ? `&search=${encodeURIComponent(query.trim())}` : '';
      const url = `${API_BASE_URL}/api/v1/wine-products/?per_page=50${searchParam}`;

      response = await fetch(url, {
        headers,
        signal: controller.signal,
        ...(isServer ? { next: { revalidate: 120 } } : { cache: 'no-store' }),
      });

      // If /api/v1/wine-products/ is not available, try /api/v1/catalog/products
      if (!response.ok && effectiveToken) {
        response = await fetch(`${API_BASE_URL}/api/v1/catalog/products`, {
          headers,
          signal: controller.signal,
          ...(isServer ? { next: { revalidate: 120 } } : { cache: 'no-store' }),
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
      UnitedStates: 'us',
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
        return val.name || val.title || val.product_name || '';
      }
      return String(val);
    };

    let products: Product[] = wineList.map((item: any) => {
      const rawName = ensureString(item.product_name || item.name) || 'Fine Wine';
      const wineType = ensureString(item.categories_en || item.wine_type || item.type || rawName);
      let color = 'red';

      const lowerType = wineType.toLowerCase();

      if (
        lowerType.includes('white') ||
        lowerType.includes('blanc') ||
        lowerType.includes('chardonnay') ||
        lowerType.includes('sauvignon blanc') ||
        lowerType.includes('riesling')
      ) {
        color = 'white';
      } else if (
        lowerType.includes('rose') ||
        lowerType.includes('rosé') ||
        lowerType.includes('pink')
      ) {
        color = 'rose';
      } else {
        color = 'red';
      }

      // Handle multiple images from API
      let images: ProductImage[] = [];
      if (Array.isArray(item.images) && item.images.length > 0) {
        images = item.images
          .filter((img: any) => img?.image_url)
          .map((img: any) => {
            const path = String(img.image_url);
            const image_url = path.startsWith('http')
              ? path
              : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
            return {
              id: img.id || 1,
              image_url,
              created_at: img.created_at || new Date().toISOString(),
            };
          });
      }

      if (images.length === 0 && item.image_url) {
        const path = String(item.image_url);
        const image_url = path.startsWith('http')
          ? path
          : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
        images.push({ id: 1, image_url, created_at: item.created_at || new Date().toISOString() });
      }

      if (images.length > 0 && item.image_small_url && item.image_small_url !== item.image_url) {
        const path = String(item.image_small_url);
        const image_url = path.startsWith('http')
          ? path
          : `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
        images.push({ id: 2, image_url, created_at: item.created_at || new Date().toISOString() });
      }

      const defaultWineImg = `/images/wine_${color}.png`;
      const primaryImageUrl = images.length > 0 ? images[0].image_url : defaultWineImg;

      // Unauthenticated guests only get silhouette; authenticated users get real wine image
      const image = isAuth ? primaryImageUrl : '/images/bottle-silhouette.svg';

      const itemId = Number(item.id) || 1;
      const basePrice = Number(item.selling_price) || Number(item.price) || (890 + ((itemId * 73) % 2900));
      const originalPrice = Number(item.price && item.selling_price && Number(item.price) > Number(item.selling_price) ? item.price : 0) || (basePrice > 1500 ? Math.round(basePrice * 1.15) : undefined);
      const stock = item.stock !== undefined && item.stock !== null ? Number(item.stock) : (10 + (itemId % 40));

      const subType = ensureString(item.brands || item.wine_type || item.sub_type) || 'Classic';
      const region = ensureString(item.origins_en || item.region || (item.countries_en ? `${item.countries_en}` : ''));
      const rawCountry = ensureString(item.countries_en || item.country || 'France');
      const countryCode = countryMap[rawCountry] || rawCountry.toLowerCase().slice(0, 2) || 'fr';

      let alcohol = ensureString(item.alcohol_100g || item.alcohol);
      if (alcohol) {
        const alcNum = parseFloat(alcohol);
        if (!isNaN(alcNum)) {
          alcohol = alcNum > 30 ? `${(11 + (itemId % 4)).toFixed(1)}%` : `${alcNum.toFixed(1)}%`;
        }
      } else {
        alcohol = '12.5%';
      }

      return {
        id: itemId,
        name: rawName,
        price: basePrice,
        originalPrice,
        stock,
        color,
        type: ensureString(item.categories_en || item.type) || 'Wine',
        sub_type: subType,
        region: region || 'Selected Vineyard',
        image,
        images: isAuth ? images : [],
        description: ensureString(item.ingredients_text || item.description) || `ไวน์ชั้นเลิศคัดสรรพิเศษสำหรับสมาชิก The Bottle Club แบรนด์ ${subType}`,
        vintage: item.vintage ? Number(item.vintage) : (2018 + (itemId % 6)),
        alcohol,
        designation: ensureString(item.brands || item.winery || item.designation) || subType,
        countryCode,
      };
    });

    return sanitizeProductsForAuth(filterProducts(products, query), isAuth);
  } catch (error: any) {
    console.warn('API fetch unavailable or timed out. Falling back to default products.', error?.message || error);
    return sanitizeProductsForAuth(filterProducts(FALLBACK_PRODUCTS, query), isAuth);
  }
}

export async function getProductById(id: number, token?: string): Promise<Product | null> {
  const isAuth = !!token;
  try {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      'https://api.wayneven.uk';

    const effectiveToken = token || (await getWaynevenApiToken());

    if (effectiveToken) {
      try {
        let res = await fetch(`${API_BASE_URL}/api/v1/wine-products/${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${effectiveToken.replace(/^Bearer\s+/i, '')}`,
          },
          cache: 'no-store',
        });

        if (!res.ok) {
          res = await fetch(`${API_BASE_URL}/api/v1/catalog/products/${id}`, {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${effectiveToken.replace(/^Bearer\s+/i, '')}`,
            },
            cache: 'no-store',
          });
        }

        if (res.ok) {
          const raw = await res.json();
          const item = raw?.data || raw;
          if (item && (item.id || item.product_name || item.name)) {
            const rawName = String(item.product_name || item.name || 'Wine');
            const wineType = String(item.categories_en || item.wine_type || item.type || rawName);
            let color = 'red';
            const lowerType = wineType.toLowerCase();
            if (
              lowerType.includes('white') ||
              lowerType.includes('blanc') ||
              lowerType.includes('chardonnay') ||
              lowerType.includes('sauvignon blanc') ||
              lowerType.includes('riesling')
            ) {
              color = 'white';
            } else if (
              lowerType.includes('rose') ||
              lowerType.includes('rosé') ||
              lowerType.includes('pink')
            ) {
              color = 'rose';
            } else {
              color = 'red';
            }

            let images: ProductImage[] = [];
            if (Array.isArray(item.images) && item.images.length > 0) {
              images = item.images.map((img: any, idx: number) => ({
                id: img.id || idx + 1,
                image_url: String(img.image_url),
                created_at: img.created_at || new Date().toISOString(),
              }));
            }
            if (images.length === 0 && item.image_url) {
              images.push({
                id: 1,
                image_url: String(item.image_url),
                created_at: item.created_at || new Date().toISOString(),
              });
            }
            if (images.length > 0 && item.image_small_url && item.image_small_url !== item.image_url) {
              images.push({
                id: 2,
                image_url: String(item.image_small_url),
                created_at: item.created_at || new Date().toISOString(),
              });
            }

            const defaultWineImg = `/images/wine_${color}.png`;
            const primaryImageUrl = images.length > 0 ? images[0].image_url : defaultWineImg;
            const itemId = Number(item.id) || Number(id);
            const basePrice = Number(item.selling_price) || Number(item.price) || (890 + ((itemId * 73) % 2900));
            const originalPrice = Number(item.price && item.selling_price && Number(item.price) > Number(item.selling_price) ? item.price : 0) || (basePrice > 1500 ? Math.round(basePrice * 1.15) : undefined);
            const stock = item.stock !== undefined && item.stock !== null ? Number(item.stock) : (10 + (itemId % 40));
            const subType = String(item.brands || item.wine_type || item.sub_type || 'Classic');
            const region = String(item.origins_en || item.region || (item.countries_en ? `${item.countries_en}` : 'Selected Vineyard'));

            let alcohol = String(item.alcohol_100g || item.alcohol || '');
            if (alcohol) {
              const alcNum = parseFloat(alcohol);
              if (!isNaN(alcNum)) {
                alcohol = alcNum > 30 ? `${(11 + (itemId % 4)).toFixed(1)}%` : `${alcNum.toFixed(1)}%`;
              }
            } else {
              alcohol = '12.5%';
            }

            const product: Product = {
              id: itemId,
              name: rawName,
              price: basePrice,
              originalPrice,
              stock,
              color,
              type: String(item.categories_en || item.type || 'Wine'),
              sub_type: subType,
              region,
              image: isAuth ? primaryImageUrl : '/images/bottle-silhouette.svg',
              images: isAuth ? images : [],
              description: String(item.ingredients_text || item.description || `ไวน์ชั้นเลิศคัดสรรพิเศษสำหรับสมาชิก The Bottle Club แบรนด์ ${subType}`),
              vintage: item.vintage ? Number(item.vintage) : (2018 + (itemId % 6)),
              alcohol,
              designation: String(item.brands || item.winery || subType),
              countryCode: String(item.countries_en || item.country || 'fr').toLowerCase().slice(0, 2),
            };

            return product;
          }
        }
      } catch (err) {
        console.warn(`Could not fetch wine by id ${id} from Wayneven API:`, err);
      }
    }

    // Check catalog products
    const products = await getProducts(undefined, token);
    const found = products.find((p) => p.id === Number(id));
    if (found) return found;

    // Direct match in FALLBACK_PRODUCTS
    const fallbackFound = FALLBACK_PRODUCTS.find((p) => p.id === Number(id));
    if (fallbackFound) {
      return sanitizeProductsForAuth([fallbackFound], isAuth)[0] ?? null;
    }

    // Check local database if running server-side
    if (typeof window === 'undefined') {
      try {
        const { query } = await import('@/lib/db');
        const dbRes = await query('SELECT * FROM products WHERE id = $1 LIMIT 1', [Number(id)]);
        if (dbRes.rows && dbRes.rows.length > 0) {
          const r = dbRes.rows[0];
          const dbProduct: Product = {
            id: Number(r.id),
            name: String(r.name),
            price: Number(r.price) || 0,
            stock: Number(r.stock) || 0,
            color: 'red',
            type: 'Wine',
            sub_type: 'Classic',
            region: 'Selected Vineyard',
            countryCode: 'fr',
            description: 'ไวน์ชั้นเลิศคัดสรรพิเศษสำหรับสมาชิก The Bottle Club',
            image: '/images/wine_red.png',
          };
          return sanitizeProductsForAuth([dbProduct], isAuth)[0] ?? null;
        }
      } catch {
        // non-fatal
      }
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch product by id:', error);
    return null;
  }
}

export async function getReviews(wineId: number): Promise<ProductReview[]> {
  try {
    if (typeof window === 'undefined') {
      try {
        const { query } = await import('@/lib/db');
        const res = await query(
          `SELECT pr.id, pr.product_id, pr.user_id, pr.user_name, pr.rating, pr.comment, pr.created_at
           FROM product_reviews pr
           WHERE pr.product_id = $1 AND (pr.is_approved IS NULL OR pr.is_approved = true)
           ORDER BY pr.created_at DESC`,
          [wineId]
        );
        return (res.rows || []).map((r: any) => ({
          id: r.id,
          wine_id: r.product_id,
          user_id: r.user_id,
          username: r.user_name || 'Member',
          rating: r.rating,
          comment: r.comment,
          images: [],
          videos: [],
          created_at: r.created_at?.toISOString ? r.created_at.toISOString() : String(r.created_at),
        }));
      } catch {
        return [];
      }
    }

    const response = await fetch(`/api/reviews?wine_id=${wineId}`, { cache: 'no-store' });
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
    const response = await fetch('/api/reviews', {
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