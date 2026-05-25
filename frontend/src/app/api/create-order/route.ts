import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@/lib/auth-utils';
import { query as dbQuery } from '@/lib/db';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const isPlaceholderKey = !stripeSecretKey || stripeSecretKey === 'sk_test_placeholder' || stripeSecretKey.includes('your_stripe_');

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia' as any,
});

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

export async function POST(request: Request) {
  try {
    console.log('--- START ORDER CREATION ---');

    // 1. Get user session first
    const session = await getSession();
    const user = session?.user;
    
    if (!user) {
      console.error('Order Creation Error: Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Order Creation Error: Invalid JSON body', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const {
      items,
      addressId,
      paymentMethod,
      shippingMethod,
      shippingFee,
      successUrl,
      cancelUrl,
      isFullTaxInvoice,
      taxId,
      taxBusinessName,
      useShippingAsTaxAddress,
      taxAddress,
    } = body;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';
    const requestedPaymentMethod = body.payment_method || paymentMethod || 'credit_card';
    const requestedShippingMethod = body.shipping_method || shippingMethod || 'standard';
    const shouldCreateStripeSession = requestedPaymentMethod === 'credit_card' && !isPlaceholderKey;

    if (!items || !items.length) {
      console.error('Order Creation Error: Missing items');
      return NextResponse.json({ error: 'Missing items' }, { status: 400 });
    }

    let session_stripe: { id?: string; url?: string | null } | null = null;
    if (shouldCreateStripeSession && isPlaceholderKey) {
      console.warn('Local Stripe key missing, trying backend checkout API before creating the order without a redirect URL...');
      try {
        const normalizedShippingFee = Number(shippingFee) || 0;
        const checkoutItems = normalizedShippingFee > 0
          ? [
              ...items,
              {
                name: 'Shipping',
                price: normalizedShippingFee,
                quantity: 1,
              },
            ]
          : items;

        const backendRes = await fetch(`${API_BASE_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items: checkoutItems,
            successUrl: successUrl || `${request.headers.get('origin')}/account/orders?status=success`, 
            cancelUrl: cancelUrl || `${request.headers.get('origin')}/checkout` 
          }),
        });
        
        if (!backendRes.ok) throw new Error('Backend checkout failed');
        const backendData = await backendRes.json();
        session_stripe = { id: backendData.id, url: backendData.url };
      } catch (err) {
        console.warn('Stripe checkout is unavailable; continuing with order creation only.', err);
        session_stripe = null;
      }
    } else if (shouldCreateStripeSession) {
      // Create Stripe Checkout Session locally
      console.log('Creating Stripe Session locally...');
      try {
        const normalizedShippingFee = Number(shippingFee) || 0;
        const checkoutItems = normalizedShippingFee > 0
          ? [
              ...items,
              {
                name: 'Shipping',
                price: normalizedShippingFee,
                quantity: 1,
              },
            ]
          : items;

        session_stripe = await stripe.checkout.sessions.create({
          payment_method_types: requestedPaymentMethod === 'promptpay' ? ['promptpay'] : ['card'],
          line_items: checkoutItems.map((item: any) => ({
            price_data: {
              currency: 'thb',
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          mode: 'payment',
          success_url: successUrl || `${request.headers.get('origin')}/account/orders?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: cancelUrl || `${request.headers.get('origin')}/checkout`,
          metadata: {
            userId: String(user.id),
          },
        });
      } catch (stripeError: any) {
        console.error('Stripe Session Creation Failed:', stripeError.message);
        return NextResponse.json({ error: 'Stripe Error: ' + stripeError.message }, { status: 500 });
      }
    }

    // Helper: save order to local DB (called on both success and graceful failure paths)
    async function saveOrderToLocalDB(
      orderId: number | string,
      totalAmount: number,
      status: string
    ) {
      const normalizedFee = Number(shippingFee) || 0;
      const subtotal = totalAmount - normalizedFee;

      // 1. Mirror products to local DB (for reference, not required)
      for (const item of items) {
        const productId = parseInt(String(item.product_id ?? item.id), 10);
        if (productId && item.name) {
          await dbQuery(
            `INSERT INTO products (id, name, price, stock)
             VALUES ($1, $2, $3, 0)
             ON CONFLICT (id) DO UPDATE SET
               name = EXCLUDED.name,
               price = EXCLUDED.price`,
            [productId, String(item.name), Number(item.price) || 0]
          ).catch(() => {}); // Non-fatal
        }
      }

      // 2. Save/Update the order
      await dbQuery(
        `INSERT INTO orders (
          id, user_id, subtotal_amount, shipping_fee, total_amount, status,
          order_type, payment_method, shipping_method, address_id,
          is_full_tax_invoice, tax_id, tax_business_name,
          use_shipping_as_tax_address, tax_address, created_at
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
        ON CONFLICT (id) DO UPDATE SET
          status = EXCLUDED.status,
          total_amount = EXCLUDED.total_amount,
          subtotal_amount = EXCLUDED.subtotal_amount,
          shipping_fee = EXCLUDED.shipping_fee,
          payment_method = EXCLUDED.payment_method,
          shipping_method = EXCLUDED.shipping_method,
          address_id = EXCLUDED.address_id,
          is_full_tax_invoice = EXCLUDED.is_full_tax_invoice,
          tax_id = EXCLUDED.tax_id,
          tax_business_name = EXCLUDED.tax_business_name,
          use_shipping_as_tax_address = EXCLUDED.use_shipping_as_tax_address,
          tax_address = EXCLUDED.tax_address`,
        [
          orderId,
          String(user.id),
          subtotal,
          normalizedFee,
          totalAmount,
          status,
          'online',
          requestedPaymentMethod,
          requestedShippingMethod,
          addressId ? parseInt(String(addressId)) : null,
          Boolean(isFullTaxInvoice ?? body.is_full_tax_invoice ?? false),
          taxId ?? body.tax_id ?? null,
          taxBusinessName ?? body.tax_business_name ?? null,
          useShippingAsTaxAddress ?? body.use_shipping_as_tax_address ?? true,
          taxAddress ? JSON.stringify(taxAddress ?? body.tax_address) : null,
          new Date().toISOString(),
        ]
      );

      // 3. Save items to local DB — include name so display works without products table
      await dbQuery('DELETE FROM order_items WHERE order_id = $1', [orderId]).catch(() => {});
      for (const item of items) {
        const productId = parseInt(String(item.product_id ?? item.id), 10);
        if (productId) {
          await dbQuery(
            `INSERT INTO order_items (order_id, product_id, quantity, price, name)
             VALUES ($1, $2, $3, $4, $5)`,
            [orderId, productId, Number(item.quantity) || 1, Number(item.price) || 0, String(item.name || `Product #${productId}`)]
          ).catch(err => console.error('Failed to save order item:', orderId, productId, err));
        }
      }
    }

    // 3. Save Order to External API
    const token = session?.user?.access_token;
    const requestTotalAmount = Number(body.totalAmount) || 0;
    
    try {
      console.log('Sending order to external API:', `${API_BASE_URL}/api/orders`);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const orderPayload = {
        user_id: user.id,
        payment_method: requestedPaymentMethod,
        order_type: 'online',
        shipping_method: requestedShippingMethod,
        address_id: addressId ? parseInt(String(addressId)) : null,
        is_full_tax_invoice: Boolean(isFullTaxInvoice ?? body.is_full_tax_invoice),
        tax_id: taxId ?? body.tax_id,
        tax_business_name: taxBusinessName ?? body.tax_business_name,
        use_shipping_as_tax_address: useShippingAsTaxAddress ?? body.use_shipping_as_tax_address ?? true,
        tax_address: taxAddress ?? body.tax_address,
        total_amount: requestTotalAmount,
        items: items.map((item: any) => ({
          product_id: parseInt(String(item.product_id ?? item.id), 10),
          quantity: Number(item.quantity),
          price: Number(item.price) || undefined,
        }))
      };

      console.log('Order payload:', JSON.stringify(orderPayload));

      const apiResponse = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload),
      });

      const apiData = await apiResponse.json().catch(() => ({}));
      console.log(`External API response ${apiResponse.status}:`, JSON.stringify(apiData));

      if (apiResponse.status === 401 || isInvalidTokenPayload(apiData)) {
        console.error('External API auth expired:', apiData);
        return authExpiredResponse(apiData);
      }

      if (!apiResponse.ok) {
        // Remote API failed — save locally so the order is not lost
        console.warn('External API order failed, saving to local DB as fallback:', apiData);
        const fallbackId = Date.now();
        try {
          await saveOrderToLocalDB(fallbackId, requestTotalAmount, 'pending');
          console.log('Fallback local DB save succeeded, orderId:', fallbackId);
          // Return success so CheckoutForm redirects to orders page — order is in local DB
          return NextResponse.json({
            url: session_stripe?.url || null,
            orderId: fallbackId,
            warning: 'Order saved locally; fulfilment system unavailable.',
          });
        } catch (dbErr) {
          console.error('Fallback local DB save also failed:', dbErr);
          return NextResponse.json(
            { error: apiData.detail || apiData.error || 'Order could not be processed' },
            { status: apiResponse.status }
          );
        }
      }

      const orderId = apiData.id || Date.now();
      const totalAmount = apiData.total_price ?? apiData.total_amount ?? requestTotalAmount;

      // Mirror the order to the local DB so GET /account/orders can display it.
      // (GET /api/orders on the remote API is admin-only; regular users get 403.)
      try {
        await saveOrderToLocalDB(orderId, totalAmount, apiData.status || 'pending');
        console.log('Order mirrored to local DB, orderId:', orderId);
      } catch (dbErr) {
        // Non-fatal: order was created in the remote API successfully
        console.warn('Failed to mirror order to local DB:', dbErr);
      }

      return NextResponse.json({
        url: session_stripe?.url || null,
        orderId: orderId
      });
    } catch (apiError) {
      console.error('External API Exception:', apiError);
      return NextResponse.json({ error: 'External order API failed' }, { status: 502 });
    }

  } catch (error: any) {
    console.error('Create Order Unexpected Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
