<<<<<<< HEAD
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
=======
import Container from '@/components/ui/container'
import Billboard from '@/components/globals/billboard'
import getBillboard from '@/lib/fetchData/getBillboard'
import getProducts from '@/lib/fetchData/getProducts'
import Products from '@/components/products/product/RelatedProducts'

export const revalidate = 0
const HomePage = async () => {
  const billboard = await getBillboard('665f21dbe93867b368fb6b6f')
  const products = await getProducts({ isFeatured: true })

  return (
    <Container>
      <div className="space-y-4 pb-10">
        <Billboard billboardData={billboard} />
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
        <div className="flex flex-col gap-y-8 px-4 sm:px-0 pb-20 lg:pb-0">
          <Products title="Featured Products" products={products} />
        </div>
      </div>
    </Container>
<<<<<<< HEAD
  );
};

export default HomePage;
=======
  )
}

export default HomePage
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
