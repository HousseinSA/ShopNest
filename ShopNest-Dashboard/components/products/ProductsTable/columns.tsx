'use client'


import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'
import Image from 'next/image'


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductProps = {
  id: string
  name: string
  price: string
  isFeatured: boolean
images:[{url:string,}]
  isArchived: boolean
  category: string
  size: string
  color: string
  createdAt: string
}

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
      <Image className='rounded-md' width={100} height={50} src={row.original.images[0].url} alt={row.original.name} />
      </div>
    )
  },  
  {
    accessorKey: 'name',
    header: 'Name'
  },  
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'size',
    header: 'Size'
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <div style={{ backgroundColor: row.original.color }} className='w-8 h-8 rounded-full'></div>
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
   
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => <ActionsColumn product={row.original} />
  }
]
