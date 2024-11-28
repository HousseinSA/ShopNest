'use client'
import { Trash } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Billboard } from '@prisma/client'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import SectionHeader from '@/components/globals/storeHead/SectionHeader'

import BillBoardForm from './BillBoardForm'
import { Separator } from '@/components/ui/separator'
import AlertModal from '@/components/Modals/AlertModal'
import {ToastSuccess, ToastError} from '@/components/globals/Toast'


interface BillBoardProps {
  billboardData?: Billboard 
}

const StoreBillBoard: React.FC<BillBoardProps> = ({ billboardData }) => {
  // conditions for path header
  const title = billboardData ? `Update Billboard` : 'Create Billboard';
  const description = billboardData ? `Modify the existing billboard details` : 'Add a new billboard to your collection';

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
      await axios.delete(`/api/${params.storeCode}/billboards/${billboardData.id}`)
      route.push(`/${params.storeCode}/billboards`)
      ToastSuccess('billboard deleted!')
      route.refresh() 
    } catch (error) {
      ToastError('Remove billboard from categories!')
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }


  // stream event 
  useEffect(() => {
    const eventSource = new EventSource('/api/updates');

    eventSource.onmessage = (event) => {
      const newUpdate = event.data;
    }

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <AlertModal title={`Delete billboard`} loading={loading} onDelete={onBillboardDelete} description={`Are you sure you want to delete this billboard?`} isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className='flex flex-col space-y-4'>
          <SectionHeader title={title} description={description}>
            {billboardData && (
              <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
                <Trash className='w-5 h-5' />
              </Button>
            )}
          </SectionHeader>
          <Separator />
          <BillBoardForm billboardData={billboardData} />
        </div>
    </>
  )
}

export default StoreBillBoard
