'use client'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Billboard, Category, Color, Size } from '@prisma/client'
import { boolean } from 'zod'

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
interface CategoryProps {
  disabled: boolean
  valueChange: () => void
  value: string
  defaultValue: string
  items: Category[]
  itemType: 'category'
}
interface ColorProps {
  disabled: boolean
  valueChange: () => void
  value: string
  defaultValue: string
  items: Color[]
  itemType: 'color'
}
interface ProductState {
  disabled: boolean
  valueChange: () => void
  value: boolean
  defaultValue: string
  items: boolean
  itemType: 'state'
}
type GlobalProps = BillboardProps | SizesProps | CategoryProps | ColorProps | ProductState

const ItemsSelector: React.FC<GlobalProps> = ({ disabled, valueChange, value, defaultValue, items, itemType }) => {
  return (
    <Select onValueChange={valueChange} value={value} disabled={disabled}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue defaultValue={defaultValue} placeholder={` Select ${itemType}`} />
      </SelectTrigger>
      <SelectContent>
        {Array.isArray(items) ? (
          items.map((item) => {
            return (
              <SelectItem key={item.id} value={item.id}>
                {itemType === 'size' || itemType === 'category' || itemType === 'color' ? (item as Size).name : (item as Billboard).label}
              </SelectItem>
            )
          })
        ) : (
          <>
            <SelectItem value={true}>yes</SelectItem>
            <SelectItem value={false}>no</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}

export default ItemsSelector
