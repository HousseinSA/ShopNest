'use client'
import { Store } from '@prisma/client'
import React, { useState } from 'react'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import StoreSettingsForm from './StoreSettingsForm'
import { Separator } from '@/components/ui/separator'
import ApiAlert from './ApiAlert'
import useClientMethods from '@/hooks/use-client-methods'
import PathHeader from '@/components/GlobalComponent/PathHeader'
import AlertModal from '@/components/Modals/AlertModal'

interface StoreSettingsProps {
  storeData: Store
}

// component
const StoreSettings: React.FC<StoreSettingsProps> = ({ storeData }) => {
  // open store delete modal
  const [isOpen, setIsOpen] = useState(false)

  // origin url for alert description
  const origin = useClientMethods()

  return (
    <>
      <AlertModal title='Delete Store?' description='Are you sure you want to delete store?' isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-col space-y-4'>
        <PathHeader title={'Settings'} description={`Edit ${storeData?.storename} store`}>
          <Button variant='destructive' aria-label='delete button' size='icon' className='rounded-full' onClick={() => setIsOpen(true)}>
            <Trash className='w-5 h-5' />
          </Button>
        </PathHeader>
        <Separator />
        <StoreSettingsForm storeData={storeData} />
        <Separator />
        <ApiAlert title='test' description={`${origin}/api/${storeData.id}`} variant='admin' />
      </div>
    </>
  )
}

export default StoreSettings
