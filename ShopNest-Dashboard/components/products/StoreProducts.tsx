'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
import { Separator } from '@/components/ui/separator'
import { ProductProps, columns } from '@/components/products/ProductsTable/columns'
import { DataTable } from '@/components/products/ProductsTable/data-table'
import APIList from '@/components/globals/APIList'

interface StoreProductProps {
  products: ProductProps[] | undefined
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
        <SectionHeader title={`Products (${products?.length})`} description='Manage store products'>
        <HeadButton onAddNew ={onAddNew}>
              Add Product 
          </HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={products} />
      </div>
      <SectionHeader title='API' description='api calls for products' />
      <APIList apiName='products' apiId='apiId' />
    </>
  )
}

export default StoreProducts
