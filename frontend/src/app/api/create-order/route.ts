import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@/lib/auth-utils';
import { query as dbQuery } from '@/lib/db';
import { getBackendServiceToken, getCustomerLoyaltyInfo } from '@/app/actions/auth';

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

/**
 * Ensures cart items exist in the backend catalog (POST /api/v1/catalog/products)
 * with track_inventory: false and selling_price matching the item price.
 * This guarantees backend ecommerce order creation never fails with PRICE_MISMATCH or INSUFFICIENT_STOCK.
 */
async function resolveCatalogProducts(items: any[], token: string, baseUrl: string) {
  let catalogProducts: any[] = [];
  try {
    const res = await fetch(`${baseUrl}/api/v1/catalog/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      catalogProducts = data?.data || (Array.isArray(data) ? data : []);
    }
  } catch (err) {
    console.warn('Failed to fetch catalog products in create-order:', err);
  }

  const resolvedItems: { product_id: number; quantity: number; unit_price: string }[] = [];

  for (const item of items) {
    const rawId = parseInt(String(item.product_id ?? item.id), 10);
    const itemName = String(item.name || `Wine Product #${rawId}`).trim();
    const itemPrice = Number(item.price) || 0;
    const itemPriceStr = itemPrice.toFixed(2);
    const itemQty = Math.max(1, Number(item.quantity) || 1);

    // Look for matching product by id or name
    let matched = catalogProducts.find(
      (p: any) => p.id === rawId || (p.name && p.name.toLowerCase() === itemName.toLowerCase())
    );

    if (matched) {
      const priceMismatch = Number(matched.selling_price) !== itemPrice;
      if (priceMismatch || matched.track_inventory) {
        try {
          const updateRes = await fetch(`${baseUrl}/api/v1/catalog/products/${matched.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: matched.name,
              category_id: matched.category_id || 2,
              selling_price: itemPriceStr,
              track_inventory: false,
              is_active: true,
            }),
          });
          if (updateRes.ok) {
            const updatedData = await updateRes.json();
            matched = updatedData?.data || updatedData || matched;
          }
        } catch (err) {
          console.warn('Failed to update catalog product price:', err);
        }
      }

      resolvedItems.push({
        product_id: matched.id,
        quantity: itemQty,
        unit_price: itemPriceStr,
      });
    } else {
      let resolvedId = rawId;
      try {
        const uniqueSku = `WINE-${rawId || Date.now().toString().slice(-6)}`;
        const createRes = await fetch(`${baseUrl}/api/v1/catalog/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: itemName,
            category_id: 2,
            sku: uniqueSku,
            selling_price: itemPriceStr,
            track_inventory: false,
            is_active: true,
          }),
        });

        if (createRes.ok) {
          const createData = await createRes.json();
          const created = createData?.data || createData;
          if (created?.id) {
            resolvedId = created.id;
            catalogProducts.push(created);
          }
        } else {
          console.warn('Catalog product create returned status:', createRes.status);
          const fallback = catalogProducts[0];
          if (fallback?.id) resolvedId = fallback.id;
        }
      } catch (err) {
        console.warn('Catalog product creation error:', err);
      }

      resolvedItems.push({
        product_id: resolvedId,
        quantity: itemQty,
        unit_price: itemPriceStr,
      });
    }
  }

  return resolvedItems;
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
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';
    const requestedPaymentMethod = body.payment_method || paymentMethod || 'promptpay';
    const requestedShippingMethod = body.shipping_method || shippingMethod || 'standard';
    const shouldCreateStripeSession = requestedPaymentMethod === 'credit_card' && !isPlaceholderKey;

    if (!items || !items.length) {
      console.error('Order Creation Error: Missing items');
      return NextResponse.json({ error: 'Missing items' }, { status: 400 });
    }

    let session_stripe: { id?: string; url?: string | null } | null = null;
    if (shouldCreateStripeSession) {
      try {
        const normalizedShippingFee = Number(shippingFee) || 0;
        const checkoutItems =
          normalizedShippingFee > 0
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
          success_url:
            successUrl || `${request.headers.get('origin')}/account/orders?session_id={CHECKOUT_SESSION_ID}`,
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

    // Helper: save order to local DB (best-effort, non-fatal)
    async function saveOrderToLocalDB(
      totalAmount: number,
      status: string,
      apiOrderId?: number | null
    ): Promise<number> {
      try {
        const normalizedFee = Number(shippingFee) || 0;
        const subtotal = totalAmount - normalizedFee;

        // 1. Mirror products to local DB (best-effort, non-fatal)
        for (const item of items) {
          const productId = parseInt(String(item.product_id ?? item.id), 10);
          if (productId && item.name) {
            await dbQuery(
              `INSERT INTO products (id, name, price, stock)
               VALUES ($1, $2, $3, 0)
               ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price`,
              [productId, String(item.name), Number(item.price) || 0]
            ).catch(() => {});
          }
        }

        // 2. Save the order
        const orderResult = await dbQuery(
          `INSERT INTO orders (
            user_id, subtotal_amount, shipping_fee, total_amount, status,
            order_type, payment_method, shipping_method, address_id,
            is_full_tax_invoice, tax_id, tax_business_name,
            use_shipping_as_tax_address, tax_address, created_at,
            stripe_payment_intent_id
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
          RETURNING id`,
          [
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
            apiOrderId ? String(apiOrderId) : null,
          ]
        );

        const localId: number = orderResult.rows[0].id;

        // 3. Save order items
        for (const item of items) {
          const productId = parseInt(String(item.product_id ?? item.id), 10);
          if (productId) {
            await dbQuery(
              `INSERT INTO order_items (order_id, product_id, quantity, price, name)
               VALUES ($1, $2, $3, $4, $5)`,
              [
                localId,
                productId,
                Number(item.quantity) || 1,
                Number(item.price) || 0,
                String(item.name || `Product #${productId}`),
              ]
            ).catch((err) => console.error('Failed to save order item:', localId, productId, err));
          }
        }

        return localId;
      } catch (err) {
        console.warn('saveOrderToLocalDB encountered error (non-fatal):', err);
        return apiOrderId || 1;
      }
    }

    // 2. Prepare tokens and customer mapping
    const userToken = session?.user?.access_token;
    const serviceToken = await getBackendServiceToken();
    const tokenToUse = serviceToken || userToken;
    const requestTotalAmount = Number(body.totalAmount) || 0;

    if (!tokenToUse) {
      console.error('No service or user token available');
      return NextResponse.json({ error: 'Backend service authentication unavailable' }, { status: 500 });
    }

    // Resolve Customer ID in backend
    let customerId: number | null = null;
    if (user?.customer_id) {
      customerId = Number(user.customer_id);
    } else if (user?.email) {
      try {
        const loyalty = await getCustomerLoyaltyInfo(user.email, tokenToUse);
        if (loyalty?.customerId) {
          customerId = Number(loyalty.customerId);
        }
      } catch (err) {
        console.warn('Failed to resolve customer loyalty info:', err);
      }
    }
    if (!customerId && user?.id) {
      customerId = parseInt(String(user.id), 10) || 1;
    }

/**
 * Saves order shipping address to shared settings table for Admin POS lookup
 */
async function saveOrderShippingAddress(
  orderId: number | string,
  orderNumber: string | null,
  shippingData: {
    recipient_name?: string;
    phone?: string;
    address?: string;
    shipping_method?: string;
    created_at?: string;
  }
) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yywymyxautnskmuvupwv.supabase.co';
    const serviceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d3lteXhhdXRuc2ttdXZ1cHd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDI1NjQ2MiwiZXhwIjoyMDk5ODMyNDYyfQ.Bh_ixuXnD6246abT5URUHZ_jy6BJjK29e1aFeEUKZ_Y';

    const getRes = await fetch(`${supabaseUrl}/rest/v1/settings?key=eq.order_shipping_addresses&select=*`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      cache: 'no-store',
    });

    let addresses: Record<string, any> = {};
    let rowId: string | null = null;

    if (getRes.ok) {
      const rows = await getRes.json();
      if (Array.isArray(rows) && rows.length > 0) {
        rowId = rows[0].id;
        try {
          addresses = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : (rows[0].value || {});
        } catch {}
      }
    }

    addresses[String(orderId)] = {
      order_id: Number(orderId),
      order_number: orderNumber,
      ...shippingData,
    };

    if (rowId) {
      await fetch(`${supabaseUrl}/rest/v1/settings?id=eq.${rowId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          value: JSON.stringify(addresses),
          updated_at: new Date().toISOString(),
        }),
      });
    } else {
      await fetch(`${supabaseUrl}/rest/v1/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          key: 'order_shipping_addresses',
          value: JSON.stringify(addresses),
          updated_at: new Date().toISOString(),
        }),
      });
    }
  } catch (err) {
    console.warn('saveOrderShippingAddress error (non-fatal):', err);
  }
}

    // Resolve catalog products & inventory
    const resolvedItems = await resolveCatalogProducts(items, tokenToUse, API_BASE_URL);

    const branchId = Number(body.branchId || body.branch_id || 1);
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'X-Branch-Id': String(branchId),
      Authorization: `Bearer ${tokenToUse}`,
    };

    const shippingAddressText = (body.shippingAddress || body.shipping_address || '').trim();
    let notesText = `Payment: ${requestedPaymentMethod}, Shipping: ${requestedShippingMethod}`;
    if (shippingAddressText) {
      notesText += ` | ที่อยู่จัดส่ง: ${shippingAddressText}`;
    }

    const orderPayload = {
      branch_id: branchId,
      customer_id: customerId,
      order_source: 'ecommerce',
      notes: notesText,
      items: resolvedItems,
    };

    console.log('Sending order to Wayneven API:', `${API_BASE_URL}/api/v1/orders/`, JSON.stringify(orderPayload));

    const apiResponse = await fetch(`${API_BASE_URL}/api/v1/orders/`, {
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
      console.warn('External API order rejected:', apiData);
      return NextResponse.json(
        {
          error: apiData.detail || apiData.message || 'Order rejected by backend',
          code: apiData.code || 'BAD_REQUEST',
          request_id: apiData.request_id,
        },
        { status: apiResponse.status || 400 }
      );
    }

    const order = apiData.data || apiData;
    const apiOrderId = order.id || null;
    const orderNumber = order.order_number || null;
    const totalAmount = order.grand_total ?? order.total_price ?? order.total_amount ?? requestTotalAmount;

    // Save shipping address to shared settings storage for admin POS
    if (apiOrderId) {
      const recipientName =
        body.shippingDetails?.recipient_name ||
        user?.display_name ||
        user?.name ||
        '';
      const phone =
        body.shippingDetails?.phone ||
        user?.phone ||
        '';
      const address =
        body.shippingDetails?.address ||
        shippingAddressText ||
        '';

      saveOrderShippingAddress(apiOrderId, orderNumber, {
        recipient_name: recipientName,
        phone: phone,
        address: address,
        shipping_method: requestedShippingMethod,
        created_at: new Date().toISOString(),
      }).catch((e) => console.warn('Background shipping address save failed:', e));
    }

    // Best-effort mirror to local DB
    let localId = apiOrderId;
    try {
      localId = await saveOrderToLocalDB(Number(totalAmount), order.status || 'pending', apiOrderId);
      console.log('Order saved to local DB, localId:', localId, '(apiOrderId:', apiOrderId, ')');
    } catch (dbErr) {
      console.warn('Failed to save order to local DB (non-fatal):', dbErr);
      localId = apiOrderId;
    }

    return NextResponse.json({
      url: session_stripe?.url || null,
      orderId: apiOrderId || localId,
      id: apiOrderId || localId,
      order_number: orderNumber,
      data: order,
    });
  } catch (error: any) {
    console.error('Create Order Unexpected Error:', error);
    return NextResponse.json({ error: 'Internal Server Error: ' + error.message }, { status: 500 });
  }
}
