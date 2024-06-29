
import React from 'react'
import { cn } from 'lib/utils'

import { ClipLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'

interface FormButton {
    loading:boolean, 
    children:string
    className?:string
    onClick?:()=>void
    disabled:boolean
}

const FormButton: React.FC<FormButton>= ({loading, children, className, disabled  ,onClick}) => {
  return (
    <Button  onClick={onClick} disabled={loading ||disabled} className={cn('flex items-center gap-2 bg-primary hover:primary-foreground', className)} type={'submit'}>
    {loading === true && <ClipLoader size={15} color='#fff' />} {children}
  </Button>
  )
}

export default FormButton