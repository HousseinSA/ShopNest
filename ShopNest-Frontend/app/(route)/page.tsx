import Container from '@/components/ui/container';
import Billboard from '@/components/globals/billboard';
import getBillboard from '@/lib/fetchData/getBillboard';
import getProducts from '@/lib/fetchData/getProducts';
import Products from '@/components/products/product/RelatedProducts';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth/next';
import LoginWrapper from '@/app/api/auth/signin/loginWrap';
import { Billboard as BillboardType } from '@/lib/StoreTypes';
import { Session } from 'next-auth'; // Import the Session type

export const revalidate = 0;

const HomePage = async () => {
  const session: Session | null = await getServerSession(authOptions); // Specify the type for session
  const products = await getProducts({ isFeatured: true });
  const billboard: BillboardType[] = await getBillboard();
  const firstBillboard: BillboardType = billboard[0]; // Now this works

 


  return (
    <Container>
      <div className="space-y-4 pb-10 relative">
        {!session?.user && <LoginWrapper session={session} />}
        {firstBillboard && <Billboard billboardData={firstBillboard} />}
        <div className="flex flex-col gap-y-8 px-4 sm:px-0 pb-20 lg:pb-0">
          <Products title="Featured Products" products={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
