'use client'
import React, { useEffect, useState } from 'react'
import { ArrowBigLeft, Trash } from 'lucide-react'

import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Modal } from './Modal'

interface storeDeleteModal {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

// component
const StoreDeleteModal: React.FC<storeDeleteModal> = ({
  title,
  description,
  isOpen,
  setIsOpen
}) => {
  //  states
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // get the url path and route
  const pathname = useParams()
  const route = useRouter()

  // modalMounted on render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // delete store from database
  const onDeleteStore = async () => {
    try {
      setLoading(true)
      const response = await axios.delete(`/api/stores/${pathname.storeCode}`)
      if (response.data) {
        setLoading(false)
        route.refresh()
        route.push('/')
        toast.success('store deleted!')
      }
    } catch (error) {
      toast.error('delete products and categories first', error)
    } finally {
      setLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className='flex justify-center mt-4 space-x-4'>
        <Button
          onClick={() => setIsOpen(false)}
          disabled={loading}
          variant='outline'
        >
          <ArrowBigLeft className='w-5 h-5 ml-2' /> Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={onDeleteStore}
          variant='destructive'
        >
          <Trash className='w-5 h-5 ml-2' /> Delete
        </Button>
      </div>
    </Modal>
  )
}

export default StoreDeleteModal
