'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CategoryProps, columns } from '@/components/Categories/CategoryTable/columns'
import { DataTable } from '@/components/Categories/CategoryTable/data-table'
import APIList from './APIList'

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
        <SectionHeader title={`Categories (${categories.length})`} description='manage categories of your store'>
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={categories} />
      </div>
      <SectionHeader title='API ' description='api calls for categories' />
      <Separator />
      <APIList apiName='categories' apiId='apiId' />
    </>
  )
}

export default StoreCategories
