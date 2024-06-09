'use client'
import { ColumnDef } from '@tanstack/react-table'

// This type is used to define the shape of our data.
export type OrderProps = {
  id: string
  phone: string
  address: string
  products: string[]
  price: string
  isPaid: boolean
  createdAt: string
}

export const columns: ColumnDef<OrderProps>[] = [
  {
    accessorKey: 'products',
    header: 'Products'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'price',
    header: 'Total price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  }
]
