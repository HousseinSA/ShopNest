// middleware.ts
import { NextResponse } from 'next/server';

export function middleware() {
  const response = NextResponse.next();

  // Allow requests from your dashboard's origin
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001'); // Change this to your dashboard URL
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
}

export const config = {
  matcher: ['/api/auth/:path*'], // Apply this middleware to auth API routes
};