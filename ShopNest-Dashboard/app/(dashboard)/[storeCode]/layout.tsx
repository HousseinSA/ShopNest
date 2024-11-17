import React from 'react';

import prismaDB from '@/lib/prismaClient';
import Head from '@/components/Navigation/Header';
import '@/app/globals.css';
import { userInfo } from '@/lib/userInfo';
import NotRegisteredUser from '@/components/globals/NotRegisteredUser';

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { storeCode: string };
}

export default async function DashboardLayout({ children, params: { storeCode } }: DashboardLayoutProps) {
  
  const { customUser, userId } = await userInfo(storeCode);
  
  // Fetch user's stores
  let storeList = await prismaDB.store.findMany({ where: { userId } });

  const guestStoreId = '67168ed76339cddccbeb4ae4';

  const guestStore = await prismaDB.store.findUnique({ where: { id: guestStoreId } });

  const isGuestStoreInList = storeList.some(store => store.id === guestStoreId);

  if (!isGuestStoreInList && guestStore) {
    storeList.push(guestStore); 
  }


  return (
    <div className='max-w-7xl mx-auto'> 
      {(!customUser && !userId) && <NotRegisteredUser />}
      <Head 
        storeList={storeList}
        customUser={customUser} 
      />
      {children}
    </div>
  );
}