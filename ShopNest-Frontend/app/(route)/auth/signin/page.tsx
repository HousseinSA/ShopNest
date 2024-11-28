'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import useCartState from '@/lib/state/CartState'
import { animateModal } from '@/lib/animateModal'

type Provider = 'google' | 'guest'

export default function LoginPage() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)
  const setUserId = useCartState((state) => state.setUserId)
  const { data: session, status } = useSession()
  const modalRef = useRef<null>(null)

  useEffect(() => {
    animateModal(modalRef, true) // Animate on mount
  }, [])

  const handleSignIn = async (provider: Provider) => {
    setLoadingProvider(provider)
    const result = await signIn(provider, { redirect: false })

    if (result?.error) {
      console.error('Sign in error:', result.error)
      alert('Failed to sign in')
      setLoadingProvider(null)
      return
    }

    if (result?.ok) {
      const updatedSession = await fetch('/api/auth/session').then((res) =>
        res.json()
      )
      if (updatedSession?.user) {
        const userId = updatedSession.user.id
        setUserId(userId)
      }
    }

    if (status === 'authenticated' || provider === 'guest') {
      window.location.reload()
    }

    setLoadingProvider(null)
  }

  useEffect(() => {
    // @ts-expect-error userid
    if (session?.user?.id) {
      // @ts-expect-error sessionId
      setUserId(session.user.id)
    }
  }, [session, setUserId])

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm transition-opacity duration-300 opacity-100" />
      <div className="fixed inset-0 flex items-center justify-center z-50 w-full px-4">
        <div
          ref={modalRef}
          className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transition-transform duration-500 ease-in-out"
        >
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
                  src="/Google.png"
                  alt="google"
                  width={20}
                  height={20}
                  className="rounded-full ml-2"
                />
              )}
            </button>
            <button
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
  )
}
