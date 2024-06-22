import React from 'react'

import getProducts from "@/lib/fetchData/getProducts";
import getProduct from "@/lib/fetchData/getProduct";
import Container from "@/components/ui/container";
import Products from "@/components/products/products";
import Gallery from "@/components/products/product/galleryComponent/gallery";
import Info from "@/components/products/product/info";

interface ProductProps {
  params:{
    productCode:string
  }
}

export const revalidate = 0;
const ProductPage: React.FC<ProductProps> = async ({ params }) => {
  const product = await getProduct(params.productCode);
  const productByCategory = await getProducts({
    categoryCode: product.category.id,
  });
  return (
    <Container>
      <div className="grid grid-cols-1 w-full  lg:grid-cols-2 lg:gap-8">
        <Gallery  images={product.images} />
        <div className="mt-10 px-4 md:mt-16 lg:mt-0">
          <Info product={product}/>
        </div>
      </div>
      <hr className="my-10" />
      <Products title="Related products" products={productByCategory} />
    </Container>
  );
};

export default ProductPage;
