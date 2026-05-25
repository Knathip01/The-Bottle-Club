import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getSession } from '@/lib/auth-utils';

// Initialize Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const isPlaceholderKey = !stripeSecretKey || stripeSecretKey === 'sk_test_placeholder' || stripeSecretKey.includes('your_stripe_');

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
  apiVersion: '2025-01-27.acacia' as any,
});

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

    let body;
    try {
      body = await request.json();
    } catch (e) {
      console.error('Order Creation Error: Invalid JSON body', e);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { items, totalAmount, addressId, paymentMethod, successUrl, cancelUrl } = body;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';

    if (!items || !items.length) {
      console.error('Order Creation Error: Missing items');
      return NextResponse.json({ error: 'Missing items' }, { status: 400 });
    }

    let session_stripe;
    if (isPlaceholderKey) {
      console.warn('Local Stripe Key missing, falling back to backend checkout API...');
      try {
        const backendRes = await fetch(`${API_BASE_URL}/api/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items, 
            successUrl: successUrl || `${request.headers.get('origin')}/account/orders?status=success`, 
            cancelUrl: cancelUrl || `${request.headers.get('origin')}/checkout` 
          }),
        });
        
        if (!backendRes.ok) throw new Error('Backend checkout failed');
        const backendData = await backendRes.json();
        session_stripe = { id: backendData.id, url: backendData.url };
      } catch (err) {
        console.error('Fallback checkout failed:', err);
        return NextResponse.json({ 
          error: 'Stripe API Key is not configured. Please set a valid STRIPE_SECRET_KEY in your .env.local file.' 
        }, { status: 500 });
      }
    } else {
      // Create Stripe Checkout Session locally
      console.log('Creating Stripe Session locally...');
      try {
        session_stripe = await stripe.checkout.sessions.create({
          payment_method_types: paymentMethod === 'promptpay' ? ['promptpay'] : ['card'],
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
      } catch (stripeError: any) {
        console.error('Stripe Session Creation Failed:', stripeError.message);
        return NextResponse.json({ error: 'Stripe Error: ' + stripeError.message }, { status: 500 });
      }
    }

    // 3. Save Order to External API (Pending Status)
    const token = session?.user?.access_token;
    
    try {
      console.log('Sending order to external API:', `${API_BASE_URL}/api/orders`);
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      let mappedPaymentMethod = paymentMethod || 'credit_card';
      if (mappedPaymentMethod === 'wallet') mappedPaymentMethod = 'qr';

      const orderPayload = {
        user_id: user.id,
        total_amount: totalAmount,
        payment_method: mappedPaymentMethod,
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

      const apiData = await apiResponse.json().catch(() => ({}));
      const orderId = apiData.id || Date.now(); 

      return NextResponse.json({
        url: session_stripe.url,
        orderId: orderId
      });
    } catch (apiError) {
      console.error('External API Exception:', apiError);
      return NextResponse.json({
        url: session_stripe.url,
        orderId: 'temp-' + Date.now()
      });
    }

  } catch (error: any) {
    console.error('Create Order Unexpected Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error: ' + error.message },
      { status: 500 }
    );
  }
}
