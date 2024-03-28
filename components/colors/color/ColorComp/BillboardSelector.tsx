'use client'
import React from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Billboard } from '@prisma/client'

interface BillboardSelectorProps {
  disabled: boolean
  valueChange: () => void
  value: string
  defaultValue: string
  billboards: Billboard[]
}

const BillboardSelector: React.FC<BillboardSelectorProps> = ({ disabled, valueChange, value, defaultValue, billboards }) => {
  return (
    <Select onValueChange={valueChange} value={value} disabled={disabled}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue defaultValue={defaultValue} placeholder='select billboard' />
      </SelectTrigger>
      <SelectContent>
        {billboards.map((billboard) => {
          return (
            <SelectItem key={billboard.id} value={billboard.id}>
              {billboard.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default BillboardSelector
