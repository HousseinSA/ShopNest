import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import Head from 'next/head'  

import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import ModalProvider from '@/lib/Providers/ModalProvider'
import ToastProvider from '@/lib/Providers/ToastProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata = {
  title: 'ShopNest Dashboard',
  description: "ShopNest Dashboard for managing Store's data"
} 
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en'>
        <Head>
        <link rel="icon" href="/shopnest.svg" sizes="any" />
        </Head>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
