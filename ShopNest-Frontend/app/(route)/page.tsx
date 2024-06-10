import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/lib/fetchData/getBillboard";


export const revalidate = 0
const HomePage = async () => {
const data = await getBillboard('665f21dbe93867b368fb6b6f')    
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard  billboardData={data}/>
        </div> 
    </Container>
  );
};

export default HomePage;
