'use client'
import {useState, useEffect} from 'react'
import {ShoppingBag} from 'lucide-react'

import {Button} from '@/components/ui/button'


const ButtonAction = () => {
  // preventing dehydration on when storing data into localStorage
  const [isMounted, setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }
  return (
    <div  className='ml-auto flex gap-x-4 items-center '>
      <Button  className='relative bg-[#437e41] rounded-full p-3 disabled:cursor-not-allowed transition hover:opacity-75 flex items-center text-white'>
        <ShoppingBag  size={20} color='white'/>
      <div className='absolute -top-3 -left-1 w-6 h-6 p-1 justify-center flex items-center bg-red-500 rounded-full'>
        <span className='text-xs'>0</span>
      </div>
      </Button>
    </div>
  )
}

export default ButtonAction