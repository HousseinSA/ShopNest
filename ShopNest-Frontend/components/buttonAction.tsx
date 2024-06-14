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
    <div  className='ml-auto w-8 h-8 sm:h-10 sm:w-10 md:h-12 md:w-12 '>
      <Button  className='relative bg-primary-mainColor rounded-full p-2 w-full h-full  disabled:cursor-not-allowed transition hover:bg-primary-hoverMain flex items-center text-white'>
        <ShoppingBag  size={18} color='white'/>
      <div className='absolute md:-top-2 -top-1.5 w-4 h-4     -left-1    md:w-6 md:h-6  justify-center flex items-center bg-red-500 rounded-full'>
        <span className='text-xs font-semibold md:font-bold lg:text-sm  '>0</span>
      </div>
      </Button>
    </div>
  )
}

export default ButtonAction