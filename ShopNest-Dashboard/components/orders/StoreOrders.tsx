'use client'
import React from 'react'


import SectionHeader from '@/components/globals/storeHead/SectionHeader'

import { Separator } from '@/components/ui/separator'
import { OrderProps, columns } from '@/components/orders/orderTable/columns'
import { DataTable } from '@/components/orders/orderTable/data-table'

interface StoreOrdersProps {
  orders: OrderProps[]
}
const StoreOrders: React.FC<StoreOrdersProps> = ({ orders }) => {
  return (
    <>
      <SectionHeader title={`Orders (${orders.length})`} description='manage store orders'></SectionHeader>
      <Separator />
      <DataTable filterKey='products' columns={columns} data={orders} />
    </>
  )
}

export default StoreOrders
