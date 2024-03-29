'use client'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

import { ProductProps } from '@/components/products/ProductsTable/columns'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/Modals/AlertModal'

interface CellActionProps {
  product: ProductProps
}

const ActionsColumn: React.FC<CellActionProps> = ({ product }) => {
  // route
  const route = useRouter()
  const params = useParams()
  // on update
  function onUpdate(code: string) {
    route.push(`/${params.storeCode}/products/${code}`)
    route.refresh()
  }

  // handel copy
  const onCopy = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied!')
  }

  // alert Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // delete product from database
  const onProductDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/products/${product.id}`)
      route.refresh()
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
      <AlertModal title='delete product' description='Are you sure you want to delete product?' loading={loading} onDelete={onProductDelete} isOpen={isOpen} setIsOpen={setIsOpen} />
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
          <DropdownMenuItem onClick={() => onUpdate(product.id)}>
            <Edit className='w-5 h-5 mr-2' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(product.id)}>
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