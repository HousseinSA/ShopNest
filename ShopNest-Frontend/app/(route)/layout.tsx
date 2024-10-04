import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import '@/app/globals.css'
import Footer from '@/components/layouts/Footer'
import Header from '@/components/layouts/Header'
import ModalProvider from '@/components/globals/modals/modalProvider'
import ToastProvider from '@/components/globals/ToastProvider'
import getCategoriesData from '@/lib/fetchData/getCategories'
import { Category } from '@/lib/StoreTypes'


const urbanist = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ShopNest E-commerce',
  description: 'Modern E-commerce website',
  icons:{
    icon:'/icon.ico'
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) 

{
  const categories:Category[] = await getCategoriesData()
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/shopnest-favicon-color.png"
          type="image/x-icon"
        />
      </head>
      <body className="relative w-full h-full ">
        <ToastProvider />
        <ModalProvider />
        <div className='bg-white w-full h-full sticky left-0 top-0 z-20 right-0 overflow-auto '>
        <Header categories={categories}  />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
}
