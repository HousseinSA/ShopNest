'use client'

import MainNav from '@/components/Navigation/MainNav';
import StoreSwitcher from './StoreSwitcher';
import MobileMenu from './MobileMenu';
import UserInfoWrap from './UserInfoWrap';
import {useEffect} from 'react'
interface HeadProps {
  storeList :{ id: string; storeName: string; userId: string; createdAt: Date; updatedAt: Date; }[] |null,
  session:{user:{id:string, name:string, email:string, image:string}}| null
} 

const Head= ({storeList, session}:HeadProps) => {



  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include', // Include credentials for cross-origin requests
      });

      if (res.ok) {
        const data = await res.json();
        console.log('from session',data);
      } else {
        console.error('Failed to fetch session', res.status);
      }
    };

    fetchSession();
  }, []);

  if (!session) {
    return <div>Loading...</div>; // Show loading until session is fetched
  }

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
