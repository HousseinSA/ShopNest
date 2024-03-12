import './styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter as FontSans } from 'next/font/google'

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

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={cn(
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
