'use client'
import { useState, useEffect } from 'react'

import StoreModal from '@/components/ui/Modals/StoreModal'
const ModalProvider = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return <>{mounted && <StoreModal />}</>
}

export default ModalProvider
