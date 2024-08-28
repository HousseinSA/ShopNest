'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FilterIcon, X } from 'lucide-react'
import { Dialog, DialogPanel } from '@headlessui/react'
import Filter from './filter'

import { Size, Color } from '@/lib/StoreTypes'
import ButtonIcon from '@/components/ui/IconButton'

interface FilterProps {
  colors: Color[]
  sizes: Size[]
}

const MobileFilters: React.FC<FilterProps> = ({ sizes, colors }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  return (
    <>
      <ButtonIcon
        icon={<FilterIcon size={20} />}
        onClick={onOpen}
        className="flex rounded-2xl bg-primary hover:primary-foreground items-center gap-3 lg:hidden"
        children={'Filters'}
      />
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 flex">
          <DialogPanel className="relative w-full ml-auto h-full max-w-xs flex bg-white overflow-y-auto shadow-xl pb-6 flex-col py-4">
            <div className="flex justify-end items-center px-4">
              <ButtonIcon
                icon={<X size={15} color="white" />}
                onClick={onOpen}
              />
            </div>
            <div className="p-4">
              <Filter valueKey="sizeCode" name="Sizes" data={sizes} />
              <Filter valueKey="colorCode" name="Colors" data={colors} />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default MobileFilters
