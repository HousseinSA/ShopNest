// lib/authOptions.ts
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { getDomainWithoutSubdomain } from "@/lib/getDomainWithoutSubdomain";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    {
      id: "guest",
      name: "Guest",
      type: "credentials",
      credentials: {},
      authorize: async () => {
        return { id: "guest", name: "Guest User", email: null };
      },
    },
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        path: '/',
        domain: getDomainWithoutSubdomain(process.env.NEXTAUTH_URL!), // Set to base domain (e.g., .shopnest.com)
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        session.user.id = token.id;
      }
      return session;
    },
  },
};
