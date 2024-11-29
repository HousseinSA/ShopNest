'use client'
import { Billboard as BillboardProp } from '@/lib/StoreTypes'
import Image from 'next/image'

interface BillboardProps {
  billboardData: BillboardProp
}

const Billboard: React.FC<BillboardProps> = ({ billboardData }) => {
  return (
    <div className=" pb-6 sm:p-6 lg:p-8 overflow-hidden rounded-xl">
      <div
        className="relative rounded-lg overflow-hidden
        aspect-square h-[200px] md:h-[300px]  md:aspect-[2.4/1] w-full"
      >
        <Image
          width={1000}
          height={300}
          src={billboardData?.imageUrl}
          alt={billboardData?.label}
          className="absolute inset-0 w-full h-full object-cover"
          priority={true}
          layout="fixed"
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center text-center bg-black bg-opacity-30">
          <div
            className="font-bold text-primary capitalize text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
            style={{
              textShadow:
                '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white',
            }}
          >
            {billboardData?.label}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Billboard
