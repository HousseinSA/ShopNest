'use client'

import { useEffect } from 'react'

import { useModalStore } from '@/hooks/ModalStateStore'

export default function Home() {
  const { isOpen, onOpen } = useModalStore()
  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])
  return <div className=''>root page</div>
}
