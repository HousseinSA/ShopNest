import type { Metadata } from "next"
import { Urbanist } from "next/font/google"

import "@/app/globals.css"
import Footer from "@/components/layouts/Footer"
import Navigation from "@/components/layouts/Navigation"

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
      <body className={urbanist.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
