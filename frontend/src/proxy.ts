import { type NextRequest, NextResponse } from 'next/server'
import { updateSession as updateCustomSession } from '@/lib/auth-utils'
import { updateAdminSession } from '@/lib/admin-auth'

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 1. Update Admin JWT Session for Admin pages and API routes.
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const adminResponse = await updateAdminSession(request)
    if (adminResponse) {
      return adminResponse
    }
  }

  // 2. Update Custom JWT Session
  const customResponse = await updateCustomSession(request)
  
  if (customResponse) {
    return customResponse
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
