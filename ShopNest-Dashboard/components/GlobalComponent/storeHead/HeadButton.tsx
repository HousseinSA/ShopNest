
import { Plus } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'

interface ButtonProps {
    children:string,
    onAddNew:()=>void
}

const HeadButton:React.FC<ButtonProps> = ({onAddNew, children}) => {
  return (
    <Button className='bg-[#437e41] hover:opacity-75 text-white' onClick={onAddNew}>
    <Plus className='w-5 h-5' />
    {children}
  </Button>
  )
}

export default HeadButton