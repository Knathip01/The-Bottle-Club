import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { shippingRouter } from './shipping/routes';
import pool, { query } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Stripe Client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2023-10-16' as any,
});

app.use(cors());
// Need raw body for stripe webhooks
app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhooks/stripe') {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.use('/api/shipping', shippingRouter);

// Order Creation API
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { 
      order_type, 
      payment_method, 
      items, 
      address_id, 
      received_amount, 
      change_amount 
    } = req.body;

    // Validation
    if (!order_type || !payment_method || !items || !items.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (order_type === 'online' && !address_id) {
      return res.status(400).json({ error: 'Address ID is required for online orders' });
    }

    await client.query('BEGIN');

    let totalAmount = 0;
    const orderItems = [];

    // 1. Stock Check and Price Fetch
    for (const item of items) {
      const productRes = await client.query('SELECT * FROM products WHERE id = $1 FOR UPDATE', [item.product_id]);
      if (productRes.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Product with ID ${item.product_id} not found` });
      }

      const product = productRes.rows[0];
      if (product.stock < item.quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += Number(itemTotal);
      
      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      });

      // 2. Update Stock
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
    }

    // 3. Create Order
    // In a real app, you'd extract user_id from JWT
    const userId = 'user_placeholder'; 

    const orderRes = await client.query(
      `INSERT INTO orders (
        user_id, total_amount, status, order_type, payment_method, 
        address_id, received_amount, change_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        userId, totalAmount, 'pending', order_type, payment_method, 
        address_id, received_amount, change_amount
      ]
    );

    const order = orderRes.rows[0];

    // 4. Create Order Items
    for (const item of orderItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    res.status(201).json({
      id: order.id,
      total_amount: order.total_amount,
      status: order.status
    });

  } catch (error: any) {
    await client.query('ROLLBACK');
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
});

// Create Stripe Checkout Session
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'promptpay'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'thb',
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: item.price * 100, // Stripe expects amounts in cents/satang
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    res.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
