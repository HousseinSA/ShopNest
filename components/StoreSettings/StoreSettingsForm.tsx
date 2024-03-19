import { Store } from '@prisma/client'
import React from 'react'

import SettingsHeader from './SettingsHeader'

interface storeSettingsProps {
  storeData: Store
}

const StoreSettingsForm: React.FC<storeSettingsProps> = ({ storeData }) => {
  return (
    <div className='flex flex-col space-y-4'>
      <SettingsHeader title={'Settings'} description={'Edit you store'} />
    </div>
  )
}

export default StoreSettingsForm
