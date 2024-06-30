'use client'
import { Button } from '@/components/ui/button'
import {useRouter} from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    const route = useRouter()
  const backHome =()=>{
    route.push('/')
  }
  return (
    <div className='w-full h-[80%] flex flex-col mt-5 space-y-8 justify-center items-center'>
      <h2 className='text-primary text-lg lg:text-2xl'>Something went wrong! {error?.message}</h2>
      <div className='flex items-center space-x-8 '>
        <Button onClick={backHome} className=' bg-black hover:bg-secondary-foreground '>Return Home</Button>
        <Button className='bg-primary hover:primary-foreground' onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  )
}
