

// import { connectToDatabase } from '@/lib/mongodb'

// type UserInfo = {
//   name: string
//   id: string
//   email?: string
//   image?: string
// }

// export const userInfo = async () => {
//   try {
//     // Connect to the database
//     const db = await connectToDatabase()

//     // Fetch the user data from MongoDB's 'users' collection based on the provided userId
//     const user = await db.collection('users').findOne()

//     // If user not found, throw an error
//     if (!user) {
//       throw new Error('User not found in the database')
//     }
//     let customUser: UserInfo
//     if (user) {
//       customUser = {
//         name: user.name,
//         id: user.id,
//         email: user.email,
//         image: user.image
//       }
//     }
//     console.log(user, 'right way to get user ')
//     // Return the fetched user
//     return customUser
//   } catch (error) {
//     console.error('Error fetching user info:', error)
//     return { user: null }
//   }
// }



import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

type userinfo = {
  user: { name: string; id: string; email: string; image: string }
}

export const userInfo = async (storeCode ) => {
  const session: userinfo = await getServerSession(authOptions)
  let userId = session?.user?.id 
  // if(userId !== 'guest' && storeCode === '67168ed76339cddccbeb4ae4'){
  //   userId = 'guest'
  // }else {
  //   userId = userId
  // }
  console.log(userId)

  return {userId, session}
}
