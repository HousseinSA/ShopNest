'use client'
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
} from '@headlessui/react'
import { X } from 'lucide-react'

import React, { Fragment } from 'react'
import ButtonIcon from '../../ui/IconButton'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal : React.FC<ModalProps> = ({ open, onClose, children }) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="inset-0 fixed overflow-y-auto">
          <div className="flex items-center min-h-full justify-center text-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300 "
              enterFrom="opacity-0 scale-95 "
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="h-full max-w-3xl overflow-hidden text-left rounded-lg align-middle">
                <div className="flex items-center px-4 overflow-hidden pb-6 bg-white pt-10 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <div className="absolute right-4 top-5">
                    <ButtonIcon icon={<X size={15} color='white'/> } onClick={onClose} />
                  </div>
                {children}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
