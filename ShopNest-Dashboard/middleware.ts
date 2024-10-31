import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const origin = req.headers.get('origin');

  const allowedOrigins = [
    'https://shopnest-frontend.vercel.app',
    'https://shopnest-dashboard.vercel.app',
    'http://localhost:3001', // Local development URL
  ];

  if (allowedOrigins.includes(origin || '')) {
    res.headers.set('Access-Control-Allow-Origin', origin!);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Explicitly allow methods
  }

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204 });
  }

  return res;
}

export const config = {
  matcher: ['/api/auth/:path*'], // Apply to auth API routes only
};
