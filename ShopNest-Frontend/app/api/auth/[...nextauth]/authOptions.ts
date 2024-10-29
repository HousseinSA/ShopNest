<<<<<<< HEAD
=======
// lib/authOptions.ts
>>>>>>> 9c5b42b2d2cee955141eab3cdd611fada8dbd2b3
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
<<<<<<< HEAD
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
=======
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
>>>>>>> 9c5b42b2d2cee955141eab3cdd611fada8dbd2b3
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        console.log("JWT callback:", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
<<<<<<< HEAD
        if (!session.user) {
          session.user = {};
        }

       // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        session.user.id = token.id;
        console.log("Session callback:", session);
=======
        session.user = session.user || {};
        // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        session.user.id = token.id;
>>>>>>> 9c5b42b2d2cee955141eab3cdd611fada8dbd2b3
      }
      return session;
    },
  },
};