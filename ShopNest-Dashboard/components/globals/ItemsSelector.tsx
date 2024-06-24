'use client'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Billboard, Category, Color, Size } from '@prisma/client'

// Define a base interface for shared props
interface BaseProps {
  disabled: boolean
  valueChange: () => void
  value: string | boolean
  defaultValue: string
}

// Extend the base interface for each specific prop set
interface BillboardProps extends BaseProps {
  items: Billboard[]
  itemType: 'billboard'
}

interface SizesProps extends BaseProps {
  items: Size[]
  itemType: 'size'
}

interface CategoryProps extends BaseProps {
  items: Category[]
  itemType: 'category'
}

interface ColorProps extends BaseProps {
  items: Color[]
  itemType: 'color'
}

type itemProps = Billboard | Size | Category | Color
// Create a union type for all props
type GlobalProps = BillboardProps | SizesProps | CategoryProps | ColorProps

const ItemsSelector: React.FC<GlobalProps> = ({ disabled, valueChange, value, defaultValue, items, itemType }) => {

  return (
    <Select onValueChange={valueChange} value={value as string} disabled={disabled}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue defaultValue={defaultValue} placeholder={` select ${itemType}`} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: itemProps) => {
          return (  
              <SelectItem key={item.id} value={item.id}>
                {itemType === 'size' || itemType === 'category' || itemType === 'color' ? (item as Size).name : (item as Billboard).label}
              </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default ItemsSelector
