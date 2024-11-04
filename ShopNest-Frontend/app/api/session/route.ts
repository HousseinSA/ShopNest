// app/api/auth/session/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'; // Adjust this path based on your structure

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    return new Response(JSON.stringify(session), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify({ message: "Unauthorized" }), {
    status: 401,
  });
}
