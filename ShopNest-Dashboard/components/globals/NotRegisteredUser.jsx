'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { animateModal } from '@/lib/animateModal' // Adjust path as necessary

export default function NotRegisteredUser() {
    const route = useRouter()
    const modalRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [isMounted, setIsMounted] = useState(false) // State to track if component is mounted

    useEffect(() => {
        setIsMounted(true) // Set mounted state to true
        animateModal(modalRef, true) // Animate on mount
        return () => {
            animateModal(modalRef, false) // Clean up animation on unmount
        }
    }, [])

    const handleClose = async () => {
        setLoading(true)
        animateModal(modalRef, false)
            route.push(process.env.NEXT_PUBLIC_FRONTEND_URL)
    }

    // Render nothing until mounted to avoid hydration issues
    if (!isMounted) return null;

    return (
        <>
            <div className='fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 opacity-100' />
            <div className='fixed inset-0 flex items-center justify-center z-50 px-4'>
                <div ref={modalRef} className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transition-transform duration-500 ease-in-out'>
                    <div className='flex justify-center mb-6'>
                        <Image src='/shopnest-logo.png' alt='ShopNest Logo' width={200} height={200} className='h-16 bg-primary-foreground' />
                    </div>
                    <div className='flex flex-col space-y-4 mt-4'>
                        <button 
                            onClick={handleClose} 
                            className={`w-full p-4 text-white bg-primary hover:bg-primary/90 rounded-md transition duration-200`} 
                            disabled={loading}>
                             Login first to access dashboard
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}