import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { connectToDatabase } from '@/lib/mongodb';

export type CustomUser = {
  name: string;
  id: string | undefined; 
  email?: string;
  image: string;
};

export const userInfo = async () => {
  // Get the session and cast it to the Session type
  const session = await getServerSession(authOptions) as Session | null;

  // @ts-expect-error i know there is id 
  const userId = session?.user?.id;

  // Connect to the database
  const db = await connectToDatabase();

  // Fetch the user data from MongoDB's 'users' collection based on the provided userId
  const user = userId ? await db.collection('users').findOne() : null;
  let customUser: CustomUser

  if (user) {
    customUser = {
      name: user.name,
      id: user.id,
      email: user.email,
      image: user.image,
    };
  }

  return { session, userId, customUser };
};