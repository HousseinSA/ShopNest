'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import  { useEffect } from 'react'

const RedirectLogout = () => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    const timeOut = setTimeout(()=>{
  if (status === 'unauthenticated') {
    router.push('/')
  }
    },500)

    return ()=> clearTimeout(timeOut)

  }, [status, router]) // Include router in dependencies

  return null // Return null instead of an empty fragment
}

export default RedirectLogout