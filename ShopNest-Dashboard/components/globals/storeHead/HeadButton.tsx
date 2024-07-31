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
    <Button className='bg-primary hover:primary-foreground text-white' onClick={onAddNew}>
      <Plus className='w-5 h-5' />
      {children}
    </Button>
  )
}

export default HeadButton
