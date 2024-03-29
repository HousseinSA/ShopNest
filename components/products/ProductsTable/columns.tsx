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
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex  w-fit items-center gap-4'>
        <span className='uppercase font-semibold flex-auto'>{row.original.color}</span> <div style={{ backgroundColor: row.original.color }} className='w-8 h-8 rounded-full'></div>
      </div>
    )
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
