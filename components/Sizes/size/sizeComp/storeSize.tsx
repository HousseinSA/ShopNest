'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Size } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import SizeForm from './SizeForm'

interface storeSizeProps {
  size: Size | undefined
  sizes: Size[] | null
}

const StoreSize: React.FC<storeSizeProps> = ({ size, sizes }) => {
  // conditions for path header
  const title = size ? `Edit ${size.name} size` : 'Create size'
  const description = size ? `Edit size ${size.name}` : 'Add a new size'

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
      await axios.delete(`/api/${params.storeCode}/sizes/${size.id}`)
      route.refresh()
      route.push(`/${params.storeCode}/sizes`)
      toast.success('size deleted!')
    } catch (error) {
      toast.error('make sure you removed all products using this size first ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete size' loading={loading} onDelete={onCategoryDelete} description='Are you sure you want to delete size?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {size && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <SizeForm sizeData={size} sizes={sizes} />
      </div>
    </>
  )
}

export default StoreSize
