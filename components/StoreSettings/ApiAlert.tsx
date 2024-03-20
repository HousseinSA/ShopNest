import React from 'react'
import { Rocket } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'

interface ApiAlertProps {
  title: string
  description: string
  variant: 'public' | 'admin'
}
const ApiAlert: React.FC<ApiAlertProps> = ({ title, description }) => {
  return (
    <Alert>
      <Rocket className='h-4 w-4' />
      <AlertTitle className='flex space-x-4'>
        {title}
        <Badge />
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  )
}

export default ApiAlert
