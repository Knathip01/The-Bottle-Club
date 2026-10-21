/**
 * Unified API Client for The Bottle Club (Wayneven POS & E-commerce Backend)
 * 
 * Source of Truth: BACKEND_CONTRACT.md
 * Inspection Date: 2026-10-06
 * Base URL: https://api.wayneven.uk
 * Total Endpoints: 141 discovered in source
 * 
 * Security & Integration Rules:
 * - Backend is the security authority for auth, permissions, organization, and branches.
 * - Backend is the source of truth for price (ecommerce selling_price) and stock (on_hand).
 * - Backend marks payments and transitions orders to "paid".
 * - Never expose JWT secrets or service-role keys in frontend code.
 * - Send `Authorization: Bearer <access_token>` on protected endpoints.
 * - Send `X-Branch-Id: <int>` on endpoints using branch context.
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

export interface ApiMeta {
  page?: number;
  per_page?: number;
  total?: number;
  pages?: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  meta?: ApiMeta | null;
  request_id?: string;
  error?: string;
  code?: string;
}

export interface ApiErrorResponse {
  detail: string;
  code: string;
  request_id?: string;
}

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  accessToken?: string | null;
  branchId?: number | string | null;
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
  isRawResponse?: boolean;
}

/**
 * Core HTTP request handler communicating with https://api.wayneven.uk
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    accessToken,
    branchId,
    params,
    body,
    headers: customHeaders,
    isRawResponse = false,
    ...restOptions
  } = options;

  // Build full URL with query parameters
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  let url = `${API_BASE_URL}${cleanEndpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  // Build standard headers
  const headers = new Headers(customHeaders);

  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  // Attach Authorization Bearer token if provided
  if (accessToken) {
    const token = accessToken.replace(/^Bearer\s+/i, '');
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Attach X-Branch-Id header if provided
  if (branchId !== null && branchId !== undefined) {
    headers.set('X-Branch-Id', String(branchId));
  }

  // Determine body and Content-Type
  let requestBody: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      requestBody = body;
      // Let browser set the boundary for multipart/form-data
    } else {
      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      requestBody = typeof body === 'string' ? body : JSON.stringify(body);
    }
  }

  const response = await fetch(url, {
    ...restOptions,
    headers,
    body: requestBody,
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMessage =
      responseData.detail ||
      responseData.message ||
      responseData.error ||
      `API Error (${response.status})`;

    return {
      data: (responseData.data ?? responseData) as T,
      meta: responseData.meta ?? null,
      request_id: responseData.request_id,
      error: errorMessage,
      code: responseData.code || String(response.status),
    };
  }

  // Raw responses (e.g. /api/promotions, /api/v1/orders/track/{ref}, /health)
  if (isRawResponse || cleanEndpoint.startsWith('/api/promotions') || cleanEndpoint.startsWith('/api/admin/promotions') || cleanEndpoint.startsWith('/health')) {
    return {
      data: responseData as T,
      meta: null,
      request_id: responseData.request_id,
    };
  }

  // Standard Wayneven response unwrapping from ResponseEnvelopeMiddleware
  return {
    data: (responseData.data !== undefined ? responseData.data : responseData) as T,
    meta: responseData.meta ?? null,
    request_id: responseData.request_id,
  };
}

// =============================================================================
// DOMAIN-SPECIFIC API CLIENT METHODS (Typed matching BACKEND_CONTRACT.md)
// =============================================================================

// ── 1. Authentication & Identity ──────────────────────────────────────────────
export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  display_name: string;
  organization_id: number;
  is_superadmin: boolean;
  permissions: string[];
  branches: number[];
}

export const authApi = {
  login: (username: string, password: string) =>
    apiRequest<LoginResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: { username, password },
    }),

  refresh: (refreshToken: string) =>
    apiRequest<LoginResponse>('/api/v1/auth/refresh', {
      method: 'POST',
      body: { refresh_token: refreshToken },
    }),

  logout: (accessToken: string) =>
    apiRequest<{ message?: string }>('/api/v1/auth/logout', {
      method: 'POST',
      accessToken,
    }),

  getMe: (accessToken: string) =>
    apiRequest<UserProfileResponse>('/api/v1/auth/me', {
      method: 'GET',
      accessToken,
    }),

  register: (payload: { username: string; email: string; password: string; display_name: string; phone?: string | null }) =>
    apiRequest<UserProfileResponse>('/api/v1/auth/register', {
      method: 'POST',
      body: payload,
    }),
};

// ── 2. Orders & Ecommerce Orders ──────────────────────────────────────────────
export interface OrderItemCreate {
  product_id: number;
  quantity: number;
  unit_price: number | string;
  discount_amount?: number;
}

export interface OrderCreatePayload {
  branch_id: number;
  customer_id?: number | null;
  shift_id?: number | null;
  register_id?: number | null;
  order_source?: 'ecommerce' | 'pos' | 'qr' | 'phone';
  items: OrderItemCreate[];
  discount_amount?: number;
  notes?: string | null;
  idempotency_key?: string | null;
}

export interface OrderItemResponse {
  id: number;
  order_id: number;
  product_id: number;
  product_name?: string;
  quantity: number;
  unit_price: number;
  discount_amount: number;
  line_total: number;
}

export interface OrderResponse {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled' | 'paid' | 'held' | 'refunded';
  order_source: string;
  customer_id: number | null;
  user_id: number | null;
  shift_id: number | null;
  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  grand_total: number;
  shipping_fee: number;
  fulfillment_status: 'unfulfilled' | 'processing' | 'shipped' | 'delivered' | 'picked_up' | 'cancelled';
  tracking_number: string | null;
  amount_paid: number;
  change_amount: number;
  loyalty_points_earned: number;
  loyalty_points_redeemed: number;
  items: OrderItemResponse[];
  created_at: string;
  completed_at: string | null;
}

export interface PublicTrackingResponse {
  order_number: string;
  status: string;
  fulfillment_status: string;
  tracking_number: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface CheckoutPayment {
  payment_method: string;
  amount: number;
  external_reference?: string | null;
  notes?: string | null;
}

export interface CheckoutPayload {
  payments: CheckoutPayment[];
  redeem_points?: number;
  earn_points?: boolean;
  idempotency_key?: string | null;
}

export const ordersApi = {
  create: (payload: OrderCreatePayload, accessToken?: string | null) =>
    apiRequest<OrderResponse>('/api/v1/orders/', {
      method: 'POST',
      body: {
        ...payload,
        order_source: payload.order_source || 'ecommerce',
      },
      branchId: payload.branch_id,
      accessToken,
    }),

  list: (params: { page?: number; per_page?: number; status?: string; date_from?: string; date_to?: string; customer_id?: number }, branchId: number, accessToken: string) =>
    apiRequest<{ orders: OrderResponse[]; total: number; page: number; per_page: number }>('/api/v1/orders/', {
      method: 'GET',
      params,
      branchId,
      accessToken,
    }),

  get: (reference: string | number, accessToken: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${reference}`, {
      method: 'GET',
      accessToken,
    }),

  getReceipt: (reference: string | number, accessToken: string) =>
    apiRequest<{ order: OrderResponse; payments: unknown[] }>(`/api/v1/orders/${reference}/receipt`, {
      method: 'GET',
      accessToken,
    }),

  updateStatus: (orderId: number, status: string, notes?: string | null, accessToken?: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/status`, {
      method: 'PUT',
      body: { status, notes },
      accessToken,
    }),

  cancel: (orderId: number, reason?: string | null, accessToken?: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/cancel`, {
      method: 'POST',
      body: { reason },
      accessToken,
    }),

  complete: (orderId: number, accessToken: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/complete`, {
      method: 'PUT',
      accessToken,
    }),

  updateTracking: (orderId: number, trackingNumber: string, fulfillmentStatus: string = 'shipped', accessToken?: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/tracking`, {
      method: 'PUT',
      body: { tracking_number: trackingNumber, fulfillment_status: fulfillmentStatus },
      accessToken,
    }),

  /**
   * Public tracking lookup: No authentication required, no org scoping.
   * Looks up by tracking_number OR order_number.
   */
  trackPublic: (trackingOrRef: string) =>
    apiRequest<PublicTrackingResponse>(`/api/v1/orders/track/${encodeURIComponent(trackingOrRef)}`, {
      method: 'GET',
      isRawResponse: true,
    }),

  checkout: (orderId: number, payload: CheckoutPayload, accessToken: string) =>
    apiRequest<OrderResponse>(`/api/v1/orders/${orderId}/checkout`, {
      method: 'POST',
      body: payload,
      accessToken,
    }),
};

