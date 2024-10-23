import Container from '@/components/ui/container';
import Billboard from '@/components/globals/billboard';
import getBillboard from '@/lib/fetchData/getBillboard';
import getProducts from '@/lib/fetchData/getProducts';
import Products from '@/components/products/product/RelatedProducts';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from "next-auth/next";
import LoginWrapper from '@/app/api/auth/signin/loginWrap';
import { Billboard as BillboardType } from '@/lib/StoreTypes';

export const revalidate = 0;

const HomePage = async () => {
  const session = await getServerSession(authOptions);
  
  const products = await getProducts({ isFeatured: true });
  const billboard: BillboardType[] = await getBillboard(); // Ensure this is typed as an array
  const firstBillboard: BillboardType = billboard[0]; // Now this works

  return (
    <Container>
      <div className="space-y-4 pb-10 relative">
        {!session?.user && <LoginWrapper session={session} />}
        {firstBillboard && <Billboard billboardData={firstBillboard} />} {/* Pass the billboard object directly */}
        <div className="flex flex-col gap-y-8 px-4 sm:px-0 pb-20 lg:pb-0">
          <Products title="Featured Products" products={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;