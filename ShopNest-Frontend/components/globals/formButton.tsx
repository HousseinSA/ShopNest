
import React from 'react'
import { cn } from 'lib/utils'

import { ClipLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'

interface FormButton {
    loading:boolean, 
    children:string
    className?:string
    onClick?:()=>void
}

const FormButton: React.FC<FormButton>= ({loading, children, className  ,onClick}) => {
  return (
    <Button  onClick={onClick} disabled={loading} className={cn('flex items-center gap-2 bg-primary-mainColor hover:bg-primary-hoverMain', className)} type={'submit'}>
    {loading === true && <ClipLoader size={15} color='#fff' />} {children}
  </Button>
  )
}

export default FormButton