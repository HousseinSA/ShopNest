'use client'
import { useEffect } from 'react'
import { useModalStore } from '@/hooks/StoreState'
<<<<<<< HEAD

=======
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
import Head from '@/components/Navigation/Head'

export default function Home() {
  // modal state change on render
  const { ModalOpenState, openModal } = useModalStore()
  useEffect(() => {
    if (!ModalOpenState) {
      openModal()
    }
  }, [ModalOpenState, openModal])
<<<<<<< HEAD
  return (
    <>
        <Head storeList={[]} session={null} />
=======

  return (
    <>
      <Head />
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
    </>
  )
}
