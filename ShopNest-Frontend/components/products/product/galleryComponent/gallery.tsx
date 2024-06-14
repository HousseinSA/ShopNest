"use client";

import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import GalleryTab from "@/components/products/product/galleryComponent/GalleryTab";
import { Image as ImageType } from "@/lib/StoreTypes";
interface GalaryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalaryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="grid-span-2 lg:grid-span-1 w-full ">
      <TabPanels>
        {images.map((image) => (
          <TabPanel key={image.id}> 
            <div className="relative aspect-square w-full flex justify-center  items-center flex-1  h-[350px] sm:rounded-lg overflow-hidden">
              <Image
                src={image.url}
                alt="image Product"
                width={450}
                height={450}
                className="object-cover object-center "
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
      <div className="mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images.map((image) => {
            return <GalleryTab key={image.id} image={image} />;
          })}
        </TabList>
      </div>
    </TabGroup>
  );
};

export default Gallery;
