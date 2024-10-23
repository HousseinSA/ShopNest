'use client'
import React from 'react'
import RedirectLogout from './redirectLogout'
import { SessionProvider } from 'next-auth/react'


const RedirectWarper = () => {
  return (
  <SessionProvider><RedirectLogout/></SessionProvider>
  )
}

export default RedirectWarper