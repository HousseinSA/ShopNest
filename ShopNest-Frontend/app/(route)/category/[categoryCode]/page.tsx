import React from 'react'
import getProducts from '@/lib/fetchData/getProducts'
import getSizes from '@/lib/fetchData/getSizes'
import getColors from '@/lib/fetchData/getColors'
import getCategory from '@/lib/fetchData/getCategory'
import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import Filter from './components/filter'
import ProductCard from '@/components/products/product/productCard'
import MobileFilters from './components/mobileFilters'

export const revalidate = 0

interface categoryProps {
  params: {
    categoryCode: string
  }
  searchParams: {
    colorCode?: string
    sizeCode?: string
    brand?: string
    price?: 'high-to-low' | 'low-to-high' // New price sorting param
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

 // Assuming products is an array of product objects
const brands = Array.from(
  new Set(products.map((product) => product.brand.toLowerCase())) // Normalize to lowercase
);

// To get the original brand names (maintaining the first occurrence's case)
const uniqueBrands = brands.map((brand) => {
  const foundProduct = products.find((product) => product.brand.toLowerCase() === brand);
  return foundProduct ? foundProduct.brand : brand; // Fallback to lowercase brand if not found
});


  // Filter by brand if selected  
  let filteredProducts = searchParams.brand
    ? products.filter((product) => product.brand === searchParams.brand)
    : products

  // Sort by price based on searchParams
  if (searchParams.price === 'high-to-low') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
  } else if (searchParams.price === 'low-to-high') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
  }

  return (
    <div className="bg-white">
      <Container>
        <Billboard billboardData={category.billboard} />
        <div className=" sm:px-6 pb-6 lg:px-8 pb-20">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-6">
            <MobileFilters colors={colors} sizes={sizes} brands={brands} products={products} />
            <div className="lg:block hidden">
              <Filter valueKey="sizeCode" name="Sizes" data={sizes} />
              <Filter valueKey="colorCode" name="Colors" data={colors} />
              <Filter valueKey="brand" name="Brands" data={uniqueBrands.map((brand) => ({ id: brand, name: brand }))} />
              <Filter valueKey="price" name="Prices" data={[
                { id: 'low-to-high', name: 'Low to High' },
                { id: 'high-to-low', name: 'High to Low' },
              ]} />
            </div>
            <div className="mt-6 lg:mt-0 lg:col-span-4">
              {filteredProducts.length === 0 && 
               <div className="w-full font-semibold text-medium text-primary flex items-center justify-center h-full">No products found.</div>
              }
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((item) => (
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
