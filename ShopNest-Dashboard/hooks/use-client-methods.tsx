'use client'
import { useState, useEffect } from 'react'

const useClientMethods = () => {
  // mount on render
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // getting origin when client components render
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : null
  return origin
}
export default useClientMethods
