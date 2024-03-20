'use client'

import { useEffect } from 'react'

import { useModalStore } from '@/hooks/ModalStateStore'

export default function Home() {
  const { ModalOpenState, openModal } = useModalStore()
  useEffect(() => {
    if (!ModalOpenState) {
      openModal()
    }
  }, [ModalOpenState, openModal])
  console.log(ModalOpenState)
  return <div className=''>root page</div>
}
