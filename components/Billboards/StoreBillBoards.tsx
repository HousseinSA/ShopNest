'use client'
import React from 'react'
import { Plus } from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'

import PathHeader from '@/components/GlobalComponent/PathHeader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const StoreBillBoards = () => {
  // routes params
  const route = useRouter()
  const params = useParams()
  // handel click
  const onClick = () => {
    route.push(`/${params.code}/billboards/new`)
  }

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <PathHeader
          title='Billboards (0)'
          description='manage billboards of your store'
        >
          <Button variant='outline' onClick={onClick}>
            <Plus className='w-5 h-5' />
            Add New
          </Button>
        </PathHeader>
        <Separator />
      </div>
    </>
  )
}

export default StoreBillBoards
