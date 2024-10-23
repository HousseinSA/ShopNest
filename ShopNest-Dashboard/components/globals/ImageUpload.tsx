'use client'

import { cn } from '@/lib/utils'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import React from 'react'
import { ImagePlus, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import OnlyClient from '@/components/globals/OnlyClient'
import { RemoveBackground } from '@/hooks/RemoveBackground'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
  removeState: boolean
  location?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  removeState,
  location,
}) => {
  // Function to handle image upload
  const onUpload = async (result: any) => {
    try {
      // Get the uploaded image URL from Cloudinary
      const imageUrl = result.info.secure_url;

      if(removeState){
        const processedImageUrl = await RemoveBackground(imageUrl);
        if (processedImageUrl) {
          // Now we need to upload the processed image to Cloudinary and get the new URL
          const cloudinaryResult = await uploadToCloudinary(processedImageUrl);
          onChange(cloudinaryResult); // Call onChange with the new image URL
        } else {
          onChange(imageUrl); // If removal fails, fallback to the original image
        }
      }else {
        const cloudinaryResult = await uploadToCloudinary(imageUrl);
        onChange(cloudinaryResult); // Call onChange with the new image URL
      }
   
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  // Function to upload the processed image to Cloudinary
  const uploadToCloudinary = async (imageUrl: string) => {
    // Replace this with your logic to upload the image to Cloudinary
    const formData = new FormData();
    const response = await fetch(imageUrl); // Fetch the processed image

    // Convert the response to a blob
    const blob = await response.blob();
    formData.append('file', blob);
    formData.append('upload_preset', 'q5jplcc9'); // Your Cloudinary upload preset

    // Send the request to Cloudinary
    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dgn0zkx6w/image/upload`, // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await uploadResponse.json();
    return data.secure_url; 
  };

  return (
    <OnlyClient>
      <div>
        <div className={cn('flex flex-wrap gap-4', value.length === 0 ? 'my-0' : 'my-4')}>
          {value.map((url) => (
            <div
              key={url}
              className='relative w-[250px] h-[250px] flex items-center justify-center bg-gray-100 rounded-md overflow-hidden'
            >
              <div className='absolute top-2 right-2 z-10'>
                <Button
                  type='button'
                  title='Delete product'
                  onClick={() => onRemove(url)}
                  variant='outline'
                  className='rounded-full outline-none py-3 px-3 hover:bg-red-500 hover:opacity-100 opacity-70 bg-primary group'
                >
                  <Trash className='h-4 w-4 text-white' />
                </Button>
              </div>
              <CldImage
                src={url}
                alt={'uploaded image'}
                width={350}
                height={350}
                className={cn('rounded-lg', location && 'object-fill h-full')}
              />
            </div>
          ))}
        </div>
        <CldUploadWidget
          options={{
            styles: {
              palette: {
                window: '#FFF',
                windowBorder: '#90A0B3',
              },
            },
          }}
          onUpload={onUpload}
          uploadPreset='q5jplcc9'
        >
          {({ open }) => (
            <Button
              type='button'
              disabled={disabled}
              className='bg-primary'
              onClick={() => open()}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload Images
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </OnlyClient>
  );
};

export default ImageUpload;
