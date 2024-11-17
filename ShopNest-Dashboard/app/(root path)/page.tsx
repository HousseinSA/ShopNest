'use client'
import { useEffect } from 'react'
import { useModalStore } from '@/hooks/StoreState'

import Head from '@/components/Navigation/Header'

export default function Home() {
  // modal state change on render
  const { ModalOpenState, openModal } = useModalStore()
  useEffect(() => {
    if (!ModalOpenState) {
      openModal()
    }
  }, [ModalOpenState, openModal])
  return (
    <>
        <Head storeList={[]} customUser={null}  />
    </>
  )
}
