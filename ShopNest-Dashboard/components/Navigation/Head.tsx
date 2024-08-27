
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { UserButton, auth } from '@clerk/nextjs';

import MainNav from '@/components/Navigation/MainNav';
import StoreSwitcher from './StoreSwitcher';
import MobileMenu from './MobileMenu';
// import { ThemeToggler } from '@/lib/Providers/theme/ThemeToggler';

interface HeadProps {
  storeList :{ id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date; }[]
}

const Head= ({storeList}:HeadProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }


  return (
    <div className="border-b border">
      <div className="flex items-center h-16 p-4">
        <StoreSwitcher stores={storeList} />
        <div className="hidden lg:block ml-4">
          <MainNav />
        </div>
        <div className="ml-auto flex items-center space-x-3">
          {/* <ThemeToggler/> */}
          <UserButton afterSignOutUrl="/" />
          <div className="block lg:hidden">
            <MobileMenu  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
