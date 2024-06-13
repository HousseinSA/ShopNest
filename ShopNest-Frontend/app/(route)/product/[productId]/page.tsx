import getProducts from "@/lib/fetchData/getProducts";
import getProduct from "@/lib/fetchData/getProduct";
import Container from "@/components/ui/container";
import Products from "../../../../components/products/products";
import Gallery from "@/components/products/product/galleryComponent/gallery";
import Info from "@/components/products/product/info";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  const productByCategory = await getProducts({
    categoryCode: product.category.id,
  });
  return (
    <Container>
      <div className="grid grid-cols-1  lg:grid-cols-2 lg:gap-8">
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
