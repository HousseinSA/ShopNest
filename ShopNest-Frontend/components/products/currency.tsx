'use client'
import React, { useEffect, useState} from 'react'
import { cn } from '@/lib/utils'

const PriceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits:  0,
    maximumFractionDigits: 0
  })
interface CurrencyValue {
    data:number
    ,className?:string
}

  
  const Currency:React.FC<CurrencyValue> = ({data ,className}) => { 
    const [isMounted, setIsMounted]  = useState(false)
    useEffect(()=>{
      setIsMounted(true)
    },[])

    if(!isMounted){
      return null
    }
    return (
      <span className={cn('text-sm font-base text-primary-mainColor', className)}>
            {PriceFormatter.format(data)}
      </span>
    )
  }
  
  export default Currency