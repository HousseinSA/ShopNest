'use client'
import { Store } from '@prisma/client'
import React from 'react'

import { useState } from 'react'

import SettingsHeader from './SettingsHeader'
import StoreDeleteModal from '@/components/Modals/StoreDeleteModal'
import StoreSettingsForm from './StoreSettingsForm'
import { Separator } from '@/components/ui/separator'
import ApiAlert from './ApiAlert'

interface StoreSettingsProps {
  storeData: Store
}

// component
const StoreSettings: React.FC<StoreSettingsProps> = ({ storeData }) => {
  // open store delete modal
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StoreDeleteModal
        title='Delete Store?'
        description='Are you sure you want to delete store?'
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className='flex flex-col space-y-4'>
        <SettingsHeader
          title={'Settings'}
          description={`Edit ${storeData?.storeName} store`}
          setIsOpen={setIsOpen}
        />
        <Separator />
        <StoreSettingsForm storeData={storeData} />
        <Separator />
        <ApiAlert title='test' description='test'/>
      </div>
    </>
  )
}

export default StoreSettings
