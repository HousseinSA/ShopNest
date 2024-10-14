'use client'

import { ColumnDef } from '@tanstack/react-table'
import ActionsColumn from './ActionsColumn'
import { CldImage } from 'next-cloudinary'
import OnlyClient from '@/components/globals/OnlyClient'

//image type for zod
type productImages = {
  id: string
  productCode: string
  createdAt: Date
  updatedAt: Date
  url: string
}

export type ProductProps = {
  id: string
  name: string
  price: string
  isFeatured: boolean
  images: productImages[]
  isArchived: boolean
  category: string
  size: string
  color: string
  createdAt: string
}

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: 'image',
    header: 'Product',
    cell: ({ row }) => (
        <CldImage 
        //removeBackground
           className='rounded-md object-contain object-center w-20 h-16' width={100} height={50} src={row.original.images[0]?.url} alt={row.original.name} />
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
    header: 'Size',
    cell: ({ row }) => <div className='uppercase'>{row.original.size}</div>
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
    header: 'Date'
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <span>{row.original.isFeatured ? 'Yes' : 'No'}</span>
      </div>
    )
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
    cell: ({ row }) => (
      <div className='flex items-center gap-4'>
        <span>{row.original.isArchived ? 'Yes' : 'No'}</span>
      </div>
    )
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }  ) =><OnlyClient> <ActionsColumn product={row.original} />
    </OnlyClient>
  }
]
