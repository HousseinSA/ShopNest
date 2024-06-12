import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/lib/fetchData/getBillboard";
import getProducts from "@/lib/fetchData/getProducts";
import Products from "@/components/products/products";

export const revalidate = 0;
const HomePage = async () => {
  const billboard = await getBillboard("665f21dbe93867b368fb6b6f");
  const products = await getProducts({ isFeatured: true });
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard billboardData={billboard} />
      <div className="flex flex-col gap-y-8 sm:px-6 lg:px-8">
        <Products title="Featured Products" products={products} />
      </div>
      </div>
    </Container>
  );
};

export default HomePage;
