'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import useCartState from '@/lib/state/CartState' // Adjust path as necessary
import { gsap } from 'gsap';

type Provider = 'google' | 'guest'

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null); // Track loading state for each provider
  const setUserId = useCartState((state) => state.setUserId); // Get the setUserId function
  const { data: session, status } = useSession(); // Get session data
  const modalRef = useRef(null); // Create a ref for the modal

  useEffect(() => {
    // Animate the modal when it mounts
    gsap.fromTo(modalRef.current, 
      { scale: 0.8, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" }
    );
  }, []);

  const handleSignIn = async (provider: Provider) => {
    setLoadingProvider(provider); // Set loading for the clicked provider

    const result = await signIn(provider, { redirect: false }); // Use redirect: false
    if (result?.error) {
      console.error('Sign in error:', result.error);
      alert('Failed to sign in');
      setLoadingProvider(null); // Reset loading state
      return;
    }

    if (result?.ok) {
      // Fetch the updated session
      const updatedSession = await fetch('/api/auth/session').then((res) =>
        res.json()
      );

      if (updatedSession?.user) {
        const userId = updatedSession.user.id; // Get user ID from session
        setUserId(userId); // Set the user ID in Cart State
      }
    }
    
    // Reload page after login
    if (status === 'authenticated') window.location.reload();
    if (provider === 'guest') window.location.reload();
    
    setLoadingProvider(null); // Reset loading state
  };

  // Effect to update user ID when session changes
  useEffect(() => {
    //@ts-expect-error id defined
    if (session?.user?.id) {
      //@ts-expect-error id defined
      setUserId(session.user.id); // Set userId from session if available
    }
  }, [session, setUserId]);

  return (
    <>
      {/* Backdrop for the login modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      {/* Login Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 w-full px-4">
        <div 
          ref={modalRef} 
          className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transition-transform duration-500 ease-in-out mt-16"
        >
          {/* Site Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/shopnest-logo.png"
              alt="ShopNest Logo"
              width={200}
              height={200}
              className="h-16"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              onClick={() => handleSignIn('google')}
              className="w-full p-2 text-white bg-primary hover:bg-opacity-80 rounded-md transition duration-200 flex items-center justify-center"
            >
              {loadingProvider === 'google'
                ? 'Logging in...'
                : 'Login with Google'}
              {loadingProvider === 'google' ? (
                <ClipLoader size={15} color="#fff" />
              ) : (
                <Image
                  src={'/Google.png'}
                  alt="google"
                  width={20}
                  height={20}
                  className="rounded-full ml-2"
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSignIn('guest')}
              className="w-full p-2 text-white bg-gray-700 rounded-md hover:bg-gray-800 transition duration-200"
            >
              {loadingProvider === 'guest' ? 'Logging in...' : 'Login as Guest'}
              {loadingProvider === 'guest' && (
                <ClipLoader size={15} color="#fff" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}