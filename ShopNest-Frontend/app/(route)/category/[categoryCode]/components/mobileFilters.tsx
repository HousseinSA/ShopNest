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
      <Button
        onClick={onOpen}
        className="flex rounded-2xl bg-primary hover:bg-primary-foreground items-center gap-3 lg:hidden"
      >
        <FilterIcon size={20} />
        Filters
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50"
        onClose={onClose}
      >
        {/* Overlay for blur effect */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Dialog Panel */}
        <div className="fixed inset-0 flex z-50">
          <DialogPanel className="relative w-2/3 h-full flex bg-white overflow-y-auto shadow-xl pb-6 flex-col py-4 transition-transform duration-300 transform">
            <div className="flex justify-end items-center px-4">
              <ButtonIcon
                icon={<X size={15} color="white" />}
                onClick={onClose}
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
