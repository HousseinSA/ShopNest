'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'

import useCartState from '@/lib/state/CartState' // Adjust path as necessary

type Provider = 'google' | 'guest'

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null) // Track loading state for each provider
  const setUserId = useCartState((state) => state.setUserId) // Get the setUserId function
  const { data: session, status } = useSession() // Get session data

  const handleSignIn = async (provider: Provider) => {
    setLoadingProvider(provider) // Set loading for the clicked provider

    const result = await signIn(provider, { redirect: false }) // Use redirect: false
    if (result?.error) {
      console.error('Sign in error:', result.error)
      alert('Failed to sign in')
      setLoadingProvider(null) // Reset loading state
      return
    }

    if (result?.ok) {
      // Fetch the updated session
      const updatedSession = await fetch('/api/auth/session').then((res) =>
        res.json()
      )

      if (updatedSession?.user) {
        const userId = updatedSession.user.id // Get user ID from session
        setUserId(userId) // Set the user ID in Cart State
      }
    }
    // reload page after login 
    if(status === 'authenticated') window.location.reload()
      if(provider === 'guest') window.location.reload()
    setLoadingProvider(null) // Reset loading state
  }

  // Effect to update user ID when session changes
  useEffect(() => {
    //@ts-expect-error id defined
    if (session?.user?.id) {
      //@ts-expect-error id defined
      setUserId(session.user.id) // Set userId from session if available
    }
  }, [session, setUserId])

  return (
    <>
      {/* Backdrop for the login modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      {/* Login Modal */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 flex items-start justify-center min-h-screen mt-20 w-full px-4">
        <div className="bg-card rounded-lg shadow-lg p-8 max-w-lg w-full login-wrapper transition-transform duration-500 ease-in-out">
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
              className="w-full p-2 text-white hover:bg-opacity-40 bg-primary justify-center gap-2 flex items-center rounded-md hover:primary-foreground"
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
                  className="rounded-full"
                />
              )}
            </button>
            <button
              type="button"
              onClick={() => handleSignIn('guest')}
              className="w-full p-2 text-white bg-gray-700 rounded-md hover:bg-gray-800"
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
  )
}
