'use client'; // This file is a client component

import { SessionProvider } from 'next-auth/react';
import LoginPage from '@/app/api/auth/signin/page';

const LoginWrapper = ({ session }:any) => {
  return (
    <SessionProvider session={session}>
      <LoginPage />
    </SessionProvider>
  );
};

export default LoginWrapper;
