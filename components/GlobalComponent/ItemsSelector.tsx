'use client'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Billboard, Size } from '@prisma/client'

interface BillboardProps {
  disabled: boolean
  valueChange: () => void
  value: string
  defaultValue: string
  items: Billboard[]
  itemType: 'billboard'
}

interface SizesProps {
  disabled: boolean
  valueChange: () => void
  value: string
  defaultValue: string
  items: Size[]
  itemType: 'size'
}

type GlobalProps = BillboardProps | SizesProps

const ItemsSelector: React.FC<GlobalProps> = ({ disabled, valueChange, value, defaultValue, items, itemType }) => {
  return (
    <Select onValueChange={valueChange} value={value} disabled={disabled}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue defaultValue={defaultValue} placeholder={` select ${itemType === 'size' ? 'size' : 'billboard'}`} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: Billboard | Size) => {
          return (
            <SelectItem key={item.id} value={item.id}>
              {itemType === 'size' ? (item as Size).name : (item as Billboard).label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default ItemsSelector
