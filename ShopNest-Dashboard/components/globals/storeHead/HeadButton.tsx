'use client'
import { Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

interface ButtonProps {
  children: string
  onAddNew: () => void
}

const HeadButton: React.FC<ButtonProps> = ({ onAddNew, children }) => {
  return (
    <Button className='bg-primary hover:primary-foreground rounded-full xs:rounded-md px-2 xs:px-4  text-white' onClick={onAddNew}>
      <Plus className=' rounded-full' />
      <div className='hidden xs:block'>   {children}</div>
   
    </Button>
  )
}

export default HeadButton
