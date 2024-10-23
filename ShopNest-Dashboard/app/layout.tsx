import React from 'react'
import { Inter as FontSans } from 'next/font/google'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
import ModalProvider from '@/lib/Providers/ModalProvider'
import ToastProvider from '@/lib/Providers/ToastProvider'
import '@/app/globals.css'


const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'ShopNest Dashboard',
  description: "ShopNest Dashboard for managing Store's data",
  icons: {
    icon: '/icon.ico',
  },
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ToastProvider />
          <ModalProvider />
          {children}
      </body>
    </html>
  )
}

export default RootLayout
