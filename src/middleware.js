import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Check if the route is an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value;

    // Very simple authentication check for single-admin
    if (!token || token !== process.env.JWT_SECRET) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Protect API routes that modify data
  if (
    request.nextUrl.pathname.startsWith('/api/photos') &&
    ['POST', 'DELETE', 'PUT'].includes(request.method)
  ) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token || token !== process.env.JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*', '/api/photos/:path*'],
};
