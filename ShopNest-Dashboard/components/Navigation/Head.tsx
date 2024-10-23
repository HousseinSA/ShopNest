<<<<<<< HEAD
'use client'
=======

import { redirect } from 'next/navigation';
import { UserButton, auth } from '@clerk/nextjs';
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

import MainNav from '@/components/Navigation/MainNav';
import StoreSwitcher from './StoreSwitcher';
import MobileMenu from './MobileMenu';
<<<<<<< HEAD
import UserInfoWrap from './UserInfoWrap';

interface HeadProps {
  storeList :{ id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date; }[] |null,
  session:{user:{id:string, name:string, email:string, image:string}}| null
} 


const Head= ({storeList, session}:HeadProps) => {
    
=======
// import { ThemeToggler } from '@/lib/Providers/theme/ThemeToggler';

interface HeadProps {
  storeList :{ id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date; }[]
}

const Head= ({storeList}:HeadProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/');
  }

>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c

  return (
      <div className="flex items-center h-16 p-4">
        <StoreSwitcher stores={storeList} />
        <div className="hidden lg:block ml-4">
          <MainNav />
        </div>
        <div className="ml-auto flex items-center space-x-3">
<<<<<<< HEAD
          <UserInfoWrap 
          session={session}
          />
=======
          {/* <ThemeToggler/> */}
          <UserButton afterSignOutUrl="/" />
>>>>>>> 88b9c6416d88ddc8eaccb7baa343d710445ce03c
          <div className="block lg:hidden">
            <MobileMenu  />
          </div>
        </div>
      </div>
  );
};

export default Head;
