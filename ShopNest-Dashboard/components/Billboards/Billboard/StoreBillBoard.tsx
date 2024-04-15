'use client'
import { Trash } from 'lucide-react'
import React, { useState } from 'react'
import { Billboard } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import BillBoardForm from './BillBoardForm'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'

interface BillBoardProps {
  billBoardData?: Billboard 
}

const StoreBillBoard: React.FC<BillBoardProps> = ({ billBoardData }) => {
  // conditions for path header
  const title = billBoardData ? `Edit ${billBoardData.label} billboard` : 'Create billboard'
  const description = billBoardData ? `Edit Billboard ${billBoardData.label}` : 'Add a new billboard'

  // store delete modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // delete billboard from database
  const onBillboardDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeCode}/billboards/${billBoardData.id}`)
      route.refresh()
      route.push(`/${params.storeCode}/billboards`)
      toast.success('billboard deleted!')
    } catch (error) {
      toast.error('delete products and categories first', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='delete billboard' loading={loading} onDelete={onBillboardDelete} description='Are you sure you want to delete store?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={title} description={description}>
          {billBoardData && (
            <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
              <Trash className='w-5 h-5' />
            </Button>
          )}
        </SectionHeader>
        <Separator />
        <BillBoardForm billBoardData={billBoardData} />
      </div>
    </>
  )
}

export default StoreBillBoard
