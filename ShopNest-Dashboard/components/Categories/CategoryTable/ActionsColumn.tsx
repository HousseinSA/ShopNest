'use client'
import React, { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

import { CategoryProps } from '@/components/Categories/CategoryTable/columns'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/Modals/AlertModal'
import {ToastSuccess, ToastError} from '@/components/GlobalComponent/Toast'


interface CellActionProps {
  category: CategoryProps
}

const ActionsColumn: React.FC<CellActionProps> = ({ category }) => {
  // route
  const route = useRouter()
  const params= useParams()
  // on update
  function onUpdate(code: string) {
    route.push(`/${params.storeCode}/categories/${code}`)
   
  }

  // handel copy
  const onCopy = (code: string): void => {
    navigator.clipboard.writeText(code)
    ToastSuccess('Copied!')
  }

  // alert Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // delete category from database
  const onCategoryDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/categories/${category.id}`)
      ToastSuccess('category deleted!')
      route.refresh()
    } catch (error) {
      ToastError('Remove products from category!')

    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title={`Delete ${category.name} Category`} description={`Are you sure you want to delete ${category.name} category?`} loading={loading} onDelete={onCategoryDelete} isOpen={isOpen} setIsOpen={setIsOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm'>
            <span className='sr-only'>open menu</span>
            <MoreHorizontal className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions menu
</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onUpdate(category.id)}>
            <Edit className='w-5 h-5 mr-2' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(category.id)}>
            <Copy className='w-5 h-5 mr-2' /> Copy
          </DropdownMenuItem>
          <DropdownMenuItem className='bg-red-200' onClick={() => setIsOpen(true)}>
            <Trash className='w-5 h-5 mr-2' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default ActionsColumn
