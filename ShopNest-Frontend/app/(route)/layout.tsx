import type { Metadata } from "next"
import { Urbanist } from "next/font/google"

import "@/app/globals.css"
import Footer from "@/components/layouts/Footer"
import Header from "@/components/layouts/Header"

const urbanist = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShopNest E-commerce",
  description: "Modern E-commerce website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/shopnest-favicon-color.png" type="image/x-icon" />
      </head>
      <body className={urbanist.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
