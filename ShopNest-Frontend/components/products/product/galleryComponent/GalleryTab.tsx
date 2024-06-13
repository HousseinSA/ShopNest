import Image from "next/image";
import { Tab } from "@headlessui/react";
import { Image as ImageType } from "@/lib/StoreTypes";

interface ImageProps {
  image: ImageType;
}

const GalleryTab: React.FC<ImageProps> = ({ image }) => {
  return (
    <Tab className="relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-white">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 aspect-square rounded-md w-full h-full overflow-hidden ">
            <Image
              src={image.url}
              alt="product image"
              layout="fill"
              className="object-fit object-center"
            />
          </span>
          <span
            className={`absolute inset-0 rounded-md ring-2 ring-offset-2 ${
              selected ? "ring-[#1E421D]" : "ring-transparent"
            }`}
          />  
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
