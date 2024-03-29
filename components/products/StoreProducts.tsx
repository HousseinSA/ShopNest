'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ProductProps, columns } from '@/components/products/ProductsTable/columns'
import { DataTable } from '@/components/products/ProductsTable/data-table'
import APIList from './APIList'

interface StoreProductProps {
  products: ProductProps[]
}
const StoreProducts: React.FC<StoreProductProps> = ({ products }) => {
  // routes params
  const route = useRouter()
  const params = useParams()

  // handel click
  const onAddNew = () => {
    route.push(`/${params.storeCode}/products/new`)
  }
  return (
    <>
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`Products (${products.length})`} description='manage products of your store'>
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={products} />
      </div>
      <SectionHeader title='API ' description='api calls for products' />
      <Separator />
      <APIList apiName='products' apiId='apiId' />
    </>
  )
}

export default StoreProducts