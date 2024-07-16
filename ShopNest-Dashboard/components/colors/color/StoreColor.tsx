'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Color } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/globals/storeHead/SectionHeader'

import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import ColorForm from './ColorForm'
import {ToastError, ToastSuccess} from '@/components/globals/Toast'
interface CategoryProps {
  colorData?: Color 
}

const StoreColor: React.FC<CategoryProps> = ({ colorData }) => {
  // conditions for path header

  const title = colorData ? `Update ${colorData.name} Color` : 'Create New Color';
  const description = colorData ? `Update the details for color ${colorData.name}` : 'Add a new color option to your palette';  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // delete billboard from database
  const onColorDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/colors/${colorData.id}`)
      route.push(`/${params.storeCode}/colors`)
      ToastSuccess('color deleted!')
      route.refresh()
    } catch (error) {
      ToastError('Remove color from products!')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete color' loading={loading} onDelete={onColorDelete} description='Are you sure you want to delete color?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {colorData && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <ColorForm colorData={colorData} />
      </div>
    </>
  )
}

export default StoreColor
