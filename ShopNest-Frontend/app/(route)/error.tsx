'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const route = useRouter()

  const backHome = () => {
    route.push('/')
  }

  const getUserFriendlyMessage = (error: Error) => {
    if (!navigator.onLine) {
      return 'Network issue: Please check your internet connection.'
    }
    // Add more custom error handling as needed
    switch (error.message) {
      case 'NetWork Error':
        return 'Network issue: Please check your internet connection.'
      case '500':
        return 'Server error: Please try again later.'
      case '404':
        return 'Page not found: The page you are looking for does not exist.'
      default:
        return 'An unexpected error occurred. Please try again.'
    }
  }

  const userFriendlyMessage = getUserFriendlyMessage(error)
  return (
    <div className="w-full min-h-screen flex flex-col space-y-8 justify-center items-center overflow-hidden">
      <h2 className="text-primary text-lg lg:text-2xl text-center w-full">
        {userFriendlyMessage}
      </h2>
      <div className="flex items-center space-x-8">
        <Button
          onClick={backHome}
          className="bg-black hover:bg-secondary-foreground"
        >
          Return Home
        </Button>
        <Button
          className="bg-primary hover:primary-foreground"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
