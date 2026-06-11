import 'server-only';

import type { JWTPayload } from 'jose';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const ADMIN_SESSION_COOKIE = 'admin_session';
const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const secretKey = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || 'secret';
const key = new TextEncoder().encode(secretKey);

export type AdminSessionUser = {
  id: number;
  email: string;
  name: string | null;
  role: 'superadmin' | 'staff' | string;
};

export type AdminSessionPayload = JWTPayload & {
  admin: AdminSessionUser;
  expires: string;
};

export async function encryptAdmin(payload: AdminSessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(key);
}

export async function decryptAdmin(input: string): Promise<AdminSessionPayload> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });
  return payload as AdminSessionPayload;
}

export async function adminLogin(admin: AdminSessionUser) {
  const expires = new Date(Date.now() + ADMIN_SESSION_DURATION_MS);
  const session = await encryptAdmin({ admin, expires: expires.toISOString() });

  (await cookies()).set(ADMIN_SESSION_COOKIE, session, {
    expires,
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
}

export async function adminLogout() {
  (await cookies()).set(ADMIN_SESSION_COOKIE, '', { expires: new Date(0), path: '/' });
}

export async function getAdminSession() {
  const session = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return null;
  try {
    return await decryptAdmin(session);
  } catch (error) {
    console.error('Admin Session decryption error:', error);
    return null;
  }
}

export async function updateAdminSession(request: NextRequest) {
  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!session) return;

  try {
    const parsed = await decryptAdmin(session);
    const expires = new Date(Date.now() + ADMIN_SESSION_DURATION_MS);
    parsed.expires = expires.toISOString();
    const res = NextResponse.next();
    res.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: await encryptAdmin(parsed),
      httpOnly: true,
      expires,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return res;
  } catch (error) {
    return;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session || !session.admin) {
    redirect('/admin/login');
  }
  return session.admin;
}
