import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import '@/app/globals.css'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import ModalProvider from '@/components/globals/modals/modalProvider'
import ToastProvider from '@/components/globals/ToastProvider'

const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopNest E-commerce',
  description: 'Modern E-commerce website',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/shopnest-favicon-color.png"
          type="image/x-icon"
        />
      </head>
      <body className={'relative'}>
        <ToastProvider />
        <ModalProvider />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
