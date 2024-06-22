'use client'
import React, { useEffect, useState } from 'react'
interface OnlyClientProps {
  children: React.ReactNode
}

export const OnlyClient: React.FC<OnlyClientProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}

export default OnlyClient
