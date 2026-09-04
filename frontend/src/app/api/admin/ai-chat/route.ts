import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

/* ─── DB Context ─── */
async function fetchAdminContext() {
  try {
    const [revenueRes, pendingRes, topProductsRes, salesRes, lowStockRes, totalOrdersRes] =
      await Promise.all([
        query(`SELECT COALESCE(SUM(total_amount),0) as v FROM orders WHERE DATE(created_at)=CURRENT_DATE AND status!='payment_rejected'`),
        query(`SELECT COUNT(*) as v FROM orders WHERE status='pending'`),
        query(`
          SELECT p.name, SUM(oi.quantity) as qty, SUM(oi.quantity*oi.price) as rev
          FROM order_items oi
          JOIN products p ON oi.product_id=p.id
          JOIN orders o ON oi.order_id=o.id
          WHERE o.status!='payment_rejected'
          GROUP BY p.name ORDER BY qty DESC LIMIT 5
        `),
        query(`
          SELECT TO_CHAR(DATE(created_at),'DD/MM') as d,
                 SUM(total_amount) as amt, COUNT(*) as cnt
          FROM orders
          WHERE created_at>=CURRENT_DATE-INTERVAL '7 days'
            AND status!='payment_rejected'
          GROUP BY DATE(created_at), TO_CHAR(DATE(created_at),'DD/MM')
          ORDER BY DATE(created_at) DESC
        `),
        query(`SELECT name, stock, price FROM products WHERE stock<10 ORDER BY stock ASC LIMIT 5`),
        query(`SELECT COUNT(*) as v, COALESCE(SUM(total_amount),0) as total FROM orders WHERE status!='payment_rejected'`),
      ]);

    return {
      todayRevenue:  parseFloat(revenueRes.rows[0]?.v || 0),
      pendingOrders: parseInt(pendingRes.rows[0]?.v || 0),
      allTimeOrders: parseInt(totalOrdersRes.rows[0]?.v || 0),
      allTimeRevenue: parseFloat(totalOrdersRes.rows[0]?.total || 0),
      topProducts: topProductsRes.rows.map(r => ({
        name: r.name, qty: parseInt(r.qty), revenue: parseFloat(r.rev),
      })),
      last7DaysSales: salesRes.rows.map(r => ({
        date: r.d, amount: parseFloat(r.amt), orders: parseInt(r.cnt),
      })),
      lowStock: lowStockRes.rows.map(r => ({
        name: r.name, stock: parseInt(r.stock), price: parseFloat(r.price),
      })),
      isLiveData: true,
    };
  } catch {
    return {
      todayRevenue: 48250, pendingOrders: 14,
      allTimeOrders: 312, allTimeRevenue: 2840000,
      topProducts: [
        { name: 'Chateau Margaux 2015',       qty: 18, revenue: 441000 },
        { name: 'Moet & Chandon Imperial Brut', qty: 24, revenue: 76800  },
        { name: 'Dom Perignon Rose 2008',       qty: 3,  revenue: 56700  },
        { name: 'Penfolds Grange Shiraz 2018',  qty: 9,  revenue: 288000 },
        { name: "Jacob's Creek Shiraz 2020",    qty: 15, revenue: 9000   },
      ],
      last7DaysSales: [
        { date: 'วันนี้',    amount: 48250, orders: 5 },
        { date: 'เมื่อวาน', amount: 85000, orders: 9 },
        { date: '2 วันก่อน', amount: 62000, orders: 7 },
        { date: '3 วันก่อน', amount: 94000, orders: 11 },
        { date: '4 วันก่อน', amount: 71000, orders: 8 },
        { date: '5 วันก่อน', amount: 110000, orders: 14 },
        { date: '6 วันก่อน', amount: 55000, orders: 6 },
      ],
      lowStock: [
        { name: 'Chateau Margaux 2015',   stock: 2, price: 24500 },
        { name: 'Dom Perignon Rose 2008', stock: 1, price: 18900 },
        { name: 'Penfolds Grange 2018',   stock: 4, price: 32000 },
      ],
      isLiveData: false,
    };
  }
}

/* ─── Format context as tight text for prompt ─── */
function buildContext(ctx: Awaited<ReturnType<typeof fetchAdminContext>>) {
  const thb = (n: number) => `฿${n.toLocaleString('th-TH')}`;

  const top = ctx.topProducts.map((p, i) =>
    `${i + 1}.${p.name} ขาย ${p.qty} ชิ้น รายได้ ${thb(p.revenue)}`
  ).join(' | ');

  const sales7 = ctx.last7DaysSales.map(s =>
    `${s.date}:${thb(s.amount)}(${s.orders}ออเดอร์)`
  ).join(' | ');

  const low = ctx.lowStock.length > 0
    ? ctx.lowStock.map(p => `${p.name} เหลือ ${p.stock} ชิ้น`).join(', ')
    : 'ไม่มี';

  return [
    `รายได้วันนี้: ${thb(ctx.todayRevenue)}`,
    `ออเดอร์รอดำเนินการ: ${ctx.pendingOrders}`,
    `ออเดอร์ทั้งหมด: ${ctx.allTimeOrders} รายการ | รายได้รวม: ${thb(ctx.allTimeRevenue)}`,
    `สินค้าขายดี: ${top}`,
    `ยอดขาย 7 วัน: ${sales7}`,
    `สินค้าใกล้หมด: ${low}`,
  ].join('\n');
}

