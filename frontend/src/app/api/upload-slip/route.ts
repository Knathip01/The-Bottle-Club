import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth-utils';
import { getBackendServiceToken } from '@/app/actions/auth';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yywymyxautnskmuvupwv.supabase.co';
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5d3lteXhhdXRuc2ttdXZ1cHd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDI1NjQ2MiwiZXhwIjoyMDk5ODMyNDYyfQ.Bh_ixuXnD6246abT5URUHZ_jy6BJjK29e1aFeEUKZ_Y';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

// Helper to save or update order_slips in Supabase settings table
async function saveSlipToSettings(orderId: string | number, slipData: any) {
  try {
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/settings?key=eq.order_slips&select=*`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      cache: 'no-store',
    });

    let currentSlips: Record<string, any> = {};
    let rowId: string | null = null;

    if (getRes.ok) {
      const rows = await getRes.json();
      if (Array.isArray(rows) && rows.length > 0) {
        rowId = rows[0].id;
        try {
          currentSlips = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : (rows[0].value || {});
        } catch {}
      }
    }

    currentSlips[String(orderId)] = {
      order_id: Number(orderId),
      ...slipData,
      updated_at: new Date().toISOString(),
    };

    if (rowId) {
      await fetch(`${SUPABASE_URL}/rest/v1/settings?id=eq.${rowId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          value: JSON.stringify(currentSlips),
          updated_at: new Date().toISOString(),
        }),
      });
    } else {
      await fetch(`${SUPABASE_URL}/rest/v1/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          key: 'order_slips',
          value: JSON.stringify(currentSlips),
          updated_at: new Date().toISOString(),
        }),
      });
    }
  } catch (err) {
    console.warn('[upload-slip] Failed to save slip to settings:', err);
  }
}

// GET: Retrieve slip details for a specific order or all orders
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('order_id');

  try {
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/settings?key=eq.order_slips&select=*`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
      cache: 'no-store',
    });

    if (!getRes.ok) {
      return NextResponse.json({ slips: {} });
    }

    const rows = await getRes.json();
    let currentSlips: Record<string, any> = {};
    if (Array.isArray(rows) && rows.length > 0) {
      try {
        currentSlips = typeof rows[0].value === 'string' ? JSON.parse(rows[0].value) : (rows[0].value || {});
      } catch {}
    }

    if (orderId) {
      const slip = currentSlips[String(orderId)] || null;
      return NextResponse.json({ slip });
    }

    return NextResponse.json({ slips: currentSlips });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 });
  }
}

// POST: Upload payment slip
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const token = session?.user?.access_token;
    const user = session?.user;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const orderId = formData.get('order_id') as string | null;
    const notes = (formData.get('notes') as string | null) || '';

    if (!file || !orderId) {
      return NextResponse.json({ error: 'Missing file or order_id' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Sanitize extension and filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
    const cleanExt = ['png', 'jpg', 'jpeg', 'webp', 'pdf'].includes(ext) ? ext : 'png';
    const fileName = `order_${orderId}_${Date.now()}.${cleanExt}`;
    const contentType = file.type || (cleanExt === 'pdf' ? 'application/pdf' : `image/${cleanExt}`);

    // Upload directly to Supabase Storage bucket 'slips' using native REST fetch
    const storageRes = await fetch(`${SUPABASE_URL}/storage/v1/object/slips/${fileName}`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': contentType,
        'x-upsert': 'true',
      },
      body: buffer,
    });

    if (!storageRes.ok) {
      const errText = await storageRes.text();
      console.error('[upload-slip] Supabase storage upload failed:', errText);
      return NextResponse.json({ error: 'Failed to upload slip image to storage' }, { status: 500 });
    }

    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/slips/${fileName}`;

    // Persist slip metadata into Supabase settings table 'order_slips'
    const slipRecord = {
      order_id: Number(orderId),
      slip_url: publicUrl,
      file_name: fileName,
      uploaded_at: new Date().toISOString(),
      customer_email: user?.email || '',
      customer_name: user?.name || '',
      customer_id: user?.id || null,
      notes: notes,
      status: 'pending',
    };
    await saveSlipToSettings(orderId, slipRecord);

    // Forward to FastAPI slip-verify endpoint with service token (best effort)
    try {
      const serviceToken = await getBackendServiceToken();
      const tokenToForward = serviceToken || token;
      if (tokenToForward) {
        const fwdData = new FormData();
        const blob = new Blob([buffer], { type: contentType });
        fwdData.append('file', blob, fileName);
        fwdData.append('order_id', String(orderId));

        fetch(`${API_BASE_URL}/api/v1/slip-verify/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenToForward}`,
          },
          body: fwdData,
        }).catch((e) => {
          console.warn('[upload-slip] FastAPI slip-verify upload failed (non-blocking):', e?.message || e);
        });
      }
    } catch (e) {
      console.warn('[upload-slip] FastAPI forward error (non-fatal):', e);
    }

    return NextResponse.json({
      success: true,
      slip_url: publicUrl,
      order_id: Number(orderId),
      uploaded_at: slipRecord.uploaded_at,
    });
  } catch (err: any) {
    console.error('[upload-slip] Internal error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
