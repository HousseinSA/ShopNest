
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

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
  console.log('userid in userinfo function', userId)
  return {userId, session}
}
