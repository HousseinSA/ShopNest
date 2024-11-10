import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import getBillboard from '@/lib/fetchData/getBillboard'
import getProducts from '@/lib/fetchData/getProducts'
import Products from '@/components/products/product/RelatedProducts'
import { Billboard as BillboardType } from '@/lib/StoreTypes'
import { userInfo } from '@/lib/userInfo'
import LoginWrapper from '@/lib/auth/signin/loginWrap'
import LoginPage from '@/lib/auth/signin/page'


export const revalidate = 0

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true })
  const billboard: BillboardType[] = await getBillboard()
  const firstBillboard: BillboardType = billboard[0]  // Now this 
  const { customUser , userId, session} = await userInfo()


  return (  
    <Container>
      <div className="space-y-4 pb-10 relative">
        {  (!customUser && !userId) && (
          <LoginWrapper session={session}>
            <LoginPage />
          </LoginWrapper>
        )}
        {firstBillboard && <Billboard billboardData={firstBillboard} />}
        <div className="flex flex-col gap-y-8 sm:px-0 pb-20 lg:pb-0">
          <Products title="Featured Products" products={products} />
        </div>
      </div>
    </Container>
  )
}

export default HomePage
