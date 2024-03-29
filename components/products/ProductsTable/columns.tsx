'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductProps = {
  id: string
  name: string
  price: string
  isFeatured: boolean
  isArchived: boolean
  category: string
  size: string
  color: string
  createdAt: string
}

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'color',
    header: 'Color'
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured'
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn product={row.original} />
  }
]
