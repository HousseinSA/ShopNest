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

const ButtonIcon: React.FC<ButtonProps> = ({ icon, onClick, className, children }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full w-10 h-10 p-2 hover:scale-110 transition flex items-center justify-center border shadow-md bg-primary text-primary-foreground",
        className
      )}
    >
      {icon}
      {children}
    </Button>
  )
}

export default ButtonIcon
