'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'


import SectionHeader from '@/components/globals/storeHead/SectionHeader'
import HeadButton from '@/components/globals/storeHead/HeadButton'
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
  const onAddNew = () => {
    route.push(`/${params.storeCode}/billboards/new`)
  }

  

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <SectionHeader title={`Billboards (${billBoards.length})`} description='Manage store billboards'>
        <HeadButton onAddNew ={onAddNew}>
              Add Billboard
          </HeadButton>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='label' columns={columns} data={billBoards} />
      </div>
    </>
  )
}

export default StoreBillBoards
