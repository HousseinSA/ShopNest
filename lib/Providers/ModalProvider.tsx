'use client'
import { useState, useEffect } from 'react'

import StoreModal from '@/components/Modals/StoreModal'
const ModalProvider = () => {
  // show modal on render 
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return <>{mounted && <StoreModal />}</>
}

export default ModalProvider
