// app/api/auth/session/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; // Adjust this path based on your structure

export async function GET(req: Request) {
  // Set CORS headers
  const headers = new Headers();
  headers.set("Access-Control-Allow-Origin", "https://shopnest-dashboard.vercel.app");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const session = await getServerSession(authOptions);

  if (session) {
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Unauthorized" }), {
    status: 401,
    headers,
  });
}
