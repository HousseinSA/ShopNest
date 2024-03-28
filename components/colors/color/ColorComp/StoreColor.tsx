'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Color } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import ColorForm from './ColorForm'

interface CategoryProps {
  colorData: Color | undefined
  colors: Color[] | null
}

const StoreColor: React.FC<CategoryProps> = ({ colorData, colors }) => {
  // conditions for path header
  const title = colorData ? `Edit ${colorData.name} color` : 'Create color'
  const description = colorData ? `Edit color ${colorData.name}` : 'Add a new color'

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
      await axios.delete(`/api/${params.storeCode}/categories/${colorData.id}`)
      route.refresh()
      route.push(`/${params.storeCode}/categories`)
      toast.success('color deleted!')
    } catch (error) {
      toast.error('make sure you removed all products using this color first ', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete color' loading={loading} onDelete={onCategoryDelete} description='Are you sure you want to delete color?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {colorData && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <ColorForm colors={colors} colorData={colorData} />
      </div>
    </>
  )
}

export default StoreColor
