import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import getBillboard from '@/lib/fetchData/getBillboard'
import getProducts from '@/lib/fetchData/getProducts'
import Products from '@/components/products/products'
import Tailwind from './tailwind/tailwind'
import ProductCard from '../../components/products/productCard'

export const revalidate = 0
const HomePage = async () => {
  const billboard = await getBillboard('665f21dbe93867b368fb6b6f')
  const products = await getProducts({ isFeatured: true })

  return (
    <Container>
      <div className="space-y-4 pb-10">
        <Billboard billboardData={billboard} />
      <div className="flex flex-col gap-y-8 px-4 sm:px-0 ">
        <Products title="Featured Products" products={products} />
      </div>
      </div>
    </Container>
    // // <Tailwind />

    //   <div className="max-w-xl grid grid-cols-4 gap-4 mx-auto mt-10">
    //     {products.map((product) => (
    //       <ProductCard key={product.id} product={product} />
    //     ))}
    //   </div>
  )
}

export default HomePage
