'use client'
import React from 'react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
import { Separator } from '@/components/ui/separator'
import { ColorProps, columns } from '@/components/colors/ColorTable/columns'
import { DataTable } from '@/components/colors/ColorTable/data-table'

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
        <SectionHeader title={`Colors (${colors.length})`} description='Manage store colors'>
        <HeadButton onAddNew={onAddNew}>Add Color</HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={colors} />
      </div>

    </>
  )
}

export default StoreColors