// ── 3. Slip Verification ──────────────────────────────────────────────────────
export interface SlipUploadResponse {
  success: boolean;
  status: string;
  message: string;
  data?: unknown;
}

export const slipVerifyApi = {
  upload: (formData: FormData, accessToken: string) =>
    apiRequest<SlipUploadResponse>('/api/v1/slip-verify/upload', {
      method: 'POST',
      body: formData,
      accessToken,
      isRawResponse: true,
    }),

  checkSlip: (formData: FormData, accessToken: string) =>
    apiRequest<SlipUploadResponse>('/api/v1/slip-verify/checkslip', {
      method: 'POST',
      body: formData,
      accessToken,
      isRawResponse: true,
    }),

  list: (params: { status?: string; limit?: number }, accessToken: string) =>
    apiRequest<unknown[]>('/api/v1/slip-verify/list', {
      method: 'GET',
      params,
      accessToken,
    }),

  approve: (verificationId: number, accessToken: string) =>
    apiRequest<unknown>(`/api/v1/slip-verify/${verificationId}/approve`, {
      method: 'POST',
      accessToken,
    }),

  reject: (verificationId: number, accessToken: string) =>
    apiRequest<unknown>(`/api/v1/slip-verify/${verificationId}/reject`, {
      method: 'POST',
      accessToken,
    }),

  getById: (verificationId: number, accessToken: string) =>
    apiRequest<unknown>(`/api/v1/slip-verify/${verificationId}`, {
      method: 'GET',
      accessToken,
    }),

  getByOrder: (orderId: number, accessToken: string) =>
    apiRequest<unknown[]>(`/api/v1/slip-verify/order/${orderId}`, {
      method: 'GET',
      accessToken,
    }),
};

