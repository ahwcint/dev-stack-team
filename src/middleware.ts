import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  const response = NextResponse.next();
  response.headers.set('Authorization', `Bearer ${token}`);

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|register|login).*)',
  ],
};
