'use client';

import { SessionProvider } from 'next-auth/react';
import UserInfo from '@/components/layouts/UserInfo'

const UserInfoWrap = () => {
  return (
    <SessionProvider >
      <UserInfo />
    </SessionProvider>
  );
};

export default UserInfoWrap;
