'use server';

import { NextResponse, NextRequest } from 'next/server';
import { verifySessionClient } from './lib/verifySessionClient';

const publicPaths = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('dev-stack.session-token')?.value;
  const pathName = request.nextUrl.pathname;

  if (!token && !publicPaths.includes(pathName)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token && publicPaths.includes(pathName)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    const sessionResponse = await verifySessionClient(token);
    if (!sessionResponse.success) {
      const response = NextResponse.redirect(new URL('/sign-in', request.url));
      response.cookies.set('dev-stack.session-token', '', {
        expires: new Date(0),
      });
      response.headers.set('Authorization', '');
      return response;
    }

    const response = NextResponse.next();
    response.headers.set('Authorization', `Bearer ${token}`);
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
