'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'; 

interface LoginWrapperProps {
  session: Session | null,
  children:React.ReactNode
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ session,children }) => {

  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default LoginWrapper;
