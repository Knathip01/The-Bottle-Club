'use client';

/**
 * Client-side authentication utilities
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.wayneven.uk';

/**
 * Redirects the user to OAuth login providers (Google / LINE)
 * Passes redirect_uri so the backend knows where to return the user after login
 */
export const loginWithProvider = (provider: 'google' | 'line') => {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
  const redirectTarget = `${origin}/auth/success`;

  if (provider === 'google') {
    window.location.href = `${API_BASE_URL}/api/v1/auth/google?redirect_uri=${encodeURIComponent(redirectTarget)}&source=bottleclub`;
  } else if (provider === 'line') {
    window.location.href = `${API_BASE_URL}/api/v1/auth/line?redirect_uri=${encodeURIComponent(redirectTarget)}&source=bottleclub`;
  }
};
