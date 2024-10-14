// import Image from "next/image";
import { Tab } from '@headlessui/react'
import { Image as ImageType } from '@/lib/StoreTypes'
import { CldImage } from 'next-cloudinary'
import { cn } from '@/lib/utils'

interface ImageProps {
  image: ImageType
}

const GalleryTab: React.FC<ImageProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square active:outline-none cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className={cn("absolute inset-0 aspect-square border-none  rounded-md w-full h-full overflow-hidden outline ", selected ? 'outline-primary' : 'outline-transparent')}>
            <CldImage //removeBackground
              src={image.url}
              alt="product image"
              fill
              className="object-contain object-center"
            />
          </span>
          {/* <span
            className={`absolute inset-0 rounded-md ring-2 ring-offset-transparent ${
              selected ? 'ring-primary' : 'ring-transparent'
            }`}
          /> */}
        </div>
      )}
    </Tab>
  )
}

export default GalleryTab
