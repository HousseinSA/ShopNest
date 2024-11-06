import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { connectToDatabase } from '@/lib/mongodb'; // Adjust this import according to your project structure

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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Attach user properties to the token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;

        // Store user data in MongoDB when they log in
        if (user.email) {
          const db = await connectToDatabase();
          const usersCollection = db.collection('users');

          // Check if user already exists in the database
          const existingUser = await usersCollection.findOne({ email: user.email });

          // If the user does not exist, insert the new user's information
          if (!existingUser) {
            await usersCollection.insertOne({
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              createdAt: new Date(),
            });
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the full user data to the session object
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
            // @ts-expect-error: Assigning user ID to session.user
          image: token.image,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
