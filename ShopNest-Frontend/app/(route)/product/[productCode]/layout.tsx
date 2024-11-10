import { userInfo } from '@/lib/userInfo'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Session } from 'next-auth' // Import the Session type
import LoginWrapper from '@/app/api/auth/signin/loginWrap'
import LoginPage from '@/app/api/auth/signin/page'

interface categoryProps {
  children: React.ReactNode
}

const CategoryLayout: React.FC<categoryProps> = async ({ children }) => {
  const { customUser } = await userInfo()
  const session: Session | null = await getServerSession(authOptions)
  return (
    <>
      {customUser && !session?.user && <LoginWrapper session={session}>
        <LoginPage/>
        </LoginWrapper>}
      {children}
    </>
  )
}

export default CategoryLayout
