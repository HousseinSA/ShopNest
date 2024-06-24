'use client'
import { useState } from 'react'
import OnlyClient from '@/components/globals/OnlyClient'

import StoreModal from '@/components/Modals/StoreModal'
const ModalProvider = () => {
  return (
    <>
      <OnlyClient><StoreModal /></OnlyClient>
    </>
  )
}

export default ModalProvider