// ── 4. Wine Products (Public Reference Catalog) ───────────────────────────────
export interface WineProductItem {
  id: number;
  code: string;
  product_name: string;
  brands?: string;
  categories_en?: string;
  origins_en?: string;
  countries_en?: string;
  quantity?: string;
  ingredients_text?: string;
  image_url?: string;
  image_small_url?: string;
  alcohol_100g?: number;
  created_at?: string;
}

export interface WineProductListResponse {
  items: WineProductItem[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export const wineProductsApi = {
  list: (params: { search?: string; brands?: string; countries?: string; category?: string; page?: number; per_page?: number } = {}) =>
    apiRequest<WineProductListResponse>('/api/v1/wine-products/', {
      method: 'GET',
      params,
    }),

  getById: (id: number | string) =>
    apiRequest<WineProductItem>(`/api/v1/wine-products/${id}`, {
      method: 'GET',
    }),
};

// ── 5. Catalog & Store Products ───────────────────────────────────────────────
export interface CatalogProduct {
  id: number;
  name: string;
  description?: string;
  category_id?: number;
  sku?: string;
  barcode?: string;
  selling_price: number;
  unit?: string;
  is_active: boolean;
  track_inventory: boolean;
  has_expiry: boolean;
  image_url?: string;
  created_at?: string;
}

export const catalogApi = {
  listProducts: (accessToken: string) =>
    apiRequest<CatalogProduct[]>('/api/v1/catalog/products', {
      method: 'GET',
      accessToken,
    }),

  getProduct: (productId: number, accessToken: string) =>
    apiRequest<CatalogProduct>(`/api/v1/catalog/products/${productId}`, {
      method: 'GET',
      accessToken,
    }),

  listCategories: (accessToken: string) =>
    apiRequest<unknown[]>('/api/v1/catalog/categories', {
      method: 'GET',
      accessToken,
    }),

  listSuppliers: (accessToken: string) =>
    apiRequest<unknown[]>('/api/v1/catalog/suppliers', {
      method: 'GET',
      accessToken,
    }),
};

// ── 6. Promotions (Mounted at /api, Raw Response) ─────────────────────────────
export interface RawPromotionItem {
  id: string;
  title: string;
  description?: string;
  discountType?: string;
  discountValue?: number;
  imageUrl?: string;
  image_url?: string;
  isFeatured?: boolean;
  is_featured?: boolean;
  isActive?: boolean;
  is_active?: boolean;
  validUntil?: string;
  valid_until?: string;
}

export const promotionsApi = {
  listPublic: (featured?: boolean) =>
    apiRequest<{ success: boolean; promotions: RawPromotionItem[] }>('/api/promotions', {
      method: 'GET',
      params: featured !== undefined ? { featured } : undefined,
      isRawResponse: true,
    }),
};

// ── 7. Coupons & Loyalty ──────────────────────────────────────────────────────
export interface CouponValidateResult {
  valid: boolean;
  coupon_id?: number;
  promotion_id?: number;
  promotion_type?: string;
  discount_value?: number;
  message?: string;
}

export const couponsApi = {
  validate: (code: string, customerId?: number | null, accessToken?: string) =>
    apiRequest<CouponValidateResult>('/api/v1/coupons/validate', {
      method: 'POST',
      body: { code, customer_id: customerId },
      accessToken,
    }),

  list: (accessToken: string) =>
    apiRequest<unknown[]>('/api/v1/coupons/', {
      method: 'GET',
      accessToken,
    }),
};

export const loyaltyApi = {
  getBalance: (customerId: number, accessToken: string) =>
    apiRequest<{ balance: number; customer_id: number }>(`/api/v1/loyalty/balance/${customerId}`, {
      method: 'GET',
      accessToken,
    }),

  getTransactions: (customerId: number, params: { transaction_type?: string; date_from?: string; date_to?: string; page?: number; per_page?: number } = {}, accessToken: string) =>
    apiRequest<unknown[]>(`/api/v1/loyalty/transactions/${customerId}`, {
      method: 'GET',
      params,
      accessToken,
    }),

  earn: (payload: { customer_id: number; points: number; order_id?: number }, accessToken: string) =>
    apiRequest<unknown>('/api/v1/loyalty/earn', {
      method: 'POST',
      body: payload,
      accessToken,
    }),

  redeem: (payload: { customer_id: number; points: number; order_id?: number }, accessToken: string) =>
    apiRequest<unknown>('/api/v1/loyalty/redeem', {
      method: 'POST',
      body: payload,
      accessToken,
    }),
};

// ── 8. Customers & Addresses ──────────────────────────────────────────────────
export interface CustomerAddressItem {
  id: number;
  customer_id: number;
  recipient_name: string;
  phone?: string;
  address_line: string;
  subdistrict?: string;
  district?: string;
  province?: string;
  postal_code?: string;
  country?: string;
  is_default: boolean;
}

export const customerAddressesApi = {
  list: (customerId: number, accessToken: string) =>
    apiRequest<CustomerAddressItem[]>(`/api/v1/customer-addresses/customer/${customerId}`, {
      method: 'GET',
      accessToken,
    }),

  get: (customerId: number, addressId: number, accessToken: string) =>
    apiRequest<CustomerAddressItem>(`/api/v1/customer-addresses/customer/${customerId}/${addressId}`, {
      method: 'GET',
      accessToken,
    }),

  create: (payload: Partial<CustomerAddressItem>, accessToken: string) =>
    apiRequest<CustomerAddressItem>('/api/v1/customer-addresses/', {
      method: 'POST',
      body: payload,
      accessToken,
    }),

  update: (customerId: number, addressId: number, payload: Partial<CustomerAddressItem>, accessToken: string) =>
    apiRequest<CustomerAddressItem>(`/api/v1/customer-addresses/customer/${customerId}/${addressId}`, {
      method: 'PUT',
      body: payload,
      accessToken,
    }),

  delete: (customerId: number, addressId: number, accessToken: string) =>
    apiRequest<void>(`/api/v1/customer-addresses/customer/${customerId}/${addressId}`, {
      method: 'DELETE',
      accessToken,
    }),
};

// ── 9. Reviews ────────────────────────────────────────────────────────────────
export const reviewsApi = {
  list: (params: { product_id?: number; status?: string; page?: number; per_page?: number } = {}) =>
    apiRequest<unknown[]>('/api/v1/reviews/', {
      method: 'GET',
      params,
    }),

  create: (payload: { product_id: number; customer_id: number; rating: number; comment?: string; order_id?: number }, accessToken: string) =>
    apiRequest<unknown>('/api/v1/reviews/', {
      method: 'POST',
      body: payload,
      accessToken,
    }),
};

// ── 10. Reports & Health ──────────────────────────────────────────────────────
export const reportsApi = {
  getEcommerceDashboard: (accessToken: string) =>
    apiRequest<{
      sales_today: number;
      sales_this_month: number;
      pending_orders_count: number;
      pending_slips_count: number;
      total_members: number;
      recent_orders: unknown[];
      top_selling_wines: unknown[];
    }>('/api/v1/reports/ecommerce/dashboard', {
      method: 'GET',
      accessToken,
    }),

  getDailySummary: (date: string, branchId?: number, accessToken?: string) =>
    apiRequest<unknown>('/api/v1/reports/daily-summary', {
      method: 'GET',
      params: { date, branch_id: branchId },
      accessToken,
    }),
};

export const healthApi = {
  check: () =>
    apiRequest<{ status: string }>('/health', {
      method: 'GET',
      isRawResponse: true,
    }),

  checkMongo: () =>
    apiRequest<unknown>('/health/mongodb', {
      method: 'GET',
      isRawResponse: true,
    }),
};
