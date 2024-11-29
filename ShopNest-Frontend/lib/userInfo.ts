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

  // @ts-expect-error there will be id
  const userId = session?.user?.id; // Get userId from session

  // Connect to the database
  const db = await connectToDatabase();

  // Initialize customUser as null
  let customUser: CustomUser | null = null;

  // If userId exists, fetch user data
  if (userId) {
    const user = await db.collection('users').findOne({ id: userId });

    if (user) {
      customUser = {
        name: user.name, 
        id: user.id,
        email: user.email,
        image: user.image,
      };
    }
  }

  // Fetch current store based on userId, or set a default store ID
  const currentStore = await db.collection('currentStore').findOne({ userId });
  
  // Default store ID if no current store is found
  const defaultStoreId = '67168ed76339cddccbeb4ae4';
  const storeId = currentStore?.storeId || defaultStoreId;

  return { session, userId, customUser, storeId }; 
};