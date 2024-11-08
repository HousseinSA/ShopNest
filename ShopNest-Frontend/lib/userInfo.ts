import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { connectToDatabase } from '@/lib/mongodb'

type UserInfo = {
  user: { name: string; id: string; email?: string; image: string }
}
export type CustomUser = {
  name: string
  id: string | undefined 
  email?: string
  image: string
}

export const userInfo = async () => {
  const session = (await getServerSession(authOptions)) as UserInfo | null
  const userId = session?.user?.id
  // Connect to the database
  const db = await connectToDatabase()

  // Fetch the user data from MongoDB's 'users' collection based on the provided userId
  const user = await db.collection('users').findOne()

  // If user not found, throw an error

  let customUser: CustomUser = {
    name: 'test',
    id: undefined ,
    email: 'test',
    image: 'test',
  }
  if (user) {
    customUser = {
      name: user.name,
      id: user.id,
      email: user.email,
      image: user.image,
    }
  }

  return { session, userId, customUser }
}
