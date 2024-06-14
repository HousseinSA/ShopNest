'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Billboard, Category } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/storeHead/SectionHeader'

import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import CategoryForm from './CategoryForm'
import {ToastSuccess, ToastError} from '@/components/GlobalComponent/Toast'

interface CategoryProps {
  categoryData?: Category
  billboards: Billboard[] | undefined
}

const StoreCategory: React.FC<CategoryProps> = ({ categoryData, billboards }) => {
  // conditions for path header
  const title = categoryData ? `Update ${categoryData.name} Category` : 'Create New Category';
  const description = categoryData ? `Update the details for category ${categoryData.name}` : 'Add a new category to your catalog';  // store delete modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // delete billboard from database
  const onCategoryDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/categories/${categoryData.id}`)
      route.push(`/${params.storeCode}/categories`)
      ToastSuccess(`category ${categoryData.name} deleted!`)
      route.refresh()
    } catch(error) {
      ToastError(`Remove category ${categoryData.name} from products!`)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete category' loading={loading} onDelete={onCategoryDelete} description='Are you sure you want to delete category?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {categoryData && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <CategoryForm billboards={billboards} categoryData={categoryData} />
      </div>
    </>
  )
}

export default StoreCategory
