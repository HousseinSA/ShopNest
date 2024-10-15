'use client'
import React, { MouseEventHandler } from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface ButtonProps {
  icon: React.ReactElement
  onClick: MouseEventHandler<HTMLButtonElement>
  className?: string
  children?: React.ReactNode
}

const ButtonIcon: React.FC<ButtonProps> = ({
  icon,
  onClick,
  className,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(    
        'rounded-full hover:scale-110 p-3 flex items-center justify-center border shadow-md bg-primary text-primary-foreground',
        className
      )}
    >
      {icon}
      {children}
    </Button>
  )
}

export default ButtonIcon
