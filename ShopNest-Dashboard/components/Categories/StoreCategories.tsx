'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'


import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CategoryProps, columns } from '@/components/Categories/CategoryTable/columns'
import { DataTable } from '@/components/Categories/CategoryTable/data-table'
import APIList from '@/components/globals/APIList'

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
              Add Category 
          </HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='name' columns={columns} data={categories} />
      </div>
      <SectionHeader title='API' description='api calls for categories' />
      <Separator /> 
      <APIList apiName='categories' apiId='apiId' />
    </>
  )
}

export default StoreCategories
