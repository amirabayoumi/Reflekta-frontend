import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDashboardRoute = pathname === '/dashboard' || pathname.startsWith('/dashboard/');

  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/community-hub', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
};

