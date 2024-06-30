import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'
import { CreditCard, DollarSign, Package } from 'lucide-react'


import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PriceFormatter } from '@/lib/PriceFormatter'
import { getTotalRevenue } from '@/lib/actions/getTotalRevenue'
import { getSalesCount } from '@/lib/actions/getSalesCount'
import { getInStockCount } from '@/lib/actions/getInStockCount'
import validateObjectId from '@/lib/mongodDBValidate'
import Overview from '@/components/Dashboard/overview'
import { getGraphData } from '@/lib/actions/getGraphData'
interface StoreParams {
  params: { storeCode: string }
}
const StorePage: React.FC<StoreParams> = async ({ params }: { params: { storeCode: string } }) => {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const validStoreCode = validateObjectId(params.storeCode)
  if (!validStoreCode) {
    redirect(`/`)
  }
  // const store = await prismaDB.store.findFirst({
  //   where: {
  //     id: params.storeCode,
  //     userId
  //   }
  // })

  const totalRevenue = await getTotalRevenue(params.storeCode)
  const salesCount = await getSalesCount(params.storeCode)
  const stockCount = await getInStockCount(params.storeCode)
  const graphData = await getGraphData(params.storeCode)



  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SectionHeader title='Dashboard' description='Your store overview ' />
        <Separator />
        <div className='grid gap-4 grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-primary'>Total Revenue</CardTitle>
              <DollarSign className='w-4 h-4 text-muted-foreground  ' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{PriceFormatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium text-primary'>Sales</CardTitle>
              <CreditCard className='w-4 h-4 text-muted-foreground  ' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium  text-primary'>Products in stuck</CardTitle>
              <Package className='w-4 h-4 text-muted-foreground  ' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHeader>
            <CardTitle className=' text-primary'>Overview</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <Overview data={graphData}/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StorePage
