'use client';
import { SessionProvider } from 'next-auth/react';

import UserInfo from '@/components/Navigation/UserInfo'

const UserInfoWrap = ({session}) => {
  return (
    <SessionProvider>
      <UserInfo  session={session}
      />
      </SessionProvider>
  );
};

export default UserInfoWrap;
