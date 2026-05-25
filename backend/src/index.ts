import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import { shippingRouter } from './shipping/routes';
import pool from './db';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

type OrderType = 'online' | 'pos';
type PaymentMethod =
  | 'cash'
  | 'transfer'
  | 'credit_card'
  | 'promptpay'
  | 'alipay'
  | 'wechat_pay'
  | 'line_pay'
  | 'shopee_pay'
  | 'true_wallet';
type OnlineShippingMethod = 'standard' | 'express';
type ShippingMethod = OnlineShippingMethod | 'pos';

type NormalizedOrderItem = {
  productId: number;
  quantity: number;
};

type TaxInvoiceData = {
  isFullTaxInvoice: boolean;
  taxId: string | null;
  taxBusinessName: string | null;
  useShippingAsTaxAddress: boolean;
  taxAddress: Record<string, unknown> | null;
};

type ProductRow = {
  id: number;
  name: string;
  price: string | number;
  stock: number;
};

const VALID_ORDER_TYPES = new Set<OrderType>(['online', 'pos']);
const VALID_PAYMENT_METHODS = new Set<PaymentMethod>([
  'cash',
  'transfer',
  'credit_card',
  'promptpay',
  'alipay',
  'wechat_pay',
  'line_pay',
  'shopee_pay',
  'true_wallet',
]);
const VALID_ONLINE_SHIPPING_METHODS = new Set<OnlineShippingMethod>(['standard', 'express']);

function roundMoney(value: number) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function getJwtUserId(authHeader: string) {
  const token = authHeader.slice('Bearer '.length).trim();
  const payload = token.split('.')[1];

  if (!payload) {
    return 'user_placeholder';
  }

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
    const decoded = JSON.parse(Buffer.from(padded, 'base64').toString('utf8'));
    return String(decoded.sub || decoded.user_id || decoded.id || decoded.email || 'user_placeholder');
  } catch {
    return 'user_placeholder';
  }
}

function normalizeOrderType(value: unknown): OrderType | null {
  return typeof value === 'string' && VALID_ORDER_TYPES.has(value as OrderType)
    ? (value as OrderType)
    : null;
}

function normalizePaymentMethod(value: unknown): PaymentMethod | null {
  return typeof value === 'string' && VALID_PAYMENT_METHODS.has(value as PaymentMethod)
    ? (value as PaymentMethod)
    : null;
}

function normalizeItems(value: unknown): { items: NormalizedOrderItem[]; error?: string } {
  if (!Array.isArray(value) || value.length === 0) {
    return { items: [], error: 'Items are required' };
  }

  const totalsByProduct = new Map<number, number>();

  for (const rawItem of value) {
    if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) {
      return { items: [], error: 'Each item must be an object' };
    }

    const item = rawItem as Record<string, unknown>;
    const productId = Number(item.product_id);
    const quantity = Number(item.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      return { items: [], error: 'Each item requires a valid product_id' };
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { items: [], error: 'Each item requires a positive integer quantity' };
    }

    totalsByProduct.set(productId, (totalsByProduct.get(productId) || 0) + quantity);
  }

  const items = Array.from(totalsByProduct.entries())
    .map(([productId, quantity]) => ({ productId, quantity }))
    .sort((a, b) => a.productId - b.productId);

  return { items };
}

function normalizeTaxInvoice(body: Record<string, unknown>): { data: TaxInvoiceData; error?: string } {
  const isFullTaxInvoice = body.is_full_tax_invoice === true;
  const useShippingAsTaxAddress = body.use_shipping_as_tax_address !== false;

  if (!isFullTaxInvoice) {
    return {
      data: {
        isFullTaxInvoice: false,
        taxId: null,
        taxBusinessName: null,
        useShippingAsTaxAddress,
        taxAddress: null,
      },
    };
  }

  const taxId = typeof body.tax_id === 'string' ? body.tax_id.trim() : '';
  const taxBusinessName =
    typeof body.tax_business_name === 'string' ? body.tax_business_name.trim() : '';

  if (!/^\d{13}$/.test(taxId)) {
    return {
      data: {
        isFullTaxInvoice,
        taxId: null,
        taxBusinessName: null,
        useShippingAsTaxAddress,
        taxAddress: null,
      },
      error: 'Tax ID must be 13 digits',
    };
  }

  if (!taxBusinessName) {
    return {
      data: {
        isFullTaxInvoice,
        taxId,
        taxBusinessName: null,
        useShippingAsTaxAddress,
        taxAddress: null,
      },
      error: 'Tax business name is required',
    };
  }

  let taxAddress: Record<string, unknown> | null = null;

  if (!useShippingAsTaxAddress) {
    if (!body.tax_address || typeof body.tax_address !== 'object' || Array.isArray(body.tax_address)) {
      return {
        data: {
          isFullTaxInvoice,
          taxId,
          taxBusinessName,
          useShippingAsTaxAddress,
          taxAddress: null,
        },
        error: 'Tax address is required when not using shipping address',
      };
    }

    taxAddress = body.tax_address as Record<string, unknown>;
  }

  return {
    data: {
      isFullTaxInvoice,
      taxId,
      taxBusinessName,
      useShippingAsTaxAddress,
      taxAddress,
    },
  };
}

