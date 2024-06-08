'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SizeProps, columns } from '@/components/Sizes/SizesTable/columns'
import { DataTable } from '@/components/Sizes/SizesTable/data-table'
import APIList from '@/components/GlobalComponent/APIList'

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
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={sizes} />
      </div>
      {/* <SectionHeader title='API ' description='api calls for sizes' /> */}
      {/* <Separator /> */}
      {/* <APIList apiName='sizes' apiId='apiId' /> */}
    
    </>
  )
}

export default StoreSizes
