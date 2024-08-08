'use client'
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
import { Separator } from '@/components/ui/separator'
import { CategoryProps, columns } from '@/components/Categories/CategoryTable/columns'
import { DataTable } from '@/components/Categories/CategoryTable/data-table'

interface StoreCategoryProps {
  categories: CategoryProps[]
}
const StoreCategories: React.FC<StoreCategoryProps> = ({ categories }) => {
  // routes params
  const route = useRouter()
  const params = useParams()

  // handel click
  const onAddNew = () => {
    route.push(`/${params.storeCode}/categories/new`)
  }

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`Categories (${categories.length})`} description='Manage store categories'>
        <HeadButton onAddNew ={onAddNew}>
              Add category
          </HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={categories} />
      </div>
    </>
  )
}

export default StoreCategories
