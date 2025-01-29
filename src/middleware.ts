'use server';

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySessionApiService } from './services/auth.service.server';

const protectedPath = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sessionToken');
  const pathName = request.nextUrl.pathname;
  if (!token && !protectedPath.includes(pathName)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token?.value) {
    if (protectedPath.includes(pathName))
      return NextResponse.redirect(new URL('/', request.url));

    const sessionResponse = await verifySessionApiService(token.value);

    if (sessionResponse.success) {
      const response = NextResponse.next();
      if (sessionResponse.data?.user) {
        response.cookies.set('user', JSON.stringify(sessionResponse.data.user));
      } else {
        console.error('Api user error');
      }
      response.headers.set('Authorization', `Bearer ${token.value}`);
      return response;
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
