
import React from 'react'

import { ClipLoader } from 'react-spinners'
import { Button } from '@/components/ui/button'

interface FormButton {
    loading:boolean, 
    action:string
}

const FormButton: React.FC<FormButton>= ({loading, action}) => {
  return (
    <Button  disabled={loading} className='flex items-center gap-2 bg-[#1E421D] hover:bg-[#3d7e3a]' type={'submit'}>
    {loading === true && <ClipLoader size={15} color='#fff' />} {action}
  </Button>
  )
}

export default FormButton