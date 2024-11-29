// app/(route)/layout.tsx
import type { Metadata } from 'next';
import '@/app/globals.css';

// import {clearCockies} from '@/lib/clearCockies'

import Footer from '@/components/layouts/Footer';
import Header from '@/components/layouts/Header';
import ModalProvider from '@/components/globals/modals/modalProvider';
import ToastProvider from '@/components/globals/ToastProvider';
import getCategoriesData from '@/lib/fetchData/getCategories';
import { Category } from '@/lib/StoreTypes';
import { userInfo } from '@/lib/userInfo';

export const metadata: Metadata = {
  title: 'ShopNest E-commerce',
  description: 'Modern E-commerce website',
  icons: {
    icon: '/icon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user info including storeId
  const { userId, storeId, session } = await userInfo();

  // Fetch categories only if storeId is available
  const categories: Category[] = storeId ? await getCategoriesData() : [];

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/shopnest-favicon-color.png" type="image/x-icon" />
      </head>
      <body className="min-h-screen w-full relative">
          <>
            <ToastProvider />
            <ModalProvider />
            <div className="bg-white w-full h-full sticky left-0 top-0 z-20 right-0 shadow-sm">
              <Header categories={categories} userId={userId} storeId={storeId} session={session} />
            </div>
            {children}
            <Footer />
          </>
      </body>
    </html>
  );
}