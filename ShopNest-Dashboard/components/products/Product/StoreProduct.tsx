'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Category, Color, Product ,Size } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/globals/storeHead/SectionHeader'

import ProductForm from '@/components/products/Product/ProductForm'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import { ToastError, ToastSuccess } from '@/components/globals/Toast'

interface ProductProps {
  productData?: Product
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}
const StoreProduct: React.FC<ProductProps> = ({ productData, categories, colors, sizes }) => {
  // conditions for path header

  const title = productData ? `Update  Product` : 'Create New Product';
  const description = productData ? `Update product details` : 'Add a new product to your store';

  
  // store delete modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // delete product from database
  const onProductDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/products/${productData.id}`)
      route.push(`/${params.storeCode}/products`)
      ToastSuccess('product deleted!')
      route.refresh()
    } catch (error) {
      ToastError('Can\'t delete product, try again')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete product' loading={loading} onDelete={onProductDelete} description='Are you sure you want to delete product?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {productData && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <ProductForm productData={productData} categories={categories} sizes={sizes} colors={colors} />
      </div>
    </>
  )
}

export default StoreProduct
