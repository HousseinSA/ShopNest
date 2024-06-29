'use client'
import { cn } from '@/lib/utils'
import OnlyClient from '@/components/globals/OnlyClient'


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

    return (
      <OnlyClient>
      <span className={cn('text-sm font-bold text-primary', className)}>
            {PriceFormatter.format(data)}
      </span>
      </OnlyClient>
    )
  }
  
  export default Currency