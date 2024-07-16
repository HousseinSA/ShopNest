'use client'
import React, { useState } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { MdStoreMallDirectory } from 'react-icons/md'
import { IoChevronDownSharp } from 'react-icons/io5'
import { Check, PlusCircle } from 'lucide-react'
import { Store } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandSeparator, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useModalStore } from '@/hooks/StoreState'

interface StoreChangerProps {
  stores: Store[]|[]
}
const StoreSwitcher: React.FC<StoreChangerProps> = ({ stores }) => {
  // routes params
  const route = useRouter()
  const params = useParams()

  // modal state
  const { openModal } = useModalStore()

  // formatting store array
  const FormattedStores = stores.map((store) => ({
    label: store?.storeName,
    storeCode: store?.id
  }))

  // get active store
  const activeStore = FormattedStores.find((store) => store.storeCode === params.storeCode)
  // state of list
  const [openList, setOpenList] = useState(false)

  // on select store
  const onStoreChange = (storeCode: string) => {
    route.push(`/${storeCode}`)
    setOpenList(false)
  }

  return (
    <Popover open={openList} onOpenChange={setOpenList}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' role='combobox' aria-expanded={openList} aria-label='select Store' className='w-[200px] flex items-center justify-between'>
          <MdStoreMallDirectory className='mr-2 h-4 w-4 ' />
          {activeStore?.label}
          <IoChevronDownSharp className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No Stores Found</CommandEmpty>
            <CommandGroup heading='Stores'>
              {FormattedStores.map((store) => (
                <CommandItem key={store.storeCode} onSelect={() => onStoreChange(store.storeCode)}>
                  <Check className={cn('mr-3 text-primary h-4 w-4 ', activeStore?.storeCode === store.storeCode ? 'opacity-100' : 'opacity-0')} />
                  <MdStoreMallDirectory className='mr-2 h-4 w-4' />
                  {store.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpenList(false)
                  openModal()
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
