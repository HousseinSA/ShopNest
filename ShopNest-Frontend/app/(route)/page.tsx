import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import getBillboard from '@/lib/fetchData/getBillboard'
import getProducts from '@/lib/fetchData/getProducts'
import Products from '@/components/products/product/RelatedProducts'
import { Billboard as BillboardType } from '@/lib/StoreTypes'
import NoStoreProducts from './components/NoStoreProducts'
import { userInfo } from '@/lib/userInfo'
import LoginWrapper from '@/app/(route)/auth/signin/loginWrap'
import LoginPage from '@/app/(route)/auth/signin/page'

export const revalidate = 0

const HomePage = async () => {
  const { storeId, customUser, session } = await userInfo()
  const products = storeId && (await getProducts({ isFeatured: true }))
  const billboard: BillboardType[] = storeId && (await getBillboard())
  const firstBillboard: BillboardType = storeId && billboard[0]
  return (
    <Container>
      {!customUser && (
        <LoginWrapper session={session}>
          <LoginPage />
        </LoginWrapper>
      )}
      {products?.length === 0 && billboard?.length === 0 && !firstBillboard ? (
        <NoStoreProducts />
      ) : (
        <div className="space-y-4 pb-10 relative">
          {firstBillboard && <Billboard billboardData={firstBillboard} />}
          <div className="flex flex-col gap-y-8 sm:px-0 pb-20 lg:pb-0">
            <Products title="Featured Products" products={products} />
          </div>
        </div>
      )}
    </Container>
  )
}

export default HomePage
