'use client'
import React from 'react'
import { ArrowBigLeft, Trash } from 'lucide-react'
import OnlyClient from '@/components/GlobalComponent/OnlyClient'


import { Button } from '@/components/ui/button'
import { Modal } from './Modal'
import { ClipLoader } from 'react-spinners'

interface AlertModalProps {
  title: string
  description: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  loading: boolean
  onDelete: () => void
}

// component
const AlertModal: React.FC<AlertModalProps> = ({ title, description, loading, onDelete, isOpen, setIsOpen }) => {


  return (
    <OnlyClient>
    <Modal title={title} description={description} isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className='flex justify-center mt-4 space-x-4'>
        <Button onClick={() => setIsOpen(false)} disabled={loading} variant='outline'>
          <ArrowBigLeft className='w-5 h-5 ml-2' /> Cancel
        </Button>
        <Button disabled={loading} className='flex items-center gap-3' onClick={onDelete} variant='destructive'>
          {loading? <ClipLoader size={15} color='#fff' /> : <Trash className='w-5 h-5' />}{loading ?'Deleting':'Delete'}
        </Button>
      </div>
    </Modal>
    </OnlyClient>
  )
}

export default AlertModal
