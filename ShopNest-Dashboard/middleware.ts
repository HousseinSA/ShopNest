import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Define allowed origins
  const allowedOrigins = [
    'https://shopnest-frontend.vercel.app',
    'https://shopnest-dashboard.vercel.app',
    'http://localhost:3001', // Local development URL
  ];

  // Check the origin of the request
  const origin = req.headers.get('origin');
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

// Apply middleware to relevant routes
export const config = {
  matcher: ['/api/auth/:path*'], // Ensure middleware covers auth routes in both apps
};
