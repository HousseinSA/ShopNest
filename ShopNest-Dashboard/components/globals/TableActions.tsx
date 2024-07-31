'use client'
import React, { useState } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

import { ColorProps } from '@/components/colors/ColorTable/columns'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/Modals/AlertModal'
import { ToastSuccess, ToastError } from '@/components/globals/Toast'

interface CellActionProps {
  color:ColorProps
  size?:
}

const ActionsColumn: React.FC<CellActionProps> = ({ color }) => {
  // route
  const route = useRouter()
  const params = useParams()
  // on update
  function onUpdate(code: string) {
    route.push(`/${params.storeCode}/colors/${code}`)
  }

  // handel copy
  const onCopy = (code: string): void => {
    navigator.clipboard.writeText(code)
    ToastSuccess('Copied!')
  }

  // alert Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // delete billboard from database
  const onColorDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/colors/${color.id}`)
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
      <AlertModal title='delete color' description='Are you sure you want to delete color?' loading={loading} onDelete={onColorDelete} isOpen={isOpen} setIsOpen={setIsOpen} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='sm'>
            <span className='sr-only'>open menu</span>
            <MoreHorizontal className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onUpdate(color.id)}>
            <Edit className='w-5 h-5 mr-2' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(color.id)}>
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
