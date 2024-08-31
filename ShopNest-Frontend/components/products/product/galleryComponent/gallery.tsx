'use client'

import { LegacyRef, useEffect } from 'react'

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
  useEffect(() => {
    const stateDelay = setTimeout(() => {
      if (modalState) {
        modalState = false
      }
    }, 2000)
    modalState = true

    return () => clearTimeout(stateDelay)
  }, [])
  return (
    <TabGroup as="div" className="w-full space-y-6 lg:mb-4" >
      <TabPanels className="lg:col-span-1 mt-4 sm:mt-0">
        {images.map((image) => (
          <TabPanel key={image.id} className="relative">
            <div className="flex items-center justify-center w-full">
              <div className="flex justify-center items-center min-w-[350px] sm:w-[350px] xs:w-[300px] rounded-lg overflow-hidden">
                <CldImage
                  removeBackground
                  ref={imgRef}
                  src={image.url}
                  alt="Product Image"
                  width={400}
                  height={400}
                  className=" object-contain w-full h-auto"
                />
              </div>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className=" lg:mt-0 max-w-2xl sm:block lg:max-w-none">
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
