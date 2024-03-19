import React from 'react'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface SettingsHeaderProps {
  title: string
  description: string
}
const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description
}) => {
  return (
    <div className='flex flex-1 justify-between items-center  space-y-2'>
      <div className='flex flex-col item-center'>
        <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
      <Button
        // variant='destructive'
        variant='outline'
        // className='px-3'
        size='sm'
        aria-label='button'
      >
        <Trash className='h-5 w-5 p-4' color='black' />
        {/* delete */}
      </Button>
    </div>
  )
}

export default SettingsHeader
