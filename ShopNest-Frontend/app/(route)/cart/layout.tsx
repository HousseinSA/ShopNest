  import { Session } from 'next-auth'
  import { getServerSession } from 'next-auth/next'

  import { userInfo } from '@/lib/userInfo'
  import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
  import LoginWrapper from '@/app/api/auth/signin/loginWrap'
  import LoginPage from '@/app/api/auth/signin/page'

  interface CartLayoutProps {
    children: React.ReactNode
  }

  const CartLayout: React.FC<CartLayoutProps> = async ({ children }) => {
    const { customUser } = await userInfo()
    const session: Session | null = await getServerSession(authOptions)
    return (
      <LoginWrapper session={session}>
        {customUser && !session?.user && (
            <LoginPage />
        )}
        {children}
        </LoginWrapper>
    )
  }

  export default CartLayout
