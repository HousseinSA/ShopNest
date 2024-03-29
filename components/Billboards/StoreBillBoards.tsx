'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import SectionHeader from '@/components/GlobalComponent/SectionHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { BillboardProps, columns } from '@/components/Billboards/BillboardsTable/columns'
import { DataTable } from '@/components/Billboards/BillboardsTable/data-table'
import APIList from './APIList'

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
        <SectionHeader title={`Billboards (${billBoards.length})`} description='manage billboards of your store'>
          <Button variant='outline' onClick={onAddNew}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </SectionHeader>
        <Separator />
        <DataTable filterKey='label' columns={columns} data={billBoards} />
      </div>
      <SectionHeader title='API ' description='api calls for billboards' />
      <Separator />
      <APIList apiName='billboards' apiId='apiId' />
    </>
  )
}

export default StoreBillBoards
