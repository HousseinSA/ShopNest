import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import {Metadata} from 'next'
import { Inter as FontSans } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import ModalProvider from '@/lib/Providers/ModalProvider'
import ToastProvider from '@/lib/Providers/ToastProvider'
// import { ThemeProvider } from '@/lib/Providers/theme/themeProvider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export const metadata :Metadata = {
  title:'ShopNest Dashboard', 
  description:'ShopNest Dashboard for managing Store\'s data', 
  icons:{
    icon:"/icon.ico"
  }
}
const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang='en'>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem>  */}
          <ToastProvider />
          <ModalProvider />
          {children}
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
