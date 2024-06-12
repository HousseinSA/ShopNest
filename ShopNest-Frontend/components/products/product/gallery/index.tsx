"use client";

import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import GalleryTab from "@/components/products/product/gallery/GalleryTab";
import { Image as ImageType } from "@/lib/StoreTypes";
interface GalaryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalaryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse ">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6 ">
          {images.map((image) => {
            return <GalleryTab key={image.id} image={image} />;
          })}
        </TabList>
      </div>
      <TabPanels className="aspect-square w-full ">
        {images.map((image) => (
          <TabPanel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden ">
              <Image
                src={image.url}
                alt="image Product"
                layout="fill"
                className="object-cover object-center"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
