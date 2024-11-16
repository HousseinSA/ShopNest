  import { userInfo } from '@/lib/userInfo'
  import LoginWrapper from '@/app/(route)/auth/signin/loginWrap'
  import LoginPage from '@/app/(route)/auth/signin/page'

  interface CartLayoutProps {
    children: React.ReactNode
  }

  const CartLayout: React.FC<CartLayoutProps> = async ({ children }) => {
    const { customUser , session, } = await userInfo()
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
