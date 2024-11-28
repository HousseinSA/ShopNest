'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap';

export default function NotRegisteredUser() {
    const route = useRouter();
    const modalRef = useRef(null); // Create a ref for the modal
    const [loading, setLoading] = useState(false); // State to manage loading

    useEffect(() => {
        // Animate the modal when it mounts
        gsap.fromTo(modalRef.current, 
            { scale: 0.8, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out" }
        );
    }, []);

    const handleClose = async () => {
        setLoading(true); // Set loading to true

        // Animate out before navigating
        gsap.to(modalRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 0.75,
            ease: "power3.in",
            onComplete: () => {
                // Perform logout logic here (if applicable)
                // For example, you might want to call an API to log out
                
                // Simulate an API call or perform your logout logic here
                setTimeout(() => {
                    route.push('https://shop-nest-frontend.vercel.app/'); // Redirect after animation
                }, 100); // Adjust timeout as needed
            }
        });
    };

    return (
        <>
            {/* Backdrop for the login modal */}
            <div className='fixed inset-0 bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300 opacity-100' />
            {/* Login Modal */}
            <div className='fixed inset-0 flex items-center justify-center z-50 px-4'>
                <div 
                    ref={modalRef} 
                    className='bg-white rounded-lg shadow-lg p-8 max-w-lg w-full transition-transform duration-500 ease-in-out mt-16'
                >
                    {/* Site Logo */}
                    <div className='flex justify-center mb-6'>
                        <Image 
                            src='/shopnest-logo.png' 
                            alt='ShopNest Logo' 
                            width={200} 
                            height={200} 
                            className='h-16' 
                        />
                    </div>
                    <div className='flex flex-col space-y-4 mt-4'>
                        <button
                            type="button"
                            onClick={handleClose}
                            className={`w-full p-4 text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-80'} rounded-md transition duration-200`}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Logging out...' : 'Login first to access dashboard'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}