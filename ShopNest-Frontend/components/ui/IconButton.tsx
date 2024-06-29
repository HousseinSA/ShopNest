'use client'
import React, {MouseEventHandler} from 'react'
import { cn } from '@/lib/utils'


interface Button {
 icon: React.ReactElement
 onClick :MouseEventHandler<HTMLButtonElement> 
 className?:string
}

const  ButtonIcon:React.FC<Button> = ({icon, onClick,className}) => {

  return (
    <button onClick={onClick} className={cn("rounded-full p-2 hover:scale-110 transition flex items-center justify-center border shadow-md bg-primary hover:primary-foreground",className)}>
        {icon}
    </button>
  )
}

export default ButtonIcon