'use server'

import { login as setAuthSession, logout as clearAuthSession, getSession } from '@/lib/auth-utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://possimon.onrender.com';

export async function syncSession() {
  const session = await getSession();
  if (!session || !session.user || !session.user.access_token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${session.user.access_token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      const updatedUser = {
        ...session.user,
        ...userData,
      };
      return updatedUser;
    }
  } catch (error) {
    console.error('Error syncing session:', error);
  }
  return session.user;
}

export async function logout() {
  await clearAuthSession();
  revalidatePath('/');
  redirect('/login');
}

type LoginFormData = {
  email?: string;
  password?: string;
};

type RegisterFormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
};

type AuthPayload = Record<string, unknown>;

function isRecord(value: unknown): value is AuthPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function firstString(...values: unknown[]) {
  return values.find((value): value is string => typeof value === 'string' && value.length > 0);
}

function getAuthToken(payload: AuthPayload) {
  const nestedData = isRecord(payload.data) ? payload.data : {};
  return firstString(
    payload.access_token,
    payload.accessToken,
    payload.token,
    payload.jwt,
    nestedData.access_token,
    nestedData.accessToken,
    nestedData.token,
    nestedData.jwt
  );
}

function getApiMessage(payload: AuthPayload, fallback: string) {
  return firstString(payload.detail, payload.message) || fallback;
}

function isRedirectError(error: unknown) {
  return isRecord(error) && typeof error.digest === 'string' && error.digest.startsWith('NEXT_REDIRECT');
}

function normalizeAuthSession(payload: AuthPayload, email: string) {
  const nestedData = isRecord(payload.data) ? payload.data : {};
  const user = isRecord(payload.user)
    ? payload.user
    : isRecord(nestedData.user)
      ? nestedData.user
      : {};
  const token = getAuthToken(payload);

  return {
    ...payload,
    ...nestedData,
    ...user,
    email: firstString(user.email, nestedData.email, payload.email, email) || email,
    ...(token ? { access_token: token } : {}),
  };
}

export async function register(formData: RegisterFormData) {
  const { firstName, lastName, email, phone, username, password } = formData;

  const effectiveUsername = username || email;

  if (!email || !password) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone || '',
        username: effectiveUsername,
        password: password
      }),
    });

    let data: AuthPayload;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const parsed = await response.json();
      data = isRecord(parsed) ? parsed : {};
    } else {
      const text = await response.text();
      console.error('Register API Non-JSON Response:', text);
      return { error: 'Registration failed: invalid server response.' };
    }

    if (!response.ok) {
      if (response.status === 409) {
        return { error: 'This email or username is already in use.' };
      }
      return { error: getApiMessage(data, 'Registration failed. Please try again.') };
    }

    // After successful registration, login the user
    await setAuthSession(data);
    revalidatePath('/');
  } catch (error: unknown) {
    console.error('Registration error:', error);
    return { error: 'Could not contact the server. Please try again.' };
  }

  redirect('/account');
}

export async function login(formData: LoginFormData) {
  const { email, password } = formData;

  if (!email || !password) {
    return { error: 'Please enter your email and password.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password
      }),
    });

    let data: AuthPayload;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const parsed = await response.json();
      data = isRecord(parsed) ? parsed : {};
    } else {
      const text = await response.text();
      console.error('Login API Non-JSON Response:', text);
      return { error: 'Login failed: invalid server response.' };
    }

    if (!response.ok) {
      return { error: getApiMessage(data, 'Invalid email or password.') };
    }

    const sessionUser = normalizeAuthSession(data, email);
    await setAuthSession(sessionUser);
    revalidatePath('/');
    return { success: true, token: getAuthToken(data) };
  } catch (error: unknown) {
    if (isRedirectError(error)) throw error;
    console.error('Login error:', error);
    return { error: 'Could not contact the server. Please try again.' };
  }

}

export async function setSessionFromToken(token: string, userData?: any) {
  try {
    // 1. Decode the token payload (it's a base64 encoded JSON)
    const parts = token.split('.');
    if (parts.length < 2) return { error: 'Invalid token format' };
    
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(Buffer.from(base64, 'base64').toString());
    
    // 2. Extract user info from payload and optional userData (handling nested objects)
    const u = userData?.user || userData?.data?.user || userData?.data || userData;
    
    // Adjust based on typical JWT structures (id/sub, username/name, email)
    const user = {
      id: u?.id || payload.id || payload.sub || 0,
      username: u?.username || payload.username || payload.name || payload.email?.split('@')[0] || 'User',
      email: u?.email || payload.email || '',
      first_name: u?.first_name || u?.firstName || payload.first_name || payload.name?.split(' ')[0] || '',
      last_name: u?.last_name || u?.lastName || payload.last_name || payload.name?.split(' ')[1] || '',
      avatar: u?.avatar || u?.picture || u?.pictureUrl || u?.avatarUrl || u?.avatar_url || u?.image || u?.imageUrl || u?.profileImage || u?.profileImageUrl || u?.profile_image_url || u?.photo || u?.photoUrl || payload.avatar || payload.picture || payload.pictureUrl || payload.avatarUrl || null,
      provider: u?.provider || u?.provider_name || u?.type || u?.source || payload.provider || (payload.iss?.includes('google') ? 'google' : payload.iss?.includes('line') ? 'line' : null) || null,
      access_token: token // Keep the token for future API calls
    };

    // 3. Create our own session cookie for Next.js
    await setAuthSession(user);
    
    return { success: true, user };
  } catch (error) {
    console.error('Error in setSessionFromToken:', error);
    return { error: 'Failed to process token' };
  }
}
