'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
export type SizeProps = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const columns: ColumnDef<SizeProps>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => <span className='uppercase'>{row.original.value}</span> 
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn size={row.original} />
  }
]
