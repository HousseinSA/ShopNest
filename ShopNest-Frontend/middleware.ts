import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Get the origin from the request
  const origin = req.headers.get('origin');

  // Set CORS headers to allow requests from specific URLs
  const allowedOrigins = [
    'https://shopnest-dashboard.vercel.app',
    'http://localhost:3000', // Add your localhost URL here
  ];

  // Check if the request's origin is in the allowed origins
  if (allowedOrigins.includes(origin || '')) {
    res.headers.set('Access-Control-Allow-Origin', origin!);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  return res;
}

export const config = {
  matcher: ['/api/auth/:path*'], // Apply middleware to your auth API routes only
};