function calculateShipping(
  orderType: OrderType,
  requestedMethod: unknown,
  subtotal: number
): { method: ShippingMethod; fee: number; error?: string } {
  if (orderType === 'pos') {
    return { method: 'pos', fee: 0 };
  }

  const method = typeof requestedMethod === 'string' ? requestedMethod : 'standard';

  if (!VALID_ONLINE_SHIPPING_METHODS.has(method as OnlineShippingMethod)) {
    return {
      method: 'standard',
      fee: 0,
      error: 'Shipping method must be standard or express for online orders',
    };
  }

  const onlineMethod = method as OnlineShippingMethod;

  if (onlineMethod === 'express') {
    return { method: onlineMethod, fee: 250 };
  }

  return { method: onlineMethod, fee: subtotal >= 2000 ? 0 : 100 };
}

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
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const body = req.body || {};
  const orderType = normalizeOrderType(body.order_type);
  const paymentMethod = normalizePaymentMethod(body.payment_method);
  const normalizedItems = normalizeItems(body.items);
  const taxInvoice = normalizeTaxInvoice(body);
  const addressId = body.address_id === undefined || body.address_id === null ? null : Number(body.address_id);

  if (!orderType) {
    res.status(400).json({ error: 'order_type must be online or pos' });
    return;
  }

  if (!paymentMethod) {
    res.status(400).json({ error: 'Unsupported payment_method' });
    return;
  }

  if (normalizedItems.error) {
    res.status(400).json({ error: normalizedItems.error });
    return;
  }

  if (orderType === 'online' && (addressId === null || !Number.isInteger(addressId) || addressId <= 0)) {
    res.status(400).json({ error: 'address_id is required for online orders' });
    return;
  }

  if (taxInvoice.error) {
    res.status(400).json({ error: taxInvoice.error });
    return;
  }

  const receivedAmount =
    body.received_amount === undefined || body.received_amount === null
      ? null
      : Number(body.received_amount);
  const changeAmount =
    body.change_amount === undefined || body.change_amount === null ? null : Number(body.change_amount);

  if (receivedAmount !== null && (!Number.isFinite(receivedAmount) || receivedAmount < 0)) {
    res.status(400).json({ error: 'received_amount must be a positive number' });
    return;
  }

  if (changeAmount !== null && (!Number.isFinite(changeAmount) || changeAmount < 0)) {
    res.status(400).json({ error: 'change_amount must be a positive number' });
    return;
  }

  const client = await pool.connect();
  let transactionStarted = false;

  try {
    await client.query('BEGIN');
    transactionStarted = true;

    let subtotalAmount = 0;
    const orderItems: Array<{ product_id: number; quantity: number; price: number }> = [];
    const productIds = normalizedItems.items.map((item) => item.productId);

    // 1. Stock check and price fetch. Rows are locked until COMMIT to prevent over-selling.
    const productRes = await client.query<ProductRow>(
      'SELECT id, name, price, stock FROM products WHERE id = ANY($1::int[]) ORDER BY id FOR UPDATE',
      [productIds]
    );
    const productsById = new Map<number, ProductRow>(
      productRes.rows.map((product: ProductRow) => [Number(product.id), product])
    );

    for (const item of normalizedItems.items) {
      const product = productsById.get(item.productId);

      if (!product) {
        await client.query('ROLLBACK');
        transactionStarted = false;
        res.status(400).json({ error: `Product with ID ${item.productId} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        await client.query('ROLLBACK');
        transactionStarted = false;
        res.status(400).json({ error: `Insufficient stock for product: ${product.name}` });
        return;
      }

      const unitPrice = Number(product.price);
      const itemTotal = roundMoney(unitPrice * item.quantity);
      subtotalAmount = roundMoney(subtotalAmount + itemTotal);

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: unitPrice,
      });
    }

    const shipping = calculateShipping(orderType, body.shipping_method, subtotalAmount);
    if (shipping.error) {
      await client.query('ROLLBACK');
      transactionStarted = false;
      res.status(400).json({ error: shipping.error });
      return;
    }

    // 2. Update stock only after every requested item has passed validation.
    for (const item of normalizedItems.items) {
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [
        item.quantity,
        item.productId,
      ]);
    }

    const totalAmount = roundMoney(subtotalAmount + shipping.fee);
    const userId = getJwtUserId(authHeader);

    const orderRes = await client.query(
      `INSERT INTO orders (
        user_id, subtotal_amount, shipping_fee, total_amount, status, order_type, payment_method,
        shipping_method, address_id, received_amount, change_amount, is_full_tax_invoice,
        tax_id, tax_business_name, use_shipping_as_tax_address, tax_address
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12,
        $13, $14, $15, $16
      ) RETURNING *`,
      [
        userId,
        subtotalAmount,
        shipping.fee,
        totalAmount,
        'pending',
        orderType,
        paymentMethod,
        shipping.method,
        orderType === 'online' ? addressId : null,
        receivedAmount,
        changeAmount,
        taxInvoice.data.isFullTaxInvoice,
        taxInvoice.data.taxId,
        taxInvoice.data.taxBusinessName,
        taxInvoice.data.useShippingAsTaxAddress,
        taxInvoice.data.taxAddress ? JSON.stringify(taxInvoice.data.taxAddress) : null,
      ]
    );

    const order = orderRes.rows[0];

    // 4. Create order items
    for (const item of orderItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');
    transactionStarted = false;

    res.status(201).json({
      id: order.id,
      subtotal_amount: order.subtotal_amount,
      shipping_method: order.shipping_method,
      shipping_fee: order.shipping_fee,
      total_amount: order.total_amount,
      status: order.status,
      order_type: order.order_type,
      payment_method: order.payment_method,
      is_full_tax_invoice: order.is_full_tax_invoice,
    });
    return;

  } catch (error: any) {
    if (transactionStarted) {
      await client.query('ROLLBACK').catch((rollbackError: unknown) => {
        console.error('Order rollback error:', rollbackError);
      });
    }
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
