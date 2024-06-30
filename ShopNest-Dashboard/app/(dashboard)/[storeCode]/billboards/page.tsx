import { format } from 'date-fns'

import { BillboardProps } from '@/components/Billboards/BillboardsTable/columns'
import StoreBillBoards from '@/components/Billboards/StoreBillBoards'
import prismaDB from '@/lib/prismaClient'
import { redirect } from 'next/navigation'
import validateObjectId from '@/lib/mongodDBValidate'
const BillboardsPage = async ({ params }: { params: { storeCode: string } }) => {
  
  const simulateNetworkError = function() {
    return new Promise((_, reject) => {
      // Simulate a delay to mimic network latency
      setTimeout(() => {
        // Always reject to simulate a network error
        reject(new Error('Network Error: Failed to fetch data'));
      }, 1000); // 1 second delay
    });
  };

  simulateNetworkError()
  .catch(error => {
    console.error(error.message);
  });

  
  const validStoreCode = validateObjectId(params.storeCode)
  if (validStoreCode) {
    const billBoards = await prismaDB.billboard.findMany({
      where: {
        storeCode: params.storeCode
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedBillboards: BillboardProps[] = billBoards?.map((item) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, 'MMMM do, yyyy')
    }))

    return (
      <div className='p-4 flex flex-col flex-1'>
        <StoreBillBoards billBoards={formattedBillboards} />
      </div>
    )
  }
  redirect(`/`)
}

export default BillboardsPage
