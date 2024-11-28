'use client'
import React from 'react'

import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
import { Separator } from '@/components/ui/separator'
import { SizeProps, columns } from '@/app/(dashboard)/[storeCode]/sizes/components/SizesTable/columns'
import { DataTable } from '@/app/(dashboard)/[storeCode]/sizes/components/SizesTable/data-table'

interface StoreSizesProps {
  sizes: SizeProps[]
}
const StoreSizes: React.FC<StoreSizesProps> = ({ sizes }) => {
  // routes params
  const route= useRouter()
  const params = useParams()

  // handel click
  const onAddNew = () => {
    route.push(`/${params.storeCode}/sizes/new`)
  }

  return (
    <>
    
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`Sizes (${sizes.length})`} description='Manage store sizes'>
          <HeadButton onAddNew ={onAddNew}>
              Add Size
          </HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={sizes} />
      </div>
    
    </>
  )
}

export default StoreSizes
