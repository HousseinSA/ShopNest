import React from 'react'

import getProducts from "@/lib/fetchData/getProducts";
import getProduct from "@/lib/fetchData/getProduct";
import Container from "@/components/ui/container";
import Products from "@/components/products/products";
import ProductMain from './components/productMain';


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
  // const imgRef = useRef<HTMLImageElement>(null)
  return (
    <Container>
      <ProductMain product={product}/>
      <hr className="my-10" />
      <Products title="Related products" products={productByCategory} />
    </Container>
  );
};

export default ProductPage;
