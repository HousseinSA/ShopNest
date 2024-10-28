import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getDomainWithoutSubdomain } from "@/lib/getDomainWithoutSubdomain";


// Utility function to get the root domain from environment variable NEXTAUTH_URL

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Placeholder",
      credentials: {},
      authorize: async () => null, // No actual authorization logic needed here
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!, // Use the same secret as in the main app
  },
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        path: "/",
        domain: getDomainWithoutSubdomain(process.env.NEXTAUTH_URL!),
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
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
