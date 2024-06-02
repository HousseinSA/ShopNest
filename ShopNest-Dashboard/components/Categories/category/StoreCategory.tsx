'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Billboard, Category } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import CategoryForm from './CategoryForm'

interface CategoryProps {
  categoryData?: Category
  billboards: Billboard[] | undefined
}

const StoreCategory: React.FC<CategoryProps> = ({ categoryData, billboards }) => {
  // conditions for path header
  const title = categoryData ? `Edit ${categoryData.name} category` : 'Create category'
  const description = categoryData ? `Edit category ${categoryData.name}` : 'Add a new category'

  // store delete modal state
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
      toast.success('category deleted!')
      route.refresh()
    } catch (error) {
      toast.error('Remove products from category!')
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
