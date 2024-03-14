'use client'
import React, { useState } from 'react'

import { useParams, useRouter } from 'next/navigation'
import { MdStoreMallDirectory } from 'react-icons/md'
import { IoChevronDownSharp } from 'react-icons/io5'
import { Check, PlusCircle } from 'lucide-react'

import { Store } from '@prisma/client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { useModalStore } from '@/hooks/ModalStateStore'

interface StoreChangerProps {
  stores: Store[]
}

const Storechanger = ({ stores = [] }: StoreChangerProps) => {
  const route = useRouter()
  const params = useParams()
  const { onOpen } = useModalStore()
  const formatedStores = stores.map((store) => ({
    label: store.username,
    storeCode: store.id
  }))

  const activeStore = formatedStores.find(
    (store) => store.storeCode === params.storeCode
  )

  const [openList, setOpenList] = useState(false)
  const onStoreChange = (storeCode: string) => {
    setOpenList(false)
    route.push(`/${storeCode}`)
  }

  return (
    <Popover open={openList} onOpenChange={setOpenList}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combox'
          aria-expanded={open}
          aria-label='select Store'
          className='w-[200px] flex items-center justify-between'
        >
          <MdStoreMallDirectory className='mr-2' size={20} />
          Select store
          <IoChevronDownSharp className='ml-2' size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store...' />
            <CommandEmpty>No Stores Found</CommandEmpty>
            <CommandGroup>
              {formatedStores.map((store) => (
                <CommandItem
                  key={store.storeCode}
                  onSelect={() => onStoreChange(store.storeCode)}
                >
                  {store.label}
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      activeStore?.storeCode === store.storeCode
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {store.label}
                </CommandItem>
              ))}
              <CommandItem
                onSelect={() => {
                  setOpenList(false)
                  onOpen()
                }}
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
          {/* <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpenList(false)
                  onOpen()
                }}
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList> */}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default Storechanger
