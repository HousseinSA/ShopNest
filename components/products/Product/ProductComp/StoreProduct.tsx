'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Category, Color, Product, Size } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import ProductForm from '@/components/products/Product/ProductComp/ProductForm'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'

interface ProductProps {
  productData: Product | undefined
  categories: Category[]
  sizes: Size[]
  colors: Color[]
}

const StoreProduct: React.FC<ProductProps> = ({ productData, categories, colors, sizes }) => {
  // conditions for path header
  const title = productData ? `Edit ${productData.name} product` : 'Create product'
  const description = productData ? `Edit product ${productData.name}` : 'Add a new product'

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
      route.refresh()
      route.push(`/${params.storeCode}/products`)
      toast.success('product deleted!')
    } catch (error) {
      toast.error('delete products and categories first', error)
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