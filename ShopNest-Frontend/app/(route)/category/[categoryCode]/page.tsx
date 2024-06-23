import React from 'react';

import getProducts from '@/lib/fetchData/getProducts';
import getSizesData from '@/lib/fetchData/getSize';
import getColorsData from '@/lib/fetchData/getColor';
import getCategory from '@/lib/fetchData/getCategory';
import Container from '@/components/ui/container';
import Billboard from '@/components/billboard';
import Filter from './components/filter';
import ProductCard from '@/components/products/productCard';
import NoResults from'./components/noResults'
import MobileFilters from './components/mobileFilters';

export const revalidate = 0;

interface categoryProps {
  params: {
    categoryCode: string;
  };
  searchParams: {
    colorCode: string;
    sizeCode: string;
  };
}

const CategoryPage: React.FC<categoryProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryCode: params.categoryCode,
    colorCode: searchParams.colorCode,
    sizeCode: searchParams.sizeCode,
  });
console.log(products)
  const sizes = await getSizesData();
  const colors = await getColorsData();
  const category = await getCategory(params.categoryCode);
  console.log('products', products);
  return (
    <div className="bg-white">
      <Container>
        <Billboard billboardData={category.billboard} />
        <MobileFilters colors={colors} sizes={sizes}/>
        <div className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="lg:grid  lg:grid-cols-5 lg:gap-x-6">
            <div className="lg:block hidden">
              <Filter valueKey="sizeCode" name="sizes" data={sizes} />
              <Filter valueKey="colorCode" name="Colors" data={colors} />
            </div>
            <div className=" mt-6 lg:mt-0 lg:col-span-4">
              {products.length === 0 && <NoResults/>}
              <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4'>
                {products.map(item=>(
                  <ProductCard key={item.id} product={item}/>
                ))}
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
