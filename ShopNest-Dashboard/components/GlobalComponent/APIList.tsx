  'use client'

import { useParams } from 'next/navigation'
import React from 'react'

import useClientMethods from '@/hooks/use-client-methods'
import ApiAlert from '@/components/GlobalComponent/ApiAlert'

interface APIListProps {
  apiName: string
  apiId: string
}
const APIList: React.FC<APIListProps> = ({ apiName, apiId }) => {
  // pathname and origin
  const params = useParams()
  const origin = useClientMethods()
  const baseUrl = `${origin}/api/${params.storeCode}/${apiName}`
  return (
    <>
      <ApiAlert title='GET' description={baseUrl} variant='public' />
      <ApiAlert title='GET' description={`${baseUrl}/${apiName}/{${apiId}}`} variant='admin' />
      <ApiAlert title='POST' description={`${baseUrl}/${apiName}`} variant='admin' />
      <ApiAlert title='PATCH' description={`${baseUrl}/${apiName}/{${apiId}}`} variant='admin' />
      <ApiAlert title='DELETE' description={`${baseUrl}/${apiName}/{${apiId}}`} variant='admin' />
    </>
  )
}

export default APIList
