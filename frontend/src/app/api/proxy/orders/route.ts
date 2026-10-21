import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';
import { getBackendServiceToken } from '@/app/actions/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const session = await getSession();
    const userToken = session?.user?.access_token;
    const serviceToken = await getBackendServiceToken();
    const token = serviceToken || userToken;
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';
    const targetUrl = `${API_BASE_URL}/api/v1/orders/`;
    
    console.log('--- Order Proxy Request ---');
    console.log('Target:', targetUrl);
    
    const branchId = body?.branch_id || 1;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Branch-Id': String(branchId),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const orderPayload = {
      ...body,
      order_source: body.order_source || 'ecommerce',
    };

    // Proxy the request to the external API
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderPayload),
    });

    console.log('External API Status:', response.status);

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error('External API Error:', data);
      return NextResponse.json(
        {
          error: data.detail || data.message || 'External API error',
          code: data.code || String(response.status),
          request_id: data.request_id,
          status: response.status,
          details: data,
        },
        { status: response.status }
      );
    }
    console.log('Order Success:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Proxy Exception:', error.message || error);
    return NextResponse.json(
      { error: 'Internal Proxy Error', details: error.message || String(error) },
      { status: 500 }
    );
  }
}
