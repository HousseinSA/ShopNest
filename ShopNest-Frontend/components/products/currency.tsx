'use client'
import React, { useEffect, useState} from 'react'

const PriceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits:  0,
    maximumFractionDigits: 0
  })
interface CurrencyValue {
    data:number
}

  
  const Currency:React.FC<CurrencyValue> = ({data}) => {
    const [isMounted, setIsMounted]  = useState(false)
    useEffect(()=>{
      setIsMounted(true)
    },[])

    if(!isMounted){
      return null
    }
    return (
      <div className='text-sm font-semibold text-[#1E421D]'>
            {PriceFormatter.format(data)}
      </div>
    )
  }
  
  export default Currency