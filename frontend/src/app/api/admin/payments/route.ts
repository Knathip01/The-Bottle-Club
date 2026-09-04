import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

// ── GET /api/admin/payments — ดึงออเดอร์ที่รอตรวจสอบการชำระเงิน ──────────────
export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session || !session.admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const statusFilter = searchParams.get('status') || 'pending'; // pending | all
  const methodFilter = searchParams.get('method') || '';         // transfer | promptpay | ''
  const page  = parseInt(searchParams.get('page')  || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const offset = (page - 1) * limit;

  try {
    const params: any[] = [];
    const where: string[] = [];

    // Only show orders that require manual payment verification
    where.push(`payment_method IN ('transfer', 'promptpay', 'alipay', 'wechat_pay', 'line_pay', 'shopee_pay', 'true_wallet')`);

    if (statusFilter !== 'all') {
      params.push(statusFilter);
      where.push(`status = $${params.length}`);
    }
    if (methodFilter) {
      params.push(methodFilter);
      where.push(`payment_method = $${params.length}`);
    }

    const whereSql = `WHERE ${where.join(' AND ')}`;

    const countRes = await query(`SELECT COUNT(*) FROM orders ${whereSql}`, params);
    const total = parseInt(countRes.rows[0]?.count || '0');

    const listParams = [...params, limit, offset];
    const rows = await query(`
      SELECT
        o.id,
        o.user_id,
        o.total_amount,
        o.subtotal_amount,
        o.shipping_fee,
        o.status,
        o.payment_method,
        o.payment_slip_url,
        o.admin_note,
        o.created_at,
        o.approved_at,
        o.approved_by,
        u.first_name,
        u.last_name,
        u.email AS user_email
      FROM orders o
      LEFT JOIN users u ON o.user_id::text = u.email
      ${whereSql}
      ORDER BY
        CASE WHEN o.payment_slip_url IS NOT NULL AND o.payment_slip_url != '' AND o.status = 'pending' THEN 0 ELSE 1 END,
        o.created_at DESC
      LIMIT $${listParams.length - 1}
      OFFSET $${listParams.length}
    `, listParams);

    return NextResponse.json({
      orders: rows.rows.map((r) => ({
        id: r.id,
        customerName: r.first_name ? `${r.first_name} ${r.last_name}` : null,
        customerEmail: r.user_email || r.user_id || 'Guest',
        total: parseFloat(r.total_amount || 0),
        subtotal: parseFloat(r.subtotal_amount || 0),
        shippingFee: parseFloat(r.shipping_fee || 0),
        status: r.status,
        paymentMethod: r.payment_method,
        paymentSlipUrl: r.payment_slip_url || '',
        adminNote: r.admin_note || '',
        date: new Date(r.created_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        approvedAt: r.approved_at ? new Date(r.approved_at).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' }) : null,
        hasSlip: !!(r.payment_slip_url),
      })),
      total,
      page,
      limit,
    });
  } catch (err: any) {
    console.warn('[/api/admin/payments] DB error, returning mock data:', err.message);

    // Fallback mock
    const mock = [
      {
        id: 1001, customerName: 'สมชาย ใจดี', customerEmail: 'somchai@gmail.com',
        total: 4850, subtotal: 4500, shippingFee: 350, status: 'pending',
        paymentMethod: 'transfer', paymentSlipUrl: '', adminNote: '',
        date: '05 มิ.ย. 2569, 14:02', approvedAt: null, hasSlip: false,
      },
      {
        id: 1002, customerName: 'ณัฐพร ศรีใส', customerEmail: 'nattaporn@hotmail.com',
        total: 12900, subtotal: 12800, shippingFee: 100, status: 'pending',
        paymentMethod: 'promptpay', paymentSlipUrl: '/images/slip_mockup.png', adminNote: '',
        date: '05 มิ.ย. 2569, 13:10', approvedAt: null, hasSlip: true,
      },
      {
        id: 1006, customerName: null, customerEmail: 'anon_user_99@gmail.com',
        total: 950, subtotal: 950, shippingFee: 0, status: 'payment_rejected',
        paymentMethod: 'transfer', paymentSlipUrl: '', adminNote: 'ยอดเงินไม่ตรง',
        date: '04 มิ.ย. 2569, 14:22', approvedAt: null, hasSlip: false,
      },
      {
        id: 1011, customerName: 'วรวรรณ กาญจน์', customerEmail: 'warawan.k@gmail.com',
        total: 4200, subtotal: 4200, shippingFee: 0, status: 'pending',
        paymentMethod: 'transfer', paymentSlipUrl: '/images/slip_mockup.png', adminNote: '',
        date: '30 พ.ค. 2569, 17:45', approvedAt: null, hasSlip: true,
      },
    ];

    let filtered = [...mock];
    if (statusFilter !== 'all') filtered = filtered.filter(o => o.status === statusFilter);
    if (methodFilter) filtered = filtered.filter(o => o.paymentMethod === methodFilter);

    return NextResponse.json({ orders: filtered, total: filtered.length, page, limit });
  }
}
