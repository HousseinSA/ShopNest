'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react'

import { BillboardProps } from '@/components/Billboards/BillboardsTable/columns'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useParams, useRouter } from 'next/navigation'

interface CellActionProps {
  billboard: BillboardProps
}

const ActionsColumn: React.FC<CellActionProps> = ({ billboard }) => {
  // route
  const route = useRouter()
  const params = useParams()
  // on update
  function onUpdate(code: string) {
    route.push(`/${params.storeCode}/billboards/${code}`)
    route.refresh()
  }

  // handel copy
  const onCopy = (code: string): void => {
    navigator.clipboard.writeText(code)
    toast.success('Code copied!')
  }

  return (
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
        <DropdownMenuItem onClick={() => onUpdate(billboard.id)}>
          <Edit className='w-5 h-5 mr-2' /> Update
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onCopy(billboard.id)}>
          <Copy className='w-5 h-5 mr-2' /> Copy
        </DropdownMenuItem>
        <DropdownMenuItem className='bg-red-200'>
          <Trash className='w-5 h-5 mr-2' /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActionsColumn
