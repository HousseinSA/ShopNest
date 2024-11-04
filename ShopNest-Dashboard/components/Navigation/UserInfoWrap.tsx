'use client';

import UserInfo from '@/components/Navigation/UserInfo'
// import { SessionProvider } from 'next-auth/react';

const UserInfoWrap = ({session}) => {
  return (
    // <SessionProvider>
      <UserInfo  
      session={session}
      />
      // </SessionProvider>
  );
};

export default UserInfoWrap;
