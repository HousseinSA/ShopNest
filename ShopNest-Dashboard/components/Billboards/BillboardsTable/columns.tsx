'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardProps = {
  id:string
  label:string
  createdAt: string
}

export const columns: ColumnDef<BillboardProps>[] = [
  {
    accessorKey: 'label',
    header: 'Label'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn billboard={row.original} />
  }
]
