'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
export type OrderProps = {
  id: string
  phone: string
  address: string
  createdAt: string
}

export const columns: ColumnDef<OrderProps>[] = [
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },

  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn order={row.original} />
  }
]
