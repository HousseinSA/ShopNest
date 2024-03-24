'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'

import PathHeader from '@/components/GlobalComponent/PathHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BillboardProps, columns } from '@/components/Billboards/BillboardsTable/columns'
import { DataTable } from '@/components/Billboards/BillboardsTable/data-table'

interface BillBoardsProps {
  billBoards: BillboardProps[]
}
const StoreBillBoards: React.FC<BillBoardsProps> = ({ billBoards }) => {
  // routes params
  const route = useRouter()
  const params = useParams()
  // handel click
  const onClick = () => {
    route.push(`/${params.storeCode}/billboards/new`)
  }
  console.log(billBoards)

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <PathHeader title={`Billboards (${billBoards.length})`} description='manage billboards of your store'>
          <Button variant='outline' onClick={onClick}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </PathHeader>
        <Separator />
        {/* <div className='flex gap-4 items-center'>
          {billBoards?.map((billboard) => {
            return (
              <div className='p-3 border rounded-md' key={billboard.id}>
                <Image src={billboard.imageUrl} width={200} height={200} alt={billboard.label} />
                <h3 className='p-2'>{billboard.label}</h3>
              </div>
            )
          })}
        </div> */}
        <DataTable columns={columns} data={billBoards} />
      </div>
    </>
  )
}

export default StoreBillBoards