/* ─── Clean Gemma verbose output ─── */
function cleanReply(raw: string): string {
  // Remove thinking/reasoning blocks that Gemma sometimes outputs
  let text = raw
    .replace(/\*\s*Input:[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\*\s*Context:[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\*\s*Goal:[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\*\s*Draft \d+[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\*\s*Self-Correction[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\*\s*Possibility [A-Z]:[\s\S]*?(?=\n[A-Z*]|\n\n|$)/g, '')
    .replace(/\(Internal Monologue\)[\s\S]*?(?=\n\n|$)/g, '')
    .replace(/\(Self-Correction.*?\).*?(?=\n|$)/gm, '')
    .replace(/The user (said|asked|is asking|wants).*?(?=\n|$)/gm, '')
    .replace(/\* Query \d+.*?(?=\n|$)/gm, '')
    .trim();

  // If after cleaning we still have quoted text at start, grab the last paragraph
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  if (lines.length === 0) return raw.trim();

  // Find first line that looks like a real Thai/clean response
  const firstGoodIdx = lines.findIndex(l =>
    /[ก-๙]/.test(l) || l.startsWith('•') || l.startsWith('-') || l.match(/^\d\./)
  );

  if (firstGoodIdx >= 0) {
    return lines.slice(firstGoodIdx).join('\n').trim();
  }
  return text;
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session?.admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!GEMINI_API_KEY) return NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 500 });

  const { messages } = await request.json() as {
    messages: { role: 'user' | 'model'; text: string }[];
  };
  if (!messages?.length) return NextResponse.json({ error: 'messages required' }, { status: 400 });

  const ctx = await fetchAdminContext();
  const ctxText = buildContext(ctx);

  /* Gemma instruction-tuned prompt pattern:
     We seed one user+model pair as the system persona,
     then append real conversation. Keep it short & imperative. */
  const SYSTEM_USER = `You are "Bottle AI" — a Thai-language business intelligence and store management assistant for the administrator/owner of The Bottle Club wine store.
You are talking to the shop OWNER/ADMINISTRATOR, not a customer. Your role is to help them analyze sales, track orders, monitor inventory, and provide business recommendations.

RULES (follow strictly):
1. ALWAYS respond in Thai language only.
2. Adopt a professional business advisor tone suitable for the store administrator/owner. Do not speak like customer support.
3. Answer DIRECTLY. Do NOT show your reasoning, thinking, drafts, or internal monologue.
4. Be concise (2–5 sentences max unless a list is needed).
5. If the user asks about store statistics, sales, orders, revenue, or inventory, use the LIVE STORE DATA below. Do not make up or hallucinate numbers.
6. If the user asks about other general topics, business-related questions, wine knowledge, marketing, or general laws (such as alcohol sales laws in Thailand), answer using your general knowledge helpfully and accurately.
7. Use emoji sparingly for clarity.

LIVE STORE DATA:
${ctxText}

Now answer admin questions using the data above or your general knowledge if the question is general.`;

  const SYSTEM_MODEL = `รับทราบครับ ผม Bottle AI ผู้ช่วยวิเคราะห์ข้อมูลและบริหารร้านค้าสำหรับผู้ดูแลระบบ ยินดีช่วยดูข้อมูลยอดขาย รายงาน และแผนธุรกิจครับ`;

  const contents = [
    { role: 'user',  parts: [{ text: SYSTEM_USER  }] },
    { role: 'model', parts: [{ text: SYSTEM_MODEL }] },
    ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
  ];

  try {
    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.4,   // lower = more focused
          topP: 0.85,
          maxOutputTokens: 2048,
          stopSequences: ['* Input:', '* Context:', '(Internal Monologue)'],
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      const msg = err?.error?.message || 'AI error';
      // Friendly Thai error
      const friendlyMsg = msg.includes('quota') || msg.includes('RESOURCE_EXHAUSTED')
        ? 'quota_exceeded'
        : msg.includes('UNAVAILABLE') ? 'unavailable' : 'api_error';
      return NextResponse.json({ error: friendlyMsg }, { status: 502 });
    }

    const data = await res.json();
    const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    const reply = cleanReply(raw) || 'ขออภัยครับ ไม่สามารถประมวลผลได้ในขณะนี้';

    return NextResponse.json({ reply, isLiveData: ctx.isLiveData, ctx });
  } catch (e: any) {
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
