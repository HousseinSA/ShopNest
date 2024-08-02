'use client'

import { LegacyRef } from 'react'

import { TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { CldImage } from 'next-cloudinary'

import GalleryTab from '@/components/products/product/galleryComponent/GalleryTab'
import { Image as ImageType } from '@/lib/StoreTypes'

interface GalleryProps {
  images: ImageType[]
  imgRef: LegacyRef<HTMLImageElement>
  modalState?: boolean
}

const Gallery: React.FC<GalleryProps> = ({ images, imgRef, modalState }) => {
  return (
    <TabGroup
      as="div"
      className={` ${modalState ?  'w-full space-y-8' :'grid-span-2 lg:grid-span-1 grid lg:grid-cols-2 gap-6 w-full'}`}
    >
      <TabPanels className="lg:col-span-1">
        {images.map((image) => (
          <TabPanel key={image.id} className="relative">
            <div className="flex justify-center items-center h-[350px] sm:h-[450px] lg:h-auto rounded-lg overflow-hidden">
              <CldImage
                ref={imgRef}
                removeBackground
                src={image.url}
                alt="Product Image"
                width={450}
                height={450}
                className="object-cover object-center w-full h-full"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="mt-6 lg:mt-0 max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </TabList>
      </div>
    </TabGroup>
  )
}

export default Gallery
