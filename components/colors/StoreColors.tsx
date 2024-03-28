'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ColorProps, columns } from '@/components/colors/ColorTable/columns'
import { DataTable } from '@/components/colors/ColorTable/data-table'
import APIList from './APIList'

interface StoreCategoryProps {
  colors: ColorProps[]
}
const StoreColors: React.FC<StoreCategoryProps> = ({ colors }) => {
  // routes params
  const route = useRouter()
  const params = useParams()

  // handel click
  const onAddNew = () => {
    route.push(`/${params.storeCode}/colors/new`)
  }

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`colors (${colors.length})`} description='manage colors of your store'>
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={colors} />
      </div>
      <SectionHeader title='API ' description='api calls for colors' />
      <Separator />
      <APIList apiName='colors' apiId='apiId' />
    </>
  )
}

export default StoreColors
