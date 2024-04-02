'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { OrderProps, columns } from '@/components/orders/orderTable/columns'
import { DataTable } from '@/components/orders/orderTable/data-table'
import APIList from '@/components/GlobalComponent/APIList'

interface StoreOrdersProps {
  orders: OrderProps[]
}
const StoreOrders: React.FC<StoreOrdersProps> = ({ orders }) => {
  // routes params
  const route = useRouter()
  const params = useParams()

  // handel click
  const onAddNew = () => {
    route.push(`/${params.storeCode}/orders/new`)
  }

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`Orders (${orders.length})`} description='manage orders of your store'>
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={orders} />
      </div>
      <SectionHeader title='API ' description='api calls for orders' />
      <Separator />
      <APIList apiName='orders' apiId='apiId' />
    </>
  )
}

export default StoreOrders
