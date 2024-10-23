import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

type UserInfo = {
  user: { name: string; id: string; email: string; image: string }
}

export const userInfo = async (): Promise<string | undefined> => {
  const session = (await getServerSession(authOptions)) as UserInfo | null
  return session?.user?.id
}
