import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

export async function GET() {
  const session = await getAdminSession();
  if (!session || !session.admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await query(`
      SELECT u.id, u.first_name, u.last_name, u.email, u.points, u.is_active, u.created_at,
             COALESCE(COUNT(o.id), 0) as order_count
      FROM users u
      LEFT JOIN orders o ON u.email = o.user_id
      GROUP BY u.id, u.first_name, u.last_name, u.email, u.points, u.is_active, u.created_at
      ORDER BY u.created_at DESC
    `);

    return NextResponse.json({
      members: res.rows.map(r => ({
        id: r.id,
        name: r.first_name ? `${r.first_name} ${r.last_name}` : 'No Name',
        email: r.email,
        points: parseInt(r.points || 0),
        orderCount: parseInt(r.order_count || 0),
        isActive: r.is_active !== false,
        createdAt: new Date(r.created_at).toLocaleDateString('th-TH')
      }))
    });
  } catch (err: any) {
    console.warn('Members GET DB query failed. Serving mock data.', err.message);
    return NextResponse.json({
      members: [
        { id: 1, name: 'Somchai Jaidee', email: 'somchai@gmail.com', points: 450, orderCount: 8, isActive: true, createdAt: '01/05/2569' },
        { id: 2, name: 'Nattaporn Srisai', email: 'nattaporn@hotmail.com', points: 1200, orderCount: 12, isActive: true, createdAt: '02/05/2569' },
        { id: 3, name: 'Krisada Wong', email: 'krisada@yahoo.com', points: 300, orderCount: 4, isActive: true, createdAt: '04/05/2569' },
        { id: 4, name: 'Patty Sawasdee', email: 'patty.s@gmail.com', points: 2500, orderCount: 22, isActive: true, createdAt: '05/05/2569' },
        { id: 5, name: 'Chayanon Boon', email: 'chayanon.b@outlook.com', points: 0, orderCount: 1, isActive: false, createdAt: '10/05/2569' },
        { id: 6, name: 'Sarah Wilson', email: 'sarah.w@gmail.com', points: 850, orderCount: 6, isActive: true, createdAt: '12/05/2569' },
        { id: 7, name: 'Teerapat Pany', email: 'teerapat_p@gmail.com', points: 620, orderCount: 3, isActive: true, createdAt: '15/05/2569' }
      ]
    });
  }
}
