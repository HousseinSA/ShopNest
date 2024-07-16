'use client'
import { Plus } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'

interface ButtonProps {
  children: string
  onAddNew: () => void
}

const HeadButton: React.FC<ButtonProps> = ({ onAddNew, children }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <Button className='bg-primary hover:primary-foreground text-white' onClick={onAddNew}>
      <Plus className='w-5 h-5' />
      {children}
    </Button>
  )
}

export default HeadButton
