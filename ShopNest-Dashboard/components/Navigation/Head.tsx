'use client'

import MainNav from '@/components/Navigation/MainNav';
import StoreSwitcher from './StoreSwitcher';
import MobileMenu from './MobileMenu';
import UserInfoWrap from './UserInfoWrap';
import { SessionProvider } from 'next-auth/react';

interface HeadProps {
  storeList :{ id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date; }[] |null,
  session:{user:{id:string, name:string, email:string, image:string}}| null
} 


const Head= ({storeList, session}:HeadProps) => {
    
  return (
      <div className="flex items-center h-16 p-4">
        <StoreSwitcher stores={storeList} />
        <div className="hidden lg:block ml-4">
          <MainNav />
        </div>
        <div className="ml-auto flex items-center space-x-3">
          <UserInfoWrap 
          session={session}
          />
          <div className="block lg:hidden">
            <MobileMenu  />
          </div>
        </div>
      </div>
  );
};

export default Head;
