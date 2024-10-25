'use client';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth'; // Import the Session type
import LoginPage from '@/app/api/auth/signin/page';

interface LoginWrapperProps {
  session: Session | null; // Specify the type of session
}

const LoginWrapper: React.FC<LoginWrapperProps> = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <LoginPage />
    </SessionProvider>
  );
};

export default LoginWrapper;
