// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Set CORS headers
  res.headers.set('Access-Control-Allow-Origin', 'https://shopnest-frontend.vercel.app, https://shopnest-dashboard.vercel.app');
  res.headers.set('Access-Control-Allow-Credentials', 'true');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  return res;
}

export const config = {
  matcher: ['/api/auth/:path*'], // Apply middleware to your auth API routes
};
