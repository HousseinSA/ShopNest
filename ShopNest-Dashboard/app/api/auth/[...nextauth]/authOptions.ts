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
    strategy: "jwt", // Use JWT session strategy
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    
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
        // Define user ID on session
        session.user = session.user || {}; // Ensure session.user exists
        // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        session.user.id = token.id;
                // @ts-expect-error: Assigning user ID to session.user since TypeScript does not recognize session.user as a complete type.
        console.log('session user id' , session.user.id)
        console.log('google login code',process.env.GOOGLE_SECRET)
        console.log('user secret testing if it showing',process.env.NEXTAUTH_SECRET)
      }
      return session;
    },
  },
};
