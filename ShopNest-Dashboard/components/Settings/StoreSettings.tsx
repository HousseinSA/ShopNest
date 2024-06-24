'use client'
import { Store } from '@prisma/client'
import React, { useState } from 'react'
import { Trash } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'

import { Button } from '@/components/ui/button'
import StoreSettingsForm from './StoreSettingsForm'
import { Separator } from '@/components/ui/separator'
import ApiAlert from '@/components/globals/ApiAlert'
import useClientMethods from '@/hooks/use-client-methods'
import SectionHeader from '@/components/globals/storeHead/SectionHeader'

import AlertModal from '@/components/Modals/AlertModal'
import { ToastSuccess, ToastError } from '../globals/Toast'

interface StoreSettingsProps {
  storeData: Store
}

// component
const StoreSettings: React.FC<StoreSettingsProps> = ({ storeData }) => {
  // store delete modal state
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // get the url path and route
  const params = useParams()
  const route = useRouter()

  // origin url for alert description
  const origin = useClientMethods()

  // delete store from database
  const onStoreDelete = async () => {
    try {
      setLoading(true)

      await axios.delete(`/api/stores/${params.storeCode}`)
      route.push('/')
      ToastSuccess(`${storeData.storeName} store deleted!`)
      route.refresh()
    } catch (error) {
      ToastError(`remove all store ${storeData.storeName} items first. `)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <>
      <AlertModal title='Delete Store?' loading={loading} onDelete={onStoreDelete} description={`Are you sure you want to delete ${storeData.storeName} store?`} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={'Settings'} description={`Edit ${storeData?.storeName} store`}>
          <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
            <Trash className='w-5 h-5' />
          </Button>
        </SectionHeader>
        <Separator />
        <StoreSettingsForm storeData={storeData} />
        <Separator />
        <ApiAlert title='test' description={`${origin}/api/${storeData.id}`} variant='public' />
      </div>
    </>
  )
}

export default StoreSettings
