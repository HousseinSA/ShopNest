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
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // Ensure this secret is the same in both projects
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none", // Allow cross-origin
        secure: true, // Ensure this is true in production
        path: '/',
        domain: ".vercel.app", // Allow access across subdomains
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
        if (!session.user) {
          session.user = {}; // Ensure session.user is defined
        }
     // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        session.user.id = token.id;    
      }
      return session;
    },
  },
};