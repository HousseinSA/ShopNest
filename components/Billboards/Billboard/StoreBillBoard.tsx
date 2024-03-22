'use client'
import { Trash } from 'lucide-react'
import { Billboard } from '@prisma/client'

import { Button } from '@/components/ui/button'
import PathHeader from '@/components/GlobalComponent/PathHeader'
import BillBoardForm from './BillBoardForm'
import React from 'react'
import { Separator } from '@/components/ui/separator'

interface BillBoardProps {
  billBoardData: Billboard
}

const StoreBillBoard: React.FC<BillBoardProps> = ({ billBoardData }) => {
  // conditions for path header
  const title = billBoardData ? `Edit ${billBoardData.label}` : 'Create billboard'
  const description = billBoardData ? `Edit Billboard ${billBoardData.label}` : 'Add a new billboard'

  return (
    <div className='flex flex-col space-y-4'>
      <PathHeader title={title} description={description}>
        {billBoardData && (
          <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
            <Trash className='w-5 h-5' />
          </Button>
        )}
      </PathHeader>
      <Separator />
      <BillBoardForm />
    </div>
  )
}

export default StoreBillBoard
