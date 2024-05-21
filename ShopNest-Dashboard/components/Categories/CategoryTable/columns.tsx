'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
export type CategoryProps = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryProps>[] = [
  {
    accessorKey: 'name',
    header: 'name'
  },
  {
    accessorKey: 'billboard Label',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn category={row.original} />
  }
]
