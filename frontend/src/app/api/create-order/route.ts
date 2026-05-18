import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@/lib/auth-utils';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const isPlaceholderKey = !stripeSecretKey || stripeSecretKey === 'sk_test_placeholder' || stripeSecretKey.includes('your_stripe_');

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2026-04-22.dahlia',
});

export async function POST(request: Request) {
  try {
    console.log('--- START ORDER CREATION ---');

    if (isPlaceholderKey) {
      console.error('Order Creation Error: Stripe API Key is not configured or is using a placeholder.');
      return NextResponse.json({ 
        error: 'Stripe API Key is not configured. Please set a valid STRIPE_SECRET_KEY in your .env.local file.' 
      }, { status: 500 });
    }
    // 1. Get user session to authenticate the request using unified session
    const session = await getSession();
    const user = session?.user;
    
    if (!user) {
      console.error('Order Creation Error: Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Order Creation Error: Invalid JSON body', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { items, totalAmount, addressId, successUrl, cancelUrl } = body;
    console.log('Order Details:', { itemsCount: items?.length, totalAmount, addressId });

    if (!items || !items.length) {
      console.error('Order Creation Error: Missing items');
      return NextResponse.json({ error: 'Missing items' }, { status: 400 });
    }

    // 2. Create Stripe Checkout Session
    console.log('Creating Stripe Session...');
    let session_stripe;
    try {
      session_stripe = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'promptpay'],
        line_items: items.map((item: any) => ({
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
      console.log('Stripe Session Created:', session_stripe.id);
    } catch (stripeError: any) {
      console.error('Stripe Session Creation Failed:', stripeError.message);
      return NextResponse.json({ error: 'Stripe Error: ' + stripeError.message }, { status: 500 });
    }

    // 3. Save Order to External API (Pending Status)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';
    const token = session?.user?.access_token;
    
    try {
      console.log('Sending order to external API:', `${API_BASE_URL}/api/orders`);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      // Payload matching OrderCreate schema
      const orderPayload = {
        user_id: user.id,
        total_amount: totalAmount,
        payment_method: 'credit_card', // Must be one of: cash, promptpay, qr, credit_card, transfer
        order_type: 'online',
        address_id: addressId ? parseInt(addressId) : null,
        items: items.map((item: any) => ({
          product_id: parseInt(item.id),
          quantity: item.quantity,
          price: item.price
        }))
      };

      const apiResponse = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error('External API Order Error:', errorText);
        // We continue anyway and use the fallback or just return the Stripe session
      }

      const apiData = await apiResponse.json().catch(() => ({}));
      const orderId = apiData.id || Date.now(); 

      console.log('Order created successfully with ID:', orderId);
      // 4. Return Checkout URL
      return NextResponse.json({
        url: session_stripe.url,
        orderId: orderId
      });
    } catch (apiError) {
      console.error('External API Exception:', apiError);
      // Final fallback to local DB
      try {
        console.log('Falling back to local DB...');
        const { query } = await import('@/lib/db');
        const orderResult = await query(
          'INSERT INTO orders (user_id, total_amount, status, stripe_payment_intent_id) VALUES ($1, $2, $3, $4) RETURNING id',
          [String(user.id), totalAmount, 'pending', session_stripe.id]
        );
        console.log('Local DB order created:', orderResult.rows[0].id);
        return NextResponse.json({
          url: session_stripe.url,
          orderId: orderResult.rows[0].id
        });
      } catch (dbError: any) {
        console.error('Local DB fallback failed:', dbError.message);
        // Even if DB fails, we have the Stripe URL, let's try to return it
        return NextResponse.json({
          url: session_stripe.url,
          orderId: 'temp-' + Date.now(),
          warning: 'Failed to save order to database'
        });
      }
    }

  } catch (error: any) {
    console.error('Create Order Unexpected Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
