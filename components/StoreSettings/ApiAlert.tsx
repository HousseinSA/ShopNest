import React from 'react'
import { Copy, Rocket } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import { string } from 'zod'

interface ApiAlertProps {
  title: string
  description: string
  variant: 'public' | 'admin'
}

// text variants types
const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin'
}
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive'
}

// component
const ApiAlert: React.FC<ApiAlertProps> = ({ title, description, variant }) => {
  // handel copy
  const onCopy = (): void => {
    navigator.clipboard.writeText(description)
    toast.success('Copied!')
  }
  return (
    <Alert>
      <Rocket className='h-4 w-4' />
      <AlertTitle className='flex gap-x-4 items-center'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='flex mt-4 justify-between items-center'>
        <code className='rounded bg-muted px-[.3rem] py-[.2rem] text-sm font-semibold font-mono'>
          {description}
        </code>
        <Button variant='outline' size='icon' onClick={onCopy}>
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  )
}

export default ApiAlert
