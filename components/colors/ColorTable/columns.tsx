'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
export type ColorProps = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<ColorProps>[] = [
  {
    accessorKey: 'name',
    header: 'color name'
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className='flex items-center space-x-4 '>
        <span className='uppercase font-semibold'>{row.original.value}</span> <div style={{ backgroundColor: row.original.value }} className='w-8 h-8 rounded-full border'></div>
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },

  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn color={row.original} />
  }
]
