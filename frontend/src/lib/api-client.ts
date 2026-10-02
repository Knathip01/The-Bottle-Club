/**
 * Unified API Client for The Bottle Club (Wayneven POS & E-commerce Backend)
 * 
 * Base URL: https://api.wayneven.uk
 * OpenAPI: 135 operations / 99 paths
 * 
 * Security Notice:
 * - Only uses `access_token` obtained from login.
 * - NEVER uses or exposes JWT_SECRET_KEY to Client/Frontend.
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
  meta?: ApiMeta;
  request_id?: string;
  error?: string;
  code?: string;
}

export interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  accessToken?: string | null;
  branchId?: number | string | null;
  params?: Record<string, string | number | boolean | undefined | null>;
  body?: unknown;
}

/**
 * Make an HTTP request to https://api.wayneven.uk
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    accessToken,
    branchId = 1,
    params,
    body,
    headers: customHeaders,
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
      // Let the browser set the boundary for multipart/form-data
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
      meta: responseData.meta,
      request_id: responseData.request_id,
      error: errorMessage,
      code: responseData.code || String(response.status),
    };
  }

  // Standard Wayneven response unwrapping
  return {
    data: (responseData.data !== undefined ? responseData.data : responseData) as T,
    meta: responseData.meta,
    request_id: responseData.request_id,
  };
}
