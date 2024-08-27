'use client'

import { LegacyRef , useEffect} from 'react'

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

  useEffect(()=>{
      const stateDelay  = setTimeout(()=>{
        if(modalState){
          modalState = false
        }
      } ,2000)
      modalState = true

      return ()=> clearTimeout(stateDelay)

    
  },[])


  return (
    <TabGroup
      as="div"
      className= ' w-full space-y-8'
    >
      <TabPanels className="lg:col-span-1">
        {images.map((image) => (
          <TabPanel key={image.id} className="relative">
            <div className="flex justify-center items-center h-[350px] sm:h-[450px] lg:h-auto rounded-lg overflow-hidden">
              <CldImage removeBackground
                ref={imgRef}
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
