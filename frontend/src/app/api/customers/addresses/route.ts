import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isInvalidTokenPayload(payload: unknown) {
  if (!isRecord(payload)) {
    return false;
  }

  if (payload.code === 'INVALID_TOKEN') {
    return true;
  }

  const details = payload.details;
  return isRecord(details) && details.code === 'INVALID_TOKEN';
}

function authExpiredResponse(payload: unknown) {
  const response = NextResponse.json(
    {
      error: 'AUTH_EXPIRED',
      authExpired: true,
      message: 'Your session has expired. Please sign in again.',
      details: payload,
    },
    { status: 401 }
  );

  response.cookies.set('session', '', { expires: new Date(0), path: '/' });
  return response;
}

async function getAuthHeaders() {
  const session = await getSession();
  const token = session?.user?.access_token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function proxyAddressRequest(method: 'GET' | 'POST', body?: unknown) {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/api/customers/addresses`, {
      method,
      headers,
      cache: 'no-store',
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const contentType = response.headers.get('content-type') || '';
    const payload = contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text();

    if (response.status === 401 || isInvalidTokenPayload(payload)) {
      return authExpiredResponse(payload);
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: 'External API error',
          status: response.status,
          details: payload,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(payload);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: 'Internal Proxy Error', details: message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return proxyAddressRequest('GET');
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  return proxyAddressRequest('POST', body);
}
