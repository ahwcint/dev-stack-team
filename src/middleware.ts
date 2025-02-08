'use server';

import { NextResponse, NextRequest } from 'next/server';
import { verifySessionClient } from './lib/verifySessionClient';

const protectedPath = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('dev-stack.session-token');
  const pathName = request.nextUrl.pathname;

  if (!token?.value && !protectedPath.includes(pathName)) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (token?.value) {
    if (protectedPath.includes(pathName))
      return NextResponse.redirect(new URL('/', request.url));

    const sessionResponse = await verifySessionClient(token.value);

    if (sessionResponse.success) {
      const response = NextResponse.next();
      response.headers.set('Authorization', `Bearer ${token.value}`);
      return response;
    }

    const response = NextResponse.redirect(new URL('/sign-in', request.url));
    response.cookies.set('dev-stack.session-token', '', {
      expires: new Date(0),
    });
    response.headers.set('Authorization', '');
    return response;
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
