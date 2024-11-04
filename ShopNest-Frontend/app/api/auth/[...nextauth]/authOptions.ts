import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

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
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
        domain: '.vercel.app' 
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID in the token
        token.email = user.email; // Store email if needed
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
                // @ts-expect-error: Assigning user ID to session.user
        session.user.id = token.id; // Attach user ID to session
                // @ts-expect-error: Assigning user email to session.email
        session.user.email = token.email; // Attach email if needed
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};