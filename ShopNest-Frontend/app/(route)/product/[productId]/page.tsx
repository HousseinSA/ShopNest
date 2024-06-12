import getProducts from "@/lib/fetchData/getProducts";
import getProduct from "@/lib/fetchData/getProduct";
import Container from "@/components/ui/container";
import Products from "../../../../components/products/products";
import Gallery from "@/components/products/product/gallery";


const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  const productByCategory = await getProducts({
    categoryCode: product.category.id,
  });

  return (
    <div className="bg-white">  
      <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
     {/* Gallery */}
     <Gallery images ={product.images}/>
          <div className="mt-10 sm:mt-16 px-4 sm:px-0 lg:mt-0">info</div>
        </div>
      </div>
      </Container>
      <hr className="py-10" />
      <Products title="Related products " products={productByCategory}/>
    </div>
  );
};

export default ProductPage;
