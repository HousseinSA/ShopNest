'use client'
import { useState } from 'react'
import OnlyClient from '@/components/GlobalComponent/OnlyClient'

import StoreModal from '@/components/Modals/StoreModal'
const ModalProvider = () => {
  return (
    <>
      <OnlyClient><StoreModal /></OnlyClient>
    </>
  )
}

export default ModalProvider
