'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

import { ProductProps } from '@/components/products/ProductsTable/columns'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import AlertModal from '@/components/Modals/AlertModal'
import { ToastSuccess, ToastError } from '@/components/globals/Toast'
// import { useActionState } from '@/hooks/StoreState'

interface CellActionProps {
  product: ProductProps
}

const ActionsColumn: React.FC<CellActionProps> = ({ product }) => {
  // const { openProductId, toggleDropDown, closeDropDown } = useActionState()
  const route = useRouter()
  const params = useParams()
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const onUpdate = (code: string) => {
    route.push(`/${params.storeCode}/products/${code}`)
    // closeDropDown()
  }

  const onCopy = (code: string): void => {
    navigator.clipboard.writeText(code)
    ToastSuccess('Copied!')
    // closeDropDown()
  }

  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onProductDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/products/${product.id}`)
      ToastSuccess('Product deleted!')
      route.refresh()
    } catch (error) {
      ToastError("Can't delete product, try again")
    } finally {
      setLoading(false)
      setIsOpen(false)
      // closeDropDown()
    }
  }

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  // closeDropDown()
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [closeDropDown])

  return (
    <>
      <AlertModal title='Delete Product' description={`Are you sure you want to delete ${product.name}?`} loading={loading} onDelete={onProductDelete} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div ref={dropdownRef}>
        <DropdownMenu
        //  open={openProductId === product.id}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size='sm'
              //  onClick={() => toggleDropDown(product.id)}
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onUpdate(product.id)
              }}
            >
              <div className='hover:text-primary flex space-x-2 w-full'>
                <Edit className='w-5 h-5 mr-2' /> Update
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                onCopy(product.id)
              }}
            >
              <div className='hover:text-primary flex space-x-2 w-full'>
                <Copy className='w-5 h-5 mr-2' /> Copy
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(true)
              }}
            >
              <div className='hover:text-red-500 flex space-x-2 w-full'>
                <Trash className='w-5 h-5 mr-2' /> Delete
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export default ActionsColumn
