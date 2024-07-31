import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs'

import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PriceFormatter } from '@/lib/PriceFormatter'
import { getTotalRevenue } from '@/lib/dashboardActions/getTotalRevenue'
import { getSalesCount } from '@/lib/dashboardActions/getSalesCount'
import { getInStockCount } from '@/lib/dashboardActions/getInStockCount'
import validateObjectId from '@/lib/mongodDBValidate'
import Overview from '@/components/Dashboard/overview'
import { getGraphData } from '@/lib/dashboardActions/getGraphData'
import CardHead from '@/components/Dashboard/CardHead'

interface StoreParams {
  params: { storeCode: string }
}
const DashboardPage: React.FC<StoreParams> = async ({ params }: { params: { storeCode: string } }) => {
  const { userId} = auth()
  if (!userId) {
    redirect('/sign-in')
  }
  const validStoreCode = validateObjectId(params.storeCode)
  if (!validStoreCode) {
    redirect(`/`)
  }

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
            <CardHead title='Total Revenue' />
            <CardContent>
              <div className='text-2xl font-bold'>{PriceFormatter.format(totalRevenue)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHead title='Sales' />
            <CardContent>
              <div className='text-2xl font-bold'>{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHead title='Products in stuck' />
            <CardContent>
              <div className='text-2xl font-bold'>{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card className='col-span-4'>
          <CardHead title='Overview' />
          <CardContent className='pl-2'>
            <Overview data={graphData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
