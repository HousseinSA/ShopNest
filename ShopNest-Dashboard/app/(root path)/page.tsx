'use client'
import { useEffect } from 'react'

import { useModalStore } from '@/hooks/ModalStateStore'

export default function Home() {
  // modal state change on render
  const { ModalOpenState, openModal } = useModalStore()
  useEffect(() => {
    if (!ModalOpenState) {
      openModal()
    }
  }, [ModalOpenState, openModal])

  return <div className=''>root page</div>
}
