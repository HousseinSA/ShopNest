'use client'
<<<<<<< HEAD
=======
import { useState } from 'react'
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
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
