import React from 'react'

import getProducts from '@/lib/fetchData/getProducts'
import getSizes from '@/lib/fetchData/getSizes'
import getColors from '@/lib/fetchData/getColors'
import getCategory from '@/lib/fetchData/getCategory'
import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import Filter from './components/filter'
import ProductCard from '@/components/products/product/productCard'
import NoResults from './components/noResults'
import MobileFilters from './components/mobileFilters'
import Products from '@/components/products/product/RelatedProducts'


export const revalidate = 0

interface categoryProps {
  params: {
    categoryCode: string
  }
  searchParams: {
    colorCode: string
    sizeCode: string
  }
}

const CategoryPage: React.FC<categoryProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryCode: params.categoryCode,
    colorCode: searchParams.colorCode,
    sizeCode: searchParams.sizeCode,
  })
  const sizes = await getSizes()
  const colors = await getColors()
  const category = await getCategory(params.categoryCode)

  
  return (
    <div className="bg-white">
      <Container>
        <Billboard billboardData={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
            <MobileFilters colors={colors} sizes={sizes} />
            <div className="lg:block hidden">
              <Filter valueKey="sizeCode" name="Sizes" data={sizes} />
              <Filter valueKey="colorCode" name="Colors" data={colors} />
            </div>
            <div className=" mt-6 lg:mt-0 lg:col-span-4">
              {products.length === 0 && <NoResults />}
              <div className = 'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                {products.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage
