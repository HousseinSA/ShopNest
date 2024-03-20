import React from 'react'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface SettingsHeaderProps {
  title: string
  description: string
  setIsOpen: (open: boolean) => void
}
const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
  setIsOpen
}) => {
  return (
    <>
      <div className='flex flex-1 justify-between items-center space-y-2'>
        <div className='flex flex-col item-center'>
          <h1 className='text-3xl font-bold tracking-tight'>{title}</h1>
          <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
        <Button
          variant='destructive'
          aria-label='delete button'
          size='icon'
          className='rounded-full'
          onClick={() => setIsOpen(true)}
        >
          <Trash className='w-5 h-5' />
        </Button>
      </div>
    </>
  )
}

export default SettingsHeader
