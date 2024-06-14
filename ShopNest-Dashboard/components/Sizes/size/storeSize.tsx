'use client'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Size } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/storeHead/SectionHeader'

import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import SizeForm from './SizeForm'
import { ToastSuccess ,ToastError } from '@/components/GlobalComponent/Toast'

interface storeSizeProps {
  size?: Size
}

const StoreSize: React.FC<storeSizeProps> = ({ size }) => {
  // conditions for path header
  const title = size ? `Update ${size.name} Size` : 'Create New Size';
  const description = size ? `Update the details for size ${size.name}` : 'Add a new size option to your collection';
    // store delete modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // delete billboard from database
  const onSizeDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/sizes/${size.id}`)
      route.push(`/${params.storeCode}/sizes`)
      ToastSuccess('size deleted!')
      route.refresh()
    } catch (error) {
      ToastError('remove size from products')
     
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete size' 
      loading={loading}
       onDelete={onSizeDelete} description='Are you sure you want to delete size?' isOpen={isOpen} 
       setIsOpen={setIsOpen}
        />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {size && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' 
            
            onClick={() => setIsOpen(true)}
            
            
            >
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <SizeForm sizeData={size} />
      </div>
    </>
  )
}

export default StoreSize
